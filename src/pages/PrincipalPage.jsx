import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GraduationCap, Award, BookOpen, Briefcase,
    Lightbulb, Globe, Mail, MapPin,
    MessageSquare, Quote, FileText, Book,
    Linkedin, Twitter, ChevronRight, Phone
} from 'lucide-react';
import { client, urlFor } from '../lib/sanity';

const PrincipalPage = () => {
    const [activeTab, setActiveTab] = useState('expertise');
    const [principal, setPrincipal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrincipal = async () => {
            try {
                const data = await client.fetch(`*[_type == "principal"][0]`);
                setPrincipal(data);
            } catch (error) {
                console.error("Error fetching principal data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPrincipal();
    }, []);

    const tabs = [
        { id: 'expertise', label: 'Expertise', icon: <Lightbulb size={18} /> },
        { id: 'positions', label: 'Positions', icon: <Briefcase size={18} /> },
        { id: 'publications', label: 'Publications', icon: <FileText size={18} /> },
        { id: 'research', label: 'Research', icon: <Globe size={18} /> },
        { id: 'industry', label: 'Industry', icon: <Award size={18} /> },
        { id: 'books', label: 'Books', icon: <Book size={18} /> }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
            </div>
        );
    }

    if (!principal) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-primary text-xl font-bold">
                Failed to load principal profile.
            </div>
        );
    }

    const defaultImage = "https://ceconline.edu/wp-content/uploads/2019/05/hari-1024x667.jpg";

    return (
        <div className="min-h-screen bg-white">
            {/* ─── Immersive Hero Section ─── */}
            <div className="relative min-h-[90vh] lg:h-[90vh] flex items-center bg-[#0a0f1a] overflow-hidden py-24 lg:py-0">
                {/* Background Textures */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:20px_20px]" />
                </div>
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full translate-x-1/2" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 lg:space-y-8"
                    >
                        <div className="space-y-4">
                            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-display font-black text-white leading-none tracking-tighter">
                                {principal.name || "Prof. (Dr.) Hari V S"}
                            </h1>
                            <p className="text-sm sm:text-lg text-slate-400 font-display font-black uppercase tracking-widest flex items-center gap-4">
                                <span className="w-12 h-1 bg-accent rounded-full" />
                                {principal.designation || "Principal"}
                            </p>
                        </div>

                        <p className="text-sm sm:text-base text-slate-400 max-w-lg font-medium leading-relaxed">
                            {principal.description || "Principal of College of Engineering Chengannur. Researcher and professor with expertise in nonlinear signal processing and communication systems."}
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4 text-slate-400">
                                <MapPin size={20} className="text-accent shrink-0 mt-1" />
                                <p className="text-sm font-medium">{principal.address || "Principal, College of Engineering, Chengannur, Alappuzha (Dist.) – 689121"}</p>
                            </div>
                            <div className="flex items-center gap-4 text-slate-400">
                                <Phone size={20} className="text-accent shrink-0" />
                                <p className="text-sm font-medium">{principal.phone || "0479-2450435"}</p>
                            </div>
                            <div className="flex items-center gap-4 text-slate-400">
                                <Mail size={20} className="text-accent shrink-0" />
                                <p className="text-sm font-medium">{principal.email || "principal@ceconline.edu"}</p>
                            </div>
                        </div>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full max-w-md mx-auto lg:max-w-none"
                    >
                        <div className="relative z-10 w-full aspect-[4/3] rounded-2xl sm:rounded-[3rem] overflow-hidden border-8 sm:border-[16px] border-white/5 shadow-2xl">
                            <img
                                src={principal.image ? urlFor(principal.image).url() : defaultImage}
                                alt="Principal"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ─── Principal's Desk Section ─── */}
            <div className="py-16 sm:py-32 relative bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <div className="relative">
                            <div className="absolute -top-20 -left-10 text-[15rem] font-black text-slate-100/80 z-0">"</div>
                            <div className="relative z-10 space-y-6 sm:space-y-8">
                                <h2 className="text-2xl sm:text-4xl font-display font-black text-primary uppercase">Principal's <br className="hidden sm:inline" /> Message</h2>
                                <div className="space-y-4 sm:space-y-6">
                                    <p className="text-lg sm:text-2xl text-primary font-medium leading-relaxed italic">
                                        "{principal.quote || "CEC is not just an institution; it's a movement towards engineering excellence that empowers students to lead with integrity and innovation."}"
                                    </p>
                                    <p className="text-sm sm:text-lg text-slate-500 leading-relaxed font-medium text-justify">
                                        {principal.message || "Our commitment is to provide an environment where curiosity meets structure. We focus on bridging the gap between theoretical research and industrial application, ensuring our graduates are ready for the challenges of tomorrow."}
                                    </p>
                                </div>
                                <div className="flex items-center gap-6 pt-6">
                                    <div className="w-16 h-1 bg-accent rounded-full" />
                                    <p className="font-display font-black text-primary uppercase tracking-widest text-sm sm:text-base">About CEC</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Qualifications Timeline */}
                        <div className="space-y-6 sm:space-y-12">
                            <h3 className="text-xl sm:text-2xl font-display font-black text-primary uppercase tracking-widest">Academic Qualifications</h3>
                            <div className="space-y-8 sm:space-y-10 relative">
                                <div className="absolute left-[19px] sm:left-[23px] top-4 bottom-4 w-1 bg-slate-100" />

                                {(principal.qualifications || [
                                    { year: '2013', degree: 'PhD - CUSAT', color: 'bg-accent', description: 'Doctoral thesis on Nonlinear Volterra Signal Processing.' },
                                    { year: '2006', degree: 'M.Tech - IIT Madras', color: 'bg-primary', description: 'Communication Systems specialization from India\'s top institute.' },
                                    { year: '1994', degree: 'B.Tech - TKM Kollam', color: 'bg-slate-800', description: 'Foundational degree in Electronics and Communication Engineering.' }
                                ]).map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 10 }}
                                        className="relative pl-12 sm:pl-16 group"
                                    >
                                        <div className={`absolute left-0 top-1 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${item.color || 'bg-accent'} border-4 border-white shadow-xl z-10 flex items-center justify-center text-white`}>
                                            <GraduationCap size={16} className="sm:w-5 sm:h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[0.65rem] sm:text-sm font-black text-slate-400 uppercase tracking-widest mb-1">{item.year}</p>
                                            <h4 className="text-base sm:text-xl font-display font-black text-primary group-hover:text-accent transition-colors">{item.degree}</h4>
                                            <p className="text-slate-500 font-medium text-xs sm:text-sm mt-1">{item.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Detailed Tabs Section ─── */}
            <div className="bg-slate-50 py-16 sm:py-32 rounded-t-[2.5rem] sm:rounded-t-[5rem]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
                        {/* Tab Controls */}
                        <div className="lg:w-1/3 space-y-6 sm:space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-2xl sm:text-4xl font-display font-black text-primary uppercase leading-none">Professional <br /> Details</h2>
                                <p className="text-slate-500 font-medium">Information regarding research, publications, and professional contributions.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:gap-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center justify-between p-3 sm:p-6 rounded-xl sm:rounded-2xl font-black text-[0.6rem] sm:text-[0.7rem] uppercase tracking-widest transition-all group ${activeTab === tab.id
                                            ? 'bg-primary text-white shadow-xl lg:translate-x-4'
                                            : 'bg-white text-slate-400 hover:bg-white hover:text-primary shadow-sm'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 sm:gap-4">
                                            <div className={`${activeTab === tab.id ? 'text-accent' : 'text-slate-300'} group-hover:text-accent transition-colors`}>
                                                {tab.icon}
                                            </div>
                                            {tab.label}
                                        </div>
                                        <ChevronRight size={16} className={`hidden sm:block ${activeTab === tab.id ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="lg:w-2/3">
                            <div className="bg-white p-6 sm:p-16 rounded-3xl sm:rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-slate-100 min-h-0 lg:min-h-[500px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="space-y-6 sm:space-y-12"
                                    >
                                        <div className="space-y-2">
                                            <h3 className="text-2xl sm:text-4xl font-display font-black text-primary uppercase">
                                                {tabs.find(t => t.id === activeTab).label}
                                            </h3>
                                        </div>

                                        <div className="grid gap-6 sm:gap-10">
                                            {principal?.professionalDetails?.[activeTab]?.map((item, i) => (
                                                <div key={i} className="group relative pl-6 sm:pl-12 border-l-2 border-slate-500 hover:border-accent transition-colors">

                                                    <h4 className="text-base sm:text-xl font-display font-black text-primary group-hover:text-accent transition-colors mb-1 sm:mb-2">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-slate-500 font-medium text-sm sm:text-lg leading-relaxed text-justify">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            ))}
                                            {!principal?.professionalDetails?.[activeTab] && (
                                                 <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                                 No details available.
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PrincipalPage;
