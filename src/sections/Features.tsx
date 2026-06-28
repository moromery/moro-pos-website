import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  LayoutGrid,
  Shield,
  Zap,
  Globe,
  Smartphone,
  Headphones,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: LayoutGrid,
    title: 'واجهة سهلة الاستخدام',
    description: 'تصميم عصري بديهي يحتاج لأقل من 10 دقائق تدريب',
  },
  {
    icon: Shield,
    title: 'أمان وحماية كاملة',
    description: 'تشفير البيانات ونسخ احتياطي تلقائي على السحابة',
  },
  {
    icon: Zap,
    title: 'سرعة فائقة',
    description: 'أداء سريع حتى مع آلاف المنتجات والعمليات',
  },
  {
    icon: Globe,
    title: 'دعم كامل للعربية',
    description: 'واجهة عربية بالكامل مع تقارير وإيصالات عربية',
  },
  {
    icon: Smartphone,
    title: 'يعمل على جميع الأجهزة',
    description: 'يعمل على الكمبيوتر، التابلت، والموبايل',
  },
  {
    icon: Headphones,
    title: 'دعم فني 24/7',
    description: 'فريق دعم متخصص جاهز لمساعدتك على مدار الساعة',
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.features-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 20, duration: 0.6, ease: 'power3.out',
      })
      gsap.from('.features-title', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 30, duration: 0.8, delay: 0.1, ease: 'power3.out',
      })

      gsap.utils.toArray<HTMLElement>('.feature-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 85%' },
          opacity: 0, y: 40, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-[120px] bg-deep"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <p className="features-label section-label">لماذا Moro POS؟</p>
          <h2 className="features-title section-title">
            كل ما تحتاجه لإدارة نشاطك التجاري
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="feature-card glass-card-hover">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(0, 212, 255, 0.1)' }}
                >
                  <Icon size={28} className="text-glow" />
                </div>
                <h3 className="font-display text-xl font-bold text-ice mb-3">
                  {feature.title}
                </h3>
                <p className="text-ice-70 font-body text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
