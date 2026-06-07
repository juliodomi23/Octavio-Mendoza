import { motion } from 'framer-motion';
import { Check, MessageCircle } from 'lucide-react';

const pricingItems = [
  {
    id: 1,
    title: 'Asesoría Fiscal y Contable',
    modalidad: 'Honorarios mensuales o por proyecto',
    tag: 'Recurrente',
    tagColor: 'bg-sky-50 text-sky-700 border-sky-100',
    includes: [
      'Cumplimiento fiscal mensual',
      'Contabilidad y estados financieros',
      'Reportes y análisis periódicos',
    ],
    featured: false,
  },
  {
    id: 2,
    title: 'Cumplimiento Normativo y Gobierno Corporativo',
    modalidad: 'Proyecto con tarifa fija',
    tag: 'Por proyecto',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-100',
    includes: [
      'Diagnóstico inicial de cumplimiento',
      'Diseño de políticas y controles internos',
      'Implementación y seguimiento',
    ],
    featured: false,
  },
  {
    id: 3,
    title: 'Prevención de Lavado de Dinero (PLD)',
    modalidad: 'Paquete anual + capacitación incluida',
    tag: 'Paquete Anual',
    tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    includes: [
      'Elaboración de manuales PLD',
      'Controles internos y gestión de riesgos',
      'Formación de oficiales de cumplimiento',
    ],
    featured: true,
  },
  {
    id: 4,
    title: 'Programas Anticorrupción',
    modalidad: 'Proyecto con tarifa fija',
    tag: 'Por proyecto',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-100',
    includes: [
      'Código de ética y conducta',
      'Talleres de sensibilización',
      'Estrategias de integridad corporativa',
    ],
    featured: false,
  },
  {
    id: 5,
    title: 'Capacitación y Formación Empresarial',
    modalidad: 'Por curso o taller (precio escalable)',
    tag: 'Modular',
    tagColor: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    includes: [
      'Material didáctico incluido',
      'Constancias de participación',
      'Presencial o virtual según necesidad',
    ],
    featured: false,
  },
  {
    id: 6,
    title: 'Auditoría y Revisión de Cumplimiento',
    modalidad: 'Proyecto con tarifa fija',
    tag: 'Por proyecto',
    tagColor: 'bg-slate-100 text-slate-700 border-slate-200',
    includes: [
      'Revisión documental completa',
      'Entrevistas con áreas clave',
      'Informe ejecutivo con recomendaciones',
    ],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="precios"
      data-testid="pricing-section"
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
            Transparencia en costos
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
            Modalidades y Precios
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto">
            Ofrecemos esquemas de cobro flexibles adaptados al tipo de servicio y a las
            necesidades de cada cliente. Contáctanos para recibir una cotización personalizada.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div
          data-testid="pricing-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
        >
          {pricingItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-testid={`pricing-card-${item.id}`}
              className={`relative rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                item.featured
                  ? 'border-blue-900 bg-gradient-to-br from-blue-950 to-blue-900 text-white shadow-lg shadow-blue-900/20'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {item.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-sky-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Mas Solicitado
                  </span>
                </div>
              )}

              <div className="mb-4">
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border mb-3 ${
                    item.featured ? 'bg-blue-800 text-sky-300 border-blue-700' : item.tagColor
                  }`}
                >
                  {item.tag}
                </span>
                <h3
                  className={`text-base font-semibold leading-snug mb-2 ${
                    item.featured ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    item.featured ? 'text-sky-200' : 'text-slate-500'
                  }`}
                >
                  {item.modalidad}
                </p>
              </div>

              <ul className="space-y-2 mb-6">
                {item.includes.map((inc, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check
                      size={15}
                      className={`mt-0.5 flex-shrink-0 ${
                        item.featured ? 'text-sky-400' : 'text-sky-600'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        item.featured ? 'text-sky-100' : 'text-slate-600'
                      }`}
                    >
                      {inc}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/529611770435?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20"
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`pricing-cta-${item.id}`}
                className={`block text-center text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 ${
                  item.featured
                    ? 'bg-white text-blue-900 hover:bg-sky-50'
                    : 'border border-slate-300 text-slate-700 hover:border-sky-500 hover:text-sky-600 hover:bg-sky-50'
                }`}
              >
                Solicitar Cotización
              </a>
            </motion.div>
          ))}
        </div>

        {/* Discount Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          data-testid="pricing-discount-banner"
        >
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Paquetes combinados</h3>
            <p className="text-sm text-slate-600">
              Obtén descuentos especiales al contratar varios servicios. Contacta para
              conocer nuestras opciones de paquetes personalizados.
            </p>
          </div>
          <a
            href="https://wa.me/529611770435?text=Hola%2C%20me%20gustar%C3%ADa%20conocer%20sus%20paquetes%20combinados."
            target="_blank"
            rel="noopener noreferrer"
            data-testid="pricing-combo-btn"
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg text-sm flex-shrink-0"
          >
            <MessageCircle size={16} />
            Consultar Paquetes
          </a>
        </motion.div>
      </div>
    </section>
  );
}
