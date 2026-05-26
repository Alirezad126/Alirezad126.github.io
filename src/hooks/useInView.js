import { useEffect, useMemo, useRef, useState } from 'react'

export default function useInView(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const observerOptions = useMemo(
    () => ({
      threshold: 0,
      rootMargin: '0px 0px -25% 0px',
      ...options
    }),
    [options]
  )

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(element)
      }
    }, observerOptions)

    observer.observe(element)

    return () => observer.disconnect()
  }, [observerOptions])

  return { ref, isVisible }
}