# Overview

JoinTheRide (اركب معنا) is an Islamic companion mobile/web application designed to support spiritual growth and community engagement. Named after Prophet Noah's call to his son during the flood, the app invites users to join the journey of Islamic learning and spiritual growth. The app provides features for Quran reading progress tracking, daily hadith study, prayer direction (Qibla) finding, social connections with friends, and progress visualization through activity heatmaps. Built as a full-stack Progressive Web App with a focus on mobile-first design, it combines traditional Islamic practices with modern technology to create a comprehensive spiritual companion.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Islamic-themed color palette (emerald, gold, navy, cream, sage)
- **State Management**: React Query (TanStack Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Theme Support**: Custom theme provider with light/dark mode toggle

## Backend Architecture
- **Server**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API with structured route handlers
- **Development Setup**: Vite integration for hot module replacement in development
- **Error Handling**: Centralized error middleware with structured error responses
- **Logging**: Custom request/response logging middleware for API routes

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Design**: Relational database with tables for users, quran_progress, hadith_progress, friendships, messages, and user_activity
- **Migrations**: Drizzle Kit for database schema migrations
- **Development Storage**: In-memory storage implementation for development/testing

## Authentication and Authorization
- **Authentication Provider**: Firebase Authentication with phone number verification
- **Session Management**: Firebase handles authentication state
- **User Management**: Custom user profiles stored in PostgreSQL linked to Firebase UIDs

## External Dependencies
- **Database Hosting**: Neon Database (serverless PostgreSQL)
- **Authentication**: Firebase Authentication and Firestore
- **UI Components**: Radix UI primitives for accessible component foundation
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Google Fonts (Amiri for Arabic text, Inter for Latin text)
- **Development Tools**: Replit integration with cartographer and runtime error modal plugins

## Design Patterns
- **Component Architecture**: Modular React components with clear separation of concerns
- **API Layer**: Service layer pattern with storage interface abstraction
- **Type Safety**: Comprehensive TypeScript coverage with Zod schemas for runtime validation
- **Responsive Design**: Mobile-first approach with adaptive layouts for desktop
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with React

## Key Features Implementation
- **Quran Reading**: Progress tracking by Surah, Ayah, and Hizb with reading interface
- **Hadith Study**: Daily hadith with read/unread tracking and social engagement features
- **Prayer Support**: Qibla direction finder using geolocation API
- **Social Features**: Friend connections, activity feeds, and messaging system
- **Progress Visualization**: GitHub-style activity heatmap for spiritual engagement tracking
- **Onboarding**: Phone-based authentication with user profile setup