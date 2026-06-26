# Issue 8: Extract Hardcoded Colors to Theme Configuration

**Title:** Extract hardcoded color values to centralized theme configuration

**Category:** Code Quality / Maintainability

**Severity:** Medium

**Problem:**

Throughout the codebase, color values are hardcoded as inline strings (e.g., `bg-[#c41e2a]`, `border-[#e8e2d9]`, `text-[#78716c]`). This appears in multiple files:

- `components/pages/product_page/filter_bar.tsx` (lines 14-27)
- `app/(app)/page.tsx` (various theme color comments and hardcoded hex codes)
- `components/navbar1.tsx` (hardcoded color values)

**Examples:**

```tsx
// ❌ Hardcoded throughout UI
className={`bg-[#c41e2a] hover:bg-red-500`}
className={`border-[#e8e2d9] text-[#78716c]`}
className={`text-[#a87c3e]`}
```

**Why This Is Problematic:**

1. **Maintenance:** To rebrand colors, must search/replace across entire codebase
2. **Consistency:** Easy to use slightly different shades (`#c41e2a` vs `#c41e2b`)
3. **Scalability:** Adding dark mode or themes requires massive refactoring
4. **Accessibility:** No centralized place to validate contrast ratios
5. **Performance:** Tailwind JIT compiler must parse arbitrary hex values instead of predefined classes

**Goal:**

Create a single source of truth for all theme colors using Tailwind's `tailwind.config.js`.

**Background:**

Following **DRY** and **Separation of Concerns** principles:
- Design tokens (colors, spacing, fonts) should be defined once
- UI components should reference design tokens, not hardcoded values
- Makes redesigns/rebranding fast and low-risk

**Solution:**

### Step 1: Update `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        "brand": {
          "red": "#c41e2a",
          "red-hover": "#b01821",
          "gold": "#a87c3e",
          "cream": "#f7f4ef",
          "off-white": "#f0ece4",
          "dark": "#1c1917",
          "muted": "#78716c",
          "border": "#e8e2d9",
        },
      },
      fontFamily: {
        "display": ["var(--font-cormorant)"],
        "body": ["var(--font-jost)"],
      },
    },
  },
  plugins: [],
}
```

### Step 2: Update Component Usage

**Before:**
```tsx
className={`${
  active === null
    ? "bg-[#1c1917] text-white border-[#1c1917]"
    : "border-[#e8e2d9] text-[#78716c] hover:border-[#a87c3e]"
}`}
```

**After:**
```tsx
className={`${
  active === null
    ? "bg-brand-dark text-white border-brand-dark"
    : "border-brand-border text-brand-muted hover:border-brand-gold"
}`}
```

### Step 3: Update Color References

Files to update:
- `components/pages/product_page/filter_bar.tsx`
- `app/(app)/page.tsx`
- `components/navbar1.tsx`
- Any other files using hardcoded colors

**Example Mappings:**

| Current | New Config Key | Use Case |
|---------|----------------|----------|
| `#c41e2a` | `brand-red` | Primary CTA, active states |
| `#a87c3e` | `brand-gold` | Accents, hover states |
| `#1c1917` | `brand-dark` | Text, dark backgrounds |
| `#78716c` | `brand-muted` | Secondary text |
| `#e8e2d9` | `brand-border` | Borders, dividers |
| `#f7f4ef` | `brand-cream` | Background |

**Acceptance Criteria:**

- [ ] All custom colors are defined in `tailwind.config.js`
- [ ] No inline `bg-[#...]`, `text-[#...]`, `border-[#...]` remain in components
- [ ] All color references use Tailwind utility classes from config
- [ ] Visual inspection confirms identical colors before/after
- [ ] Dark mode support can be added (future task)
- [ ] Build output is same or smaller

**Files to Update:**

1. `tailwind.config.js` - Add color definitions
2. `components/pages/product_page/filter_bar.tsx` - Use `brand-*` classes
3. `components/navbar1.tsx` - Use `brand-*` classes
4. `app/(app)/page.tsx` - Use `brand-*` classes

**Related Files:**

Consider creating a `styles/theme.css` file for semantic color documentation:

```css
/* styles/theme.css */
:root {
  --color-brand-red: #c41e2a;
  --color-brand-gold: #a87c3e;
  --color-brand-dark: #1c1917;
  --color-brand-muted: #78716c;
  --color-brand-border: #e8e2d9;
  --color-brand-cream: #f7f4ef;
}
```

---

**Notes for Junior Dev:**

- **Tailwind config:** The `extend.colors` object adds to the default palette
- **Naming:** Use semantic names (`brand-red`) not semantic meaning (`hover-color`)
- **Dark Mode:** You can add dark-mode variants:
  ```javascript
  "brand": {
    "red": "light-red-value",
    "red": { light: "#...", dark: "#..." }
  }
  ```
- **Testing:** Run `npm run build` and check output CSS file size
- **Future:** Consider using CSS custom properties (variables) for runtime theme switching

**Preview:** Check Tailwind docs: https://tailwindcss.com/docs/customizing-colors
