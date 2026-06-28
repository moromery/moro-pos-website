const footerLinks = {
  modules: {
    title: 'الوحدات',
    links: [
      'نقاط البيع',
      'المخزون',
      'العملاء',
      'الموردين',
      'التقارير',
    ],
  },
  company: {
    title: 'الشركة',
    links: [
      'من نحن',
      'المدونة',
      'الوظائف',
      'اتصل بنا',
    ],
  },
  support: {
    title: 'الدعم',
    links: [
      'مركز المساعدة',
      'الأسئلة الشائعة',
      'سياسة الخصوصية',
      'شروط الاستخدام',
    ],
  },
}

export default function Footer() {
  return (
    <footer className="bg-deep-90 border-t border-[rgba(0,212,255,0.08)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="font-display text-2xl font-bold text-ice">Moro</span>
              <span className="font-mono text-2xl font-bold text-glow">POS</span>
            </div>
            <p className="text-ice-70 font-body text-base leading-relaxed">
              نظام نقاط البيع والمخازن المتكامل لإدارة نشاطك التجاري بكفاءة واحترافية.
            </p>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-display text-lg font-bold text-ice mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-ice-70 hover:text-glow transition-colors duration-200 font-body text-base"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[rgba(0,212,255,0.08)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ice-40 font-body text-sm">
            © 2025 Moro POS. جميع الحقوق محفوظة.
          </p>

          <div className="flex items-center gap-4">
            {/* Social icons */}
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[rgba(0,212,255,0.1)]"
              style={{ border: '1px solid rgba(0, 212, 255, 0.2)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[rgba(0,212,255,0.1)]"
              style={{ border: '1px solid rgba(0, 212, 255, 0.2)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[rgba(0,212,255,0.1)]"
              style={{ border: '1px solid rgba(0, 212, 255, 0.2)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
