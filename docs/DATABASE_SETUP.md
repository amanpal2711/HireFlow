# Database Setup

## Environment Variables

Create a `.env.local` file in the project root with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Set Up Tables

Run `database/setup-jobs.sql` in the Supabase SQL editor:

1. Open your Supabase dashboard.
2. Go to SQL Editor.
3. Copy the contents of `database/setup-jobs.sql`.
4. Paste and execute the script.

This creates the required jobs, applications, profiles, and notification tables with row-level security policies.

## Verify Tables

Run this query in Supabase SQL Editor:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('jobs', 'applications', 'profiles', 'notifications');
```

The app includes fallback behavior for database connection failures so the UI can continue rendering with mock data where supported.
