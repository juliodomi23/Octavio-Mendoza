import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Tag, X, ArrowRight, MessageCircle, BookOpen } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';

const API = process.env.REACT_APP_BACKEND_URL;

const CATEGORY_COLORS = {
  'Para Empresarios': 'bg-blue-50 text-blue-700 border-blue-100',
  'Para Fiscalistas': 'bg-sky-50 text-sky-700 border-sky-100',
  'PLD': 'bg-indigo-50 text-indigo-700 border-indigo-100',
};

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch { return ''; }
}

// Simple markdown-like renderer
function renderContent(content) {
  if (!content) return null;
  const lines = content.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('## '))
      return <h2 key={i} className="text-xl font-bold text-slate-900 mt-7 mb-3">{line.slice(3)}</h2>;
    if (line.startsWith('### '))
      return <h3 key={i} className="text-lg font-semibold text-slate-800 mt-5 mb-2">{line.slice(4)}</h3>;
    if (line.startsWith('**') && line.endsWith('**'))
      return <p key={i} className="font-semibold text-slate-900 my-2">{line.slice(2, -2)}</p>;
    if (line.startsWith('- '))
      return <li key={i} className="text-slate-600 leading-relaxed ml-4 list-disc">{line.slice(2)}</li>;
    if (line.startsWith('---'))
      return <hr key={i} className="my-6 border-slate-200" />;
    if (line.trim() === '')
      return <br key={i} />;
    // Handle inline bold
    const parts = line.split(/\*\*(.*?)\*\*/g);
    if (parts.length > 1) {
      return (
        <p key={i} className="text-slate-600 leading-relaxed my-2">
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="font-semibold text-slate-800">{part}</strong> : part)}
        </p>
      );
    }
    return <p key={i} className="text-slate-600 leading-relaxed my-2">{line}</p>;
  });
}

function BlogModal({ post, onClose }) {
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 md:p-8"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        data-testid="blog-modal"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden my-4"
        >
          {/* Modal Header */}
          {post.image_url && (
            <div className="relative h-52 overflow-hidden">
              <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>
          )}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${CATEGORY_COLORS[post.category] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  {post.category}
                </span>
                {post.tags?.slice(0,2).map(t => (
                  <span key={t} className="text-xs text-slate-400 flex items-center gap-1">
                    <Tag size={10} />{t}
                  </span>
                ))}
              </div>
              <button
                onClick={onClose}
                data-testid="blog-modal-close"
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors flex-shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug mb-4">{post.title}</h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 mb-6 pb-6 border-b border-slate-100">
              <span className="font-medium text-slate-600">{post.author}</span>
              <span>{formatDate(post.created_at)}</span>
              <span className="flex items-center gap-1"><Clock size={12} />{post.read_time} min lectura</span>
            </div>

            <div className="prose max-w-none">
              {renderContent(post.content)}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/529611770435?text=Hola%2C%20le%C3%AD%20el%20art%C3%ADculo%20%22${encodeURIComponent(post.title)}%22%20y%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
              >
                <MessageCircle size={15} />
                Hablar con un asesor
              </a>
              <button onClick={onClose} className="flex items-center justify-center gap-2 border border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">
                Cerrar artículo
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function PostCard({ post, onRead, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-testid={`blog-card-${post.id}`}
      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="h-44 overflow-hidden bg-slate-100">
        {post.image_url ? (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen size={32} className="text-slate-300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${CATEGORY_COLORS[post.category] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
            {post.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock size={10} />{post.read_time} min
          </span>
        </div>

        <h3 className="text-base font-semibold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-sky-700 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3 flex-1">{post.excerpt}</p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">{formatDate(post.created_at)}</span>
          <button
            onClick={() => onRead(post)}
            data-testid={`blog-read-${post.id}`}
            className="flex items-center gap-1.5 text-sky-600 hover:text-sky-700 font-semibold text-sm transition-colors"
          >
            Leer más <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const { lang } = useLang();

  const labels = {
    es: { label: 'Recursos', title: 'Blog', sub: 'Artículos y guías especializadas para empresarios y emprendedores en materia fiscal, contable y de cumplimiento normativo.', all: 'Todos', noResults: 'No hay artículos en esta categoría.' },
    en: { label: 'Resources', title: 'Blog', sub: 'Specialized articles and guides for business owners on fiscal, accounting and compliance topics.', all: 'All', noResults: 'No articles in this category.' },
    fr: { label: 'Ressources', title: 'Blog', sub: 'Articles et guides spécialisés pour les entrepreneurs.', all: 'Tous', noResults: 'Aucun article dans cette catégorie.' },
  };
  const tl = labels[lang] || labels.es;

  useEffect(() => {
    fetch(`${API}/api/blog/posts`)
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['Todos', ...Array.from(new Set(posts.map(p => p.category)))];
  const filtered = activeCategory === 'Todos' ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <section id="blog" data-testid="blog-section" className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="inline-block text-sky-600 text-sm font-semibold tracking-widest uppercase mb-3">{tl.label}</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-4">{tl.title}</h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto">{tl.sub}</p>
        </motion.div>

        {/* Category Tabs */}
        {!loading && categories.length > 1 && (
          <div className="flex items-center gap-2 flex-wrap justify-center mb-10" data-testid="blog-categories">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-testid={`blog-cat-${cat}`}
                className={`text-sm font-medium px-4 py-2 rounded-full border transition-all ${
                  activeCategory === cat
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600 bg-white'
                }`}
              >
                {cat === 'Todos' ? tl.all : cat}
              </button>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44 bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-slate-200 rounded w-1/3" />
                  <div className="h-4 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-slate-500 py-12">{tl.noResults}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" data-testid="blog-grid">
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} onRead={setSelectedPost} index={i} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
          <a
            href="https://wa.me/529611770435?text=Hola%2C%20me%20interesa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios."
            target="_blank"
            rel="noopener noreferrer"
            data-testid="blog-consult-btn"
            className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg text-sm"
          >
            <MessageCircle size={16} />
            Consulta con un experto
          </a>
        </motion.div>
      </div>

      {/* Post Modal */}
      {selectedPost && <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </section>
  );
}
