
-- Create movies table
CREATE TABLE public.movies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  genre TEXT,
  year INTEGER,
  rating TEXT,
  duration TEXT,
  thumbnail TEXT,
  video_url TEXT,
  featured BOOLEAN DEFAULT false,
  row_category TEXT, -- e.g. 'trending', 'action', 'thriller', 'acclaimed'
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;

-- Movies are publicly readable (anyone can browse the catalog)
CREATE POLICY "Movies are publicly readable"
  ON public.movies
  FOR SELECT
  USING (true);
