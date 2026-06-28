import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, Youtube, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Tutorial {
  id: string
  title: string
  description: string
  duration: string
  thumbnail: string
  youtubeUrl: string
  category: string
  views: string
}

const tutorials: Tutorial[] = [
  {
    id: 'tut-1',
    title: 'شرح نقاط البيع - الدليل الكامل',
    description: 'تعلم كيفية إجراء المبيعات وإصدار الفواتير وإدارة عمليات البيع اليومية بسهولة واحترافية.',
    duration: '18:42',
    thumbnail: '/thumb-pos.png',
    youtubeUrl: 'https://www.youtube.com/@moropos-eg',
    category: 'نقاط البيع',
    views: '12.5K',
  },
  {
    id: 'tut-2',
    title: 'إدارة المخزون والمنتجات',
    description: 'كيفية إضافة المنتجات وإدارة المخزون وتتبع الكميات وإعداد تنبيهات النفاد.',
    duration: '22:15',
    thumbnail: '/thumb-inventory.png',
    youtubeUrl: 'https://www.youtube.com/@moropos-eg',
    category: 'المخزون',
    views: '9.8K',
  },
  {
    id: 'tut-3',
    title: 'إدارة العملاء والحسابات',
    description: 'شرح شامل لإدارة بيانات العملاء، الديون، وحسابات الائتمان بطريقة منظمة.',
    duration: '15:30',
    thumbnail: '/thumb-customers.png',
    youtubeUrl: 'https://www.youtube.com/@moropos-eg',
    category: 'العملاء',
    views: '7.2K',
  },
  {
    id: 'tut-4',
    title: 'التقارير والإحصائيات',
    description: 'استخراج تقارير المبيعات والأرباح وتحليل أداء نشاطك التجاري باحترافية.',
    duration: '20:00',
    thumbnail: '/thumb-reports.png',
    youtubeUrl: 'https://www.youtube.com/@moropos-eg',
    category: 'التقارير',
    views: '11.1K',
  },
  {
    id: 'tut-5',
    title: 'إعداد البرنامج والبدء',
    description: 'دليل الإعداد الأول: كيفية تثبيت البرنامج وضبط الإعدادات الأساسية من الصفر.',
    duration: '12:50',
    thumbnail: '/thumb-setup.png',
    youtubeUrl: 'https://www.youtube.com/@moropos-eg',
    category: 'الإعداد',
    views: '15.3K',
  },
  {
    id: 'tut-6',
    title: 'إدارة الموردين والمشتريات',
    description: 'كيفية إدارة الموردين، تسجيل المشتريات ومتابعة الفواتير والمدفوعات.',
    duration: '17:05',
    thumbnail: '/thumb-suppliers.png',
    youtubeUrl: 'https://www.youtube.com/@moropos-eg',
    category: 'الموردين',
    views: '6.4K',
  },
]

const categoryColors: Record<string, string> = {
  'نقاط البيع': '#00D4FF',
  'المخزون': '#7C3AED',
  'العملاء': '#10B981',
  'التقارير': '#F59E0B',
  'الإعداد': '#EF4444',
  'الموردين': '#EC4899',
}

