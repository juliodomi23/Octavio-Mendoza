import { useState, useEffect } from 'react';
import { Settings, X, Check, Upload, Eye, Plus, Pencil, Trash2, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useLogo } from '../../contexts/LogoContext';

const ADMIN_PASSWORD = 'octavio2026';
const API = process.env.REACT_APP_BACKEND_URL;
const CATEGORIES = ['Para Empresarios', 'Para Fiscalistas', 'PLD', 'Anticorrupción', 'Contabilidad'];

const toSlug = (title) =>
  title.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();

const EMPTY_FORM = {
  title: '', slug: '', category: 'Para Empresarios', excerpt: '',
  content: '', image_url: '', tags: '', read_time: 5, author: 'CP Octavio Mendoza',
};

// ── Logo Section ─────────────────────────────────────────────────────────────
function LogoManager() {
  const { logoUrl, updateLogo } = useLogo();
  const [logoInput, setLogoInput] = useState(logoUrl);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (logoInput.trim()) {
      updateLogo(logoInput.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-2xl">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Logo del sitio</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="text-xs text-slate-500 block mb-1">URL de la imagen del logo</label>
          <input
            type="text"
            placeholder="https://..."
            value={logoInput}
            onChange={(e) => setLogoInput(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-sky-500"
            data-testid="admin-logo-input"
          />
        </div>
        <button
          onClick={handleSave}
          data-testid="admin-save-logo-btn"
          className={`flex items-center gap-2 text-sm px-5 py-2 rounded-lg self-end whitespace-nowrap ${saved ? 'bg-green-600 text-white' : 'bg-sky-600 hover:bg-sky-500 text-white'}`}
        >
          {saved ? <><Check size={14} /> Guardado</> : <><Upload size={14} /> Actualizar Logo</>}
        </button>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Eye size={14} className="text-slate-500" />
        <span className="text-xs text-slate-500">Vista previa:</span>
        <div className="bg-white rounded-lg p-2">
          <img src={logoInput || logoUrl} alt="Logo" className="h-10 w-auto object-contain max-w-32" onError={(e) => { e.target.src = logoUrl; }} />
        </div>
      </div>
    </div>
  );
}

// ── Post Form ─────────────────────────────────────────────────────────────────
function PostForm({ initial, onSave, onCancel, loading, error }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleTitleChange = (v) => {
    set('title', v);
    if (!initial) set('slug', toSlug(v));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.excerpt || !form.content) return;
    onSave({
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      read_time: Number(form.read_time) || 5,
    });
  };

  const inputCls = "w-full bg-slate-800 border border-slate-700 text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-sky-500 placeholder-slate-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="post-form">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-400 block mb-1">Título *</label>
          <input type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)} required placeholder="Título del artículo" className={inputCls} data-testid="post-title" />
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">Slug (URL) *</label>
          <input type="text" value={form.slug} onChange={e => set('slug', e.target.value)} required placeholder="url-del-articulo" className={inputCls} data-testid="post-slug" />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-slate-400 block mb-1">Categoría</label>
          <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls} data-testid="post-category">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">Tiempo de lectura (min)</label>
          <input type="number" min={1} max={30} value={form.read_time} onChange={e => set('read_time', e.target.value)} className={inputCls} data-testid="post-readtime" />
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">Autor</label>
          <input type="text" value={form.author} onChange={e => set('author', e.target.value)} placeholder="CP Octavio Mendoza" className={inputCls} data-testid="post-author" />
        </div>
      </div>

      <div>
        <label className="text-xs text-slate-400 block mb-1">URL de imagen de portada</label>
        <input type="text" value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://..." className={inputCls} data-testid="post-image" />
      </div>

      <div>
        <label className="text-xs text-slate-400 block mb-1">Tags (separados por coma)</label>
        <input type="text" value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="fiscal, SAT, 2026" className={inputCls} data-testid="post-tags" />
      </div>

      <div>
        <label className="text-xs text-slate-400 block mb-1">Resumen / Excerpt *</label>
        <textarea rows={2} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} required placeholder="Descripción breve que aparece en la tarjeta del blog" className={inputCls} data-testid="post-excerpt" />
      </div>

      <div>
        <label className="text-xs text-slate-400 block mb-1">
          Contenido * <span className="text-slate-600 ml-1">— usa ## para títulos, ### para subtítulos, **texto** para negrita</span>
        </label>
        <textarea rows={12} value={form.content} onChange={e => set('content', e.target.value)} required placeholder={`## Título principal\n\nEscribe aquí el cuerpo del artículo...\n\n### Subtítulo\n\nMás contenido...`} className={`${inputCls} font-mono text-xs leading-relaxed`} data-testid="post-content" />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 border border-red-800/50 rounded-lg px-3 py-2">
          <AlertCircle size={14} />{error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          data-testid="post-save-btn"
          className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          {loading ? <><Loader2 size={14} className="animate-spin" /> Guardando...</> : <><Check size={14} /> Guardar artículo</>}
        </button>
        <button type="button" onClick={onCancel} className="flex items-center gap-2 border border-slate-700 text-slate-400 hover:text-white text-sm px-4 py-2.5 rounded-lg transition-colors">
          <X size={14} /> Cancelar
        </button>
      </div>
    </form>
  );
}

