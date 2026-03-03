CREATE TABLE IF NOT EXISTS dreams (
  id text PRIMARY KEY,
  title text NOT NULL,
  essence text NOT NULL,
  context text DEFAULT '',
  strength float DEFAULT 0.1,
  stage text DEFAULT 'seed',
  evolution_count int DEFAULT 0,
  last_evolved timestamptz,
  connections jsonb DEFAULT '[]',
  tags jsonb DEFAULT '[]',
  evolution_notes jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  source text DEFAULT 'manual',
  enriched boolean DEFAULT false,
  synced_at timestamptz DEFAULT now()
);

ALTER TABLE dreams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "dreams_public_read" ON dreams
  FOR SELECT USING (true);
