import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminTabs from '../components/admin/AdminTabs'
import HeaderActions from '../components/admin/HeaderActions'
import RequestsTable from '../components/admin/RequestsTable'
import SearchFilterBar from '../components/admin/SearchFilterBar'
import StatsCards from '../components/admin/StatsCards'

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

function csvEscape(value) {
  return `"${String(value || '').replace(/"/g, '""')}"`
}

function createIndexedRows(rows) {
  return rows.map((row, rowIndex) => ({ row, rowIndex }))
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
  const [filterStatus, setFilterStatus] = useState('all')
  const [dateRange, setDateRange] = useState('all')

  const handleLogin = (event) => {
    event.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
      toast.success('Welcome, Admin!')
    } else {
      toast.error('Incorrect password')
    }
  }

  const fetchSheetData = useCallback(async (sheetUrl, sheetName) => {
    try {
      const res = await fetch(`${sheetUrl}?action=getAll&sheet=${sheetName}`)
      const data = await res.json()
      return data.rows || []
    } catch (err) {
      console.error(`Error fetching ${sheetName}:`, err)
      return []
    }
  }, [])

  const loadData = useCallback(async (showToast = false) => {
    setLoading(true)
    const pricingUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL_PRICING
    const homeUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL_HOME

    try {
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

      if (showToast) toast.success('Dashboard refreshed')
    } finally {
      setLoading(false)
    }
  }, [fetchSheetData])

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
    } catch {
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
    } catch {
      toast.error('Failed to save notes')
    }
  }

  const updateStatus = async (trackingId, newStatus) => {
    setTrackingData(prev => prev.map(row => row[0] === trackingId ? [row[0], newStatus, `Status updated to: ${newStatus}`, row[3], row[4]] : row))
    const pricingUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL_PRICING
    try {
      fetch(`${pricingUrl}?action=updateStatus&id=${encodeURIComponent(trackingId)}&status=${encodeURIComponent(newStatus)}`)
      toast.success(`Status updated to "${newStatus}" for ${trackingId}`)
    } catch {
      toast.error('Failed to update status')
    }
  }

  const isInDateRange = (timestamp) => {
    if (dateRange === 'all') return true
    const date = new Date(timestamp)
    const now = new Date()
    if (dateRange === 'today') return date.toDateString() === now.toDateString()
    if (dateRange === 'week') {
      const week = new Date(now - 7 * 86400000)
      return date >= week
    }
    if (dateRange === 'month') {
      const month = new Date(now.getFullYear(), now.getMonth(), 1)
      return date >= month
    }
    return true
  }

  const filteredPricing = createIndexedRows(pricingData)
    .filter(({ row }) => JSON.stringify(row).toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(({ row }) => filterStatus === 'all' ? true : filterStatus === 'not-contacted' ? row[8] !== 'Yes' : true)
    .filter(({ row }) => isInDateRange(row[0]))
    .sort((a, b) => new Date(b.row[0] || 0) - new Date(a.row[0] || 0))

  const filteredHome = createIndexedRows(homeData)
    .filter(({ row }) => JSON.stringify(row).toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(({ row }) => filterStatus === 'all' ? true : filterStatus === 'not-contacted' ? row[4] !== 'Yes' : true)
    .filter(({ row }) => isInDateRange(row[0]))
    .sort((a, b) => new Date(b.row[0] || 0) - new Date(a.row[0] || 0))

  const filteredTracking = createIndexedRows(trackingData)
    .filter(({ row }) => JSON.stringify(row).toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(({ row }) => filterStatus === 'all' ? true : filterStatus === 'in-progress' ? row[1] !== 'completed' : true)
    .filter(({ row }) => isInDateRange(row[3]))
    .sort((a, b) => new Date(b.row[3] || 0) - new Date(a.row[3] || 0))

  const exportCSV = () => {
    let csv = ''
    if (activeTab === 'pricing') {
      csv = 'Timestamp,Phone,Document,Service,Pages,Estimate,Status,TrackingID,Contacted,Notes\n'
      filteredPricing.forEach(({ row }) => { csv += row.map(csvEscape).join(',') + '\n' })
    } else if (activeTab === 'home') {
      csv = 'Timestamp,Phone,Service,Message,Contacted,Notes\n'
      filteredHome.forEach(({ row }) => { csv += row.map(csvEscape).join(',') + '\n' })
    } else {
      csv = 'TrackingID,Status,Message,Date,Service\n'
      filteredTracking.forEach(({ row }) => { csv += row.map(csvEscape).join(',') + '\n' })
    }
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `professionall-${activeTab}-${new Date().toISOString().split('T')[0]}.csv`
    anchor.click()
    URL.revokeObjectURL(url)
    toast.success('CSV exported')
  }

  const deleteEntry = async (sheet, rowIndex) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return
    const url = sheet === 'home' ? import.meta.env.VITE_GOOGLE_SHEETS_URL_HOME : import.meta.env.VITE_GOOGLE_SHEETS_URL_PRICING
    const sheetName = sheet === 'home' ? 'Sheet1' : 'Requests'

    if (sheet === 'home') {
      setHomeData(prev => prev.filter((_, i) => i !== rowIndex))
    } else {
      setPricingData(prev => prev.filter((_, i) => i !== rowIndex))
    }

    toast.success('Entry deleted')

    try {
      fetch(`${url}?action=deleteRow&sheet=${sheetName}&row=${rowIndex + 2}`).catch(() => {})
    } catch {
      // Entry is already removed from the local UI.
    }
  }

  useEffect(() => {
    if (!authenticated) return undefined
    let active = true
    Promise.resolve().then(() => {
      if (active) loadData()
    })
    return () => {
      active = false
    }
  }, [authenticated, loadData])

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 pt-14 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/80"
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50">
            <Lock className="h-7 w-7 text-teal-700" />
          </div>
          <h2 className="text-center text-xl font-bold text-slate-950">Admin Panel</h2>
          <p className="mb-6 mt-1 text-center text-sm text-slate-500">Enter password to access the dashboard</p>
          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm transition-all focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <button type="submit" className="w-full rounded-xl bg-teal-700 py-3 font-bold text-white shadow-lg shadow-teal-900/10 transition-all hover:bg-teal-800 active:scale-[0.99]">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  const activeRows = activeTab === 'pricing' ? filteredPricing : activeTab === 'tracking' ? filteredTracking : filteredHome
  const activeTotal = activeTab === 'pricing' ? pricingData.length : activeTab === 'tracking' ? trackingData.length : homeData.length
  const activeLabel = activeTab === 'pricing' ? 'requests' : activeTab === 'tracking' ? 'tracking rows' : 'leads'
  const activeFilterCount = (searchQuery.trim() ? 1 : 0) + (filterStatus !== 'all' ? 1 : 0) + (dateRange !== 'all' ? 1 : 0)
  const tabCounts = {
    pricing: filteredPricing.length,
    tracking: filteredTracking.length,
    home: filteredHome.length,
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-14 sm:pt-16">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <HeaderActions
          loading={loading}
          loadData={() => loadData(true)}
          exportCSV={exportCSV}
          setAuthenticated={setAuthenticated}
        />

        <StatsCards pricingData={pricingData} homeData={homeData} trackingData={trackingData} />

        <SearchFilterBar
          activeFilterCount={activeFilterCount}
          dateRange={dateRange}
          filterStatus={filterStatus}
          resultCount={activeRows.length}
          searchQuery={searchQuery}
          setDateRange={setDateRange}
          setFilterStatus={setFilterStatus}
          setSearchQuery={setSearchQuery}
          totalCount={activeTotal}
        />

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} counts={tabCounts} />
          <p className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm ring-1 ring-slate-200">
            Showing <span className="font-bold text-slate-900">{activeRows.length}</span> of <span className="font-bold text-slate-900">{activeTotal}</span> {activeLabel}
          </p>
        </div>

        <RequestsTable
          getStatusOptionsForService={getStatusOptionsForService}
          loading={loading}
          onContactedChange={updateContacted}
          onDelete={deleteEntry}
          onNotesSave={updateNotes}
          onStatusChange={updateStatus}
          rows={activeRows}
          totalCount={activeTotal}
          type={activeTab}
        />
      </div>
    </div>
  )
}
