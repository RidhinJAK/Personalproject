import { Heart, Sparkles, Shield, Users } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen">
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6 animate-in-up">
              <div className="glass-dark inline-flex items-center gap-2 px-4 py-2 rounded-full magnetic">
                <Heart className="w-6 h-6 text-teal-300" fill="currentColor" />
                <span className="font-semibold text-white">MindEase</span>
              </div>
            </div>
            <h1 className="heading-giant gradient-animate heading-glow italic animate-in-up">
              Calm. Clarity. Confidence.
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed animate-in-up" style={{ animationDelay: '.05s' as any }}>
              An elegant AI companion for mental well‑being — designed with the polish of world‑class experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in-up" style={{ animationDelay: '.1s' as any }}>
              <button onClick={() => onNavigate('dashboard')} className="btn-primary btn-glow text-lg magnetic">
                <span className="inline-flex items-center gap-2"><Sparkles className="w-5 h-5" /> Get Started</span>
              </button>
              <button onClick={() => onNavigate('demo')} className="btn-secondary text-lg">Try Demo</button>
            </div>
          </div>
        </div>

        {/* Kinetic marquee */}
        <div className="mt-14 marquee-pause">
          <div className="marquee slower text-4xl md:text-6xl font-extrabold tracking-tight text-white/10 uppercase">
            <span className="mx-8">MindEase Studio</span>
            <span className="mx-8">Focus • Breathe • Reflect</span>
            <span className="mx-8">Support • Insights • Growth</span>
            <span className="mx-8">MindEase Studio</span>
            <span className="mx-8">Focus • Breathe • Reflect</span>
            <span className="mx-8">Support • Insights • Growth</span>
          </div>
          <div className="mt-4 marquee reverse faster text-3xl md:text-5xl font-extrabold tracking-tight text-white/10 uppercase">
            <span className="mx-6">Breathe Better</span>
            <span className="mx-6">Track Your Mood</span>
            <span className="mx-6">Reflect Daily</span>
            <span className="mx-6">Breathe Better</span>
            <span className="mx-6">Track Your Mood</span>
            <span className="mx-6">Reflect Daily</span>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center heading-gradient mb-12">
            Why MindEase?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-dark p-8 rounded-3xl hover:shadow-xl transition-all shimmer-border shimmer-animated animate-in-up tilt-hover reveal-up">
              <div className="bg-teal-500/30 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-teal-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Always There for You</h3>
              <p className="text-gray-300 leading-relaxed">
                Access support anytime, anywhere. Our AI companion is available 24/7 to listen,
                guide, and help you navigate difficult moments.
              </p>
            </div>

            <div className="glass-dark p-8 rounded-3xl hover:shadow-xl transition-all shimmer-border shimmer-animated animate-in-up tilt-hover reveal-up" style={{ animationDelay: '.05s' as any }}>
              <div className="bg-blue-500/30 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Safe & Private</h3>
              <p className="text-gray-300 leading-relaxed">
                Your conversations and personal data are completely confidential.
                We prioritize your privacy and create a judgment-free space.
              </p>
            </div>

            <div className="glass-dark p-8 rounded-3xl hover:shadow-xl transition-all shimmer-border shimmer-animated animate-in-up tilt-hover reveal-up" style={{ animationDelay: '.1s' as any }}>
              <div className="bg-cyan-500/30 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-cyan-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Built for Students</h3>
              <p className="text-gray-300 leading-relaxed">
                Designed specifically for the unique challenges students face - from exam stress
                to social pressures and identity exploration.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-dark rounded-3xl p-12 shimmer-border shimmer-animated animate-in-up reveal-up">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 heading-gradient">
            Taking care of your mental health matters
          </h2>
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
            In a world of academic pressure and constant change, having tools and support
              for your emotional well‑being isn't just nice to have — it's essential.
          </p>
            <button onClick={() => onNavigate('features')} className="btn-primary btn-glow text-lg magnetic">
            Explore Features
          </button>
          </div>
        </div>
      </section>
    </div>
  );
}
