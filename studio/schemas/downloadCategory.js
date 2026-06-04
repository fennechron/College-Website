export default {
  name: 'downloadCategory',
  title: 'Download Category',
  type: 'document',
  fields: [
    {name: 'id', title: 'Category ID', type: 'string'},
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'description', title: 'Description', type: 'text'},

    {
      name: 'items',
      title: 'Download Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {
              name: 'file',
              title: 'Upload Document / File',
              type: 'file',
              description: 'Upload PDF, Word, or other document files here.',
            },
            {
              name: 'size', 
              title: 'Size (Optional)', 
              type: 'string',
              description: 'e.g., 1.2 MB. If left blank, size will be calculated automatically.'
            },
            {
              name: 'date', 
              title: 'Date (Optional)', 
              type: 'string',
              description: 'e.g., 2023-09-15. If left blank, it will default to the upload date.'
            },
          ],
        },
      ],
    },
  ],
}
