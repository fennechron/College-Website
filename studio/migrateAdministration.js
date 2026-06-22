import { getCliClient } from 'sanity/cli';

const client = getCliClient();

const generateKey = () => Math.random().toString(36).substring(2, 10);

const staffMembers = [
    { name: "Smt. Asha K Pillai", designation: "Senior Superintendent" },
    { name: "Smt. Danley Mary Johnson", designation: "Senior Superintendent" },
    { name: "Sri. Anoop Raj T V", designation: "Junior Superintendent" },
    { name: "Sri. Manoj K Mathew", designation: "Junior Superintendent" },
    { name: "Smt. Priya N Peethambar", designation: "Head Clerk" },
    { name: "Smt. Lekshmi Rani R", designation: "Head Clerk" },
    { name: "Smt. Manjusha Devi N P", designation: "Senior Office Assistant" },
    { name: "Sri. Dhananjayan P V", designation: "Office Assistant" },
    { name: "Smt. Reshmi Raj K R", designation: "Technical Store Keeper" },
    { name: "Smt. Niza N", designation: "Office Assistant" },
    { name: "Smt. Smitha K R", designation: "Office Assistant" },
    { name: "Smt. Aswathy U", designation: "Office Assistant" },
    { name: "Smt. Renjini S", designation: "Data Entry Operator" },
    { name: "Smt. Sheeba George", designation: "Data Entry Operator" },
    { name: "Smt. Vidya Vijayan", designation: "Data Entry Operator" },
    { name: "Sri. Suresh Kumar N", designation: "Watcher/Peon" },
    { name: "Smt. Suja Kumari V R", designation: "Peon/Sweeper" },
    { name: "Sri. Asharaf A", designation: "Watcher/Peon" },
    { name: "Sri. Lathesh Kumar P A", designation: "Watcher/Peon" },
    { name: "Sri. G Suresh Kumar", designation: "Security Guard" },
    { name: "Sri. Raghunathan N G", designation: "Security Guard" },
    { name: "Sri. Manoj K R", designation: "Security Guard" },
    { name: "Sri. Muraleedharan Pillai", designation: "Security Guard" }
];

const calendarEventsData = {
    "2026-05-12": { title: "Staff Development Program", desc: "Training session on E-Governance and office automation software in the Seminar Hall.", time: "10:00 AM", type: "Training" },
    "2026-05-20": { title: "Monthly Administrative Review", desc: "All section heads to present progress on academic registration audits.", time: "02:00 PM", type: "Meeting" },
    "2026-05-25": { title: "Fee Submission Deadline", desc: "Last date for submitting B.Tech S4 & S6 tuition fees without fine.", time: "04:00 PM", type: "Deadline" },
    "2026-05-29": { title: "Internal Academic & Audit Committee", desc: "Audit and verification of stock registers and academic documents.", time: "09:30 AM", type: "Audit" },
    "2026-06-03": { title: "Administrative Board Council", desc: "Annual strategic meeting chaired by the Principal and Governing Board representatives.", time: "11:00 AM", type: "Meeting" },
    "2026-06-12": { title: "Tech-Fest Budget Planning", desc: "Financial planning meeting for the upcoming national level tech-fest.", time: "03:00 PM", type: "Planning" },
    "2026-06-18": { title: "Public Holiday", desc: "State Festival - Administrative office closed.", time: "All Day", type: "Holiday" }
};

const recentPosts = [
    {
        date: "May 18, 2026",
        category: "Announcements",
        title: "Extension of Admission Registration for B.Tech & MCA 2026",
        summary: "The last date for submitting online applications for management and NRI seat registrations has been extended to May 30, 2026 due to numerous requests.",
        readTime: "2 min read",
        link: "/page/downloads"
    },
    {
        date: "May 15, 2026",
        category: "Scholarships",
        title: "MCM Scholarship Applications for EWS Students open",
        summary: "Eligible B.Tech students are instructed to submit their Merit-cum-Means scholarship applications with income and community certificates to the administrative desk.",
        readTime: "3 min read",
        link: "/page/downloads"
    },
    {
        date: "May 10, 2026",
        category: "Logistics",
        title: "Revised College Bus Route & Timings for Summer Term",
        summary: "Bus route No. 3 (via Chengannur Railway Station) has been updated with a new early departure schedule. Click to view the revised boarding points and time charts.",
        readTime: "1 min read",
        link: "/page/downloads"
    }
];

async function run() {
    console.log("Starting Administration Migration...");

    // Format data to match schema structure with _keys
    const formattedStaff = staffMembers.map(staff => ({
        ...staff,
        _key: generateKey()
    }));

    const formattedEvents = Object.entries(calendarEventsData).map(([dateKey, event]) => ({
        _key: generateKey(),
        dateKey,
        ...event
    }));

    const formattedPosts = recentPosts.map(post => ({
        ...post,
        _key: generateKey()
    }));

    const adminDoc = {
        _type: 'administration',
        staffMembers: formattedStaff,
        calendarEvents: formattedEvents,
        recentPosts: formattedPosts
    };

    console.log("Checking for existing Administration document...");
    const existing = await client.fetch(`*[_type == "administration"][0]`);

    if (existing) {
        console.log(`Administration document exists (${existing._id}). Updating...`);
        await client.patch(existing._id).set(adminDoc).commit();
    } else {
        console.log("Creating new Administration document...");
        await client.create(adminDoc);
    }
    
    console.log("\n✅ Administration Migration complete!");
}

run().catch(console.error);
