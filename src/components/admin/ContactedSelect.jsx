export default function ContactedSelect({ value, onChange }) {
  return (
    <select
      value={value || 'No'}
      onChange={onChange}
      aria-label="Contacted status"
      className={`min-w-[92px] cursor-pointer rounded-xl border px-3 py-2 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
        value === 'Yes'
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : 'bg-rose-50 text-rose-700 border-rose-200'
      }`}
    >
      <option value="No">No</option>
      <option value="Yes">Yes</option>
    </select>
  )
}
