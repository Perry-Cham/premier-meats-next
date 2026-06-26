# Issue 1: Harden Payload `products` collection access control

**Title:** Harden Payload `products` collection access control

**Body:**
**Problem:** `collections/Products.ts` currently allows `create: () => true`, which means public product creation is enabled.

**Goal:** Allow public read access only, and restrict `create`, `update`, and `delete` to authenticated Payload users.

**Change:**

```ts
access: {
  read: () => true,
  create: ({ req }) => !!req.user,
  update: ({ req }) => !!req.user,
  delete: ({ req }) => !!req.user,
},
```

**Acceptance criteria:**

- `GET /api/products` remains public
- `POST /api/products` fails without authentication
- authenticated Payload admin users can still create, update, and delete products

**File:** `collections/Products.ts`
