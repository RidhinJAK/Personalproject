import { useState, useEffect } from 'react';
import { TrendingUp, Award, Calendar, Flame, Home, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import MoodChart from '../components/MoodChart';

interface InsightsProps {
  onNavigate: (page: string) => void;
}

interface MoodData {
  date: string;
  mood_level: number;
  mood_type: string;
}

interface Achievement {
  badge_name: string;
  earned_at: string;
}

export default function Insights({ onNavigate }: InsightsProps) {
  const { user } = useAuth();
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [streak, setStreak] = useState({ current: 0, longest: 0 });
  const [stats, setStats] = useState({
    totalMoodLogs: 0,
    totalJournals: 0,
    totalGratitude: 0,
    avgMood: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAllData();
    }
  }, [user]);

  const loadAllData = async () => {
    if (!user) return;

    const [moodRes, journalRes, gratitudeRes, streakRes, achievementsRes] = await Promise.all([
      supabase
        .from('mood_entries')
        .select('created_at, mood_level, mood_type')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(30),
      supabase
        .from('journal_entries')
        .select('id')
        .eq('user_id', user.id),
      supabase
        .from('gratitude_entries')
        .select('id')
        .eq('user_id', user.id),
      supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle(),
      supabase
        .from('user_achievements')
        .select('badge_name, earned_at')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false })
    ]);

    if (moodRes.data) {
      const formattedData = moodRes.data.map(item => ({
        date: new Date(item.created_at).toISOString().split('T')[0],
        mood_level: item.mood_level,
        mood_type: item.mood_type
      }));
      setMoodData(formattedData);

      const avgMood = moodRes.data.length > 0
        ? moodRes.data.reduce((sum, item) => sum + item.mood_level, 0) / moodRes.data.length
        : 0;

      setStats({
        totalMoodLogs: moodRes.data.length,
        totalJournals: journalRes.data?.length || 0,
        totalGratitude: gratitudeRes.data?.length || 0,
        avgMood: Number(avgMood.toFixed(1))
      });
    }

    if (streakRes.data) {
      setStreak({
        current: streakRes.data.current_streak,
        longest: streakRes.data.longest_streak
      });
    }

    if (achievementsRes.data) {
      setAchievements(achievementsRes.data);
    }

    setLoading(false);
  };

  const moodEmojis = ['😢', '😟', '😐', '😊', '😄'];

  const getMoodColor = (level: number) => {
    const colors = ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-green-500', 'text-teal-500'];
    return colors[level - 1] || 'text-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            <TrendingUp className="w-10 h-10 mr-3 text-violet-600" />
            Your Wellness Insights
          </h1>
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <Flame className="w-10 h-10 mb-4 opacity-80" />
            <div className="text-5xl font-bold mb-2">{streak.current}</div>
            <div className="text-lg opacity-90">Day Streak</div>
            <div className="text-sm opacity-75 mt-2">Best: {streak.longest} days</div>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <Heart className="w-10 h-10 mb-4 opacity-80" />
            <div className="text-5xl font-bold mb-2">{stats.avgMood}</div>
            <div className="text-lg opacity-90">Average Mood</div>
            <div className="text-sm opacity-75 mt-2">Out of 5.0</div>
          </div>

          <div className="bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-3xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <Calendar className="w-10 h-10 mb-4 opacity-80" />
            <div className="text-5xl font-bold mb-2">{stats.totalMoodLogs}</div>
            <div className="text-lg opacity-90">Mood Logs</div>
            <div className="text-sm opacity-75 mt-2">Total entries</div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <Award className="w-10 h-10 mb-4 opacity-80" />
            <div className="text-5xl font-bold mb-2">{achievements.length}</div>
            <div className="text-lg opacity-90">Badges Earned</div>
            <div className="text-sm opacity-75 mt-2">Keep going!</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-7 h-7 mr-3 text-violet-600" />
            Your Mood Journey
          </h2>
          <MoodChart data={moodData.map(m => ({ date: m.date, mood_level: m.mood_level }))} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="w-7 h-7 mr-3 text-violet-600" />
              Recent Mood Entries
            </h2>
            <div className="space-y-3">
              {moodData.slice(0, 10).map((data, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl hover:shadow-md transition-all">
                  <span className="text-sm font-medium text-gray-700">
                    {new Date(data.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-500 capitalize">{data.mood_type}</span>
                    <span className={`text-3xl ${getMoodColor(data.mood_level)}`}>
                      {moodEmojis[data.mood_level - 1]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-7 h-7 mr-3 text-violet-600" />
                Your Achievements
              </h2>
              {achievements.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border-2 border-yellow-200 hover:scale-105 transition-all"
                    >
                      <Award className="w-10 h-10 text-yellow-600 mb-2" />
                      <span className="text-sm font-semibold text-gray-900 text-center">
                        {achievement.badge_name}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        {new Date(achievement.earned_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No badges earned yet</p>
                  <p className="text-sm text-gray-400 mt-2">Keep using the app to unlock achievements!</p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Journal Entries</span>
                  <span className="text-2xl font-bold">{stats.totalJournals}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Gratitude Posts</span>
                  <span className="text-2xl font-bold">{stats.totalGratitude}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Days Active</span>
                  <span className="text-2xl font-bold">{moodData.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
