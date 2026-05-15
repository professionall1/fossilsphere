import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function BackButton() {
  const navigate = useNavigate()
  const location = useLocation()

  if (location.pathname === '/' || location.pathname === '/admin') return null

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-20 left-4 z-40 flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-full shadow-sm text-sm font-medium text-textsecondary hover:text-primary hover:border-gray-300 transition-all sm:left-6"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden sm:inline">Back</span>
    </button>
  )
}
