# Issue 1: Harden Payload `products` Collection Access Control

**Title:** Harden Payload `products` collection access control

**Category:** Security

**Severity:** High

**Problem:** 

The `collections/Products.ts` currently allows `create: () => true`, which means **any unauthenticated user can create products** via the public API. This violates the principle of least privilege and creates a significant security vulnerability.

**Goal:** 

Allow public read access only, and restrict `create`, `update`, and `delete` operations to authenticated Payload admin users.

**Background:**

According to the SOLID principle of Single Responsibility, access control should be explicit and strict. The current configuration mixes public read access with unrestricted write access, which can lead to data integrity issues and spam.

**Solution:**

Replace the current access control with explicit, role-based access:

```typescript
access: {
  read: () => true,                    // Public can read products
  create: ({ req }) => !!req.user,     // Only authenticated admins
  update: ({ req }) => !!req.user,     // Only authenticated admins
  delete: ({ req }) => !!req.user,     // Only authenticated admins
},
```

**Acceptance Criteria:**

- [ ] `GET /api/products` remains public and returns all products
- [ ] `POST /api/products` returns 401 Unauthorized when called without authentication
- [ ] Authenticated Payload admin users can create, update, and delete products
- [ ] Test with unauthenticated request to verify rejection
- [ ] Test with authenticated request to verify acceptance

**File:** `collections/Products.ts` (lines 62-68)

**Related Files:** `collections/Product-Pages.ts`, `collections/Media.ts`

---

**Notes for Junior Dev:**
- Payload uses `req.user` to check authentication status
- `!!req.user` converts the user object to a boolean (truthy if user exists, falsy if null)
- This follows the security principle: "deny by default, allow explicitly"
