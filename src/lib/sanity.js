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

// In-memory cache to reduce Sanity API calls
const queryCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes TTL

const originalFetch = client.fetch.bind(client);

client.fetch = async function (query, params, options) {
  const cacheKey = JSON.stringify({ query, params });
  const cached = queryCache.get(cacheKey);

  // Return cached result if valid and within TTL
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
    return cached.data;
  }

  try {
    const result = await originalFetch(query, params, options);
    queryCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });
    return result;
  } catch (error) {
    // If the network call fails but we have cached data, fallback to stale cache
    if (cached) {
      console.warn('Sanity fetch failed. Serving stale cache fallback.', error);
      return cached.data;
    }
    throw error;
  }
};

const builder = createImageUrlBuilder(client);

/**
 * Helper function for generating resolvable image URLs from Sanity image records.
 * 
 * @param {Object} source - The image object returned from Sanity queries.
 * @returns {Object} The URL builder object used to generate the final image URL.
 */
export const urlFor = (source) => {
  return builder.image(source).format('webp');
};
