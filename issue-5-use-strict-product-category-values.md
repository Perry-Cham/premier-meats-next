# Issue 5: Use strict product category values instead of free text

**Title:** Use strict product category values instead of free text

**Body:**
**Problem:** `collections/Products.ts` stores `category` as free text, which can lead to inconsistent values.

**Goal:** Define product categories as a fixed select list and reuse the same category definitions across the app.

**Change:**
- change `category` field to `select` in `collections/Products.ts`
- use fixed options: `beef`, `pork`, `chicken`, `processed`
- optionally add shared category types in `types/index.ts`

**Acceptance criteria:**
- admin users can only choose valid categories
- inconsistent category strings are prevented
- frontend and backend share the same category definitions

**Files:** `collections/Products.ts`, `types/index.ts`
