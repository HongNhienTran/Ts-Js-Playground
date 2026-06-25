-- 1. Create the profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    xp INTEGER DEFAULT 0 NOT NULL,
    level INTEGER DEFAULT 1 NOT NULL,
    streak INTEGER DEFAULT 0 NOT NULL,
    last_active_date TEXT,
    completed_lessons TEXT[] DEFAULT '{}'::text[] NOT NULL,
    completed_challenges TEXT[] DEFAULT '{}'::text[] NOT NULL,
    unlocked_badges TEXT[] DEFAULT '{}'::text[] NOT NULL,
    lives INTEGER DEFAULT 3 NOT NULL,
    nickname TEXT DEFAULT 'Novice Mage' NOT NULL,
    avatar_id INTEGER DEFAULT 1 NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
CREATE POLICY "Allow users to read their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Allow users to insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow users to update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 4. Create trigger to automatically initialize profile on auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, nickname, avatar_id, xp, level, lives)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'nickname', 'Novice Mage'),
    COALESCE((new.raw_user_meta_data->>'avatar_id')::integer, 1),
    0,
    1,
    3
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
