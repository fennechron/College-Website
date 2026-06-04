export default {
  name: 'organization',
  title: 'Organization',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug (ID)',
      type: 'slug',
      options: {source: 'name'},
    },
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'fullName', title: 'Full Name', type: 'string'},
    {name: 'founded', title: 'Founded', type: 'string'},
    {name: 'mainImage', title: 'Main Image URL', type: 'string'},
    {name: 'logo', title: 'Logo Text/Image', type: 'string'},
    {name: 'website', title: 'Website URL', type: 'url'},
    {
      name: 'description',
      title: 'Description (Paragraphs)',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string'},
            {name: 'value', type: 'string'},
          ],
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Gallery Image URLs',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'activities',
      title: 'Activities / Ethics',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
}
