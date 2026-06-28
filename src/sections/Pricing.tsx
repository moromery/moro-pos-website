import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Basic',
    price: '99',
    period: 'شهر',
    description: 'مناسب للمشاريع الصغيرة',
    features: [
      'نقاط البيع',
      'إدارة المخزون',
      'إدارة العملاء',
      '3 مستخدمين',
      'دعم بالبريد',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '199',
    period: 'شهر',
    description: 'الأكثر شيوعًا',
    badge: 'الأكثر شيوعًا',
    features: [
      'كل مميزات Basic',
      'التقارير المتقدمة',
      'إدارة الموردين',
      'مستخدمين غير محدود',
      'دعم مباشر 24/7',
      'API للربط الخارجي',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: null,
    priceText: 'تواصل معنا',
    period: '',
    description: 'للشركات الكبيرة',
    features: [
      'كل مميزات Pro',
      'تخصيص كامل',
      'API access ممتد',
      'مدير حساب مخصص',
      'تدريب مباشر',
      'ضمان uptime 99.99%',
    ],
    highlighted: false,
  },
]

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 20, duration: 0.6, ease: 'power3.out',
      })
      gsap.from('.pricing-title', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 30, duration: 0.8, delay: 0.1, ease: 'power3.out',
      })

      gsap.utils.toArray<HTMLElement>('.pricing-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 85%' },
          opacity: 0, y: 50, scale: 0.95, duration: 0.8, delay: i * 0.15, ease: 'power3.out',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-[120px] bg-deep"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <p className="pricing-label section-label">الأسعار</p>
          <h2 className="pricing-title section-title">
            اختر الخطة المناسبة لك
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'md:scale-105 z-10'
                  : ''
              }`}
              style={{
                background: plan.highlighted
                  ? 'rgba(0, 212, 255, 0.05)'
                  : 'rgba(232, 244, 253, 0.03)',
                border: plan.highlighted
                  ? '2px solid rgba(0, 212, 255, 0.3)'
                  : '1px solid rgba(232, 244, 253, 0.08)',
                boxShadow: plan.highlighted
                  ? '0 0 40px rgba(0, 212, 255, 0.15), 0 20px 40px rgba(0, 0, 0, 0.3)'
                  : 'none',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full font-body text-sm font-bold"
                  style={{
                    background: '#00D4FF',
                    color: '#0A1628',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-display text-2xl font-bold text-ice mb-2">
                  {plan.name}
                </h3>
                <p className="text-ice-40 text-sm font-body mb-4">
                  {plan.description}
                </p>

                {plan.price ? (
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-mono text-5xl font-bold text-glow">
                      {plan.price}
                    </span>
                    <span className="text-ice-70 font-body">ر.س</span>
                    <span className="text-ice-40 font-body text-sm">/ {plan.period}</span>
                  </div>
                ) : (
                  <div className="font-display text-3xl font-bold text-glow">
                    {plan.priceText}
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 justify-end text-ice-70 font-body"
                  >
                    <span>{feature}</span>
                    <Check size={18} className="text-glow flex-shrink-0" />
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-body font-bold text-lg transition-all duration-300 ${
                  plan.highlighted
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {plan.price ? 'اشترك الآن' : 'تواصل معنا'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
