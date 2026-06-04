const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const token = "sk8vvmQrONbz9QQHdD01B7QCvoC3r1G8awaozbbdOkS3J8oYmNcV6bUtx97pb29UhPpyOavFdiGREqtTwon9TnNx6mjQnUjSwPgrMu20KdoCkIYTFaQQMW4VduM3KrM7fS0RLrsICOhqIkYgHkJavnTu35Xp52wOfzgXgiDrMSekFulllVeE";
if (!token) {
  console.error("❌ ERROR: Please provide SANITY_WRITE_TOKEN environment variable.");
  console.error("Example: SANITY_WRITE_TOKEN=your_token node migrate-to-sanity.js");
  process.exit(1);
}

const client = createClient({
  projectId: 'q1p97j9m',
  dataset: 'production',
  token: token,
  useCdn: false,
  apiVersion: '2023-05-03',
});

// Helper to slugify strings for deterministic IDs
function slugify(text) {
  if (!text) return 'id-' + Math.random().toString(36).substring(2, 9);
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

// Helper to eval ESM mock data files as CJS
function loadMockData(filePath, varName) {
  const absolutePath = path.resolve(__dirname, filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return null;
  }
  const content = fs.readFileSync(absolutePath, 'utf8');
  // Simple regex replacement to export the variable and strip React imports
  const cjsContent = content
    .replace(/export const/g, 'exports.')
    .replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, '') // strip imports
    .replace(/const avatar =[\s\S]*?;/, 'const avatar = (name) => null;'); // nullify avatar URLs to let frontend generate UI Avatars

  const tempFile = path.join(__dirname, 'temp-' + path.basename(filePath));
  fs.writeFileSync(tempFile, cjsContent, 'utf8');
  try {
    const data = require(tempFile)[varName];
    return data;
  } catch (err) {
    console.error(`❌ Failed to require parsed file ${filePath}:`, err);
    return null;
  } finally {
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  }
}

