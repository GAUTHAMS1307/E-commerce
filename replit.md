# Vibe Commerce - E-Commerce Shopping Cart Application

## Overview

Vibe Commerce is a modern e-commerce shopping cart application built with a React frontend and Express backend. The application provides a streamlined shopping experience with product browsing, cart management, and checkout functionality. It follows modern e-commerce design patterns inspired by industry leaders like Shopify, Etsy, and Amazon, emphasizing clean product presentation, frictionless cart interactions, and transparent pricing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling**
- **React 18** with TypeScript for type safety and improved developer experience
- **Vite** as the build tool for fast development and optimized production builds
- **Wouter** for lightweight client-side routing (Home, Checkout, and 404 pages)
- **TanStack Query (React Query)** for server state management, caching, and data fetching

**UI Component Strategy**
- **shadcn/ui** component library based on Radix UI primitives, providing accessible, composable components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **New York** style variant for shadcn components
- Design system with HSL color variables for theme consistency and easy customization

**State Management**
- Server state managed via TanStack Query with automatic caching and refetching
- Local UI state managed with React hooks (useState for cart sidebar visibility, modal states)
- No global state management library needed due to simple application scope

**Key Design Decisions**
- Component-based architecture with clear separation between presentational and container components
- TypeScript interfaces for type safety across product and cart data structures
- Mobile-first responsive design approach with Tailwind breakpoints
- Toast notifications for user feedback on cart actions

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript running on Node.js
- Middleware for JSON parsing, request logging, and static file serving
- RESTful API design pattern for product and cart operations

**API Structure**
```
GET  /api/products          - Fetch all products
GET  /api/products/:id/image - Serve product images
GET  /api/cart              - Get cart items with product details
POST /api/cart              - Add item to cart
PATCH /api/cart/:id         - Update cart item quantity
DELETE /api/cart/:id        - Remove item from cart
DELETE /api/cart            - Clear entire cart
POST /api/checkout          - Process checkout and generate receipt
```

**Data Storage Strategy**
- **In-Memory Storage** (MemStorage class) currently used for development/demo
- Storage abstraction (IStorage interface) allows easy migration to persistent database
- Schema defined with Drizzle ORM ready for PostgreSQL integration
- Product catalog pre-populated with 8 sample products across Electronics, Accessories, Lifestyle, and Home categories

**Schema Design**
- **Products table**: id, name, price, image, category
- **Cart Items table**: id, productId (FK), quantity, createdAt
- Drizzle ORM schema with Zod validation for type-safe data operations

### Data Flow

1. **Product Browsing**: React Query fetches products from `/api/products`, caches results, renders ProductGrid
2. **Add to Cart**: Client sends POST to `/api/cart` with productId and quantity, server validates, stores, returns cart item with product details
3. **Cart Management**: GET `/api/cart` returns denormalized cart items (includes full product info), mutations update/delete items and invalidate cache
4. **Checkout**: POST `/api/checkout` with customer details, server generates order ID, returns receipt, client displays ReceiptModal and clears cart cache

### Build & Deployment

**Development Mode**
- Vite dev server with HMR for frontend at client directory
- tsx for running TypeScript server code directly
- Concurrent frontend and backend development with proxy configuration

**Production Build**
- Frontend: Vite builds optimized bundle to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js` as ESM module
- Static file serving: Express serves built frontend from dist/public
- Single deployment artifact containing both frontend and backend

## External Dependencies

### UI & Styling
- **@radix-ui/** - Accessible component primitives (dialogs, dropdowns, sheets, tooltips, etc.)
- **tailwindcss** - Utility-first CSS framework
- **class-variance-authority** - Type-safe component variants
- **lucide-react** - Icon library

### Forms & Validation
- **react-hook-form** - Form state management
- **@hookform/resolvers** - Form validation resolver
- **zod** - Schema validation
- **drizzle-zod** - Drizzle schema to Zod validation

### Data Fetching
- **@tanstack/react-query** - Server state management and caching

### Database (Configured but not actively used)
- **drizzle-orm** - TypeScript ORM
- **@neondatabase/serverless** - Neon PostgreSQL serverless driver
- **drizzle-kit** - Schema migrations and management
- Database connection configured via `DATABASE_URL` environment variable

### Development Tools
- **@replit/** plugins - Vite runtime error overlay, cartographer, dev banner for Replit environment
- **typescript** - Type checking and compilation
- **vite** - Build tool and dev server
- **esbuild** - Backend bundler for production

### Routing
- **wouter** - Lightweight routing library (< 2KB)

### Assets
- Product images stored in `attached_assets/generated_images/`
- Served dynamically via `/api/products/:id/image` endpoint
- Image paths mapped in server routes configuration