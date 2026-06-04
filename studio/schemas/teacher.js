export default {
  name: 'teacher',
  title: 'Teacher',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'department',
      title: 'Department',
      type: 'reference',
      to: [{type: 'department'}],
    },
    {
      name: 'isHOD',
      title: 'Is Head of Department?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'designation',
      title: 'Designation',
      type: 'string',
      description: 'e.g., Assistant Professor',
    },
    {
      name: 'specialization',
      title: 'Specialization',
      type: 'string',
    },
    {
      name: 'qualification',
      title: 'Qualification',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'staffRoom',
      title: 'Staff Room',
      type: 'string',
    },
    {
      name: 'experience',
      title: 'Experience',
      type: 'string',
      description: 'e.g., 10 Years',
    },
    {
      name: 'photo',
      title: 'Teacher Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload a square photo (1:1) or use the crop tool after uploading. If left blank, UI Avatar will be generated.',
    },
    {
      name: 'about',
      title: 'About (Paragraphs)',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'wordFromTeacher',
      title: 'Word From Teacher',
      type: 'text',
    },
    {
      name: 'publications',
      title: 'Publications',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of academic publications/papers published by this teacher',
    },
  ],
}
