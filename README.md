# Yetu Next.js Web Application

> **Disclaimer:** A Demo website for Yetu Meats. It is a an improvement over the initial Premier Meats static website located somewhere in my repositories. It uses Nextjs with PayloadCMS as a headless cms. 

## Overview

Yetu is a full-stack web application for a Zambian meat wholesale and retail company based in Lusaka. It uses Nextjs for the customer facing UI with MongoDB as the database and vercel blob for media storage. The project also supports other s3 solution via payload cms's s3 adapter which can be configured in payload.config.json

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| CMS | Payload CMS 3.x |
| Database | MongoDB (via Mongoose) |
| Media Storage | Vercel Blob |
| Authentication | Payload built-in auth |
| Styling | Tailwind CSS |
| Animation | Framer Motion (`motion/react`) |
| UI Components | React Aria Components, shadcn/ui |
| Rich Text | Lexical (via `@payloadcms/richtext-lexical`) |
| Deployment | Vercel |


## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm
- A MongoDB database (MongoDB Atlas free tier works fine)
- A Vercel account with Blob storage enabled
- A Payload secret (any random string)

### Environment Variables

Create a `.env.local` file in the project root with the following:

```env
# MongoDB
DATABASE_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>

# Payload CMS
PAYLOAD_SECRET=your-random-secret-string-here

# Vercel Blob
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...

# App URL (used by Payload for media URLs and CORS)
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Contact form (Web3Forms)
WEB3_API_KEY=your-web3forms-key (Used for the contact form)
```

### Installation

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

The app will be available at `http://localhost:3000`.
The Payload admin panel will be available at `http://localhost:3000/admin`.

### First-time Setup

When you first run the project with a fresh database, navigate to `http://localhost:3000/admin` and Payload will prompt you to create the first admin user. This user gets full access to the CMS.

---

## Payload CMS Collections

### `users`
Manages admin users. Authentication is handled entirely by Payload — login, logout, password hashing, and JWT sessions are built in. 

### `media`
Handles all image uploads. Files are stored in Vercel Blob. The collection is configured with Sharp for automatic image resizing on upload (thumbnail and card sizes generated automatically).

### `products`
The core product catalogue. A single unified collection replaces the four separate MongoDB collections (`Beef`, `Pork`, `Chicken`, `Processed`) from the legacy system. Products are filtered by a `category` select field rather than by collection name.

Key fields:
- `name` — product name
- `category` — select: `beef` | `pork` | `chicken` | `processed`
- `subcategory` — text, used for grouping within a category page
- `price` — number
- `image` — upload relationship to the Media collection
- `weight` — optional text (e.g. `"400–500g"`)
- `badge` — optional text (e.g. `"Prime"`, `"Slow Cook"`)

### `product-pages`
Stores the rich text intro content for each product category page (the descriptive paragraphs shown above the product grid). Uses Lexical rich text. One document per category, identified by a `category` field.

To render this content on the frontend, fetch the document and pass the `content` field to `<RichText>` from `@payloadcms/richtext-lexical/react`:

```tsx
import { RichText } from '@payloadcms/richtext-lexical/react'

// data.content is the Lexical state object — pass it directly
<RichText data={doc.content} />
```

---

## Media Storage

All images are stored in Vercel Blob via the `@payloadcms/storage-vercel-blob` plugin. The plugin intercepts Payload's upload handling and redirects files to Blob storage, returning a public URL that gets saved to the database.
Currently it uploads to vercel blob by default but I'll implement a system that saves images locally based on dev environment in the near future.

---

## Collections

The project contains collections under the /app/(app)/collections for Payloads CMS. Each collection defines a schema for the data it expects. There are currently four collections. 
- Users: 
- Media: Defines the shape of data expected during Image uploads
- Products: Defines the shape of products
- Productpages: Defines the shape of product page content. 

## API Routes

Payload provides an auto generated rest api for accessing the data defined in the collections directory auto-generated REST API at `/api/products`, `/api/media`, and `/api/users`.

---

## Frontend Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, who we are, stats, pillars, products overview, CTA |
| `/about` | About page — company profile, farm-to-plate story, team, values |
| `/products/[category]` | Product Page - A dynamic route that fetches products based on the category parameter passed by the url
| `/contact` | Contact form (Web3Forms), bank details, addresses |

---

## Animation

All page animations use Framer Motion (`motion/react`)

- **Scroll reveals** — `useInView` with `once: true` triggers fade + translate entrance when elements enter the viewport.
- **Parallax** — `useScroll` + `useTransform` + `useSpring` on image sections. The spring adds physical lag so images drag behind scroll rather than tracking it exactly.
- **Hero entrance** — word-by-word staggered `y: "110%" → 0` reveal using `overflow-hidden` clip containers.
- **Hover springs** — `whileHover` with spring transition on cards, buttons, and interactive elements.
- **Fill buttons** — animated `x: "-101%" → "0%"` background span inside `overflow-hidden` anchor for the sliding fill effect.
- **Ticker** — CSS `@keyframes` only. A uniform infinite `translateX` loop needs no spring physics or DOM measurement, so plain CSS is the right tool.

---

## Deployment

The project is deployed on Vercel. The following environment variables must be set in the Vercel project dashboard:

```
DATABASE_URL
PAYLOAD_SECRET
BLOB_READ_WRITE_TOKEN
NEXT_PUBLIC_SERVER_URL
WEB3_API_KEY
```

Vercel Blob storage is provisioned from the Vercel dashboard under the Storage tab. Once provisioned, `BLOB_READ_WRITE_TOKEN` is added to the project automatically.

---

## Current Issues
- Lightened up gold on the landing page by using lighter colours
- Fix the product page so that it accurately sets totalProducts state to the number of products in that category on mount
- Make the navbar get product hcategories from the backend rather than hardcoding them
- Add ISR to the products page to optimize performance and reduce database hits.
- Update the images to use the nextjs image component to optimize load times
- Export metadata from landing and about pages to improve SEO
- Add a separate directory for typescript types

---

## Licence

This project is unlicensed and intended for personal/hobby use only. All business content, branding, and copy belongs to Yetu Meats, Lusaka, Zambia.