import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MessageCircle, Clock, AlertCircle, CheckCircle2, Package } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function Tracking() {
  const [trackId, setTrackId] = useState('')
  const [result, setResult] = useState(null)
  const [searched, setSearched] = useState(false)

  const handleTrack = () => {
    if (!trackId.trim()) return
    setSearched(true)
    const id = trackId.replace(/\D/g, '')
    if (id === '101') {
      setResult({ status: 'In Progress', desc: 'Your document is being drafted by our legal team. Expected delivery within 24 hours.', icon: Clock, color: 'text-accent', bg: 'bg-accent/10' })
    } else if (id === '102') {
      setResult({ status: 'Completed', desc: 'Your document has been delivered. Check your WhatsApp for the final copy.', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' })
    } else {
      setResult({ status: 'Not Found', desc: 'We couldn\'t find this tracking ID. Please verify or contact support on WhatsApp.', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' })
    }
  }

  const openWhatsApp = () => {
    const number = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'
    const msg = `Hi, I want to track my request. Tracking ID: ${trackId || 'N/A'}`
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="hero-gradient relative overflow-hidden py-20 border-b border-gray-100">
        <div className="absolute inset-0 hero-gradient-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="w-16 h-16 bg-accent/10 border border-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Package className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-heading font-semibold text-4xl sm:text-5xl text-primary mb-3">
              Track Your Request
            </h1>
            <p className="text-textsecondary max-w-md mx-auto">
              Enter your tracking ID to check the status of your legal document or filing request.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tracking Card */}
      <section className="py-16 bg-bglight">
        <div className="max-w-lg mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h3 className="font-heading font-semibold text-xl text-primary mb-1">Enter Tracking ID</h3>
            <p className="text-textsecondary text-sm mb-5">Your tracking ID was shared on WhatsApp (e.g. PRO-101)</p>

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
                className="px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent/90 transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Track</span>
              </button>
            </div>

            {/* Result */}
            {searched && result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-xl ${result.bg} border border-gray-100 mb-5`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full ${result.bg} flex items-center justify-center shrink-0`}>
                    <result.icon className={`w-5 h-5 ${result.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-textsecondary mb-0.5">Status</p>
                    <p className={`font-heading font-semibold text-lg ${result.color}`}>{result.status}</p>
                    <p className="text-textsecondary text-sm mt-1">{result.desc}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* WhatsApp CTA */}
            <button
              onClick={openWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> Track via WhatsApp
            </button>

            <p className="text-textsecondary text-xs mt-4 text-center">
              For real-time updates, contact us directly on WhatsApp. We respond within minutes.
            </p>
          </motion.div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-white rounded-xl p-5 border border-gray-100 text-center">
              <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="font-heading font-semibold text-primary text-sm">Avg. Delivery</p>
              <p className="text-textsecondary text-xs mt-1">24-48 hours</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-white rounded-xl p-5 border border-gray-100 text-center">
              <MessageCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="font-heading font-semibold text-primary text-sm">Live Support</p>
              <p className="text-textsecondary text-xs mt-1">WhatsApp 24/7</p>
            </motion.div>
          </div>

          {/* Demo Note */}
          <div className="mt-8 bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-textsecondary text-xs text-center">
              <strong className="text-textprimary">Demo:</strong> Try tracking IDs "PRO-101" (In Progress) or "PRO-102" (Completed)
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
