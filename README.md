# HireFlow

HireFlow is a Next.js job platform using Clerk for auth and Supabase for data.

## Project Structure

```text
.
+-- src/
|   +-- app/        # Next.js route entrypoints only
|   +-- frontend/   # UI routes, components, styles, client state, frontend helpers
|   +-- backend/    # API handlers, middleware, Supabase clients, database types
+-- database/       # SQL setup files
+-- docs/           # Setup notes and project documentation
+-- scripts/        # Local utility and database test scripts
+-- examples/       # Reference or sample projects
+-- public/         # Static assets served by Next.js
```

Next.js still requires route convention files under `src/app`, so those files are intentionally thin wrappers that point to the real frontend or backend modules.

## Getting Started

Install dependencies, then run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Database setup details live in [docs/DATABASE_SETUP.md](docs/DATABASE_SETUP.md).
