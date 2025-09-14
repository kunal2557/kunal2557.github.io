# SmartPark - Parking Reservation App

## Overview

SmartPark is a comprehensive parking reservation mobile app designed for the Indian market. The application follows an Uber-inspired design philosophy with bilingual support (English/Hindi) and INR pricing. The app serves two primary user types: parking seekers (users) and parking space providers (vendors), with a unified login system that allows role switching after authentication.

The app features a map-first interface for finding parking spots, comprehensive booking flows, and vendor management capabilities for listing and managing parking spaces. The design emphasizes mobile-first responsiveness with clean, functional interfaces optimized for the Indian parking market.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design
- **Styling**: Tailwind CSS with custom design tokens following the "new-york" style
- **State Management**: Component-level state with React hooks, no global state management library
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack React Query for server state management and caching

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript throughout the entire stack
- **API Pattern**: RESTful API design with Express routes
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Development Server**: Hot module replacement with Vite integration

### Database Design
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon serverless with WebSocket constructor for real-time capabilities

### Authentication & Authorization
- **Authentication Flow**: Phone number-based OTP authentication
- **Role Management**: Post-login role selection (User/Vendor/Both) with dynamic dashboard switching
- **Session Management**: Express sessions with connect-pg-simple for PostgreSQL session storage
- **Authorization**: Role-based access control with dynamic UI rendering based on user mode

### Design System
- **Component Library**: Custom components built on Radix UI primitives
- **Color Palette**: Uber-inspired with Indian market adaptations (Deep Blue, Fresh Green, Vibrant Orange)
- **Typography**: Inter font family for bilingual support (English/Hindi)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Theming**: CSS custom properties with light/dark mode support

### Development Architecture
- **Monorepo Structure**: Client, server, and shared code in single repository
- **Path Aliases**: TypeScript path mapping for clean imports (@/, @shared/, @assets/)
- **Build Process**: Separate build pipelines for client (Vite) and server (esbuild)
- **Development Experience**: Replit integration with runtime error overlay and cartographer plugin

## External Dependencies

### Core Runtime Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection for Neon cloud platform
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web application framework for the Node.js backend
- **react**: Frontend user interface library
- **vite**: Build tool and development server
- **@tanstack/react-query**: Server state management and data fetching

### UI and Design Libraries
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx**: Utility for constructing className strings conditionally
- **lucide-react**: Icon library with React components

### Payment Integration
- **@stripe/stripe-js**: Stripe JavaScript SDK for payment processing
- **@stripe/react-stripe-js**: React components for Stripe payment integration

### Development Tools
- **typescript**: Static type checking across the entire application
- **@types/***: Type definitions for various libraries
- **drizzle-kit**: CLI tool for database migrations and introspection
- **@replit/***: Replit-specific development and debugging tools

### Utility Libraries
- **wouter**: Lightweight routing library for React
- **date-fns**: Date manipulation and formatting utilities
- **nanoid**: URL-safe unique string ID generator
- **memoizee**: Function memoization for performance optimization

### Session and Storage
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **ws**: WebSocket client for real-time database connections

The application architecture supports both development and production environments with environment-specific configurations and build optimizations.