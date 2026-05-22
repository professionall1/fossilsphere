import { Scale, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-bglight border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 text-primary font-heading font-semibold text-xl mb-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-accent" />
              </div>
              Professionall
            </div>
            <p className="text-textsecondary text-sm leading-relaxed max-w-sm mb-5">
              India's trusted legal services platform. Expert drafting, court filing, numbering, and appear hearing support — all made simple and affordable.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/professionall.india/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-accent/5 hover:border-accent/30 transition-colors">
                <svg className="w-4 h-4 text-textsecondary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.youtube.com/@Professionall_india" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-accent/5 hover:border-accent/30 transition-colors">
                <svg className="w-4 h-4 text-textsecondary" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://wa.me/918247853179?text=Hi%20Professionall%2C%20I%20need%20legal%20help!" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-green-50 hover:border-green-300 transition-colors">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary text-sm uppercase tracking-wider mb-4">Services</h4>
            <div className="space-y-2.5">
              <Link to="/services" className="block text-sm text-textsecondary hover:text-accent transition-colors">Legal Drafting</Link>
              <Link to="/services" className="block text-sm text-textsecondary hover:text-accent transition-colors">Court Filing</Link>
              <Link to="/services" className="block text-sm text-textsecondary hover:text-accent transition-colors">Appear Hearing</Link>
              <Link to="/services#calculator" className="block text-sm text-textsecondary hover:text-accent transition-colors">Price Calculator</Link>
              <Link to="/track" className="block text-sm text-textsecondary hover:text-accent transition-colors">Track Request</Link>
              <Link to="/about" className="block text-sm text-textsecondary hover:text-accent transition-colors">About Us</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary text-sm uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+918247853179" className="flex items-center gap-2.5 text-sm text-textsecondary hover:text-accent transition-colors">
                <Phone className="w-4 h-4" /> +91 82478 53179
              </a>
              <a href="mailto:professionall.india@gmail.com" className="flex items-center gap-2.5 text-sm text-textsecondary hover:text-accent transition-colors">
                <Mail className="w-4 h-4" /> professionall.india@gmail.com
              </a>
              <div className="flex items-center gap-2.5 text-sm text-textsecondary">
                <Clock className="w-4 h-4" /> 24/7 Available
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-2 text-primary font-semibold mb-4">
            <MapPin className="w-4 h-4 text-accent" />
            High Court Hyderabad
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-bglight min-h-[220px]">
              <iframe
                title="High Court Hyderabad map"
                src="https://www.google.com/maps?q=High%20Court%20of%20Telangana%20Hyderabad&output=embed"
                className="w-full h-full min-h-[220px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="min-h-[220px] rounded-xl border border-slate-200 overflow-hidden">
              <img
                src="/highcourt.jpeg"
                alt="High Court Hyderabad"
                className="w-full h-full object-cover min-h-[220px]"
              />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col items-center gap-3">
          <a href="https://www.staffarc.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-textsecondary hover:text-primary transition-colors">
            Made with <span className="text-red-500">♥</span> by
            <img src="https://www.staffarc.in/images/Staffarc-logo.png" alt="StaffArc" className="h-5 object-contain" />
            <span className="font-semibold text-primary">StaffArc</span>
          </a>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <p className="text-xs text-textsecondary">© 2025 Professionall. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-textsecondary">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
