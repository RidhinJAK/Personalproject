import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('feedback')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        ]);

      if (error) throw error;

      try {
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message
          })
        });
      } catch (emailError) {
        console.log('Email notification failed, but feedback saved:', emailError);
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-strong rounded-3xl p-10 md:p-12 shimmer-border shimmer-animated animate-in-up reveal-up">
            <h1 className="text-4xl md:text-6xl font-extrabold italic mb-6 text-slate-900">Get In Touch</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
            We'd love to hear your feedback, questions, or suggestions about MindEase
          </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold italic text-white mb-6">
                Share Your Thoughts
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Your feedback helps us improve MindEase and better support students
                with their mental health needs. Whether you have suggestions, questions,
                or just want to share your experience, we're listening.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-500/20 p-3 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-teal-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      For the Developer
                    </h3>
                    <p className="text-gray-300">
                      This project was created as part of an IB MYP assignment.
                      Your input helps demonstrate real-world impact and user-centered design.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="bg-blue-500/20 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Direct Contact
                    </h3>
                    <p className="text-gray-300 mb-2">
                      For urgent matters or detailed inquiries:
                    </p>
                    <a
                      href="mailto:ridhin.jasti@gmail.com"
                      className="text-teal-300 hover:text-white font-medium"
                    >
                      ridhin.jasti@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl shadow-soft">
              <h3 className="text-2xl font-bold text-white mb-6">
                Send Feedback
              </h3>

              {submitStatus === 'success' && (
                <div className="mb-6 bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-4 flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-emerald-200 font-medium">Thank you for your feedback!</p>
                    <p className="text-emerald-200/80 text-sm mt-1">We appreciate you taking the time to share your thoughts.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 bg-rose-500/10 border border-rose-400/30 rounded-lg p-4">
                  <p className="text-rose-200">
                    Something went wrong. Please try again or email us directly.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                    placeholder="Share your feedback, questions, or suggestions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary btn-glow rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            About This Project
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            MindEase was developed as an IB MYP Personal Project, exploring how technology
            can address the mental health challenges faced by students today.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This project demonstrates the application of research, design thinking, and
            technical skills to create a solution that could make a real difference in
            students' lives.
          </p>
        </div>
      </section>
    </div>
  );
}
