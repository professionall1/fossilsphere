import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Users, FolderOpen, ArrowRight, CheckCircle, Clock, MessageCircle } from 'lucide-react'

function AnimatedNumber({ target, suffix = '+', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = Date.now()
        const tick = () => {
          const elapsed = Date.now() - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(tick)
        }
        tick()
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } })
}

export default function Home() {
  const [phone, setPhone] = useState('')
  const [services, setServices] = useState([])

  const toggleService = (s) => {
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const handleGetStarted = () => {
    if (!phone || phone.length < 10) return
    const number = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'
    const msg = `Hi, I'd like legal help.\nPhone: +91 ${phone}\nService: ${services.join(', ') || 'Not specified'}`
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient">
        <div className="absolute inset-0 hero-gradient-overlay" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-highlight/3 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-primary leading-[1.1] mb-5">
                Drafting, Filing,<br />Numbering &<br />
                <span className="text-accent">Legal Help</span>
              </h1>

              <p className="text-textsecondary text-base mb-7 max-w-md leading-relaxed">
                Get expert lawyers to draft your legal documents, file petitions, and handle your cases — fast, affordable, and trusted.
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-textsecondary">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> 300+ Professional Lawyers</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-green-500" /> On Time Delivery</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> 100% Confidential</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100"
            >
              <h3 className="font-heading font-semibold text-primary text-xl mb-1">Get Started Now</h3>
              <p className="text-textsecondary text-sm mb-5">Tell us what you need — we'll connect you instantly</p>

              <div className="mb-4">
                <label className="text-textsecondary text-xs mb-1.5 block font-medium">Phone Number</label>
                <div className="flex items-center gap-2">
                  <span className="text-primary text-sm font-medium bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">+91</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="98765 43210"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-primary placeholder-gray-400 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 text-sm"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="text-textsecondary text-xs mb-2 block font-medium">What do you need?</label>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: 'Drafting', desc: '₹199/page' },
                    { label: 'Filing', desc: '₹2,499 flat' },
                    { label: 'Drafting & Filing', desc: 'Best Value — Save More!' },
                  ].map(s => (
                    <label
                      key={s.label}
                      className={`flex items-center justify-between cursor-pointer rounded-lg px-4 py-3 border transition-all ${
                        services.includes(s.label)
                          ? 'bg-accent/5 border-accent/30 text-primary'
                          : 'bg-gray-50 border-gray-200 text-textsecondary hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={services.includes(s.label)}
                          onChange={() => toggleService(s.label)}
                          className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
                        />
                        <span className="text-sm font-medium">{s.label}</span>
                      </div>
                      <span className="text-xs text-textsecondary">{s.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGetStarted}
                className="w-full py-3.5 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all active:scale-[0.98] text-sm shadow-lg shadow-accent/20"
              >
                Get Started on WhatsApp →
              </button>
              <p className="text-textsecondary text-xs text-center mt-3">Free consultation • No spam • Instant reply</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {[
            { num: 300, suffix: '+', label: 'Professional Lawyers' },
            { num: 800, suffix: '+', label: 'Successful Drafts' },
            { num: 1000, suffix: '+', label: 'Cases Handled' },
            { num: 24, suffix: 'hr', label: 'On Time Delivery' },
            { num: 199, suffix: '', label: '₹ Per Page Drafting' },
            { num: 2499, suffix: '', label: '₹ For Filing' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <p className="text-accent font-heading font-bold text-2xl sm:text-3xl">
                <AnimatedNumber target={s.num} suffix={s.suffix} />
              </p>
              <p className="text-textsecondary text-xs mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-bglight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">What We Offer</span>
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-primary mt-2">
              Our Core Services
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: 'Legal Drafting',
                desc: 'Expert drafting of court petitions, agreements, deeds, notices, and 150+ document types by verified advocates.',
                img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop'
              },
              {
                icon: FolderOpen,
                title: 'Court Filings',
                desc: 'Complete filing assistance in any court across India — District, High Court, Consumer Forum, NCLT, and more.',
                img: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&h=250&fit=crop'
              },
              {
                icon: Users,
                title: 'Law Expertise',
                desc: 'Get matched with specialist lawyers for civil, criminal, family, corporate, property, and constitutional matters.',
                img: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=400&h=250&fit=crop'
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="h-48 overflow-hidden">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center">
                      <card.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-primary">{card.title}</h3>
                  </div>
                  <p className="text-textsecondary text-sm leading-relaxed mb-4">{card.desc}</p>
                  <Link to="/services" className="flex items-center gap-1 text-accent text-sm font-medium hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-primary mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-textsecondary mb-8 max-w-md mx-auto">
              Join 1000+ satisfied clients. Get your legal work done by experts — fast and affordable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-colors shadow-lg shadow-accent/15">
                Explore Services <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'}?text=${encodeURIComponent('Hi Professionall, I need legal help!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
