import { motion } from 'framer-motion';
import { BookOpen, Bell, Users } from 'lucide-react';

export default function BlogSection() {
  return (
    <section
      id="blog"
      data-testid="blog-section"
      className="py-24 md:py-32 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sky-600 text-sm font-semibold tracking-widest uppercase mb-3">
            Recursos
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
            Blog
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto">
            Contenido especializado para empresarios y emprendedores en materia fiscal,
            contable y de cumplimiento normativo.
          </p>
        </motion.div>

        {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          data-testid="blog-coming-soon"
          className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-sky-800 rounded-3xl p-10 md:p-16 text-center text-white"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
          </div>

          <div className="relative z-10">
            {/* Icon */}
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6 border border-white/10">
              <BookOpen size={36} className="text-sky-300" />
            </div>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-300 text-sm font-semibold px-5 py-2 rounded-full mb-6"
              data-testid="blog-badge"
            >
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              Próximamente
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 max-w-lg mx-auto">
              Estamos preparando contenido de valor para ti
            </h3>
            <p className="text-base text-sky-200 leading-relaxed max-w-2xl mx-auto mb-10">
              Pronto podrás acceder a artículos, guías y actualizaciones fiscales
              especialmente diseñadas para{' '}
              <span className="text-white font-medium">empresarios y emprendedores</span>.
              Mantente al tanto de los cambios normativos y aprende a tomar mejores
              decisiones financieras.
            </p>

            {/* Topics Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              {[
                { icon: BookOpen, text: 'Actualizaciones Fiscales', desc: 'Cambios normativos al día' },
                { icon: Users, text: 'Para Empresarios', desc: 'Estrategias y consejos prácticos' },
                { icon: Bell, text: 'Cumplimiento PLD', desc: 'Guías y buenas prácticas' },
              ].map((topic, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
                  data-testid={`blog-topic-${i}`}
                >
                  <topic.icon size={22} className="text-sky-400 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-white mb-1">{topic.text}</div>
                  <div className="text-xs text-sky-300">{topic.desc}</div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/529611770435?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20actualizaciones%20del%20blog."
              target="_blank"
              rel="noopener noreferrer"
              data-testid="blog-notify-btn"
              className="inline-flex items-center gap-2 bg-white text-blue-900 font-semibold px-8 py-3.5 rounded-xl hover:bg-sky-50 transition-colors text-sm"
            >
              <Bell size={16} />
              Avísame cuando esté disponible
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
