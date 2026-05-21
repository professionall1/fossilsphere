import { CheckCircle2, Clock, FileText, IndianRupee, Users } from 'lucide-react'

const stats = [
  { key: 'requests', label: 'Requests', sub: 'Total requests', icon: FileText, tone: 'bg-teal-50 text-teal-700 border-teal-100' },
  { key: 'leads', label: 'Leads', sub: 'Pending leads', icon: Users, tone: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
  { key: 'done', label: 'Done', sub: 'Completed', icon: CheckCircle2, tone: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { key: 'active', label: 'Active', sub: 'In progress', icon: Clock, tone: 'bg-amber-50 text-amber-700 border-amber-100' },
  { key: 'revenue', label: 'Revenue', sub: 'Total estimated', icon: IndianRupee, tone: 'bg-green-50 text-green-700 border-green-100' },
]

export default function StatsCards({ pricingData, homeData, trackingData }) {
  const revenue = pricingData.reduce((sum, row) => sum + (parseInt(String(row[5] || '0').replace(/[^0-9]/g, '')) || 0), 0)

  const values = {
    requests: pricingData.length,
    leads: homeData.length,
    done: trackingData.filter(r => r[1] === 'completed').length,
    active: trackingData.filter(r => r[1] !== 'completed').length,
    revenue: `Rs. ${revenue.toLocaleString()}`,
  }

  return (
    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map(s => (
        <div key={s.key} className={`rounded-2xl border bg-white p-4 shadow-sm shadow-slate-200/70 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${s.tone}`}>
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{s.label}</p>
              <p className="mt-1 text-[11px] font-medium text-slate-500">{s.sub}</p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-sm">
              <s.icon className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-bold tracking-tight text-slate-900">{values[s.key]}</p>
        </div>
      ))}
    </div>
  )
}
