import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Clock, CheckCircle2, AlertCircle, Package, Loader2, CircleDot } from 'lucide-react'
import { trackRequest } from '../utils/googleSheets'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function Track() {
  const [trackId, setTrackId] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleTrack = async () => {
    if (!trackId.trim()) return
    setLoading(true)
    setSearched(true)

    const data = await trackRequest(trackId.trim())

    const statusMap = {
      'pending': { status: 'Pending Review', desc: data.message || 'Your request has been received and is awaiting assignment.', icon: CircleDot, color: 'text-yellow-600', bg: 'bg-yellow-50' },
      'in-progress': { status: 'In Progress', desc: data.message || 'Your document is being drafted by our legal team.', icon: Clock, color: 'text-accent', bg: 'bg-accent/10' },
      'completed': { status: 'Completed', desc: data.message || 'Your document has been delivered.', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
      'not-found': { status: 'Not Found', desc: data.message || 'Tracking ID not found. Please check and try again.', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
      'error': { status: 'Error', desc: data.message || 'Something went wrong. Please try again.', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
    }

    setResult(statusMap[data.status] || statusMap['not-found'])
    setLoading(false)
  }

  return (
    <div className="pt-14 sm:pt-16">
      {/* Header */}
      <section className="hero-gradient relative overflow-hidden py-14 sm:py-20 border-b border-gray-100">
        <div className="absolute inset-0 hero-gradient-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="w-16 h-16 bg-accent/10 border border-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Package className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl text-primary mb-3">
              Track Your Request
            </h1>
            <p className="text-textsecondary max-w-md mx-auto">
              Enter your tracking ID to check the real-time status of your legal document or filing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tracking */}
      <section className="py-10 sm:py-16 bg-bglight">
        <div className="max-w-lg mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-primary mb-1">Enter Tracking ID</h3>
            <p className="text-textsecondary text-sm mb-5">Your tracking ID was shared after submission (e.g. PRO-101)</p>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={trackId}
                onChange={e => setTrackId(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleTrack()}
                placeholder="PRO-101"
                className="flex-1 px-4 py-3 bg-bglight border border-gray-200 rounded-xl text-textprimary placeholder-textsecondary focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40 text-sm font-medium"
              />
              <button
                onClick={handleTrack}
                disabled={loading}
                className="px-6 py-3 bg-accent text-white rounded-xl font-bold hover:bg-accent/90 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span className="hidden sm:inline">Track</span>
              </button>
            </div>

            {searched && result && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-xl ${result.bg} border border-gray-100`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full ${result.bg} flex items-center justify-center shrink-0`}>
                    <result.icon className={`w-5 h-5 ${result.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-textsecondary mb-0.5">Status</p>
                    <p className={`font-bold text-lg ${result.color}`}>{result.status}</p>
                    <p className="text-textsecondary text-sm mt-1">{result.desc}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <p className="text-textsecondary text-xs mt-5 text-center">
              Status updates are fetched from our system in real time.
            </p>
          </motion.div>

          {/* Info */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
              <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="font-bold text-primary text-sm">Avg. Delivery</p>
              <p className="text-textsecondary text-xs mt-1">24-48 hours</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
              <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="font-bold text-primary text-sm">Real-Time Updates</p>
              <p className="text-textsecondary text-xs mt-1">Via Google Sheets</p>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-textsecondary text-xs text-center">
              <strong className="text-textprimary">Demo:</strong> Try "PRO-101" (In Progress) or "PRO-102" (Completed)
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
