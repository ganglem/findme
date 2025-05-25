# Find.me Festival Timetable App

This project is a modern web application for managing and viewing a festival timetable, built with Next.js, React, and Supabase. It allows users to:

- View all festival acts by day and stage
- Mark favorite acts and see them in a dedicated section
- View and update their profile
- Track live stage activity (Live Tracker)

## Features

- **Timetable View:**
  - Browse acts by day and stage
  - Filter acts and mark favorites
  - See a personalized list of favorite acts
- **Authentication:**
  - Register with email, password, and username
  - Login with email or username (username resolves to email)
  - Secure authentication via Supabase
- **Profile Management:**
  - Update user profile and avatar
- **Live Tracker:**
  - See which acts are currently playing on each stage

## Tech Stack
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Supabase](https://supabase.com/) (Database & Auth)
- [Tailwind CSS](https://tailwindcss.com/) (UI Styling)
- [Lucide Icons](https://lucide.dev/)

## Project Structure
- `app/` — Next.js app directory (routes, pages, layouts)
- `components/` — Reusable UI and feature components
- `lib/` — TypeScript types, static festival data, and utilities
- `actions/` — Server actions for authentication, favorites, and profile
- `public/` — Static assets

## Development
1. **Install dependencies:**
   ```sh
   pnpm install
   # or
   npm install
   ```
2. **Configure environment:**
   - Copy `.env.example` to `.env.local` and fill in your Supabase credentials.
3. **Run the development server:**
   ```sh
   pnpm dev
   # or
   npm run dev
   ```
4. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000)

## Database
- The app uses Supabase for authentication and as a backend database.
- Festival data (acts, stages, days) can be loaded from static files or Supabase tables.
- User profiles are stored in the `profiles` table, with email and username.

## Customization
- To add or update festival acts, edit `lib/festival-data.ts` or update the Supabase `acts` table.
- UI components are in `components/ui/` and can be customized with Tailwind CSS.

## License
MIT

---

**Find.me** — Your digital festival companion!
