# Issue 12: Create Environment Configuration File for Runtime Settings

**Title:** Centralize environment configuration and secrets management

**Category:** Code Quality / Security / DevOps

**Severity:** Medium

**Problem:**

Environment variables are referenced directly throughout the codebase without any central configuration. This creates:

1. **Maintainability Issues:** Hard to track which env vars are used and where
2. **Type Safety:** No TypeScript validation of required/optional vars
3. **Documentation:** New developers don't know what env vars to set
4. **Security:** Secrets scattered throughout code, hard to audit
5. **Consistency:** Different parts of code may expect different formats/defaults

**Examples:**

```typescript
// payload.config.ts
process.env.DATABASE_URL
process.env.PAYLOAD_SECRET
process.env.BLOB_READ_WRITE_TOKEN

// Other files might reference more vars:
process.env.NEXT_PUBLIC_API_URL
process.env.NODE_ENV
// etc.
```

**Why This Is Problematic:**

- No single source of truth for configuration
- Easy to miss required vars during deployment
- No runtime type checking
- Hard to distinguish public vs. secret variables

**Goal:**

Create a centralized configuration system that:
1. Validates environment variables at startup
2. Provides type-safe access to configuration
3. Documents all required/optional variables
4. Distinguishes between public and secret variables
5. Fails fast if required vars are missing

**Background:**

Following **Separation of Concerns** and **Single Responsibility** principles:
- Configuration management should be centralized
- Validation should happen once, not scattered
- Different concerns (database, storage, API) should be grouped

**Solution:**

### Step 1: Create Configuration Module

**File:** `lib/env.ts`

```typescript
/**
 * Environment Configuration
 * 
 * Centralizes all environment variable access with type safety.
 * Validates variables at import time (fails fast).
 */

interface EnvironmentConfig {
  // Database
  database: {
    url: string
  }
  // Payload CMS
  payload: {
    secret: string
  }
  // Storage
  storage: {
    blobToken: string
  }
  // Next.js
  app: {
    url: string
    nodeEnv: "development" | "production" | "test"
    isDevelopment: boolean
    isProduction: boolean
  }
}

/**
 * Parse and validate environment variables
 * Throws error if required variables are missing
 */
function validateEnv(): EnvironmentConfig {
  const requiredVars = {
    DATABASE_URL: process.env.DATABASE_URL,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  }

  // Check for missing variables
  const missing = Object.entries(requiredVars)
    .filter(([, value]) => !value || value.trim() === "")
    .map(([key]) => key)

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}. ` +
      `Please check your .env file and ensure all variables are set.`
    )
  }

  const nodeEnv = (process.env.NODE_ENV || "development") as
    | "development"
    | "production"
    | "test"

  const isDevelopment = nodeEnv === "development"
  const isProduction = nodeEnv === "production"

  return {
    database: {
      url: requiredVars.DATABASE_URL,
    },
    payload: {
      secret: requiredVars.PAYLOAD_SECRET,
    },
    storage: {
      blobToken: requiredVars.BLOB_READ_WRITE_TOKEN,
    },
    app: {
      url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      nodeEnv,
      isDevelopment,
      isProduction,
    },
  }
}

// Validate once on import
let config: EnvironmentConfig | null = null

export function getEnv(): EnvironmentConfig {
  if (!config) {
    config = validateEnv()
  }
  return config
}

// Export individual access for convenience
export const env = getEnv()

// Type-safe exports
export const DATABASE_URL = env.database.url
export const PAYLOAD_SECRET = env.payload.secret
export const BLOB_READ_WRITE_TOKEN = env.storage.blobToken
export const NODE_ENV = env.app.nodeEnv
export const IS_DEVELOPMENT = env.app.isDevelopment
export const IS_PRODUCTION = env.app.isProduction
```

### Step 2: Create .env.example File

**File:** `.env.example`

```bash
# Database Configuration
# MongoDB connection URL
# Example: mongodb+srv://user:password@cluster.mongodb.net/dbname
DATABASE_URL=

# Payload CMS Configuration
# Secret key for JWT signing
# Generate with: openssl rand -hex 32
PAYLOAD_SECRET=

# Storage Configuration (Vercel Blob)
# Token for Vercel Blob storage
# Get from: https://vercel.com/account/tokens
BLOB_READ_WRITE_TOKEN=

# Application Configuration
# Node environment (development, production, test)
NODE_ENV=development

