import { motion } from 'framer-motion'
import { Scale, Users, Award, Target, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } })
}

export default function About() {
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
              About Professionall
            </h1>
            <p className="text-textsecondary max-w-lg mx-auto">
              India's trusted platform for legal drafting, court filing, and lawyer matching — built to make legal help accessible to everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Our Story</span>
            <h2 className="font-heading font-semibold text-3xl text-primary mt-2 mb-6">
              Making Legal Services Simple & Affordable
            </h2>
            <div className="space-y-4 text-textsecondary leading-relaxed">
              <p>
                Legal help in India has always been expensive, confusing, and inaccessible for the common person. We started Professionall with a simple mission — to bridge the gap between people who need legal documents and the expert lawyers who can draft them.
              </p>
              <p>
                Whether you need a bail application, a property sale deed, an NDA, or a consumer complaint — our network of verified advocates delivers precise, court-ready documents at a fraction of traditional costs.
              </p>
              <p>
                With 15+ years of combined legal expertise and 500+ cases handled, we've helped individuals, families, and businesses across India get the legal support they deserve — quickly and affordably.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-bglight">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">What We Do</span>
            <h2 className="font-heading font-semibold text-3xl text-primary mt-2">Our Expertise</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Civil & Criminal Litigation', desc: 'Plaints, bail applications, written statements, appeals, revision petitions, and more.' },
              { title: 'Family & Matrimonial', desc: 'Divorce petitions, maintenance claims, custody matters, domestic violence cases.' },
              { title: 'Property & Conveyancing', desc: 'Sale deeds, gift deeds, lease agreements, partition deeds, GPA/SPA, wills.' },
              { title: 'Business Agreements', desc: 'NDAs, partnership deeds, service agreements, franchise contracts, MOUs.' },
              { title: 'Corporate & Commercial', desc: 'MOA/AOA, board resolutions, NCLT petitions, insolvency matters, compliance.' },
              { title: 'Legal Notices', desc: 'Demand notices, eviction notices, defamation notices, Section 80 CPC notices.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h4 className="font-heading font-semibold text-primary mb-2">{item.title}</h4>
                <p className="text-textsecondary text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Why Us</span>
            <h2 className="font-heading font-semibold text-3xl text-primary mt-2">The Professionall Difference</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: Users, title: 'Verified Advocate Network', desc: 'Every lawyer in our network has 5+ years of practice experience and is verified for quality.' },
              { icon: Award, title: '150+ Five-Star Reviews', desc: 'Our clients trust us because we deliver accurate, court-ready documents on time, every time.' },
              { icon: Target, title: '150+ Document Types', desc: 'From simple affidavits to complex NCLT petitions — we cover every legal document you could need.' },
              { icon: MessageCircle, title: 'WhatsApp-First Support', desc: 'No complicated portals. Just message us on WhatsApp and get instant help from real people.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="flex items-start gap-4 p-5 rounded-xl bg-bglight border border-gray-100"
              >
                <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-primary mb-1">{item.title}</h4>
                  <p className="text-textsecondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 bg-bglight border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Process</span>
            <h2 className="font-heading font-semibold text-3xl text-primary mt-2">How We Work</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { step: '1', title: 'Share Your Requirement', desc: 'Tell us what document you need via WhatsApp or our contact form. Include any case details.' },
              { step: '2', title: 'Get Matched with an Expert', desc: 'We assign a verified advocate who specializes in your specific type of legal document.' },
              { step: '3', title: 'Review & Approve', desc: 'Receive your draft within 24-48 hours. Request revisions if needed — we refine until you\'re satisfied.' },
              { step: '4', title: 'Filing Assistance (Optional)', desc: 'Need it filed in court? We handle the complete filing process for a flat ₹1,999 fee.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100"
              >
                <div className="w-10 h-10 bg-accent text-white font-heading font-semibold rounded-full flex items-center justify-center shrink-0 text-sm">
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

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-heading font-semibold text-3xl text-primary mb-4">
              Ready to Get Your Legal Work Done?
            </h2>
            <p className="text-textsecondary mb-8 max-w-md mx-auto">
              Join 500+ clients who trust Professionall for fast, affordable, and expert legal services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-colors shadow-lg shadow-accent/15">
                View Services & Pricing <ArrowRight className="w-4 h-4" />
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
    </div>
  )
}
