import { motion } from 'framer-motion';
import { MapPin, Mail, MessageCircle, Phone, Clock } from 'lucide-react';

const WA_LINK = 'https://wa.me/529611770435?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa.';
const MAPS_EMBED = 'https://maps.google.com/maps?q=Calle+San+Jaime+3013+Col+Santa+Fe+Chiapa+de+Corzo+Chiapas+Mexico&output=embed';
const MAPS_LINK = 'https://www.google.com/maps/search/Calle+San+Jaime+3013+Col+Santa+Fe+Chiapa+de+Corzo+Chiapas';

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
            Agenda una consulta o contáctanos directamente. Estamos listos para
            acompañarte en tus necesidades fiscales y de cumplimiento.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* WhatsApp Card */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp-card"
              className="flex items-center gap-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <MessageCircle size={22} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-0.5">WhatsApp</p>
                <p className="text-base font-semibold text-slate-900">+52 961 177 0435</p>
                <p className="text-sm text-slate-500">Respuesta rápida y personalizada</p>
              </div>
            </a>

            {/* Email Card */}
            <a
              href="mailto:octaviomendoza1704@gmail.com"
              data-testid="contact-email-card"
              className="flex items-center gap-5 bg-sky-50 border border-sky-200 rounded-2xl p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Mail size={22} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-sky-700 uppercase tracking-wide mb-0.5">Correo Electrónico</p>
                <p className="text-base font-semibold text-slate-900">octaviomendoza1704@gmail.com</p>
                <p className="text-sm text-slate-500">Consultas y solicitudes formales</p>
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+529611770435"
              data-testid="contact-phone-card"
              className="flex items-center gap-5 bg-blue-50 border border-blue-200 rounded-2xl p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Phone size={22} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-0.5">Teléfono</p>
                <p className="text-base font-semibold text-slate-900">961 177 0435</p>
                <p className="text-sm text-slate-500">Llamadas directas</p>
              </div>
            </a>

            {/* Office Address */}
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-address-card"
              className="flex items-start gap-5 bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <MapPin size={22} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Oficina</p>
                <p className="text-base font-semibold text-slate-900">Chiapa de Corzo, Chiapas</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Calle San Jaime No. 3013, Col. Santa Fe<br />
                  Chiapa de Corzo, Chiapas
                </p>
              </div>
            </a>

            {/* Office Hours */}
            <div
              data-testid="contact-hours-card"
              className="flex items-center gap-5 bg-amber-50 border border-amber-200 rounded-2xl p-5"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
                <Clock size={22} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-0.5">Horario de Atención</p>
                <p className="text-base font-semibold text-slate-900">Lun. - Vie. 9:00 – 18:00 hrs</p>
                <p className="text-sm text-slate-500">Citas disponibles previo agendamiento</p>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-testid="contact-map"
            className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-96 lg:h-full min-h-96"
          >
            <iframe
              title="Ubicación CP y PCPLDA Octavio Mendoza"
              src={MAPS_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
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
