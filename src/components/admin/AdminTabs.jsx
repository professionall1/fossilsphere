import { motion } from 'framer-motion'
import { Clock, FileText, Phone } from 'lucide-react'

const tabs = [
  { id: 'pricing', label: 'Requests', icon: FileText },
  { id: 'tracking', label: 'Tracking', icon: Clock },
  { id: 'home', label: 'Leads', icon: Phone },
]

export default function AdminTabs({ activeTab, setActiveTab, counts }) {
  return (
    <div className="w-full overflow-x-auto pb-1 sm:w-auto">
      <div className="grid min-w-max grid-cols-3 gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm shadow-slate-200/70 sm:inline-grid">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors duration-200 ${
              activeTab === tab.id
                ? 'text-teal-800'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="admin-active-tab"
                className="absolute inset-0 rounded-xl bg-teal-50 shadow-sm"
                transition={{ type: 'spring', stiffness: 360, damping: 32 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {(counts?.[tab.id] || 0) > 0 && (
                <span className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] leading-none ${activeTab === tab.id ? 'bg-white text-teal-700' : 'bg-slate-100 text-slate-500'}`}>
                  {counts[tab.id]}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
