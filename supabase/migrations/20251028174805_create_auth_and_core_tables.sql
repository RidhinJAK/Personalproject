/*
  # MindEase Complete Database Schema

  ## Overview
  This migration creates the complete database schema for the MindEase mental health support application,
  including user profiles, mood tracking, journaling, gratitude entries, streaks, achievements, and chat history.

  ## New Tables

  ### 1. user_profiles
  User profile information linked to Supabase auth.users
  - `id` (uuid, primary key, references auth.users)
  - `display_name` (text) - User's display name
  - `created_at` (timestamptz) - Account creation timestamp
  - `last_active` (timestamptz) - Last activity timestamp

  ### 2. mood_entries
  Daily mood tracking entries
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to user_profiles)
  - `mood_level` (integer 1-5) - Numeric mood rating
  - `mood_type` (text) - Type of mood (happy, sad, anxious, etc.)
  - `notes` (text, optional) - Additional notes about the mood
  - `created_at` (timestamptz) - Entry timestamp

  ### 3. journal_entries
  Personal journal entries for reflection
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to user_profiles)
  - `title` (text) - Journal entry title
  - `content` (text) - Journal entry content
  - `mood` (text, optional) - Associated mood
  - `created_at` (timestamptz) - Entry timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. gratitude_entries
  Gratitude journal entries
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to user_profiles)
  - `gratitude_text` (text) - Gratitude entry content
  - `created_at` (timestamptz) - Entry timestamp

  ### 5. user_streaks
  Track user engagement streaks
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to user_profiles)
  - `current_streak` (integer) - Current consecutive days streak
  - `longest_streak` (integer) - Longest ever streak achieved
  - `last_activity_date` (date) - Last activity date
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 6. user_achievements
  Badges and achievements earned by users
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to user_profiles)
  - `badge_name` (text) - Name of the achievement
  - `earned_at` (timestamptz) - When the achievement was earned

  ### 7. chat_messages
  AI chat conversation history
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to user_profiles)
  - `role` (text) - Message role (user or assistant)
  - `content` (text) - Message content
  - `created_at` (timestamptz) - Message timestamp

  ## Security

  ### Row Level Security (RLS)
  All tables have RLS enabled with the following policies:

  #### user_profiles
  - Users can view their own profile
  - Users can update their own profile
  - Users can insert their own profile (during signup)

  #### mood_entries, journal_entries, gratitude_entries, chat_messages
  - Users can view only their own entries
  - Users can insert their own entries
  - Users can update their own entries
  - Users can delete their own entries

  #### user_streaks, user_achievements
  - Users can view their own records
  - Users can insert their own records
  - Users can update their own records

  ## Indexes
  Created for optimal query performance on foreign keys and timestamp fields
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_active timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create mood_entries table
CREATE TABLE IF NOT EXISTS mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  mood_level integer NOT NULL CHECK (mood_level >= 1 AND mood_level <= 5),
  mood_type text NOT NULL,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_entries_created_at ON mood_entries(created_at DESC);

ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own mood entries"
  ON mood_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mood entries"
  ON mood_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mood entries"
  ON mood_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own mood entries"
  ON mood_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create journal_entries table
CREATE TABLE IF NOT EXISTS journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  mood text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_created_at ON journal_entries(created_at DESC);

ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own journal entries"
  ON journal_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own journal entries"
  ON journal_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal entries"
  ON journal_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own journal entries"
  ON journal_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create gratitude_entries table
CREATE TABLE IF NOT EXISTS gratitude_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  gratitude_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gratitude_entries_user_id ON gratitude_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_gratitude_entries_created_at ON gratitude_entries(created_at DESC);

ALTER TABLE gratitude_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own gratitude entries"
  ON gratitude_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own gratitude entries"
  ON gratitude_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own gratitude entries"
  ON gratitude_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own gratitude entries"
  ON gratitude_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create user_streaks table
CREATE TABLE IF NOT EXISTS user_streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_activity_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_user_streaks_user_id ON user_streaks(user_id);

ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own streaks"
  ON user_streaks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streaks"
  ON user_streaks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streaks"
  ON user_streaks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  badge_name text NOT NULL,
  earned_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_earned_at ON user_achievements(earned_at DESC);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON user_achievements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chat messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat messages"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own chat messages"
  ON chat_messages FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);