import { useTheme } from '../contexts/ThemeContext';
import { ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';

export default function Settings() {
  const { theme, setTheme, darkMode, toggleDark, reduceMotion, setReduceMotion, showNoise, setShowNoise, showSpotlight, setShowSpotlight, enableParallax, setEnableParallax } = useTheme();

  const themes: Array<{ id: any; label: string; desc: string }> = [
    { id: 'light', label: 'Light', desc: 'Crisp whites, subtle color blooms' },
    { id: 'dark', label: 'Dark', desc: 'Deep blacks, cool cyan accents' },
    { id: 'ocean', label: 'Ocean', desc: 'Teal + blue gradients' },
    { id: 'sunset', label: 'Sunset', desc: 'Warm orange + magenta glows' },
    { id: 'neon', label: 'Neon', desc: 'High-contrast cyber glow' }
  ];

  return (
    <div className="min-h-screen pt-16">
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong rounded-3xl p-8 shimmer-border animate-in-up">
            <h1 className="text-4xl md:text-5xl font-extrabold italic mb-4 text-slate-900">Settings</h1>
            <p className="text-gray-700">Customize themes, motion, and preferences.</p>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="liquid-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Appearance</h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-300">Toggle dark vs light</p>
              </div>
              <button onClick={toggleDark} className="glass rounded-full px-4 py-2 hover-lift">
                {darkMode ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
              </button>
            </div>

            <div className="mt-6">
              <p className="font-medium mb-2">Theme Presets</p>
              <div className="grid grid-cols-2 gap-3">
                {themes.map(t => (
                  <button key={t.id} onClick={() => setTheme(t.id)} className={`glass rounded-2xl p-4 text-left hover-lift ${theme === t.id ? 'ring-2 ring-teal-400' : ''}`}>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-teal-300" />
                      <span className="font-semibold">{t.label}</span>
                    </div>
                    <p className="text-sm text-gray-700">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="liquid-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Accessibility</h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium">Reduce Motion</p>
                <p className="text-sm text-gray-300">Minimize animations and parallax</p>
              </div>
              <button onClick={() => setReduceMotion(!reduceMotion)} className="glass rounded-full px-4 py-2 hover-lift">
                {reduceMotion ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium">Spotlight Cursor</p>
                <p className="text-sm text-gray-300">Enable cursor halo effect</p>
              </div>
              <button onClick={() => setShowSpotlight(!showSpotlight)} className="glass rounded-full px-4 py-2 hover-lift">
                {showSpotlight ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium">Background Noise</p>
                <p className="text-sm text-gray-300">Subtle texture overlay</p>
              </div>
              <button onClick={() => setShowNoise(!showNoise)} className="glass rounded-full px-4 py-2 hover-lift">
                {showNoise ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Parallax Effects</p>
                <p className="text-sm text-gray-300">Scroll-based depth for blobs</p>
              </div>
              <button onClick={() => setEnableParallax(!enableParallax)} className="glass rounded-full px-4 py-2 hover-lift">
                {enableParallax ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


