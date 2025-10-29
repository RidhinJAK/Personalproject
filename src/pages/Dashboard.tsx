import { useState, useEffect } from 'react';
import { BarChart3, BookOpen, Wind, MessageCircle, LogOut, Sparkles, TrendingUp, Heart, Award, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { checkAndUnlockAchievements } from '../utils/achievements';
import WellnessTip from '../components/WellnessTip';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

interface MoodEntry {
  id: string;
  mood_level: number;
  mood_type: string;
  created_at: string;
}

const moodEmojis = ['😢', '😟', '😐', '😊', '😄'];
const moodTypes = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😢', label: 'Sad', value: 'sad' },
  { emoji: '😰', label: 'Anxious', value: 'anxious' },
  { emoji: '😴', label: 'Tired', value: 'tired' },
  { emoji: '😡', label: 'Angry', value: 'angry' },
  { emoji: '😌', label: 'Calm', value: 'calm' }
];

const motivationalQuotes = [
  "You are stronger than you think.",
  "Every small step counts.",
  "It's okay to not be okay.",
  "You deserve peace and happiness.",
  "Progress, not perfection.",
  "Be gentle with yourself.",
  "You are enough, just as you are.",
  "This too shall pass.",
  "Your mental health matters."
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { user, signOut } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState(3);
  const [selectedType, setSelectedType] = useState('happy');
  const [moodNotes, setMoodNotes] = useState('');
  const [dailyQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [newAchievement, setNewAchievement] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadUserData();
      loadMoodEntries();
      updateStreak();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('user_profiles')
      .select('display_name')
      .eq('id', user.id)
      .maybeSingle();

    if (data) {
      setDisplayName(data.display_name);
    }
    setLoading(false);
  };

  const loadMoodEntries = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(7);

    if (data) {
      setMoodEntries(data);
    }
  };

  const updateStreak = async () => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];

    const { data: streakData } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (streakData) {
      const lastDate = streakData.last_activity_date;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak = streakData.current_streak;

      if (lastDate === yesterdayStr) {
        newStreak += 1;
      } else if (lastDate !== today) {
        newStreak = 1;
      }

      const longest = Math.max(newStreak, streakData.longest_streak);

      await supabase
        .from('user_streaks')
        .update({
          current_streak: newStreak,
          longest_streak: longest,
          last_activity_date: today,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      setStreak(newStreak);
    } else {
      await supabase
        .from('user_streaks')
        .insert([
          {
            user_id: user.id,
            current_streak: 1,
            longest_streak: 1,
            last_activity_date: today
          }
        ]);
      setStreak(1);
    }
  };

  const handleLogMood = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('mood_entries')
      .insert([
        {
          user_id: user.id,
          mood_level: selectedMood,
          mood_type: selectedType,
          notes: moodNotes
        }
      ]);

    if (!error) {
      setMoodNotes('');
      loadMoodEntries();
      updateStreak();
      checkAchievements();
    }
  };

  const checkAchievements = async () => {
    if (!user) return;

    const [moodRes, journalRes, gratitudeRes, streakRes, chatRes] = await Promise.all([
      supabase.from('mood_entries').select('id').eq('user_id', user.id),
      supabase.from('journal_entries').select('id').eq('user_id', user.id),
      supabase.from('gratitude_entries').select('id').eq('user_id', user.id),
      supabase.from('user_streaks').select('*').eq('user_id', user.id).maybeSingle(),
      supabase.from('chat_messages').select('id').eq('user_id', user.id)
    ]);

    const stats = {
      moodLogs: moodRes.data?.length || 0,
      journalEntries: journalRes.data?.length || 0,
      gratitudeEntries: gratitudeRes.data?.length || 0,
      currentStreak: streakRes.data?.current_streak || 0,
      longestStreak: streakRes.data?.longest_streak || 0,
      chatMessages: chatRes.data?.length || 0
    };

    const newAchievements = await checkAndUnlockAchievements(user.id, stats);

    if (newAchievements.length > 0) {
      setNewAchievement(newAchievements[0].badge_name);
      setTimeout(() => setNewAchievement(null), 5000);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  const averageMood = moodEntries.length > 0
    ? Math.round(moodEntries.reduce((sum, entry) => sum + entry.mood_level, 0) / moodEntries.length)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {newAchievement && (
          <div className="fixed top-24 right-6 z-50 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-4 rounded-2xl shadow-2xl animate-bounce">
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8" />
              <div>
                <p className="font-bold text-lg">Achievement Unlocked!</p>
                <p className="text-sm">{newAchievement}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {displayName}!
            </h1>
            <p className="text-gray-600 flex items-center space-x-2">
              <span>How are you feeling today?</span>
              {streak > 0 && (
                <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Sparkles className="w-4 h-4" />
                  <span>{streak} day streak!</span>
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('profile')}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-gray-700 hover:text-gray-900"
            >
              <Settings className="w-5 h-5" />
              <span>Profile</span>
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-gray-700 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <WellnessTip />

        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl shadow-xl p-8 mb-8 relative overflow-hidden">
          <Sparkles className="absolute top-4 right-4 w-8 h-8 text-white opacity-50" />
          <p className="text-white text-2xl font-semibold italic">"{dailyQuote}"</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-7 h-7 mr-3 text-teal-600" />
              Log Your Mood
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  How are you feeling? (1-5)
                </label>
                <div className="flex justify-between items-center gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedMood(level)}
                      className={`flex-1 py-4 rounded-2xl text-4xl transition-all transform hover:scale-110 ${
                        selectedMood === level
                          ? 'bg-gradient-to-r from-teal-600 to-cyan-600 shadow-lg scale-110'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {moodEmojis[level - 1]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  What best describes your mood?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {moodTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value)}
                      className={`p-4 rounded-xl transition-all ${
                        selectedType === type.value
                          ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <div className="text-2xl mb-1">{type.emoji}</div>
                      <div className="text-sm font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="moodNotes" className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  id="moodNotes"
                  value={moodNotes}
                  onChange={(e) => setMoodNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                  placeholder="What's on your mind?"
                />
              </div>

              <button
                onClick={handleLogMood}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Log Mood
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-teal-600" />
                Your Mood Trend
              </h3>
              {moodEntries.length > 0 ? (
                <>
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2">{moodEmojis[averageMood - 1]}</div>
                    <p className="text-gray-600">7-day average</p>
                  </div>
                  <div className="space-y-2">
                    {moodEntries.slice(0, 5).map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </span>
                        <span className="text-2xl">{moodEmojis[entry.mood_level - 1]}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Start logging your mood to see trends!
                </p>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('breathing')}
                  className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl hover:shadow-md transition-all"
                >
                  <Wind className="w-6 h-6 text-cyan-600" />
                  <span className="font-medium text-gray-900">Breathing Exercises</span>
                </button>
                <button
                  onClick={() => onNavigate('journal')}
                  className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all"
                >
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <span className="font-medium text-gray-900">Journal Entry</span>
                </button>
                <button
                  onClick={() => onNavigate('chat')}
                  className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl hover:shadow-md transition-all"
                >
                  <MessageCircle className="w-6 h-6 text-teal-600" />
                  <span className="font-medium text-gray-900">AI Chat</span>
                </button>
                <button
                  onClick={() => onNavigate('gratitude')}
                  className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl hover:shadow-md transition-all"
                >
                  <Heart className="w-6 h-6 text-rose-600" />
                  <span className="font-medium text-gray-900">Gratitude Journal</span>
                </button>
                <button
                  onClick={() => onNavigate('insights')}
                  className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl hover:shadow-md transition-all"
                >
                  <Award className="w-6 h-6 text-violet-600" />
                  <span className="font-medium text-gray-900">Wellness Insights</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
