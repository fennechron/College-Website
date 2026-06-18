import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'q1p97j9m',
  dataset: 'production',
  useCdn: false, // Let's check without CDN
  apiVersion: '2023-05-03',
});

async function run() {
    const data = await client.fetch(`*[_type == "principal"]`);
    console.log(JSON.stringify(data, null, 2));
}

run();
