import { useState, useEffect } from 'react';
import { BookOpen, Plus, Edit, Trash2, Home, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface JournalProps {
  onNavigate: (page: string) => void;
}

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  created_at: string;
  updated_at: string;
}

const moodOptions = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😢', label: 'Sad', value: 'sad' },
  { emoji: '😰', label: 'Anxious', value: 'anxious' },
  { emoji: '😌', label: 'Calm', value: 'calm' },
  { emoji: '😴', label: 'Tired', value: 'tired' },
  { emoji: '😡', label: 'Angry', value: 'angry' },
  { emoji: '🤗', label: 'Grateful', value: 'grateful' },
  { emoji: '😐', label: 'Neutral', value: 'neutral' }
];

export default function Journal({ onNavigate }: JournalProps) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: 'neutral'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadEntries();
    }
  }, [user]);

  const loadEntries = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setEntries(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.title.trim() || !formData.content.trim()) return;

    if (editingId) {
      const { error } = await supabase
        .from('journal_entries')
        .update({
          title: formData.title.trim(),
          content: formData.content.trim(),
          mood: formData.mood,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingId);

      if (!error) {
        setIsEditing(false);
        setEditingId(null);
        setFormData({ title: '', content: '', mood: 'neutral' });
        loadEntries();
      }
    } else {
      const { error } = await supabase
        .from('journal_entries')
        .insert([
          {
            user_id: user.id,
            title: formData.title.trim(),
            content: formData.content.trim(),
            mood: formData.mood
          }
        ]);

      if (!error) {
        setFormData({ title: '', content: '', mood: 'neutral' });
        setIsEditing(false);
        loadEntries();
      }
    }
  };

  const handleEdit = (entry: JournalEntry) => {
    setFormData({
      title: entry.title,
      content: entry.content,
      mood: entry.mood
    });
    setEditingId(entry.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this journal entry?')) return;

    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id);

    if (!error) {
      loadEntries();
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ title: '', content: '', mood: 'neutral' });
  };

  const getMoodEmoji = (mood: string) => {
    return moodOptions.find(m => m.value === mood)?.emoji || '😐';
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            <BookOpen className="w-10 h-10 mr-3 text-amber-600" />
            Personal Journal
          </h1>
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full mb-8 flex items-center justify-center space-x-3 px-6 py-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <Plus className="w-6 h-6" />
            <span>New Journal Entry</span>
          </button>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? 'Edit Entry' : 'New Entry'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="Give your entry a title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How are you feeling?
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, mood: mood.value })}
                      className={`p-3 rounded-xl text-2xl transition-all ${
                        formData.mood === mood.value
                          ? 'bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg scale-110'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {mood.emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Thoughts
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={12}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                  placeholder="Write about your day, feelings, thoughts..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <Save className="w-5 h-5" />
                  <span>{editingId ? 'Update Entry' : 'Save Entry'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {entries.length === 0 ? (
            <div className="md:col-span-2 text-center py-16 bg-white rounded-3xl shadow-xl">
              <BookOpen className="w-20 h-20 text-amber-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No journal entries yet</p>
              <p className="text-gray-400">Start writing to capture your thoughts and feelings</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{getMoodEmoji(entry.mood)}</span>
                    <h3 className="text-xl font-bold text-gray-900">{entry.title}</h3>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="p-2 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4 line-clamp-4">{entry.content}</p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    {new Date(entry.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {entry.updated_at !== entry.created_at && (
                    <span className="text-xs">Edited</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
