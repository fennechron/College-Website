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

    // Helper to generate id from name
    const generateId = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

    // Helper to find teacher in nested structure
    const findStaticTeacher = () => {
        // Check B.Tech
        for (const deptKey in teachersData.btech.departments) {
            const dept = teachersData.btech.departments[deptKey];
            if (dept.hod.id === id || generateId(dept.hod.name) === id) return { ...dept.hod, deptLabel: dept.label, color: dept.color };
            const faculty = dept.faculty.find(f => f.id === id || generateId(f.name) === id);
            if (faculty) return { ...faculty, deptLabel: dept.label, color: dept.color };
        }
        // Check MCA
        const mca = teachersData.mca;
        if (mca.hod.id === id || generateId(mca.hod.name) === id) return { ...mca.hod, deptLabel: 'MCA', color: '#4A235A' };
        const faculty = mca.faculty.find(f => f.id === id || generateId(f.name) === id);
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
                <button onClick={() => navigate(-1)} className="px-6 py-2 bg-primary text-white rounded-full font-bold">Go Back</button>
            </div>
        );
    }

    const accent = teacher.color || '#0C2B4E';

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6 sm:px-12">
            <div className="max-w-6xl mx-auto space-y-20">
                
                {/* Top Section: Text and Blob Image */}
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Column: Info & About */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="space-y-2">
                            <h1 className="text-4xl sm:text-6xl font-display font-black text-primary leading-tight uppercase tracking-tighter">
                                {teacher.name}
                            </h1>
                            <p className="text-xl font-bold uppercase tracking-widest" style={{ color: accent }}>
                                {teacher.designation}
                            </p>
                        </div>
                        
                        <div className="space-y-4 text-lg text-slate-600 leading-relaxed font-medium">
                            {(teacher.about || []).map((p, i) => <p key={i}>{p}</p>)}
                        </div>

                        {/* Other Details - integrated gracefully as requested */}
                        <div className="grid sm:grid-cols-2 gap-6 pt-8 border-t border-slate-200 mt-8">
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
                    </div>

                    {/* Right Column: Blob Image */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <div 
                            className="w-[300px] h-[350px] sm:w-[400px] sm:h-[450px] overflow-hidden shadow-2xl relative"
                            style={{ 
                                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                                border: `8px solid ${accent}20`
                            }}
                        >
                            <motion.img 
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                src={teacher.photo ? (teacher.photo.asset ? urlFor(teacher.photo).width(800).height(1000).fit('crop').url() : teacher.photo) : `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&size=800&background=0C2B4E&color=ffffff&bold=true`} 
                                alt={teacher.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Specialization Section */}
                {(teacher.specialization) && (
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="space-y-6 pt-4"
                    >
                        <h2 className="text-xl font-display font-black text-primary uppercase tracking-tight">Specialization</h2>
                        <div className="flex flex-wrap gap-3">
                            {teacher.specialization.split(',').map((s, i) => (
                                <span 
                                    key={i}
                                    className="px-6 py-2.5 rounded-full bg-white border-2 border-slate-100 text-slate-700 font-bold text-sm shadow-sm hover:border-accent hover:text-accent transition-all cursor-default"
                                >
                                    {s.trim()}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Publications Section */}
                {teacher.publications && teacher.publications.length > 0 && (
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="space-y-6 pt-4"
                    >
                        <h2 className="text-xl font-display font-black text-primary uppercase tracking-tight">Publication</h2>
                        <div className="space-y-4 max-w-4xl">
                            {teacher.publications.map((pub, i) => (
                                <div 
                                    key={i} 
                                    className="p-5 rounded-2xl bg-white border-2 border-slate-100 shadow-sm flex items-center justify-between group hover:border-accent/30 transition-colors cursor-pointer"
                                >
                                    <p className="text-lg text-slate-700 font-medium">
                                        {pub}
                                    </p>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-accent group-hover:text-white transition-colors shrink-0 ml-4">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Word from Teacher Section */}
                {teacher.wordFromTeacher && (
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="space-y-6 pt-4"
                    >
                        <h2 className="text-xl font-display font-black text-primary uppercase tracking-tight">Word from teacher</h2>
                        <div className="relative p-10 sm:p-14 rounded-[2rem] bg-white border-2 border-slate-100 shadow-sm overflow-hidden group hover:border-accent/20 transition-all duration-500 max-w-5xl">
                            <div className="absolute top-8 left-8 text-slate-100 transition-colors duration-500 group-hover:text-accent/10">
                                <Quote size={64} fill="currentColor" />
                            </div>
                            <div className="relative z-10">
                                <p className="text-2xl sm:text-3xl font-display font-medium text-slate-800 leading-snug italic ml-8 sm:ml-12">
                                    "{teacher.wordFromTeacher}"
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

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
