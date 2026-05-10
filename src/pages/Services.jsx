import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, FolderOpen, Users, CheckCircle, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import PriceCalculator from '../components/PriceCalculator'
import { submitToGoogleSheets } from '../utils/googleSheets'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } })
}

export default function Services() {
  const [form, setForm] = useState({ name: '', phone: '', service: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.phone) return toast.error('Please enter your phone number')
    setLoading(true)
    await submitToGoogleSheets({ ...form, message: form.service })
    setLoading(false)
    toast.success('Request submitted! Redirecting to WhatsApp...')

    const number = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'
    const msg = `Hi Professionall!\nName: ${form.name}\nPhone: ${form.phone}\nService Needed: ${form.service}`
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, '_blank')
    setForm({ name: '', phone: '', service: '' })
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="hero-gradient relative overflow-hidden py-20 sm:py-24 border-b border-gray-100">
        <div className="absolute inset-0 hero-gradient-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-block text-accent text-sm font-semibold uppercase tracking-wider bg-accent/5 border border-accent/10 rounded-full px-4 py-1.5 mb-4">Our Services</span>
            <h1 className="font-heading font-semibold text-4xl sm:text-5xl text-primary mb-4">
              Expert Legal Services<br />
              <span className="text-accent">Tailored for You</span>
            </h1>
            <p className="text-textsecondary max-w-lg mx-auto text-lg">
              From simple legal notices to complex court petitions — our verified lawyers handle it all with precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: FileText,
                title: 'Legal Drafting',
                price: '₹149/page',
                desc: 'Professional drafting of all types of legal documents by experienced advocates.',
                items: ['Court Petitions & Plaints', 'Agreements & Contracts', 'Property Deeds', 'Legal Notices', 'Affidavits & Declarations', 'Corporate Documents']
              },
              {
                icon: FolderOpen,
                title: 'Court Filing',
                price: '₹1,999 flat',
                desc: 'Complete filing assistance in any court across India with document verification.',
                items: ['District & Sessions Courts', 'High Courts', 'Consumer Forums', 'NCLT & Tribunals', 'Revenue Courts', 'Family Courts']
              },
              {
                icon: Users,
                title: 'Lawyer Matching',
                price: 'Free Consultation',
                desc: 'Get connected with verified specialists who have expertise in your specific case type.',
                items: ['Civil & Criminal Lawyers', 'Family Law Experts', 'Corporate Attorneys', 'Property Lawyers', 'Labour & Service', 'Writ & Constitutional']
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="bg-bglight rounded-2xl p-7 border border-gray-100 hover:shadow-lg hover:border-accent/15 transition-all"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center">
                    <card.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-accent font-bold text-sm bg-accent/5 px-3 py-1 rounded-full">{card.price}</span>
                </div>
                <h3 className="font-heading font-semibold text-xl text-primary mb-2">{card.title}</h3>
                <p className="text-textsecondary text-sm mb-5 leading-relaxed">{card.desc}</p>
                <ul className="space-y-2.5">
                  {card.items.map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-textprimary">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-bglight border-y border-gray-100" id="calculator-section">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Pricing Tool</span>
            <h2 className="font-heading font-semibold text-3xl text-primary mt-2 mb-3">Calculate Your Cost</h2>
            <p className="text-textsecondary max-w-md mx-auto">Select your document type, choose a service, and get an instant price estimate.</p>
          </motion.div>
          <PriceCalculator />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Process</span>
            <h2 className="font-heading font-semibold text-3xl text-primary mt-2">How It Works</h2>
          </motion.div>

          <div className="grid sm:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Tell Us', desc: 'Share your requirement via WhatsApp or form' },
              { step: '02', title: 'We Match', desc: 'Get paired with the right legal expert' },
              { step: '03', title: 'Draft & Review', desc: 'Lawyer drafts, you review and approve' },
              { step: '04', title: 'Delivered', desc: 'Get your final document or filing confirmation' },
            ].map((item, i) => (
              <motion.div key={item.step} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="text-center">
                <div className="w-12 h-12 bg-accent text-white font-heading font-semibold rounded-full flex items-center justify-center mx-auto mb-3 text-sm">
                  {item.step}
                </div>
                <h4 className="font-heading font-semibold text-primary mb-1">{item.title}</h4>
                <p className="text-textsecondary text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-bglight border-t border-gray-100">
        <div className="max-w-xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="text-center mb-8">
              <span className="text-accent text-sm font-semibold uppercase tracking-wider">Contact</span>
              <h2 className="font-heading font-semibold text-3xl text-primary mt-2 mb-2">Request a Service</h2>
              <p className="text-textsecondary text-sm">Fill in your details and we'll get back to you within minutes on WhatsApp.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
              <div>
                <label className="text-sm font-medium text-textprimary mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-bglight border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-textprimary mb-1.5 block">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-bglight border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-textprimary mb-1.5 block">Service Needed</label>
                <textarea
                  placeholder="Describe what you need help with..."
                  value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-bglight border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40 text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-accent/15"
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
