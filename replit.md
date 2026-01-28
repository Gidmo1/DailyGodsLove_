# DailyGodsLove

## Overview

DailyGodsLove is a Christian devotional website built to share daily Bible verses, devotional posts, and spiritual teachings. The platform provides a serene, professional reading experience with features for newsletter subscriptions, contact forms, and an admin dashboard for content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for page transitions and element reveals
- **Build Tool**: Vite with React plugin

The frontend follows a page-based architecture with shared components. Key pages include Home, Devotionals, About, Contact, and an Admin Dashboard. The UI emphasizes a professional, serene aesthetic appropriate for religious content with custom typography (Libre Baskerville serif, Inter sans-serif).

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: REST endpoints defined in shared route definitions with Zod validation
- **Authentication**: Replit Auth integration using OpenID Connect with Passport.js
- **Session Management**: PostgreSQL-backed sessions via connect-pg-simple

The server uses a modular structure with routes registered in `server/routes.ts`, database operations abstracted through a storage layer (`server/storage.ts`), and authentication handled through dedicated Replit integration modules.

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Drizzle Kit for schema management (`drizzle-kit push`)

Database tables include:
- `posts`: Blog/devotional content with title, slug, content, excerpt
- `subscribers`: Newsletter email subscriptions
- `bible_verses`: Daily verses with book, chapter, verse, text, and teaching
- `users` and `sessions`: Replit Auth user management

### Shared Code Pattern
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts`: Drizzle table definitions and Zod schemas
- `routes.ts`: API route definitions with path, method, and response schemas
- `models/auth.ts`: User and session table definitions for Replit Auth

## External Dependencies

### Third-Party Services
- **Formspree**: Contact form submissions (endpoint: `https://formspree.io/f/mvzalwwn`)
- **Replit Auth**: User authentication via OpenID Connect
- **Google Fonts**: Libre Baskerville and Inter font families

### Database
- **PostgreSQL**: Primary database accessed via `DATABASE_URL` environment variable

### Key Libraries
- **UI Components**: Full shadcn/ui component library with Radix UI primitives
- **Image Generation**: html-to-image and downloadjs for shareable devotional cards
- **Date Handling**: date-fns for date formatting
- **Icons**: Lucide React icon library