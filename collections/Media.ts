import type { CollectionConfig } from 'payload'
import { createTitle } from './utils';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,                 // public can read products
    create: ({ req }) => !!req.user,  // only logged-in admins
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      hooks: {
        beforeChange: [({ data, value }): string => {
          if (!value) {
            return createTitle(data.filename);
          } else return value
        }]
      }
    },
  ],
  upload: true,
}

