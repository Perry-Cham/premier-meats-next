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
- **State**: Zustand

## Project structure

Top-level layout (matching the workspace):

```
.
├── .env.local
├── .git/
├── .next/
├── app/
├── components/
│   └── ui/                 # shadcn/ui reusable UI primitives
├── hooks/
├── lib/
├── models/
├── public/
├── stores/
├── styles/
├── types/
├── components.json
├── eslint.config.mjs
├── next.config.js
├── postcss.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md

```

app/ (app-router) — important pages & API routes

```
app/
├── layout.tsx
├── page.tsx
├── (AUTHENTICATION)/
│   ├── signin/page.tsx
│   └── signup/page.tsx
├── about/page.tsx
├── contact/page.tsx
├── admin/
│   ├── page.tsx
│   └── [category]/page.tsx
├── products/
│   ├── beef/page.tsx
│   ├── chicken/page.tsx
│   ├── pork/page.tsx
│   └── processed/page.tsx
├── components/
│   ├── admin/
│   │   ├── AdminProductsClient.tsx
│   │   ├── AdminProductModal.tsx
│   │   └── AdminProductCard.tsx
│   ├── card.tsx
│   ├── display.tsx
│   ├── footer.tsx
│   ├── intro.tsx
│   ├── navbar.tsx
│   ├── overlay_card.tsx
│   ├── product_card.tsx
│   ├── product_display.tsx
│   └── sign_in_card.tsx
└── api/
   ├── (GET)/
   │   └── getproducts/[name]/route.ts
   ├── (POST)/
   │   ├── createUser/route.ts
   │   └── newproduct/route.ts
   ├── (PATCH)/
   │   └── editproduct/route.ts
   ├── (DELETE)/
   │   └── deleteproduct/[category]/[id]/route.ts
   └── auth/
      └── [...nextauth]/route.ts

```

Other key folders

```
components/ui/              # shared UI primitives (shadcn)
hooks/                      # custom hooks (use-media-query.ts)
lib/                        # utilities & db connection (db.ts, utils.ts)
models/                     # mongoose models (product-models.ts, user-model.ts)
public/                     # static assets
stores/                     # client stores (navStore.tsx)
styles/                     # global stylesheet (globals.css)
types/                      # project types
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
   # ImageKit (required for product image uploads)
   IMAGEKIT_PUBLIC_KEY=your_public_key
   IMAGEKIT_PRIVATE_KEY=your_private_key
   IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
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
## Breakdown of Environment Variables
MONGO_URI               : Your mongodb atlas uri, can be replaced with other database as needed but will require you to rewrite the api rutes
NODE_URL                : The domain of the website, used by axios in server components since it requires absolute paths 
**Example Usage**
``
axios.post(`${process.env.NODE_URL}/editproduct`, data)
``
IMAGEKIT_PUBLIC_KEY     : Required for Imagekit SDK, used to upload and delete images
IMAGEKIT_PRIVATE_KEY    : Required for Imagekit SDK, used to upload and delete images
IMAGEKIT_URL_ENDPOINT   : Required for Imagekit SDK, used to upload and delete images
ENVIRONMENT             : Specifies whether the project is running in a production environment, used for logging items to the console
NEXTAUTH_SECRET         : Used by next-auth to sign jwt tokens, required in production

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

### How image uploads work

- `POST /api/newproduct` expects multipart/form-data and requires an `imageFile` field for new products.
- The server uploads the file to ImageKit under `/product images/[category]` and stores the returned URL in the product document.
- `PUT /api/editproduct` accepts multipart/form-data and will upload a provided `imageFile` and update the product image URL if you send one.

### Manual test checklist (admin flows)

1. Start dev server with ImageKit env vars set and a working MongoDB connection.
2. Open the admin view for a category (e.g., `/admin/beef`).
3. Create a new product using the "Create new product" modal and supply an image file. Verify the image uploads and appears under ImageKit in `/product images/<category>`.
4. Edit an existing product and change the name/price/subcategory — save and verify the database record updates and the UI refreshes.
5. Edit a product and upload a new image file — verify ImageKit receives the file and the DB image URL updates.
6. Delete a product (from the card or the edit modal) — verify the DB record is removed and the UI refreshes.

## Admin API / admin panel endpoints (overview)

The admin UI uses three server endpoints to manage products. All endpoints for modifying products expect an admin-level user 

1) POST /api/newproduct — create new product
   - Request type: multipart/form-data
   - Required fields (form data):
      - category (beef|chicken|pork|processed)
      - name (string)
      - price (number)
      - subcategory (string)
      - imageFile (file) — image file is required for creating new products
   - Behavior: server uploads imageFile to ImageKit under the folder `/Product Images/<category>` and saves the returned image URL into the product document before inserting into the database.
  

2) PUT /api/editproduct — edit existing product
   - Request type: multipart/form-data
   - Expected fields (form data):
      - id (string) — product _id
      - category (string)
      - name (string)
      - price (number)
      - subcategory (string)
      - image (string) — optional image URL (if you want to keep an existing URL)
      - imageFile (file) — optional file to upload which replaces the image
   - Behavior: if an imageFile is included, the server uploads it to ImageKit under `/product images/<category>` and replaces the stored image URL for that product. Non-empty fields will be updated for the product.
  

3) DELETE /api/deleteproduct/:category/:id — delete product
   - Request type: HTTP DELETE
   - Path params:
      - category (beef|chicken|pork|processed)
      - id — product _id
   - Behavior: deletes the product from the matching collection. If the product had an uploaded image the API will attempt to remove the file from ImageKit (it uses the stored file id). Any ImageKit deletion failures are logged and the product delete will still proceed.


Notes & recommendations
- Use folder names without spaces for predictable paths (we currently use `/product images/<category>`). Using kebab-case `/product-images/<category>` is recommended to avoid accidental encoding issues.
- The server expects form-data for both new and edit operations so forms can pass files and textual fields together.


## Key Features

- **Product Catalog**: Browse beef, pork, chicken, and processed meat products
- **Responsive Design**: Fully responsive on desktop, tablet, and mobile devices
- **Contact Form**: Integrated contact form using Web3Forms API
- **Company Information**: About page with business details and management team
- **Modern UI**: Built with React Aria Components for accessibility
- **Admin Panel**: For managing product listings

