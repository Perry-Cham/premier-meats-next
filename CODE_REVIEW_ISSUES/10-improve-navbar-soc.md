# Issue 10: Improve Navbar Component Maintainability and Accessibility

**Title:** Refactor navbar component to improve separation of concerns and accessibility

**Category:** Code Quality / Accessibility / Architecture

**Severity:** Medium

**Problem:**

The `components/navbar1.tsx` component mixes multiple concerns and has accessibility issues:

**Issues:**

1. **Separation of Concerns:** Desktop and mobile rendering logic is mixed in one component
2. **Repeated Code:** Same menu rendering logic appears twice (`renderMenuItem` and `renderMobileMenuItem`)
3. **Hardcoded Values:** Menu structure, logo data hardcoded as defaults
4. **Accessibility:** Missing ARIA labels on navigation elements
5. **Responsive Design:** Hard to test desktop/mobile separately
6. **Navigation Link Bug:** `item.url="#"` for items with subitems prevents navigation (should use proper semantic structure)

**Specific Issues in Code:**

```tsx
// ❌ Item with subitems has href="#"
{
  title: "Products",
  url: "#",  // ❌ Dead link; should not be clickable
  items: [...]
}

// ❌ No ARIA labels on nav, buttons, or menu items
<nav className="hidden items-center justify-between lg:flex">
  {/* Should have aria-label */}
</nav>

// ❌ Same rendering function for desktop/mobile (repeated code)
const renderMenuItem = (item: MenuItem) => { ... }
const renderMobileMenuItem = (item: MenuItem) => { ... }
```

**Goal:**

1. Separate desktop and mobile navbar into dedicated components
2. Extract menu rendering logic into a reusable, type-safe utility
3. Add proper ARIA labels and semantic HTML
4. Remove hardcoded defaults (move to separate config file)
5. Improve maintainability and testability

**Background:**

Following **SOLID** principles:
- **Single Responsibility:** Each component handles one concern (desktop OR mobile)
- **Separation of Concerns:** UI logic, menu rendering, and configuration should be separate
- **Open/Closed:** Easy to extend nav types without modifying components

**Solution:**

### Step 1: Create a config file for menu structure

**File:** `config/navigation.ts`

```typescript
export type MenuItem = {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

export const DEFAULT_MENU: MenuItem[] = [
  { title: "Home", url: "/" },
  {
    title: "Products",
    url: "/products",  // Actual page, not "#"
    items: [
      { title: "Beef", url: "/products/beef" },
      { title: "Pork", url: "/products/pork" },
      { title: "Chicken", url: "/products/chicken" },
      { title: "Processed", url: "/products/processed" },
    ],
  },
  { title: "About", url: "/about" },
  { title: "Contact", url: "/contact" },
]

export const DEFAULT_LOGO = {
  url: "/",
  src: "/api/media/file/IMG-20260325-WA0000_1_-removebg-preview.png",
  alt: "Premier Meats logo",
  title: "Yetu Meats",
}
```

### Step 2: Extract menu rendering to utility

**File:** `lib/menu-utils.tsx`

```typescript
import Link from "next/link"
import type { MenuItem } from "@/config/navigation"

export const renderMenuItemLink = (item: MenuItem) => (
  <Link
    href={item.url}
    className="text-sm font-medium transition-colors hover:text-accent-foreground"
  >
    {item.title}
  </Link>
)

export const renderMenuItemButton = (item: MenuItem) => (
  <button
    className="text-sm font-medium transition-colors hover:text-accent-foreground"
    onClick={() => {/* Handle nested menu */}}
  >
    {item.title}
  </button>
)
```

### Step 3: Split into Desktop and Mobile Components

**File:** `components/navbar/navbar-desktop.tsx`

