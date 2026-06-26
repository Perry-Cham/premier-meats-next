# Issue 7: Refactor Product Model to Follow DRY Principle

**Title:** Refactor duplicate Mongoose schemas in product-models.ts

**Category:** Code Quality / Architecture

**Severity:** Medium

**Problem:**

The file `models/product-models.ts` violates the **DRY (Don't Repeat Yourself)** principle by defining the same schema four times for different product categories:

```typescript
const schema = new mongoose.Schema<Product>({
  name: String,
  price: Number,
  image: String,
  imageId: String,
  subcategory: String
})

const BeefProduct = mongoose.models.beef || mongoose.model('beef', schema, "Beef");
const PorkProduct = mongoose.models.pork || mongoose.model('pork', schema, "Pork");
const ProcessedProduct = mongoose.models.processed || mongoose.model('processed', schema, "Processed");
const ChickenProduct = mongoose.models.chicken || mongoose.model('chicken', schema, 'Chicken')
```

**Issues:**

1. **DRY Violation:** Same schema, same fields, just different collection names
2. **Type Safety:** Schema fields use bare `String`, `Number` (should use `{type: String, required: true}`)
3. **No Validation:** Missing required field constraints and data validation
4. **Maintenance Burden:** To add a field, you must update the interface AND all four model registrations
5. **Redundant Exports:** Four exports do the same thing

**Why This Design is Wrong:**

1. **Separation of Concerns:** Collection names should be metadata, not separate models
2. **Scalability:** Adding "Fish" category requires new model, new export, new import everywhere
3. **Testing:** Hard to test with multiple identical models
4. **Type Safety:** No runtime validation of required fields

**Goal:**

Create a single, reusable product model factory that works for all categories.

**Background:**

Following **SOLID** principles:
- **Single Responsibility:** One model definition for all product categories
- **Open/Closed:** Easy to add new categories without modifying model code
- **Separation of Concerns:** Category is a runtime parameter, not a code parameter

**Solution:**

```typescript
import mongoose from "mongoose"

interface IProduct {
  name: string
  price: number
  image: string
  imageId?: string
  subcategory: string
}

// Define schema once with proper type hints and validation
const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      index: true,  // Improves query performance
    },
    price: {
      type: Number,
      required: true,
      min: 0,  // Validate price is not negative
    },
    image: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
      required: false,
    },
    subcategory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,  // Adds createdAt, updatedAt automatically
  }
)

// Factory function to get model for any category
export const getProductModel = (category: string) => {
  const modelName = `${category}_Product`
  const collectionName = category.toLowerCase()
  
  // Return existing model if already registered, or create new one
  return mongoose.models[modelName] || 
         mongoose.model<IProduct>(modelName, productSchema, collectionName)
}

// Convenience exports for common categories
export const BeefProduct = getProductModel('Beef')
export const PorkProduct = getProductModel('Pork')
export const ChickenProduct = getProductModel('Chicken')
export const ProcessedProduct = getProductModel('Processed')
```

**Key Improvements:**

1. ✅ Single schema definition (DRY)
2. ✅ Proper validation (`required: true`, `min: 0`)
3. ✅ Type-safe field definitions
4. ✅ Easy to add new categories (just call `getProductModel('Fish')`)
5. ✅ Timestamps added automatically
6. ✅ Factory pattern makes it testable
7. ✅ Better performance with indexes

**Alternative: Use Payload CMS Collections Instead**

Consider this: You already have `collections/Products.ts` in Payload CMS. This Mongoose model might be redundant. 

- ✅ Use Payload's collection system as single source of truth
- ✅ Remove this file entirely if not in use
- ✅ Query via Payload API or GraphQL instead

**Acceptance Criteria:**

- [ ] Single schema definition replaces four duplicate definitions
- [ ] All fields have explicit `type` and `required` constraints
- [ ] `getProductModel()` factory works for any category
- [ ] Existing imports of `BeefProduct`, `PorkProduct`, etc. still work
- [ ] Add `ChickenProduct` usage doesn't require code changes
- [ ] Timestamps are automatically added to all documents

**File:** `models/product-models.ts`

---

**Notes for Junior Dev:**
- **Pattern Name:** This is the **Factory Pattern**—a common design pattern
- The `||` operator returns the left side if truthy, avoiding model re-registration
- `mongoose.model<IProduct>()` registers the model with TypeScript type
- Collections should be lowercase (MongoDB convention)
- Always include `timestamps: true` for auditing/sorting

**Testing Approach:**
```typescript
describe('getProductModel', () => {
  it('returns same model instance for same category', () => {
    const beef1 = getProductModel('Beef')
    const beef2 = getProductModel('Beef')
    expect(beef1).toBe(beef2)
  })
  
  it('creates model for new category', () => {
    const fish = getProductModel('Fish')
    expect(fish.modelName).toBe('Fish_Product')
  })
})
```
