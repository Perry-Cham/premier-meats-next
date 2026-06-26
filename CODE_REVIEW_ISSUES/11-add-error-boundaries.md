# Issue 11: Add Error Boundaries and Error Handling to Client Components

**Title:** Implement Error Boundaries for client-side components

**Category:** Reliability / Code Quality

**Severity:** Medium

**Problem:**

The application uses multiple client components (marked with `"use client"`) but lacks error boundaries. Without error boundaries, a single component error crashes the entire subtree, resulting in a blank white screen with no error message.

Examples of `"use client"` components without error handling:
- `app/(app)/page.tsx` - Complex animations and motion effects
- `components/navbar1.tsx` - Navigation (critical path)
- `stores/navStore.tsx` - State management

**Why This Is Problematic:**

1. **User Experience:** Blank white screen is frustrating; no indication of what went wrong
2. **Silent Failures:** Errors may occur in third-party libraries without warning
3. **Production Issues:** Hard to debug errors after deployment
4. **Accessibility:** Error states not announced to screen readers

**Real-World Scenarios:**

```typescript
// Without error boundary:
function Page() {
  const data = useApi()  // Throws error
  return <div>{data.name}</div>  // ❌ Entire page crashes
}

// With error boundary:
<ErrorBoundary>
  <Page />
</ErrorBoundary>
// ✅ Error is caught, fallback UI shown, page remains functional
```

**Goal:**

1. Create reusable `ErrorBoundary` component
2. Wrap client components that may fail
3. Provide graceful error UI
4. Log errors for debugging
5. Maintain application stability

**Background:**

Following **Separation of Concerns** and **SOLID** principles:
- Error handling is a distinct concern from business logic
- Components should not crash the entire app on error
- Users should see helpful error messages, not blank screens

**Solution:**

### Step 1: Create an ErrorBoundary Component

**File:** `components/error-boundary.tsx`

```typescript
"use client"

import React, { ReactNode, ReactError } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: { componentStack: string }) => void
  logErrors?: boolean
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 * 
 * @example
 * <ErrorBoundary fallback={<ErrorFallback />} onError={logError}>
 *   <MyComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    // Log error to error reporting service (Sentry, LogRocket, etc.)
    if (this.props.logErrors !== false) {
      console.error("Error caught by boundary:", error, errorInfo)
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
    }

    // Call optional error handler
    this.props.onError?.(error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <DefaultErrorFallback
            error={this.state.error}
            onReset={this.handleReset}
          />
        )
      )
    }

    return this.props.children
  }
}

/**
 * Default Error Fallback UI
 */
function DefaultErrorFallback({
  error,
  onReset,
}: {
  error: Error | null
  onReset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
      <div className="bg-white rounded-lg shadow p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>

        <p className="text-gray-600 mb-4">
          We encountered an error. Please try again or contact support if the problem persists.
        </p>

        {process.env.NODE_ENV === "development" && error && (
          <details className="bg-gray-100 p-3 rounded mb-6 text-sm text-gray-700 overflow-auto max-h-48">
            <summary className="font-mono cursor-pointer font-semibold mb-2">
              Error Details (Dev Only)
            </summary>
            <pre className="whitespace-pre-wrap break-words">
              {error.toString()}
            </pre>
          </details>
        )}

        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Try Again
          </button>
          <a
            href="/"
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded text-center"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  )
}
```

### Step 2: Apply Error Boundaries to Components

**File:** `app/(app)/layout.tsx`

```typescript
import "@/styles/globals.css"
import Nav from "@/components/navbar1"
import Footer from "@/components/custom/footer"
import { ErrorBoundary } from "@/components/error-boundary"
import { Cormorant_Garamond, Jost } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
})
// ✅ Remove: console.log(cormorant, jost)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <ErrorBoundary>
          <Nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200" />
        </ErrorBoundary>

        <div className="relative flex flex-col">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </div>

        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  )
}
```

**File:** `app/(app)/page.tsx`

```typescript
"use client"

import { ErrorBoundary } from "@/components/error-boundary"
// ... other imports

export default function Home() {
  return (
    <ErrorBoundary>
      <section className="...">
        <ParallaxImage />
      </section>
      <ErrorBoundary>
        <Ticker />
      </ErrorBoundary>
      {/* ... rest of page */}
    </ErrorBoundary>
  )
}
```

### Step 3: Create Custom Error Fallback (Optional)

**File:** `components/custom-error-fallback.tsx`

```typescript
import { AlertCircle } from "lucide-react"
import Link from "next/link"

interface CustomErrorFallbackProps {
  error: Error | null
  onReset: () => void
}

export function CustomErrorFallback({
  error,
  onReset,
}: CustomErrorFallbackProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-cream">
      <div className="text-center max-w-md">
        <AlertCircle className="w-16 h-16 text-brand-red mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-brand-dark mb-2">
          Oops!
        </h1>
        <p className="text-brand-muted mb-6">
          Something went wrong. Our team has been notified.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onReset}
            className="bg-brand-red hover:bg-red-700 text-white px-6 py-2 rounded"
          >
            Retry
          </button>
          <Link
            href="/"
            className="border border-brand-dark text-brand-dark px-6 py-2 rounded hover:bg-brand-cream"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}
```

Then use it:

```tsx
<ErrorBoundary fallback={<CustomErrorFallback />}>
  <MyComponent />
</ErrorBoundary>
```

**Acceptance Criteria:**

- [ ] `ErrorBoundary` component created and exported
- [ ] Error boundary wraps critical client components (Nav, Footer, main content)
- [ ] Graceful error UI displays when component throws
- [ ] "Try Again" button resets error state
- [ ] Error details visible in development mode only
- [ ] No console warnings about error boundaries
- [ ] Tested by intentionally throwing error in component
- [ ] Application remains functional even when child component fails

**Testing:**

```typescript
// Test component that throws
function BrokenComponent() {
  throw new Error("Test error")
}

// Wrap it
<ErrorBoundary>
  <BrokenComponent />
</ErrorBoundary>

// Should show fallback UI, not crash
```

**File to Create:**

1. `components/error-boundary.tsx` - Main error boundary
2. `components/custom-error-fallback.tsx` - Custom error UI (optional)

**Files to Update:**

1. `app/(app)/layout.tsx` - Wrap components with ErrorBoundary
2. `app/(app)/page.tsx` - Wrap sections with ErrorBoundary
3. Any other `"use client"` components with complex logic

---

**Notes for Junior Dev:**

- **Error Boundaries:** Only catch errors in React render/lifecycle; not async errors
- **Limitations:**
  - Don't catch errors in event handlers (use try/catch instead)
  - Don't catch async errors (use .catch() or try/catch in async/await)
  - Don't catch errors in the error boundary's own render method
- **Error Reporting:** Integrate with Sentry, LogRocket, or similar service
- **User Experience:** Show friendly error message, always offer "Try Again" or "Go Home"
- **Development:** Show full error details in dev mode for debugging
