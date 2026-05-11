import { Scale, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 text-primary font-heading font-semibold text-xl mb-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-accent" />
              </div>
              Professionall
            </div>
            <p className="text-textsecondary text-sm leading-relaxed max-w-sm mb-5">
              India's trusted legal services platform. Expert drafting, court filing, and lawyer matching — all made simple and affordable.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-primary text-sm uppercase tracking-wider mb-4">Services</h4>
            <div className="space-y-2.5">
              <Link to="/services" className="block text-sm text-textsecondary hover:text-accent transition-colors">Legal Drafting</Link>
              <Link to="/services" className="block text-sm text-textsecondary hover:text-accent transition-colors">Court Filing</Link>
              <Link to="/services" className="block text-sm text-textsecondary hover:text-accent transition-colors">Find Lawyers</Link>
              <Link to="/services#calculator" className="block text-sm text-textsecondary hover:text-accent transition-colors">Price Calculator</Link>
              <Link to="/track" className="block text-sm text-textsecondary hover:text-accent transition-colors">Track Request</Link>
              <Link to="/about" className="block text-sm text-textsecondary hover:text-accent transition-colors">About Us</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-primary text-sm uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-2.5 text-sm text-textsecondary hover:text-accent transition-colors">
                <Phone className="w-4 h-4" /> +91 98765 43210
              </a>
              <a href="mailto:hello@professionall.in" className="flex items-center gap-2.5 text-sm text-textsecondary hover:text-accent transition-colors">
                <Mail className="w-4 h-4" /> hello@professionall.in
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-textsecondary">© 2025 Professionall. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-textsecondary">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
