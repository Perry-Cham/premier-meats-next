# Issue 3: Harden Media Collection Access Control

**Title:** Harden media collection access control and fix filename parsing bug

**Category:** Security & Bug

**Severity:** High

**Problem:**

The `collections/Media.ts` collection has two issues:

1. **Security:** Only `read: () => true` is defined; `create`, `update`, and `delete` are unrestricted
2. **Bug:** The `beforeChange` hook uses `.split()[0]` on a filename, which is incorrect and will fail

Current code:
```typescript
const title = data.filename.split()[0];  // ❌ WRONG: split() with no argument splits on whitespace
```

Should be:
```typescript
const title = data.filename.split('.')[0];  // ✓ Splits on the dot to get filename without extension
```

**Goal:**

- Add explicit access control for media upload operations
- Fix the filename parsing bug in the alt text hook
- Ensure users cannot upload arbitrary files without authentication

**Background:**

Media files are critical assets. Unrestricted upload access can lead to:
- Storage bloat (DoS attacks)
- Serving malicious content
- Unauthorized bandwidth usage

The filename parsing bug will cause runtime errors when generating alt text.

**Solution:**

```typescript
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,                    // Public can view media
    create: ({ req }) => !!req.user,     // Only authenticated admins can upload
    update: ({ req }) => !!req.user,     // Only authenticated admins can update
    delete: ({ req }) => !!req.user,     // Only authenticated admins can delete
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,  // Changed: Make alt text required for accessibility
      hooks: {
        beforeChange: [({ data, value }): string => {
          if (!value) {
            // Extract filename without extension
            const title = data.filename.split('.')[0];
            return title;
          }
          return value;
        }]
      }
    },
  ],
  upload: true,
}
```

**Key Changes:**

1. ✅ Added explicit `create`, `update`, `delete` access control
2. ✅ Fixed `.split()` to `.split('.')` to correctly parse filename
3. ✅ Made `required: true` on alt text field (improves accessibility)

**Acceptance Criteria:**

- [ ] `GET /api/media` remains public
- [ ] `POST /api/media` (upload) requires authentication
- [ ] `PATCH`, `DELETE` operations require authentication
- [ ] Alt text is auto-populated from filename correctly (test with `example-image.webp` → `example-image`)
- [ ] Alt text field is required, improving accessibility compliance

**File:** `collections/Media.ts`

---

**Notes for Junior Dev:**
- `data.filename` is a string like `photo.jpg`
- `.split('.')` creates an array: `['photo', 'jpg']`
- `[0]` gets the first element: `'photo'`
- `.split()` with no argument splits on ALL whitespace and returns unexpected results
- Always test string manipulation functions with sample data
