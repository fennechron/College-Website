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
  useCdn: true, // Public content can use Sanity's cached delivery endpoint.
  apiVersion: '2023-05-03', // Use current date for latest API version
});

// In-memory cache to reduce Sanity API calls
const queryCache = new Map();
const pendingQueries = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes TTL

const originalFetch = client.fetch.bind(client);

client.fetch = async function (query, params, options) {
  const cacheKey = JSON.stringify({ query, params, useCdn: options?.useCdn });
  const cached = queryCache.get(cacheKey);

  // Return cached result if valid, within TTL, and ignoreCache is not set
  if (!options?.ignoreCache && options?.useCdn !== false && cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
    return cached.data;
  }

  // Share identical requests while they are loading, including StrictMode mounts.
  // Requests with their own cancellation signal or an explicit refresh stay separate.
  const shareRequest = !options?.ignoreCache && !options?.signal;
  if (shareRequest && pendingQueries.has(cacheKey)) return pendingQueries.get(cacheKey);

  const request = (async () => {
    try {
      const requestOptions = options?.ignoreCache ? { ...options, useCdn: false } : options;
      const result = await originalFetch(query, params, requestOptions);
      queryCache.set(cacheKey, { data: result, timestamp: Date.now() });
      return result;
    } catch (error) {
      // Retain the last successful response when content delivery is unavailable.
      if (cached) {
        console.warn('Sanity fetch failed. Serving stale cache fallback.', error);
        return cached.data;
      }
      throw error;
    }
  })();
  if (shareRequest) pendingQueries.set(cacheKey, request);
  try {
    return await request;
  } finally {
    if (pendingQueries.get(cacheKey) === request) pendingQueries.delete(cacheKey);
  }
};

export const fetchHomePage = () => client.fetch(`*[_type == "homePage"][0]{ aboutUs, placementSection, achievements, gallery }`);

const builder = createImageUrlBuilder(client);

/**
 * Helper function for generating resolvable image URLs from Sanity image records.
 * 
 * @param {Object} source - The image object returned from Sanity queries.
 * @returns {Object} The URL builder object used to generate the final image URL.
 */
export const urlFor = (source) => {
  return builder.image(source).width(1600).fit('max').quality(85).format('webp');
};

// Some CMS projections return image URLs instead of asset objects. Apply the
// same delivery settings to those images while preserving other URL providers.
export const optimizedImageUrl = (source, width = 1600) => {
  if (typeof source !== 'string' || !source.startsWith('https://cdn.sanity.io/images/')) return source;
  const url = new URL(source);
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', '85');
  url.searchParams.set('fit', 'max');
  url.searchParams.set('fm', 'webp');
  return url.toString();
};
