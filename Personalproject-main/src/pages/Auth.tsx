import { useMemo, useState } from 'react';
import { Heart, Sparkles, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { isDemoMode } from '../lib/supabase';

interface AuthProps {
  onNavigate: (page: string) => void;
}

export default function Auth({ onNavigate }: AuthProps) {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const passwordScore = useMemo(() => {
    const p = formData.password;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[a-z]/.test(p)) score++;
    if (/\d/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return Math.min(score, 5);
  }, [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        if (!formData.displayName.trim()) {
          setError('Please enter your name');
          setLoading(false);
          return;
        }
        if (isDemoMode) {
          setIsSignUp(false);
          setInfo('Demo mode: account created locally. Please sign in.');
          setLoading(false);
          return;
        }
        await signUp(formData.email, formData.password, formData.displayName);
        setIsSignUp(false);
        setInfo('Account created successfully! Please sign in.');
        setLoading(false);
        return;
      } else {
        if (isDemoMode) {
          setIsTransitioning(true);
          setTimeout(() => onNavigate('dashboard'), 900);
          return;
        }
        await signIn(formData.email, formData.password);
        setIsTransitioning(true);
        setTimeout(() => onNavigate('dashboard'), 900);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div className="max-w-4xl w-full relative">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="glass-strong rounded-3xl shadow-2xl p-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Heart className="w-16 h-16 text-teal-600 animate-pulse" fill="currentColor" />
              <Sparkles className="w-6 h-6 text-cyan-500 absolute -top-1 -right-1" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            {isSignUp ? 'Join MindEase' : 'Welcome Back'}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {isSignUp
              ? 'Start your journey to better mental health'
              : 'Continue your wellness journey'}
          </p>
          {(error || info) && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              {error && <p className="text-red-700 text-sm text-center">{error}</p>}
              {info && <p className="text-teal-700 text-sm text-center">{info}</p>}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder={isSignUp ? 'Create a password (6+ characters)' : 'Enter your password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                {isSignUp && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-2 w-full bg-gray-100 rounded">
                      <div
                        className={`h-2 rounded ${
                          passwordScore <= 2 ? 'bg-red-400 w-1/4' : passwordScore === 3 ? 'bg-yellow-400 w-2/4' : passwordScore === 4 ? 'bg-green-400 w-3/4' : 'bg-teal-500 w-full'
                        }`}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      {passwordScore <= 2 ? 'Weak' : passwordScore === 3 ? 'Okay' : passwordScore === 4 ? 'Good' : 'Strong'}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                </>
              )}
            </button>
          </form>
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setInfo('');
                setFormData({
                  displayName: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                });
              }}
              className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
          </div>
          <div className="hidden md:block liquid-card p-10 text-gray-800">
            <h3 className="text-2xl font-extrabold mb-4">Your safe space</h3>
            <p className="opacity-80 mb-6">MindEase uses privacy-first design. In demo mode you can explore without creating an account.</p>
            <ul className="space-y-3 text-sm">
              <li>• Guided breathing and grounding tools</li>
              <li>• Private journal with AI reframing</li>
              <li>• Mood tracking and weekly insights</li>
            </ul>
          </div>
        </div>
        {isSignUp && (
          <div className="mt-6 text-center text-sm text-gray-600 bg-white rounded-2xl p-4 shadow-lg">
            <p>By signing up, you agree to our commitment to your privacy and data security.</p>
          </div>
        )}
      </div>

      {isTransitioning && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/70 backdrop-blur-xl animate-fade-in">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-40 h-40 rounded-full bg-teal-400/30 blur-3xl animate-ping" />
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-teal-600 to-cyan-600 shadow-2xl animate-scale-up flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}