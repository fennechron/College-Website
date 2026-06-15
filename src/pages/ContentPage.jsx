import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { pageContent } from '../data/pageContent';
import { ChevronRight, Home, ArrowLeft, Calendar, Users, BookOpen, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const AccordionItem = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50 mb-4 transition-all">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-black text-sm uppercase tracking-wider bg-slate-50 hover:bg-slate-100/80 text-primary transition-all"
            >
                <span>{title}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0 }}
                className="overflow-hidden bg-white"
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="p-6 space-y-3">
                    {items.map((item, index) => (
                        <p key={index} className="text-md text-slate-600 leading-relaxed font-semibold pl-6 relative">
                            <span className="absolute left-0 text-accent font-extrabold">•</span>
                            {item}
                        </p>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

const parseContent = (text) => {
    const lines = text.split('\n');
    const segments = [];
    let currentAccordion = null;

    for (let line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        if (trimmed.startsWith('[Dropdown]')) {
            const title = trimmed.replace('[Dropdown]', '').trim();
            currentAccordion = { type: 'accordion', title: title, items: [] };
            segments.push(currentAccordion);
        } else if (trimmed.startsWith('•') && currentAccordion) {
            currentAccordion.items.push(trimmed.substring(1).trim());
        } else {
            currentAccordion = null;
            segments.push({ type: 'normal', text: trimmed });
        }
    }
    return segments;
};

// Helper to generate id from name
const generateId = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

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
        description: [
            "The core courses offered by the Department of Computer Engineering are B.Tech Degree in Computer Science and Engineering, B.Tech Degree in Computer Science and Engineering (Artificial Intelligence and Machine Learning) and Masters Degree Programme in Computer Application from Kerala Technological University, Kerala. These courses are aimed at providing theoretical and practical knowledge of Computer Science.",
            "The subjects in Bachelor’s level programme include Computer Architecture and Organization, Automata Languages and Computation, Data Structures and Algorithms, Database Management Systems, Language Processor, Computer Networks, Advanced Architecture and Parallel Processing, Software Engineering, Digital Signal Processing, Analysis and Design of Algorithms etc. The curriculum also includes management papers like Industrial Organization and Management.",
            "In order to bridge the gap between knowledge and its true application, students are required to undertake seminars, mini-project and the main project that put them through an industry-like situation. The course produces an ideal computer engineer, well-equipped to meet the challenges of the rapidly growing IT industry."
        ],
        labs: [
            "High-Performance Computing Lab",
            "Embedded Systems & IoT Laboratory",
            "Cloud Computing & Virtualization Centre",
            "Advanced Software Development Lab",
            "Data Science & Analytics Wing",
            "Hardware & Microprocessor Lab"
        ],
        programs: ["B.Tech Computer Engineering", "B.Tech AI & ML", "Master of Computer Applications (MCA)"],
        programmesTable: [
            { name: "B.Tech in Computer Engineering", duration: "4 years" },
            { name: "B.Tech in Artificial Intelligence & Machine Learning", duration: "4 years" },
            { name: "Master of Computer Applications (MCA)", duration: "2 years" }
        ],
        hod: "Dr. Renu George",
        hodDesignation: "Professor & Head Of the Department",
        hodImage: "https://ceconline.edu/wp-content/uploads/2025/09/renu.jpeg",
        hodAddressLines: [
            "Department of Computer Engineering",
            "College of Engineering, Chengannur",
            "Alappuzha (Dist.) – 689121"
        ],
        hodEmail: "hod.cse@ceconline.edu",
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
        psos: {
            "B.Tech Computer Engineering": [
                "PSO1: Able to analyze real world situations to develop software solutions incorporating new ideas and modern technology.",
                "PSO2: Competent to Design and develop digital hardware based programming solutions"
            ],
            "Master of Computer Applications (MCA)": [
                "PSO1: To work productively as IT professional both at supportive and leadership roles.",
                "PSO2: To advance successfully in their profession by drawing upon their firm analytical, computational and programming skills."
            ]
        },
        labsExtended: [
            "High-Performance Computing Lab: Equipped with advanced server systems and GPUs for deep learning and heavy computation.",
            "Embedded Systems & IoT Laboratory: Providing microcontrollers, sensors, and development boards for hardware interfacing projects.",
            "Cloud Computing & Virtualization Centre: Virtualized hardware hosts running private cloud services and containerized deployments.",
            "Advanced Software Development Lab: Dedicated environments with compiler tools, database servers, and modeling suites.",
            "Data Science & Analytics Wing: Specialized suites with R, Python environments, and Spark systems for data engineering.",
            "Hardware & Microprocessor Lab: Equipped with 8086 trainer kits, logic analyzers, and digital interfacing boards."
        ],
        news: [
            {
                date: "May 15, 2026",
                title: "Smart Kerala Hackathon 2025 Victory",
                description: "CEC Computer Engineering students won the first prize in the Smart Kerala Hackathon 2025 with their innovative AI-driven emergency response model."
            },
            {
                date: "April 28, 2026",
                title: "National Workshop on Cloud Security",
                description: "The department successfully conducted a 3-day national hands-on workshop in collaboration with AWS Academics on next-generation virtualization security."
            }
        ],
        facultyList: [
            { name: "Dr. Renu George", designation: "Professor and Head of the Department" },
            { name: "Dr. Manju S Nair", designation: "Associate Professor" },
            { name: "Sri. Gopakumar G", designation: "Associate Professor" },
            { name: "Smt. Manjusha S Nair", designation: "Associate Professor(dptn to Ph D)" },
            { name: "Smt. Princy Sugathan S", designation: "Associate Professor(dptn to Ph D)" },
            { name: "Sri. Muhammed Ilyas H", designation: "Associate Professor" },
            { name: "Dr. Geetha S", designation: "Associate Professor" },
            { name: "Dr. Sabeena K", designation: "Assistant Professor" },
            { name: "Sri. Vishnu S Kumar", designation: "Assistant Professor" },
            { name: "Smt. Sreelekshmi K R", designation: "Assistant Professor" },
            { name: "Smt. Syeatha Merlin Thampy", designation: "Assistant Professor" },
            { name: "Smt. Leya G", designation: "Assistant Professor" },
            { name: "Smt. Alka Vijay", designation: "Assistant Professor" },
            { name: "Smt. Chinchu M Pillai", designation: "Assistant Professor" },
            { name: "Smt. Shabana Mol S", designation: "Assistant Professor" },
            { name: "Smt. Sulaja Sanal", designation: "Assistant Professor" },
            { name: "Smt. Reshma Raj K S", designation: "Assistant Professor" },
            { name: "Smt. Reshma Ann Mathews", designation: "Assistant Professor" },
            { name: "Smt. Premy P Jacob", designation: "Assistant Professor" },
            { name: "Smt. Syama S", designation: "Assistant Professor" },
            { name: "Smt. Josmi Jose", designation: "Assistant Professor" },
            { name: "Smt. Sruthy R S", designation: "Assistant Professor" },
            { name: "Smt. Jithy John", designation: "Assistant Professor" },
            { name: "Smt. Surya S", designation: "Assistant Professor" },
            { name: "Smt. Varsha C Mohan", designation: "Assistant Professor" },
            { name: "Smt. Lintu Liz Thomas", designation: "Assistant Professor" },
            { name: "Smt. Nayana Chandran", designation: "Assistant Professor" },
            { name: "Smt. Santhy Viswam", designation: "Assistant Professor" },
            { name: "Smt. Jyothi Chandran", designation: "Assistant Professor" },
            { name: "Smt. Anaswara Dev S", designation: "Assistant Professor" },
            { name: "Smt. Athira Prakash J S", designation: "Assistant Professor" },
            { name: "Smt. Usha Gopalakrishnan", designation: "Assistant Professor" },
            { name: "Smt. Anu Priya A", designation: "Assistant Professor" },
            { name: "Smt. Suvarna Dev", designation: "Assistant Professor" },
            { name: "Smt. Swapna Kumari E S", designation: "Assistant Professor" },
            { name: "Smt. Christina Thankam Sajan", designation: "Assistant Professor" },
            { name: "Sri. Vijayasankar V Nair", designation: "System Analyst" },
            { name: "Smt. Aiswarya T K", designation: "System Analyst" }
        ],
        technicalStaffList: [
            { name: "Smt. Jalaja Kumari R", designation: "Trade Instructor" },
            { name: "Smt. Dhanya R", designation: "Computer Programmer" },
            { name: "Smt. Rahana A", designation: "Computer Programmer" },
            { name: "Smt. Vidya Viswanath", designation: "Computer Programmer" },
            { name: "Smt. Raji C R", designation: "Demonstrator" },
            { name: "Smt. Santhi krishna S", designation: "Tradesman" },
            { name: "Smt. Priya Nair S", designation: "Tradesman" },
            { name: "Smt. Renju R", designation: "Tradesman" }
        ]
    },
    "dept-electrical-engineering": {
        name: "Electrical Engineering",
        fullName: "Department of Electrical & Electronics Engineering",
        heroImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200",
        founded: "1993",
        stats: [
            { value: "60", label: "B.Tech Intake" },
            { value: "12+", label: "Faculty Members" },
            { value: "6+", label: "Core Laboratories" }
        ],
        description: [
            "The Department of Electrical Engineering prepares students to lead the energy transition with extensive competencies in power systems, industrial control, smart grids, and clean energy.",
            "Through highly structured practical programs and core hands-on training, students develop professional capabilities to design next-generation power electronics and electrical drives.",
            "The department has been actively collaborating on multiple government funding initiatives and renewable energy integration projects."
        ],
        labs: [
            "Electrical Machines & Drives Lab",
            "Power Systems Simulation Laboratory",
            "Advanced Control Systems Lab",
            "Electrical Measurements Lab",
            "Power Electronics Laboratory",
            "Basic Electrical Engineering Workshop"
        ],
        programs: ["B.Tech Electrical & Electronics Eng.", "Research Fellowships (Ph.D.)"],
        hod: "Smt. Sunitha Sajeev",
        hodEmail: "sunitha@ceconline.edu"
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
        description: [
            "The Department of Electronics Engineering is a premier center of technical learning, famous for its contributions to embedded hardware, VLSI design, signal processing, and communication networks.",
            "Our curriculum merges strong fundamental knowledge in semiconductor physics with advanced experimental studies in RF engineering, network architectures, and smart automation systems.",
            "The department hosts highly active academic societies like IEEE and PRODECC, organizing regular technical hackathons and internships."
        ],
        labs: [
            "Advanced Microprocessors & VLSI Lab",
            "Digital Signal Processing Centre",
            "Analog & Digital Communication Lab",
            "Smart Hardware & Robotics Wing",
            "Microwave & RF Engineering Lab",
            "Integrated Circuits Laboratory"
        ],
        programs: ["B.Tech Electronics & Comm. Eng.", "Ph.D. in Electronics Engineering"],
        hod: "Dr. C V Anilkumar",
        hodEmail: "cvanilkumar@ceconline.edu"
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
        description: [
            "The Department of General Engineering handles essential foundational training in mechanical systems, drafting, graphic design, and hardware construction, serving all engineering streams.",
            "Designed to nurture multi-disciplinary competencies, our physical workshop systems guide first-year students from structural conceptualization to manual fabrication.",
            "Our facilities are fully certified and aligned with strict university guidelines, maintaining zero accidents through modern safety protocols."
        ],
        labs: [
            "Central Engineering Workshop",
            "Computer-Aided Drafting (CAD) Lab",
            "Fluid Mechanics & Mechanical Lab",
            "Basic Machine & Tool Shop",
            "Carpentry & Fitting Shop"
        ],
        programs: ["Foundational Engineering Training"],
        hod: "Dr. Ashok Kumar T V",
        hodEmail: "ashokkumar@ceconline.edu"
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
        description: [
            "The Department of Basic Science & Language builds a strong mathematical, scientific, and professional communication foundation for undergraduate engineers.",
            "Merging advanced scientific theory with professional development programs, we ensure students develop analytical expertise alongside premium corporate communication skills.",
            "Our science laboratories feature high-precision instruments to help students learn the empirical basis of modern engineering technologies."
        ],
        labs: [
            "Applied Physics Laboratory",
            "Engineering Chemistry Lab",
            "Digital Language & Rhetoric Centre",
            "Mathematics Research & Analytics Lab"
        ],
        programs: ["Applied Mathematics, Sciences & Professional English"],
        hod: "Dr. Hari V S (Principal / Head)",
    }
};

const btechCourses = [
    {
        name: "B.Tech Computer Engineering",
        duration: "8 Semesters",
        intake: "180+ seats",
        eligibility: {
            academic: "Passed Higher Secondary Examination, Kerala, or Examinations recognized as equivalent thereto, with Physics and Mathematics as compulsory subjects and Chemistry/Computer Science/Biotechnology/Biology as one of the optional subjects.",
            marks: "Minimum of 45% marks in the above subjects put together (relaxation applicable for SC/ST/OBC categories as per government norms).",
            entrance: "Must have qualified in the KEAM (Kerala Engineering Entrance Exam) conducted by the Commissioner for Entrance Examinations, Kerala."
        }
    },
    {
        name: "B.Tech Electronics & Communication Engineering",
        duration: "8 Semesters",
        intake: "120 seats",
        eligibility: {
            academic: "Passed Higher Secondary Examination, Kerala, or Examinations recognized as equivalent thereto, with Physics and Mathematics as compulsory subjects and Chemistry/Computer Science/Biotechnology/Biology as one of the optional subjects.",
            marks: "Minimum of 45% marks in the above subjects put together (relaxation applicable for SC/ST/OBC categories as per government norms).",
            entrance: "Must have qualified in the KEAM (Kerala Engineering Entrance Exam) conducted by the Commissioner for Entrance Examinations, Kerala."
        }
    },
    {
        name: "B.Tech Electrical & Electronics Engineering",
        duration: "8 Semesters",
        intake: "60 seats",
        eligibility: {
            academic: "Passed Higher Secondary Examination, Kerala, or Examinations recognized as equivalent thereto, with Physics and Mathematics as compulsory subjects and Chemistry/Computer Science/Biotechnology/Biology as one of the optional subjects.",
            marks: "Minimum of 45% marks in the above subjects put together (relaxation applicable for SC/ST/OBC categories as per government norms).",
            entrance: "Must have qualified in the KEAM (Kerala Engineering Entrance Exam) conducted by the Commissioner for Entrance Examinations, Kerala."
        }
    },
    {
        name: "B.Tech CSE (Artificial Intelligence & Machine Learning)",
        duration: "8 Semesters",
        intake: "60 seats",
        eligibility: {
            academic: "Passed Higher Secondary Examination, Kerala, or Examinations recognized as equivalent thereto, with Physics and Mathematics as compulsory subjects and Chemistry/Computer Science/Biotechnology/Biology as one of the optional subjects.",
            marks: "Minimum of 45% marks in the above subjects put together (relaxation applicable for SC/ST/OBC categories as per government norms).",
            entrance: "Must have qualified in the KEAM (Kerala Engineering Entrance Exam) conducted by the Commissioner for Entrance Examinations, Kerala."
        }
    }
];

const mcaCourse = {
    name: "Master of Computer Applications (M.C.A)",
    duration: "4 Semesters",
    intake: "60 seats",
    eligibility: {
        academic: "Passed BCA/Bachelor Degree in Computer Science Engineering or equivalent Degree. OR passed B.Sc./B.Com./B.A. with Mathematics at 10+2 Level or at Graduation Level (with additional bridge courses as per the norms of the concerned University).",
        marks: "Obtained at least 50% marks (45% marks in case of candidates belonging to reserved category) in the qualifying examination.",
        entrance: "Must have qualified in the Kerala State MCA Entrance Examination conducted by the Commissioner for Entrance Examinations or an equivalent university-approved entrance exam."
    }
};

const DepartmentAccordion = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-6 py-5 bg-slate-50/50 hover:bg-slate-50 text-left transition-colors"
            >
                <span className="font-display font-black text-primary text-xl uppercase tracking-wide">{title}</span>
                <span className={`text-accent font-black text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>
            {isOpen && (
                <div className="p-6 border-t border-slate-100 bg-white space-y-4">
                    {items && items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3.5 text-slate-700 font-bold text-[1.1rem] leading-relaxed">
                            <span className="inline-flex items-center justify-center shrink-0 w-2.5 h-2.5 rounded-full bg-accent mt-2 shadow-sm" />
                            <span className="flex-1">{item}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const ContentPage = () => {
    const { slug } = useParams();
    const { pathname } = useLocation();
    const content = pageContent[slug];

    const [activeTab, setActiveTab] = useState('');
    const [activeEligibility, setActiveEligibility] = useState(null);

    // Reset active tab on slug/content change
    useEffect(() => {
        if (content && content.tabs) {
            setActiveTab(Object.keys(content.tabs)[0]);
        } else {
            setActiveTab('');
        }
    }, [slug, content]);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (!content) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background p-8">
                <div className="text-primary font-display font-black text-[5rem] animate-bounce">404</div>
                <h2 className="text-2xl font-bold text-secondary mb-6 text-center tracking-wide">Information Not Found</h2>
                <p className="text-lg text-slate-600 mb-8 max-w-md text-center">
                    The page you are looking for doesn't exist or is still under development.
                </p>
                <Link to="/" className="flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-bold hover:bg-secondary transition-all shadow-lg hover:shadow-xl">
                    <ArrowLeft size={18} /> BACK TO HOME
                </Link>
            </div>
        );
    }

    if (slug.startsWith('dept-')) {
        const dept = departmentDetails[slug];
        if (dept) {
            return (
                <div className="min-h-screen bg-white">
                    {/* ─── Hero Section ─── */}
                    <div className="h-[60vh] relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 z-0">
                            <img 
                                src={dept.heroImage} 
                                alt={dept.name} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary" />
                        </div>
                        
                        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="space-y-6"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-md text-white text-[0.7rem] font-black uppercase tracking-widest border border-white/10">
                                    Academic Department
                                </div>
                                <h1 className="text-4xl sm:text-6xl font-display font-black text-white uppercase leading-tight tracking-tighter">
                                    {dept.fullName}
                                </h1>
                            </motion.div>
                        </div>
                    </div>

                    {/* ─── Stats Bar ─── */}
                    <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {dept.stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center text-center"
                                >
                                    <span className="text-3xl font-display font-black text-primary">{stat.value}</span>
                                    <span className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 mt-1">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ─── Main Content ─── */}
                    <div className="max-w-6xl mx-auto px-6 py-24 text-left">
                        <div className="grid lg:grid-cols-3 gap-16">
                            {/* Left: Detailed Description */}
                            <div className="lg:col-span-2 space-y-12">
                                <section className="space-y-8">
                                    <h2 className="text-3xl font-display font-black text-primary uppercase flex items-center gap-4">
                                        <span className="w-12 h-1.5 bg-accent rounded-full" />
                                        Department Overview
                                    </h2>
                                    <div className="space-y-6">
                                        {dept.description.map((para, i) => (
                                            <p key={i} className="text-xl text-slate-600 leading-[1.8] font-medium text-justify">
                                                {para}
                                            </p>
                                        ))}
                                    </div>
                                </section>

                                {/* Vision & Mission Accordions */}
                                {(dept.vision || dept.mission) && (
                                    <section className="space-y-6">
                                        {dept.vision && (
                                            <DepartmentAccordion 
                                                title="Department Vision" 
                                                items={dept.vision} 
                                            />
                                        )}
                                        {dept.mission && (
                                            <DepartmentAccordion 
                                                title="Department Mission" 
                                                items={dept.mission} 
                                            />
                                        )}
                                    </section>
                                )}

                                {/* Programmes Offered Section */}
                                {dept.programmesTable && (
                                    <section className="space-y-8">
                                        <h3 className="text-2xl font-display font-black text-primary uppercase flex items-center gap-4">
                                            <span className="w-8 h-1.5 bg-accent rounded-full" />
                                            Programmes Offered
                                        </h3>
                                        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white">
                                            <table className="w-full text-left border-collapse bg-white">
                                                <thead>
                                                    <tr className="bg-slate-50 border-b border-slate-100">
                                                        <th className="px-6 py-4 font-black text-sm uppercase tracking-wider text-primary">Programme</th>
                                                        <th className="px-6 py-4 font-black text-sm uppercase tracking-wider text-primary">Duration</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 text-left">
                                                    {dept.programmesTable.map((prog, idx) => (
                                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-6 py-5 text-base font-black text-primary">{prog.name}</td>
                                                            <td className="px-6 py-5 text-base font-black text-accent">{prog.duration}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                )}

                                {/* PEOs & PSOs Accordions */}
                                {(dept.peos || dept.psos) && (
                                    <section className="space-y-6">
                                        {dept.peos && (
                                            <DepartmentAccordion 
                                                title="Program Educational Objectives (PEOs)" 
                                                items={dept.peos} 
                                            />
                                        )}
                                        {dept.psos && (
                                            Array.isArray(dept.psos) ? (
                                                <DepartmentAccordion 
                                                    title="Program Specific Outcomes (PSOs)" 
                                                    items={dept.psos} 
                                                />
                                            ) : (
                                                <div className="space-y-4 mt-6">
                                                    <h4 className="text-xl font-display font-black text-primary uppercase">Program Specific Outcomes (PSOs)</h4>
                                                    <div className="space-y-4">
                                                        {Object.entries(dept.psos).map(([prog, psos]) => (
                                                            <DepartmentAccordion 
                                                                key={prog}
                                                                title={`PSOs - ${prog}`} 
                                                                items={psos} 
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </section>
                                )}

                                {/* Laboratory Facility */}
                                <section className="space-y-8">
                                    <h3 className="text-2xl font-display font-black text-primary uppercase flex items-center gap-4">
                                        <span className="w-8 h-1.5 bg-accent rounded-full" />
                                        Laboratory Facility
                                    </h3>
                                    <div className="grid gap-6">
                                        {dept.labsExtended ? dept.labsExtended.map((lab, i) => {
                                            const [title, desc] = lab.split(': ');
                                            return (
                                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all duration-300">
                                                    <div className="flex items-start gap-4">
                                                        <span className="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-accent text-primary font-black text-sm">
                                                            {i + 1}
                                                        </span>
                                                        <div className="space-y-1">
                                                            <h4 className="text-lg font-display font-black text-primary uppercase">
                                                                {title}
                                                            </h4>
                                                            {desc && (
                                                                <p className="text-slate-600 text-base font-medium leading-relaxed">
                                                                    {desc}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }) : dept.labs.map((lab, i) => (
                                            <div key={i} className="flex items-start gap-3.5 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                                <span className="inline-flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-accent/15 text-accent text-xs font-black">
                                                    ✓
                                                </span>
                                                <span className="text-primary font-bold text-base">{lab}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Faculty Section */}
                                {dept.facultyList && (
                                    <section className="space-y-8">
                                        <h3 className="text-2xl font-display font-black text-primary uppercase flex items-center gap-4">
                                            <span className="w-8 h-1.5 bg-accent rounded-full" />
                                            Faculty
                                        </h3>
                                        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white max-h-[500px] overflow-y-auto custom-scrollbar">
                                            <table className="w-full text-left border-collapse bg-white">
                                                <thead className="sticky top-0 z-10 bg-slate-50">
                                                    <tr className="border-b border-slate-100">
                                                        <th className="px-6 py-4 font-black text-sm uppercase tracking-wider text-primary">SL NO.</th>
                                                        <th className="px-6 py-4 font-black text-sm uppercase tracking-wider text-primary">Name</th>
                                                        <th className="px-6 py-4 font-black text-sm uppercase tracking-wider text-primary">Designation</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 text-left">
                                                    {dept.facultyList.map((fac, idx) => (
                                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-6 py-4 text-base font-black text-slate-400">{idx + 1}</td>
                                                            <td className="px-6 py-4 text-base font-black text-primary">
                                                                <Link to={`/teacher/${generateId(fac.name)}`} className="hover:text-accent hover:underline transition-colors">
                                                                    {fac.name}
                                                                </Link>
                                                            </td>
                                                            <td className="px-6 py-4 text-base font-semibold text-slate-600">
                                                                <span className={`inline-block px-2.5 py-1 rounded-md text-[0.7rem] font-black uppercase tracking-wider ${
                                                                    fac.designation.toLowerCase().includes('head')
                                                                        ? 'bg-accent/15 text-accent border border-accent/25'
                                                                        : fac.designation.toLowerCase().includes('associate')
                                                                        ? 'bg-primary/10 text-primary border border-primary/20'
                                                                        : 'bg-slate-100 text-slate-600'
                                                                }`}>
                                                                    {fac.designation}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                )}

                                {/* Technical Staff Section */}
                                {dept.technicalStaffList && (
                                    <section className="space-y-8">
                                        <h3 className="text-2xl font-display font-black text-primary uppercase flex items-center gap-4">
                                            <span className="w-8 h-1.5 bg-accent rounded-full" />
                                            Technical Staff
                                        </h3>
                                        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white">
                                            <table className="w-full text-left border-collapse bg-white">
                                                <thead>
                                                    <tr className="bg-slate-50 border-b border-slate-100">
                                                        <th className="px-6 py-4 font-black text-sm uppercase tracking-wider text-primary">SL NO.</th>
                                                        <th className="px-6 py-4 font-black text-sm uppercase tracking-wider text-primary">Name</th>
                                                        <th className="px-6 py-4 font-black text-sm uppercase tracking-wider text-primary">Designation</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 text-left">
                                                    {dept.technicalStaffList.map((staff, idx) => (
                                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-6 py-4 text-base font-black text-slate-400">{idx + 1}</td>
                                                            <td className="px-6 py-4 text-base font-black text-primary">{staff.name}</td>
                                                            <td className="px-6 py-4 text-base font-semibold text-slate-500">{staff.designation}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* Right Sidebar: HOD Profile & Details */}
                            <div className="space-y-8">
                                <div className="bg-primary p-8 rounded-[2rem] text-white shadow-xl text-center border border-white/5 space-y-6">
                                    <div className="text-left">
                                        <h3 className="text-xl font-display font-black uppercase tracking-wider mb-2">Head of Department</h3>
                                        <div className="w-12 h-1 bg-accent rounded-full mb-6" />
                                    </div>

                                    {/* HOD Image Container (Provision) */}
                                    <div className="relative w-44 h-44 mx-auto rounded-full overflow-hidden border-4 border-accent shadow-lg bg-white/10 group">
                                        {dept.hodImage ? (
                                            <img 
                                                src={dept.hodImage} 
                                                alt={dept.hod} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-tr from-accent to-secondary flex items-center justify-center">
                                                <span className="text-white text-5xl font-black">{dept.hod ? dept.hod.charAt(0) : 'H'}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* HOD Text & Contact Details */}
                                    <div className="space-y-4 text-left">
                                        <div className="text-center">
                                            <h4 className="text-2xl font-display font-black text-white">{dept.hod}</h4>
                                            {dept.hodDesignation && (
                                                <p className="text-xs text-accent font-black uppercase tracking-widest mt-1">
                                                    {dept.hodDesignation}
                                                </p>
                                            )}
                                        </div>

                                        <div className="pt-4 border-t border-white/10 space-y-2 text-sm text-white/80 font-medium">
                                            {dept.hodAddressLines ? (
                                                dept.hodAddressLines.map((line, idx) => (
                                                    <p key={idx} className="leading-relaxed">{line}</p>
                                                ))
                                            ) : (
                                                <>
                                                    <p className="leading-relaxed">{dept.hodAddress}</p>
                                                </>
                                            )}
                                        </div>

                                        <div className="pt-2">
                                            <a 
                                                href={`mailto:${dept.hodEmail}`} 
                                                className="block w-full text-center py-3 bg-accent text-primary font-black rounded-xl hover:bg-white hover:text-primary transition-all duration-300 shadow-md shadow-accent/15 text-sm"
                                            >
                                                {dept.hodEmail}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Programs & Department Info Card */}
                                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-left space-y-6">
                                    <div>
                                        <h3 className="text-lg font-display font-black text-primary uppercase tracking-wider mb-2">Department Info</h3>
                                        <div className="w-12 h-1 bg-accent rounded-full" />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                            <div className="text-xs text-slate-400 font-black uppercase tracking-wider mb-1">Established</div>
                                            <div className="font-bold text-base text-primary">{dept.founded}</div>
                                        </div>

                                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                            <div className="text-xs text-slate-400 font-black uppercase tracking-wider mb-2">Core Programs</div>
                                            <ul className="space-y-1.5">
                                                {dept.programs.map((prog, i) => (
                                                    <li key={i} className="text-slate-600 text-xs font-bold flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                                                        {prog}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Department News Section */}
                        <section className="mt-16 pt-12 border-t border-slate-100 space-y-8 text-left">
                            <div className="text-center space-y-3">
                                <span className="text-xs font-black uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
                                    Announcements
                                </span>
                                <h3 className="text-3xl font-display font-black text-primary uppercase">
                                    Department News &amp; Updates
                                </h3>
                                <p className="text-slate-500 font-semibold max-w-xl mx-auto text-base">
                                    Stay informed with the latest updates, workshops, achievements, and notices from the department.
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                {dept.news ? dept.news.map((item, idx) => (
                                    <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-accent/25 transition-all group flex flex-col justify-between">
                                        <div className="space-y-4">
                                            <span className="inline-flex items-center gap-2 text-xs font-black text-accent uppercase">
                                                📅 {item.date}
                                            </span>
                                            <h4 className="text-xl font-display font-black text-primary group-hover:text-accent transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-2 text-center py-12 text-slate-400 font-bold">
                                        No recent announcements at this time.
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            );
        }
    }

    if (content.category === 'Facilities') {
        return (
            <div className="min-h-screen bg-white">
                {/* ─── Hero Section ─── */}
                <div className="h-[60vh] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 z-0">
                        {content.image ? (
                            <img 
                                src={content.image} 
                                alt={content.title} 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-tr from-primary via-secondary to-accent" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary" />
                    </div>
                    
                    <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            {/* Breadcrumbs */}
                            <div className="flex items-center justify-center gap-2 text-[0.8rem] font-bold tracking-widest text-white/60 uppercase mb-2">
                                <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1.5 whitespace-nowrap">
                                    <Home size={14} /> HOME
                                </Link>
                                <ChevronRight size={12} />
                                <span className="text-white/40 whitespace-nowrap">{content.category}</span>
                                <ChevronRight size={12} />
                                <span className="text-accent underline decoration-2 underline-offset-4 whitespace-nowrap">{content.title}</span>
                            </div>

                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-md text-white text-[0.7rem] font-black uppercase tracking-widest border border-white/10">
                                Campus Infrastructure
                            </div>
                            <h1 className="text-5xl sm:text-7xl font-display font-black text-white uppercase leading-tight tracking-tighter">
                                {content.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>

                {/* ─── Main Content ─── */}
                <div className="max-w-6xl mx-auto px-6 py-24">
                    <div className="grid lg:grid-cols-3 gap-16">
                        {/* Left: Detailed Description */}
                        <div className="lg:col-span-2 space-y-12 text-left">
                            <section className="space-y-8">
                                <h2 className="text-3xl font-display font-black text-primary uppercase flex items-center gap-4">
                                    <span className="w-12 h-1.5 bg-accent rounded-full" />
                                    About {content.title}
                                </h2>

                                {/* Dynamic Tabs Navigation */}
                                {content.tabs && (
                                    <div className="flex flex-wrap gap-2.5 border-b border-slate-100 pb-6 mb-8">
                                        {Object.keys(content.tabs).map((tabName) => {
                                            const isActive = activeTab === tabName;
                                            return (
                                                <button
                                                    key={tabName}
                                                    onClick={() => setActiveTab(tabName)}
                                                    className={`px-6 py-3 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-300 ${
                                                        isActive
                                                            ? 'bg-accent text-white shadow-lg shadow-accent/25'
                                                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-primary border border-slate-100'
                                                    }`}
                                                >
                                                    {tabName}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                <div className="space-y-6">
                                    {parseContent(content.tabs ? content.tabs[activeTab] || '' : content.content).map((segment, i) => {
                                        if (segment.type === 'accordion') {
                                            return <AccordionItem key={i} title={segment.title} items={segment.items} />;
                                        }

                                        const trimmed = segment.text.trim();
                                        if (!trimmed) return null;
                                        
                                        // If it starts with a bullet point or a dash
                                        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
                                        const isNumber = /^\d+\./.test(trimmed);
                                        
                                        if (isBullet) {
                                            return (
                                                <p key={i} className="text-lg text-slate-600 leading-relaxed font-medium pl-6 relative text-justify">
                                                    <span className="absolute left-0 text-accent font-extrabold">•</span>
                                                    {trimmed.substring(1).trim()}
                                                </p>
                                            );
                                        }
                                        
                                        if (isNumber) {
                                            const match = trimmed.match(/^(\d+)\.(.*)/);
                                            const num = match ? match[1] : '';
                                            const text = match ? match[2].trim() : trimmed;
                                            return (
                                                <div key={i} className="flex items-start gap-4 pl-1 py-1">
                                                    <span className="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent font-black text-sm">
                                                        {num}
                                                    </span>
                                                    <p className="text-lg text-slate-600 leading-relaxed font-medium pt-0.5 text-justify">
                                                        {text}
                                                    </p>
                                                </div>
                                            );
                                        }
                                        
                                        // Header styling inside content blocks
                                        const isHeader = trimmed.endsWith(':') || 
                                                         trimmed.startsWith('Key Resources') || 
                                                         trimmed.startsWith('TEQIP Book Bank') || 
                                                         trimmed.startsWith('Book Bank Scheme') || 
                                                         trimmed.startsWith('Alumni Book Bank') || 
                                                         trimmed.startsWith('Developing Library') || 
                                                         trimmed.startsWith('National Programme') || 
                                                         trimmed.startsWith('Print & Online') || 
                                                         trimmed.startsWith('Reference and');
                                        if (isHeader) {
                                            return (
                                                <h3 key={i} className="text-xl font-display font-black text-primary uppercase pt-6 pb-2 border-b border-slate-100 flex items-center gap-3">
                                                    <span className="w-1.5 h-6 bg-accent rounded-full shrink-0" />
                                                    {trimmed}
                                                </h3>
                                            );
                                        }

                                        return (
                                            <p key={i} className="text-lg text-slate-600 leading-relaxed font-medium text-justify">
                                                {trimmed}
                                            </p>
                                        );
                                    })}
                                </div>
                            </section>
                        </div>

                        {/* Right: Sidebar Info */}
                        <div className="space-y-8 text-left">
                            <div className="bg-primary p-10 rounded-3xl text-white space-y-8 shadow-xl">
                                <div>
                                    <h3 className="text-xl font-display font-black uppercase mb-4">Connect</h3>
                                    <div className="w-12 h-1 bg-accent rounded-full mb-6" />
                                </div>
                                
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="flex items-center gap-3 mb-1">
                                        <Calendar size={18} className="text-accent" />
                                        <span className="font-bold text-sm">Access</span>
                                    </div>
                                    <p className="text-white/60 text-xs ml-7">Open to all students & staff</p>
                                </div>

                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="flex items-center gap-3 mb-1">
                                        <Users size={18} className="text-accent" />
                                        <span className="font-bold text-sm">Status</span>
                                    </div>
                                    <p className="text-white/60 text-xs ml-7">Fully Functional & Active</p>
                                </div>
                                
                                <Link to="/page/contact" className="block w-full bg-accent py-4 rounded-xl text-center font-black hover:bg-white hover:text-primary transition-all duration-300 tracking-wider">
                                    CONTACT HELPDESK
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[50vh] bg-background flex flex-col">
            {/* Premium Hero Header */}
            <div className="bg-primary text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                
                <div className="relative z-10 max-w-[90%] lg:max-w-[1280px] mx-auto px-4 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-4"
                    >
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-[0.8rem] font-bold tracking-widest text-white/60 mb-2 uppercase">
                            <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1.5 whitespace-nowrap">
                                <Home size={14} /> HOME
                            </Link>
                            <ChevronRight size={12} />
                            <span className="text-white/40 whitespace-nowrap">{content.category}</span>
                            <ChevronRight size={12} />
                            <span className="text-accent underline decoration-2 underline-offset-4 whitespace-nowrap">{content.title}</span>
                        </div>
                        
                        <h1 className="text-[2.5rem] sm:text-[3.5rem] font-display font-black leading-tight tracking-tighter uppercase max-w-4xl">
                            {content.title}
                        </h1>
                        <div className="w-24 h-2 bg-accent rounded-full mt-2"></div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-grow py-16">
                <div className="max-w-[90%] lg:max-w-[1280px] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Main Content Area */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`${(slug === 'parents-teachers' || slug === 'right-to-info' || slug === 'btech' || slug === 'mca' || slug === 'doctoral' || slug === 'apjaktu' || slug === 'aicte') ? 'lg:col-span-12' : 'lg:col-span-8'} bg-white p-8 md:p-14 rounded-[2.5rem] shadow-[0_10px_50px_rgba(12,43,78,0.06)] border border-primary/5`}
                    >
                        <div className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-secondary/80 prose-p:leading-relaxed prose-li:text-secondary/80">
                            {slug !== 'parents-teachers' && slug !== 'right-to-info' && slug !== 'btech' && slug !== 'mca' && slug !== 'doctoral' && slug !== 'apjaktu' && slug !== 'aicte' && (
                                <h2 className="text-3xl font-bold text-primary mb-8 flex items-center gap-4">
                                    Section Overview
                                    <div className="flex-1 h-px bg-primary/10"></div>
                                </h2>
                            )}
                            {slug === 'college-bus' ? (
                                <div className="space-y-8 mb-10">
                                    <p className="text-[1.15rem] leading-[1.8] text-secondary/80 font-medium">
                                        The college is providing efficient transportation facilities for the staffs and students to the nearby places/towns.
                                    </p>
                                    
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-display font-black text-primary uppercase pb-2 border-b border-slate-100 flex items-center gap-3">
                                            <span className="w-1.5 h-6 bg-accent rounded-full shrink-0" />
                                            College Bus Routes
                                        </h3>
                                        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white">
                                            <table className="w-full text-left border-collapse bg-white">
                                                <thead>
                                                    <tr className="bg-slate-50 border-b border-slate-100">
                                                        <th className="px-6 py-4 font-black text-xs uppercase tracking-wider text-primary">From (Starting Point)</th>
                                                        <th className="px-6 py-4 font-black text-xs uppercase tracking-wider text-primary">Starting Time</th>
                                                        <th className="px-6 py-4 font-black text-xs uppercase tracking-wider text-primary">VIA Route</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {[
                                                        { from: "Changanacherry", time: "8.10 AM", via: "Thiruvalla" },
                                                        { from: "Haripad", time: "7.50 AM", via: "Mavelikkara" }
                                                    ].map((route, i) => (
                                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-6 py-4 text-sm font-bold text-primary">{route.from}</td>
                                                            <td className="px-6 py-4 text-sm font-black text-accent">{route.time}</td>
                                                            <td className="px-6 py-4 text-sm font-semibold text-slate-600">{route.via}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ) : slug === 'parents-teachers' ? (
                                <div className="space-y-12 mb-10 max-w-5xl mx-auto">
                                    {/* Parents Executive Table */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-display font-black text-primary uppercase pb-2 border-b border-slate-100 flex items-center gap-3">
                                            <span className="w-1.5 h-6 bg-accent rounded-full shrink-0" />
                                            Executive Members (Parents)
                                        </h3>
                                        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white">
                                            <table className="w-full text-left border-collapse bg-white">
                                                <thead>
                                                    <tr className="bg-slate-50 border-b border-slate-100">
                                                        <th className="px-6 py-4 font-black text-xs uppercase tracking-wider text-primary">Sl. No.</th>
                                                        <th className="px-6 py-4 font-black text-xs uppercase tracking-wider text-primary">Name</th>
                                                        <th className="px-6 py-4 font-black text-xs uppercase tracking-wider text-primary">Mobile</th>
                                                        <th className="px-6 py-4 font-black text-xs uppercase tracking-wider text-primary">Name of Student</th>
                                                        <th className="px-6 py-4 font-black text-xs uppercase tracking-wider text-primary">Class</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {[
                                                        { sl: 1, name: "Sri. Thomas M David", role: "Vice President", mob: "9446666139", student: "Deepa Hannah Thomas", class: "S8 CS" },
                                                        { sl: 2, name: "Dr. Jayalekshmi P A", role: "Joint Secretary", mob: "9447009355", student: "R. Devanarayanan", class: "S6 CS" },
                                                        { sl: 3, name: "Sri. Santhosh Ampadi", role: "Member", mob: "9446294472", student: "Meenakshi S", class: "S4 CL" },
                                                        { sl: 4, name: "Smt. Sunitha Sajeev", role: "Member", mob: "9947968941", student: "Sreeraman S Nair", class: "S6 EEE" },
                                                        { sl: 5, name: "Sri. Suresh M", role: "Member", mob: "9846218001", student: "Sidharth Suresh Madhav", class: "S4 CS" },
                                                        { sl: 6, name: "Sri. Unnikrishnan K G", role: "Member", mob: "7025498009", student: "Arjun Krishna", class: "S2 EC" }
                                                    ].map((p) => (
                                                        <tr key={p.sl} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-6 py-4 text-sm font-bold text-slate-400">{p.sl}</td>
                                                            <td className="px-6 py-4 text-sm">
                                                                <div className="font-bold text-primary">{p.name}</div>
                                                                <div className="text-xs text-slate-500 font-semibold">{p.role}</div>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm font-semibold text-slate-600">{p.mob}</td>
                                                            <td className="px-6 py-4 text-sm font-bold text-accent">{p.student}</td>
                                                            <td className="px-6 py-4 text-sm"><span className="px-2.5 py-1 rounded-md bg-slate-100 text-xs font-black text-slate-600 uppercase">{p.class}</span></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Teachers Executive Table */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-display font-black text-primary uppercase pb-2 border-b border-slate-100 flex items-center gap-3">
                                            <span className="w-1.5 h-6 bg-accent rounded-full shrink-0" />
                                            Executive Committee Members (Teachers)
                                        </h3>
                                        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white">
                                            <table className="w-full text-left border-collapse bg-white">
                                                <thead>
                                                    <tr className="bg-slate-50 border-b border-slate-100">
                                                        <th className="px-6 py-4 font-black text-xs uppercase tracking-wider text-primary">Sl. No.</th>
                                                        <th className="px-6 py-4 font-black text-xs uppercase tracking-wider text-primary">Name & Designation</th>
                                                        <th className="px-6 py-4 font-black text-xs uppercase tracking-wider text-primary">Mobile</th>
                                                        <th className="px-6 py-4 font-black text-xs uppercase tracking-wider text-primary">Position</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {[
                                                        { sl: 1, name: "Dr. Hari V S", desig: "Principal", mob: "8547005032", pos: "President" },
                                                        { sl: 2, name: "Dr. T E Ayoob Khan", desig: "Professor, Dept. of Electronics Engg.", mob: "9447556722", pos: "Secretary" },
                                                        { sl: 3, name: "Dr. Lekha R Nair", desig: "Professor, Dept. of Electronics Engg.", mob: "9496570592", pos: "Treasurer" },
                                                        { sl: 4, name: "Dr. Shanavaz K T", desig: "Dean (Academic)", mob: "9496108494", pos: "Member" },
                                                        { sl: 5, name: "Dr. C V Anilumar", desig: "HOD (Electronics Engg)", mob: "9446108491", pos: "Member" },
                                                        { sl: 6, name: "Dr. Ashok Kumar T V", desig: "HOD (General Engg.)", mob: "9447709779", pos: "Member" },
                                                        { sl: 7, name: "Dr. Renu George", desig: "HOD (Computer Engg.)", mob: "9747401150", pos: "Member" },
                                                        { sl: 8, name: "Dr. Raju M", desig: "HOD (Electrical Engg.)", mob: "9747405790", pos: "Member" },
                                                        { sl: 9, name: "Smt. Moni P John", desig: "HOD (Basic Science & Language)", mob: "9446538651", pos: "Member" }
                                                    ].map((t) => (
                                                        <tr key={t.sl} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-6 py-4 text-sm font-bold text-slate-400">{t.sl}</td>
                                                            <td className="px-6 py-4 text-sm">
                                                                <div className="font-bold text-primary">{t.name}</div>
                                                                <div className="text-xs text-slate-500 font-semibold">{t.desig}</div>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm font-semibold text-slate-600">{t.mob}</td>
                                                            <td className="px-6 py-4 text-sm"><span className="px-2.5 py-1 rounded-md bg-accent/10 text-xs font-black text-accent uppercase">{t.pos}</span></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ) : slug === 'btech' ? (
                                <div className="space-y-12">
                                    <div className="border-b border-slate-100 pb-6 mb-8 text-left">
                                        <span className="text-xs font-black uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
                                            Programmes
                                        </span>
                                        <h2 className="text-3xl font-display font-black text-primary uppercase mt-3">
                                            Engineering Full Time Courses
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                        {btechCourses.map((course, idx) => {
                                            const isExpanded = activeEligibility === idx;
                                            return (
                                                <div 
                                                    key={idx} 
                                                    className="bg-slate-50/50 hover:bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:border-accent/20 transition-all duration-300 flex flex-col justify-between group"
                                                >
                                                    <div className="space-y-6">
                                                        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300">
                                                            <BookOpen size={24} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <h3 className="text-xl font-display font-black text-primary group-hover:text-accent transition-colors duration-300 uppercase leading-snug">
                                                                {course.name}
                                                            </h3>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                                            <div className="bg-white p-3 rounded-xl border border-slate-100/60 shadow-sm flex items-center gap-3">
                                                                <Clock size={16} className="text-accent shrink-0" />
                                                                <div>
                                                                    <div className="text-[0.65rem] text-slate-400 font-black uppercase tracking-wider">Duration</div>
                                                                    <div className="text-xs font-black text-primary">{course.duration}</div>
                                                                </div>
                                                            </div>
                                                            <div className="bg-white p-3 rounded-xl border border-slate-100/60 shadow-sm flex items-center gap-3">
                                                                <Users size={16} className="text-accent shrink-0" />
                                                                <div>
                                                                    <div className="text-[0.65rem] text-slate-400 font-black uppercase tracking-wider">Intake</div>
                                                                    <div className="text-xs font-black text-primary">{course.intake}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-8 border-t border-slate-100 pt-6">
                                                        <button 
                                                            onClick={() => setActiveEligibility(isExpanded ? null : idx)}
                                                            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-accent hover:text-primary transition-colors cursor-pointer"
                                                        >
                                                            <span>Eligibility Requirements</span>
                                                            <span className="text-accent/60 font-medium">({isExpanded ? 'click to collapse' : 'click here'})</span>
                                                            <ChevronRight size={14} className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                                                        </button>

                                                        <motion.div
                                                            initial={false}
                                                            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                                                            className="overflow-hidden"
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        >
                                                            <div className="mt-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-inner space-y-4 text-xs font-semibold text-slate-600 leading-relaxed">
                                                                <div>
                                                                    <span className="font-black text-primary uppercase block mb-1">Academic Qualification</span>
                                                                    {course.eligibility.academic}
                                                                </div>
                                                                <div>
                                                                    <span className="font-black text-primary uppercase block mb-1">Marks Requirement</span>
                                                                    {course.eligibility.marks}
                                                                </div>
                                                                <div>
                                                                    <span className="font-black text-primary uppercase block mb-1">Entrance Exam</span>
                                                                    {course.eligibility.entrance}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : slug === 'mca' ? (
                                <div className="space-y-12">
                                    <div className="border-b border-slate-100 pb-6 mb-8 text-left">
                                        <span className="text-xs font-black uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
                                            Programmes
                                        </span>
                                        <h2 className="text-3xl font-display font-black text-primary uppercase mt-3">
                                            Postgraduate Course
                                        </h2>
                                    </div>

                                    <div className="max-w-2xl mx-auto text-left">
                                        <div 
                                            className="bg-slate-50/50 hover:bg-white rounded-3xl p-8 md:p-10 border border-slate-100 hover:shadow-xl hover:border-accent/20 transition-all duration-300 flex flex-col justify-between group"
                                        >
                                            <div className="space-y-6">
                                                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300">
                                                    <BookOpen size={24} />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-2xl font-display font-black text-primary group-hover:text-accent transition-colors duration-300 uppercase leading-snug">
                                                        {mcaCourse.name}
                                                    </h3>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 pt-2">
                                                    <div className="bg-white p-4 rounded-xl border border-slate-100/60 shadow-sm flex items-center gap-3">
                                                        <Clock size={18} className="text-accent shrink-0" />
                                                        <div>
                                                            <div className="text-[0.65rem] text-slate-400 font-black uppercase tracking-wider">Duration</div>
                                                            <div className="text-sm font-black text-primary">{mcaCourse.duration}</div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-white p-4 rounded-xl border border-slate-100/60 shadow-sm flex items-center gap-3">
                                                        <Users size={18} className="text-accent shrink-0" />
                                                        <div>
                                                            <div className="text-[0.65rem] text-slate-400 font-black uppercase tracking-wider">Intake</div>
                                                            <div className="text-sm font-black text-primary">{mcaCourse.intake}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-8 border-t border-slate-100 pt-6">
                                                <button 
                                                    onClick={() => setActiveEligibility(activeEligibility === 'mca' ? null : 'mca')}
                                                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-accent hover:text-primary transition-colors cursor-pointer"
                                                >
                                                    <span>Eligibility Requirements</span>
                                                    <span className="text-accent/60 font-medium">({activeEligibility === 'mca' ? 'click to collapse' : 'click here'})</span>
                                                    <ChevronRight size={14} className={`transform transition-transform duration-300 ${activeEligibility === 'mca' ? 'rotate-90' : ''}`} />
                                                </button>

                                                <motion.div
                                                    initial={false}
                                                    animate={{ height: activeEligibility === 'mca' ? 'auto' : 0, opacity: activeEligibility === 'mca' ? 1 : 0 }}
                                                    className="overflow-hidden"
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <div className="mt-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-inner space-y-4 text-xs font-semibold text-slate-600 leading-relaxed">
                                                        <div>
                                                            <span className="font-black text-primary uppercase block mb-1">Academic Qualification</span>
                                                            {mcaCourse.eligibility.academic}
                                                        </div>
                                                        <div>
                                                            <span className="font-black text-primary uppercase block mb-1">Marks Requirement</span>
                                                            {mcaCourse.eligibility.marks}
                                                        </div>
                                                        <div>
                                                            <span className="font-black text-primary uppercase block mb-1">Entrance Exam</span>
                                                            {mcaCourse.eligibility.entrance}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             ) : slug === 'apjaktu' || slug === 'aicte' ? (
                                <div className="space-y-12 text-left">
                                    {/* University Affiliation Header */}
                                    <div className="border-b border-slate-100 pb-6 mb-8">
                                        <span className="text-xs font-black uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
                                            {slug === 'apjaktu' ? 'University Affiliation' : 'National Council'}
                                        </span>
                                        <h2 className="text-3xl font-display font-black text-primary uppercase mt-3">
                                            {slug === 'apjaktu' ? 'APJ Abdul Kalam Technological University' : 'All India Council for Technical Education'}
                                        </h2>
                                    </div>

                                    <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">
                                        {/* Description Card */}
                                        <div className="bg-slate-50/50 rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-sm text-justify">
                                            <p className="text-xl leading-[1.8] text-slate-700 font-medium font-sans">
                                                {content.content}
                                            </p>
                                        </div>

                                        {/* Logo Branding Card */}
                                        <div className="flex justify-center">
                                            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-[0_15px_40px_rgba(12,43,78,0.04)] flex items-center justify-center w-full transition-transform duration-500 hover:scale-[1.02]">
                                                <img 
                                                    src={slug === 'apjaktu' ? "/images/apjaktu_logo.png" : "/images/aicte_logo.png"} 
                                                    alt={`${content.title} Logo`} 
                                                    className="w-full max-w-[200px] object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 mb-10">
                                    {parseContent(content.content).map((segment, i) => {
                                        if (segment.type === 'accordion') {
                                            return <AccordionItem key={i} title={segment.title} items={segment.items} />;
                                        }

                                        const trimmed = segment.text.trim();
                                        if (!trimmed) return null;
                                        
                                        // Bullet points
                                        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
                                        const isNumber = /^\d+\./.test(trimmed);
                                        
                                        if (isBullet) {
                                            return (
                                                <p key={i} className="text-lg text-slate-600 leading-relaxed font-medium pl-6 relative">
                                                    <span className="absolute left-0 text-accent font-extrabold">•</span>
                                                    {trimmed.substring(1).trim()}
                                                </p>
                                            );
                                        }
                                        
                                        if (isNumber) {
                                            const match = trimmed.match(/^(\d+)\.(.*)/);
                                            const num = match ? match[1] : '';
                                            const text = match ? match[2].trim() : trimmed;
                                            return (
                                                <div key={i} className="flex items-start gap-4 pl-1 py-1">
                                                    <span className="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent font-black text-sm">
                                                        {num}
                                                    </span>
                                                    <p className="text-lg text-slate-600 leading-relaxed font-medium pt-0.5">
                                                        {text}
                                                    </p>
                                                </div>
                                            );
                                        }
                                        
                                        // Header styling inside content blocks
                                        const isHeader = trimmed.endsWith(':') || 
                                                         trimmed.startsWith('Name of Executive') || 
                                                         trimmed.startsWith('Key Resources');
                                        if (isHeader) {
                                            return (
                                                <h3 key={i} className="text-xl font-display font-black text-primary uppercase pt-6 pb-2 border-b border-slate-100 flex items-center gap-3">
                                                    <span className="w-1.5 h-6 bg-accent rounded-full shrink-0" />
                                                    {trimmed}
                                                </h3>
                                            );
                                        }

                                        return (
                                            <p key={i} className="text-[1.15rem] leading-[1.8] text-secondary/80 font-medium">
                                                {trimmed}
                                            </p>
                                        );
                                    })}
                                </div>
                            )}

                            {content.category !== 'Committees' && slug !== 'btech' && slug !== 'mca' && slug !== 'doctoral' && slug !== 'apjaktu' && slug !== 'aicte' && (
                                <>
                                    <h3 className="text-2xl font-bold text-primary mb-6">Key Details & Context</h3>
                                    <p className="text-[1.15rem] mb-10">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                                        <div className="bg-background/50 p-6 rounded-2xl border-l-4 border-accent">
                                            <h4 className="font-bold text-lg text-primary mb-2 uppercase tracking-wide">Vision 2026</h4>
                                            <p className="text-sm">Excellence in research and infrastructure to support future student innovation hub in Kerala's technological ecosystem.</p>
                                        </div>
                                        <div className="bg-background/50 p-6 rounded-2xl border-l-4 border-secondary">
                                            <h4 className="font-bold text-lg text-primary mb-2 uppercase tracking-wide">Core Objective</h4>
                                            <p className="text-sm">Focusing on skill development and industry connections through the prestigious IHRD educational framework.</p>
                                        </div>
                                    </div>

                                    <p className="text-[1.1rem]">
                                        For more information or specific inquiries regarding {content.title}, please reach out to the institutional desk during office hours or visit our contact page for dedicated department extensions.
                                    </p>
                                </>
                            )}
                            {content.category === 'Committees' && (
                                <div className="mt-12 pt-12 border-t border-slate-100">
                                    <h3 className="text-xl font-display font-black text-primary uppercase pb-6 flex items-center gap-3">
                                        <span className="w-1.5 h-6 bg-accent rounded-full shrink-0" />
                                        Compliance & Standards
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100/80 hover:border-accent/20 transition-all duration-300 group">
                                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-lg font-black mb-4 group-hover:scale-110 transition-transform">
                                                ⚖️
                                            </div>
                                            <h4 className="font-bold text-base text-primary mb-2 uppercase tracking-wider">Regulatory Compliance</h4>
                                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                                Fully aligned with administrative guidelines issued by AICTE, UGC, APJ Abdul Kalam Technological University, and the Government of Kerala.
                                            </p>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100/80 hover:border-accent/20 transition-all duration-300 group">
                                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-lg font-black mb-4 group-hover:scale-110 transition-transform">
                                                🛡️
                                            </div>
                                            <h4 className="font-bold text-base text-primary mb-2 uppercase tracking-wider">Institutional Integrity</h4>
                                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                                Dedicated to preserving transparency, ethical standards, safety, and an inclusive campus culture for all members.
                                            </p>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100/80 hover:border-accent/20 transition-all duration-300 group">
                                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-lg font-black mb-4 group-hover:scale-110 transition-transform">
                                                📅
                                            </div>
                                            <h4 className="font-bold text-base text-primary mb-2 uppercase tracking-wider">Meeting Frequency</h4>
                                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                                Conducted periodically during every academic term, with resolutions documented and reviewed by the central advisory board.
                                            </p>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100/80 hover:border-accent/20 transition-all duration-300 group">
                                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-lg font-black mb-4 group-hover:scale-110 transition-transform">
                                                🔒
                                            </div>
                                            <h4 className="font-bold text-base text-primary mb-2 uppercase tracking-wider">Confidentiality & Access</h4>
                                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                                All submissions, grievances, and discussions are handled with strict privacy protocols to protect student and staff identities.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {slug !== 'parents-teachers' && slug !== 'right-to-info' && slug !== 'btech' && slug !== 'mca' && slug !== 'doctoral' && slug !== 'apjaktu' && slug !== 'aicte' && (
                        <div className="lg:col-span-4 space-y-10">
                            {/* Notice Card */}
                            <div className="bg-primary p-8 rounded-[2rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                               <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
                               <h3 className="text-xl font-black mb-6 uppercase tracking-widest flex items-center gap-2">
                                   Helpdesk
                               </h3>
                               <p className="text-sm text-white/70 mb-8 leading-relaxed font-bold">
                                   Need more clarification on institutional policies or specific details regarding {content.title}?
                               </p>
                               <Link to="/contact" className="block w-full bg-accent py-4 rounded-xl text-center font-black hover:bg-white hover:text-primary transition-all duration-300 tracking-wider">
                                    CONTACT US
                               </Link>
                            </div>

                            {/* Recent Items / Sidebar Menu */}
                            <div className="bg-white p-8 rounded-[2rem] border border-primary/5 shadow-lg">
                               <h3 className="text-lg font-black text-primary mb-6 uppercase tracking-widest border-b border-primary/5 pb-4">
                                   Related Info
                               </h3>
                               <ul className="space-y-4">
                                   {['Academic Calendar', 'Mandatory Disclosures', 'Anti-Ragging Committee'].map((link, i) => (
                                       <li key={i}>
                                           <a href="#" className="flex items-center justify-between group py-2">
                                               <span className="text-[0.95rem] font-bold text-secondary/60 group-hover:text-accent transition-colors">{link}</span>
                                               <ChevronRight size={16} className="text-primary/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                           </a>
                                       </li>
                                   ))}
                                </ul>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ContentPage;
