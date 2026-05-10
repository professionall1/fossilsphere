import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'
  const url = `https://wa.me/${number}?text=${encodeURIComponent('Hi Professionall, I need legal help!')}`

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
    </motion.a>
  )
}
