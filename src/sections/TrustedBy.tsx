import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const logos = [
  'سوبر ماركت النجمة',
  'مطعم الواحة',
  'متجر الأناقة',
  'صيدلية الشفاء',
  'مكتبة المعرفة',
  'كافيه لمة',
  'محل البستان',
  'مركز التقنية',
]

export default function TrustedBy() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.trusted-label', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 bg-deep-90 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 mb-8">
        <p className="trusted-label text-center text-ice-40 font-body text-lg">
          يثق بنا أكثر من <span className="text-glow font-bold">500</span> نشاط تجاري
        </p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center mx-8 px-8 py-4 rounded-xl"
              style={{
                background: 'rgba(232, 244, 253, 0.03)',
                border: '1px solid rgba(232, 244, 253, 0.08)',
                minWidth: '180px',
              }}
            >
              <span className="text-ice-40 font-display text-lg font-bold opacity-60">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
