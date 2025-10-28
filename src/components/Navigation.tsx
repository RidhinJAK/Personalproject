import { useState } from 'react';
import { Menu, X, Heart, Sparkles, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'demo', label: 'Try Demo' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <Heart className="w-8 h-8 text-teal-600" fill="currentColor" />
            <span className="text-xl font-semibold text-gray-800">MindEase</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-600 hover:text-teal-600'
                } pb-1`}
              >
                {item.label}
              </button>
            ))}
            {user ? (
              <button
                onClick={() => handleNavClick('dashboard')}
                className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleNavClick('auth')}
                  className="flex items-center space-x-2 px-5 py-2.5 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => handleNavClick('auth')}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
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
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === item.id
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-teal-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            {user ? (
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-md font-medium mt-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('auth')}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-teal-600 border-2 border-teal-600 rounded-md font-medium mt-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => handleNavClick('auth')}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-md font-medium"
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
