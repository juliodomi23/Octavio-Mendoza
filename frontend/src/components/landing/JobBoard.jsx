import { motion } from 'framer-motion';
import { CheckCircle, Briefcase, Send } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';
import { useT } from '../../data/translations';

const WA_BASE = 'https://wa.me/529611770435?text=';

export default function JobBoard() {
  const { lang } = useLang();
  const tj = useT(lang).jobs;

  const handleApply = () => {
    const msg = encodeURIComponent('Hola, me gustaría enviar mi perfil para futuras oportunidades laborales en su firma.');
    window.open(`${WA_BASE}${msg}`, '_blank');
  };

  return (
    <section
      id="carreras"
      data-testid="jobs-section"
      className="py-24 md:py-32 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sky-600 text-sm font-semibold tracking-widest uppercase mb-3">
            {tj.label}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
            {tj.title}
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto">{tj.sub}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* No openings card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            data-testid="jobs-no-openings"
            className="bg-white border border-slate-200 rounded-3xl p-8 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
              <Briefcase size={30} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">{tj.noOpenings}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-sm mx-auto">
              {tj.noOpeningsSub}
            </p>
            <button
              onClick={handleApply}
              data-testid="jobs-apply-btn"
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-lg mx-auto"
            >
              <Send size={15} />
              {tj.speculativeBtn}
            </button>
          </motion.div>

          {/* Why work with us */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-3xl p-8 text-white"
            data-testid="jobs-why-us"
          >
            <h3 className="text-lg font-semibold mb-6">{tj.whyTitle}</h3>
            <ul className="space-y-4">
              {tj.reasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-sky-400" />
                  </div>
                  <span className="text-sm text-sky-100 leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
