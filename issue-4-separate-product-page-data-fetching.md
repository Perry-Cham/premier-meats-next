# Issue 4: Separate product page data fetching from rendering logic

**Title:** Separate product page data fetching from rendering logic

**Body:**
**Problem:** `app/(app)/products/[category]/page.tsx` mixes Payload data fetching, data transformation, and rendering in one file.

**Goal:** Move data access and processing into dedicated helper functions or a service module.

**Change:**
- create `lib/products.ts` or `app/(app)/products/[category]/service.ts`
- add `fetchProductsByCategory(category)` and `fetchProductPageContent(category)`
- simplify `page.tsx` so it only fetches data and renders `<Product_Page />`

**Acceptance criteria:**
- page component no longer contains complex business logic
- fetch logic is reusable and easier to test
- rendering file is small and focused

**Files:** `app/(app)/products/[category]/page.tsx`, `lib/products.ts`
