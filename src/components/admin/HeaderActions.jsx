import { Download, LogOut, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

export default function HeaderActions({ loading, loadData, exportCSV, setAuthenticated }) {
  const buttonClass = 'inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-3.5 text-sm font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4'

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Professionall Admin</p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Admin Panel</h1>
        <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">Monitor document requests, leads, and tracking in one place.</p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
        <button
          onClick={exportCSV}
          className={`${buttonClass} border-slate-200 bg-white text-slate-700 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800`}
        >
          <Download className="h-4 w-4" /> <span>Export</span>
        </button>
        <button
          onClick={loadData}
          disabled={loading}
          className={`${buttonClass} border-slate-200 bg-white text-slate-700 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800`}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> <span>Refresh</span>
        </button>
        <button
          onClick={() => { localStorage.removeItem('admin_auth'); setAuthenticated(false); toast.success('Logged out') }}
          className={`${buttonClass} border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100`}
        >
          <LogOut className="h-4 w-4" /> <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
