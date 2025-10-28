import { Target, Lightbulb, TrendingUp, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pt-16">
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            About MindEase
          </h1>
          <p className="text-xl text-gray-700 text-center leading-relaxed">
            A compassionate solution to the growing mental health crisis among students
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
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

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Solution
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Immediate Access</h3>
              <p className="text-gray-700 leading-relaxed">
                MindEase provides instant, 24/7 support through an AI companion that's always
                available when students need someone to talk to.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Evidence-Based</h3>
              <p className="text-gray-700 leading-relaxed">
                Built on proven therapeutic techniques including mindfulness, CBT principles,
                and emotional regulation strategies.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="bg-cyan-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Progress</h3>
              <p className="text-gray-700 leading-relaxed">
                Daily mood tracking helps students understand their emotional patterns and
                identify what affects their well-being.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
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

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The IB MYP Connection</h2>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-xl">
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

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Important Note
          </h2>
          <p className="text-lg opacity-90 leading-relaxed">
            MindEase is a supportive tool designed to complement, not replace, professional
            mental health care. If you're experiencing a crisis or severe mental health issues,
            please reach out to a qualified mental health professional or emergency services.
          </p>
        </div>
      </section>
    </div>
  );
}
