-- Create notifications table
create table if not exists public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null,
  title text not null,
  message text,
  type text default 'info',
  is_read boolean default false,
  link text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.notifications enable row level security;

-- Create policy for users to see their own notifications
create policy "Users see own notifications" 
  on public.notifications for select 
  using (auth.uid()::text = user_id::text);

-- Create policy for users to insert their own notifications
create policy "Users can insert own notifications" 
  on public.notifications for insert 
  with check (auth.uid()::text = user_id::text);

-- Create policy for users to update their own notifications
create policy "Users can update own notifications" 
  on public.notifications for update 
  using (auth.uid()::text = user_id::text);

-- Create profiles table if it doesn't exist
create table if not exists public.profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid unique not null references auth.users(id),
  email text,
  first_name text,
  last_name text,
  phone text,
  location text,
  bio text,
  linkedin_url text,
  github_url text,
  portfolio_url text,
  expected_salary bigint,
  years_of_experience integer,
  skills text[],
  open_to_work boolean default true,
  resume_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Create policies for profiles
create policy "Users can view own profile" 
  on public.profiles for select 
  using (auth.uid() = user_id);

create policy "Users can update own profile" 
  on public.profiles for update 
  using (auth.uid() = user_id);

create policy "Users can insert own profile" 
  on public.profiles for insert 
  with check (auth.uid() = user_id);

-- Create jobs table if it doesn't exist
create table if not exists public.jobs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  company text not null,
  location text not null,
  salary text,
  salary_min bigint,
  salary_max bigint,
  job_type text not null,
  easy_apply boolean default false,
  posted_at timestamptz default now(),
  benefits text[],
  skills text[],
  nice_to_have text[],
  description text,
  company_website text,
  work_mode text,
  experience_level text,
  company_size text,
  industry text,
  rating numeric(2,1),
  applications_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS for jobs
alter table public.jobs enable row level security;

-- Create policies for jobs (everyone can read)
create policy "Jobs are viewable by everyone" 
  on public.jobs for select 
  using (true);

-- Create applications table if it doesn't exist
create table if not exists public.applications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references auth.users(id),
  job_id uuid not null references public.jobs(id),
  company text not null,
  job_title text not null,
  resume_url text,
  cover_letter text,
  phone text,
  status text default 'Applied',
  applied_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS for applications
alter table public.applications enable row level security;

-- Create policies for applications
create policy "Users can view own applications" 
  on public.applications for select 
  using (auth.uid() = user_id);

create policy "Users can insert own applications" 
  on public.applications for insert 
  with check (auth.uid() = user_id);

create policy "Users can update own applications" 
  on public.applications for update 
  using (auth.uid() = user_id);

-- Create function to increment applications count
create or replace function increment_applications_count(job_id uuid)
returns void as $$
begin
  update public.jobs 
  set applications_count = applications_count + 1,
      updated_at = now()
  where id = job_id;
end;
$$ language plpgsql security definer;

-- Create storage bucket for documents
insert into storage.buckets (id, name, public)
values ('documents', 'documents', true)
on conflict (id) do nothing;

-- Create policy for storage
create policy "Users can upload their own documents"
  on storage.objects for insert
  with check (
    bucket_id = 'documents' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can view their own documents"
  on storage.objects for select
  using (
    bucket_id = 'documents' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Sample job data
insert into public.jobs (title, company, location, salary_min, salary_max, job_type, easy_apply, benefits, skills, description, work_mode, experience_level, industry, rating) values
('Senior React Developer', 'Razorpay', 'Bengaluru, Karnataka', 1800000, 3000000, 'Full-time', true, ARRAY['Health insurance', 'Life insurance', 'Cell phone reimbursement'], ARRAY['React', 'TypeScript', 'Node.js'], 'We are looking for an experienced React Developer to join our team...', 'Hybrid', 'Senior', 'Fintech', 4.2),
('Full Stack Engineer', 'Postman', 'Bangalore, Karnataka', 1500000, 2500000, 'Full-time', true, ARRAY['Health insurance', 'Gym membership', 'Food coupons'], ARRAY['JavaScript', 'Python', 'AWS'], 'Join our engineering team to build amazing API tools...', 'Remote', 'Mid', 'SaaS', 4.5),
('Frontend Developer', 'Swiggy', 'Mumbai, Maharashtra', 1200000, 2000000, 'Full-time', false, ARRAY['Health insurance', 'Transport allowance'], ARRAY['React', 'CSS', 'JavaScript'], 'Looking for passionate frontend developers...', 'On-site', 'Mid', 'Food Tech', 4.0),
('Backend Engineer', 'Zomato', 'Delhi, NCR', 1400000, 2200000, 'Full-time', true, ARRAY['Health insurance', 'Meal allowance'], ARRAY['Python', 'Django', 'PostgreSQL'], 'Build scalable backend systems...', 'Hybrid', 'Mid', 'Food Tech', 3.8),
('DevOps Engineer', 'Flipkart', 'Bengaluru, Karnataka', 1600000, 2800000, 'Full-time', false, ARRAY['Health insurance', 'Stock options'], ARRAY['Docker', 'Kubernetes', 'AWS'], 'Help us build and maintain our infrastructure...', 'On-site', 'Senior', 'E-commerce', 4.1);

-- Sample notifications (replace USER_ID_HERE with actual user ID)
-- These should be added after user registration
-- insert into public.notifications (user_id, title, message, type, link) values
-- ('USER_ID_HERE', 'New job match!', 'Senior React Developer at Razorpay matches your profile', 'job_match', '/jobs'),
-- ('USER_ID_HERE', 'Application viewed', 'Postman viewed your application for Full Stack Engineer', 'application', '/candidate/applications'),
-- ('USER_ID_HERE', 'Job alert', '5 new Frontend jobs in Bengaluru this week', 'alert', '/jobs?search=frontend');
