import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: 'q1p97j9m', // From user
  dataset: 'production',
  useCdn: true, // Use CDN for faster read responses
  apiVersion: '2023-05-03', // Use current date for latest API version
});

const builder = createImageUrlBuilder(client);

// Helper function for generating image URLs from Sanity image records
export const urlFor = (source) => {
  return builder.image(source);
};
