import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
    Mail, Phone, MapPin, GraduationCap, 
    Briefcase, ArrowLeft, Quote, 
    ChevronRight, Home, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { teachersData } from '../data/teachersData';
import { client, urlFor } from '../lib/sanity';

const TeacherDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sanityTeacher, setSanityTeacher] = useState(null);
    const [loading, setLoading] = useState(true);

    // Helper to find teacher in nested structure
    const findStaticTeacher = () => {
        // Check B.Tech
        for (const deptKey in teachersData.btech.departments) {
            const dept = teachersData.btech.departments[deptKey];
            if (dept.hod.id === id) return { ...dept.hod, deptLabel: dept.label, color: dept.color };
            const faculty = dept.faculty.find(f => f.id === id);
            if (faculty) return { ...faculty, deptLabel: dept.label, color: dept.color };
        }
        // Check MCA
        const mca = teachersData.mca;
        if (mca.hod.id === id) return { ...mca.hod, deptLabel: 'MCA', color: '#4A235A' };
        const faculty = mca.faculty.find(f => f.id === id);
        if (faculty) return { ...faculty, deptLabel: 'MCA', color: '#4A235A' };
        
        return null;
    };

    const staticTeacher = findStaticTeacher();

    useEffect(() => {
        window.scrollTo(0, 0);
        
        if (!staticTeacher) {
            setLoading(true);
            const query = `*[_type == "teacher" && _id == $id][0]{
                ...,
                "deptLabel": department->name,
                "color": department->color
            }`;
            client.fetch(query, { id })
                .then(data => {
                    if (data) {
                        setSanityTeacher(data);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Sanity fetch error:", err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [id, staticTeacher]);

    const teacher = sanityTeacher || staticTeacher;

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <p className="text-slate-500 mt-4 font-semibold">Loading Profile...</p>
            </div>
        );
    }

    if (!teacher) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-display font-black text-primary mb-4">Teacher Not Found</h2>
                <Link to="/page/teachers" className="px-6 py-2 bg-primary text-white rounded-full font-bold">Back to Directory</Link>
            </div>
        );
    }

    const accent = teacher.color || '#0C2B4E';

    return (
        <div className="min-h-screen bg-white pb-20">
             

            {/* ─── Hero Section (As per wireframe: Large Image) ─── */}
            <div className="relative w-full h-[60vh] sm:h-[70vh] bg-slate-100 overflow-hidden">
                <motion.img 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    src={teacher.photo ? (teacher.photo.asset ? urlFor(teacher.photo).width(800).height(1000).fit('crop').url() : teacher.photo) : `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&size=800&background=0C2B4E&color=ffffff&bold=true`} 
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Name Overlay */}
                <div className="absolute bottom-16 left-0 right-0 px-6 sm:px-12">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white text-[0.7rem] font-black tracking-widest uppercase mb-4">
                                {teacher.designation}
                            </span>
                            <h1 className="text-4xl sm:text-7xl font-display font-black text-white leading-tight uppercase tracking-tighter">
                                {teacher.name}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ─── Wavy Separator (As per wireframe) ─── */}
            <div className="relative -mt-1 z-10">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-[-2px_-5px_5px_rgba(0,0,0,0.1)]">
                    <path 
                        d="M0 48L60 42.7C120 37 240 27 360 37.3C480 48 600 75 720 80C840 85 960 75 1080 58.7C1200 43 1320 21 1380 10.7L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V48Z" 
                        fill="white"
                    />
                    <path 
                        d="M0 64L60 58.7C120 53 240 43 360 53.3C480 64 600 91 720 96C840 101 960 91 1080 74.7C1200 59 1320 37 1380 26.7L1440 16V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V64Z" 
                        fill="url(#gradient-bg)"
                        opacity="0.05"
                    />
                    <defs>
                        <linearGradient id="gradient-bg" x1="720" y1="0" x2="720" y2="120" gradientUnits="userSpaceOnUse">
                            <stop stopColor={accent} />
                            <stop offset="1" stopColor="white" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* ─── Content Section (As per wireframe: Gradient applied below) ─── */}
            <div 
                className="pt-12 px-6"
                style={{ background: `linear-gradient(180deg, rgba(255,255,255,1) 0%, ${accent}08 10%, rgba(255,255,255,1) 100%)` }}
            >
                <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-16">
                    
                    {/* Left Column: About & Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        
                        {/* About Section */}
                        <motion.section 
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-1.5 rounded-full" style={{ background: accent }} />
                                <h2 className="text-3xl font-display font-black text-primary uppercase tracking-tight">About</h2>
                            </div>
                            <div className="space-y-4 text-lg text-slate-600 leading-relaxed font-medium">
                                {(teacher.about || []).map((p, i) => <p key={i}>{p}</p>)}
                            </div>
                        </motion.section>

                        {/* Specialization Section */}
                        <motion.section 
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-1.5 rounded-full" style={{ background: accent }} />
                                <h2 className="text-3xl font-display font-black text-primary uppercase tracking-tight">Specialization</h2>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {(teacher.specialization || '').split(',').map((s, i) => (
                                    <span 
                                        key={i}
                                        className="px-5 py-2.5 rounded-xl border border-slate-200 text-primary font-bold text-sm bg-white shadow-sm hover:border-accent hover:text-accent transition-all duration-300"
                                    >
                                        {s.trim()}
                                    </span>
                                ))}
                            </div>
                        </motion.section>

                        {/* Publications Section */}
                        {teacher.publications && teacher.publications.length > 0 && (
                            <motion.section 
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-1.5 rounded-full" style={{ background: accent }} />
                                    <h2 className="text-3xl font-display font-black text-primary uppercase tracking-tight">Publications</h2>
                                </div>
                                <ul className="space-y-4">
                                    {teacher.publications.map((pub, i) => (
                                        <li 
                                            key={i} 
                                            className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:border-accent/30 hover:shadow-md transition-all duration-300"
                                        >
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-display" style={{ background: `${accent}10`, color: accent }}>
                                                <span className="text-sm font-black">{i + 1}</span>
                                            </div>
                                            <p className="text-[1.05rem] text-slate-700 font-medium leading-relaxed mt-0.5">
                                                {pub}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </motion.section>
                        )}

                        {/* A Word from Teacher (As per wireframe) */}
                        <motion.section 
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative p-10 rounded-[3rem] overflow-hidden"
                        >
                            <div className="absolute inset-0 opacity-10" style={{ background: accent }} />
                            <div className="absolute top-8 left-8 text-primary opacity-20">
                                <Quote size={64} fill="currentColor" />
                            </div>
                            <div className="relative z-10 text-center space-y-6">
                                <h2 className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-primary/40">A Word from Teacher</h2>
                                <p className="text-2xl sm:text-3xl font-display font-black text-primary leading-tight italic">
                                    "{teacher.wordFromTeacher}"
                                </p>
                                <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
                            </div>
                        </motion.section>

                    </div>

                    {/* Right Column: Other Details & Sidebar */}
                    <div className="lg:col-span-4 space-y-10">
                        
                        {/* Detail Cards */}
                        <motion.div 
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2rem] border border-slate-100 shadow-2xl p-8 space-y-8"
                        >
                            <h3 className="text-xl font-display font-black text-primary uppercase tracking-tight border-b border-slate-100 pb-4">Other Details</h3>
                            
                            <div className="space-y-6">
                                <DetailItem icon={<GraduationCap />} label="Qualification" value={teacher.qualification} color={accent} />
                                <DetailItem icon={<Briefcase />} label="Experience" value={teacher.experience} color={accent} />
                                <DetailItem icon={<MapPin />} label="Office Location" value={teacher.staffRoom} color={accent} />
                                <DetailItem icon={<Globe />} label="Department" value={teacher.deptLabel} color={accent} />
                                <DetailItem 
                                    icon={<Mail />} 
                                    label="Email Address" 
                                    value={teacher.email} 
                                    color={accent} 
                                    isLink={`mailto:${teacher.email}`}
                                />
                                <DetailItem 
                                    icon={<Phone />} 
                                    label="Phone Number" 
                                    value={teacher.phone} 
                                    color={accent} 
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ icon, label, value, color, isLink }) => (
    <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}10`, color: color }}>
            {React.cloneElement(icon, { size: 18 })}
        </div>
        <div>
            <p className="text-[0.62rem] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            {isLink ? (
                <a href={isLink} className="text-sm font-bold text-primary hover:text-accent transition-colors leading-tight block truncate max-w-[200px]">{value}</a>
            ) : (
                <p className="text-sm font-bold text-primary leading-tight">{value}</p>
            )}
        </div>
    </div>
);

export default TeacherDetail;
