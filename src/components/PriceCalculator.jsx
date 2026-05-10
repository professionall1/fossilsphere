import { useState, useMemo } from 'react'
import { Search, X, ArrowRight, Calculator } from 'lucide-react'
import { motion } from 'framer-motion'
import legalDraftTypes from '../data/legalDraftTypes'

const PRICE_PER_PAGE = 149
const FILING_PRICE = 1999

export default function PriceCalculator() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [serviceType, setServiceType] = useState('drafting')
  const [pages, setPages] = useState(1)
  const [showDropdown, setShowDropdown] = useState(false)

  const filtered = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return legalDraftTypes.filter(d =>
      d.label.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.subcategory.toLowerCase().includes(q)
    ).slice(0, 8)
  }, [query])

  const total = useMemo(() => {
    if (serviceType === 'filing') return FILING_PRICE
    if (serviceType === 'both') return pages * PRICE_PER_PAGE + FILING_PRICE
    return pages * PRICE_PER_PAGE
  }, [serviceType, pages])

  const handleSelect = (item) => {
    setSelected(item)
    setQuery(item.label)
    setShowDropdown(false)
  }

  const handleRequest = () => {
    const number = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'
    const svcLabel = serviceType === 'drafting' ? 'Drafting Only' : serviceType === 'filing' ? 'Filing Only' : 'Drafting & Filing'
    const msg = `Hi Professionall, I need help with ${selected?.label || 'a legal draft'}.\nService: ${svcLabel}. Pages: ${pages}. Estimated: ₹${total.toLocaleString()}.\nPlease contact me.`
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <motion.div
      id="calculator"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-10 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
          <Calculator className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-xl text-primary">Price Calculator</h3>
          <p className="text-textsecondary text-xs">Get an instant estimate for your legal service</p>
        </div>
      </div>

      {/* Step 1 - Search */}
      <div className="mb-6 relative">
        <label className="text-sm font-semibold text-textprimary mb-2 block">1. Select Document Type</label>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-textsecondary" />
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setShowDropdown(true); setSelected(null) }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search — e.g. Bail, Sale Deed, NDA, Divorce..."
            className="w-full pl-10 pr-10 py-3.5 bg-bglight border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40 text-sm"
          />
          {query && (
            <button onClick={() => { setQuery(''); setSelected(null) }} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-textsecondary hover:text-textprimary">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {showDropdown && filtered.length > 0 && (
          <div className="absolute z-10 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
            {filtered.map(item => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="w-full text-left px-4 py-3 hover:bg-bglight flex items-center justify-between text-sm border-b border-gray-50 last:border-0 transition-colors"
              >
                <div>
                  <span className="font-medium text-textprimary">{item.label}</span>
                  <span className="text-textsecondary text-xs ml-2">({item.subcategory})</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">{item.category}</span>
              </button>
            ))}
          </div>
        )}
        {selected && (
          <div className="mt-2.5 flex items-center gap-2 text-sm">
            <span className="text-green-600 font-medium">✓ {selected.label}</span>
            <span className="text-textsecondary">•</span>
            <span className="text-textsecondary text-xs">{selected.category} — {selected.type}</span>
          </div>
        )}
      </div>

      {/* Step 2 - Service Type */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-textprimary mb-2.5 block">2. Choose Service</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 'drafting', label: 'Drafting', sub: '₹149/pg' },
            { value: 'filing', label: 'Filing', sub: '₹1,999' },
            { value: 'both', label: 'Both', sub: 'Best Value' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setServiceType(opt.value)}
              className={`py-3 px-3 rounded-xl text-center transition-all border ${
                serviceType === opt.value
                  ? 'bg-accent text-white border-accent shadow-md shadow-accent/15'
                  : 'bg-bglight text-textprimary border-gray-200 hover:border-accent/30'
              }`}
            >
              <span className="text-sm font-medium block">{opt.label}</span>
              <span className={`text-xs ${serviceType === opt.value ? 'text-white/70' : 'text-textsecondary'}`}>{opt.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 3 - Pages */}
      {serviceType !== 'filing' && (
        <div className="mb-6">
          <label className="text-sm font-semibold text-textprimary mb-2 block">3. Number of Pages</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPages(Math.max(1, pages - 1))}
              className="w-10 h-10 rounded-lg bg-bglight border border-gray-200 flex items-center justify-center text-lg font-bold text-textprimary hover:bg-gray-100 transition-colors"
            >−</button>
            <input
              type="number"
              min={1}
              value={pages}
              onChange={e => setPages(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 text-center px-3 py-2.5 bg-bglight border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/15 text-sm font-medium"
            />
            <button
              onClick={() => setPages(pages + 1)}
              className="w-10 h-10 rounded-lg bg-bglight border border-gray-200 flex items-center justify-center text-lg font-bold text-textprimary hover:bg-gray-100 transition-colors"
            >+</button>
            <span className="text-sm text-textsecondary ml-2">{pages} × ₹{PRICE_PER_PAGE} = <strong className="text-textprimary">₹{(pages * PRICE_PER_PAGE).toLocaleString()}</strong></span>
          </div>
        </div>
      )}

      {/* Step 4 - Total */}
      <div className="mb-6 p-5 bg-bglight rounded-xl border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-textsecondary font-medium uppercase tracking-wider">Estimated Total</p>
            <p className="text-3xl font-heading font-semibold text-accent mt-1">₹{total.toLocaleString()}</p>
          </div>
          {serviceType === 'both' && (
            <div className="text-right text-xs text-textsecondary">
              <p>Drafting: ₹{(pages * PRICE_PER_PAGE).toLocaleString()}</p>
              <p>Filing: ₹{FILING_PRICE.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>

      {/* Step 5 - CTA */}
      <button
        onClick={handleRequest}
        className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-accent/15"
      >
        Request This Service <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-textsecondary text-xs text-center mt-3">Opens WhatsApp with your request details</p>
    </motion.div>
  )
}
