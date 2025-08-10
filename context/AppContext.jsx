import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext(null);
export function useApp(){ return useContext(AppContext); }

export default function AppProvider({ children }){
  const [profile, setProfile] = useState('Samuel'); // default
  const [quiet, setQuiet] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('tq_settings');
    if (raw) {
      const s = JSON.parse(raw);
      if (s.profile) setProfile(s.profile);
      if (typeof s.quiet === 'boolean') setQuiet(s.quiet);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tq_settings', JSON.stringify({ profile, quiet }));
  }, [profile, quiet]);

  const value = { profile, setProfile, quiet, setQuiet };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
