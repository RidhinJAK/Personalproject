import { useState, useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useTheme, ThemeProvider } from './contexts/ThemeContext';
import { isDemoMode } from './lib/supabase';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Demo from './pages/Demo';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Gratitude from './pages/Gratitude';
import Insights from './pages/Insights';
import Auth from './pages/Auth';
import AIChat from './pages/AIChat';
import BreathingExercise from './pages/BreathingExercise';
import Journal from './pages/Journal';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function AppContent() {
  const { user, loading } = useAuth();
  const { showSpotlight, showNoise, enableParallax } = useTheme();
  const [currentPage, setCurrentPage] = useState('home');
  const previousPageRef = useRef<string>('home');
  const [transitionClass, setTransitionClass] = useState('animate-slide-in-right');

  useEffect(() => {
    if ((user || isDemoMode) && currentPage === 'home') {
      setCurrentPage('dashboard');
    }
  }, [user]);

  const protectedPages = ['dashboard', 'gratitude', 'insights', 'chat', 'breathing', 'journal', 'profile'];

  const pageOrder = ['home','about','features','demo','resources','contact','auth','dashboard','gratitude','insights','chat','breathing','journal','profile'];

  const handleNavigate = (page: string) => {
    if (!isDemoMode && protectedPages.includes(page) && !user) {
      setCurrentPage('auth');
      return;
    }
    const prev = previousPageRef.current;
    const fromIdx = pageOrder.indexOf(prev);
    const toIdx = pageOrder.indexOf(page);
    const dirClass = toIdx >= 0 && fromIdx >= 0 && toIdx < fromIdx ? 'animate-slide-in-left' : 'animate-slide-in-right';
    setTransitionClass(dirClass);
    setCurrentPage(page);
    previousPageRef.current = page;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'features':
        return <Features onNavigate={handleNavigate} />;
      case 'demo':
        return <Demo />;
      case 'resources':
        return <Resources />;
      case 'contact':
        return <Contact />;
      case 'auth':
        return <Auth onNavigate={handleNavigate} />;
      case 'dashboard':
        return (user || isDemoMode) ? <Dashboard onNavigate={handleNavigate} /> : <Auth onNavigate={handleNavigate} />;
      case 'gratitude':
        return (user || isDemoMode) ? <Gratitude onNavigate={handleNavigate} /> : <Auth onNavigate={handleNavigate} />;
      case 'insights':
        return (user || isDemoMode) ? <Insights onNavigate={handleNavigate} /> : <Auth onNavigate={handleNavigate} />;
      case 'chat':
        return (user || isDemoMode) ? <AIChat onNavigate={handleNavigate} /> : <Auth onNavigate={handleNavigate} />;
      case 'breathing':
        return (user || isDemoMode) ? <BreathingExercise onNavigate={handleNavigate} /> : <Auth onNavigate={handleNavigate} />;
      case 'journal':
        return (user || isDemoMode) ? <Journal onNavigate={handleNavigate} /> : <Auth onNavigate={handleNavigate} />;
      case 'profile':
        return (user || isDemoMode) ? <Profile onNavigate={handleNavigate} /> : <Auth onNavigate={handleNavigate} />;
      case 'settings':
        return <Settings />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  const showNavigation = !['auth'].includes(currentPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  const compactPages = ['dashboard', 'gratitude', 'insights', 'chat', 'breathing', 'journal', 'profile', 'settings'];

  return (
    <div className="min-h-screen">
      <div className="scroll-progress" />
      {showNoise && <div className="noise-overlay" />}
      {showSpotlight && <div className="cursor-spotlight" />}
      {showNavigation && <Navigation currentPage={currentPage} onNavigate={handleNavigate} variant={compactPages.includes(currentPage) ? 'compact' : 'default'} />}
      <main>
        <div key={currentPage} className={`${transitionClass} with-scale`}>
        {renderPage()}
        </div>
      </main>
      {showNavigation && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MouseFXProvider>
      <AppContent />
        </MouseFXProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

function MouseFXProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = e.clientX + 'px';
      const y = e.clientY + 'px';
      document.documentElement.style.setProperty('--mx', x);
      document.documentElement.style.setProperty('--my', y);
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove as any);
  }, []);

  useEffect(() => {
    // Simple parallax for elements with data-parallax-speed
    const onScroll = () => {
      const scrolled = window.scrollY;
      const doc = document.documentElement;
      const maxScroll = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.min(100, Math.max(0, (scrolled / maxScroll) * 100));
      doc.style.setProperty('--scroll', pct + '%');
      document.querySelectorAll('[data-parallax-speed]')
        .forEach((el) => {
          const element = el as HTMLElement;
          const speed = parseFloat(element.getAttribute('data-parallax-speed') || '0');
          const translate = scrolled * speed;
          element.style.transform = `translate3d(0, ${translate}px, 0)`;
        });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Do not unobserve to allow repeated view animations if needed
        }
      }
    }, { threshold: 0.12 });

    const elements = document.querySelectorAll('.reveal-up');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Magnetic hover for elements with class 'magnetic'
    const strength = 18;
    const handleMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.magnetic') as HTMLElement | null;
      document.querySelectorAll('.magnetic').forEach((el) => {
        const element = el as HTMLElement;
        if (target === element) {
          const rect = element.getBoundingClientRect();
          const relX = e.clientX - rect.left - rect.width / 2;
          const relY = e.clientY - rect.top - rect.height / 2;
          const tx = Math.max(Math.min(relX / 10, strength), -strength);
          const ty = Math.max(Math.min(relY / 10, strength), -strength);
          element.style.transform = `translate(${tx}px, ${ty}px)`;
        } else {
          element.style.transform = '';
        }
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove as any);
  }, []);
  return <>{children}</>;
}
