# Vibe Commerce - E-Commerce Shopping Cart Application

A modern, full-stack shopping cart application built for the Vibe Commerce screening. Features a React frontend with an intuitive shopping experience, Express backend with REST APIs, and comprehensive cart management functionality.

![Vibe Commerce](https://img.shields.io/badge/status-production%20ready-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![Node](https://img.shields.io/badge/Node-20-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🌟 Features

### Core Functionality
- **Product Browsing**: Beautiful product grid displaying 8 premium products across Electronics, Accessories, Lifestyle, and Home categories
- **Shopping Cart**: Full-featured cart with add/remove items, quantity management, and real-time total calculations
- **Checkout Process**: Streamlined checkout form with customer information capture
- **Order Confirmation**: Professional receipt modal with order details and timestamp
- **Responsive Design**: Mobile-first approach ensuring perfect display on all devices

### Technical Highlights
- **Database Integration**: In-memory storage with full CRUD operations (easily upgradable to PostgreSQL)
- **Type Safety**: End-to-end TypeScript implementation with proper schema validation
- **Error Handling**: Comprehensive error handling on both frontend and backend
- **State Management**: React Query for efficient data fetching and cache management
- **REST API**: Clean, well-documented API endpoints following best practices

## 🚀 Quick Start

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd vibe-commerce

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5000`

## 📁 Project Structure

```
vibe-commerce/
├── client/                          # Frontend application
│   ├── src/
│   │   ├── components/             # Reusable React components
│   │   │   ├── ui/                # Shadcn UI components
│   │   │   ├── Header.tsx         # Site header with cart badge
│   │   │   ├── ProductCard.tsx    # Individual product display
│   │   │   ├── ProductGrid.tsx    # Product listing grid
│   │   │   ├── CartItem.tsx       # Cart item with quantity controls
│   │   │   ├── CartSidebar.tsx    # Slide-in cart panel
│   │   │   ├── CheckoutForm.tsx   # Checkout form and summary
│   │   │   ├── ReceiptModal.tsx   # Order confirmation modal
│   │   │   └── EmptyCart.tsx      # Empty cart state
│   │   ├── pages/                 # Route pages
│   │   │   ├── Home.tsx           # Product browsing page
│   │   │   ├── Checkout.tsx       # Checkout page
│   │   │   └── not-found.tsx      # 404 page
│   │   ├── lib/                   # Utilities
│   │   │   └── queryClient.ts     # React Query configuration
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── App.tsx                # Root component with routing
│   │   ├── main.tsx               # Application entry point
│   │   └── index.css              # Global styles and theme
│   └── index.html                 # HTML template
├── server/                         # Backend application
│   ├── routes.ts                  # API route handlers
│   ├── storage.ts                 # Data storage interface and implementation
│   └── index.ts                   # Express server setup
├── shared/                         # Shared code between frontend and backend
│   └── schema.ts                  # Database schema and types
├── attached_assets/               # Product images
│   └── generated_images/          # AI-generated product photos
├── package.json                   # Project dependencies
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## 🔌 API Documentation

### Products

#### Get All Products
```
GET /api/products
```
Returns an array of all available products.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "price": 89.99,
    "image": "/api/products/1/image",
    "category": "Electronics"
  }
]
```

#### Get Product Image
```
GET /api/products/:id/image
```
Serves the product image file.

### Cart

#### Get Cart Items
```
GET /api/cart
```
Returns cart items with enriched product details.

**Response:**
```json
[
  {
    "id": 1,
    "productId": 1,
    "quantity": 2,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "product": {
      "id": 1,
      "name": "Wireless Headphones",
      "price": 89.99,
      "image": "/api/products/1/image",
      "category": "Electronics"
    }
  }
]
```

#### Add to Cart
```
POST /api/cart
Content-Type: application/json

{
  "productId": 1,
  "quantity": 1
}
```

**Response:** 201 Created with enriched cart item

#### Update Cart Item Quantity
```
PATCH /api/cart/:id
Content-Type: application/json

