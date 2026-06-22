import { getCliClient } from 'sanity/cli';

const client = getCliClient();

const departmentDetails = {
    "dept-computer-engineering": {
        name: "Computer Engineering",
        fullName: "Department of Computer Engineering",
        heroImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
        founded: "1993",
        stats: [
            { value: "180+", label: "B.Tech Intake" },
            { value: "30", label: "MCA Intake" },
            { value: "38", label: "Faculty Members" }
        ],
        overview: [
            "The core courses offered by the Department of Computer Engineering are B.Tech Degree in Computer Science and Engineering, B.Tech Degree in Computer Science and Engineering (Artificial Intelligence and Machine Learning) and Masters Degree Programme in Computer Application from Kerala Technological University, Kerala. These courses are aimed at providing theoretical and practical knowledge of Computer Science.",
            "The subjects in Bachelor’s level programme include Computer Architecture and Organization, Automata Languages and Computation, Data Structures and Algorithms, Database Management Systems, Language Processor, Computer Networks, Advanced Architecture and Parallel Processing, Software Engineering, Digital Signal Processing, Analysis and Design of Algorithms etc. The curriculum also includes management papers like Industrial Organization and Management.",
            "In order to bridge the gap between knowledge and its true application, students are required to undertake seminars, mini-project and the main project that put them through an industry-like situation. The course produces an ideal computer engineer, well-equipped to meet the challenges of the rapidly growing IT industry."
        ],
        labsExtended: [
            "High-Performance Computing Lab: Equipped with advanced server systems and GPUs for deep learning and heavy computation.",
            "Embedded Systems & IoT Laboratory: Providing microcontrollers, sensors, and development boards for hardware interfacing projects.",
            "Cloud Computing & Virtualization Centre: Virtualized hardware hosts running private cloud services and containerized deployments.",
            "Advanced Software Development Lab: Dedicated environments with compiler tools, database servers, and modeling suites.",
            "Data Science & Analytics Wing: Specialized suites with R, Python environments, and Spark systems for data engineering.",
            "Hardware & Microprocessor Lab: Equipped with 8086 trainer kits, logic analyzers, and digital interfacing boards."
        ],
        programmes: [
            { name: "B.Tech in Computer Engineering", duration: "4 years" },
            { name: "B.Tech in Artificial Intelligence & Machine Learning", duration: "4 years" },
            { name: "Master of Computer Applications (MCA)", duration: "2 years" }
        ],
        vision: [
            "Emerge as a meritorious centre  in computing to mould competent and socially committed professionals."
        ],
        mission: [
            "M1: Nurture a stimulating environment by means of quality education and state of the art facilities to groom young minds for their professional career, higher education and innovative research.",
            "M2: Foster managerial and entrepreneurial skills of students through co-curricular and extra-curricular activities.",
            "M3: Facilitate the students to address socially relevant problems with professional ethics and values."
        ],
        peos: [
            "PEO1: Graduates shall have a sound knowledge in Computer Science adaptable to the evolving technical challenges to pursue a profession in computing.",
            "PEO2: Graduates shall be theoretically proficient for higher studies and contribute to the advancements in computing through research.",
            "PEO3: Graduates shall have leadership and teamwork qualities competent of being good entrepreneurs.",
            "PEO4: Graduates shall exhibit social commitment with ethical values in designing computing  solutions."
        ],
        psos: [
            {
                programName: "B.Tech Computer Engineering",
                outcomes: [
                    "PSO1: Able to analyze real world situations to develop software solutions incorporating new ideas and modern technology.",
                    "PSO2: Competent to Design and develop digital hardware based programming solutions"
                ]
            },
            {
                programName: "Master of Computer Applications (MCA)",
                outcomes: [
                    "PSO1: To work productively as IT professional both at supportive and leadership roles.",
                    "PSO2: To advance successfully in their profession by drawing upon their firm analytical, computational and programming skills."
                ]
            }
        ]
    },
    "dept-electrical-engineering": {
        name: "Electrical Engineering",
        fullName: "Department of Electrical & Electronics Engineering",
        heroImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200",
        founded: "1993",
        stats: [
            { value: "60", label: "B.Tech Intake" },
            { value: "15+", label: "Faculty Members" },
            { value: "6+", label: "Advanced Labs" }
        ],
        overview: [
            "The Department of Electrical and Electronics Engineering offers a comprehensive B.Tech program designed to provide students with a strong foundation in electrical systems, electronics, and control engineering."
        ],
        labsExtended: [
            "Electrical Machines Lab",
            "Power Electronics Lab",
            "Control Systems Lab",
            "Measurements & Instrumentation Lab"
        ],
        programmes: [
            { name: "B.Tech Electrical & Electronics Eng.", duration: "4 years" },
            { name: "Research Fellowships (Ph.D.)", duration: "Varies" }
        ]
    },
    "dept-electronics-engineering": {
        name: "Electronics Engineering",
        fullName: "Department of Electronics & Communication Engineering",
        heroImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=1200",
        founded: "1993",
        stats: [
            { value: "120", label: "B.Tech Intake" },
            { value: "18+", label: "Faculty Members" },
            { value: "8+", label: "Advanced Labs" }
        ],
        overview: [
            "The Department of Electronics Engineering is a premier center of technical learning, famous for its contributions to embedded hardware, VLSI design, signal processing, and communication networks.",
            "Our curriculum merges strong fundamental knowledge in semiconductor physics with advanced experimental studies in RF engineering, network architectures, and smart automation systems.",
            "The department hosts highly active academic societies like IEEE and PRODECC, organizing regular technical hackathons and internships."
        ],
        labsExtended: [
            "Advanced Microprocessors & VLSI Lab",
            "Digital Signal Processing Centre",
            "Analog & Digital Communication Lab",
            "Smart Hardware & Robotics Wing",
            "Microwave & RF Engineering Lab",
            "Integrated Circuits Laboratory"
        ],
        programmes: [
            { name: "B.Tech Electronics & Comm. Eng.", duration: "4 years" },
            { name: "Ph.D. in Electronics Engineering", duration: "Varies" }
        ]
    },
    "dept-general-engineering": {
        name: "General Engineering",
        fullName: "Department of General Engineering",
        heroImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200",
        founded: "1993",
        stats: [
            { value: "400+", label: "First-Year Intake" },
            { value: "8+", label: "Expert Instructors" },
            { value: "3+", label: "Central Workshops" }
        ],
        overview: [
            "The Department of General Engineering handles essential foundational training in mechanical systems, drafting, graphic design, and hardware construction, serving all engineering streams.",
            "Designed to nurture multi-disciplinary competencies, our physical workshop systems guide first-year students from structural conceptualization to manual fabrication.",
            "Our facilities are fully certified and aligned with strict university guidelines, maintaining zero accidents through modern safety protocols."
        ],
        labsExtended: [
            "Central Engineering Workshop",
            "Computer-Aided Drafting (CAD) Lab",
            "Fluid Mechanics & Mechanical Lab",
            "Basic Machine & Tool Shop",
            "Carpentry & Fitting Shop"
        ],
        programmes: [
            { name: "Foundational Engineering Training", duration: "1 Year" }
        ]
    },
    "dept-basic-science-language": {
        name: "Basic Science & Language",
        fullName: "Department of Basic Science & Language",
        heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
        founded: "1993",
        stats: [
            { value: "100%", label: "First-Year Coverage" },
            { value: "10+", label: "Core Faculty" },
            { value: "3+", label: "Research Labs" }
        ],
        overview: [
            "Providing the core scientific and mathematical foundation required for all modern engineering branches, our department spans Mathematics, Applied Physics, Chemistry, and Technical English.",
            "Through highly dedicated faculties and specialized labs, we ensure that students have a rock-solid grasp of the abstract concepts they will need later in their core subjects.",
            "The department also manages the English Language Lab, which enhances students' professional communication, presentation, and interview skills required for global corporate placements."
        ],
        labsExtended: [
            "Applied Physics Laboratory",
            "Engineering Chemistry Lab",
            "Professional Language Studio",
            "Mathematical Computing Centre"
        ],
        programmes: [
            { name: "Applied Sciences Core Curriculum", duration: "1 Year" },
            { name: "Professional Communication Certification", duration: "6 Months" }
        ]
    }
};

