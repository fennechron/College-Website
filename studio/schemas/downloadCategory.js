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
              name: 'fileSource',
              title: 'Document source',
              type: 'string',
              options: {
                list: [
                  {title: 'Upload a file', value: 'file'},
                  {title: 'Use an external URL', value: 'url'},
                ],
                layout: 'radio',
              },
              initialValue: 'file',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'file',
              title: 'Upload Document / File',
              type: 'file',
              description: 'Upload PDF, Word, or other document files here.',
              hidden: ({parent}) => parent?.fileSource === 'url',
              validation: (Rule) => Rule.custom((value, context) => {
                if (context.parent?.fileSource === 'file' && !value) {
                  return 'Upload a file or choose “Use an external URL”.'
                }
                return true
              }),
            },
            {
              name: 'externalUrl',
              title: 'External file URL',
              type: 'url',
              description: 'Paste the direct URL to the document or download file.',
              hidden: ({parent}) => parent?.fileSource !== 'url',
              validation: (Rule) => Rule.custom((value, context) => {
                if (context.parent?.fileSource === 'url' && !value) {
                  return 'Enter a file URL or choose “Upload a file”.'
                }
                return true
              }),
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
