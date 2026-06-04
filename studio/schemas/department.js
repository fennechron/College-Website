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

  ],
}
