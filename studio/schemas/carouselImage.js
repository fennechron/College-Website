export default {
  name: 'carouselImage',
  title: 'Carousel Image',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional headline text over the slide',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional supporting text below the headline',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Sorting order (lowest first)',
    },
  ],
}
