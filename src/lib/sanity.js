import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

/**
 * Sanity Client Configuration.
 * 
 * Connects the React application to the Sanity CMS backend to fetch dynamic content.
 * The `projectId` and `dataset` must match the deployed Sanity studio configuration.
 */
export const client = createClient({
  projectId: 'q1p97j9m', // From user
  dataset: 'production',
  useCdn: false, // Use direct API to avoid cache delays
  apiVersion: '2023-05-03', // Use current date for latest API version
});

const builder = createImageUrlBuilder(client);

/**
 * Helper function for generating resolvable image URLs from Sanity image records.
 * 
 * @param {Object} source - The image object returned from Sanity queries.
 * @returns {Object} The URL builder object used to generate the final image URL.
 */
export const urlFor = (source) => {
  return builder.image(source);
};
