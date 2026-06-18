export default {
  name: 'organization',
  title: 'Organization',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Short Name / Acronym',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'orgCategory' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: Rule => Rule.required()
    },
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'founded',
      title: 'Founded / Established Date',
      type: 'string'
    },
    {
      name: 'mainImage',
      title: 'Main Hero Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'website',
      title: 'Website URL',
      type: 'url'
    },
    {
      name: 'facultyInCharge',
      title: 'Faculty in Charge',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'activities',
      title: 'Major Activities',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'ethics',
      title: 'Professional Ethics',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'date', title: 'Date / Period', type: 'string' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
          ]
        }
      ]
    },
    {
      name: 'gallery',
      title: 'Moment Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
          ]
        }
      ]
    }
  ]
}
