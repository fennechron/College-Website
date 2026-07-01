import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ChevronRight, Home, Mail, Phone, MapPin,
    BookOpen, Users, GraduationCap,
    Briefcase, ChevronDown, Crown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { client, urlFor } from '../lib/sanity';

// ─── HOD Card — Premium full-width university profile card ──────────────────────
const HodCard = ({ member, accentHex }) => {
    const accent = accentHex || '#0C2B4E';
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate(`/teacher/${member._id || member.id}`)}
            className="w-full bg-white rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(12,43,78,0.10)] border border-slate-100 flex flex-col sm:flex-row cursor-pointer group/card hover:shadow-[0_20px_50px_rgba(12,43,78,0.15)] transition-all duration-300"
        >
            {/* ── Photo Column ── */}
            <div className="relative sm:w-56 lg:w-64 shrink-0 min-h-[280px] overflow-hidden">
                <img
                    src={member.photo && member.photo.asset ? urlFor(member.photo).width(500).height(500).fit('crop').url() : member.photo}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=0C2B4E&color=ffffff&bold=true&font-size=0.35`;
                    }}
                />
                {/* Gradient overlay at bottom of photo */}
                <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                {/* HOD badge pinned to bottom of photo */}
                <div
                    className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[0.65rem] font-black tracking-widest uppercase text-white"
                    style={{ background: `${accent}ee`, backdropFilter: 'blur(4px)' }}
                >

                    Head of Department
                </div>
            </div>

            {/* ── Info Column ── */}
            <div className="flex-1 flex flex-col">
                {/* Top accent stripe */}
                <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}66)` }} />

                <div className="flex-1 p-7 flex flex-col gap-5">
                    {/* Name & role */}
                    <div>
                        <p className="text-[0.68rem] font-black tracking-[0.18em] uppercase mb-1" style={{ color: accent }}>
                            Professor &amp; HOD
                        </p>
                        <h3 className="text-[1.8rem] font-display font-black text-primary leading-none mb-2">
                            {member.name}
                        </h3>
                        <p className="text-[0.88rem] text-slate-500 font-medium">{member.specialization}</p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-slate-100" />

                    {/* Detail pills grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        <div className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accent}12` }}>
                                <GraduationCap size={16} style={{ color: accent }} />
                            </span>
                            <div>
                                <p className="text-[0.6rem] text-slate-400 font-black uppercase tracking-widest">Qualification</p>
                                <p className="text-[0.82rem] text-slate-700 font-semibold">{member.qualification}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accent}12` }}>
                                <Briefcase size={16} style={{ color: accent }} />
                            </span>
                            <div>
                                <p className="text-[0.6rem] text-slate-400 font-black uppercase tracking-widest">Experience</p>
                                <p className="text-[0.82rem] text-slate-700 font-semibold">{member.experience}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accent}12` }}>
                                <MapPin size={16} style={{ color: accent }} />
                            </span>
                            <div>
                                <p className="text-[0.6rem] text-slate-400 font-black uppercase tracking-widest">Staff Room</p>
                                <p className="text-[0.82rem] text-slate-700 font-semibold">{member.staffRoom}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accent}12` }}>
                                <Phone size={16} style={{ color: accent }} />
                            </span>
                            <div>
                                <p className="text-[0.6rem] text-slate-400 font-black uppercase tracking-widest">Phone</p>
                                <p className="text-[0.82rem] text-slate-700 font-semibold">{member.phone}</p>
                            </div>
                        </div>

                    </div>

                    {/* Email CTA */}
                    <a
                        href={`mailto:${member.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-auto inline-flex items-center gap-2 text-[0.82rem] font-bold px-4 py-2.5 rounded-xl transition-all duration-200 self-start hover:brightness-90"
                        style={{ background: `${accent}14`, color: accent }}
                    >
                        <Mail size={15} />
                        {member.email}
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

// ─── Regular Faculty Card ───────────────────────────────────────────────────────
// ─── Regular Faculty Card — Sleek horizontal profile ───────────────────────────
const FacultyCard = ({ member, accentHex }) => {
    const accent = accentHex || '#1D546C';
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate(`/teacher/${member._id || member.id}`)}
            className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(12,43,78,0.06)] border border-slate-100 p-5 flex gap-5 group hover:shadow-[0_12px_35px_rgba(12,43,78,0.12)] transition-all duration-300 relative overflow-hidden cursor-pointer"
        >
            {/* Left accent border */}
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: accent }} />

            {/* Photo Section */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden shadow-sm border border-slate-100">
                <img
                    src={member.photo && member.photo.asset ? urlFor(member.photo).width(400).height(400).fit('crop').url() : member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=256&background=0C2B4E&color=ffffff&bold=true`;
                    }}
                />
            </div>

            {/* Info Section */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                    <h4 className="text-primary font-bold text-[1.05rem] leading-tight mb-1 truncate">
                        {member.name}
                    </h4>
                    <span 
                        className="inline-block text-[0.65rem] font-black uppercase tracking-widest px-2 py-0.5 rounded-md text-white mb-2"
                        style={{ background: accent }}
                    >
                        {member.designation}
                    </span>
                    <p className="text-[0.75rem] text-slate-500 font-medium line-clamp-1 italic mb-3">
                        {member.specialization}
                    </p>
                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-[0.72rem] text-slate-600 font-semibold">
                        <GraduationCap size={13} style={{ color: accent }} />
                        <span className="truncate">{member.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[0.72rem] text-slate-600 font-semibold">
                        <MapPin size={13} style={{ color: accent }} />
                        <span className="truncate">{member.staffRoom}</span>
                    </div>
                </div>

                {/* Contact Actions */}
                <div className="flex gap-3 mt-4">
                    <a 
                        href={`mailto:${member.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{ background: `${accent}15`, color: accent }}
                        title={member.email}
                    >
                        <Mail size={14} />
                    </a>
                    <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                        style={{ background: `${accent}15`, color: accent }}
                        title={member.phone}
                    >
                        <Phone size={14} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const InfoRow = ({ icon, text, isLink }) => (
    <div className="flex items-start gap-2 text-[0.78rem] text-secondary/70 font-medium">
        <span className="text-accent mt-0.5 shrink-0">{icon}</span>
        {isLink
            ? <a href={isLink} className="hover:text-accent hover:underline transition-colors break-all">{text}</a>
            : <span className="break-words">{text}</span>
        }
    </div>
);

// ─── Department Section ─────────────────────────────────────────────────────────
const DeptSection = ({ dept }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mb-14">
            {/* Dept header toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-4 mb-8 group"
            >
                <div className="flex items-center gap-4 flex-1">
                    <div className="text-left">
                        <h3 className="text-[1.4rem] sm:text-[1.75rem] font-display font-black text-primary leading-tight">{dept.label || dept.name}</h3>
                        <p className="text-[0.78rem] text-secondary/50 font-bold uppercase tracking-widest">{(dept.faculty ? dept.faculty.length : 0) + (dept.hod ? 1 : 0)} Faculty Members</p>
                    </div>
                </div>
                <span
                    className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${dept.color}15` }}
                >
                    <ChevronDown
                        size={20}
                        style={{ color: dept.color, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                    />
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                    >
                        {/* HOD */}
                        <div className="mb-8">
                            <div
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[0.68rem] font-black uppercase tracking-widest text-white mb-5"
                                style={{ background: dept.color }}
                            >
                                Head of Department
                            </div>
                            <HodCard member={dept.hod} accentHex={dept.color} />
                        </div>

                        {/* Faculty Grid */}
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[0.68rem] font-black uppercase tracking-widest text-white mb-5"
                            style={{ background: dept.accentColor }}
                        >
                            <Users size={11} /> Faculty Members
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {dept.faculty.map((m, i) => <FacultyCard key={i} member={m} accentHex={dept.accentColor} />)}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="h-px bg-gradient-to-r from-primary/10 via-primary/20 to-transparent mt-12" />
        </div>
    );
};

// ─── MCA Section ───────────────────────────────────────────────────────────────
// ─── Main Page ─────────────────────────────────────────────────────────────────
const TeachersPage = () => {
    const [activeDept, setActiveDept] = useState(null);
    const [sanityBtechDepts, setSanityBtechDepts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const query = `*[_type == "department"]{
            ...,
            "hod": *[_type == "teacher" && references(^._id) && isHOD][0],
            "faculty": *[_type == "teacher" && references(^._id) && !isHOD]
        }`;
        
        client.fetch(query).then(data => {
            if (data && data.length > 0) {
                // Map to object structure expected by UI
                const mappedBtech = {};
                
                data.forEach(d => {
                    const deptObj = {
                        label: d.name,
                        short: d.short,
                        color: d.color,
                        accentColor: d.accentColor,
                        icon: d.icon,
                        hod: d.hod || {},
                        faculty: d.faculty || []
                    };
                    
                    if (d.short && d.short.toLowerCase() !== 'mca') {
                        mappedBtech[d.short ? d.short.toLowerCase() : d.name] = deptObj;
                    }
                });
                
                if (Object.keys(mappedBtech).length > 0) setSanityBtechDepts(mappedBtech);
            }
            setLoading(false);
        }).catch(err => {
            console.error("Sanity fetch error:", err);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary/20 border-t-accent rounded-full animate-spin"></div>
                <p className="mt-4 text-secondary/60 font-medium">Loading faculty members...</p>
            </div>
        );
    }

    const btechDepts = sanityBtechDepts || {};
    const btechDeptKeys = Object.keys(btechDepts);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Hero */}
            <div className="bg-primary text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="relative z-10 max-w-[90%] lg:max-w-[1280px] mx-auto px-4 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-[0.8rem] font-bold tracking-widest text-white/60 mb-2 uppercase">
                            <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1.5">
                                <Home size={14} /> HOME
                            </Link>
                            <ChevronRight size={12} />
                            <span className="text-white/40">About</span>
                            <ChevronRight size={12} />
                            <span className="text-accent underline decoration-2 underline-offset-4">Our Teachers</span>
                        </div>
                        <h1 className="text-[2.5rem] sm:text-[3.5rem] font-display font-black leading-tight tracking-tighter uppercase max-w-4xl">Our Teachers</h1>
                        <div className="w-24 h-2 bg-accent rounded-full mt-2" />

                    </motion.div>
                </div>
            </div>

            {/* Tab Bar */}
            <div className="bg-white border-b border-primary/10 sticky top-0 z-50 shadow-sm">
                <div className="max-w-[90%] lg:max-w-[1280px] mx-auto px-4 lg:px-8 flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
                    <button onClick={() => setActiveDept(null)} className={`px-4 py-2 rounded-full font-bold text-[0.76rem] uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${activeDept === null ? 'bg-accent text-white' : 'bg-background text-secondary/60 hover:bg-accent/10 hover:text-accent'}`}>All</button>
                    {btechDeptKeys.map(dk => (
                        <button key={dk} onClick={() => setActiveDept(dk)} className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-[0.76rem] uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${activeDept === dk ? 'bg-accent text-white' : 'bg-background text-secondary/60 hover:bg-accent/10 hover:text-accent'}`}>
                            {btechDepts[dk].short}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow py-14">
                <div className="max-w-[90%] lg:max-w-[1280px] mx-auto px-4 lg:px-8">
                    <AnimatePresence mode="wait">
                        <motion.div key="btech" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.35 }}>
                            <div className="mb-12">
                                <span className="inline-block px-3 py-1 bg-primary/10 rounded-full text-[0.7rem] font-black text-primary uppercase tracking-widest mb-3">B.Tech Programme</span>
                                <h2 className="text-[2rem] font-display font-black text-primary">Bachelor of Technology Faculty</h2>
                                <p className="text-secondary/60 mt-2 max-w-2xl">Our B.Tech faculty brings together experts across three core engineering disciplines — Computer Science, Electrical & Electronics, and Electronics & Communication Engineering.</p>
                            </div>
                            {btechDeptKeys.filter(dk => activeDept === null || activeDept === dk).map(dk => (
                                <DeptSection key={dk} dept={btechDepts[dk]} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default TeachersPage;
