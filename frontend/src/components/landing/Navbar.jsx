import { useState, useEffect } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLogo } from '../../contexts/LogoContext';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Precios', href: '#precios' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contacto', href: '#contacto' },
];

const WA_LINK = 'https://wa.me/529611770435?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa.';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logoUrl } = useLogo();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl bg-white/95 border-b border-slate-200/60 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" data-testid="navbar-logo" className="flex items-center group">
            <div
              className={`rounded-xl overflow-hidden transition-all duration-300 ${
                !scrolled ? 'bg-white/95 px-2 py-1 shadow-lg' : ''
              }`}
            >
              <img
                src={logoUrl}
                alt="Octavio Mendoza Consultor"
                className="h-9 md:h-10 w-auto object-contain"
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                className={`text-sm font-medium transition-colors duration-200 hover:text-sky-500 ${
                  scrolled ? 'text-slate-700' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="navbar-whatsapp-btn"
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-sky-600/30 hover:-translate-y-0.5"
            >
              <PhoneCall size={15} />
              Agendar Asesoría
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menú"
            className={`md:hidden p-2 rounded-lg transition-colors ${
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
            className="md:hidden bg-white/97 backdrop-blur-xl border-b border-slate-200"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-5 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center text-slate-700 font-medium py-3 border-b border-slate-100 last:border-0 hover:text-sky-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-sky-600 text-white text-sm font-semibold px-5 py-3 rounded-xl mt-3"
              >
                <PhoneCall size={15} />
                Agendar Asesoría
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
