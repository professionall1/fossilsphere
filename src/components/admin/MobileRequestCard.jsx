import { CalendarDays, FileText, Hash, MessageSquare, Trash2 } from 'lucide-react'
import ContactedSelect from './ContactedSelect'
import NotesField from './NotesField'
import PhoneLink from './PhoneLink'
import StatusBadge from './StatusBadge'

function formatDate(value) {
  if (!value) return 'No date'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value).split('T')[0] || 'No date'
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatOption(value) {
  return String(value || '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

function Field({ label, value, children }) {
  return (
    <div className="min-w-0 rounded-xl bg-slate-50 px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
      <div className="mt-1 min-w-0 text-sm font-semibold text-slate-800">
        {children || value || '-'}
      </div>
    </div>
  )
}

function DeleteButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 transition-all hover:bg-rose-100 hover:text-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-500/10"
      title="Delete"
      aria-label="Delete entry"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}

export default function MobileRequestCard({
  getStatusOptionsForService,
  item,
  onContactedChange,
  onDelete,
  onNotesSave,
  onStatusChange,
  type,
}) {
  const { row, rowIndex } = item

  if (type === 'tracking') {
    return (
      <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
              <Hash className="h-3.5 w-3.5" /> Tracking ID
            </div>
            <p className="mt-1 truncate text-base font-bold text-slate-950">{row[0] || '-'}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
              <CalendarDays className="h-3.5 w-3.5" /> {formatDate(row[3])}
            </p>
          </div>
          <StatusBadge status={row[1]} />
        </div>

        <div className="grid gap-2">
          <Field label="Service" value={row[4]} />
          <div className="rounded-xl bg-slate-50 px-3 py-2">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              <MessageSquare className="h-3.5 w-3.5" /> Message
            </p>
            <p className="mt-1 text-sm leading-5 text-slate-700">{row[2] || '-'}</p>
          </div>
        </div>

        <div className="mt-3 border-t border-slate-100 pt-3">
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-400">Update status</label>
          <select
            value={row[1] || ''}
            onChange={event => onStatusChange(row[0], event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10"
          >
            {getStatusOptionsForService(row[4]).map(status => (
              <option key={status} value={status}>{formatOption(status)}</option>
            ))}
          </select>
        </div>
      </article>
    )
  }

  if (type === 'home') {
    return (
      <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <PhoneLink phone={row[1]} />
            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
              <CalendarDays className="h-3.5 w-3.5" /> {formatDate(row[0])}
            </p>
          </div>
          <StatusBadge status={row[4] === 'Yes' ? 'Done' : 'Not Contacted'} />
        </div>

        <div className="grid gap-2">
          <Field label="Service" value={row[2]} />
          {row[3] && (
            <div className="rounded-xl bg-slate-50 px-3 py-2">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                <MessageSquare className="h-3.5 w-3.5" /> Message
              </p>
              <p className="mt-1 text-sm leading-5 text-slate-700">{row[3]}</p>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
          <ContactedSelect value={row[4] || 'No'} onChange={event => onContactedChange('home', rowIndex, event.target.value)} />
          <NotesField value={row[5] || ''} onSave={value => onNotesSave('home', rowIndex, value)} className="min-w-0 flex-1" />
          <DeleteButton onClick={() => onDelete('home', rowIndex)} />
        </div>
      </article>
    )
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            <Hash className="h-3.5 w-3.5" /> Request ID
          </div>
          <p className="mt-1 truncate text-base font-bold text-teal-700">{row[7] || '-'}</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <CalendarDays className="h-3.5 w-3.5" /> {formatDate(row[0])}
          </p>
        </div>
        <StatusBadge status={row[6]} />
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <Field label="Phone"><PhoneLink phone={row[1]} /></Field>
        <Field label="Service" value={row[3]} />
        <Field label="Document">
          <span className="flex min-w-0 items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{row[2] || '-'}</span>
          </span>
        </Field>
        <Field label="Pages" value={row[4]} />
        <Field label="Estimate" value={row[5] ? `Rs. ${row[5]}` : '-'} />
        <Field label="Contacted" value={row[8] === 'Yes' ? 'Yes' : 'No'} />
      </div>

      <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
        <ContactedSelect value={row[8] || 'No'} onChange={event => onContactedChange('pricing', rowIndex, event.target.value)} />
        <NotesField value={row[9] || ''} onSave={value => onNotesSave('pricing', rowIndex, value)} className="min-w-0 flex-1" />
        <DeleteButton onClick={() => onDelete('pricing', rowIndex)} />
      </div>
    </article>
  )
}
