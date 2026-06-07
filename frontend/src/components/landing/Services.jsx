import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Calculator, CheckSquare, Shield, Award,
  BookOpen, Search, Building2, ChevronDown, ArrowRight
} from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Asesoría Fiscal Integral',
    icon: FileText,
    description: 'Planeación estratégica y cumplimiento de obligaciones fiscales para personas físicas y morales, optimizando recursos y reduciendo riesgos.',
    details: [
      'Planeación estratégica de obligaciones fiscales',
      'Optimización de cargas tributarias con seguridad jurídica',
      'Declaraciones y cumplimiento para personas físicas y morales',
      'Atención a requerimientos y auditorías del SAT',
    ],
    modalidad: 'Honorarios mensuales o por proyecto',
  },
  {
    id: 2,
    title: 'Contabilidad Empresarial',
    icon: Calculator,
    description: 'Registro, análisis y presentación de estados financieros con precisión y transparencia para la toma de decisiones.',
    details: [
      'Elaboración y análisis de estados financieros',
      'Implementación de sistemas contables confiables',
      'Registro y control de operaciones financieras',
      'Reportes financieros mensuales y anuales',
    ],
    modalidad: 'Honorarios mensuales',
  },
  {
    id: 3,
    title: 'Cumplimiento Normativo',
    icon: CheckSquare,
    description: 'Implementación de programas de control interno y alineación con la legislación vigente nacional e internacional.',
    details: [
      'Diseño de políticas y procedimientos internos',
      'Alineación con regulaciones nacionales e internacionales',
      'Diagnóstico y mejora de procesos de cumplimiento',
      'Seguimiento y actualización normativa continua',
    ],
    modalidad: 'Proyecto con tarifa fija',
  },
  {
    id: 4,
    title: 'Prevención de Lavado de Dinero (PLD)',
    icon: Shield,
    description: 'Diseño e implementación de políticas, manuales y controles para mitigar riesgos financieros y legales relacionados con el lavado de dinero.',
    details: [
      'Elaboración de manuales y controles internos de PLD',
      'Metodologías de identificación y gestión de riesgos',
      'Capacitación especializada para oficiales de cumplimiento',
      'Actualización y revisión periódica de programas PLD',
    ],
    modalidad: 'Paquete anual + capacitación',
  },
  {
    id: 5,
    title: 'Programas Anticorrupción',
    icon: Award,
    description: 'Desarrollo de estrategias y capacitación para fortalecer la ética corporativa y la responsabilidad social empresarial.',
    details: [
      'Desarrollo de códigos de ética y conducta corporativa',
      'Estrategias de integridad y gobierno corporativo',
      'Talleres de sensibilización y cultura organizacional',
      'Implementación de canales de denuncia y mecanismos de control',
    ],
    modalidad: 'Proyecto con tarifa fija',
  },
  {
    id: 6,
    title: 'Capacitación y Formación',
    icon: BookOpen,
    description: 'Cursos y talleres especializados en materia fiscal, contable, PLD y anticorrupción, adaptados a cada organización.',
    details: [
      'Cursos en materia fiscal, contable y de cumplimiento',
      'Talleres prácticos en PLD y anticorrupción',
      'Programas de actualización para directivos y equipos financieros',
      'Material didáctico, constancias y modalidades presencial o virtual',
    ],
    modalidad: 'Por curso o taller (precio escalable)',
  },
  {
    id: 7,
    title: 'Auditoría y Revisión de Cumplimiento',
    icon: Search,
    description: 'Evaluación de procesos internos para garantizar seguridad jurídica, identificar riesgos y fortalecer controles.',
    details: [
      'Evaluación de procesos internos y controles',
      'Diagnóstico de riesgos fiscales y normativos',
      'Revisión documental y entrevistas con áreas clave',
      'Informe ejecutivo con hallazgos y recomendaciones',
    ],
    modalidad: 'Proyecto con tarifa fija',
  },
  {
    id: 8,
    title: 'Consultoría en Gobierno Corporativo',
    icon: Building2,
    description: 'Asesoría en la creación de estructuras organizacionales sólidas, transparentes y alineadas con mejores prácticas.',
    details: [
      'Diseño de estructuras organizacionales sólidas',
      'Implementación de buenas prácticas de transparencia',
      'Asesoría estratégica para la toma de decisiones',
      'Desarrollo de marcos de gobierno corporativo',
    ],
    modalidad: 'Proyecto con tarifa fija',
  },
];

function ServiceCard({ service, index }) {
  const [open, setOpen] = useState(false);
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      data-testid={`service-card-${service.id}`}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
    >
      <button
        onClick={() => setOpen(!open)}
        data-testid={`service-toggle-${service.id}`}
        className="w-full text-left p-6"
        aria-expanded={open}
      >
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
            <Icon size={20} className="text-sky-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-slate-900 leading-snug">{service.title}</h3>
              <ChevronDown
                size={17}
                className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              />
            </div>
            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{service.description}</p>
            <span className="inline-block mt-3 text-xs font-medium text-sky-700 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
              {service.modalidad}
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-100"
          >
            <div className="px-6 pb-6 pt-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Incluye:</p>
              <ul className="space-y-2">
                {service.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <ArrowRight size={14} className="text-sky-500 mt-0.5 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="servicios"
      data-testid="services-section"
      className="py-24 md:py-32 bg-slate-50"
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
            Lo que hacemos
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto">
            Soluciones especializadas en materia fiscal, contable y de cumplimiento
            normativo, adaptadas a las necesidades de cada organización.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div
          data-testid="services-grid"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 mb-4 text-sm">
            ¿Necesitas una solución personalizada?
          </p>
          <a
            href="https://wa.me/529611770435?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa."
            target="_blank"
            rel="noopener noreferrer"
            data-testid="services-cta-button"
            className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/25 hover:-translate-y-0.5 text-sm"
          >
            Contáctanos para una solución personalizada
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
