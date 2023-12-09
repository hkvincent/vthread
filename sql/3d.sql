-- Step 1: Drop the combined unique constraint on username and email
-- Note: Replace 'unique_username_email' with the actual name of your combined unique constraint
ALTER TABLE public.users
DROP CONSTRAINT IF EXISTS unique_username_email;

-- Step 2: Recreate the unique constraint on username
ALTER TABLE public.users
ADD CONSTRAINT username_unique_constraint UNIQUE (username);

-- Optional: Drop the email column
-- Caution: This will result in data loss if there is data in the email column
-- ALTER TABLE public.users DROP COLUMN IF EXISTS email;

-- Alter username to be NOT NULL again
ALTER TABLE public.users
ALTER COLUMN username SET NOT NULL;