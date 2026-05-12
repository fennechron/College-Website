import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GraduationCap, Award, BookOpen, Briefcase,
    Lightbulb, Globe, Mail, MapPin,
    MessageSquare, Quote, FileText, Book,
    Linkedin, Twitter, ChevronRight, Phone
} from 'lucide-react';

const PrincipalPage = () => {
    const [activeTab, setActiveTab] = useState('expertise');

    const tabs = [
        { id: 'expertise', label: 'Expertise', icon: <Lightbulb size={18} /> },
        { id: 'positions', label: 'Positions', icon: <Briefcase size={18} /> },
        { id: 'publications', label: 'Publications', icon: <FileText size={18} /> },
        { id: 'research', label: 'Research', icon: <Globe size={18} /> },
        { id: 'industry', label: 'Industry', icon: <Award size={18} /> },
        { id: 'books', label: 'Books', icon: <Book size={18} /> }
    ];

    const academicData = {
        expertise: [
            { title: "Mathematical Tools", desc: "LATEX, PsTricks, dia, xcircuit, LATEXDraw" },
            { title: "Programming & Web", desc: "Python, C, HTML, Linux" },
            { title: "Simulation & Data", desc: "MATLAB, LabVIEW, Scipy, Numpy, Keras, Tensorflow, Dash, QUCS" }
        ],
        positions: [
            { title: "Associate Professor", desc: "Dept. of Electronics Engg, CE, Chengannur" },
            { title: "Head of Department", desc: "Department of EC, CE, Karunagappally" },
            { title: "Principal in Charge", desc: "College of Engineering, Karunagappally" },
            { title: "Lecturer (Selection Grade)", desc: "Department of EC, CE Kottarakkara" },
            { title: "Lecturer (Senior Grade)", desc: "Department of EC, CE Karunagappally" },
            { title: "Lecturer", desc: "Department of EC, CE, Chengannur" }
        ],
        publications: [
            { title: "Journal: Letter Image Classification", desc: "Classification of Letter Image from Scanned Receipts using CNN, Oct 2023." },
            { title: "Journal: Modulation Schemes", desc: "Automatic Detection using Convolutional Neural Networks, June 2023." },
            { title: "Journal: Intelligent Receivers", desc: "Intelligent Deep Learning based Receivers, August 2023." },
            { title: "Journal: Traffic Prediction", desc: "LSTM Network Integrated with Particle Filter for Predicting Passenger Traffic, 2023." },
            { title: "Conference: Stock Price", desc: "Recurrent Neural Network estimator for Stock Price, IEEE 2021." },
            { title: "Conference: Gold Prediction", desc: "Gold Price Prediction using Deep Learning, IEEE 2020." }
        ],
        research: [
            { title: "Rand Walk Research", desc: "Founder of Rand Walk Research and Solutions Pvt. Ltd. (Started June 20, 2020) under Faculty startup scheme." },
            { title: "Startup Status", desc: "Awarded startup status by Govt. of India for projects in Data Analysis, ML and Computer Vision." }
        ],
        industry: [
            { title: "NMR & Image Analysis", desc: "Identification of peaks in NMR data and entity extraction from images of receipts." },
            { title: "Industrial Modeling", desc: "Modeling plasticity in friction stir welding and vibration signal normalization." },
            { title: "Optimization Projects", desc: "Pune Mahanagar Parivahan Mahamandal Ltd. (PMPML) Bus Route Optimization." },
            { title: "Automation", desc: "Development of Recommender Systems for Automated Purchase." }
        ],
        books: [
            { title: "Electronics Lab Handbook", desc: "Simulations using Quite Universal Circuit Simulator (Qucs), Authors Press, ISBN-978-93-5529-048-9" },
            { title: "Logic Circuit Design", desc: "Laboratory practice with Qucs, ICs, Verilog and Mini FPGA, ISBN-978-93-5529-175-2" }
        ]
    };

    return (
        <div className="min-h-screen bg-white">
            {/* ─── Immersive Hero Section ─── */}
            <div className="relative h-[90vh] flex items-center bg-[#0a0f1a] overflow-hidden">
                {/* Background Textures */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:20px_20px]" />
                </div>
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full translate-x-1/2" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <h1 className="text-5xl sm:text-7xl font-display font-black text-white leading-none tracking-tighter">
                                Prof. (Dr.) <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-500">
                                    Hari. V S
                                </span>
                            </h1>
                            <p className="text-lg text-slate-400 font-display font-black uppercase tracking-widest flex items-center gap-4">
                                <span className="w-12 h-1 bg-accent rounded-full" />
                                Principal
                            </p>
                        </div>

                        <p className="text-base text-slate-400 max-w-lg font-medium leading-relaxed">
                            Principal of College of Engineering Chengannur. Researcher and professor with expertise in nonlinear signal processing and communication systems.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4 text-slate-400">
                                <MapPin size={20} className="text-accent shrink-0 mt-1" />
                                <p className="text-sm font-medium">Principal, College of Engineering, Chengannur, Alappuzha (Dist.) – 689121</p>
                            </div>
                            <div className="flex items-center gap-4 text-slate-400">
                                <Phone size={20} className="text-accent shrink-0" />
                                <p className="text-sm font-medium">0479-2450435</p>
                            </div>
                            <div className="flex items-center gap-4 text-slate-400">
                                <Mail size={20} className="text-accent shrink-0" />
                                <p className="text-sm font-medium">principal@ceconline.edu</p>
                            </div>
                        </div>


                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 w-full aspect-[4/3] rounded-[3rem] overflow-hidden border-[16px] border-white/5 shadow-2xl">
                            <img
                                src="https://ceconline.edu/wp-content/uploads/2019/05/hari-1024x667.jpg"
                                alt="Principal"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ─── Principal's Desk Section ─── */}
            <div className="py-32 relative bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="relative">
                            <div className="absolute -top-20 -left-10 text-[15rem] font-black text-slate-100/80 z-0">"</div>
                            <div className="relative z-10 space-y-8">
                                <h2 className="text-4xl font-display font-black text-primary uppercase">Principal's <br /> Message</h2>
                                <div className="space-y-6">
                                    <p className="text-2xl text-primary font-medium leading-relaxed italic">
                                        "CEC is not just an institution; it's a movement towards engineering excellence that empowers students to lead with integrity and innovation."
                                    </p>
                                    <p className="text-lg text-slate-500 leading-relaxed font-medium">
                                        Our commitment is to provide an environment where curiosity meets structure. We focus on bridging the gap between theoretical research and industrial application, ensuring our graduates are ready for the challenges of tomorrow.
                                    </p>
                                </div>
                                <div className="flex items-center gap-6 pt-6">
                                    <div className="w-16 h-1 bg-accent rounded-full" />
                                    <p className="font-display font-black text-primary uppercase tracking-widest">About CEC</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Qualifications Timeline */}
                        <div className="space-y-12">
                            <h3 className="text-2xl font-display font-black text-primary uppercase tracking-widest">Academic Qualifications</h3>
                            <div className="space-y-10 relative">
                                <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-slate-100" />

                                {[
                                    { year: '2013', deg: 'PhD - CUSAT', color: 'bg-accent', text: 'Doctoral thesis on Nonlinear Volterra Signal Processing.' },
                                    { year: '2006', deg: 'M.Tech - IIT Madras', color: 'bg-primary', text: 'Communication Systems specialization from India\'s top institute.' },
                                    { year: '1994', deg: 'B.Tech - TKM Kollam', color: 'bg-slate-800', text: 'Foundational degree in Electronics and Communication Engineering.' }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 10 }}
                                        className="relative pl-16 group"
                                    >
                                        <div className={`absolute left-0 top-1 w-12 h-12 rounded-2xl ${item.color} border-4 border-white shadow-xl z-10 flex items-center justify-center text-white`}>
                                            <GraduationCap size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">{item.year}</p>
                                            <h4 className="text-xl font-display font-black text-primary group-hover:text-accent transition-colors">{item.deg}</h4>
                                            <p className="text-slate-500 font-medium text-sm mt-1">{item.text}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Detailed Tabs Section ─── */}
            <div className="bg-slate-50 py-32 rounded-t-[5rem]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-20">
                        {/* Tab Controls */}
                        <div className="lg:w-1/3 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-display font-black text-primary uppercase leading-none">Professional <br /> Details</h2>
                                <p className="text-slate-500 font-medium">Information regarding research, publications, and professional contributions.</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center justify-between p-6 rounded-2xl font-black text-[0.7rem] uppercase tracking-widest transition-all group ${activeTab === tab.id
                                            ? 'bg-primary text-white shadow-2xl translate-x-4'
                                            : 'bg-white text-slate-400 hover:bg-white hover:text-primary'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`${activeTab === tab.id ? 'text-accent' : 'text-slate-300'} group-hover:text-accent transition-colors`}>
                                                {tab.icon}
                                            </div>
                                            {tab.label}
                                        </div>
                                        <ChevronRight size={16} className={`${activeTab === tab.id ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="lg:w-2/3">
                            <div className="bg-white p-12 sm:p-16 rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-slate-100 min-h-[500px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="space-y-12"
                                    >
                                        <div className="space-y-2">
                                            <h3 className="text-4xl font-display font-black text-primary uppercase">
                                                {tabs.find(t => t.id === activeTab).label}
                                            </h3>
                                        </div>

                                        <div className="grid gap-10">
                                            {academicData[activeTab].map((item, i) => (
                                                <div key={i} className="group relative pl-12 border-l-2 border-slate-500 hover:border-accent transition-colors">

                                                    <h4 className="text-xl font-display font-black text-primary group-hover:text-accent transition-colors mb-2">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            ))}
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
