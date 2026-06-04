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
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}
