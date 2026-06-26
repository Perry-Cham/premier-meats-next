# Issue 9: Fix Inconsistent Code Formatting in navStore

**Title:** Standardize code formatting and spacing in navStore

**Category:** Code Quality

**Severity:** Low

**Problem:**

The file `stores/navStore.tsx` has inconsistent spacing and formatting that violates the project's code style standards:

```typescript
// Current (inconsistent):
import {create } from "zustand";              // ❌ Space before brace
interface Navstate {                          // ❌ Inconsistent naming
    isShowing: boolean;
    setIsShowing: (isShowing: boolean) => void;
}
const useNavStore = create<Navstate>((set) => ({
    isShowing: true,
    setIsShowing: (isShowing: boolean) => set({ isShowing }),
}));
export default useNavStore;                   // ❌ Mix of named and default exports
```

**Issues:**

1. **Import formatting:** Extra space in `{create }` (should be `{create}`)
2. **Naming:** `Navstate` should be `NavState` (PascalCase convention)
3. **Inconsistent exports:** File uses `export default` but other files use named exports
4. **ESLint violations:** The project's ESLint config should catch these

**Why This Matters:**

- **Professional appearance:** Code should look polished
- **Consistency:** Team should use consistent style across codebase
- **Tooling:** ESLint should enforce these automatically

**Goal:**

Fix formatting to match project standards and ensure ESLint passes with no warnings.

**Solution:**

```typescript
import { create } from 'zustand'

interface NavState {
  isShowing: boolean
  setIsShowing: (isShowing: boolean) => void
}

const useNavStore = create<NavState>((set) => ({
  isShowing: true,
  setIsShowing: (isShowing: boolean) => set({ isShowing }),
}))

export { useNavStore }
export default useNavStore
```

**Changes:**

1. ✅ Fixed import spacing: `{create }` → `{ create }`
2. ✅ Fixed type naming: `Navstate` → `NavState` (PascalCase)
3. ✅ Consistent indentation (no leading spaces for top-level statements)
4. ✅ Consistent quote style (single quotes, matching rest of codebase)
5. ✅ Added both named and default exports for flexibility

**Acceptance Criteria:**

- [ ] File passes ESLint without warnings: `npx eslint stores/navStore.tsx`
- [ ] Prettier formatting is applied: `npx prettier --write stores/navStore.tsx`
- [ ] Naming follows TypeScript conventions (PascalCase for types)
- [ ] Visual inspection shows clean, consistent formatting

**File:** `stores/navStore.tsx`

**Related Tasks:**

Run formatting across entire project:
```bash
npx eslint --fix
npx prettier --write .
```

---

**Notes for Junior Dev:**

- **ESLint:** Automatically catches style issues; use `npx eslint --fix` to auto-fix
- **Prettier:** Code formatter that standardizes style (semicolons, quotes, spacing)
- **Naming Conventions:**
  - Types/Interfaces: `PascalCase` (`NavState`, `Product`)
  - Variables/functions: `camelCase` (`useNavStore`, `isShowing`)
  - Constants: `UPPER_CASE` (`MAX_ITEMS`, `API_URL`)
- **Imports:** Consistent formatting makes diffs cleaner
