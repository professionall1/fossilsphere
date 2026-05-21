const STATUS_STYLES = {
  active: 'bg-teal-50 text-teal-700 border-teal-200',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  done: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  drafting: 'bg-sky-50 text-sky-700 border-sky-200',
  filing: 'bg-amber-50 text-amber-700 border-amber-200',
  'in-progress': 'bg-sky-50 text-sky-700 border-sky-200',
  numbering: 'bg-teal-50 text-teal-700 border-teal-200',
  'not-contacted': 'bg-rose-50 text-rose-700 border-rose-200',
  'appear-hearing': 'bg-orange-50 text-orange-700 border-orange-200',
}

function formatStatus(status) {
  return String(status || 'Unknown')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

export default function StatusBadge({ status }) {
  const key = String(status || '').toLowerCase().trim()
  const style = STATUS_STYLES[key] || 'bg-slate-50 text-slate-600 border-slate-200'

  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-bold leading-none ${style}`}>
      {formatStatus(status)}
    </span>
  )
}
