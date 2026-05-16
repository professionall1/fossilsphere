import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, RefreshCw, Search, CheckCircle2, Clock, FileText, Phone, Eye, EyeOff, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin'

const STATUS_OPTIONS = ['drafting', 'filing', 'numbering', 'completed']

const SERVICE_STATUS_OPTIONS = {
  drafting: ['drafting', 'completed'],
  filing: ['filing', 'numbering', 'completed'],
  both: ['drafting', 'filing', 'numbering', 'completed'],
  appearHearing: ['appear-hearing', 'completed'],
}

function getStatusOptionsForService(service) {
  const key = String(service || '').toLowerCase().replace(/\s+/g, '')
  if (key.includes('both') || (key.includes('draft') && key.includes('fil'))) return SERVICE_STATUS_OPTIONS.both
  if (key.includes('appear') || key.includes('hearing')) return SERVICE_STATUS_OPTIONS.appearHearing
  if (key.includes('filing') || key.includes('file')) return SERVICE_STATUS_OPTIONS.filing
  if (key.includes('draft')) return SERVICE_STATUS_OPTIONS.drafting
  return STATUS_OPTIONS
}

const STATUS_COLORS = {
  drafting: 'bg-blue-100 text-blue-700',
  filing: 'bg-yellow-100 text-yellow-700',
  numbering: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  'appear-hearing': 'bg-orange-100 text-orange-700',
}

