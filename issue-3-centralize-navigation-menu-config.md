# Issue 3: Centralize navigation menu and category configuration

**Title:** Centralize navigation menu and category configuration

**Body:**
**Problem:** `components/navbar1.tsx` hardcodes menu items and product categories in multiple places for desktop and mobile.

**Goal:** Store navigation and category data in a shared config file and reuse it in the navbar.

**Change:**
- create `lib/menu.ts` or similar
- export `NAV_MENU_ITEMS` and/or `PRODUCT_CATEGORIES`
- import that shared config in `components/navbar1.tsx`
- remove duplicated menu configuration

**Acceptance criteria:**
- desktop and mobile menu use the same data source
- single source of truth for category URLs
- updating menu structure only requires changing one file

**Files:** `components/navbar1.tsx`, `lib/menu.ts`
