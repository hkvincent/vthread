create table if not exists public.comments (
  id bigserial primary key,
  content text not null,
  post_id bigint not null references public.posts (id),
  user_id bigint not null references public.users (id),
  parent_id bigint references public.comments (id),
  created_at timestamp default now(),
  updated_at timestamp default now()
);
