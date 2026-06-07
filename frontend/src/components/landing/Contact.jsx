import { motion } from 'framer-motion';
import { MapPin, MessageCircle, Phone } from 'lucide-react';

const WA_LINK = 'https://wa.me/529611770435?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa.';

export default function Contact() {
  return (
    <section
      id="contacto"
      data-testid="contact-section"
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sky-600 text-sm font-semibold tracking-widest uppercase mb-3">
            Contáctanos
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
            Estamos para atenderte
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto">
            Contáctanos directamente por WhatsApp o teléfono. Respuesta rápida y
            atención personalizada.
          </p>
        </motion.div>

        {/* Contact Cards - Centered, prominent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-10">
          {/* WhatsApp - Main CTA */}
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="contact-whatsapp-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white text-center hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle size={32} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-green-100 mb-1">WhatsApp</p>
              <p className="text-2xl font-bold">+52 961 177 0435</p>
              <p className="text-sm text-green-100 mt-1">Escríbenos ahora</p>
            </div>
          </motion.a>

          {/* Phone */}
          <motion.a
            href="tel:+529611770435"
            data-testid="contact-phone-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-blue-800 to-blue-900 rounded-3xl p-8 text-white text-center hover:shadow-xl hover:shadow-blue-900/30 hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone size={32} className="text-sky-300" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-sky-300 mb-1">Teléfono</p>
              <p className="text-2xl font-bold">961 177 0435</p>
              <p className="text-sm text-blue-300 mt-1">Lun. - Vie. 9:00 – 18:00 hrs</p>
            </div>
          </motion.a>
        </div>

        {/* Address strip */}
        <motion.a
          href="https://www.google.com/maps/search/Calle+San+Jaime+3013+Col+Santa+Fe+Chiapa+de+Corzo+Chiapas"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="contact-address-strip"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-3 max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 hover:border-sky-300 hover:bg-sky-50 transition-all duration-200 group"
        >
          <MapPin size={18} className="text-sky-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
          <span className="text-sm text-slate-600 text-center">
            <span className="font-medium text-slate-900">Oficina: </span>
            Calle San Jaime No. 3013, Col. Santa Fe, Chiapa de Corzo, Chiapas
          </span>
        </motion.a>
      </div>
    </section>
  );
}
