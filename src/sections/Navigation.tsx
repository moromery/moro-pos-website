import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'المميزات', href: '#features' },
  { label: 'الوحدات', href: '#modules' },
  { label: 'الشروحات', href: '#tutorials' },
  { label: 'الأسعار', href: '#pricing' },
  { label: 'التواصل', href: '#cta' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(10,22,40,0.85)] backdrop-blur-xl border-b border-[rgba(0,212,255,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1">
          <span className="font-display text-2xl font-bold text-ice">Moro</span>
          <span className="font-mono text-2xl font-bold text-glow">POS</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="relative text-ice-70 hover:text-ice transition-colors duration-250 font-body text-base font-medium group"
            >
              {link.label}
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-glow transition-all duration-250 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="btn-primary py-3 px-6 text-base">
            جرب مجانًا
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-ice p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-deep-90 backdrop-blur-xl border-t border-[rgba(0,212,255,0.1)]">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-ice-70 hover:text-ice transition-colors text-right font-body text-lg py-2"
              >
                {link.label}
              </button>
            ))}
            <button className="btn-primary py-3 px-6 text-base mt-2">
              جرب مجانًا
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
