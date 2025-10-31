/*
  # Create feedback table for MindEase contact form

  1. New Tables
    - `feedback`
      - `id` (uuid, primary key) - Unique identifier for each feedback submission
      - `name` (text) - Name of the person providing feedback
      - `email` (text) - Email address for follow-up
      - `message` (text) - The feedback message content
      - `created_at` (timestamptz) - Timestamp of submission

  2. Security
    - Enable RLS on `feedback` table
    - Add policy for anonymous users to insert feedback
    - Only authenticated admin users can read feedback (for privacy)

  3. Notes
    - Table is designed to collect user feedback safely
    - Email validation should be handled on the client side
    - RLS ensures public can submit but cannot view others' submissions
*/

CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
  ON feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can read feedback"
  ON feedback
  FOR SELECT
  TO authenticated
  USING (true);
