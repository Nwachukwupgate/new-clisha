/**
 * Clisha Experience — Theme context (dark/light)
 */

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { darkTheme, lightTheme } from '../design-system/theme';

const ThemeContext = createContext({ dark: false, theme: lightTheme, toggle: () => {} });

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('clisha-x-theme') !== 'light'; } catch { return true; }
  });

  const theme = dark ? darkTheme : lightTheme;

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      try { localStorage.setItem('clisha-x-theme', next ? 'dark' : 'light'); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ dark, theme, toggle }), [dark, theme, toggle]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useClishaTheme() {
  const ctx = useContext(ThemeContext);
  return ctx.theme || lightTheme;
}

export function useClishaThemeToggle() {
  const ctx = useContext(ThemeContext);
  return { dark: ctx.dark, toggle: ctx.toggle };
}
