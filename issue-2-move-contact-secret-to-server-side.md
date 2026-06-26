# Issue 2: Move contact form secret handling to server-side

**Title:** Move contact form secret handling to server-side

**Body:**
**Problem:** `app/(app)/contact/page.tsx` uses `process.env.WEB3_API_KEY` in a client component, exposing secrets to the browser build.

**Goal:** Send contact form submissions via a server-side API route or server action so secrets remain on the backend.

**Change:**
- keep `contact/page.tsx` as UI only
- add a server route like `app/api/contact/route.ts`
- use `WEB3_API_KEY` only inside the server route
- submit the form to the internal API instead of directly to `api.web3forms.com`

**Acceptance criteria:**
- `WEB3_API_KEY` is not exposed in client-side code
- contact form still works
- backend route uses only server-side environment variables

**Files:** `app/(app)/contact/page.tsx`, `app/api/contact/route.ts`
