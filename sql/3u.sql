ALTER TABLE public.users
DROP CONSTRAINT IF EXISTS users_username_key;
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS email CITEXT;
ALTER TABLE public.users
ALTER COLUMN username DROP NOT NULL;
ALTER TABLE public.users
ADD CONSTRAINT unique_username_email UNIQUE (username, email);