-- Create commands table
CREATE TABLE public.commands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  command_id text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  content text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.commands ENABLE ROW LEVEL SECURITY;

-- Create policies - Allow everyone to view commands
CREATE POLICY "Anyone can view commands"
  ON public.commands
  FOR SELECT
  USING (true);

-- Allow anyone to insert commands (can add approval system later)
CREATE POLICY "Anyone can insert commands"
  ON public.commands
  FOR INSERT
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_commands_updated_at
  BEFORE UPDATE ON public.commands
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_commands_category ON public.commands(category);
CREATE INDEX idx_commands_tags ON public.commands USING GIN(tags);
CREATE INDEX idx_commands_created_at ON public.commands(created_at DESC);