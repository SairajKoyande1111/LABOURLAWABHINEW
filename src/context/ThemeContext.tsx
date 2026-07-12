import { createContext, useContext, useEffect } from 'react';

export type Theme = 'blue';

interface ThemeContextValue {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'blue',
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'blue');
    try { localStorage.setItem('mcs-theme', 'blue'); } catch { /* ignore */ }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'blue' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
