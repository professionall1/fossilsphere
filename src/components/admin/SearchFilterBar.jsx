import { Calendar, Search } from 'lucide-react'

const statusFilters = [
  { id: 'all', label: 'All' },
  { id: 'not-contacted', label: 'Not Contacted' },
  { id: 'in-progress', label: 'In Progress' },
]

const dateFilters = [
  { id: 'all', label: 'All Time' },
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
]

export default function SearchFilterBar({
  activeFilterCount,
  dateRange,
  filterStatus,
  resultCount,
  searchQuery,
  setDateRange,
  setFilterStatus,
  setSearchQuery,
  totalCount,
}) {
  return (
    <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search phone, ID, document..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10"
          />
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500 lg:min-w-[190px]">
          <span>Showing</span>
          <span className="text-slate-900">{resultCount} of {totalCount}</span>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[auto_1fr] lg:items-start">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-teal-700">
            {activeFilterCount} active
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">Status</span>
            {statusFilters.map(f => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id)}
                className={`rounded-full px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
                  filterStatus === f.id
                    ? 'bg-teal-700 text-white shadow-sm shadow-teal-900/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">Date</span>
            {dateFilters.map(f => (
              <button
                key={f.id}
                onClick={() => setDateRange(f.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
                  dateRange === f.id
                    ? 'bg-slate-900 text-white shadow-sm shadow-slate-900/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Calendar className="h-3.5 w-3.5" /> {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
