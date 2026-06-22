export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'aboutUs',
      title: 'About Us Section',
      type: 'object',
      fields: [
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: Rule => Rule.required()
        },
        {
          name: 'vision',
          title: 'Vision',
          type: 'text',
          validation: Rule => Rule.required()
        },
        {
          name: 'mission',
          title: 'Mission Points',
          type: 'array',
          of: [{ type: 'string' }],
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'placementSection',
      title: 'Placement Section',
      type: 'object',
      fields: [
        {
          name: 'recruiters',
          title: 'Recruiters',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Company Name', type: 'string' },
                { name: 'logo', title: 'Logo', type: 'image' }
              ]
            }
          ]
        },
        {
          name: 'stats',
          title: 'Placement Stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'value', title: 'Value', type: 'string' },
                { name: 'icon', title: 'Icon (lucide-react name)', type: 'string' }
              ]
            }
          ]
        },
        {
          name: 'placementGallery',
          title: 'Placement Photo Gallery (Sliding)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'year', title: 'Year (e.g., 2025)', type: 'string', validation: Rule => Rule.required() },
                { name: 'image', title: 'Group Photo', type: 'image', validation: Rule => Rule.required(), options: { hotspot: true } }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'achievements',
      title: 'Achievements Carousel',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'subtitle', title: 'Subtitle', type: 'string' },
            { name: 'image', title: 'Image', type: 'image' }
          ]
        }
      ]
    },
    {
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Image', type: 'image' },
            { name: 'altText', title: 'Alt Text', type: 'string' }
          ]
        }
      ]
    }
  ]
}
