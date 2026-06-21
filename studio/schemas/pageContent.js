export default {
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'The URL path identifier (e.g., fab-lab, library)',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Facilities', value: 'Facilities'},
          {title: 'Committees', value: 'Committees'},
          {title: 'Academics', value: 'Academics'},
          {title: 'Programmes', value: 'Programmes'},
          {title: 'Organizations', value: 'Organizations'},
        ],
      },
    },
    {
      name: 'image',
      title: 'Image URL',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Main Content',
      type: 'text',
    },
    {
      name: 'tabs',
      title: 'Tabs (for complex content like Library)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'tabName', title: 'Tab Name', type: 'string'},
            {name: 'tabContent', title: 'Tab Content', type: 'text'},
          ],
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of image URLs for the gallery (e.g. for FAB Lab)',
    },
    {
      name: 'downloads',
      title: 'Downloads / Files',
      type: 'array',
      description: 'List of downloadable files (e.g. for Admission or NRI section)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'pdf', title: 'PDF File', type: 'file', options: { accept: '.pdf' } }
          ]
        }
      ]
    }
  ],
}
