import { getCliClient } from 'sanity/cli';

const client = getCliClient();

const generateKey = () => Math.random().toString(36).substring(2, 10);

const proddecData = {
    _type: 'organization',
    name: 'PRODDEC',
    slug: { _type: 'slug', current: 'proddec' },
    fullName: 'Product Design and Development Centre',
    founded: '1995',
    website: 'https://www.proddec.org',
    facultyInCharge: 'Hari Kumar T',
    description: [
        'Product Design and Development Centre (PRODDEC) is a premier student-driven technical forum at the College of Engineering Chengannur. Established in 1995, it promotes innovation, creativity, and product-oriented engineering through workshops, projects, competitions, and mentorship programs. PRODDEC provides students with opportunities to transform ideas into practical solutions while developing technical, leadership, and entrepreneurial skills.'
    ],
    events: [
        'Start With Web (07 October 2024) – Introduction to modern web development technologies.',
        'PLC Next (28 September 2024) – Industrial automation and PLC programming workshop.',
        'Digital Circuit Design (29 August 2024) – Hands-on training in digital electronics.',
        'PRODDEC@25 – Silver Jubilee celebration.',
        'Wissenaire – Innovation and technical idea development event.',
        'Pitch The Deck – Entrepreneurship and idea pitching competition.',
        'Start Here – Orientation and technical exposure program.'
    ],
    activities: [
        'Technical Workshops',
        'Product Design and Development',
        'Innovation and Prototyping',
        'Student Project Mentoring',
        'Skill Development Programs',
        'Technical Competitions',
        'Entrepreneurship Development',
        'Idea Pitching Sessions',
        'Software and Hardware Development Projects'
    ],
    achievements: [
        {
            _key: generateKey(),
            title: 'PRODDEC@25',
            description: 'Celebrated 25 years of innovation, technical excellence, and student contributions through a grand silver jubilee event.'
        },
        {
            _key: generateKey(),
            title: 'FORCEGO',
            description: 'A student-led innovation project demonstrating real-world product and software development.'
        },
        {
            _key: generateKey(),
            title: 'Student Innovation Projects',
            description: 'Multiple successful student projects and prototypes developed under the guidance of PRODDEC.'
        }
    ],
    gallery: [
        { _key: generateKey(), title: 'Official PRODDEC Homepage Banner', description: 'Represents the vision, identity, and mission of PRODDEC.' },
        { _key: generateKey(), title: 'PRODDEC@25 Celebration', description: 'Silver Jubilee celebration commemorating 25 years of innovation and growth.' },
        { _key: generateKey(), title: 'Wissenaire', description: 'Innovation-focused event encouraging students to develop and present creative ideas.' },
        { _key: generateKey(), title: 'FORCEGO Project', description: 'Student-developed application demonstrating practical product development.' },
        { _key: generateKey(), title: 'Start With Web', description: 'Workshop introducing students to modern web development technologies.' },
        { _key: generateKey(), title: 'PLC Next Workshop', description: 'Industrial automation and PLC programming training session.' },
        { _key: generateKey(), title: 'Digital Circuit Design', description: 'Hands-on workshop focused on digital electronics and circuit design.' },
        { _key: generateKey(), title: 'Delulu.js', description: 'An introductory workshop designed to build a strong foundation in JavaScript.' },
        { _key: generateKey(), title: 'Present Perfect', description: 'A session focused on transforming project ideas into impactful presentations.' },
        { _key: generateKey(), title: 'Prompt It', description: 'A beginner-friendly session introducing the fundamentals of prompt engineering.' }
    ]
};

async function run() {
    console.log("Starting PRODDEC Migration...");

    // First fetch or create a generic category if it doesn't exist, since it's required
    let category = await client.fetch(`*[_type == "orgCategory"][0]`);
    if (!category) {
        console.log("No Organization Categories found! Creating a default 'Technical Club' category...");
        category = await client.create({
            _type: 'orgCategory',
            name: 'Technical Forum',
            slug: { _type: 'slug', current: 'technical-forum' }
        });
    }

    proddecData.category = {
        _type: 'reference',
        _ref: category._id
    };

    console.log("Checking if PRODDEC already exists...");
    const existingOrg = await client.fetch(`*[_type == "organization" && slug.current == "proddec"][0]`);

    if (existingOrg) {
        console.log(`PRODDEC already exists. Updating existing document: ${existingOrg._id}`);
        await client.patch(existingOrg._id).set(proddecData).commit();
    } else {
        console.log("Creating new PRODDEC organization document...");
        await client.create(proddecData);
    }
    
    console.log("\n✅ PRODDEC Migration complete!");
}

run().catch(console.error);
