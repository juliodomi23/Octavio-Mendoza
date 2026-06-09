import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Star, CheckCircle, BadgeCheck, GraduationCap, MapPin } from 'lucide-react';

function useCountUp(target, duration = 1800, startCounting) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const steps = 60;
    const step = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [startCounting, target, duration]);
  return count;
}

const stats = [
  { value: 22, suffix: '+', label: 'Años de experiencia', icon: Star },
  { value: 8, suffix: '', label: 'Servicios especializados', icon: CheckCircle },
  { value: 1, suffix: '', label: 'Socio fundador', icon: Users },
  { value: 1, suffix: '', label: 'Oficina en Chiapas', icon: Target },
];

function StatCounter({ stat, startCounting, index }) {
  const count = useCountUp(stat.value, 1500, startCounting);
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-testid={`stat-card-${index}`}
      className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center mx-auto mb-3">
        <Icon size={20} className="text-sky-600" />
      </div>
      <div className="text-3xl font-bold text-blue-900 font-outfit mb-1">
        {count}{stat.suffix}
      </div>
      <div className="text-sm text-slate-500 leading-tight">{stat.label}</div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      data-testid="about-section"
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
            Conócenos
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            ¿Quiénes somos?
          </h2>
        </motion.div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 font-outfit">
              CP y PCPLDA Octavio Mendoza
            </h3>
            <p className="text-base text-slate-600 leading-relaxed mb-5">
              Somos una firma de servicios contables y fiscales con más de 22 años de
              experiencia, especializada en prevención de lavado de dinero (PLD) y
              programas anticorrupción. Desde nuestros inicios entendimos que la
              contaduría va más allá del cumplimiento de obligaciones fiscales: es una
              herramienta para brindar tranquilidad y certeza jurídica a los empresarios.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              Creemos firmemente que una firma contable debe ser más que un proveedor
              de servicios; debe ser un aliado estratégico para el crecimiento sostenible
              de cada organización, aplicando siempre criterios prudenciales y actuando
              con la más alta ética profesional.
            </p>

            <div className="space-y-4">
              <div
                data-testid="about-mission"
                className="bg-white border border-slate-200 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-900 flex items-center justify-center">
                    <Target size={13} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">Misión</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Brindar asesoría integral en materia fiscal, contable y de cumplimiento
                  normativo, especializada en PLD y programas anticorrupción, implementando
                  controles internos efectivos y acompañando a las organizaciones en la
                  construcción de una cultura ética.
                </p>
              </div>
              <div
                data-testid="about-purpose"
                className="bg-white border border-slate-200 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-sky-600 flex items-center justify-center">
                    <Star size={13} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">Propósito</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Contribuir al fortalecimiento de las organizaciones mediante soluciones
                  fiscales y contables que promuevan la legalidad, la transparencia y la
                  responsabilidad corporativa, generando confianza y sostenibilidad en el
                  entorno empresarial.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Credentials card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-testid="about-credentials"
            className="relative"
          >
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 text-white h-full min-h-80">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-sky-600 flex items-center justify-center">
                  <BadgeCheck size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white text-base leading-tight">CP y PCPLDA</p>
                  <p className="text-sky-300 text-sm">Octavio Mendoza</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <GraduationCap size={18} className="text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Contador Público Certificado</p>
                    <p className="text-xs text-slate-400">Colegio de Contadores Públicos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BadgeCheck size={18} className="text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">PCPLDA Certificado</p>
                    <p className="text-xs text-slate-400">Prevención de Lavado de Dinero — SHCP</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star size={18} className="text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">22+ años de experiencia</p>
                    <p className="text-xs text-slate-400">Asesoría fiscal, contable y compliance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Chiapa de Corzo, Chiapas</p>
                    <p className="text-xs text-slate-400">Atención presencial y virtual</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-sky-400 font-outfit">22+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Años de experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sky-400 font-outfit">PLD</div>
                  <div className="text-xs text-slate-400 mt-0.5">Especialista certificado</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" data-testid="stats-grid">
          {stats.map((stat, i) => (
            <StatCounter key={i} stat={stat} startCounting={started} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