async function run() {
    console.log("Starting Department Content Migration...");
    
    const generateKey = () => Math.random().toString(36).substring(2, 10);
    
    for (const [slug, data] of Object.entries(departmentDetails)) {
        console.log(`\nProcessing: ${slug}`);
        
        // Find existing department
        const searchShort = slug === 'dept-computer-engineering' ? 'CS' :
                           slug === 'dept-electronics-engineering' ? 'EC' :
                           slug === 'dept-electrical-engineering' ? 'EEE' : null;
        
        let dept = null;
        if (searchShort) {
            dept = await client.fetch(`*[_type == "department" && short == $short][0]`, { short: searchShort });
        }
        if (!dept) {
            dept = await client.fetch(`*[_type == "department" && slug.current == $slug][0]`, { slug });
        }
        
        if (!dept) {
            console.error(`Department not found for slug: ${slug}`);
            continue;
        }
        
        console.log(`Found department: ${dept._id}. Updating fields...`);
        
        // Add _keys to object arrays (required by Sanity Studio)
        const statsWithKeys = data.stats ? data.stats.map(s => ({...s, _key: generateKey()})) : undefined;
        const programmesWithKeys = data.programmes ? data.programmes.map(p => ({...p, _key: generateKey()})) : undefined;
        const psosWithKeys = data.psos ? data.psos.map(p => ({...p, _key: generateKey()})) : undefined;

        await client.patch(dept._id)
            .set({
                heroImage: data.heroImage,
                founded: data.founded,
                stats: statsWithKeys,
                overview: data.overview,
                vision: data.vision,
                mission: data.mission,
                peos: data.peos,
                psos: psosWithKeys,
                labsExtended: data.labsExtended,
                programmes: programmesWithKeys
            })
            .commit();
            
        console.log(`Successfully updated ${dept._id}`);
    }
    
    console.log("\n✅ Migration complete!");
}

run().catch(console.error);
