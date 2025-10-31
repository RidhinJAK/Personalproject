import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type ThemeName = 'light' | 'dark' | 'ocean' | 'sunset' | 'neon';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  darkMode: boolean;
  toggleDark: () => void;
  reduceMotion: boolean;
  setReduceMotion: (v: boolean) => void;
  showSpotlight: boolean;
  setShowSpotlight: (v: boolean) => void;
  showNoise: boolean;
  setShowNoise: (v: boolean) => void;
  enableParallax: boolean;
  setEnableParallax: (v: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'mindease_theme_v1';
const MOTION_KEY = 'mindease_reduce_motion_v1';
const SPOT_KEY = 'mindease_spotlight_v1';
const NOISE_KEY = 'mindease_noise_v1';
const PARA_KEY = 'mindease_parallax_v1';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => (localStorage.getItem(THEME_KEY) as ThemeName) || 'dark');
  const [reduceMotion, setReduceMotionState] = useState<boolean>(() => localStorage.getItem(MOTION_KEY) === '1');
  const [showSpotlight, setShowSpotlightState] = useState<boolean>(() => localStorage.getItem(SPOT_KEY) !== '0');
  const [showNoise, setShowNoiseState] = useState<boolean>(() => localStorage.getItem(NOISE_KEY) !== '0');
  const [enableParallax, setEnableParallaxState] = useState<boolean>(() => localStorage.getItem(PARA_KEY) !== '0');

  const darkMode = useMemo(() => theme === 'dark' || theme === 'neon', [theme]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    const root = document.documentElement;
    root.classList.remove('theme-light','theme-dark','theme-ocean','theme-sunset','theme-neon');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(MOTION_KEY, reduceMotion ? '1' : '0');
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [reduceMotion]);

  useEffect(() => { localStorage.setItem(SPOT_KEY, showSpotlight ? '1' : '0'); }, [showSpotlight]);
  useEffect(() => { localStorage.setItem(NOISE_KEY, showNoise ? '1' : '0'); }, [showNoise]);
  useEffect(() => { localStorage.setItem(PARA_KEY, enableParallax ? '1' : '0'); }, [enableParallax]);

  const setTheme = (t: ThemeName) => setThemeState(t);
  const toggleDark = () => setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  const setReduceMotion = (v: boolean) => setReduceMotionState(v);
  const setShowSpotlight = (v: boolean) => setShowSpotlightState(v);
  const setShowNoise = (v: boolean) => setShowNoiseState(v);
  const setEnableParallax = (v: boolean) => setEnableParallaxState(v);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, darkMode, toggleDark, reduceMotion, setReduceMotion, showSpotlight, setShowSpotlight, showNoise, setShowNoise, enableParallax, setEnableParallax }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}


