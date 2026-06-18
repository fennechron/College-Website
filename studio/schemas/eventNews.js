export default {
  name: 'eventNews',
  title: 'Event & News',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Event', value: 'EVENT' },
          { title: 'News', value: 'NEWS' },
        ],
      },
    },
    {
      name: 'date',
      title: 'Display Date (e.g. 15 OCT 2025)',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Event/News Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'Brief summary for the card',
    },
    {
      name: 'actionType',
      title: 'Action Type',
      type: 'string',
      options: {
        list: [
          { title: 'Open Link', value: 'link' },
          { title: 'Show Content Details', value: 'content' },
        ],
      },
      initialValue: 'link',
      description: 'What happens when "Read More" is clicked?',
    },
    {
      name: 'linkUrl',
      title: 'Link URL',
      type: 'url',
      hidden: ({ document }) => document?.actionType !== 'link',
    },
    {
      name: 'content',
      title: 'Event/News Details',
      type: 'text',
      description: 'Full details to show on the separate page',
      hidden: ({ document }) => document?.actionType !== 'content',
    },
  ],
}
