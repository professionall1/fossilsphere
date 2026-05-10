import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Scale } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 text-primary font-heading font-semibold text-xl">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
            <Scale className="w-5 h-5 text-accent" />
          </div>
          <span>Professionall</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === l.to
                  ? 'text-accent bg-accent/5'
                  : 'text-textsecondary hover:text-primary hover:bg-gray-50'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
          >
            Get Help
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-primary p-2">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === l.to
                      ? 'text-accent bg-accent/5'
                      : 'text-textsecondary hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-4 py-3 bg-accent text-white text-sm font-medium rounded-lg text-center"
              >
                Get Help on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
