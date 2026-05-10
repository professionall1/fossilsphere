import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MessageCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function TrackingInput() {
  const [trackId, setTrackId] = useState('')
  const [result, setResult] = useState(null)

  const handleTrack = () => {
    if (!trackId.trim()) return
    const id = trackId.replace(/\D/g, '')
    if (id === '101') {
      setResult({ status: 'In Progress', icon: Clock, color: 'text-accent' })
    } else {
      setResult({ status: 'Contact Support', icon: AlertCircle, color: 'text-highlight' })
    }
  }

  const openWhatsApp = () => {
    const number = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'
    const msg = `Hi, I want to track my request. Tracking ID: ${trackId}`
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sm:p-8 max-w-md mx-auto"
    >
      <h2 className="font-syne font-bold text-2xl text-white mb-2">Track Your Request</h2>
      <p className="text-white/60 text-sm mb-6">Enter your tracking ID (e.g. PRO-101)</p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={trackId}
          onChange={e => setTrackId(e.target.value)}
          placeholder="PRO-101"
          className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
        />
        <button onClick={handleTrack} className="px-5 py-3 bg-accent text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <result.icon className={`w-6 h-6 ${result.color}`} />
            <div>
              <p className="text-white/60 text-xs">Status</p>
              <p className={`font-bold ${result.color}`}>{result.status}</p>
            </div>
          </div>
        </motion.div>
      )}

      <button onClick={openWhatsApp} className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors">
        <MessageCircle className="w-5 h-5" /> Track via WhatsApp
      </button>

      <p className="text-white/40 text-xs mt-4 text-center">For real-time updates, reload or contact us on WhatsApp</p>
    </motion.div>
  )
}
