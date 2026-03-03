CREATE TABLE IF NOT EXISTS spawn_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  display_name text,
  description text,
  type text NOT NULL,
  category text DEFAULT 'apps',
  priority text DEFAULT 'medium',
  initial_goals jsonb DEFAULT '[]',
  constraints jsonb DEFAULT '[]',
  status text DEFAULT 'pending',
  result jsonb,
  error_message text,
  created_at timestamptz DEFAULT now(),
  started_at timestamptz,
  completed_at timestamptz
);

ALTER TABLE spawn_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_requests" ON spawn_requests
  FOR ALL USING (auth.uid() = user_id);
