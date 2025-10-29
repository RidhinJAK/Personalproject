import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
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

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    if (user && currentPage === 'home') {
      setCurrentPage('dashboard');
    }
  }, [user]);

  const protectedPages = ['dashboard', 'gratitude', 'insights', 'chat', 'breathing', 'journal', 'profile'];

  const handleNavigate = (page: string) => {
    if (protectedPages.includes(page) && !user) {
      setCurrentPage('auth');
      return;
    }
    setCurrentPage(page);
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
        return user ? <Dashboard onNavigate={handleNavigate} /> : <Auth onNavigate={handleNavigate} />;
      case 'gratitude':
        return user ? <Gratitude onNavigate={handleNavigate} /> : <Auth onNavigate={handleNavigate} />;
      case 'insights':
        return user ? <Insights onNavigate={handleNavigate} /> : <Auth onNavigate={handleNavigate} />;
      case 'chat':
        return user ? <AIChat onNavigate={handleNavigate} /> : <Auth onNavigate={handleNavigate} />;
      case 'breathing':
        return user ? <BreathingExercise onNavigate={handleNavigate} /> : <Auth onNavigate={handleNavigate} />;
      case 'journal':
        return user ? <Journal onNavigate={handleNavigate} /> : <Auth onNavigate={handleNavigate} />;
      case 'profile':
        return user ? <Profile onNavigate={handleNavigate} /> : <Auth onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  const showNavigation = !['dashboard', 'gratitude', 'insights', 'auth', 'chat', 'breathing', 'journal', 'profile'].includes(currentPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavigation && <Navigation currentPage={currentPage} onNavigate={handleNavigate} />}
      <main>
        {renderPage()}
      </main>
      {showNavigation && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
