import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scale, Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { submitHomeLead } from '../utils/googleSheets'
import { FORM_SERVICE_OPTIONS } from '../data/services'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } })
}

const standards = [
  'Documents organized by court and matter type',
  'Pricing separated for drafting, filing, both, and appear hearing',
  'Status stages matched to the selected service',
  'Client-ready layout for future advocate/team photos',
]

export default function About() {
  const [form, setForm] = useState({ phone: '', service: FORM_SERVICE_OPTIONS[0].label, message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.phone) return toast.error('Please enter your phone number')
    setLoading(true)
    await submitHomeLead({ phone: form.phone, service: form.service, message: form.message })
    setLoading(false)
    toast.success('Message sent! We will contact you soon.')
    setForm({ phone: '', service: FORM_SERVICE_OPTIONS[0].label, message: '' })
  }

  return (
    <div className="pt-14 sm:pt-16">
      {/* Header */}
      <section className="hero-gradient relative overflow-hidden py-14 sm:py-20 border-b border-slate-200">
        <div className="absolute inset-0 hero-gradient-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="w-16 h-16 bg-accent/10 border border-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Scale className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl text-primary mb-3">About Us</h1>
            <p className="text-textsecondary max-w-lg mx-auto">
              India's trusted platform for legal drafting, court filing, numbering, and appear hearing support — making legal help accessible to everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="space-y-4 text-textsecondary leading-relaxed text-center">
              <p className="text-lg">
                We started Professionall with a simple mission — to bridge the gap between people who need legal documents and the expert lawyers who can draft them.
              </p>
              <p>
                Whether you need a bail application, a property sale deed, an NDA, or a consumer complaint — our network of 300+ verified advocates delivers precise, court-ready documents at affordable prices.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-10 sm:py-14 bg-bglight border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Our Standards</span>
            <h2 className="font-bold text-3xl text-primary mt-2">Legal service details made easier to understand</h2>
            <p className="text-textsecondary mt-3 leading-relaxed">
              Professionall is structured to reduce confusion at intake: clients see clear service choices, searchable document categories, estimate logic, and tracking updates.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="grid sm:grid-cols-2 gap-3">
            {standards.map(item => (
              <div key={item} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex gap-3">
                <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <p className="text-sm text-textprimary">{item}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Photos */}
      <section className="py-8 sm:py-12 bg-bglight">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <h2 className="font-bold text-2xl text-primary">Our Team</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[0, 1, 2].map((slot) => (
                <div key={slot} className="aspect-[4/5] rounded-2xl border border-dashed border-slate-300 bg-white/70 shadow-sm" />
              ))}
            </div>
            <p className="text-textsecondary text-sm mt-4">Photos will be added after the client shares final team images.</p>
          </motion.div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-8 sm:mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Process</span>
            <h2 className="font-bold text-3xl text-primary mt-2">How We Work</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { step: '1', title: 'Submit Your Requirement', desc: 'Share what legal document or service you need via our form.' },
              { step: '2', title: 'Our Team Will Get in Contact', desc: 'A verified legal specialist will reach out to understand your requirement in detail.' },
              { step: '3', title: 'Review Your Draft & Filing', desc: 'Receive your draft, review it, and request any changes. We refine until you approve.' },
              { step: '4', title: 'Track in Real Time', desc: 'Monitor your request status through our tracking system until delivery.' },
            ].map((item, i) => (
              <motion.div key={item.step} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="flex items-start gap-4 bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <div className="w-10 h-10 bg-accent text-white font-bold rounded-full flex items-center justify-center shrink-0 text-sm">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">{item.title}</h4>
                  <p className="text-textsecondary text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 sm:py-16 bg-bglight border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-5 gap-12">
          {/* Left - Info */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-2">
            <h2 className="font-bold text-2xl text-primary mb-2">Contact Us</h2>
            <p className="text-textsecondary text-sm mb-8">We'll get back to you within a few hours.</p>

            <div className="space-y-5">
              <a href="tel:+919876543210" className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-primary text-sm">Phone</p>
                  <p className="text-textsecondary text-sm">+91 98765 43210</p>
                </div>
              </a>
              <a href="mailto:hello@professionall.in" className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-primary text-sm">Email</p>
                  <p className="text-textsecondary text-sm">hello@professionall.in</p>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-primary text-sm">Hours</p>
                  <p className="text-textsecondary text-sm">Mon–Sat: 9 AM – 8 PM IST</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-primary text-sm">Location</p>
                  <p className="text-textsecondary text-sm">Pan-India (Remote-first)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-primary/5 border border-slate-200">
              <h3 className="font-bold text-xl text-primary mb-1">Send a Message</h3>
              <p className="text-textsecondary text-sm mb-6">We'll get back to you shortly.</p>

              <div className="space-y-4">
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
                  <label className="text-sm font-bold text-textprimary mb-1.5 block">Your Message</label>
                  <textarea
                    placeholder="Tell us about your legal requirement..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? 'Sending...' : <><span>Send Message</span> <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
