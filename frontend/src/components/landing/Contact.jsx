import { motion } from 'framer-motion';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';
import { useT } from '../../data/translations';

const WA_LINK = 'https://wa.me/529611770435?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa.';
const MAPS_EMBED = 'https://maps.google.com/maps?q=Calle+San+Jaime+3013+Col+Santa+Fe+Chiapa+de+Corzo+Chiapas+Mexico&output=embed';
const MAPS_LINK = 'https://www.google.com/maps/search/Calle+San+Jaime+3013+Col+Santa+Fe+Chiapa+de+Corzo+Chiapas';

export default function Contact() {
  const { lang } = useLang();
  const tc = useT(lang).contact;

  return (
    <section id="contacto" data-testid="contact-section" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sky-600 text-sm font-semibold tracking-widest uppercase mb-3">
            {tc.label}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
            {tc.title}
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto">{tc.sub}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Contact cards */}
          <div className="space-y-4">
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-5 text-white hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle size={26} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-green-100 mb-0.5">{tc.waLabel}</p>
                <p className="text-xl font-bold">+52 961 177 0435</p>
                <p className="text-sm text-green-100">{tc.waAction}</p>
              </div>
            </motion.a>

            <motion.a
              href="tel:+529611770435"
              data-testid="contact-phone-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-5 bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl p-5 text-white hover:shadow-xl hover:shadow-blue-900/25 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Phone size={26} className="text-sky-300" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-sky-300 mb-0.5">{tc.phoneLabel}</p>
                <p className="text-xl font-bold">961 177 0435</p>
                <p className="text-sm text-blue-300">{tc.phoneHours}</p>
              </div>
            </motion.a>

            <motion.a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-address-strip"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 hover:border-sky-300 hover:bg-sky-50 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-100 transition-colors">
                <MapPin size={18} className="text-slate-600 group-hover:text-sky-600" />
              </div>
              <span className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{tc.officeLabel}</span>
                Calle San Jaime No. 3013, Col. Santa Fe, Chiapa de Corzo, Chiapas
              </span>
            </motion.a>
          </div>

          {/* Right: Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            data-testid="contact-map"
            className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-80 lg:h-full min-h-80"
          >
            <iframe
              title={tc.mapTitle}
              src={MAPS_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px', display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
