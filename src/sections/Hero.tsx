import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Animated canvas background with bezier curves
function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const CONFIG = {
      lineCount: 24,
      curveComplexity: 6,
      mouseLag: 0.08,
      waveAmplitude: 0.18,
      waveFrequency: 0.35,
      fogDensity: 2.8,
      fogStart: 0.15,
      fogEnd: 0.85,
    }

    let animationId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - rect.left) / rect.width
      mouseRef.current.y = (e.clientY - rect.top) / rect.height
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      timeRef.current += 0.008
      const time = timeRef.current

      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < CONFIG.lineCount; i++) {
        const xProgress = i / (CONFIG.lineCount - 1)
        const baseX = xProgress * w

        ctx.beginPath()
        ctx.moveTo(baseX, 0)

        const points: { x: number; y: number }[] = []
        const segments = CONFIG.curveComplexity

        for (let j = 0; j <= segments; j++) {
          const yProgress = j / segments
          const y = yProgress * h

          const yFactor = yProgress * CONFIG.waveFrequency * 10
          const wave1 = Math.sin(yFactor + time * 2) * CONFIG.waveAmplitude * w * 0.3
          const wave2 = Math.cos(yFactor * 1.3 - time * 1.4) * (CONFIG.waveAmplitude * 0.4) * w * 0.3
          let distortion = wave1 + wave2

          const mouseDist = Math.abs(mouseRef.current.x - xProgress)
          const mouseFactor = Math.max(0, 1 - mouseDist / 0.3) * 0.15
          const mouseWave = Math.sin(yProgress * 6 + time * 3) * mouseFactor * w * 0.15
          distortion += mouseWave

          points.push({ x: baseX + distortion, y })
        }

        // Draw smooth curve through points
        if (points.length > 1) {
          ctx.moveTo(points[0].x, points[0].y)
          for (let j = 1; j < points.length - 1; j++) {
            const xc = (points[j].x + points[j + 1].x) / 2
            const yc = (points[j].y + points[j + 1].y) / 2
            ctx.quadraticCurveTo(points[j].x, points[j].y, xc, yc)
          }
          const last = points[points.length - 1]
          ctx.lineTo(last.x, last.y)
        }

        // Gradient color from Cyber to Glow with fog
        const gradient = ctx.createLinearGradient(0, 0, 0, h)

        gradient.addColorStop(0, 'rgba(15, 76, 129, 0.6)')
        gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.3)')
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0.1)')

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)
    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
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
        pointerEvents: 'auto',
      }}
    />
  )
}

// Particle background effect
function ParticleBackground() {
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
    const PARTICLE_COUNT = 40

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
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          alpha: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // Update and draw particles
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

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    init()
    animationId = requestAnimationFrame(draw)
    window.addEventListener('resize', () => { resize(); init() })

    return () => {
      cancelAnimationFrame(animationId)
    }
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
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}

// Text scramble effect
function useTextScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState('')
  const chars = '!<>-_\\/[]{}—=+*^?#________'

  useEffect(() => {
    if (!trigger) return

    let frame = 0
    const totalFrames = 40
    const interval = setInterval(() => {
      frame++
      const progress = frame / totalFrames

      let result = ''
      for (let i = 0; i < text.length; i++) {
        const charProgress = (progress * text.length - i) / 3
        if (charProgress > 1) {
          result += text[i]
        } else if (charProgress > 0) {
          result += chars[Math.floor(Math.random() * chars.length)]
        } else {
          result += '\u00A0'
        }
      }
      setDisplay(result)

      if (frame >= totalFrames) {
        clearInterval(interval)
        setDisplay(text)
      }
    }, 40)

    return () => clearInterval(interval)
  }, [text, trigger])

  return display
}

import { useState } from 'react'

export default function Hero() {
  const [scrambleTrigger, setScrambleTrigger] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setScrambleTrigger(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-label', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      })
      gsap.from('.hero-desc', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 1.0,
        ease: 'power3.out',
      })
      gsap.from('.hero-buttons', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 1.2,
        ease: 'power3.out',
      })
      gsap.from('.hero-stats', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 1.4,
        ease: 'power3.out',
      })
      gsap.from('.hero-image', {
        opacity: 0,
        x: -100,
        rotateY: -30,
        duration: 1.2,
        delay: 0.6,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrambledTitle = useTextScramble('Moro POS', scrambleTrigger)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0A1628' }}
    >
      <AnimatedBackground />
      <ParticleBackground />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-right">
            <p className="hero-label section-label">
              نظام نقاط البيع والمخازن المتكامل
            </p>

            <h1
              className="font-display text-6xl md:text-7xl lg:text-[80px] font-black text-ice mb-6"
              style={{ lineHeight: 1.1, textShadow: '0 0 60px rgba(0,212,255,0.3)' }}
            >
              {scrambledTitle || '\u00A0'}
            </h1>

            <p className="hero-desc text-xl md:text-2xl text-ice-70 max-w-[560px] mb-8 font-body" style={{ lineHeight: 1.6 }}>
              نظام متكامل لإدارة مبيعاتك ومخازنك وعملائك بكفاءة عالية، مع واجهة عصرية سهلة الاستخدام ودعم كامل للغة العربية
            </p>

            <div className="hero-buttons flex flex-wrap gap-4 mb-10">
              <button className="btn-primary">
                ابدأ تجربة مجانية
              </button>
              <button className="btn-secondary">
                شاهد العرض التوضيحي
              </button>
            </div>

            {/* Quick Stats */}
            <div className="hero-stats flex gap-6 flex-wrap">
              {[
                { value: '+500', label: 'عميل نشط' },
                { value: '99.9%', label: 'نسبة uptime' },
                { value: '24/7', label: 'دعم فني' },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-4 rounded-xl">
                  <div className="stat-number text-2xl md:text-3xl">{stat.value}</div>
                  <div className="text-ice-40 text-sm font-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Image */}
          <div className="hero-image hidden lg:block relative">
            <div className="floating-3d animate-float">
              <img
                src="/hero-product.png"
                alt="Moro POS Dashboard"
                className="w-full max-w-[600px] rounded-2xl"
                style={{
                  boxShadow: '0 0 80px rgba(0, 212, 255, 0.3), 0 30px 60px rgba(0, 0, 0, 0.5)',
                }}
              />
            </div>
            {/* Glow effect behind image */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full -z-10"
              style={{
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #0A1628)' }}
      />
    </section>
  )
}
