import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, ChevronDown } from 'lucide-react';

const WA_LINK = 'https://wa.me/529611770435?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa.';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MHx8fHwxNzgwODUwMjIwfDA&ixlib=rb-4.1.0&q=85';

export default function Hero() {
  return (
    <section
      id="inicio"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-950/80 to-slate-900/85" />
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center py-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-sky-500/15 border border-sky-400/30 text-sky-300 text-sm font-medium px-4 py-2 rounded-full mb-8"
          data-testid="hero-badge"
        >
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          Servicios Contables y Fiscales · Chiapa de Corzo, Chiapas
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight mb-6 max-w-4xl mx-auto"
          data-testid="hero-heading"
        >
          Excelencia profesional con{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
            ética y responsabilidad
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10"
          data-testid="hero-subheading"
        >
          Más de 22 años brindando asesoría integral en materia fiscal, contable y de
          cumplimiento normativo. Especialistas en Prevención de Lavado de Dinero (PLD)
          y Programas Anticorrupción.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-whatsapp-button"
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-sky-600/40 hover:-translate-y-1 text-sm"
          >
            <MessageCircle size={18} />
            Contactar por WhatsApp
          </a>
          <a
            href="#servicios"
            data-testid="hero-services-button"
            className="flex items-center gap-2 border border-white/30 hover:border-white/60 text-white hover:bg-white/10 font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 text-sm"
          >
            Nuestros Servicios
            <ArrowRight size={16} />
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: '22+', label: 'Años de Experiencia' },
            { value: '8', label: 'Servicios Especializados' },
            { value: 'PLD', label: 'Especialistas en PLD' },
            { value: '100%', label: 'Compromiso con el Cliente' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl px-4 py-5 text-center backdrop-blur-sm"
              data-testid={`hero-stat-${i}`}
            >
              <div className="text-2xl sm:text-3xl font-bold text-sky-400 font-outfit mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 leading-tight">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
