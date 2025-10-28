import { Heart, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-teal-600" fill="currentColor" />
            <span className="text-gray-800 font-semibold">MindEase</span>
          </div>

          <p className="text-sm text-gray-600 text-center">
            An IB MYP project focused on student mental health and well-being
          </p>

          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-teal-600 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@mindease.example"
              className="text-gray-600 hover:text-teal-600 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          © 2025 MindEase. Created with care for student mental wellness.
        </div>
      </div>
    </footer>
  );
}