```typescript
"use client"

import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import type { MenuItem, Logo } from "@/config/navigation"

interface NavbarDesktopProps {
  menu: MenuItem[]
  logo: Logo
  className?: string
}

export function NavbarDesktop({ menu, logo, className }: NavbarDesktopProps) {
  return (
    <nav
      className={`hidden items-center justify-between lg:flex ${className || ""}`}
      aria-label="Main navigation"  // ✅ ARIA label
    >
      <div className="flex items-center gap-6">
        {/* Logo */}
        {/* Menu */}
      </div>
    </nav>
  )
}
```

**File:** `components/navbar/navbar-mobile.tsx`

```typescript
"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import type { MenuItem, Logo } from "@/config/navigation"

interface NavbarMobileProps {
  menu: MenuItem[]
  logo: Logo
}

export function NavbarMobile({ menu, logo }: NavbarMobileProps) {
  return (
    <div className="block lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Open menu"  // ✅ ARIA label
            aria-expanded="false"   // ✅ ARIA expanded state
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          {/* Mobile menu items */}
        </SheetContent>
      </Sheet>
    </div>
  )
}
```

### Step 4: Update Main Navbar Component

**File:** `components/navbar1.tsx`

```typescript
"use client"

import Link from "next/link"
import { NavbarDesktop } from "./navbar/navbar-desktop"
import { NavbarMobile } from "./navbar/navbar-mobile"
import { DEFAULT_MENU, DEFAULT_LOGO, type Logo, type MenuItem } from "@/config/navigation"

interface NavbarProps {
  className?: string
  logo?: Logo
  menu?: MenuItem[]
}

export default function Navbar({
  className,
  logo = DEFAULT_LOGO,
  menu = DEFAULT_MENU,
}: NavbarProps) {
  return (
    <header className={`py-2 ${className || ""}`}>
      <div className="container mx-auto">
        <NavbarDesktop menu={menu} logo={logo} />
        <NavbarMobile menu={menu} logo={logo} />
      </div>
    </header>
  )
}
```

**Acceptance Criteria:**

- [ ] Desktop navbar renders correctly on large screens
- [ ] Mobile menu sheet appears on small screens
- [ ] All menu items are keyboard accessible (Tab, Enter, Escape)
- [ ] ARIA labels present on all interactive elements
- [ ] No console errors or accessibility warnings
- [ ] Hardcoded defaults moved to `config/navigation.ts`
- [ ] Menu rendering logic is DRY (no duplicate functions)
- [ ] Products link points to `/products`, not `#`
- [ ] Component accepts custom menu and logo (props)
- [ ] Each navbar variant can be tested independently

**Testing:**

```typescript
// Example: Test desktop navbar
import { render, screen } from "@testing-library/react"
import { NavbarDesktop } from "@/components/navbar/navbar-desktop"

test("desktop navbar renders menu items", () => {
  render(<NavbarDesktop menu={menu} logo={logo} />)
  expect(screen.getByLabelText("Main navigation")).toBeInTheDocument()
})

test("mobile menu button has ARIA label", () => {
  render(<NavbarMobile menu={menu} logo={logo} />)
  expect(screen.getByLabelText("Open menu")).toBeInTheDocument()
})
```

**Files to Create:**

1. `config/navigation.ts` - Menu configuration
2. `lib/menu-utils.tsx` - Menu rendering utilities
3. `components/navbar/navbar-desktop.tsx` - Desktop navbar
4. `components/navbar/navbar-mobile.tsx` - Mobile navbar

**File to Update:**

1. `components/navbar1.tsx` - Main navbar (simplified)

---

**Notes for Junior Dev:**

- **ARIA Attributes:** Make UI accessible to screen readers
  - `aria-label`: Describe button purpose ("Open menu")
  - `aria-expanded`: Boolean state for toggle buttons
  - `aria-label="Main navigation"`: Identify nav landmarks
- **Semantic HTML:** Use `<nav>` for navigation areas, `<button>` for buttons
- **Component Testing:** Separate components = separate test files = easier to test
- **Configuration:** Move data out of components (makes them reusable)
