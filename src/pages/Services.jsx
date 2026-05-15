import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, FolderOpen, Users, Hash, CheckCircle, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import PriceCalculator from '../components/PriceCalculator'
import { submitHomeLead } from '../utils/googleSheets'
import { FORM_SERVICE_OPTIONS, PRICING } from '../data/services'
import documentTypes from '../data/documentTypes'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } })
}

const serviceInclusions = [
  'Requirement review before preparation',
  'Document type and category mapping',
  'Drafting or filing estimate before submission',
  'Request status tracking after intake',
  'Clear coordination for appear hearing requests',
  'Responsive support for next steps',
]

const coverageCategories = Array.from(
  documentTypes.reduce((map, item) => {
    if (!map.has(item.category)) map.set(item.category, [])
    map.get(item.category).push(item)
    return map
  }, new Map())
).slice(0, 8)

export default function Services() {
  const [form, setForm] = useState({ phone: '', service: FORM_SERVICE_OPTIONS[0].label, details: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.phone) return toast.error('Please enter your phone number')
    setLoading(true)
    await submitHomeLead({ phone: form.phone, service: form.service, message: form.details || form.service })
    setLoading(false)
    toast.success('Request submitted! We will contact you soon.')
    setForm({ phone: '', service: FORM_SERVICE_OPTIONS[0].label, details: '' })
  }

  return (
    <div className="pt-14 sm:pt-16">
      {/* Header */}
      <section className="hero-gradient relative overflow-hidden py-10 sm:py-16 border-b border-slate-200">
        <div className="absolute inset-0 hero-gradient-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl text-primary mb-3">
              Our <span className="text-accent">Services</span>
            </h1>
            <p className="text-textsecondary max-w-lg mx-auto">
              Expert legal drafting, filing, numbering and appear hearing support — all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator FIRST */}
      <section className="py-10 sm:py-16 bg-white" id="calculator-section">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Pricing Tool</span>
            <h2 className="font-bold text-3xl text-primary mt-2 mb-3">Calculate Your Cost</h2>
            <p className="text-textsecondary max-w-md mx-auto">Select your document type, choose a service, and get an instant price estimate.</p>
          </motion.div>
          <PriceCalculator />
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-10 sm:py-16 bg-bglight">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-8 sm:mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Services</span>
            <h2 className="font-bold text-2xl sm:text-3xl text-primary mt-2">Drafting, Filing, Numbering & Appear Hearing</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: FileText, title: 'Legal Drafting', price: `₹${PRICING.draftingPerPage}/page`,
                desc: 'Professional drafting of all court petitions, agreements, deeds & notices.',
                items: ['Court Petitions', 'Agreements', 'Property Deeds', 'Legal Notices']
              },
              {
                icon: FolderOpen, title: 'Court Filing', price: `₹${PRICING.filing.toLocaleString()} flat`,
                desc: 'Court Filing – ₹2,999 (Intercity & excluding court fee).',
                items: ['District Courts', 'High Courts', 'Consumer Forums', 'Tribunals']
              },
              {
                icon: Hash, title: 'Numbering', price: 'Included',
                desc: 'Proper page numbering, indexing, and formatting as per court requirements.',
                items: ['Page Numbering', 'Court Indexing', 'Proper Formatting', 'Certified Copies']
              },
              {
                icon: Users, title: 'Appear Hearing', price: `₹${PRICING.appearHearing.toLocaleString()}/- (Intercity)`,
                desc: 'Appear Hearing support for scheduled court requirements.',
                items: ['Civil & Criminal', 'Family Law', 'Corporate', 'Property']
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:border-accent/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                    <card.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-accent font-bold text-xs bg-accent/10 border border-accent/15 px-2.5 py-1 rounded-full">{card.price}</span>
                </div>
                <h3 className="font-bold text-lg text-primary mb-2">{card.title}</h3>
                <p className="text-textsecondary text-sm mb-4 leading-relaxed">{card.desc}</p>
                <ul className="space-y-2">
                  {card.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-textprimary">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Drafting Coverage</span>
            <h2 className="font-bold text-2xl sm:text-3xl text-primary mt-2">Matter types covered by the document library</h2>
            <p className="text-textsecondary max-w-2xl mx-auto mt-3">
              The calculator search is backed by a structured list of court and non-litigation drafts, so users can discover the right document from legal categories instead of guessing.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coverageCategories.map(([category, items], i) => (
              <motion.div
                key={category}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="rounded-2xl border border-slate-200 bg-gradient-to-br from-bglight to-white p-5 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h3 className="font-bold text-primary">{category}</h3>
                  <span className="text-xs font-bold text-accent bg-accent/10 border border-accent/15 rounded-full px-2.5 py-1">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.slice(0, 3).map(item => (
                    <p key={item.id} className="text-sm text-textsecondary flex gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                      <span>{item.displayName}</span>
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-8 sm:mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Process</span>
            <h2 className="font-bold text-2xl sm:text-3xl text-primary mt-2">How It Works</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { step: '01', title: 'Submit a Request & Get Quote', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop', desc: 'Share your requirement and receive an instant quote' },
              { step: '02', title: 'We Draft & File', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=200&fit=crop', desc: 'Our expert lawyers draft and file your documents' },
              { step: '03', title: 'Review for Approval', img: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=300&h=200&fit=crop', desc: 'Review the draft and request any changes needed' },
              { step: '04', title: 'Track Progress in Real Time', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop', desc: 'Track your request status via our tracking system' },
            ].map((item, i) => (
              <motion.div key={item.step} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <div className="h-36 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 text-center">
                  <div className="w-8 h-8 bg-accent text-white font-bold rounded-full flex items-center justify-center mx-auto mb-2 text-xs">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-primary text-sm mb-1">{item.title}</h4>
                  <p className="text-textsecondary text-xs">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-12 sm:py-16 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">What Clients Get</span>
            <h2 className="font-bold text-3xl sm:text-4xl mt-2">A clearer, more complete request experience</h2>
            <p className="text-white/75 mt-4 leading-relaxed">
              Each service path is designed to keep the client informed from the first quote through drafting, filing, completion, or appear hearing coordination.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="grid sm:grid-cols-2 gap-3">
            {serviceInclusions.map(item => (
              <div key={item} className="flex items-start gap-3 rounded-xl bg-white/8 border border-white/10 p-4">
                <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-sm text-white/85">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-10 sm:py-16 bg-bglight border-t border-slate-200">
        <div className="max-w-md mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="text-center mb-8">
              <h2 className="font-bold text-2xl text-primary mb-2">Request a Service</h2>
              <p className="text-textsecondary text-sm">Submit your details and we'll get back to you.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl shadow-primary/5 space-y-4">
              <div>
                <label className="text-sm font-bold text-textprimary mb-1.5 block">Phone Number**</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-textprimary mb-2 block">Service Needed</label>
                <div className="grid grid-cols-2 gap-2">
                  {FORM_SERVICE_OPTIONS.map(option => (
                    <button
                      type="button"
                      key={option.value}
                      onClick={() => setForm({ ...form, service: option.label })}
                      className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all ${
                        form.service === option.label
                          ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                          : 'bg-white text-textprimary border-slate-300 hover:border-accent/50 hover:bg-accent/5'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-textprimary mb-1.5 block">Requirement Details</label>
                <textarea
                  placeholder="Describe what you need help with..."
                  value={form.details}
                  onChange={e => setForm({ ...form, details: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Submitting...' : <><span>Submit Request</span> <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
