import { useState } from 'react';
import { Settings, X, Check, Upload, Eye } from 'lucide-react';
import { useLogo } from '../../contexts/LogoContext';

const ADMIN_PASSWORD = 'octavio2026';

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [logoInput, setLogoInput] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const { logoUrl, updateLogo } = useLogo();

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setLogoInput(logoUrl);
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setAuthenticated(false);
    setPassword('');
    setError('');
  };

  const handleSave = () => {
    if (logoInput.trim()) {
      updateLogo(logoInput.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <div className="bg-slate-950 border-t border-slate-800/60">
      {/* Toggle bar */}
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
          {isOpen && (
            <button onClick={handleClose} className="text-slate-600 hover:text-slate-400 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Panel Content */}
      {isOpen && (
        <div className="border-t border-slate-800/40 bg-slate-950/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
            {!authenticated ? (
              /* Password Form */
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 max-w-md">
                <div className="flex-1 w-full">
                  <label className="text-xs text-slate-500 block mb-1">Contraseña de administrador</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-sky-500 transition-colors"
                    data-testid="admin-password-input"
                  />
                  {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
                </div>
                <button
                  onClick={handleLogin}
                  data-testid="admin-login-btn"
                  className="bg-sky-600 hover:bg-sky-500 text-white text-sm px-5 py-2 rounded-lg transition-colors mt-4 sm:mt-4 self-end sm:self-auto"
                >
                  Acceder
                </button>
              </div>
            ) : (
              /* Authenticated - Content Manager */
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <p className="text-slate-300 text-sm font-medium">Administración de Contenido</p>
                </div>

                {/* Logo Manager */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-2xl">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">
                    Logo del sitio
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-slate-500 block mb-1">URL de la imagen del logo</label>
                      <input
                        type="text"
                        placeholder="https://ejemplo.com/logo.png"
                        value={logoInput}
                        onChange={(e) => setLogoInput(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-sky-500 transition-colors"
                        data-testid="admin-logo-input"
                      />
                    </div>
                    <button
                      onClick={handleSave}
                      data-testid="admin-save-btn"
                      className={`flex items-center gap-2 text-sm px-5 py-2 rounded-lg transition-all self-end whitespace-nowrap ${
                        saved
                          ? 'bg-green-600 text-white'
                          : 'bg-sky-600 hover:bg-sky-500 text-white'
                      }`}
                    >
                      {saved ? (
                        <><Check size={14} /> Guardado</>
                      ) : (
                        <><Upload size={14} /> Actualizar Logo</>
                      )}
                    </button>
                  </div>

                  {/* Preview */}
                  <div className="mt-4 flex items-center gap-3">
                    <Eye size={14} className="text-slate-500" />
                    <span className="text-xs text-slate-500">Vista previa:</span>
                    <div className="bg-white rounded-lg p-2">
                      <img
                        src={logoInput || logoUrl}
                        alt="Vista previa del logo"
                        className="h-10 w-auto object-contain max-w-32"
                        onError={(e) => { e.target.src = logoUrl; }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600">
                  Los cambios se aplican inmediatamente en el navegador actual.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