function VideoCard({ tutorial, index }: { tutorial: Tutorial; index: number }) {
  const [hovered, setHovered] = useState(false)
  const color = categoryColors[tutorial.category] ?? '#00D4FF'

  return (
    <a
      href={tutorial.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      id={`tutorial-card-${tutorial.id}`}
      className={`tutorial-card block rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer`}
      style={{
        background: 'rgba(232, 244, 253, 0.04)',
        border: `1px solid ${hovered ? color + '55' : 'rgba(0,212,255,0.1)'}`,
        boxShadow: hovered ? `0 20px 60px ${color}25, 0 0 0 1px ${color}33` : 'none',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transitionDelay: `${index * 0.05}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={tutorial.thumbnail}
          alt={tutorial.title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: hovered
              ? 'linear-gradient(135deg, rgba(10,22,40,0.4) 0%, rgba(0,0,0,0.3) 100%)'
              : 'linear-gradient(135deg, rgba(10,22,40,0.2) 0%, rgba(0,0,0,0.1) 100%)',
          }}
        />

        {/* Play button */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0.8 }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered ? color : 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              boxShadow: hovered ? `0 0 30px ${color}80` : 'none',
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <Play
              size={28}
              fill={hovered ? '#0A1628' : 'white'}
              color={hovered ? '#0A1628' : 'white'}
              className="mr-[-3px]"
            />
          </div>
        </div>

        {/* Duration badge */}
        <div
          className="absolute bottom-3 left-3 px-2 py-1 rounded-md text-xs font-mono font-bold"
          style={{
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            backdropFilter: 'blur(4px)',
          }}
        >
          {tutorial.duration}
        </div>

        {/* Category badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold"
          style={{
            background: color + '22',
            border: `1px solid ${color}55`,
            color: color,
            backdropFilter: 'blur(8px)',
          }}
        >
          {tutorial.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="font-display text-base font-bold mb-2 leading-snug transition-colors duration-300"
          style={{ color: hovered ? color : '#E8F4FD' }}
        >
          {tutorial.title}
        </h3>
        <p className="text-ice-70 font-body text-sm leading-relaxed mb-4 line-clamp-2">
          {tutorial.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5" style={{ color: 'rgba(232,244,253,0.4)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            <span className="text-xs font-body">{tutorial.views} مشاهدة</span>
          </div>
          <div
            className="flex items-center gap-1.5 text-xs font-bold transition-colors duration-300"
            style={{ color: hovered ? color : 'rgba(232,244,253,0.5)' }}
          >
            <ExternalLink size={12} />
            <span>مشاهدة</span>
          </div>
        </div>
      </div>
    </a>
  )
}

export default function Tutorials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      })

      tl.from('.tutorials-label', {
        opacity: 0, y: 20, duration: 0.5, ease: 'power3.out',
      })
      .from('.tutorials-title', {
        opacity: 0, y: 30, duration: 0.6, ease: 'power3.out',
      }, '-=0.3')
      .from('.tutorials-subtitle', {
        opacity: 0, y: 20, duration: 0.6, ease: 'power3.out',
      }, '-=0.4')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="tutorials" className="relative py-[120px] bg-deep overflow-hidden">

      {/* Background decorations */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,0,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          {/* YouTube badge */}
          <div className="tutorials-label inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(255,0,0,0.1)',
              border: '1px solid rgba(255,0,0,0.2)',
            }}
          >
            <Youtube size={16} color="#FF0000" />
            <span className="text-sm font-bold font-body" style={{ color: '#FF4444' }}>
              قناة Moro POS على يوتيوب
            </span>
          </div>

          <h2 className="tutorials-title section-title">
            شروحات{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF4444, #FF8C00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              البرنامج
            </span>
          </h2>
          <p className="tutorials-subtitle text-ice-70 font-body text-xl max-w-2xl mx-auto leading-relaxed">
            فيديوهات شرح تفصيلية لكل وحدة في البرنامج — تعلّم واستفد من القناة الرسمية
          </p>
        </div>

        {/* Videos Grid */}
        <div className="tutorials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {tutorials.map((tutorial, index) => (
            <VideoCard key={tutorial.id} tutorial={tutorial} index={index} />
          ))}
        </div>

        {/* CTA to YouTube Channel */}
        <div className="tutorials-cta text-center">
          <a
            href="https://www.youtube.com/@moropos-eg"
            target="_blank"
            rel="noopener noreferrer"
            id="youtube-channel-btn"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold font-body text-lg transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #CC0000, #FF4444)',
              color: 'white',
              boxShadow: '0 4px 30px rgba(255,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 8px 40px rgba(255,0,0,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 30px rgba(255,0,0,0.3)'
            }}
          >
            <Youtube size={24} />
            <span>زيارة القناة الرسمية</span>
            <ExternalLink size={18} />
          </a>
          <p className="text-ice-40 font-body text-sm mt-4">
            اشترك في القناة ليصلك كل جديد من شروحات ومميزات البرنامج
          </p>
        </div>
      </div>
    </section>
  )
}
