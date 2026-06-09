import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';
import { useT } from '../../data/translations';

function TestimonialCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-testid={`testimonial-card-${index}`}
      className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Stars */}
      <div className="flex gap-1" aria-label="5 estrellas">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className="text-amber-400 fill-amber-400" aria-hidden="true" />
        ))}
      </div>

      {/* Quote */}
      <div className="relative">
        <Quote size={20} className="text-sky-200 absolute -top-1 -left-1" aria-hidden="true" />
        <p className="text-sm text-slate-600 leading-relaxed pl-5 italic">
          {item.quote}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-900 to-sky-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">
            {item.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 leading-tight">{item.name}</p>
          <p className="text-xs text-slate-500">{item.role} · {item.company}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const { lang } = useLang();
  const tt = useT(lang).testimonials;

  return (
    <section
      id="testimonios"
      data-testid="testimonials-section"
      className="py-24 md:py-32 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sky-600 text-sm font-semibold tracking-widest uppercase mb-3">
            {tt.label}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
            {tt.title}
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto">{tt.sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tt.items.map((item, i) => (
            <TestimonialCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
