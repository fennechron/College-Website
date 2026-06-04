export default {
  name: 'announcement',
  title: 'Announcement / Notice',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text / Content',
      type: 'text',
      description: 'The content of the announcement or notice.',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Announcements', value: 'Announcements' },
          { title: 'Notifications', value: 'Notifications' },
          { title: 'Notice Board', value: 'Notice Board' },
        ],
      },
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'Used for sorting.',
    }
  ],
}
