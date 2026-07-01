export default {
  name: 'campusLife',
  title: 'Campus Life Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Campus Life',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'facilities',
      title: 'Recreation Facilities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'iconName', title: 'Lucide Icon Name', type: 'string', description: 'e.g., Trophy, Target, Users, Coffee' },
            { name: 'colSpan', title: 'Grid Column Span', type: 'string', description: 'e.g., col-span-1 md:col-span-2' },
            { name: 'rowSpan', title: 'Grid Row Span', type: 'string', description: 'e.g., row-span-1' }
          ]
        }
      ]
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'desc', title: 'Description', type: 'text' },
            { name: 'iconName', title: 'Lucide Icon Name', type: 'string', description: 'e.g., Music, Users, BookOpen' }
          ]
        }
      ]
    },
    {
      name: 'events',
      title: 'Major Events',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Event Title', type: 'string' },
            { name: 'category', title: 'Category', type: 'string' },
            { name: 'date', title: 'Date String', type: 'string', description: 'e.g., March 2026' },
            { name: 'image', title: 'Event Cover Image', type: 'image', options: { hotspot: true } },
            { name: 'span', title: 'Grid Span', type: 'string', description: 'e.g., md:col-span-2 md:row-span-2' },
            { 
              name: 'gallery', 
              title: 'Event Photo Gallery', 
              type: 'array', 
              of: [{ type: 'image', options: { hotspot: true } }],
              description: 'Additional photos from the event to show when clicked.'
            }
          ]
        }
      ]
    }
  ]
}
