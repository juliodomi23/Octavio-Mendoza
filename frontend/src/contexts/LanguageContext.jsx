import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
];

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('site_lang') || 'es');

  const changeLang = (code) => {
    setLang(code);
    localStorage.setItem('site_lang', code);
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
