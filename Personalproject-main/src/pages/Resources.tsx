import { Phone, MessageSquare, Heart, BookOpen, ExternalLink, Globe } from 'lucide-react';

export default function Resources() {
  const emergencyResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      contact: '988',
      description: '24/7 free and confidential support for people in distress',
      icon: Phone
    },
    {
      name: 'Crisis Text Line',
      contact: 'Text HOME to 741741',
      description: 'Free, 24/7 crisis support via text message',
      icon: MessageSquare
    },
    {
      name: 'International Association for Suicide Prevention',
      contact: 'iasp.info/resources',
      description: 'Find crisis centers worldwide',
      icon: Globe
    }
  ];

  const supportResources = [
    {
      title: 'Mental Health America',
      description: 'Comprehensive mental health information and screening tools',
      url: 'https://www.mhanational.org',
      category: 'General Support'
    },
    {
      title: 'NAMI (National Alliance on Mental Illness)',
      description: 'Education, support groups, and advocacy for mental health',
      url: 'https://www.nami.org',
      category: 'General Support'
    },
    {
      title: 'Teen Line',
      description: 'Teens helping teens through difficult times',
      url: 'https://teenlineonline.org',
      category: 'Teen-Specific'
    },
    {
      title: 'The Jed Foundation',
      description: 'Emotional health and suicide prevention for teens and young adults',
      url: 'https://www.jedfoundation.org',
      category: 'Teen-Specific'
    },
    {
      title: 'Anxiety and Depression Association',
      description: 'Resources and support for anxiety and depression',
      url: 'https://adaa.org',
      category: 'Specific Conditions'
    },
    {
      title: 'Active Minds',
      description: 'Student mental health awareness and education',
      url: 'https://www.activeminds.org',
      category: 'Student Support'
    }
  ];

  const selfCareArticles = [
    {
      title: 'Understanding Stress and How to Manage It',
      description: 'Learn about stress responses and evidence-based coping strategies',
      icon: BookOpen
    },
    {
      title: 'Building Healthy Study Habits',
      description: 'Balance academic success with mental wellness',
      icon: BookOpen
    },
    {
      title: 'The Importance of Sleep for Students',
      description: 'How quality rest impacts mood, focus, and overall health',
      icon: BookOpen
    },
    {
      title: 'Mindfulness and Meditation for Beginners',
      description: 'Simple practices to cultivate present-moment awareness',
      icon: BookOpen
    },
    {
      title: 'Building Supportive Friendships',
      description: 'Creating meaningful connections and healthy boundaries',
      icon: BookOpen
    },
    {
      title: 'When to Seek Professional Help',
      description: 'Recognizing signs that you might benefit from therapy',
      icon: BookOpen
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div data-parallax-speed="0.06" className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div data-parallax-speed="0.04" className="absolute top-10 -right-16 w-80 h-80 rounded-full bg-indigo-400/20 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-strong rounded-3xl p-10 md:p-12 shimmer-border shimmer-animated animate-in-up reveal-up">
            <h1 className="text-4xl md:text-6xl font-extrabold italic mb-4 text-slate-900">Mental Health Resources</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              You don't have to face challenges alone. Here are trusted resources for immediate help and ongoing support.
          </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 animate-in-up reveal-up">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-rose-300 mr-3" />
            <h2 className="text-3xl font-bold text-white">Crisis Support</h2>
          </div>
          <p className="text-center text-gray-300 mb-8 text-lg">
            If you're in crisis or experiencing thoughts of self-harm, please reach out immediately:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {emergencyResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div key={index} className="glass-dark p-6 rounded-2xl shimmer-border shimmer-animated animate-in-up reveal-up" style={{ animationDelay: `${index * 60}ms` }}>
                  <div className="bg-rose-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-rose-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {resource.name}
                  </h3>
                  <p className="text-2xl font-bold text-rose-300 mb-3">
                    {resource.contact}
                  </p>
                  <p className="text-sm text-gray-300">
                    {resource.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 animate-in-up reveal-up" style={{ animationDelay: '80ms' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold italic text-white mb-8 text-center">
            Support Organizations
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {supportResources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-dark rounded-2xl p-6 hover-lift reveal-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/10 text-teal-200 text-xs font-semibold rounded-full mb-2">
                      {resource.category}
                    </span>
                    <h3 className="text-xl font-semibold text-white">
                      {resource.title}
                    </h3>
                  </div>
                  <ExternalLink className="w-5 h-5 text-teal-300 flex-shrink-0 ml-2" />
                </div>
                <p className="text-gray-300 text-sm">
                  {resource.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 animate-in-up reveal-up" style={{ animationDelay: '120ms' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold italic text-white mb-8 text-center">
            Self-Care & Wellness Guides
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selfCareArticles.map((article, index) => {
              const Icon = article.icon;
              return (
                <div
                  key={index}
                  className="glass p-6 rounded-2xl shadow-soft hover-lift reveal-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {article.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 animate-in-up reveal-up" style={{ animationDelay: '160ms' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold italic mb-4 text-white">Remember</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Seeking help is a sign of strength, not weakness. Mental health challenges
              are real, common, and treatable.
            </p>
          </div>
          <div className="glass-dark rounded-2xl p-6">
            <ul className="space-y-3 text-lg text-white">
              <li className="flex items-start">
                <span className="text-cyan-300 mr-3">•</span>
                <span>You are not alone in what you're experiencing</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-300 mr-3">•</span>
                <span>Recovery and healing are possible</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-300 mr-3">•</span>
                <span>Professional help can make a real difference</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-300 mr-3">•</span>
                <span>Taking care of your mental health is just as important as physical health</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
