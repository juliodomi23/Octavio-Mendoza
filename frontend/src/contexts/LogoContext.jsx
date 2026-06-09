import { createContext, useContext, useState } from 'react';

const DEFAULT_LOGO = '/logo.png';

const LogoContext = createContext();

export function LogoProvider({ children }) {
  const [logoUrl, setLogoUrl] = useState(
    localStorage.getItem('admin_logo_url') || DEFAULT_LOGO
  );

  const updateLogo = (url) => {
    setLogoUrl(url);
    localStorage.setItem('admin_logo_url', url);
  };

  return (
    <LogoContext.Provider value={{ logoUrl, updateLogo }}>
      {children}
    </LogoContext.Provider>
  );
}

export const useLogo = () => useContext(LogoContext);
