import { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLogo } from '../../contexts/LogoContext';
import { useLang, LANGUAGES } from '../../contexts/LanguageContext';
import { useT } from '../../data/translations';

const WA_LINK = 'https://wa.me/529611770435?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa.';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { logoUrl } = useLogo();
  const { lang, changeLang } = useLang();
  const tn = useT(lang).nav;

  const navLinks = [
    { label: tn.inicio, href: '#inicio' },
    { label: tn.nosotros, href: '#nosotros' },
    { label: tn.servicios, href: '#servicios' },
    { label: tn.precios, href: '#precios' },
    { label: tn.blog, href: '#blog' },
    { label: tn.contacto, href: '#contacto' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-white/95 border-b border-slate-200/60 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a href="#inicio" data-testid="navbar-logo" className="flex items-center flex-shrink-0">
            <div className="bg-white rounded-xl px-3 py-2 shadow-md border border-slate-100 flex items-center">
              <img
                src={logoUrl}
                alt="Octavio Mendoza Consultor"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g,'-')}`}
                className={`text-sm font-medium transition-colors duration-200 hover:text-sky-400 ${
                  scrolled ? 'text-slate-700' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: Lang + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                data-testid="lang-switcher-btn"
                className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg transition-all ${
                  scrolled ? 'text-slate-600 hover:bg-slate-100' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <Globe size={14} />
                {lang.toUpperCase()}
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden min-w-32 z-50"
                    data-testid="lang-dropdown"
                  >
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { changeLang(l.code); setLangOpen(false); }}
                        data-testid={`lang-option-${l.code}`}
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-sky-50 hover:text-sky-700 ${
                          lang === l.code ? 'text-sky-600 bg-sky-50' : 'text-slate-700'
                        }`}
                      >
                        {l.label} — {l.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="navbar-whatsapp-btn"
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-sky-600/30 hover:-translate-y-0.5"
            >
              <PhoneCall size={15} />
              {tn.cta}
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menú"
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white/97 backdrop-blur-xl border-b border-slate-200"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-5 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex text-slate-700 font-medium py-3 border-b border-slate-100 last:border-0 hover:text-sky-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {/* Language row */}
              <div className="flex gap-2 pt-3">
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => changeLang(l.code)}
                    className={`flex-1 text-xs font-bold py-2 rounded-lg border transition-colors ${
                      lang === l.code ? 'bg-sky-600 text-white border-sky-600' : 'border-slate-200 text-slate-600 hover:border-sky-300'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-sky-600 text-white text-sm font-semibold px-5 py-3 rounded-xl mt-2"
              >
                <PhoneCall size={15} />
                {tn.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
