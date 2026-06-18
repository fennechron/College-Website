export default {
  name: 'committee',
  title: 'Committee',
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
      description: 'The URL path identifier (e.g., parents-teachers, right-to-info)',
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
      initialValue: 'Committees',
      readOnly: true,
      description: 'Categorization is fixed to Committees for this schema.',
    },
    {
      name: 'content',
      title: 'Main Content',
      type: 'text',
    },
  ],
}