function PhoneLink({ phone }) {
  const phoneStr = String(phone || '')
  const num = phoneStr.replace(/[^0-9+]/g, '')
  const dialNum = num.startsWith('+') ? num : `+91${num}`
  return (
    <a href={`tel:${dialNum}`} className="font-semibold text-accent underline">
      {phoneStr}
    </a>
  )
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem('admin_auth') === 'true'
  })
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('pricing')
  const [pricingData, setPricingData] = useState([])
  const [homeData, setHomeData] = useState([])
  const [trackingData, setTrackingData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
      toast.success('Welcome, Admin!')
    } else {
      toast.error('Incorrect password')
    }
  }

  const fetchSheetData = async (sheetUrl, sheetName) => {
    try {
      const res = await fetch(`${sheetUrl}?action=getAll&sheet=${sheetName}`)
      const data = await res.json()
      return data.rows || []
    } catch (err) {
      console.error(`Error fetching ${sheetName}:`, err)
      return []
    }
  }

  const loadData = async () => {
    setLoading(true)
    const pricingUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL_PRICING
    const homeUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL_HOME

    if (pricingUrl && pricingUrl !== 'your_pricing_sheet_apps_script_url') {
      const requests = await fetchSheetData(pricingUrl, 'Requests')
      const tracking = await fetchSheetData(pricingUrl, 'Tracking')
      setPricingData(requests)
      setTrackingData(tracking)
    }

    if (homeUrl && homeUrl !== 'your_home_sheet_apps_script_url') {
      const leads = await fetchSheetData(homeUrl, 'Sheet1')
      setHomeData(leads)
    }

    setLoading(false)
  }

  const updateContacted = async (sheet, rowIndex, value) => {
    if (sheet === 'home') {
      setHomeData(prev => prev.map((row, i) => i === rowIndex ? [...row.slice(0, 4), value, row[5] || ''] : row))
    } else {
      setPricingData(prev => prev.map((row, i) => i === rowIndex ? [...row.slice(0, 8), value, row[9] || ''] : row))
    }
    const url = sheet === 'home' ? import.meta.env.VITE_GOOGLE_SHEETS_URL_HOME : import.meta.env.VITE_GOOGLE_SHEETS_URL_PRICING
    const sheetName = sheet === 'home' ? 'Sheet1' : 'Requests'
    const col = sheet === 'home' ? 5 : 9
    try {
      fetch(`${url}?action=updateCell&sheet=${sheetName}&row=${rowIndex + 2}&col=${col}&value=${encodeURIComponent(value)}`)
      toast.success(`Marked as ${value === 'Yes' ? 'Contacted' : 'Not Contacted'}`)
    } catch (err) {
      toast.error('Failed to update')
    }
  }

  const updateNotes = async (sheet, rowIndex, value) => {
    if (sheet === 'home') {
      setHomeData(prev => prev.map((row, i) => i === rowIndex ? [...row.slice(0, 5), value] : row))
    } else {
      setPricingData(prev => prev.map((row, i) => i === rowIndex ? [...row.slice(0, 9), value] : row))
    }
    const url = sheet === 'home' ? import.meta.env.VITE_GOOGLE_SHEETS_URL_HOME : import.meta.env.VITE_GOOGLE_SHEETS_URL_PRICING
    const sheetName = sheet === 'home' ? 'Sheet1' : 'Requests'
    const col = sheet === 'home' ? 6 : 10
    try {
      fetch(`${url}?action=updateCell&sheet=${sheetName}&row=${rowIndex + 2}&col=${col}&value=${encodeURIComponent(value)}`)
      toast.success('Notes saved')
    } catch (err) {
      toast.error('Failed to save notes')
    }
  }

  const updateStatus = async (trackingId, newStatus) => {
    setTrackingData(prev => prev.map(row => row[0] === trackingId ? [row[0], newStatus, `Status updated to: ${newStatus}`, row[3], row[4]] : row))
    const pricingUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL_PRICING
    try {
      fetch(`${pricingUrl}?action=updateStatus&id=${encodeURIComponent(trackingId)}&status=${encodeURIComponent(newStatus)}`)
      toast.success(`Status → "${newStatus}" for ${trackingId}`)
    } catch (err) {
      toast.error('Failed to update status')
    }
  }

  useEffect(() => {
    if (authenticated) loadData()
  }, [authenticated])

  const filteredPricing = pricingData.filter(row => JSON.stringify(row).toLowerCase().includes(searchQuery.toLowerCase()))
  const filteredHome = homeData.filter(row => JSON.stringify(row).toLowerCase().includes(searchQuery.toLowerCase()))
  const filteredTracking = trackingData.filter(row => JSON.stringify(row).toLowerCase().includes(searchQuery.toLowerCase()))

  if (!authenticated) {
    return (
      <div className="pt-14 sm:pt-16 min-h-screen bg-bglight flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 w-full max-w-sm mx-4">
          <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-5">
            <Lock className="w-7 h-7 text-accent" />
          </div>
          <h2 className="font-bold text-xl text-primary text-center mb-1">Admin Panel</h2>
          <p className="text-textsecondary text-sm text-center mb-6">Enter password to access</p>
          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 pr-10 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-textsecondary">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button type="submit" className="w-full py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all">Login</button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-14 sm:pt-16 min-h-screen bg-bglight">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h1 className="font-bold text-lg sm:text-2xl text-primary">Admin Panel</h1>
            <p className="text-textsecondary text-xs sm:text-sm">Manage requests & tracking</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadData} disabled={loading} className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold hover:bg-bglight transition-colors disabled:opacity-50">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> <span className="hidden sm:inline">Refresh</span>
            </button>
            <button onClick={() => { localStorage.removeItem('admin_auth'); setAuthenticated(false); toast.success('Logged out') }} className="flex items-center gap-1.5 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors">
              <LogOut className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200 shadow-sm text-center">
            <p className="text-lg sm:text-2xl font-bold text-accent">{pricingData.length}</p>
            <p className="text-[10px] sm:text-xs text-textsecondary">Requests</p>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200 shadow-sm text-center">
            <p className="text-lg sm:text-2xl font-bold text-accent">{homeData.length}</p>
            <p className="text-[10px] sm:text-xs text-textsecondary">Leads</p>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200 shadow-sm text-center">
            <p className="text-lg sm:text-2xl font-bold text-green-600">{trackingData.filter(r => r[1] === 'completed').length}</p>
            <p className="text-[10px] sm:text-xs text-textsecondary">Done</p>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200 shadow-sm text-center">
            <p className="text-lg sm:text-2xl font-bold text-yellow-600">{trackingData.filter(r => r[1] !== 'completed').length}</p>
            <p className="text-[10px] sm:text-xs text-textsecondary">Active</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3 sm:mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textsecondary" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search phone, ID, document..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4 overflow-x-auto pb-1">
          {[
            { id: 'pricing', label: 'Requests', icon: FileText },
            { id: 'tracking', label: 'Tracking', icon: Clock },
            { id: 'home', label: 'Leads', icon: Phone },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-white text-textprimary border border-slate-300 hover:bg-bglight'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <RefreshCw className="w-6 h-6 text-accent animate-spin mx-auto mb-3" />
            <p className="text-textsecondary text-sm">Loading...</p>
          </div>
        ) : (
          <>
            {/* Pricing Requests */}
            {activeTab === 'pricing' && (
              <div className="space-y-3">
                {filteredPricing.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-textsecondary">No pricing requests yet</div>
                ) : filteredPricing.map((row, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="font-bold text-accent text-sm">{row[7]}</p>
                        <p className="text-textsecondary text-[11px]">{row[0]?.split('T')[0]}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${STATUS_COLORS[row[6]?.toLowerCase()] || 'bg-slate-100 text-slate-600'}`}>
                        {row[6]}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div>
                        <span className="text-textsecondary">Phone:</span>
                        <div><PhoneLink phone={row[1]} /></div>
                      </div>
                      <div>
                        <span className="text-textsecondary">Service:</span>
                        <p className="font-semibold text-textprimary">{row[3]}</p>
                      </div>
                      <div>
                        <span className="text-textsecondary">Document:</span>
                        <p className="font-medium text-textprimary truncate">{row[2]}</p>
                      </div>
                      <div>
                        <span className="text-textsecondary">Estimate:</span>
                        <p className="font-bold text-green-700">₹{row[5]}</p>
                      </div>
                      <div>
                        <span className="text-textsecondary">Pages:</span>
                        <p className="font-medium text-textprimary">{row[4]}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <select
                        value={row[8] || 'No'}
                        onChange={(e) => updateContacted('pricing', i, e.target.value)}
                        className={`px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold ${row[8] === 'Yes' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
                      >
                        <option value="No">❌ No</option>
                        <option value="Yes">✅ Yes</option>
                      </select>
                      <input
                        type="text"
                        defaultValue={row[9] || ''}
                        placeholder="Notes..."
                        onBlur={(e) => updateNotes('pricing', i, e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
                        className="flex-1 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tracking */}
            {activeTab === 'tracking' && (
              <div className="space-y-3">
                {filteredTracking.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-textsecondary">No tracking data yet</div>
                ) : filteredTracking.map((row, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="font-bold text-accent text-sm">{row[0]}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${STATUS_COLORS[row[1]] || 'bg-slate-100 text-slate-600'}`}>
                        {row[1]}
                      </span>
                    </div>
                    <div className="text-xs mb-3">
                      <p className="text-textsecondary">{row[2]}</p>
                      <p className="font-medium text-textprimary mt-1">Service: {row[4]}</p>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <span className="text-xs text-textsecondary font-medium">Update:</span>
                      <select
                        value={row[1]}
                        onChange={(e) => updateStatus(row[0], e.target.value)}
                        className="flex-1 px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20"
                      >
                        {getStatusOptionsForService(row[4]).map(s => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Home Leads */}
            {activeTab === 'home' && (
              <div className="space-y-3">
                {filteredHome.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-textsecondary">No home leads yet</div>
                ) : filteredHome.map((row, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <PhoneLink phone={row[1]} />
                        <p className="text-textsecondary text-[11px] mt-0.5">{row[0]?.split('T')[0]}</p>
                      </div>
                      <span className="text-xs font-semibold text-textprimary bg-slate-100 px-2 py-0.5 rounded-full">{row[2]}</span>
                    </div>
                    {row[3] && <p className="text-xs text-textsecondary mb-3">{row[3]}</p>}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <select
                        value={row[4] || 'No'}
                        onChange={(e) => updateContacted('home', i, e.target.value)}
                        className={`px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold ${row[4] === 'Yes' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
                      >
                        <option value="No">❌ No</option>
                        <option value="Yes">✅ Yes</option>
                      </select>
                      <input
                        type="text"
                        defaultValue={row[5] || ''}
                        placeholder="Notes..."
                        onBlur={(e) => updateNotes('home', i, e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
                        className="flex-1 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