# Public API URL (can be accessed from browser)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 3: Update payload.config.ts to Use Configuration

**File:** `payload.config.ts`

```typescript
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import path from "path"
import { buildConfig } from "payload"
import { fileURLToPath } from "url"
import sharp from "sharp"

// Import environment configuration
import { DATABASE_URL, PAYLOAD_SECRET, BLOB_READ_WRITE_TOKEN } from "@/lib/env"

import { Users } from "./collections/Users"
import { Media } from "./collections/Media"
import { Products } from "./collections/Products"
import { ProductPages } from "./collections/Product-Pages"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Products, ProductPages],
  editor: lexicalEditor(),
  secret: PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: DATABASE_URL,
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      token: BLOB_READ_WRITE_TOKEN,
      collections: {
        media: true,
      },
    }),
  ],
})
```

### Step 4: Create Documentation

**File:** `docs/ENVIRONMENT_SETUP.md`

```markdown
# Environment Setup

## Required Variables

Copy `.env.example` to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

### DATABASE_URL
- **Type:** String (MongoDB connection URL)
- **Required:** Yes
- **Example:** `mongodb+srv://user:pass@cluster.mongodb.net/premier-meats`
- **Source:** MongoDB Atlas / your database provider

### PAYLOAD_SECRET
- **Type:** String (64-character hex)
- **Required:** Yes
- **Generate:** `openssl rand -hex 32`
- **Purpose:** JWT signing key for Payload CMS

### BLOB_READ_WRITE_TOKEN
- **Type:** String (Vercel API token)
- **Required:** Yes
- **Source:** https://vercel.com/account/tokens
- **Scope:** `read` and `write` for blob storage

## Optional Variables

### NEXT_PUBLIC_APP_URL
- **Default:** `http://localhost:3000`
- **Use Case:** Override in production/staging

### NODE_ENV
- **Options:** `development`, `production`, `test`
- **Default:** `development`

## Validation

Environment variables are validated when the app starts. If any required variables are missing, the app will fail with a clear error message.

```
Error: Missing required environment variables: DATABASE_URL, PAYLOAD_SECRET
```

## Local Development

1. Create `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in values from your local setup

3. Start dev server:
   ```bash
   npm run dev
   ```

## Production Deployment

1. Set environment variables in your hosting platform (Vercel, Railway, etc.)
2. Do NOT commit `.env.local` (it's in `.gitignore`)
3. Variables are validated on each deploy

## Adding New Variables

1. Add to `.env.example` with description
2. Add to `lib/env.ts` configuration object
3. Add validation logic if needed
4. Update this documentation
5. Commit changes to `.env.example` (never commit actual values)
```

### Step 5: Update .gitignore

**File:** `.gitignore`

```bash
# Environment variables (never commit these!)
.env
.env.local
.env.*.local
.env.production.local
.env.development.local
.env.test.local

# Other files...
node_modules/
.next/
out/
dist/
build/
```

**Acceptance Criteria:**

- [ ] `lib/env.ts` created and exports configuration
- [ ] `payload.config.ts` uses imported configuration (not direct `process.env`)
- [ ] `.env.example` documents all required/optional variables
- [ ] Environment validation happens at startup (fails fast)
- [ ] Type-safe access to all config values
- [ ] `.env.local` is in `.gitignore`
- [ ] Error messages are clear and actionable
- [ ] Documentation explains how to set up env vars
- [ ] New developers can onboard quickly using `.env.example`

**Files to Create:**

1. `lib/env.ts` - Configuration module
2. `.env.example` - Template for environment variables
3. `docs/ENVIRONMENT_SETUP.md` - Setup documentation

**Files to Update:**

1. `payload.config.ts` - Use imported configuration
2. `.gitignore` - Ensure `.env*` files are ignored

---

**Notes for Junior Dev:**

- **Never commit `.env` files** to version control
- **`NEXT_PUBLIC_*` prefix:** Variables starting with this are accessible in browser (don't put secrets here!)
- **Example file:** `.env.example` is committed; developers copy it and fill in their values
- **Validation:** Happens once at startup; if it passes, rest of code trusts configuration
- **Type Safety:** Configuration object is strongly typed; TypeScript prevents typos
- **Fail Fast:** Better to fail at startup than later when code tries to use missing variable

**Security Best Practices:**

- Rotate secrets regularly
- Use strong, random values for secrets
- Different secrets for different environments (dev, staging, prod)
- Never log secret values
- Audit who has access to `.env` files
