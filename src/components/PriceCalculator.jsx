import { useState, useMemo } from 'react'
import { Search, X, ArrowRight, Calculator, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { getDocumentDropdownLabel, searchDocumentTypes } from '../data/documentTypes'
import { SERVICE_OPTIONS, PRICING, calculateServiceTotal, getServiceConfig } from '../data/services'
import { submitPricingRequest } from '../utils/googleSheets'

export default function PriceCalculator() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [serviceType, setServiceType] = useState('drafting')
  const [pages, setPages] = useState(1)
  const [phone, setPhone] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [trackingId, setTrackingId] = useState(null)

  const filtered = useMemo(() => {
    if (!query.trim()) return []
    return searchDocumentTypes(query)
  }, [query])

  const activeService = getServiceConfig(serviceType)

  const total = useMemo(() => {
    return calculateServiceTotal(serviceType, pages)
  }, [serviceType, pages])

  const handleSelect = (item) => {
    setSelected(item)
    setQuery(item.displayName)
    setShowDropdown(false)
  }

  const handleRequest = async () => {
    if (!phone || phone.length < 10) return toast.error('Please enter a valid phone number')

    setLoading(true)
    const result = await submitPricingRequest({
      phone: phone,
      document: selected ? getDocumentDropdownLabel(selected) : 'Not selected',
      service: activeService.label,
      pages: activeService.requiresPages ? pages : 'N/A',
      estimate: total.toLocaleString(),
    })
    setLoading(false)

    if (result.trackingId) {
      setTrackingId(result.trackingId)
      toast.success(`Request submitted! Your Tracking ID: ${result.trackingId}`, { duration: 6000 })
    } else {
      toast.success('Request submitted! We will contact you soon.')
    }

    setPhone('')
    setQuery('')
    setSelected(null)
    setPages(1)
  }

  return (
    <motion.div
      id="calculator"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-xl shadow-primary/5 border border-slate-200 p-6 sm:p-8 lg:p-10 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
          <Calculator className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-xl text-primary">Calculate Your Cost</h3>
          <p className="text-textsecondary text-xs">Select your document type, choose a service, and get an instant price estimate.</p>
        </div>
      </div>

      {/* Quick Search */}
      <div className="mb-6 relative">
        <label className="text-sm font-semibold text-textprimary mb-2 block">1. Search Document Type</label>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-textsecondary" />
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setShowDropdown(true); setSelected(null) }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search e.g. written, nbw, trust deed, title..."
            className="w-full pl-10 pr-10 py-3.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm text-textprimary placeholder-slate-500 shadow-sm"
          />
          {query && (
            <button onClick={() => { setQuery(''); setSelected(null) }} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-textsecondary hover:text-textprimary">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {showDropdown && filtered.length > 0 && (
          <div className="absolute z-10 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-2xl shadow-primary/10 max-h-64 overflow-y-auto">
            {filtered.map(item => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="w-full text-left px-4 py-3 hover:bg-accent/5 flex items-center justify-between gap-3 text-sm border-b border-slate-100 last:border-0 transition-colors"
              >
                <div className="min-w-0">
                  <span className="font-semibold text-textprimary">{item.displayName}</span>
                  <span className="text-textsecondary text-xs ml-2">({item.subCategory})</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-semibold shrink-0">{item.category}</span>
              </button>
            ))}
          </div>
        )}
        {selected && (
          <div className="mt-2.5 flex items-center gap-2 text-sm">
            <span className="text-green-700 font-semibold">✓ {selected.displayName}</span>
            <span className="text-textsecondary">•</span>
            <span className="text-textsecondary text-xs">{selected.subCategory}</span>
          </div>
        )}
      </div>

      {/* Choose Service */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-textprimary mb-2.5 block">2. Choose Service</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SERVICE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setServiceType(opt.value)}
              aria-pressed={serviceType === opt.value}
              className={`py-3 px-3 rounded-xl text-center transition-all border ${
                serviceType === opt.value
                  ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20 ring-2 ring-accent/25'
                  : 'bg-white text-textprimary border-slate-300 hover:border-accent/50 hover:bg-accent/5 shadow-sm'
              }`}
            >
              <span className="text-sm font-semibold block">{opt.calculatorLabel}</span>
              <span className={`text-xs ${serviceType === opt.value ? 'text-white/85' : 'text-textsecondary'}`}>{opt.detail}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-textsecondary mt-2">{activeService.description}</p>
      </div>

      {/* Pages */}
      {activeService.requiresPages && (
        <div className="mb-6">
          <label className="text-sm font-semibold text-textprimary mb-2 block">3. Number of Estimated Pages</label>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setPages(Math.max(1, pages - 1))} className="w-10 h-10 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-lg font-bold text-textprimary hover:bg-bglight transition-colors">−</button>
            <input
              type="number"
              min={1}
              value={pages}
              onChange={e => setPages(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 text-center px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm font-semibold"
            />
            <button onClick={() => setPages(pages + 1)} className="w-10 h-10 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-lg font-bold text-textprimary hover:bg-bglight transition-colors">+</button>
            <span className="text-sm text-textsecondary">{pages} × ₹{PRICING.draftingPerPage} = <strong className="text-textprimary">₹{(pages * PRICING.draftingPerPage).toLocaleString()}</strong></span>
          </div>
        </div>
      )}

      {/* Estimated Total */}
      <div className="mb-6 p-5 bg-gradient-to-br from-bglight to-white rounded-xl border border-slate-200 shadow-inner">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-textsecondary font-medium uppercase tracking-wider">Estimated Total</p>
            <p className="text-3xl font-heading font-semibold text-accent mt-1">₹{total.toLocaleString()}</p>
          </div>
          {serviceType === 'both' && (
            <div className="text-right text-xs text-textsecondary">
              <p>Drafting: ₹{(pages * PRICING.draftingPerPage).toLocaleString()}</p>
              <p>Filing: ₹{PRICING.filing.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>

      {/* Phone Number */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-textprimary mb-1.5 block">{activeService.requiresPages ? '4' : '3'}. Phone Number**</label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-textsecondary" />
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="Enter your 10-digit phone number"
            className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm text-textprimary placeholder-slate-500 shadow-sm"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleRequest}
        disabled={loading}
        className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-accent/20 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Request This Service'} {!loading && <ArrowRight className="w-4 h-4" />}
      </button>

      {trackingId && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
          <p className="text-green-800 font-semibold text-sm">Your Tracking ID: <span className="text-lg">{trackingId}</span></p>
          <p className="text-green-700 text-xs mt-1">Save this ID to track your request status</p>
        </div>
      )}

      <p className="text-textsecondary text-xs text-center mt-3">Submit your request and our team will contact you.</p>
    </motion.div>
  )
}
