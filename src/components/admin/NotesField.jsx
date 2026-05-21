import { useEffect, useState } from 'react'

export default function NotesField({ value, onSave, className = '' }) {
  const [saved, setSaved] = useState(false)
  const currentValue = value || ''

  useEffect(() => {
    if (!saved) return undefined
    const timeout = window.setTimeout(() => setSaved(false), 1600)
    return () => window.clearTimeout(timeout)
  }, [saved])

  const commit = (event) => {
    const nextValue = event.currentTarget.value
    if (nextValue === currentValue) return
    onSave(nextValue)
    setSaved(true)
  }

  return (
    <div className={`relative ${className}`}>
      <input
        key={currentValue}
        type="text"
        defaultValue={currentValue}
        onBlur={commit}
        onKeyDown={event => {
          if (event.key === 'Enter') event.currentTarget.blur()
        }}
        placeholder="Notes..."
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 pr-12 text-xs text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10"
      />
      {saved && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-teal-700">
          Saved
        </span>
      )}
    </div>
  )
}
