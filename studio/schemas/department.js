export default {
  name: 'department',
  title: 'Department',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'e.g., Computer Science & Engineering (CS)',
    },
    {
      name: 'short',
      title: 'Short Name',
      type: 'string',
      description: 'e.g., CS',
    },
    {
      name: 'color',
      title: 'Primary Color',
      type: 'string',
      description: 'Hex code, e.g., #0C2B4E',
    },
    {
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      description: 'Hex code, e.g., #1D546C',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'heroImage',
      title: 'Hero Image URL',
      type: 'string',
      description: 'URL for the department header background image',
    },
    {
      name: 'founded',
      title: 'Year Founded',
      type: 'string',
      description: 'e.g. 1993',
    },
    {
      name: 'stats',
      title: 'Key Statistics',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Value', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' }
        ]
      }]
    },
    {
      name: 'overview',
      title: 'Department Overview',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item represents a paragraph',
    },
    {
      name: 'vision',
      title: 'Vision',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'mission',
      title: 'Mission',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'programmes',
      title: 'Programmes Offered',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Programme Name', type: 'string' },
          { name: 'duration', title: 'Duration', type: 'string' }
        ]
      }]
    },
    {
      name: 'peos',
      title: 'Program Educational Objectives (PEOs)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'psos',
      title: 'Program Specific Outcomes (PSOs)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'programName', title: 'Program Name', type: 'string' },
          { name: 'outcomes', title: 'Outcomes', type: 'array', of: [{ type: 'string' }] }
        ]
      }]
    },
    {
      name: 'labsExtended',
      title: 'Laboratory Facilities',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'technicalStaff',
      title: 'Technical Staff',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'designation', title: 'Designation', type: 'string' }
        ]
      }]
    }
  ],
}