async function run() {
  console.log("🚀 Starting Sanity Data Migration with Deterministic IDs...");

  try {
    // 1. Notice Board / Announcements
    console.log("📋 Migrating Announcements and Notice Board...");
    const announcements = [
      { text: "New Result - B.Tech S6 (S) Exam, November 2025 (2022 Scheme)", category: "Announcements" },
      { text: "New Result - B.Tech S1 (R) Exam, December 2025 (2023 Scheme)", category: "Announcements" },
      { text: "Registration open for Annual Technical Fest 2025", category: "Announcements" },
      { text: "Notification regarding odd semester fee payment", category: "Announcements" },
      { text: "Guidelines for B.Tech Honors Registration published", category: "Announcements" },
    ];
    const upcomingEvents = [
      { text: "» College of Engineering Chengannur is organizing the National Conference on Emerging Technologies from 19th to 21st December 2025.", category: "Notifications" },
      { text: "» The Department of Computer Science is organizing a Six-day AICTE Training and Learning (ATAL) Online Faculty Development Programme.", category: "Notifications" },
      { text: "» Annual Techfest 'Drishti 2025' dates announced.", category: "Notifications" },
    ];
    const notices = [
      { text: "» The 7th International Conference on Modelling and Simulation", category: "Notice Board" },
      { text: "» Summer internship program - Computer Science Dept", category: "Notice Board" },
      { text: "» Internship on Optical Communication Design with Opticystem", category: "Notice Board" },
      { text: "» Workshop on Advanced AI and Machine Learning", category: "Notice Board" },
    ];

    for (const a of [...announcements, ...upcomingEvents, ...notices]) {
      const docId = `announcement-${slugify(a.text.substring(0, 40))}`;
      await client.createOrReplace({
        _id: docId,
        _type: 'announcement',
        text: a.text,
        category: a.category,
        date: new Date().toISOString(),
      });
    }
    console.log("✅ Announcements migrated successfully.");

    // 2. Events & News
    console.log("📅 Migrating Events and News...");
    const eventsNews = [
      { 
        date: "15 OCT 2025", 
        type: "EVENT", 
        title: "International Conference on AI & ML", 
        description: "A 3-day deep dive into Artificial Intelligence with global keynote speakers and industry experts." 
      },
      { 
        date: "10 OCT 2025", 
        type: "NEWS", 
        title: "CEC Alumnus Receives Prestigious R&D Award", 
        description: "Our alumni from the 2018 batch recognized for their pioneering work in sustainable energy solutions." 
      },
      { 
        date: "05 OCT 2025", 
        type: "EVENT", 
        title: "Annual Sports Meet 'AARAMBH' 2025", 
        description: "The annual inter-collegiate sports championship returns. Register your teams by Oct 3rd." 
      },
      { 
        date: "01 OCT 2025", 
        type: "NEWS", 
        title: "New Advanced Robotics Lab Inaugurated", 
        description: "A state-of-the-art facility for research in Automated Systems and IOT, funded by IHRD." 
      }
    ];

    for (const item of eventsNews) {
      const docId = `eventnews-${slugify(item.title)}`;
      await client.createOrReplace({
        _id: docId,
        _type: 'eventNews',
        title: item.title,
        type: item.type,
        date: item.date,
        description: item.description,
      });
    }
    console.log("✅ Events and News migrated successfully.");

    // 3. Testimonials
    console.log("💬 Migrating Testimonials...");
    const testimonials = [
      {
        name: "Dr. APJ Abdul Kalam",
        role: "Former President of India",
        image: "https://i.pravatar.cc/150?img=11",
        quote: "The students of CEC display an extraordinary capacity for innovation and futuristic thinking."
      },
      {
        name: "Sarah Jenkins",
        role: "Director of Engineering, TechCorp",
        image: "https://i.pravatar.cc/150?img=5",
        quote: "The alumni we've hired from this institution have consistently pushed the boundaries of what's possible."
      },
      {
        name: "David Chen",
        role: "Startup Founder",
        image: "https://i.pravatar.cc/150?img=12",
        quote: "Exceptional talent pool. The practical, future-ready skills taught here are transforming the industry."
      },
      {
        name: "Dr. Maya Patel",
        role: "Lead Researcher, AI Institute",
        image: "https://i.pravatar.cc/150?img=9",
        quote: "A beacon of technological advancement. The campus environment perfectly nurtures out-of-the-box ideas."
      }
    ];

    for (const t of testimonials) {
      const docId = `testimonial-${slugify(t.name)}`;
      await client.createOrReplace({
        _id: docId,
        _type: 'testimonial',
        name: t.name,
        role: t.role,
        image: t.image,
        quote: t.quote,
      });
    }
    console.log("✅ Testimonials migrated successfully.");

    // 4. Download Categories
    console.log("📂 Migrating Downloads...");
    const downloadCategories = loadMockData('src/data/downloadsData.js', 'downloadCategories');
    if (downloadCategories) {
      for (const cat of downloadCategories) {
        const docId = `downloadcategory-${slugify(cat.id)}`;
        await client.createOrReplace({
          _id: docId,
          _type: 'downloadCategory',
          id: cat.id,
          title: cat.title,
          description: cat.description,
          items: (cat.items || []).map((item, idx) => ({
            _key: `download-item-${idx}`,
            title: item.title,
            size: item.size,
            date: item.date,
          }))
        });
      }
      console.log("✅ Downloads migrated successfully.");
    }

    // 5. Placements & Recruiters
    console.log("🎓 Migrating Placements...");
    const placementStats = loadMockData('src/data/placementData.js', 'placementStats');
    const topRecruiters = loadMockData('src/data/placementData.js', 'topRecruiters');

    if (placementStats) {
      for (const stat of placementStats) {
        const docId = `placement-${slugify(stat.year)}`;
        await client.createOrReplace({
          _id: docId,
          _type: 'placement',
          year: stat.year,
          offers: Number(stat.offers),
          highest: stat.highest,
          average: stat.average,
        });
      }
    }
    if (topRecruiters) {
      for (const rec of topRecruiters) {
        const docId = `recruiter-${slugify(rec.name)}`;
        await client.createOrReplace({
          _id: docId,
          _type: 'recruiter',
          name: rec.name,
          logo: rec.logo,
        });
      }
    }
    console.log("✅ Placements migrated successfully.");

    // 6. Organizations
    console.log("🏫 Migrating Organizations...");
    const organizationsData = loadMockData('src/data/organizationsData.js', 'organizationsData');
    if (organizationsData) {
      for (const [key, org] of Object.entries(organizationsData)) {
        const docId = `org-${slugify(key)}`;
        await client.createOrReplace({
          _id: docId,
          _type: 'organization',
          slug: { _type: 'slug', current: key },
          name: org.name,
          fullName: org.fullName,
          founded: org.founded,
          mainImage: org.mainImage,
          logo: org.logo,
          website: org.website,
          description: org.description || [],
          stats: (org.stats || []).map((s, idx) => ({
            _key: `stat-item-${idx}`,
            label: s.label,
            value: s.value,
          })),
          gallery: org.gallery || [],
          activities: org.activities || [],
        });
      }
      console.log("✅ Organizations migrated successfully.");
    }

    // 7. Page Content
    console.log("📄 Migrating Page Content...");
    const pageContent = loadMockData('src/data/pageContent.js', 'pageContent');
    if (pageContent) {
      for (const [key, content] of Object.entries(pageContent)) {
        const docId = `pagecontent-${slugify(key)}`;
        const tabs = Object.entries(content.tabs || {}).map(([tabName, tabContent], idx) => ({
          _key: `tab-item-${idx}`,
          tabName,
          tabContent
        }));

        await client.createOrReplace({
          _id: docId,
          _type: 'pageContent',
          slug: { _type: 'slug', current: key },
          title: content.title,
          category: content.category,
          image: content.image,
          content: content.content,
          tabs: tabs.length > 0 ? tabs : undefined,
        });
      }
      console.log("✅ Page Content migrated successfully.");
    }

    // 8. Departments & Teachers
    console.log("👩‍🏫 Migrating Departments & Teachers...");
    const teachersData = loadMockData('src/data/teachersData.js', 'teachersData');
    if (teachersData) {
      // B.Tech
      for (const [key, value] of Object.entries(teachersData.btech.departments)) {
        const deptId = `dept-${slugify(value.short)}`;
        const deptDoc = {
          _id: deptId,
          _type: 'department',
          name: value.label,
          short: value.short,
          color: value.color,
          accentColor: value.accentColor,
        };
        await client.createOrReplace(deptDoc);

        // HOD
        if (value.hod && value.hod.name) {
          const teacherId = `teacher-${slugify(value.hod.name)}`;
          await client.createOrReplace({
            _id: teacherId,
            _type: 'teacher',
            name: value.hod.name,
            designation: value.hod.designation,
            specialization: value.hod.specialization,
            qualification: value.hod.qualification,
            email: value.hod.email,
            phone: value.hod.phone,
            staffRoom: value.hod.staffRoom,
            experience: value.hod.experience,
            about: value.hod.about || [],
            wordFromTeacher: value.hod.wordFromTeacher,
            publications: value.hod.publications || [],
            isHOD: true,
            department: { _type: 'reference', _ref: deptId }
          });
        }

        // Faculty
        for (const faculty of (value.faculty || [])) {
          const teacherId = `teacher-${slugify(faculty.name)}`;
          await client.createOrReplace({
            _id: teacherId,
            _type: 'teacher',
            name: faculty.name,
            designation: faculty.designation,
            specialization: faculty.specialization,
            qualification: faculty.qualification,
            email: faculty.email,
            phone: faculty.phone,
            staffRoom: faculty.staffRoom,
            experience: faculty.experience,
            about: faculty.about || [],
            wordFromTeacher: faculty.wordFromTeacher,
            publications: faculty.publications || [],
            isHOD: false,
            department: { _type: 'reference', _ref: deptId }
          });
        }
      }

      // MCA
      const mcaData = teachersData.mca;
      const mcaDeptId = 'dept-mca';
      const mcaDeptDoc = {
        _id: mcaDeptId,
        _type: 'department',
        name: 'Master of Computer Applications (MCA)',
        short: 'MCA',
        color: '#4A235A',
        accentColor: '#6C3483',
      };
      await client.createOrReplace(mcaDeptDoc);

      // MCA HOD
      if (mcaData.hod && mcaData.hod.name) {
        const teacherId = `teacher-${slugify(mcaData.hod.name)}`;
        await client.createOrReplace({
          _id: teacherId,
          _type: 'teacher',
          name: mcaData.hod.name,
          designation: mcaData.hod.designation,
          specialization: mcaData.hod.specialization,
          qualification: mcaData.hod.qualification,
          email: mcaData.hod.email,
          phone: mcaData.hod.phone,
          staffRoom: mcaData.hod.staffRoom,
          experience: mcaData.hod.experience,
          about: mcaData.hod.about || [],
          wordFromTeacher: mcaData.hod.wordFromTeacher,
          publications: mcaData.hod.publications || [],
          isHOD: true,
          department: { _type: 'reference', _ref: mcaDeptId }
        });
      }

      // MCA Faculty
      for (const faculty of (mcaData.faculty || [])) {
        const teacherId = `teacher-${slugify(faculty.name)}`;
        await client.createOrReplace({
          _id: teacherId,
          _type: 'teacher',
          name: faculty.name,
          designation: faculty.designation,
          specialization: faculty.specialization,
          qualification: faculty.qualification,
          email: faculty.email,
          phone: faculty.phone,
          staffRoom: faculty.staffRoom,
          experience: faculty.experience,
          about: faculty.about || [],
          wordFromTeacher: faculty.wordFromTeacher,
          publications: faculty.publications || [],
          isHOD: false,
          department: { _type: 'reference', _ref: mcaDeptId }
        });
      }
      console.log("✅ Departments and Teachers migrated successfully.");
    }

    // 9. Carousel Images
    console.log("🖼️ Migrating Carousel Images...");
    const carouselImages = [
      {
        fileName: 'cec11.jpeg',
        title: '',
        subtitle: '',
        order: 1
      },
      {
        fileName: 'cec12.jpg',
        title: 'College of Engineering Chengannur',
        subtitle: 'Vision & Mission',
        order: 2
      },
      {
        fileName: 'cec14.jpeg',
        title: '',
        subtitle: '',
        order: 3
      },
      {
        fileName: 'cec15.webp',
        title: '',
        subtitle: '',
        order: 4
      }
    ];

    for (const item of carouselImages) {
      const filePath = path.resolve(__dirname, 'src/assets', item.fileName);
      let assetRef = null;
      if (fs.existsSync(filePath)) {
        console.log(`Uploading carousel image: ${item.fileName}...`);
        const fileStream = fs.createReadStream(filePath);
        const asset = await client.assets.upload('image', fileStream, {
          filename: item.fileName
        });
        assetRef = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset.id || asset._id
          }
        };
      } else {
        console.warn(`⚠️ Warning: Carousel image file not found: ${filePath}`);
      }

      const docId = `carousel-${slugify(item.fileName)}`;
      await client.createOrReplace({
        _id: docId,
        _type: 'carouselImage',
        image: assetRef || undefined,
        title: item.title,
        subtitle: item.subtitle,
        order: item.order
      });
    }
    console.log("✅ Carousel Images migrated successfully.");

    console.log("🎉 ALL MOCK DATA MIGRATED TO SANITY SUCCESSFULLY!");

  } catch (error) {
    console.error("❌ Migration failed with error:", error);
  }
}

run();
