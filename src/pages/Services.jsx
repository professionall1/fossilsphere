import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, FolderOpen, Users, Hash, CheckCircle, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import PriceCalculator from '../components/PriceCalculator'
import { submitToGoogleSheets } from '../utils/googleSheets'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } })
}

export default function Services() {
  const [form, setForm] = useState({ phone: '', service: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.phone) return toast.error('Please enter your phone number')
    setLoading(true)
    await submitToGoogleSheets({ phone: form.phone, service: form.service, message: form.service })
    setLoading(false)
    toast.success('Request submitted! We will contact you soon.')
    setForm({ phone: '', service: '' })
  }

  return (
    <div className="pt-14 sm:pt-16">
      {/* Header */}
      <section className="hero-gradient relative overflow-hidden py-10 sm:py-16 border-b border-gray-100">
        <div className="absolute inset-0 hero-gradient-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl text-primary mb-3">
              Our <span className="text-accent">Services</span>
            </h1>
            <p className="text-textsecondary max-w-lg mx-auto">
              Expert legal drafting, filing, numbering & lawyer matching — all in one place.
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
            <h2 className="font-bold text-2xl sm:text-3xl text-primary mt-2">Drafting, Filing, Numbering & Lawyer Matching</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: FileText, title: 'Legal Drafting', price: '₹199/page',
                desc: 'Professional drafting of all court petitions, agreements, deeds & notices.',
                items: ['Court Petitions', 'Agreements', 'Property Deeds', 'Legal Notices']
              },
              {
                icon: FolderOpen, title: 'Court Filing', price: '₹2,499 flat',
                desc: 'Complete filing in any court across India with document verification.',
                items: ['District Courts', 'High Courts', 'Consumer Forums', 'Tribunals']
              },
              {
                icon: Hash, title: 'Numbering', price: 'Included',
                desc: 'Proper page numbering, indexing, and formatting as per court requirements.',
                items: ['Page Numbering', 'Court Indexing', 'Proper Formatting', 'Certified Copies']
              },
              {
                icon: Users, title: 'Lawyer Matching', price: 'Free Consult',
                desc: 'Get connected with verified specialists for your specific case type.',
                items: ['Civil & Criminal', 'Family Law', 'Corporate', 'Property']
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-accent/15 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                    <card.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-accent font-bold text-xs bg-accent/5 px-2.5 py-1 rounded-full">{card.price}</span>
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
                className="bg-bglight rounded-2xl overflow-hidden border border-gray-100">
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

      {/* Contact Form */}
      <section className="py-10 sm:py-16 bg-bglight border-t border-gray-100">
        <div className="max-w-md mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="text-center mb-8">
              <h2 className="font-bold text-2xl text-primary mb-2">Request a Service</h2>
              <p className="text-textsecondary text-sm">Submit your details and we'll get back to you.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <div>
                <label className="text-sm font-bold text-textprimary mb-1.5 block">Phone Number**</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-bglight border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-textprimary mb-1.5 block">Service Needed</label>
                <textarea
                  placeholder="Describe what you need help with..."
                  value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-bglight border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40 text-sm resize-none"
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
