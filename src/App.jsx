import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackButton from './components/BackButton'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Services from './pages/Services'
import Track from './pages/Track'
import About from './pages/About'
import Admin from './pages/Admin'

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <BackButton />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/track" element={<Track />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {isAdmin && <Footer />}
      <WhatsAppButton />
    </div>
  )
}
