import { Target, Lightbulb, TrendingUp, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pt-16 relative">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div data-parallax-speed="0.08" className="absolute -top-10 -left-16 w-72 h-72 rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-400/40 blur-3xl animate-blob" />
          <div data-parallax-speed="0.06" className="absolute top-24 -right-10 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-400/30 to-teal-400/30 blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong rounded-3xl p-10 md:p-12 text-center shimmer-border shimmer-animated animate-in-up reveal-up">
            <h1 className="text-4xl md:text-6xl font-extrabold italic mb-4 text-slate-900">About MindEase</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
            A compassionate solution to the growing mental health crisis among students
          </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-10 animate-in-up reveal-up" style={{ animationDelay: '80ms' }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Challenge</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Students today face unprecedented levels of stress and anxiety. From academic
              pressures and social challenges to identity exploration and future uncertainties,
              the mental health burden on young people continues to grow.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              According to research, over 60% of students experience overwhelming anxiety,
              and many don't have immediate access to mental health support when they need it most.
              Traditional counseling services, while valuable, often have long wait times and
              limited availability.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center animate-in-up reveal-up">Our Solution</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="liquid-card p-8 animate-in-up tilt-hover reveal-up" style={{ animationDelay: '40ms' }}>
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Immediate Access</h3>
              <p className="text-gray-700 leading-relaxed">
                MindEase provides instant, 24/7 support through an AI companion that's always
                available when students need someone to talk to.
              </p>
            </div>

            <div className="liquid-card p-8 animate-in-up tilt-hover reveal-up" style={{ animationDelay: '80ms' }}>
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Evidence-Based</h3>
              <p className="text-gray-700 leading-relaxed">
                Built on proven therapeutic techniques including mindfulness, CBT principles,
                and emotional regulation strategies.
              </p>
            </div>

            <div className="liquid-card p-8 animate-in-up tilt-hover reveal-up" style={{ animationDelay: '120ms' }}>
              <div className="bg-cyan-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Progress</h3>
              <p className="text-gray-700 leading-relaxed">
                Daily mood tracking helps students understand their emotional patterns and
                identify what affects their well-being.
              </p>
            </div>

            <div className="liquid-card p-8 animate-in-up tilt-hover reveal-up" style={{ animationDelay: '160ms' }}>
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Educational</h3>
              <p className="text-gray-700 leading-relaxed">
                Empowers students with knowledge about mental health, coping strategies,
                and when to seek additional professional help.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 animate-in-up reveal-up">The IB MYP Connection</h2>
          <div className="glass rounded-3xl p-8 animate-in-up reveal-up" style={{ animationDelay: '60ms' }}>
            <p className="text-gray-700 leading-relaxed mb-4">
              This project was developed as part of the <strong>IB Middle Years Programme (MYP)</strong>,
              exploring the global context of <strong>Identities and Relationships</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The project examines how technology can support emotional well-being and healthy
              identity development during the crucial teenage years. It demonstrates the intersection
              of computer science, psychology, and human-centered design.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Through research, design thinking, and iterative development, MindEase represents
              a practical application of learning that addresses a real-world need in our community.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-dark rounded-3xl p-10 md:p-12 text-white animate-in-up reveal-up" style={{ animationDelay: '120ms' }}>
            <h2 className="text-3xl font-bold mb-4">Important Note</h2>
          <p className="text-lg opacity-90 leading-relaxed">
            MindEase is a supportive tool designed to complement, not replace, professional
            mental health care. If you're experiencing a crisis or severe mental health issues,
            please reach out to a qualified mental health professional or emergency services.
          </p>
          </div>
        </div>
      </section>
    </div>
  );
}
