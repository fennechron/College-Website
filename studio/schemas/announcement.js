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
    },
    {
      name: 'pdf',
      title: 'PDF Upload',
      type: 'file',
      description: 'Upload a PDF file corresponding to this announcement/notice.',
      options: {
        accept: '.pdf'
      }
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Add a corresponding link (e.g., Google Form URL). If both PDF and Link are provided, the Link will be prioritized.',
    }
  ],
}
