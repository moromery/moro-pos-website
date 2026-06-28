import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight, ChevronLeft, Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    image: '/avatar-1.jpg',
    text: 'Moro POS غير طريقة إدارتي للمتجر بالكامل. كنت أضيع ساعات في الحسابات اليدوية، الآن كل شيء آلي ودقيق. أفضل استثمار عملته لنشاطي التجاري.',
    name: 'أحمد الشمري',
    role: 'صاحب متجر إلكتروني',
  },
  {
    image: '/avatar-2.jpg',
    text: 'الواجهة العربية سهلة جدًا، فريق العمل تعلم استخدامها في يوم واحد فقط. التقارير الشهرية تساعدني في معرفة أفضل المنتجات مبيعًا.',
    name: 'سارة العتيبي',
    role: 'مديرة سلسلة محلات',
  },
  {
    image: '/avatar-3.jpg',
    text: 'الدعم الفني ممتاز، أي مشكلة بتواجهني بتحل في دقائق. النظام سريع وثابت حتى في أوقات الذروة. أنصح فيه بشدة.',
    name: 'خالد القحطاني',
    role: 'مالك مطعم',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonials-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 20, duration: 0.6, ease: 'power3.out',
      })
      gsap.from('.testimonials-title', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 30, duration: 0.8, delay: 0.1, ease: 'power3.out',
      })
      gsap.from('.testimonial-carousel', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0, y: 40, duration: 0.9, delay: 0.2, ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section ref={sectionRef} className="relative py-[120px] bg-deep-90">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <p className="testimonials-label section-label">آراء عملائنا</p>
          <h2 className="testimonials-title section-title">
            قصص نجاح من الواقع
          </h2>
        </div>

        <div className="testimonial-carousel relative">
          {/* Main testimonial */}
          <div className="glass-card max-w-3xl mx-auto text-center relative">
            <Quote
              size={48}
              className="text-glow opacity-30 absolute top-6 right-6"
            />

            <div className="mb-6">
              <img
                src={testimonials[current].image}
                alt={testimonials[current].name}
                className="w-20 h-20 rounded-full mx-auto object-cover"
                style={{
                  border: '2px solid #00D4FF',
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
                }}
              />
            </div>

            <p className="text-ice-70 font-body text-lg md:text-xl leading-relaxed mb-6 italic">
              "{testimonials[current].text}"
            </p>

            <div>
              <p className="font-display text-lg font-bold text-ice">
                {testimonials[current].name}
              </p>
              <p className="text-glow text-sm font-body">
                {testimonials[current].role}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
              }}
            >
              <ChevronRight size={24} className="text-glow" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'bg-glow w-8'
                      : 'bg-ice-40 opacity-40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
              }}
            >
              <ChevronLeft size={24} className="text-glow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
