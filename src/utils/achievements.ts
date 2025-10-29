import { supabase } from '../lib/supabase';

interface AchievementCriteria {
  badge_name: string;
  description: string;
  check: (stats: UserStats) => boolean;
}

interface UserStats {
  moodLogs: number;
  journalEntries: number;
  gratitudeEntries: number;
  currentStreak: number;
  longestStreak: number;
  chatMessages: number;
}

const ACHIEVEMENTS: AchievementCriteria[] = [
  {
    badge_name: 'First Step',
    description: 'Log your first mood',
    check: (stats) => stats.moodLogs >= 1
  },
  {
    badge_name: 'Consistent Tracker',
    description: 'Log your mood 7 days in a row',
    check: (stats) => stats.currentStreak >= 7
  },
  {
    badge_name: 'Dedicated User',
    description: 'Maintain a 30-day streak',
    check: (stats) => stats.longestStreak >= 30
  },
  {
    badge_name: 'Mood Master',
    description: 'Log 50 mood entries',
    check: (stats) => stats.moodLogs >= 50
  },
  {
    badge_name: 'Reflection Rookie',
    description: 'Write your first journal entry',
    check: (stats) => stats.journalEntries >= 1
  },
  {
    badge_name: 'Thoughtful Writer',
    description: 'Write 10 journal entries',
    check: (stats) => stats.journalEntries >= 10
  },
  {
    badge_name: 'Prolific Journalist',
    description: 'Write 50 journal entries',
    check: (stats) => stats.journalEntries >= 50
  },
  {
    badge_name: 'Grateful Heart',
    description: 'Share your first gratitude',
    check: (stats) => stats.gratitudeEntries >= 1
  },
  {
    badge_name: 'Gratitude Guru',
    description: 'Share 20 gratitudes',
    check: (stats) => stats.gratitudeEntries >= 20
  },
  {
    badge_name: 'Conversation Starter',
    description: 'Have your first AI chat',
    check: (stats) => stats.chatMessages >= 2
  },
  {
    badge_name: 'Active Communicator',
    description: 'Send 50 chat messages',
    check: (stats) => stats.chatMessages >= 50
  },
  {
    badge_name: 'Century Club',
    description: 'Log 100 mood entries',
    check: (stats) => stats.moodLogs >= 100
  },
  {
    badge_name: 'Wellness Warrior',
    description: 'Complete 100 total activities',
    check: (stats) => (stats.moodLogs + stats.journalEntries + stats.gratitudeEntries) >= 100
  },
  {
    badge_name: 'Mindful Explorer',
    description: 'Use all features at least once',
    check: (stats) => stats.moodLogs >= 1 && stats.journalEntries >= 1 && stats.gratitudeEntries >= 1 && stats.chatMessages >= 2
  }
];

export async function checkAndUnlockAchievements(userId: string, stats: UserStats) {
  const { data: currentAchievements } = await supabase
    .from('user_achievements')
    .select('badge_name')
    .eq('user_id', userId);

  const earnedBadges = new Set(currentAchievements?.map(a => a.badge_name) || []);
  const newAchievements = [];

  for (const achievement of ACHIEVEMENTS) {
    if (!earnedBadges.has(achievement.badge_name) && achievement.check(stats)) {
      const { error } = await supabase
        .from('user_achievements')
        .insert([{
          user_id: userId,
          badge_name: achievement.badge_name
        }]);

      if (!error) {
        newAchievements.push(achievement);
      }
    }
  }

  return newAchievements;
}

export { ACHIEVEMENTS };
export type { UserStats, AchievementCriteria };
