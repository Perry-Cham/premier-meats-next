# Issue 5: Enable TypeScript Strict Mode

**Title:** Enable TypeScript strict mode for better type safety

**Category:** Code Quality

**Severity:** High

**Problem:**

The `tsconfig.json` currently has `"strict": false`, which disables most of TypeScript's type-checking features. This defeats the purpose of using TypeScript and allows many classes of bugs to slip through.

Current configuration:
```json
{
  "compilerOptions": {
    "strict": false,  // ❌ Disables strict type checking
    // ...
  }
}
```

**Why This Matters:**

With `strict: false`, TypeScript allows:
- Implicit `any` types (no type information)
- Null/undefined access without checking
- Function calls with wrong number of parameters
- Unused variables silently ignored
- Type coercion bugs

This creates a false sense of safety—you're using TypeScript syntax but getting JavaScript-level type safety.

**Goal:**

Enable strict mode to catch errors at compile-time rather than runtime.

**Background:**

Following **Clean Code** and **SOLID** (Single Responsibility, Open/Closed) principles:
- Tight feedback loop (catch errors early)
- Self-documenting code (types make intent clear)
- Refactoring safety (types prevent breaking changes)

**Solution:**

Change in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,  // ✅ Enable strict type checking
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    // ... rest of config
  }
}
```

**Implementation Steps:**

1. [ ] Change `"strict": false` to `"strict": true` in `tsconfig.json`
2. [ ] Run `npm run build` to identify type errors
3. [ ] Fix each type error:
   - Add explicit type annotations where needed
   - Use optional chaining (`?.`) for potential null/undefined values
   - Use nullish coalescing (`??`) for default values
4. [ ] Ensure all files have no type errors before merging

**Expected Findings:**

You'll likely find issues like:
- Missing type annotations in function parameters/returns
- Potential null/undefined access
- Array access without bounds checking
- Incorrect callback signatures

**Acceptance Criteria:**

- [ ] `tsconfig.json` has `"strict": true`
- [ ] Project compiles with zero type errors
- [ ] All new code follows strict mode requirements
- [ ] Team uses `// @ts-ignore` only when absolutely necessary (with comments explaining why)

**File:** `tsconfig.json` (line 8)

---

**Notes for Junior Dev:**
- Strict mode is "annoying" at first but catches real bugs
- Most complaints about TypeScript come from weak mode (strict: false)
- The Red-Green-Refactor cycle helps: fix compile errors, then tests pass
- Use `unknown` instead of `any` when type is truly unknown
- Use type guards to narrow types before access (e.g., `if (x !== null) { x.property }`)
