import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Building2, FileText, MessageSquare } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';
import { useT } from '../../data/translations';

const SERVICES_ES = [
  'Asesoría Fiscal Integral', 'Contabilidad Empresarial', 'Cumplimiento Normativo',
  'Prevención de Lavado de Dinero (PLD)', 'Programas Anticorrupción',
  'Capacitación y Formación', 'Auditoría y Revisión', 'Gobierno Corporativo', 'Otro',
];
const SERVICES_EN = [
  'Comprehensive Tax Advisory', 'Business Accounting', 'Regulatory Compliance',
  'Anti-Money Laundering (AML)', 'Anti-Corruption Programs',
  'Training & Education', 'Audit & Review', 'Corporate Governance', 'Other',
];
const SERVICES_FR = [
  'Conseil fiscal intégral', 'Comptabilité d\'entreprise', 'Conformité réglementaire',
  'Lutte contre le blanchiment', 'Programmes anti-corruption',
  'Formation', 'Audit', 'Gouvernance d\'entreprise', 'Autre',
];

const SERVICES_MAP = { es: SERVICES_ES, en: SERVICES_EN, fr: SERVICES_FR };

export default function LeadForm() {
  const { lang } = useLang();
  const tf = useT(lang).leadform;
  const services = SERVICES_MAP[lang] || SERVICES_ES;

  const [form, setForm] = useState({ name: '', company: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.service) return;
    setLoading(true);
    const text = `Hola, soy ${form.name}${form.company ? ` de ${form.company}` : ''}. Me interesa el servicio de: ${form.service}.${form.message ? ` Mensaje: ${form.message}` : ''}`;
    const link = `https://wa.me/529611770435?text=${encodeURIComponent(text)}`;
    setTimeout(() => {
      window.open(link, '_blank');
      setLoading(false);
      setForm({ name: '', company: '', service: '', message: '' });
    }, 500);
  };

  return (
    <section
      id="cotizacion"
      data-testid="leadform-section"
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sky-600 text-sm font-semibold tracking-widest uppercase mb-3">
            {tf.label}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
            {tf.title}
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto">{tf.sub}</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          data-testid="lead-form"
          className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-10 shadow-sm space-y-5"
        >
          {/* Name */}
          <div className="relative">
            <label htmlFor="lead-name" className="sr-only">{tf.namePlaceholder}</label>
            <User size={16} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" aria-hidden="true" />
            <input
              id="lead-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={tf.namePlaceholder}
              required
              data-testid="lead-name"
              className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Company */}
          <div className="relative">
            <label htmlFor="lead-company" className="sr-only">{tf.companyPlaceholder}</label>
            <Building2 size={16} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" aria-hidden="true" />
            <input
              id="lead-company"
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder={tf.companyPlaceholder}
              data-testid="lead-company"
              className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Service */}
          <div className="relative">
            <label htmlFor="lead-service" className="sr-only">{tf.servicePlaceholder}</label>
            <FileText size={16} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" aria-hidden="true" />
            <select
              id="lead-service"
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              data-testid="lead-service"
              className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all appearance-none bg-white"
            >
              <option value="">{tf.servicePlaceholder}</option>
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Message */}
          <div className="relative">
            <label htmlFor="lead-message" className="sr-only">{tf.messagePlaceholder}</label>
            <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" aria-hidden="true" />
            <textarea
              id="lead-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={tf.messagePlaceholder}
              rows={3}
              data-testid="lead-message"
              className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            data-testid="lead-submit"
            className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-sky-600/25 text-sm"
          >
            <Send size={16} />
            {loading ? tf.sending : tf.sendBtn}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
