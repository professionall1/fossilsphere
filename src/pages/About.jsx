import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scale, Phone, Mail, MessageCircle, MapPin, Clock, ArrowRight, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import { submitToGoogleSheets } from '../utils/googleSheets'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } })
}

export default function About() {
  const [form, setForm] = useState({ phone: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.phone) return toast.error('Please enter your phone number')
    setLoading(true)
    await submitToGoogleSheets({ name: '', phone: form.phone, service: 'Contact', message: form.message })
    setLoading(false)
    toast.success('Message sent! Redirecting to WhatsApp...')

    const number = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'
    const msg = `Hi Professionall!\nPhone: ${form.phone}\nMessage: ${form.message}`
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, '_blank')
    setForm({ phone: '', message: '' })
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="hero-gradient relative overflow-hidden py-20 border-b border-gray-100">
        <div className="absolute inset-0 hero-gradient-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="w-16 h-16 bg-accent/10 border border-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Scale className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-heading font-semibold text-4xl sm:text-5xl text-primary mb-3">
              About Us
            </h1>
            <p className="text-textsecondary max-w-lg mx-auto">
              India's trusted platform for legal drafting, court filing, and lawyer matching — making legal help accessible to everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-white">
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

      {/* Team Photos */}
      <section className="py-12 bg-bglight">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-8">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Our Team</span>
            <h2 className="font-heading font-semibold text-2xl text-primary mt-2">Meet the Experts</h2>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
              >
                {/* Placeholder for team photo - replace src with actual team photos */}
                <div className="aspect-[4/5] bg-gray-100 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-300" />
                </div>
                <div className="p-4 text-center">
                  <p className="font-heading font-semibold text-primary text-sm">Team Member {i}</p>
                  <p className="text-textsecondary text-xs">Legal Expert</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-textsecondary text-xs text-center mt-4">Add your team photos by replacing the placeholder images above</p>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Process</span>
            <h2 className="font-heading font-semibold text-3xl text-primary mt-2">How We Work</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { step: '1', title: 'Submit Your Requirement', desc: 'Share what legal document or service you need via WhatsApp or our form.' },
              { step: '2', title: 'Our Expertise Will Get in Contact', desc: 'A verified specialist lawyer will reach out to understand your case in detail.' },
              { step: '3', title: 'Review Your Draft & Filing', desc: 'Receive your draft, review it, and request any changes. We refine until you approve.' },
              { step: '4', title: 'Track in Real Time', desc: 'Monitor your request status through our tracking system until delivery.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="flex items-start gap-4 bg-bglight rounded-xl p-5 border border-gray-100"
              >
                <div className="w-10 h-10 bg-accent text-white font-heading font-bold rounded-full flex items-center justify-center shrink-0 text-sm">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-primary mb-1">{item.title}</h4>
                  <p className="text-textsecondary text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-bglight border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-5 gap-12">
          {/* Left - Info */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-2">
            <h2 className="font-heading font-semibold text-2xl text-primary mb-2">Contact Us</h2>
            <p className="text-textsecondary text-sm mb-8">We respond within 15 minutes on WhatsApp.</p>

            <div className="space-y-5">
              <a href="tel:+919876543210" className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-primary text-sm">Phone</p>
                  <p className="text-textsecondary text-sm">+91 98765 43210</p>
                </div>
              </a>

              <a href="mailto:hello@professionall.in" className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-primary text-sm">Email</p>
                  <p className="text-textsecondary text-sm">hello@professionall.in</p>
                </div>
              </a>

              <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-primary text-sm">WhatsApp</p>
                  <p className="text-green-600 text-sm font-medium">Chat instantly →</p>
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
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h3 className="font-heading font-semibold text-xl text-primary mb-1">Send a Message</h3>
              <p className="text-textsecondary text-sm mb-6">We'll get back to you within minutes on WhatsApp.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-textprimary mb-1.5 block">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-bglight border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-textprimary mb-1.5 block">Your Message</label>
                  <textarea
                    placeholder="Tell us about your legal requirement..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-bglight border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40 text-sm resize-none"
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
