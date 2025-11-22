# Premier Meats

A mordern company website for Premier Meats (It's a demo website). Built with Next.js, TypeScript, and Tailwind CSS.

## Project Overview

Premier Meats is a Next.js 16 application that showcases a comprehensive meat product catalog including beef, pork, chicken, and processed meats. The platform uses MongoDB for product data management and provides a responsive user interface for both desktop and mobile users.

## Technologies Used

- **Frontend Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS 4.1 with CSS Variables
- **UI Components**: React Aria Components with custom shadcn/ui components
- **Database**: MongoDB with Mongoose
- **HTTP Client**: Axios
- **Icons**: Heroicons, Lucide React
- **Animation**: Framer Motion, Motion React
- **Package Manager**: npm.

## Project Structure

```
premier-meats/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   └── (GET)/getproducts/   # Product data endpoints
│   ├── components/               # Reusable React components
│   │   ├── navbar.tsx           # Navigation bar
│   │   ├── footer.tsx           # Footer component
│   │   ├── product_card.tsx     # Individual product card
│   │   ├── display.tsx          # Product display grid
│   │   ├── overlay_card.tsx     # Category overlay cards
│   │   ├── intro.tsx            # Page introduction section
│   │   └── card.tsx             # Generic card component
│   ├── products/                 # Product category pages
│   │   ├── beef/page.tsx        # Beef products page
│   │   ├── pork/page.tsx        # Pork products page
│   │   ├── chicken/page.tsx     # Chicken products page
│   │   └── processed/page.tsx   # Processed meats page
│   ├── about/page.tsx           # About page
│   ├── contact/page.tsx         # Contact and inquiry form
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/ui/                # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── navbar.tsx
│   ├── menu.tsx
│   ├── popover.tsx
│   └── [other components]
├── hooks/                         # Custom React hooks
│   └── use-media-query.ts       # Responsive design hook
├── lib/                          # Utility functions
│   ├── primitive.ts             # Render props utilities
│   └── utils.ts                 # General utilities
├── styles/                       # Global styles
│   └── globals.css              # Tailwind imports and theme
├── public/                       # Static assets
├── components.json              # shadcn/ui configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration
├── next.config.js               # Next.js configuration
├── postcss.config.js            # PostCSS configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database connection

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Perry-Cham/premier-meats-next.git
   cd premier-meats-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the project root:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
   NODE_URL=http://localhost:3000
   ```
  **NOTE**: 
- Make sure you have a valid mongoDB atlas account to obtain a connection string. create one for free at [mongoDB.com](https://mongodb.com)
- NODE_URL refers to the current domain the project is running under. It is used for backend request in the serrver componentd

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Development Setup

### Local Development Environment

The project uses modern development tools to ensure code quality and consistency:

- **TypeScript**: Strict type checking enabled for safer code
- **ESLint**: Code linting with Next.js, React, and TypeScript plugins
- **Prettier**: Code formatting for consistent style
- **Turbopack**: Fast bundling during development

### Available Scripts

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint and fix issues
npm run lint
```

## Coding Standards

### TypeScript

- Strict mode is enabled in `tsconfig.json`
- All new code should use TypeScript with explicit type annotations
- Import paths use the `@/` alias defined in `tsconfig.json`

### Component Organization

- Components are organized by feature in the `app/components/` directory
- UI components use shadcn/ui patterns with React Aria Components
- Props interfaces are defined as `Props` and placed above components

### Styling

- Use Tailwind CSS utility classes for all styling
- CSS variables defined in `styles/globals.css` for theme consistency

### Code Quality

ESLint rules enforce:
- Unused imports detection and removal
- Proper import ordering (type, builtin, external, internal, etc.)
- React best practices and hooks rules
- Accessibility standards (jsx-a11y)

## Deployment Setup

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

### Database Configuration

Ensure your MongoDB connection string is properly set in environment variables:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
```

The application connects to MongoDB using Mongoose. Product collections include: Beef, Pork, Chicken, and Processed.

### Vercel Deployment

The project includes Vercel configuration for seamless deployment:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Vercel will automatically build and deploy on every push

## AUTHENTICATION 
The project uses Authjs with JWT for the authentication of admin users. 

## API

### Get Products by Category

**Endpoint**: `GET /api/getproducts/[category]`

**Parameters**:
- `category` (string): Product category (beef, pork, chicken, processed)

**Response**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "T-Bone Steak",
    "price": 45.99,
    "image": "https://example.com/image.jpg",
    "subcategory": "Steaks"
  }
]
```

**Error Response** (400):
```json
{
  "error": "Invalid product type"
}
```
## POST ROUTES 

**NOTE**: User app privelages are decided by authentication level. All new users start with authentication level 0 meaning that they cannot edit prices and or grant other users elevated privelages. Only the Admin user with authentication level 2 can grant elevated privalages to other users. At least authentication level 1 is required to make changes to the product catalogue.

**/api/createUser**
This route takes in an email, name and password stringbto create a new user with authentication level 0 

**/api/newproduct** 
This route receives is used by users with admin authentication level 1 to create new products of the schema 
```
{
name:string,
price:number,
image:string,
subcategory:string
}
```

**/api/editproduct**
Allows users of authentication level 1 to edit product details within the database

## Key Features

- **Product Catalog**: Browse beef, pork, chicken, and processed meat products
- **Responsive Design**: Fully responsive on desktop, tablet, and mobile devices
- **Contact Form**: Integrated contact form using Web3Forms API
- **Company Information**: About page with business details and management team
- **Modern UI**: Built with React Aria Components for accessibility

