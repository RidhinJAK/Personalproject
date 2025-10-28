import { Heart, Sparkles, Shield, Users } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Heart className="w-20 h-20 text-teal-600 animate-pulse" fill="currentColor" />
                <Sparkles className="w-8 h-8 text-cyan-500 absolute -top-2 -right-2" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your AI Friend for a
              <span className="block text-teal-600 mt-2">Calmer Mind</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              MindEase is an AI-powered companion designed to support students through stress,
              anxiety, and everyday mental health challenges. You're not alone on this journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full font-semibold text-lg hover:from-teal-700 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Get Started Free</span>
              </button>
              <button
                onClick={() => onNavigate('demo')}
                className="px-8 py-4 bg-white text-teal-600 border-2 border-teal-600 rounded-full font-semibold text-lg hover:bg-teal-50 transition-all"
              >
                Try Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why MindEase?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-teal-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Always There for You</h3>
              <p className="text-gray-700 leading-relaxed">
                Access support anytime, anywhere. Our AI companion is available 24/7 to listen,
                guide, and help you navigate difficult moments.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Safe & Private</h3>
              <p className="text-gray-700 leading-relaxed">
                Your conversations and personal data are completely confidential.
                We prioritize your privacy and create a judgment-free space.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-cyan-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Built for Students</h3>
              <p className="text-gray-700 leading-relaxed">
                Designed specifically for the unique challenges students face - from exam stress
                to social pressures and identity exploration.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Taking care of your mental health matters
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            In a world of academic pressure and constant change, having tools and support
            for your emotional well-being isn't just nice to have - it's essential.
          </p>
          <button
            onClick={() => onNavigate('features')}
            className="px-8 py-4 bg-white text-teal-600 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Explore Features
          </button>
        </div>
      </section>
    </div>
  );
}
