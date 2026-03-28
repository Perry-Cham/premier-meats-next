import type { CollectionConfig } from 'payload'

export const ProductPages: CollectionConfig = {
    slug: 'productpage',

    admin: {
        useAsTitle: 'category',       // Which field shows as the main title in admin list / edit views
        defaultColumns: ['category'],
        group: 'Store',           // Optional: groups this collection in the sidebar
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'category',
            type: 'text',
            required: true,
            index: true,
            unique: true
        },

        {
            name: 'content',
            type: 'richText',
            required: true,
        },

    ]
}