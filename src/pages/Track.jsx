import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Clock, CheckCircle2, AlertCircle, Package, Loader2, CircleDot, RefreshCw } from 'lucide-react'
import { trackRequest } from '../utils/googleSheets'
import { getServiceConfig, getTrackingSteps, normalizeService, normalizeStatus } from '../data/services'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const statusMeta = {
  'drafting': {
    status: 'Drafting',
    desc: 'Your document is being drafted by our legal team.',
    icon: Clock,
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  'appear-hearing': {
    status: 'Appear Hearing',
    desc: 'Your appear hearing request is in progress.',
    icon: Clock,
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  'in-progress': {
    status: 'In Progress',
    desc: 'Your request is being worked on by our legal team.',
    icon: Clock,
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  'filing': {
    status: 'Filing',
    desc: 'Your document is being filed in court.',
    icon: Clock,
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  'numbering': {
    status: 'Numbering',
    desc: 'Your case is in the numbering stage.',
    icon: Clock,
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  'drafting-completed': {
    status: 'Drafting Completed',
    desc: 'Your draft is complete.',
    icon: CheckCircle2,
    color: 'text-green-700',
    bg: 'bg-green-50',
  },
  'filing-completed': {
    status: 'Filing Completed',
    desc: 'Your filing has been completed.',
    icon: CheckCircle2,
    color: 'text-green-700',
    bg: 'bg-green-50',
  },
  completed: {
    status: 'Completed',
    desc: 'Your request has been completed.',
    icon: CheckCircle2,
    color: 'text-green-700',
    bg: 'bg-green-50',
  },
  'not-found': {
    status: 'Not Found',
    desc: 'Tracking ID not found. Please check and try again.',
    icon: AlertCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
  error: {
    status: 'Error',
    desc: 'Something went wrong. Please try again.',
    icon: AlertCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
}

function getStepIndex(status, steps) {
  const statusToStep = {
    'drafting': 'Drafting',
    'in-progress': steps[0],
    'filing': 'Filing',
    'numbering': 'Numbering',
    'appear-hearing': 'Appear Hearing',
    'completed': 'Completed',
  }
  const stepLabel = statusToStep[status] || steps[0]
  const idx = steps.findIndex(s => s === stepLabel)
  return idx >= 0 ? idx : 0
}

function isStepComplete(status, stepIndex, steps) {
  const currentIdx = getStepIndex(status, steps)
  if (status === 'completed') return true
  return stepIndex < currentIdx
}

function TrackingBar({ service, status }) {
  const steps = getTrackingSteps(service)
  const currentIndex = getStepIndex(status, steps)
  const isCompleted = status === 'completed'

  return (
    <div className="mt-5">
      <div className="flex items-start justify-between gap-2">
        {steps.map((step, index) => {
          const complete = isCompleted || index < currentIndex
          const active = !isCompleted && index === currentIndex

          return (
            <div key={step} className="flex-1 text-center relative">
              {index > 0 && (
                <div className={`absolute top-4 right-1/2 w-full h-0.5 -z-0 ${complete || active ? 'bg-green-500' : 'bg-slate-200'}`} />
              )}
              <div className={`relative z-10 w-8 h-8 rounded-full mx-auto flex items-center justify-center border ${
                complete
                  ? 'bg-green-600 border-green-600 text-white'
                  : active
                    ? 'bg-accent border-accent text-white'
                    : 'bg-white border-slate-300 text-slate-400'
              }`}>
                {complete ? <CheckCircle2 className="w-4 h-4" /> : <CircleDot className="w-4 h-4" />}
              </div>
              <p className={`text-xs font-semibold mt-2 ${complete ? 'text-green-600' : active ? 'text-accent' : 'text-textsecondary'}`}>{step}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
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
    const normalizedStatus = normalizeStatus(data.status)
    const normalizedService = normalizeService(data.service)
    const meta = statusMeta[normalizedStatus] || statusMeta['not-found']

    setResult({
      ...data,
      normalizedStatus,
      normalizedService,
      ...meta,
      desc: data.message || meta.desc,
    })
    setLoading(false)
  }

  const canShowProgress = result && !['not-found', 'error'].includes(result.normalizedStatus)
  const serviceConfig = canShowProgress ? getServiceConfig(result.normalizedService) : null

  return (
    <div className="pt-14 sm:pt-16">
      <section className="hero-gradient relative overflow-hidden py-8 sm:py-12 border-b border-slate-200">
        <div className="absolute inset-0 hero-gradient-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="w-16 h-16 bg-accent/10 border border-accent/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
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

      <section className="py-6 sm:py-10 bg-bglight">
        <div className="max-w-lg mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-primary/5 border border-slate-200">
            <h3 className="font-bold text-xl text-primary mb-1">Enter Tracking ID</h3>
            <p className="text-textsecondary text-sm mb-5">Your tracking ID was shared after submission (e.g. 12345678)</p>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={trackId}
                onChange={e => setTrackId(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleTrack()}
                placeholder="12345678"
                className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-xl text-textprimary placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm font-medium"
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
                className={`p-5 rounded-xl ${result.bg} border border-slate-200`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center shrink-0">
                    <result.icon className={`w-5 h-5 ${result.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-textsecondary mb-0.5">Status</p>
                    <p className={`font-bold text-lg ${result.color}`}>{result.status}</p>
                    {serviceConfig && (
                      <p className="text-xs font-semibold text-textprimary mt-1">Service: {serviceConfig.label}</p>
                    )}
                    <p className="text-textsecondary text-sm mt-1">{result.desc}</p>
                  </div>
                </div>

                {canShowProgress && (
                  <TrackingBar service={result.normalizedService} status={result.normalizedStatus} />
                )}
              </motion.div>
            )}

            <p className="text-textsecondary text-xs mt-5 text-center flex items-center justify-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" />
              Reload the page for latest updates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm text-center">
              <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="font-bold text-primary text-sm">Average delivery</p>
              <p className="text-textsecondary text-xs mt-1">On time</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm text-center">
              <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="font-bold text-primary text-sm">Real time updates</p>
              <p className="text-textsecondary text-xs mt-1">By tracking</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
