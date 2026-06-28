import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Particle background for CTA
function CTAParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
    }

    const particles: Particle[] = []
    const PARTICLE_COUNT = 25

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
    }

    const init = () => {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.4 + 0.1,
        })
      }
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    init()
    animationId = requestAnimationFrame(draw)
    window.addEventListener('resize', () => { resize(); init() })

    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.5,
      }}
    />
  )
}

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-title', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
      })
      gsap.from('.cta-desc', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0, y: 20, duration: 0.8, delay: 0.15, ease: 'power3.out',
      })
      gsap.from('.cta-button', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0, y: 20, duration: 0.8, delay: 0.3, ease: 'power3.out',
      })
      gsap.from('.cta-note', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0, duration: 0.6, delay: 0.5, ease: 'power2.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-[120px] bg-deep overflow-hidden"
    >
      <CTAParticles />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full -z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 text-center">
        <h2 className="cta-title font-display text-4xl md:text-5xl font-bold text-ice mb-6">
          ابدأ رحلتك مع Moro POS اليوم
        </h2>

        <p className="cta-desc text-xl md:text-2xl text-ice-70 font-body mb-10 max-w-2xl mx-auto">
          جرب النظام مجانًا لمدة 14 يومًا بدون بطاقة ائتمان
        </p>

        <button
          className="cta-button btn-primary text-xl py-5 px-14 rounded-2xl"
          style={{
            boxShadow: '0 0 60px rgba(0, 212, 255, 0.4)',
          }}
        >
          ابدأ تجربتك المجانية
        </button>

        <p className="cta-note text-ice-40 font-body text-sm mt-6">
          لا حاجة لبطاقة ائتمان · إلغاء مجاني في أي وقت
        </p>
      </div>
    </section>
  )
}
