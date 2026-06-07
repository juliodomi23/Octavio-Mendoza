import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Globe, BookOpen, MessageCircle, Languages, MapPin, Briefcase,
  Tag, Database, Calendar, Headphones, FileInput, Check
} from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';
import { useT } from '../../data/translations';

const DEFAULT_FEATURES = [
  'domain','blog','whatsapp','multilang','map','jobs','brand','storage','calendar','support','forms'
];

const ALL_FEATURES = [
  { id: 'domain',    icon: Globe,        title: { es: 'Dominio gratis por un año',        en: 'Free Domain for One Year',          fr: 'Domaine gratuit pour un an' },        desc: { es: 'Registro o renovación de dominio .com, .mx u otro.', en: 'Domain registration or renewal included.', fr: 'Enregistrement ou renouvellement de domaine.' } },
  { id: 'blog',      icon: BookOpen,     title: { es: 'Blog',                             en: 'Blog',                              fr: 'Blog' },                              desc: { es: 'Sección de artículos y recursos para tus clientes.', en: 'Articles and resources section for clients.', fr: 'Section d\'articles pour vos clients.' } },
  { id: 'whatsapp',  icon: MessageCircle,title: { es: 'Redirección a WhatsApp',           en: 'WhatsApp Redirect',                 fr: 'Redirection WhatsApp' },              desc: { es: 'Botones de contacto directo a WhatsApp en todo el sitio.', en: 'Direct WhatsApp contact buttons throughout the site.', fr: 'Boutons de contact WhatsApp sur tout le site.' } },
  { id: 'multilang', icon: Languages,    title: { es: 'Cambio de idioma (hasta 3)',       en: 'Language Switcher (up to 3)',        fr: 'Changement de langue (jusqu\'à 3)' }, desc: { es: 'Sitio disponible en Español, Inglés y Francés.', en: 'Site available in Spanish, English and French.', fr: 'Site disponible en Espagnol, Anglais et Français.' } },
  { id: 'map',       icon: MapPin,       title: { es: 'Ubicación en mapa',                en: 'Map Location',                      fr: 'Localisation sur carte' },            desc: { es: 'Mapa interactivo con la ubicación de tu oficina.', en: 'Interactive map with your office location.', fr: 'Carte interactive avec votre bureau.' } },
  { id: 'jobs',      icon: Briefcase,    title: { es: 'Bolsa de trabajo',                 en: 'Job Board',                         fr: 'Offres d\'emploi' },                  desc: { es: 'Sección para publicar vacantes y recibir postulaciones.', en: 'Section to publish vacancies and receive applications.', fr: 'Section pour publier des offres d\'emploi.' } },
  { id: 'brand',     icon: Tag,          title: { es: 'Eliminación de marca agencia',     en: 'Agency Brand Removal',              fr: 'Suppression de marque agence' },      desc: { es: 'Sitio web sin atribución visible de la agencia.', en: 'Website without visible agency attribution.', fr: 'Site sans attribution d\'agence visible.' } },
  { id: 'storage',   icon: Database,     title: { es: 'Almacenamiento 10 GB',             en: '10 GB Storage',                     fr: 'Stockage 10 Go' },                    desc: { es: 'Espacio para imágenes, documentos y contenido multimedia.', en: 'Space for images, documents and multimedia content.', fr: 'Espace pour images, documents et contenu multimédia.' } },
  { id: 'calendar',  icon: Calendar,     title: { es: 'Eventos con Google Calendar',      en: 'Google Calendar Events',            fr: 'Événements Google Calendar' },        desc: { es: 'Agenda de citas y eventos integrada con Google Calendar.', en: 'Appointments and events calendar integrated with Google.', fr: 'Agenda intégré à Google Calendar.' } },
  { id: 'support',   icon: Headphones,   title: { es: 'Atención al cliente',              en: 'Customer Support',                  fr: 'Assistance client' },                 desc: { es: 'Soporte técnico y mantenimiento continuo del sitio.', en: 'Technical support and continuous site maintenance.', fr: 'Support technique et maintenance continue.' } },
  { id: 'forms',     icon: FileInput,    title: { es: 'Formularios para prospectos',      en: 'Lead Capture Forms',                fr: 'Formulaires prospects' },             desc: { es: 'Formulario de contacto y cotización para captar clientes.', en: 'Contact and quote form to capture clients.', fr: 'Formulaires de contact et devis.' } },
];

function getEnabled() {
  try {
    const stored = localStorage.getItem('site_features');
    return stored ? JSON.parse(stored) : DEFAULT_FEATURES;
  } catch { return DEFAULT_FEATURES; }
}

export default function FeaturesSection() {
  const { lang } = useLang();
  const tf = useT(lang).features;
  const [enabled, setEnabled] = useState(getEnabled);

  // Sync when admin toggles
  useEffect(() => {
    const handler = () => setEnabled(getEnabled());
    window.addEventListener('features_updated', handler);
    return () => window.removeEventListener('features_updated', handler);
  }, []);

  const visible = ALL_FEATURES.filter(f => enabled.includes(f.id));

  if (visible.length === 0) return null;

  return (
    <section
      id="caracteristicas"
      data-testid="features-section"
      className="py-24 md:py-32 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 text-white relative overflow-hidden"
    >
      {/* Grid decoration */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">
            {tf.label}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-4">
            {tf.title}
          </h2>
          <p className="text-base text-sky-200 max-w-xl mx-auto">{tf.sub}</p>
        </motion.div>

        <div
          data-testid="features-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {visible.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                data-testid={`feature-item-${feat.id}`}
                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 hover:border-sky-500/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={18} className="text-sky-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-white">{feat.title[lang] || feat.title.es}</h3>
                    <div className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-sky-200/80 leading-relaxed">{feat.desc[lang] || feat.desc.es}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Export helpers for AdminPanel
export { ALL_FEATURES, DEFAULT_FEATURES };
