import { FileText, Inbox, Trash2 } from 'lucide-react'
import ContactedSelect from './ContactedSelect'
import MobileRequestCard from './MobileRequestCard'
import NotesField from './NotesField'
import PhoneLink from './PhoneLink'
import StatusBadge from './StatusBadge'

function formatDate(value) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value).split('T')[0] || '-'
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatOption(value) {
  return String(value || '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

function formatEstimate(value) {
  const text = String(value || '').trim()
  if (!text) return '-'
  return /^rs\.?\s/i.test(text) ? text : `Rs. ${text}`
}

function DeleteButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 transition-all hover:bg-rose-100 hover:text-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-500/10"
      title="Delete"
      aria-label="Delete entry"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}

function LoadingSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70">
      <div className="animate-pulse space-y-3">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="grid gap-3 rounded-xl bg-slate-50 p-3 md:grid-cols-[1fr_1.4fr_1fr_1fr]">
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-4 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  )
}

function EmptyState({ label }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm shadow-slate-200/70">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-slate-900">No {label} found</h3>
      <p className="mt-1 text-sm text-slate-500">Try changing the search term or filters.</p>
    </div>
  )
}

function TableShell({ children }) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/70 lg:block">
      <div className="max-h-[680px] overflow-auto">
        {children}
      </div>
    </div>
  )
}

function FooterCount({ count, totalCount, label }) {
  return (
    <div className="mt-3 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm shadow-slate-200/70 sm:flex-row sm:items-center sm:justify-between">
      <span>Showing <strong className="font-bold text-slate-900">{count}</strong> of <strong className="font-bold text-slate-900">{totalCount}</strong> {label}</span>
      <span className="text-xs">Filtered results update as you search.</span>
    </div>
  )
}

const thClass = 'sticky top-0 z-10 bg-slate-50/95 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500 backdrop-blur'
const tdClass = 'px-4 py-4 align-top text-sm text-slate-700'

