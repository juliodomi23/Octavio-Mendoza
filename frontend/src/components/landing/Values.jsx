import { motion } from 'framer-motion';
import {
  ShieldCheck, Scale, AlertOctagon, Star, Lock, BookOpen, HeartHandshake
} from 'lucide-react';

const values = [
  {
    icon: ShieldCheck,
    title: 'Integridad y Transparencia',
    description:
      'Actuamos con ética y claridad en cada proceso, fortaleciendo la confianza de nuestros clientes y de las autoridades.',
    color: 'bg-blue-900',
    light: 'bg-blue-50',
    text: 'text-blue-900',
  },
  {
    icon: Scale,
    title: 'Cumplimiento Normativo',
    description:
      'Garantizamos que cada asesoría y servicio esté plenamente alineado con la legislación vigente, reduciendo riesgos y asegurando tranquilidad.',
    color: 'bg-sky-600',
    light: 'bg-sky-50',
    text: 'text-sky-700',
  },
  {
    icon: AlertOctagon,
    title: 'Prevención y Responsabilidad',
    description:
      'Somos especialistas en PLD y anticorrupción, promoviendo prácticas responsables que protegen a las organizaciones de riesgos legales.',
    color: 'bg-indigo-700',
    light: 'bg-indigo-50',
    text: 'text-indigo-700',
  },
  {
    icon: Star,
    title: 'Excelencia Profesional',
    description:
      'Ofrecemos soluciones precisas, innovadoras y adaptadas a las necesidades de cada cliente, respaldadas por más de dos décadas de experiencia.',
    color: 'bg-blue-700',
    light: 'bg-blue-50',
    text: 'text-blue-700',
  },
  {
    icon: Lock,
    title: 'Confidencialidad y Seguridad',
    description:
      'Resguardamos la información de nuestros clientes con los más altos estándares de protección y discreción.',
    color: 'bg-sky-700',
    light: 'bg-sky-50',
    text: 'text-sky-700',
  },
  {
    icon: BookOpen,
    title: 'Capacitación y Desarrollo',
    description:
      'Impulsamos la formación continua de las organizaciones, fortaleciendo su cultura de cumplimiento y ética corporativa.',
    color: 'bg-cyan-700',
    light: 'bg-cyan-50',
    text: 'text-cyan-700',
  },
  {
    icon: HeartHandshake,
    title: 'Compromiso con el Cliente',
    description:
      'Nos enfocamos en acompañar de manera cercana y personalizada, transformando la complejidad fiscal en soluciones prácticas.',
    color: 'bg-blue-800',
    light: 'bg-blue-50',
    text: 'text-blue-800',
  },
];

export default function Values() {
  return (
    <section
      id="valores"
      data-testid="values-section"
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
            Ética y Profesionalismo
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
            Valores que nos distinguen
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto">
            Nuestros valores son el fundamento de cada asesoría, cada servicio y cada
            relación profesional que construimos.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div
          data-testid="values-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {values.map((val, i) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                data-testid={`value-card-${i}`}
                className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${val.light} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon size={22} className={val.text} />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2 leading-snug">
                  {val.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            );
          })}

          {/* CTA Card - last item */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: values.length * 0.08 }}
            className="bg-gradient-to-br from-blue-900 to-sky-700 rounded-2xl p-6 flex flex-col justify-between text-white"
          >
            <div>
              <h3 className="text-base font-semibold mb-3 leading-snug">
                ¿Listo para trabajar con nosotros?
              </h3>
              <p className="text-sm text-sky-200 leading-relaxed mb-6">
                Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos
                fiscales y de cumplimiento.
              </p>
            </div>
            <a
              href="https://wa.me/529611770435?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa."
              target="_blank"
              rel="noopener noreferrer"
              data-testid="values-cta-button"
              className="bg-white text-blue-900 font-semibold text-sm px-4 py-2.5 rounded-xl text-center hover:bg-sky-50 transition-colors"
            >
              Agendar Consulta
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
