-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  salary TEXT,
  job_type TEXT NOT NULL,
  easy_apply BOOLEAN DEFAULT false,
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  benefits TEXT[],
  skills TEXT[],
  description TEXT,
  work_mode TEXT,
  experience_level TEXT,
  industry TEXT,
  rating DECIMAL(2,1),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  job_id TEXT NOT NULL,
  resume_url TEXT,
  cover_letter TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending',
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  bio TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  expected_salary INTEGER,
  years_of_experience INTEGER,
  skills TEXT[],
  open_to_work BOOLEAN DEFAULT true,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  job_id TEXT REFERENCES jobs(id) ON DELETE CASCADE,
  application_id TEXT REFERENCES applications(id) ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Jobs table policies (public read access)
CREATE POLICY "Jobs are viewable by everyone" ON jobs
  FOR SELECT USING (true);

-- Applications table policies
CREATE POLICY "Users can view their own applications" ON applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own applications" ON applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications" ON applications
  FOR UPDATE USING (auth.uid() = user_id);

-- Profiles table policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Notifications table policies
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notifications" ON notifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Insert sample job data
INSERT INTO jobs (id, title, company, location, salary_min, salary_max, job_type, easy_apply, benefits, skills, description, work_mode, experience_level, industry, rating) VALUES
('1', 'Senior React Developer', 'Razorpay', 'Bengaluru, Karnataka', 1800000, 3000000, 'Full-time', true, ARRAY['Health insurance', 'Life insurance', 'Cell phone reimbursement'], ARRAY['React', 'TypeScript', 'Node.js'], 'We are looking for an experienced React Developer to join our team and help build amazing fintech solutions.', 'Hybrid', 'Senior', 'Fintech', 4.2),

('2', 'Full Stack Engineer', 'Postman', 'Bangalore, Karnataka', 1500000, 2500000, 'Full-time', true, ARRAY['Health insurance', 'Gym membership', 'Food coupons'], ARRAY['JavaScript', 'Python', 'AWS'], 'Join our engineering team to build amazing API tools that developers love.', 'Remote', 'Mid', 'SaaS', 4.5),

('3', 'Frontend Developer', 'Swiggy', 'Mumbai, Maharashtra', 1200000, 2000000, 'Full-time', false, ARRAY['Health insurance', 'Transport allowance'], ARRAY['React', 'CSS', 'JavaScript'], 'Looking for passionate frontend developers to help revolutionize the food delivery experience.', 'On-site', 'Mid', 'Food Tech', 4.0),

('4', 'Backend Developer', 'Zomato', 'Delhi, NCR', 1000000, 1800000, 'Full-time', true, ARRAY['Health insurance', 'Food allowance'], ARRAY['Python', 'Django', 'PostgreSQL'], 'Backend developer position for our core platform that serves millions of users daily.', 'Hybrid', 'Mid', 'Food Tech', 4.1),

('5', 'DevOps Engineer', 'Flipkart', 'Bangalore, Karnataka', 2000000, 3500000, 'Full-time', false, ARRAY['Health insurance', 'Gym membership', 'Stock options'], ARRAY['Docker', 'Kubernetes', 'AWS', 'Jenkins'], 'DevOps engineer to manage our cloud infrastructure and ensure high availability.', 'Remote', 'Senior', 'E-commerce', 4.3),

('6', 'Mobile App Developer', 'Paytm', 'Noida, Uttar Pradesh', 800000, 1500000, 'Full-time', true, ARRAY['Health insurance', 'Transport allowance'], ARRAY['React Native', 'iOS', 'Android'], 'Mobile app developer for our payment application used by millions of Indians.', 'On-site', 'Mid', 'Fintech', 3.9),

('7', 'Data Scientist', 'Ola', 'Bangalore, Karnataka', 2500000, 4000000, 'Full-time', false, ARRAY['Health insurance', 'Gym membership', 'Learning allowance'], ARRAY['Python', 'Machine Learning', 'SQL'], 'Data scientist to work on our ride optimization algorithms and improve user experience.', 'Hybrid', 'Senior', 'Transportation', 4.4),

('8', 'UI/UX Designer', 'Urban Company', 'Mumbai, Maharashtra', 600000, 1200000, 'Full-time', true, ARRAY['Health insurance', 'Design tools'], ARRAY['Figma', 'Adobe XD', 'Sketch'], 'UI/UX designer for our service platform that connects users with trusted professionals.', 'Remote', 'Mid', 'Services', 4.0),

('9', 'Product Manager', 'Nykaa', 'Mumbai, Maharashtra', 3000000, 5000000, 'Full-time', false, ARRAY['Health insurance', 'Stock options', 'Travel allowance'], ARRAY['Product Strategy', 'Analytics', 'Communication'], 'Product manager for our beauty e-commerce platform serving millions of customers.', 'Hybrid', 'Senior', 'E-commerce', 4.6),

('10', 'QA Engineer', 'Myntra', 'Bangalore, Karnataka', 700000, 1200000, 'Full-time', true, ARRAY['Health insurance', 'Learning allowance'], ARRAY['Selenium', 'Java', 'Test Automation'], 'QA engineer for our fashion e-commerce platform ensuring quality user experience.', 'On-site', 'Mid', 'E-commerce', 3.8),

('11', 'Software Engineer', 'Amazon', 'Hyderabad, Telangana', 1600000, 2800000, 'Full-time', true, ARRAY['Health insurance', 'Stock options', 'Transport'], ARRAY['Java', 'Python', 'AWS'], 'Software engineer for Amazon''s core e-commerce platform serving global customers.', 'Hybrid', 'Mid', 'E-commerce', 4.4),

('12', 'Android Developer', 'PhonePe', 'Bangalore, Karnataka', 1400000, 2400000, 'Full-time', false, ARRAY['Health insurance', 'Gym membership'], ARRAY['Kotlin', 'Java', 'Android SDK'], 'Android developer for India''s leading digital payments app.', 'On-site', 'Mid', 'Fintech', 4.1),

('13', 'Python Developer', 'CRED', 'Bengaluru, Karnataka', 1800000, 3200000, 'Full-time', true, ARRAY['Health insurance', 'Learning budget', 'Flexible hours'], ARRAY['Python', 'Django', 'PostgreSQL'], 'Python developer for our innovative credit card rewards platform.', 'Remote', 'Senior', 'Fintech', 4.7),

('14', 'Web Developer', 'Meesho', 'Bangalore, Karnataka', 900000, 1600000, 'Full-time', true, ARRAY['Health insurance', 'Food coupons'], ARRAY['JavaScript', 'React', 'Node.js'], 'Web developer for our social commerce platform empowering small businesses.', 'Hybrid', 'Mid', 'E-commerce', 3.9),

('15', 'Cloud Engineer', 'Microsoft', 'Hyderabad, Telangana', 2200000, 3800000, 'Full-time', false, ARRAY['Health insurance', 'Stock options', 'Gym'], ARRAY['Azure', 'AWS', 'Docker', 'Kubernetes'], 'Cloud engineer for Microsoft Azure cloud services team.', 'Remote', 'Senior', 'Cloud Services', 4.5);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_jobs_posted_at ON jobs(posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- Create updated_at trigger for jobs
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
