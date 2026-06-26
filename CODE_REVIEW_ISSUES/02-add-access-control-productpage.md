# Issue 2: Add Explicit Access Control to `productpage` Collection

**Title:** Add explicit access control to `productpage` collection

**Category:** Security

**Severity:** Medium

**Problem:**

The `collections/Product-Pages.ts` collection only defines `read: () => true` but omits explicit `create`, `update`, and `delete` access control. When access rules are undefined in Payload, they default to unrestricted access, creating a security vulnerability.

**Goal:**

Define explicit, restrictive access control for all operations on the product page collection.

**Background:**

The principle of **explicit is better than implicit** (KISS principle) applies here. Access control should always be explicitly defined, not rely on defaults. This prevents accidental public write access.

**Solution:**

Add explicit access control rules:

```typescript
access: {
  read: () => true,                    // Public can read product pages
  create: ({ req }) => !!req.user,     // Only authenticated admins
  update: ({ req }) => !!req.user,     // Only authenticated admins
  delete: ({ req }) => !!req.user,     // Only authenticated admins
},
```

**Acceptance Criteria:**

- [ ] All four access operations (`read`, `create`, `update`, `delete`) are explicitly defined
- [ ] `GET /api/productpage` remains public
- [ ] `POST`, `PATCH`, `DELETE` operations require authentication
- [ ] Code review confirms alignment with security standards

**File:** `collections/Product-Pages.ts` (lines 11-13)

---

**Notes for Junior Dev:**
- Always define all access operations explicitly
- Never rely on Payload's default behavior for security-sensitive operations
- This consistency improves code maintainability (SoC principle)
