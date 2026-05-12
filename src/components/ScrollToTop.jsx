import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function scrollWithoutSmooth(callback) {
  const root = document.documentElement
  const previous = root.style.scrollBehavior

  root.style.scrollBehavior = 'auto'
  callback()
  root.style.scrollBehavior = previous
}

function scrollToHash(hash) {
  scrollWithoutSmooth(() => {
    const target = document.getElementById(hash.slice(1))
    if (!target) {
      window.scrollTo(0, 0)
      return
    }

    const navOffset = 80
    const top = target.getBoundingClientRect().top + window.scrollY - navOffset
    window.scrollTo(0, Math.max(0, top))
  })
}

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      scrollWithoutSmooth(() => {
        window.scrollTo(0, 0)
      })
      return
    }

    const frame = requestAnimationFrame(() => scrollToHash(hash))
    const timer = window.setTimeout(() => scrollToHash(hash), 120)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [pathname, search, hash])

  return null
}
