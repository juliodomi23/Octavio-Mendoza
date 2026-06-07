import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useLogo } from '../../contexts/LogoContext';
import { useLang } from '../../contexts/LanguageContext';
import { useT } from '../../data/translations';
import AdminPanel from './AdminPanel';

export default function Footer() {
  const { logoUrl } = useLogo();
  const { lang } = useLang();
  const tf = useT(lang);
  const tn = tf.nav;
  const tfoot = tf.footer;

  const navLinks = [
    { label: tn.inicio, href: '#inicio' },
    { label: tn.nosotros, href: '#nosotros' },
    { label: tn.servicios, href: '#servicios' },
    { label: tn.precios, href: '#precios' },
    { label: tn.blog, href: '#blog' },
    { label: tn.contacto, href: '#contacto' },
  ];

  const services = [
    'Asesoría Fiscal Integral', 'Contabilidad Empresarial',
    'Cumplimiento Normativo', 'Prevención de Lavado de Dinero',
    'Programas Anticorrupción', 'Capacitación y Formación',
    'Auditoría de Cumplimiento', 'Gobierno Corporativo',
  ];

  return (
    <footer data-testid="footer" className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <div className="bg-white rounded-xl p-2 inline-block">
                <img
                  src={logoUrl}
                  alt="Octavio Mendoza Consultor"
                  className="h-12 w-auto object-contain"
                  data-testid="footer-logo"
                />
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">{tfoot.slogan}</p>
            <p className="text-xs text-slate-500 leading-relaxed">{tfoot.years}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 tracking-wide uppercase">{tfoot.nav}</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 tracking-wide uppercase">{tfoot.services}</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a href="#servicios" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 tracking-wide uppercase">{tfoot.contact}</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://wa.me/529611770435?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa." target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp" className="flex items-start gap-3 group">
                  <MessageCircle size={16} className="text-sky-500 mt-0.5 flex-shrink-0 group-hover:text-sky-400" />
                  <span className="text-sm text-slate-400 group-hover:text-sky-400 transition-colors">+52 961 177 0435</span>
                </a>
              </li>
              <li>
                <a href="tel:+529611770435" data-testid="footer-phone" className="flex items-start gap-3 group">
                  <Phone size={16} className="text-sky-500 mt-0.5 flex-shrink-0 group-hover:text-sky-400" />
                  <span className="text-sm text-slate-400 group-hover:text-sky-400 transition-colors">961 177 0435</span>
                </a>
              </li>
              <li>
                <a href="mailto:octaviomendoza1704@gmail.com" data-testid="footer-email" className="flex items-start gap-3 group">
                  <Mail size={16} className="text-sky-500 mt-0.5 flex-shrink-0 group-hover:text-sky-400" />
                  <span className="text-sm text-slate-400 group-hover:text-sky-400 transition-colors break-all">octaviomendoza1704@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="https://www.google.com/maps/search/Calle+San+Jaime+3013+Col+Santa+Fe+Chiapa+de+Corzo+Chiapas" target="_blank" rel="noopener noreferrer" data-testid="footer-address" className="flex items-start gap-3 group">
                  <MapPin size={16} className="text-sky-500 mt-0.5 flex-shrink-0 group-hover:text-sky-400" />
                  <span className="text-sm text-slate-400 group-hover:text-sky-400 transition-colors leading-relaxed">
                    Calle San Jaime No. 3013, Col. Santa Fe, Chiapa de Corzo, Chiapas
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} CP y PCPLDA Octavio Mendoza. {tfoot.rights}
          </p>
          <p className="text-xs text-slate-600 text-center md:text-right">{tfoot.location}</p>
        </div>
      </div>

      {/* Admin Panel */}
      <AdminPanel />
    </footer>
  );
}
