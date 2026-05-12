import { useState, useMemo } from 'react'
import { Search, X, ArrowRight, Calculator } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  getCaseTypeOptions,
  getCategoryOptions,
  getDocumentDropdownLabel,
  getDocumentTypeById,
  getDraftTypeOptions,
  searchDocumentTypes,
} from '../data/documentTypes'
import { SERVICE_OPTIONS, PRICING, calculateServiceTotal, getServiceConfig } from '../data/services'
import { submitToGoogleSheets } from '../utils/googleSheets'

export default function PriceCalculator() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [serviceType, setServiceType] = useState('drafting')
  const [pages, setPages] = useState(1)
  const [showDropdown, setShowDropdown] = useState(false)
  const [caseType, setCaseType] = useState('Civil')
  const [categoryType, setCategoryType] = useState('Suit Drafts')
  const [draftTypeId, setDraftTypeId] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return []
    return searchDocumentTypes(query)
  }, [query])

  const caseTypeOptions = useMemo(() => getCaseTypeOptions(), [])
  const categoryOptions = useMemo(() => getCategoryOptions(caseType), [caseType])
  const showCategorySelect = categoryOptions.length > 1 || categoryOptions[0]?.value !== caseType
  const draftTypeOptions = useMemo(
    () => getDraftTypeOptions(caseType, categoryType),
    [caseType, categoryType]
  )

  const activeService = getServiceConfig(serviceType)

  const total = useMemo(() => {
    return calculateServiceTotal(serviceType, pages)
  }, [serviceType, pages])

  const handleSelect = (item) => {
    setSelected(item)
    setCaseType(item.category)
    setCategoryType(item.subCategory)
    setDraftTypeId(item.id)
    setQuery(item.displayName)
    setShowDropdown(false)
  }

  const handleCaseTypeChange = (value) => {
    const nextCategories = getCategoryOptions(value)
    setCaseType(value)
    setCategoryType(nextCategories[0]?.value || '')
    setDraftTypeId('')
    setSelected(null)
    setQuery('')
    setShowDropdown(false)
  }

  const handleCategoryChange = (value) => {
    setCategoryType(value)
    setDraftTypeId('')
    setSelected(null)
    setQuery('')
    setShowDropdown(false)
  }

  const handleDraftTypeChange = (value) => {
    const nextDocument = getDocumentTypeById(value)
    setDraftTypeId(value)
    setSelected(nextDocument)
    setQuery('')
    setShowDropdown(false)
  }

  const handleRequest = async () => {
    const service = getServiceConfig(serviceType)

    await submitToGoogleSheets({
      phone: '',
      service: service.label,
      message: `Document: ${selected ? getDocumentDropdownLabel(selected) : 'Not selected'}. ${service.requiresPages ? `Pages: ${pages}. ` : ''}Estimated: ₹${total.toLocaleString()}`
    })
    toast.success('Request submitted! We will contact you soon.')
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
          <h3 className="font-heading font-semibold text-xl text-primary">Price Calculator</h3>
          <p className="text-textsecondary text-xs">Get an instant estimate for your legal service</p>
        </div>
      </div>

      <div className="mb-6 relative">
        <label className="text-sm font-semibold text-textprimary mb-1 block">1. Select Document Type</label>
        <p className="text-xs text-textsecondary mb-3">
          Choose case type, category, and draft type from the client hierarchy, or search directly.
        </p>

        <div className={`grid gap-3 mb-4 ${showCategorySelect ? 'md:grid-cols-3' : 'sm:grid-cols-2'}`}>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-textprimary mb-1.5 block">Case Type</span>
            <select
              value={caseType}
              onChange={(e) => handleCaseTypeChange(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-textprimary shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {caseTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {showCategorySelect && (
            <div className="min-w-0">
              <span className="text-xs font-semibold text-textprimary mb-1.5 block">Category</span>
              <select
                value={categoryType}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-textprimary shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          )}

          <div className="min-w-0">
            <span className="text-xs font-semibold text-textprimary mb-1.5 block">Draft Type</span>
            <select
              value={draftTypeId}
              onChange={(e) => handleDraftTypeChange(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-textprimary shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="">Select draft type</option>
              {draftTypeOptions.map((item) => (
                <option key={item.id} value={item.id}>{item.displayName}</option>
              ))}
            </select>
          </div>
        </div>

        <span className="text-xs font-semibold text-textprimary mb-1.5 block">Quick Search</span>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-textsecondary" />
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setShowDropdown(true); setSelected(null); setDraftTypeId('') }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search e.g. written, nbw, trust deed, title..."
            className="w-full pl-10 pr-10 py-3.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm text-textprimary placeholder-slate-500 shadow-sm"
          />
          {query && (
            <button onClick={() => { setQuery(''); setSelected(null); setDraftTypeId('') }} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-textsecondary hover:text-textprimary">
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
                  <span className="text-textsecondary text-xs ml-2"> ({item.subCategory})</span>
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

      {activeService.requiresPages && (
        <div className="mb-6">
          <label className="text-sm font-semibold text-textprimary mb-2 block">3. Number of Pages</label>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setPages(Math.max(1, pages - 1))}
              className="w-10 h-10 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-lg font-bold text-textprimary hover:bg-bglight transition-colors"
            >−</button>
            <input
              type="number"
              min={1}
              value={pages}
              onChange={e => setPages(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 text-center px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm font-semibold"
            />
            <button
              onClick={() => setPages(pages + 1)}
              className="w-10 h-10 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-lg font-bold text-textprimary hover:bg-bglight transition-colors"
            >+</button>
            <span className="text-sm text-textsecondary">{pages} × ₹{PRICING.draftingPerPage} = <strong className="text-textprimary">₹{(pages * PRICING.draftingPerPage).toLocaleString()}</strong></span>
          </div>
        </div>
      )}

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
          {(serviceType === 'filing' || serviceType === 'appearHearing') && (
            <div className="text-right text-xs text-textsecondary max-w-[9rem]">
              <p>{activeService.description}</p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleRequest}
        className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
      >
        Request This Service <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-textsecondary text-xs text-center mt-3">Submit your request and our team will contact you.</p>
    </motion.div>
  )
}
