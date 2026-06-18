export default {
  name: 'principal',
  title: 'Principal',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'designation',
      title: 'Designation',
      type: 'string',
      initialValue: 'Principal',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
    },
    {
      name: 'qualifications',
      title: 'Academic Qualifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: 'Year', type: 'string' },
            { name: 'degree', title: 'Degree', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'professionalDetails',
      title: 'Professional Details',
      type: 'object',
      fields: [
        {
          name: 'expertise',
          title: 'Expertise',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'desc', title: 'Description', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'positions',
          title: 'Positions',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'desc', title: 'Description', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'publications',
          title: 'Publications',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'desc', title: 'Description', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'research',
          title: 'Research',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'desc', title: 'Description', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'industry',
          title: 'Industry',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'desc', title: 'Description', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'books',
          title: 'Books',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'desc', title: 'Description', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
