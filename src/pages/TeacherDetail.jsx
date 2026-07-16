import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
    Mail, Phone, MapPin, GraduationCap, 
    Briefcase, ArrowLeft, Quote, 
    ChevronRight, Home, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';

const TeacherDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTabKey, setActiveTabKey] = useState('');

    // Helper to generate id from name
    const generateId = (name) => {
        if (!name) return '';
        const cleanName = name.replace(/^(?:(?:Dr|Prof|Sri|Smt|Mr|Mrs|Ms)\.?\s*)+/i, '');
        return cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        
        setLoading(true);
        // Fetch all teachers to handle both direct ID and name-based generated ID
        const query = `*[_type == "teacher"]{
            ...,
            "deptLabel": department->name,
            "color": department->color
        }`;
        
        client.fetch(query)
            .then(data => {
                if (data && data.length > 0) {
                    const found = data.find(t => 
                        t._id === id || 
                        t._id === 'teacher-' + id || 
                        generateId(t.name) === id
                    );
                    setTeacher(found || null);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Sanity fetch error:", err);
                setLoading(false);
            });
    }, [id]);

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

    const allSections = [
        { key: 'publications', title: 'Publications' },
        { key: 'awards_and_honours', title: 'Awards & Honours' },
        { key: 'positions_handled', title: 'Positions Handled' },
        { key: 'courses_handled', title: 'Courses Handled' },
        { key: 'fields_of_expertise', title: 'Fields of Expertise' },
        { key: 'research', title: 'Research' },
        { key: 'industry_interaction', title: 'Industry Interaction' },
        { key: 'patents', title: 'Patents' },
        { key: 'books_published', title: 'Books Published' },
        { key: 'other_details', title: 'Other Details' }
    ];

    const availableSections = teacher ? allSections.filter(s => teacher[s.key] && teacher[s.key].length > 0) : [];
    const currentTabKey = activeTabKey || (availableSections.length > 0 ? availableSections[0].key : '');

    return (
        <div className="min-h-screen bg-slate-50 pt-20 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-12">
            <div className="max-w-6xl mx-auto space-y-12 sm:space-y-20">
                
                {/* Top Section: Text and Blob Image */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                    
                    {/* Left Column: Info & About */}
                    <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-last lg:order-first">
                        <div className="space-y-2">
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-primary leading-tight uppercase tracking-tighter">
                                {teacher.name}
                            </h1>
                            <p className="text-base sm:text-xl font-bold uppercase tracking-widest" style={{ color: accent }}>
                                {teacher.designation}
                            </p>
                        </div>
                        
                        <div className="space-y-3 sm:space-y-4 text-sm sm:text-lg text-slate-600 leading-relaxed font-medium text-justify">
                            {(teacher.about || []).map((p, i) => <p key={i}>{p}</p>)}
                        </div>

                        {/* Other Details - integrated gracefully as requested */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-slate-200 mt-6 sm:mt-8">
                            <DetailItem icon={<GraduationCap />} label="Qualification" value={teacher.qualification} color={accent} fullWidth />
                            <DetailItem icon={<Briefcase />} label="Experience" value={teacher.experience} color={accent} fullWidth />
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
                    <div className="lg:col-span-5 flex justify-center lg:justify-end order-first lg:order-last">
                        <div 
                            className="w-[240px] h-[280px] xs:w-[300px] xs:h-[350px] sm:w-[400px] sm:h-[450px] overflow-hidden shadow-2xl relative"
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
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {teacher.specialization.split(',').map((s, i) => (
                                <span 
                                    key={i}
                                    className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-white border-2 border-slate-100 text-slate-700 font-bold text-xs sm:text-sm shadow-sm hover:border-accent hover:text-accent transition-all cursor-default"
                                >
                                    {s.trim()}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Academic & Professional Details Tabs */}
                {availableSections.length > 0 && (
                    <div className="pt-8">
                        <div className="flex overflow-x-auto gap-3 pb-4 mb-6 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {availableSections.map((section) => {
                                const isActive = section.key === currentTabKey;
                                return (
                                    <button
                                        key={section.key}
                                        onClick={() => setActiveTabKey(section.key)}
                                        className={`px-6 py-3 rounded-2xl whitespace-nowrap font-bold text-sm transition-all duration-300 flex-shrink-0 ${
                                            isActive 
                                            ? 'bg-primary text-white shadow-md' 
                                            : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-800 border-2 border-slate-100'
                                        }`}
                                    >
                                        {section.title}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Render the active tab content */}
                        {currentTabKey && teacher[currentTabKey] && (
                            <motion.div 
                                key={currentTabKey}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-[2rem] p-6 sm:p-8 border-2 border-slate-100 shadow-sm"
                            >
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 shrink-0">
                                    <div className="w-2.5 h-8 rounded-full shrink-0" style={{ backgroundColor: accent }}></div>
                                    <h2 className="text-xl sm:text-2xl font-display font-black text-primary uppercase tracking-tight leading-none">
                                        {allSections.find(s => s.key === currentTabKey)?.title}
                                    </h2>
                                </div>
                                <ul className="space-y-4">
                                    {teacher[currentTabKey].map((item, i) => {
                                        const isObject = typeof item === 'object' && item !== null;
                                        let finalTitle = isObject ? item.title : item;
                                        let finalUrl = isObject ? item.link : null;
                                        
                                        if (!isObject && typeof item === 'string') {
                                            const urlMatch = item.match(/(https?:\/\/[^\s]+)/);
                                            if (urlMatch) {
                                                finalUrl = urlMatch[0];
                                                // If title is empty after removing URL, default to URL
                                                finalTitle = item.replace(finalUrl, '').replace(/\[|\]/g, '').trim() || 'View Publication';
                                            }
                                        }

                                        const content = (
                                            <div className="flex items-start gap-3 group">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${finalUrl ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white'}`}>
                                                    <ChevronRight size={12} strokeWidth={3} />
                                                </div>
                                                <p className={`text-sm sm:text-base font-medium leading-relaxed transition-colors text-justify ${finalUrl ? 'text-primary font-semibold underline decoration-primary/30 underline-offset-4 hover:text-accent hover:decoration-accent/50' : 'text-slate-600 group-hover:text-slate-900'}`}>
                                                    {finalTitle}
                                                </p>
                                            </div>
                                        );

                                        return (
                                            <li key={i}>
                                                {finalUrl ? (
                                                    <a href={finalUrl} target="_blank" rel="noopener noreferrer" className="block outline-none focus:ring-2 focus:ring-primary/50 rounded-lg">
                                                        {content}
                                                    </a>
                                                ) : (
                                                    content
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </motion.div>
                        )}
                    </div>
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
                        <div className="relative p-6 sm:p-14 rounded-2xl sm:rounded-[2rem] bg-white border-2 border-slate-100 shadow-sm overflow-hidden group hover:border-accent/20 transition-all duration-500 max-w-5xl">
                            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 text-slate-100 transition-colors duration-500 group-hover:text-accent/10">
                                <Quote size={40} className="sm:w-16 sm:h-16" fill="currentColor" />
                            </div>
                            <div className="relative z-10">
                                <p className="text-base sm:text-2xl lg:text-3xl font-display font-medium text-slate-800 leading-snug italic ml-4 sm:ml-12 text-justify">
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

const DetailItem = ({ icon, label, value, color, isLink, fullWidth }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;

    const renderValue = () => {
        if (isLink) {
            return <a href={isLink} className="text-sm font-bold text-primary hover:text-accent transition-colors leading-tight block truncate max-w-[200px]">{value}</a>;
        }

        if (Array.isArray(value)) {
            return (
                <ul className="space-y-2 mt-1">
                    {value.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm font-bold text-primary leading-snug">
                            <span className="text-[10px] shrink-0 mt-1" style={{ color: color }}>▶</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );
        }

        if (typeof value === 'string' && value.includes('•')) {
            const items = value.split('•').map(s => s.trim()).filter(Boolean);
            return (
                <ul className="space-y-2 mt-1">
                    {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm font-bold text-primary leading-snug">
                            <span className="text-[10px] shrink-0 mt-1" style={{ color: color }}>▶</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );
        }

        return <p className="text-sm font-bold text-primary leading-tight whitespace-pre-wrap">{value}</p>;
    };

    return (
        <div className={`flex items-start gap-4 ${fullWidth ? 'sm:col-span-2' : ''}`}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}10`, color: color }}>
                {React.cloneElement(icon, { size: 18 })}
            </div>
            <div className="flex-1">
                <p className="text-[0.62rem] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                {renderValue()}
            </div>
        </div>
    );
};

export default TeacherDetail;
