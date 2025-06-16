# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a production-ready Next.js 14 application built with TypeScript, Tailwind CSS, and shadcn/ui components. The project follows modern React patterns and includes proper SEO configuration, accessibility features, and build optimization.

## Development Commands

- `npm install` - Install dependencies
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

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
└── lib/
    ├── constants.ts    # App constants and configuration
    ├── types.ts        # TypeScript type definitions
    └── utils.ts        # Utility functions including cn() for class merging
```

## Key Technologies

- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS** with custom CSS variables for theming
- **shadcn/ui** components built on Radix UI primitives
- **Lucide React** for icons
- **Class Variance Authority** for component variants

## Component Guidelines

- All UI components use TypeScript with proper prop interfaces
- Components follow shadcn/ui patterns with forwardRef and displayName
- Styling uses Tailwind CSS with the cn() utility for class merging
- Components support dark mode through CSS variables

## Styling System

- Custom CSS variables defined in globals.css for light/dark themes
- Tailwind config extends with shadcn/ui color system
- Use cn() utility from lib/utils.ts for conditional classes

## SEO and Metadata

- Comprehensive metadata configuration in layout.tsx
- OpenGraph and Twitter card support
- Structured robots.txt configuration
- Proper viewport and responsive meta tags