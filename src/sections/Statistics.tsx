import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 500, suffix: '+', label: 'عميل نشط' },
  { value: 1, suffix: 'M+', label: 'فاتورة شهريًا' },
  { value: 15, suffix: '+', label: 'نوع تقرير' },
  { value: 99.9, suffix: '%', label: 'وقت التشغيل', isDecimal: true },
]

function AnimatedCounter({
  value,
  suffix,
  isDecimal,
  inView,
}: {
  value: number
  suffix: string
  isDecimal?: boolean
  inView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let start = 0
    const duration = 2000
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = eased * value

      if (isDecimal) {
        setCount(parseFloat(start.toFixed(1)))
      } else {
        setCount(Math.floor(start))
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, value, isDecimal])

  return (
    <span>
      {isDecimal ? count.toFixed(1) : count}
      {suffix}
    </span>
  )
}

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stats-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 20, duration: 0.6, ease: 'power3.out',
      })
      gsap.from('.stats-title', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 30, duration: 0.8, delay: 0.1, ease: 'power3.out',
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => setInView(true),
      })

      gsap.utils.toArray<HTMLElement>('.stat-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 85%' },
          opacity: 0, y: 40, scale: 0.95, duration: 0.7, delay: i * 0.15, ease: 'power3.out',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="statistics"
      ref={sectionRef}
      className="relative py-[120px] bg-deep overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full -z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <p className="stats-label section-label">أرقام تتحدث</p>
          <h2 className="stats-title section-title">
            نمو مستمر مع آلاف العملاء
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card glass-card text-center">
              <div className="stat-number text-4xl md:text-5xl lg:text-6xl mb-3">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isDecimal={stat.isDecimal}
                  inView={inView}
                />
              </div>
              <div className="text-ice-70 font-body text-base md:text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
