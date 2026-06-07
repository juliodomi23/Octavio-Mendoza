import { useState } from 'react';
import { Settings, X, Check, Upload, Eye } from 'lucide-react';
import { useLogo } from '../../contexts/LogoContext';
import { useLang } from '../../contexts/LanguageContext';
import { useT } from '../../data/translations';
import { ALL_FEATURES, DEFAULT_FEATURES } from './FeaturesSection';

const ADMIN_PASSWORD = 'octavio2026';

function getEnabled() {
  try {
    const stored = localStorage.getItem('site_features');
    return stored ? JSON.parse(stored) : DEFAULT_FEATURES;
  } catch { return DEFAULT_FEATURES; }
}

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [logoInput, setLogoInput] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [enabledFeatures, setEnabledFeatures] = useState(getEnabled);
  const { logoUrl, updateLogo } = useLogo();
  const { lang } = useLang();
  const ta = useT(lang).admin;

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setLogoInput(logoUrl);
      setError('');
    } else {
      setError(ta.wrongPwd);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setAuthenticated(false);
    setPassword('');
    setError('');
  };

  const handleSaveLogo = () => {
    if (logoInput.trim()) {
      updateLogo(logoInput.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  const toggleFeature = (id) => {
    const next = enabledFeatures.includes(id)
      ? enabledFeatures.filter(f => f !== id)
      : [...enabledFeatures, id];
    setEnabledFeatures(next);
    localStorage.setItem('site_features', JSON.stringify(next));
    window.dispatchEvent(new Event('features_updated'));
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
            {ta.panel}
          </button>
          {isOpen && (
            <button onClick={handleClose} className="text-slate-600 hover:text-slate-400 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-800/40 bg-slate-950/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
            {!authenticated ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 max-w-md">
                <div className="flex-1 w-full">
                  <label className="text-xs text-slate-500 block mb-1">{ta.passwordLabel}</label>
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
                  className="bg-sky-600 hover:bg-sky-500 text-white text-sm px-5 py-2 rounded-lg transition-colors"
                >
                  {ta.loginBtn}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <p className="text-slate-300 text-sm font-medium">{ta.title}</p>
                </div>

                {/* Logo Manager */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-2xl">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">{ta.logoSection}</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-slate-500 block mb-1">{ta.logoLabel}</label>
                      <input
                        type="text"
                        placeholder="https://..."
                        value={logoInput}
                        onChange={(e) => setLogoInput(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-sky-500 transition-colors"
                        data-testid="admin-logo-input"
                      />
                    </div>
                    <button
                      onClick={handleSaveLogo}
                      data-testid="admin-save-btn"
                      className={`flex items-center gap-2 text-sm px-5 py-2 rounded-lg transition-all self-end whitespace-nowrap ${saved ? 'bg-green-600 text-white' : 'bg-sky-600 hover:bg-sky-500 text-white'}`}
                    >
                      {saved ? <><Check size={14} /> {ta.saved}</> : <><Upload size={14} /> {ta.saveBtn}</>}
                    </button>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <Eye size={14} className="text-slate-500" />
                    <span className="text-xs text-slate-500">{ta.preview}</span>
                    <div className="bg-white rounded-lg p-2">
                      <img
                        src={logoInput || logoUrl}
                        alt="Vista previa"
                        className="h-10 w-auto object-contain max-w-32"
                        onError={(e) => { e.target.src = logoUrl; }}
                      />
                    </div>
                  </div>
                </div>

                {/* Features Manager */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">
                    {ta.featuresSection}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {ALL_FEATURES.map((feat) => {
                      const Icon = feat.icon;
                      const isActive = enabledFeatures.includes(feat.id);
                      return (
                        <button
                          key={feat.id}
                          onClick={() => toggleFeature(feat.id)}
                          data-testid={`admin-feature-toggle-${feat.id}`}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left text-sm transition-all ${
                            isActive
                              ? 'bg-sky-900/40 border-sky-600/50 text-sky-200'
                              : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-sky-500' : 'bg-slate-700'}`}>
                            {isActive ? <Check size={11} className="text-white" /> : <Icon size={11} className="text-slate-400" />}
                          </div>
                          <span className="text-xs leading-snug">{feat.title.es}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <p className="text-xs text-slate-600">{ta.note}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
