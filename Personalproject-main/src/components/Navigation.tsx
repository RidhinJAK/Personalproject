import { useState } from 'react';
import { Menu, X, Heart, Sparkles, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  variant?: 'default' | 'compact';
}

export default function Navigation({ currentPage, onNavigate, variant = 'default' }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'demo', label: 'Try Demo' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact' },
    { id: 'settings', label: 'Settings' }
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const isCompact = variant === 'compact';

  return (
    <nav className="fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass-dark ${isCompact ? 'mt-2 h-12' : 'mt-3 h-14'} flex justify-between items-center px-4 rounded-2xl`}>
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <Heart className={`${isCompact ? 'w-6 h-6' : 'w-8 h-8'} text-teal-400`} fill="currentColor" />
            <span className={`${isCompact ? 'text-lg' : 'text-xl'} font-semibold text-white`}>MindEase</span>
          </div>

          <div className={`hidden md:flex items-center ${isCompact ? 'space-x-5' : 'space-x-8'}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`${isCompact ? 'text-[13px]' : 'text-sm'} font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-teal-300'
                    : 'text-gray-200/80 hover:text-teal-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            {user ? (
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`flex items-center space-x-2 btn-primary btn-glow magnetic ${isCompact ? 'px-4 py-2' : ''}`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleNavClick('auth')}
                  className="flex items-center space-x-2 text-teal-300 font-semibold hover:text-white transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => handleNavClick('auth')}
                  className="flex items-center space-x-2 btn-primary btn-glow magnetic"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>

          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden glass-dark mx-4 mt-2 rounded-2xl p-2">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === item.id
                    ? 'bg-white/10 text-teal-300'
                    : 'text-gray-200/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            {user ? (
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full flex items-center justify-center space-x-2 btn-primary btn-glow mt-2 rounded-xl"
              >
                <Sparkles className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('auth')}
                  className="w-full flex items-center justify-center space-x-2 btn-secondary rounded-xl mt-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => handleNavClick('auth')}
                  className="w-full flex items-center justify-center space-x-2 btn-primary btn-glow rounded-xl"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
