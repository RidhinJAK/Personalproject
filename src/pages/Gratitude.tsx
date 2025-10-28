import { useState, useEffect } from 'react';
import { Heart, Plus, Trash2, Home, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface GratitudeProps {
  onNavigate: (page: string) => void;
}

interface GratitudeEntry {
  id: string;
  gratitude_text: string;
  created_at: string;
}

const gratitudePrompts = [
  "What made you smile today?",
  "Who are you thankful for and why?",
  "What's something good that happened this week?",
  "Name a small thing that brings you joy",
  "What's a challenge you overcame recently?",
  "What's something about yourself you appreciate?",
  "What's a place that makes you feel peaceful?",
  "Who has helped you recently?",
  "What's a skill or talent you're grateful to have?",
  "What's something in nature that you find beautiful?"
];

export default function Gratitude({ onNavigate }: GratitudeProps) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [currentPrompt] = useState(gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadEntries();
    }
  }, [user]);

  const loadEntries = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('gratitude_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setEntries(data);
    }
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!user || !newEntry.trim()) return;

    const { error } = await supabase
      .from('gratitude_entries')
      .insert([
        {
          user_id: user.id,
          gratitude_text: newEntry.trim()
        }
      ]);

    if (!error) {
      setNewEntry('');
      loadEntries();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this gratitude entry?')) return;

    const { error } = await supabase
      .from('gratitude_entries')
      .delete()
      .eq('id', id);

    if (!error) {
      loadEntries();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            <Heart className="w-10 h-10 mr-3 text-rose-600" fill="currentColor" />
            Gratitude Journal
          </h1>
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
        </div>

        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
          <Sparkles className="absolute top-4 right-4 w-12 h-12 opacity-30 animate-pulse" />
          <Sparkles className="absolute bottom-4 left-4 w-8 h-8 opacity-20 animate-pulse" />
          <h2 className="text-2xl font-bold mb-3">Today's Prompt</h2>
          <p className="text-xl italic opacity-95">"{currentPrompt}"</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What are you grateful for?</h2>
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Express your gratitude..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none mb-4"
          />
          <button
            onClick={handleAdd}
            disabled={!newEntry.trim()}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-semibold hover:from-rose-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <Plus className="w-5 h-5" />
            <span>Add Gratitude</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {entries.length === 0 ? (
            <div className="md:col-span-2 text-center py-16">
              <Heart className="w-20 h-20 text-pink-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No gratitude entries yet</p>
              <p className="text-gray-400">Start expressing what you're thankful for</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-2 border-pink-100 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <Heart className="w-6 h-6 text-rose-500 flex-shrink-0" fill="currentColor" />
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-800 leading-relaxed mb-4">{entry.gratitude_text}</p>
                <p className="text-sm text-gray-500">
                  {new Date(entry.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="mt-12 bg-white rounded-3xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Practice Gratitude?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-rose-100 to-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Boosts Happiness</h4>
              <p className="text-sm text-gray-600">Regular gratitude practice increases positive emotions and overall life satisfaction</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-pink-100 to-fuchsia-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Reduces Stress</h4>
              <p className="text-sm text-gray-600">Focusing on positive aspects helps manage stress and anxiety levels</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-fuchsia-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-fuchsia-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Better Sleep</h4>
              <p className="text-sm text-gray-600">Gratitude journaling before bed promotes better sleep quality</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
