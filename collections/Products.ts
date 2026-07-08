// src/collections/Products.ts
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',           // URL-friendly identifier (used in API: /api/products)

    labels: {
        singular: 'Product',
        plural: 'Products',
    },

    admin: {
        useAsTitle: 'name',       // Which field shows as the main title in admin list / edit views
        defaultColumns: ['name', 'price', 'stock', 'updatedAt'],
        group: 'Store',           // Optional: groups this collection in the sidebar
    },

    // Important for sorting / finding products easily
    defaultSort: '-createdAt',  // or 'name' or 'price'

    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            index: true,            // speeds up searches
        },
        {
            name: 'category',
            type: 'text',
            required: true,
        },
        {
            name:'subcategory',
            type:'text',
            required:true
        },
        {
            name: 'price',
            type: 'number',
            required: true,
            min: 0,
            admin: {
                step: 0.01,           // for prices like 19.99
            },
        },
        {
            name: 'images',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',  
                    required: true,
                }
            ],
            maxRows: 10,
        },

        // Optional: featured flag for homepage / promotions
        {
            name: 'featured',
            type: 'checkbox',
            defaultValue: false,
        },
    ],

    // Optional: enable drafts + versioning (great for products)
    versions: {
        drafts: true,
    },

    // Optional: who can do what
    access: {
        read: () => true,                 // public can read products
        // create: () => true,                 // public can read products
        create: ({ req }) => !!req.user,  // only logged-in admins
        update: ({ req }) => !!req.user,
        delete: ({ req }) => !!req.user,
    },
}