{
  "quantity": 3
}
```

**Response:** 200 OK with updated cart item

#### Remove from Cart
```
DELETE /api/cart/:id
```

**Response:** 204 No Content

### Checkout

#### Process Checkout
```
POST /api/checkout
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "orderId": "ORD-1234567890",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "total": 309.97,
  "items": [...],
  "customerName": "John Doe",
  "customerEmail": "john@example.com"
}
```

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern UI library with hooks
- **TypeScript**: Type-safe development
- **Wouter**: Lightweight routing (< 2KB)
- **TanStack Query (React Query)**: Server state management and caching
- **Shadcn UI**: Beautiful, accessible component library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Vite**: Lightning-fast build tool

### Backend
- **Node.js 20**: JavaScript runtime
- **Express**: Web application framework
- **TypeScript**: Type-safe server code
- **Zod**: Schema validation
- **Drizzle ORM**: Type-safe database toolkit (ready for PostgreSQL migration)

### Development Tools
- **tsx**: TypeScript execution for development
- **ESBuild**: Fast JavaScript bundler
- **PostCSS**: CSS transformation
- **Autoprefixer**: Automatic vendor prefixing

## 🧪 Testing

The application has been thoroughly tested with end-to-end Playwright tests covering:

- ✅ Product browsing and display
- ✅ Adding items to cart
- ✅ Cart badge updates
- ✅ Quantity increase/decrease
- ✅ Item removal from cart
- ✅ Cart sidebar functionality
- ✅ Checkout process
- ✅ Order confirmation
- ✅ Cart clearing after checkout

All tests passed successfully with comprehensive verification of UI elements, user interactions, and data flow.

## 💾 Database

Currently uses **in-memory storage** for development and demonstration purposes. The architecture is designed for easy migration to PostgreSQL:

### Schema
```typescript
// Products table
{
  id: integer (primary key)
  name: text
  price: real
  image: text
  category: text
}

// Cart Items table
{
  id: integer (primary key, auto-increment)
  productId: integer (foreign key to products)
  quantity: integer
  createdAt: timestamp
}
```

### Upgrading to PostgreSQL
The application uses Drizzle ORM with schema definitions ready for PostgreSQL. To upgrade:

1. Set up PostgreSQL database
2. Update database connection in `drizzle.config.ts`
3. Run migrations with `npm run db:push`
4. Replace MemStorage with database storage implementation

## 🎨 Design System

The application follows modern e-commerce design principles:

- **Color Scheme**: Clean, professional palette with high contrast
- **Typography**: Inter font family for optimal readability
- **Spacing**: Consistent spacing scale (4, 6, 8, 12, 16px)
- **Components**: Reusable Shadcn UI components with consistent styling
- **Responsive**: Mobile-first approach with breakpoints at 768px and 1024px
- **Interactions**: Hover effects, loading states, and smooth transitions

## 🔐 Error Handling

Comprehensive error handling implemented:

- **Frontend**: Try-catch blocks with user-friendly error messages via toast notifications
- **Backend**: Validation errors, 404 handling, and 500 error responses
- **Type Safety**: Zod validation for all API requests
- **Network**: Proper HTTP status codes and error responses

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (1 column grid)
- **Tablet**: 768px - 1024px (2-3 column grid)
- **Desktop**: > 1024px (4 column grid)

## 🚢 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

The production build:
- Compiles TypeScript to JavaScript
- Bundles frontend with Vite
- Optimizes assets and images
- Minifies code for performance

## 📝 Future Enhancements

- [ ] User authentication and multiple cart support
- [ ] PostgreSQL database integration
- [ ] Product search and filtering
- [ ] Category-based navigation
- [ ] Order history tracking
- [ ] Payment gateway integration (Stripe)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Inventory management
- [ ] Admin dashboard

## 👥 Contributing

This is a screening project for Vibe Commerce. For production use, please contact the repository owner.

## 📄 License

This project is created for the Vibe Commerce technical screening.

## 📧 Contact

For questions about this implementation, please reach out through the screening process.

---

**Built with ❤️ for Vibe Commerce**
