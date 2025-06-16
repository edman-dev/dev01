# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a production-ready Next.js 14 application built with TypeScript, Tailwind CSS, and shadcn/ui components. The project follows modern React patterns and includes proper SEO configuration, accessibility features, and build optimization.

## Development Commands

### Application
- `npm install` - Install dependencies
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

### Database
- `npm run db:generate` - Generate database migrations with Drizzle Kit
- `npm run db:migrate` - Apply migrations to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Drizzle Studio for database management

## Project Structure

```
src/
├── app/                 # Next.js 14 App Router
│   ├── globals.css     # Tailwind CSS with shadcn/ui variables
│   ├── layout.tsx      # Root layout with metadata and fonts
│   └── page.tsx        # Home page component
├── components/         
│   ├── ui/             # shadcn/ui components (Button, Card, Select, Switch)
│   └── ClientWrapper.tsx # Client-side hydration wrapper
├── db/                  # Database layer
│   ├── schemas/        # Drizzle ORM schemas
│   ├── migrations/     # Database migration files
│   ├── index.ts        # Database connection and exports
│   ├── utils.ts        # Database utility functions
│   └── seed.ts         # Database seeding script
└── lib/
    ├── constants.ts    # App constants and configuration
    ├── types.ts        # TypeScript type definitions
    ├── utils.ts        # Utility functions including cn() for class merging
    ├── ministry-icons.tsx # Ministry icon components
    └── mock-data.ts    # Mock data for development
```

## Key Technologies

### Frontend
- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS** with custom CSS variables for theming
- **shadcn/ui** components built on Radix UI primitives
- **Lucide React** for icons
- **Class Variance Authority** for component variants

### Database
- **PostgreSQL** 13+ for production-ready relational database
- **Drizzle ORM** for type-safe database operations
- **Drizzle Kit** for database migrations and schema management

## Component Guidelines

- All UI components use TypeScript with proper prop interfaces
- Components follow shadcn/ui patterns with forwardRef and displayName
- Styling uses Tailwind CSS with the cn() utility for class merging
- Components support dark mode through CSS variables

## Styling System

- Custom CSS variables defined in globals.css for light/dark themes
- Tailwind config extends with shadcn/ui color system
- Use cn() utility from lib/utils.ts for conditional classes

## Database Setup

### Development Database
1. Install PostgreSQL locally or use Docker
2. Create database: `createdb adoraplan_dev`
3. Copy environment variables: `cp .env.example .env.local`
4. Update DATABASE_URL in .env.local
5. Run migrations: `npm run db:migrate`
6. Seed database: `npm run db:seed`

### Database Management
- Use `npm run db:studio` to open Drizzle Studio for visual database management
- Schema changes should be made in `src/db/schemas/` files
- Generate migrations with `npm run db:generate` after schema changes
- All database utilities are available in `src/db/utils.ts`

### Production Migration
- Database schema is production-ready with proper indexes and constraints
- See `DATABASE.md` for detailed migration and deployment instructions
- Supports PostgreSQL 13+ with connection pooling and SSL

## SEO and Metadata

- Comprehensive metadata configuration in layout.tsx
- OpenGraph and Twitter card support
- Structured robots.txt configuration
- Proper viewport and responsive meta tags