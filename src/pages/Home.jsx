import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Users, FolderOpen, ArrowRight, CheckCircle, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { submitToGoogleSheets } from '../utils/googleSheets'
import { FORM_SERVICE_OPTIONS, PRICING } from '../data/services'
import documentTypes from '../data/documentTypes'

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

const featuredDraftNames = [
  'Written Statement',
  'Draft Decree',
  'Winding Up Petition',
  'Title Suit',
  'NBW Recall Petitions',
  'Trust Deed',
]

const featuredDrafts = featuredDraftNames
  .map(name => documentTypes.find(item => item.name === name))
  .filter(Boolean)

const trustPoints = [
  {
    title: 'Court-ready drafting',
    desc: 'Drafts are structured for pleadings, petitions, affidavits, notices, agreements, and deed work.',
  },
  {
    title: 'Clear service flow',
    desc: 'Drafting, filing, numbering, and appear hearing support are separated so clients know exactly what they are paying for.',
  },
  {
    title: 'Transparent updates',
    desc: 'Every request can be tracked with status stages that match the chosen service type.',
  },
  {
    title: 'Practical legal support',
    desc: 'The experience is built for real client workflows: quote, prepare, review, file, track, and complete.',
  },
]

export default function Home() {
  const [phone, setPhone] = useState('')
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)

  const toggleService = (s) => {
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const handleSubmit = async () => {
    if (!phone || phone.length < 10) return toast.error('Please enter a valid phone number')
    setLoading(true)
    await submitToGoogleSheets({
      phone: `+91 ${phone}`,
      service: services.join(', ') || 'Not specified',
      message: 'Home page inquiry'
    })
    setLoading(false)
    toast.success('Request submitted successfully! We will contact you soon.')
    setPhone('')
    setServices([])
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden hero-gradient">
        <div className="absolute inset-0 hero-gradient-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.1] mb-4 sm:mb-5">
                Drafting, Filing, Numbering and Appear Hearing
              </h1>

              <p className="text-textsecondary text-sm sm:text-base mb-6 sm:mb-7 max-w-md leading-relaxed">
                Get expert lawyers to draft legal documents, file petitions, manage numbering, and support appear hearing requirements — affordable, precise, and trusted.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-textsecondary">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> 300+ Professional Lawyers</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-green-500" /> On Time Delivery</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> 100% Confidential</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-primary/10 border border-slate-200"
            >
              <h3 className="font-bold text-primary text-xl mb-1">Get Started Now</h3>
              <p className="text-textsecondary text-sm mb-5">Tell us what you need — we'll contact you shortly</p>

              <div className="mb-4">
                <label className="font-bold text-textprimary text-sm mb-1.5 block">Phone No**</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Phone No"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-primary placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 text-sm"
                />
              </div>

              <div className="mb-6">
                <label className="font-bold text-textprimary text-sm mb-2 block">Service Needed</label>
                <div className="flex flex-col gap-3">
                  {FORM_SERVICE_OPTIONS.map(option => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={services.includes(option.label)}
                        onChange={() => toggleService(option.label)}
                        className="w-4 h-4 border-2 border-gray-400 rounded text-accent focus:ring-accent"
                      />
                      <span className="text-sm text-textprimary">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3.5 bg-accent text-white font-bold rounded-lg hover:bg-accent/90 transition-all active:scale-[0.98] text-sm disabled:opacity-50 shadow-lg shadow-accent/20"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 text-center">
          {[
            { num: 300, suffix: '+', label: 'Professional Lawyers' },
            { num: 800, suffix: '+', label: 'Successful Drafts' },
            { num: 1000, suffix: '+', label: 'Cases Handled' },
            { num: 98, suffix: '%', label: 'On Time Delivery' },
            { num: PRICING.draftingPerPage, suffix: '', label: '₹ Per Page Drafting' },
            { num: PRICING.filing, suffix: '', label: '₹ For Filing' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <p className="text-accent font-bold text-2xl sm:text-3xl">
                <AnimatedNumber target={s.num} suffix={s.suffix} />
              </p>
              <p className="text-textsecondary text-xs mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Drafts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-2xl mb-10">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Popular Draft Requests</span>
            <h2 className="font-bold text-3xl sm:text-4xl text-primary mt-2">Search, price, and request common court drafts</h2>
            <p className="text-textsecondary mt-3 leading-relaxed">
              Clients can choose from a structured legal draft library, including pleadings, judgment-related drafts, criminal petitions, company matters, property suits, and conveyancing documents.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredDrafts.map((draft, i) => (
              <motion.div
                key={draft.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-bglight p-5 shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:border-accent/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-primary">{draft.displayName}</p>
                    <p className="text-textsecondary text-sm mt-1">{draft.subCategory}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-accent" />
                  </div>
                </div>
                <p className="text-xs text-textsecondary mt-4">{draft.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-bglight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">What We Offer</span>
            <h2 className="font-bold text-3xl sm:text-4xl text-primary mt-2">Our Core Services</h2>
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
                title: 'Appear Hearing',
                desc: 'Get support for court appearance requirements with clear coordination for civil, criminal, family, corporate, and property matters.',
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
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="h-48 overflow-hidden">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center">
                      <card.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-bold text-lg text-primary">{card.title}</h3>
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

      {/* Why Choose Us */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
            <div>
              <span className="text-gold text-sm font-semibold uppercase tracking-wider">Built for legal work</span>
              <h2 className="font-bold text-3xl sm:text-4xl mt-2">More than a form, a complete legal-service workflow</h2>
              <p className="text-white/75 mt-4 leading-relaxed">
                The site now explains what clients get at each stage, shows real document categories, and gives a clearer reason to submit a request.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {trustPoints.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  className="rounded-2xl border border-white/10 bg-white/8 p-5 shadow-lg shadow-black/10"
                >
                  <CheckCircle className="w-5 h-5 text-gold mb-3" />
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-white/70 text-sm mt-2 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-bold text-3xl sm:text-4xl text-primary mb-4">Ready to Get Started?</h2>
            <p className="text-textsecondary mb-8 max-w-md mx-auto">
              Join 1000+ satisfied clients. Get your legal work done by experts — clear, affordable, and dependable.
            </p>
            <Link to="/services" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-colors shadow-lg shadow-accent/15">
              Explore Services <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
