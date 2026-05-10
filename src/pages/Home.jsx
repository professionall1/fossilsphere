import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Users, FolderOpen, ShieldCheck, Lock, MessageCircle, IndianRupee, Star, Award, Briefcase, ArrowRight, CheckCircle } from 'lucide-react'

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
              <div className="inline-flex items-center gap-2 bg-accent/5 border border-accent/10 rounded-full px-4 py-1.5 mb-6">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <span className="text-textsecondary text-xs font-medium">Trusted by 500+ clients across India</span>
              </div>

              <h1 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-primary leading-[1.2] mb-5">
                Drafting, Filing &<br />Legal Help —<br />
                <span className="text-accent">Made Simple</span>
              </h1>

              <p className="text-textsecondary text-base mb-7 max-w-md leading-relaxed">
                Get expert lawyers to draft your legal documents, file petitions, and handle your cases — all starting at just ₹149.
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-textsecondary">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> Verified Lawyers</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> 24hr Delivery</span>
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
                    { label: 'Drafting', desc: '₹149/page' },
                    { label: 'Filing', desc: '₹1,999 flat' },
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
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {[
            { num: 150, suffix: '+', label: 'Five-Star Reviews', icon: Star },
            { num: 15, suffix: '+', label: 'Years of Expertise', icon: Award },
            { num: 500, suffix: '+', label: 'Cases Handled', icon: Briefcase },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <s.icon className="w-6 h-6 text-gold mx-auto mb-2" />
              <p className="text-accent font-heading font-semibold text-4xl sm:text-5xl">
                <AnimatedNumber target={s.num} suffix={s.suffix} />
              </p>
              <p className="text-textsecondary text-sm mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 sm:py-24 bg-bglight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">What We Offer</span>
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-primary mt-2 mb-4">
              Complete Legal Solutions
            </h2>
            <p className="text-textsecondary max-w-xl mx-auto">
              From drafting complex petitions to filing in any court across India — we handle it all with precision and speed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: FileText,
                title: 'Legal Drafting',
                desc: 'Expert drafting of all court petitions, agreements, deeds, and legal notices. 150+ document types covered.',
                price: 'From ₹149/page',
                features: ['Court Petitions', 'Agreements & Deeds', 'Legal Notices', 'Affidavits']
              },
              {
                icon: Users,
                title: 'Find Expert Lawyers',
                desc: 'Get matched with verified specialists for your exact case type — civil, criminal, family, corporate, and more.',
                price: 'Free Consultation',
                features: ['Verified Advocates', 'Case-Specific Match', 'Pan-India Network', 'Direct Communication']
              },
              {
                icon: FolderOpen,
                title: 'Court Filing',
                desc: 'Hassle-free filing of petitions and documents in any court. We handle the paperwork, you focus on your case.',
                price: '₹1,999 flat',
                features: ['Any Court in India', 'Document Verification', 'Filing Confirmation', 'Status Tracking']
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:border-accent/20 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-accent/8 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent/12 transition-colors">
                  <card.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-primary mb-2">{card.title}</h3>
                <p className="text-textsecondary text-sm leading-relaxed mb-4">{card.desc}</p>

                <ul className="space-y-2 mb-5">
                  {card.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-textprimary">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-accent font-bold text-sm">{card.price}</span>
                  <Link to="/services" className="flex items-center gap-1 text-accent text-sm font-medium hover:gap-2 transition-all">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Pricing</span>
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-primary mt-2 mb-4">
              Simple & Transparent
            </h2>
            <p className="text-textsecondary max-w-md mx-auto">No hidden fees. No surprises. Pay only for what you need.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
              className="bg-bglight rounded-2xl p-8 text-center border border-gray-100 hover:border-accent/20 transition-colors">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <p className="text-textsecondary text-sm mb-2 font-medium">Legal Drafting</p>
              <p className="font-heading font-bold text-4xl text-primary">₹149<span className="text-lg font-normal text-textsecondary">/page</span></p>
              <p className="text-textsecondary text-xs mt-2">All document types • Expert lawyers</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
              className="bg-bglight rounded-2xl p-8 text-center border border-gray-100 hover:border-accent/20 transition-colors">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-6 h-6 text-accent" />
              </div>
              <p className="text-textsecondary text-sm mb-2 font-medium">Court Filing</p>
              <p className="font-heading font-bold text-4xl text-primary">₹1,999<span className="text-lg font-normal text-textsecondary"> flat</span></p>
              <p className="text-textsecondary text-xs mt-2">Any court • Complete assistance</p>
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center bg-accent/5 rounded-2xl p-8 border border-accent/10">
            <p className="text-highlight font-heading font-semibold text-lg mb-2">🎉 Drafting & Filing Together — Best Value!</p>
            <p className="text-textsecondary text-sm mb-5">Combine both services and save. Get your documents drafted AND filed seamlessly.</p>
            <Link to="/services#calculator" className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white rounded-xl font-bold hover:bg-accent/90 transition-colors shadow-lg shadow-accent/15">
              Calculate Your Price <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 sm:py-24 bg-bglight">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Why Choose Us</span>
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-primary mt-2 mb-4">
              Why Professionall?
            </h2>
            <p className="text-textsecondary max-w-lg mx-auto">We combine legal expertise with technology to deliver fast, reliable, and affordable legal services.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: 'Verified Lawyers', desc: 'Every advocate is vetted with 5+ years of experience in their practice area' },
              { icon: Lock, title: 'Secure & Confidential', desc: 'Your documents and data are encrypted. We never share your information' },
              { icon: MessageCircle, title: 'WhatsApp Support', desc: 'Get instant updates and communicate directly with your assigned lawyer' },
              { icon: IndianRupee, title: 'Affordable Pricing', desc: 'Premium legal services at prices that won\'t break the bank. No hidden charges' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="text-center p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 bg-accent/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-accent" />
                </div>
                <h4 className="font-heading font-semibold text-primary text-lg mb-2">{item.title}</h4>
                <p className="text-textsecondary text-sm leading-relaxed">{item.desc}</p>
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
              Join 500+ satisfied clients. Get your legal work done by experts — fast and affordable.
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
