/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const STORAGE_KEY = 'kixora-theme';
const ThemeContext = createContext(null);

function getSystemTheme() {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }

  return 'light';
}

export function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  let storedTheme = null;

  try {
    storedTheme = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    storedTheme = null;
  }

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return getSystemTheme();
}

function applyTheme(theme) {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
}

export function initializeTheme() {
  const theme = getInitialTheme();
  applyTheme(theme);
  return theme;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage failures and keep the in-memory theme active.
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((currentTheme) =>
          currentTheme === 'dark' ? 'light' : 'dark'
        ),
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }

  return context;
}
