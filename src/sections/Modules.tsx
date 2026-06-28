import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const modules = [
  {
    image: '/feature-pos.jpg',
    title: 'نقاط البيع',
    description: 'واجهة بيع سريعة وسلسة مع دعم الباركود، البحث الذكي، والدفع المتعدد',
    points: [
      'واجهة بيع سهلة وسلسة',
      'دعم قارئ الباركود',
      'إمكانية إضافة خصومات',
      'طباعة الإيصالات فورًا',
    ],
  },
  {
    image: '/feature-inventory.jpg',
    title: 'إدارة المخزون',
    description: 'تتبع دقيق لكميات المنتجات، تنبيهات المخزون المنخفض، وإدارة التصنيفات',
    points: [
      'تتبع الكميات لحظيًا',
      'تنبيهات المخزون المنخفض',
      'إدارة التصنيفات والوحدات',
      'جرد المخزون الآلي',
    ],
  },
  {
    image: '/feature-customers.jpg',
    title: 'العملاء والموردين',
    description: 'قاعدة بيانات متكاملة لعملائك ومورديك مع تتبع المدفوعات والأرصدة',
    points: [
      'قاعدة بيانات العملاء',
      'تتبع ديون العملاء',
      'إدارة الموردين والمدفوعات',
      'تقارير تفصيلية',
    ],
  },
  {
    image: '/feature-analytics.jpg',
    title: 'تقارير ذكية',
    description: 'أكثر من 15 نوع تقرير تحليلي لمساعدتك في اتخاذ القرارات الصحيحة',
    points: [
      'تقارير المبيعات والأرباح',
      'تقارير المخزون',
      'تقرير الصلاحية',
      'تحليلات متقدمة',
    ],
  },
]

export default function Modules() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.modules-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 20, duration: 0.6, ease: 'power3.out',
      })
      gsap.from('.modules-title', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 30, duration: 0.8, delay: 0.1, ease: 'power3.out',
      })

      gsap.utils.toArray<HTMLElement>('.module-row').forEach((row, i) => {
        const image = row.querySelector('.module-image')
        const text = row.querySelector('.module-text')

        gsap.from(image, {
          scrollTrigger: { trigger: row, start: 'top 80%' },
          opacity: 0, x: i % 2 === 0 ? -80 : 80, duration: 0.9, ease: 'power3.out',
        })
        gsap.from(text, {
          scrollTrigger: { trigger: row, start: 'top 80%' },
          opacity: 0, x: i % 2 === 0 ? 80 : -80, duration: 0.9, delay: 0.15, ease: 'power3.out',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="modules"
      ref={sectionRef}
      className="relative py-[120px] bg-deep-90"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <p className="modules-label section-label">وحدات النظام</p>
          <h2 className="modules-title section-title">
            كل شيء تحت سقف واحد
          </h2>
        </div>

        <div className="space-y-20">
          {modules.map((module, i) => (
            <div
              key={module.title}
              className={`module-row grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                i % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div
                className={`module-image ${i % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    transform: `perspective(1200px) rotateY(${i % 2 === 0 ? '-8' : '8'}deg) rotateX(3deg)`,
                    boxShadow: '0 0 60px rgba(0, 212, 255, 0.2), 0 20px 40px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <img
                    src={module.image}
                    alt={module.title}
                    className="w-full h-auto"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(10, 22, 40, 0.4), transparent)',
                    }}
                  />
                </div>
              </div>

              {/* Text */}
              <div
                className={`module-text text-right ${i % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <h3 className="font-display text-3xl md:text-4xl font-bold text-ice mb-4">
                  {module.title}
                </h3>
                <p className="text-ice-70 text-lg font-body mb-6 leading-relaxed">
                  {module.description}
                </p>
                <ul className="space-y-3">
                  {module.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 justify-end">
                      <span className="text-ice font-body">{point}</span>
                      <Check size={20} className="text-glow flex-shrink-0" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
