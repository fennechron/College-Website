const { createClient } = require('@sanity/client');

const token = "sk8vvmQrONbz9QQHdD01B7QCvoC3r1G8awaozbbdOkS3J8oYmNcV6bUtx97pb29UhPpyOavFdiGREqtTwon9TnNx6mjQnUjSwPgrMu20KdoCkIYTFaQQMW4VduM3KrM7fS0RLrsICOhqIkYgHkJavnTu35Xp52wOfzgXgiDrMSekFulllVeE";

const client = createClient({
  projectId: 'q1p97j9m',
  dataset: 'production',
  token: token,
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function deleteChunked(ids) {
  if (ids.length === 0) return;
  const chunkSize = 50;
  for (let i = 0; i < ids.length; i += chunkSize) {
    const chunk = ids.slice(i, i + chunkSize);
    const transaction = client.transaction();
    chunk.forEach(id => transaction.delete(id));
    await transaction.commit();
    console.log(`✅ Deleted chunk ${Math.min(i + chunkSize, ids.length)}/${ids.length}`);
  }
}

async function clean() {
  try {
    // 1. Delete referencing documents first (teachers)
    console.log("🧹 Fetching referencing documents (teachers) to delete...");
    const teacherIds = await client.fetch(`*[_type == "teacher"]._id`);
    if (teacherIds.length > 0) {
      console.log(`🗑️ Deleting ${teacherIds.length} teachers...`);
      await deleteChunked(teacherIds);
    }

    // 2. Delete all other types
    console.log("🧹 Fetching referenced and other documents to delete...");
    const otherTypes = ["announcement", "eventNews", "testimonial", "downloadCategory", "placement", "recruiter", "organization", "department", "pageContent"];
    const otherIds = await client.fetch(`*[_type in $otherTypes]._id`, { otherTypes });
    if (otherIds.length > 0) {
      console.log(`🗑️ Deleting ${otherIds.length} other documents...`);
      await deleteChunked(otherIds);
    }
    
    console.log("🎉 Cleanup complete!");
  } catch (err) {
    console.error("❌ Cleanup failed:", err);
  }
}

clean();
