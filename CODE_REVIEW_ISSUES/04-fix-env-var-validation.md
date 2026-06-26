# Issue 4: Fix Environment Variable Validation Logic Bug

**Title:** Fix redundant and ineffective environment variable validation in payload.config.ts

**Category:** Code Quality / Bug

**Severity:** Medium

**Problem:**

The environment variable validation loop in `payload.config.ts` (lines 18-24) has a logical bug that makes the validation ineffective:

```typescript
const requiredEnvVars = {
  DATABASE_URL: process.env.DATABASE_URL,
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN
}

for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (requiredEnvVars[key] == undefined || value == "") {  // ❌ REDUNDANT: checks same thing twice
    throw new Error(`Missing env var ${key}`);
  }
}
```

**Issues:**

1. **Redundancy:** `requiredEnvVars[key]` and `value` are the same thing (already destructured)
2. **Loose Equality:** Using `==` instead of `===` can cause unexpected type coercion
3. **Incomplete Check:** Doesn't account for whitespace-only strings (e.g., `" "`)
4. **Poor Error Message:** Doesn't indicate what values are expected

**Goal:**

Create a clear, non-redundant validation function that properly checks for missing or invalid environment variables.

**Background:**

This follows the **DRY (Don't Repeat Yourself)** and **Clean Code** principles. Environment validation is a critical step that should be:
- Easy to understand (explicit)
- Robust (handles edge cases)
- Helpful (provides context in error messages)

**Solution:**

```typescript
// Validate required environment variables
const requiredEnvVars = {
  DATABASE_URL: process.env.DATABASE_URL,
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
}

const missingVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value || value.trim() === '')
  .map(([key]) => key)

if (missingVars.length > 0) {
  throw new Error(
    `Missing or invalid environment variables: ${missingVars.join(', ')}. ` +
    `Please ensure all required variables are set in your .env file.`
  )
}
```

**Key Improvements:**

1. ✅ Removed redundant check
2. ✅ Added `.trim()` to catch whitespace-only values
3. ✅ Collects all missing variables (reports all issues at once, not just the first)
4. ✅ Better error message with actionable guidance
5. ✅ Uses `===` (strict equality)
6. ✅ Separates concerns: validation logic is now distinct from application setup

**Acceptance Criteria:**

- [ ] When one env var is missing, error lists only that variable
- [ ] When multiple env vars are missing, error lists all of them at once
- [ ] Whitespace-only strings are treated as missing
- [ ] Error message is clear and actionable
- [ ] No changes to the validation rules (still checks the same 3 variables)

**File:** `payload.config.ts` (lines 18-24)

---

**Notes for Junior Dev:**
- Use `.filter()` to create a new array with only the missing values
- `.map()` transforms the filtered array to extract just the keys
- `.join(', ')` converts the array into a readable list
- Always prefer `===` over `==` in JavaScript/TypeScript
- Report all errors at once rather than throwing on the first one (better UX)
