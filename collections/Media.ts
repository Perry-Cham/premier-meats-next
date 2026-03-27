import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      // required: true,
      hooks: {
        beforeChange: [({ data, value }): string => {
          if (!value) {
            const title = data.filename.split()[0];
            return title;
          } else return value
        }]
      }
    },
  ],
  upload: true,
}