// ── Blog Manager ──────────────────────────────────────────────────────────────
function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState('list');
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    let active = true;
    fetch(`${API}/api/blog/posts`)
      .then(r => r.json())
      .then(data => { if (active) { setPosts(Array.isArray(data) ? data : []); setListLoading(false); } })
      .catch(() => { if (active) { setPosts([]); setListLoading(false); } });
    return () => { active = false; };
  }, []);

  const reloadPosts = () => {
    fetch(`${API}/api/blog/posts`)
      .then(r => r.json())
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(() => {});
  };

  const handleCreate = (form) => {
    setLoading(true);
    setError('');
    fetch(`${API}/api/blog/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, admin_password: ADMIN_PASSWORD }),
    })
      .then(r => r.ok ? r.json() : r.json().then(e => Promise.reject(e.detail || 'Error al crear')))
      .then(() => { reloadPosts(); setView('list'); setLoading(false); })
      .catch(err => { setError(typeof err === 'string' ? err : 'Error de conexión'); setLoading(false); });
  };

  const handleUpdate = (form) => {
    setLoading(true);
    setError('');
    fetch(`${API}/api/blog/posts/${editingPost.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, admin_password: ADMIN_PASSWORD }),
    })
      .then(r => r.ok ? r.json() : r.json().then(e => Promise.reject(e.detail || 'Error al actualizar')))
      .then(() => { reloadPosts(); setView('list'); setLoading(false); })
      .catch(err => { setError(typeof err === 'string' ? err : 'Error de conexión'); setLoading(false); });
  };

  const handleDelete = (slug) => {
    setLoading(true);
    fetch(`${API}/api/blog/posts/${slug}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_password: ADMIN_PASSWORD }),
    })
      .then(() => { setDeleteConfirm(null); reloadPosts(); setLoading(false); })
      .catch(() => setLoading(false));
  };

  const startEdit = (post) => {
    setEditingPost({
      ...post,
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '',
    });
    setError('');
    setView('edit');
  };

  const formatDate = (iso) => {
    try { return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return iso; }
  };

  if (view === 'new') {
    return (
      <div>
        <button onClick={() => { setView('list'); setError(''); }} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-5 transition-colors">
          <ArrowLeft size={14} /> Volver a la lista
        </button>
        <h3 className="text-white font-semibold mb-5">Nuevo artículo</h3>
        <PostForm onSave={handleCreate} onCancel={() => setView('list')} loading={loading} error={error} />
      </div>
    );
  }

  if (view === 'edit' && editingPost) {
    return (
      <div>
        <button onClick={() => { setView('list'); setError(''); }} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-5 transition-colors">
          <ArrowLeft size={14} /> Volver a la lista
        </button>
        <h3 className="text-white font-semibold mb-5">Editar: {editingPost.title}</h3>
        <PostForm initial={editingPost} onSave={handleUpdate} onCancel={() => setView('list')} loading={loading} error={error} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-semibold">Artículos del Blog ({posts.length})</h3>
        <button
          onClick={() => { setView('new'); setError(''); }}
          data-testid="new-post-btn"
          className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={14} /> Nuevo artículo
        </button>
      </div>

      {listLoading ? (
        <div className="flex items-center gap-2 text-slate-500 py-4">
          <Loader2 size={16} className="animate-spin" /> Cargando...
        </div>
      ) : posts.length === 0 ? (
        <p className="text-slate-500 text-sm py-4">No hay artículos aún. ¡Crea el primero!</p>
      ) : (
        <div className="space-y-2" data-testid="admin-posts-list">
          {posts.map(post => (
            <div
              key={post.slug}
              data-testid={`admin-post-row-${post.slug}`}
              className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 gap-3"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{post.title}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-sky-400">{post.category}</span>
                  <span className="text-xs text-slate-500">{formatDate(post.created_at)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => startEdit(post)}
                  data-testid={`edit-post-${post.slug}`}
                  className="p-2 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors"
                  title="Editar"
                >
                  <Pencil size={14} />
                </button>
                {deleteConfirm === post.slug ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(post.slug)}
                      disabled={loading}
                      className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white text-xs rounded-lg"
                    >
                      Confirmar
                    </button>
                    <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 text-slate-400 text-xs">
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(post.slug)}
                    data-testid={`delete-post-${post.slug}`}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main AdminPanel ───────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('blog');

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) { setAuthenticated(true); setError(''); }
    else setError('Contraseña incorrecta');
  };

  const handleClose = () => {
    setIsOpen(false);
    setAuthenticated(false);
    setPassword('');
    setError('');
  };

  return (
    <div className="bg-slate-950 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between py-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            data-testid="admin-panel-toggle"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-400 text-xs transition-colors group"
          >
            <Settings size={13} className="group-hover:rotate-45 transition-transform duration-300" />
            Panel de Administración
          </button>
          {isOpen && <button onClick={handleClose} className="text-slate-600 hover:text-slate-400"><X size={14} /></button>}
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-800/40 bg-slate-950/80">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
            {!authenticated ? (
              /* Login */
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 max-w-md">
                <div className="flex-1 w-full">
                  <label className="text-xs text-slate-500 block mb-1">Contraseña de administrador</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-sky-500"
                    data-testid="admin-password-input"
                  />
                  {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
                </div>
                <button onClick={handleLogin} data-testid="admin-login-btn" className="bg-sky-600 hover:bg-sky-500 text-white text-sm px-5 py-2 rounded-lg">
                  Acceder
                </button>
              </div>
            ) : (
              /* Authenticated */
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <p className="text-slate-300 text-sm font-medium">Panel de Administración</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-6 bg-slate-900 p-1 rounded-xl w-fit">
                  {['blog', 'logo'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      data-testid={`admin-tab-${tab}`}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${activeTab === tab ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      {tab === 'blog' ? 'Blog' : 'Logo del sitio'}
                    </button>
                  ))}
                </div>

                {activeTab === 'blog' && <BlogManager />}
                {activeTab === 'logo' && <LogoManager />}

                <p className="text-xs text-slate-600 mt-6">Los cambios se aplican inmediatamente.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