export default function RequestsTable({
  getStatusOptionsForService,
  loading,
  onContactedChange,
  onDelete,
  onNotesSave,
  onStatusChange,
  rows,
  totalCount,
  type,
}) {
  const label = type === 'home' ? 'leads' : type === 'tracking' ? 'tracking rows' : 'requests'

  if (loading) return <LoadingSkeleton />
  if (rows.length === 0) return <EmptyState label={label} />

  return (
    <>
      {type === 'pricing' && (
        <TableShell>
          <table className="min-w-full border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th className={thClass}>ID</th>
                <th className={thClass}>Phone</th>
                <th className={thClass}>Document</th>
                <th className={thClass}>Service</th>
                <th className={thClass}>Pages</th>
                <th className={thClass}>Estimate</th>
                <th className={thClass}>Status</th>
                <th className={thClass}>Contacted</th>
                <th className={thClass}>Notes</th>
                <th className={`${thClass} text-right`}>Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map(item => {
                const { row, rowIndex } = item
                return (
                  <tr key={`request-${rowIndex}-${row[7] || row[0] || rowIndex}`} className="transition-colors hover:bg-teal-50/30">
                    <td className={tdClass}>
                      <p className="font-bold text-teal-700">{row[7] || '-'}</p>
                      <p className="mt-1 text-xs text-slate-400">{formatDate(row[0])}</p>
                    </td>
                    <td className={`${tdClass} whitespace-nowrap`}><PhoneLink phone={row[1]} /></td>
                    <td className={`${tdClass} min-w-[210px] max-w-[300px]`}>
                      <div className="flex gap-2">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                        <span className="break-words leading-5 text-slate-800">{row[2] || '-'}</span>
                      </div>
                    </td>
                    <td className={`${tdClass} font-semibold text-slate-800`}>{row[3] || '-'}</td>
                    <td className={`${tdClass} text-center font-semibold`}>{row[4] || '-'}</td>
                    <td className={`${tdClass} whitespace-nowrap font-bold text-emerald-700`}>{formatEstimate(row[5])}</td>
                    <td className={tdClass}><StatusBadge status={row[6]} /></td>
                    <td className={tdClass}>
                      <ContactedSelect value={row[8] || 'No'} onChange={event => onContactedChange('pricing', rowIndex, event.target.value)} />
                    </td>
                    <td className={`${tdClass} min-w-[180px]`}>
                      <NotesField value={row[9] || ''} onSave={value => onNotesSave('pricing', rowIndex, value)} />
                    </td>
                    <td className={`${tdClass} text-right`}>
                      <DeleteButton onClick={() => onDelete('pricing', rowIndex)} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </TableShell>
      )}

      {type === 'tracking' && (
        <TableShell>
          <table className="min-w-full border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th className={thClass}>Tracking ID</th>
                <th className={thClass}>Current Status</th>
                <th className={thClass}>Message</th>
                <th className={thClass}>Date</th>
                <th className={thClass}>Service</th>
                <th className={thClass}>Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map(item => {
                const { row, rowIndex } = item
                return (
                  <tr key={`tracking-${row[0] || rowIndex}`} className="transition-colors hover:bg-teal-50/30">
                    <td className={`${tdClass} whitespace-nowrap font-bold text-teal-700`}>{row[0] || '-'}</td>
                    <td className={tdClass}><StatusBadge status={row[1]} /></td>
                    <td className={`${tdClass} min-w-[250px] max-w-[420px] leading-5 text-slate-600`}>{row[2] || '-'}</td>
                    <td className={`${tdClass} whitespace-nowrap text-xs text-slate-500`}>{formatDate(row[3])}</td>
                    <td className={`${tdClass} font-semibold text-slate-800`}>{row[4] || '-'}</td>
                    <td className={tdClass}>
                      <select
                        value={row[1] || ''}
                        onChange={event => onStatusChange(row[0], event.target.value)}
                        className="min-w-[160px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10"
                      >
                        {getStatusOptionsForService(row[4]).map(status => (
                          <option key={status} value={status}>{formatOption(status)}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </TableShell>
      )}

      {type === 'home' && (
        <TableShell>
          <table className="min-w-full border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th className={thClass}>Date</th>
                <th className={thClass}>Phone</th>
                <th className={thClass}>Service</th>
                <th className={thClass}>Message</th>
                <th className={thClass}>Contacted</th>
                <th className={thClass}>Notes</th>
                <th className={`${thClass} text-right`}>Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map(item => {
                const { row, rowIndex } = item
                return (
                  <tr key={`lead-${rowIndex}-${row[0] || rowIndex}`} className="transition-colors hover:bg-teal-50/30">
                    <td className={`${tdClass} whitespace-nowrap text-xs text-slate-500`}>{formatDate(row[0])}</td>
                    <td className={`${tdClass} whitespace-nowrap`}><PhoneLink phone={row[1]} /></td>
                    <td className={`${tdClass} font-semibold text-slate-800`}>{row[2] || '-'}</td>
                    <td className={`${tdClass} min-w-[240px] max-w-[420px] leading-5 text-slate-600`}>{row[3] || '-'}</td>
                    <td className={tdClass}>
                      <ContactedSelect value={row[4] || 'No'} onChange={event => onContactedChange('home', rowIndex, event.target.value)} />
                    </td>
                    <td className={`${tdClass} min-w-[180px]`}>
                      <NotesField value={row[5] || ''} onSave={value => onNotesSave('home', rowIndex, value)} />
                    </td>
                    <td className={`${tdClass} text-right`}>
                      <DeleteButton onClick={() => onDelete('home', rowIndex)} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </TableShell>
      )}

      <div className="space-y-3 lg:hidden">
        {rows.map(item => (
          <MobileRequestCard
            key={`mobile-${type}-${item.rowIndex}-${item.row[7] || item.row[0] || item.rowIndex}`}
            getStatusOptionsForService={getStatusOptionsForService}
            item={item}
            onContactedChange={onContactedChange}
            onDelete={onDelete}
            onNotesSave={onNotesSave}
            onStatusChange={onStatusChange}
            type={type}
          />
        ))}
      </div>

      <FooterCount count={rows.length} totalCount={totalCount} label={label} />
    </>
  )
}
