export default {
  name: 'placement',
  title: 'Placement Statistics',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'Placement Year',
      type: 'string',
      description: 'e.g., "2025"',
      validation: Rule => Rule.required(),
    },
    {
      name: 'totalOffers',
      title: 'Total Offers',
      type: 'number',
      description: 'Total number of offers made this year',
      validation: Rule => Rule.required(),
    },
    {
      name: 'highestPackage',
      title: 'Highest Package',
      type: 'string',
      description: 'Highest package offered this year (e.g., "32 LPA")',
      validation: Rule => Rule.required(),
    },
    {
      name: 'csvFile',
      title: 'Company-wise Statistics (CSV File)',
      type: 'file',
      description: 'Upload a .csv file with columns: Company, Offers. The Color column is completely optional (it will be auto-generated).',
      options: {
        accept: '.csv',
      },
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'year',
      subtitle: 'totalOffers',
    },
    prepare({ title, subtitle }) {
      return {
        title: `Placement Year: ${title}`,
        subtitle: `${subtitle} Offers`,
      }
    },
  },
}
