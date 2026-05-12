import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle, MapPin, Clock, ArrowRight, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { submitToGoogleSheets } from '../utils/googleSheets'
import { FORM_SERVICE_OPTIONS } from '../data/services'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } })
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: FORM_SERVICE_OPTIONS[0].label, message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.phone && !form.email) return toast.error('Please provide phone or email')
    setLoading(true)
    await submitToGoogleSheets({ ...form })
    setLoading(false)
    toast.success('Message sent! Redirecting to WhatsApp...')

    const number = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'
    const msg = `Hi Professionall!\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${form.service}\nMessage: ${form.message}`
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, '_blank')
    setForm({ name: '', phone: '', email: '', service: FORM_SERVICE_OPTIONS[0].label, message: '' })
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="hero-gradient relative overflow-hidden py-20 border-b border-slate-200">
        <div className="absolute inset-0 hero-gradient-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="w-16 h-16 bg-accent/10 border border-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Send className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-heading font-semibold text-4xl sm:text-5xl text-primary mb-3">
              Let's Talk
            </h1>
            <p className="text-textsecondary max-w-md mx-auto">
              Have a legal question? Need a quote? We're here to help — reach out anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20 bg-bglight">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-5 gap-12">
          {/* Left - Info */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-2">
            <h2 className="font-heading font-semibold text-2xl text-primary mb-2">Get in Touch</h2>
            <p className="text-textsecondary text-sm mb-8">We typically respond within 15 minutes during business hours.</p>

            <div className="space-y-6">
              <a href="tel:+919876543210" className="flex items-start gap-4 group">
                <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/15 transition-colors">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-primary text-sm">Phone</p>
                  <p className="text-textsecondary text-sm">+91 98765 43210</p>
                </div>
              </a>

              <a href="mailto:hello@professionall.in" className="flex items-start gap-4 group">
                <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/15 transition-colors">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-primary text-sm">Email</p>
                  <p className="text-textsecondary text-sm">hello@professionall.in</p>
                </div>
              </a>

              <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-primary text-sm">WhatsApp</p>
                  <p className="text-green-600 text-sm font-medium">Chat with us instantly →</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-primary text-sm">Working Hours</p>
                  <p className="text-textsecondary text-sm">Mon–Sat: 9 AM – 8 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
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
              <h3 className="font-heading font-semibold text-xl text-primary mb-1">Send a Message</h3>
              <p className="text-textsecondary text-sm mb-6">We'll get back to you within minutes on WhatsApp.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-textprimary mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-textprimary mb-1.5 block">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-textprimary mb-1.5 block">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-textprimary mb-2 block">Service Needed</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                  <label className="text-sm font-medium text-textprimary mb-1.5 block">Your Message</label>
                  <textarea
                    placeholder="Tell us about your legal requirement..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-accent/15"
                >
                  {loading ? 'Sending...' : <><span>Send Message</span> <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>

              <p className="text-textsecondary text-xs text-center mt-4">
                Your information is secure and will never be shared with third parties.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
