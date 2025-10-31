import { MessageCircle, BarChart3, Wind, Sparkles, PenTool, Calendar } from 'lucide-react';

interface FeaturesProps {
  onNavigate: (page: string) => void;
}

export default function Features({ onNavigate }: FeaturesProps) {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI Chat Support',
      description: 'Have meaningful conversations with an empathetic AI companion trained to listen, understand, and provide supportive guidance.',
      color: 'bg-teal-600',
      bgGradient: 'from-teal-50 to-cyan-50',
      details: [
        'Active listening and validation',
        'Personalized coping strategies',
        'Crisis support resources',
        'Available 24/7'
      ]
    },
    {
      icon: BarChart3,
      title: 'Daily Mood Tracker',
      description: 'Log your emotions daily and visualize patterns over time to better understand what affects your mental well-being.',
      color: 'bg-blue-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      details: [
        'Simple daily check-ins',
        'Visual mood trends',
        'Identify triggers',
        'Track progress over time'
      ]
    },
    {
      icon: Wind,
      title: 'Breathing Exercises',
      description: 'Guided breathing techniques to help reduce anxiety, manage stress, and find calm in difficult moments.',
      color: 'bg-cyan-600',
      bgGradient: 'from-cyan-50 to-teal-50',
      details: [
        'Box breathing technique',
        '4-7-8 relaxation method',
        'Visual breathing guides',
        'Audio-guided sessions'
      ]
    },
    {
      icon: Sparkles,
      title: 'Motivational Quotes',
      description: 'Start your day with inspiring messages and reminders that you are capable, valued, and not alone.',
      color: 'bg-indigo-600',
      bgGradient: 'from-indigo-50 to-purple-50',
      details: [
        'Daily inspiration',
        'Curated affirmations',
        'Shareable quotes',
        'Personalized messages'
      ]
    },
    {
      icon: PenTool,
      title: 'Digital Journaling',
      description: 'Express your thoughts and feelings in a private, secure space designed for self-reflection and emotional processing.',
      color: 'bg-emerald-600',
      bgGradient: 'from-emerald-50 to-teal-50',
      details: [
        'Private & encrypted',
        'Guided prompts',
        'Gratitude entries',
        'Reflection tools'
      ]
    },
    {
      icon: Calendar,
      title: 'Wellness Reminders',
      description: 'Receive gentle nudges throughout the day to check in with yourself, practice self-care, and maintain healthy habits.',
      color: 'bg-rose-600',
      bgGradient: 'from-rose-50 to-pink-50',
      details: [
        'Custom reminders',
        'Self-care prompts',
        'Break notifications',
        'Hydration & movement alerts'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-16 relative">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div data-parallax-speed="0.08" className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-gradient-to-br from-teal-400/40 to-cyan-400/40 blur-3xl animate-blob" />
          <div data-parallax-speed="0.06" className="absolute top-24 -right-10 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-400/30 blur-3xl animate-blob animation-delay-2000" />
          <div data-parallax-speed="0.04" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-gradient-to-br from-cyan-400/20 to-teal-400/20 blur-3xl animate-blob animation-delay-4000" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-strong rounded-3xl p-10 md:p-12 shimmer-border shimmer-animated animate-in-up reveal-up">
            <h1 className="text-4xl md:text-6xl font-extrabold italic mb-4 text-slate-900">
            Features That Care
          </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              MindEase blends AI with evidence-based practices to support student well-being
          </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`liquid-card p-8 hover-lift animate-in-up tilt-hover reveal-up`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className={`${feature.color} w-14 h-14 rounded-full flex items-center justify-center mb-6 magnetic`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <span className="text-teal-600 mr-2">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 shadow-soft animate-in-up reveal-up" style={{ animationDelay: '120ms' }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 mr-4">
                  1
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Create Your Space</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Set up your personal account in minutes. Your data is encrypted and completely private.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 mr-4">
                  2
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Start a Conversation</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Talk to your AI companion about what's on your mind. Share as much or as little as you're comfortable with.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-cyan-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 mr-4">
                  3
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Explore Tools</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Use breathing exercises, track your mood, journal your thoughts, and discover what works best for you.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 mr-4">
                  4
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Build Healthy Habits</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Develop a consistent self-care routine with reminders and insights tailored to your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-dark rounded-3xl p-10 md:p-12 text-white relative overflow-hidden animate-in-up reveal-up" style={{ animationDelay: '200ms' }}>
            <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(34,197,94,.5), transparent 40%), radial-gradient(circle at 80% 30%, rgba(56,189,248,.5), transparent 40%)' }} />
            <h2 className="relative text-3xl md:text-4xl font-bold mb-6">Ready to Experience MindEase?</h2>
            <p className="relative text-xl mb-8 opacity-90">
            Try our interactive demo and see how AI can support your mental wellness journey
          </p>
            <button onClick={() => onNavigate('demo')} className="btn-primary btn-glow relative">
            Try the Demo
          </button>
          </div>
        </div>
      </section>
    </div>
  );
}
