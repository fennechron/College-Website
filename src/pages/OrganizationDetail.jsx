import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Globe, Calendar, Users, Award, 
    CheckCircle, ArrowRight, ExternalLink, Shield,
    Image as ImageIcon, X, ChevronRight
} from 'lucide-react';
import { client, urlFor } from '../lib/sanity';

const OrganizationDetail = () => {
    const { id } = useParams();
    const [org, setOrg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        client.fetch(`*[_type == "organization" && slug.current == $id][0]`, { id })
            .then(res => {
                setOrg(res);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch organization:", err);
                setLoading(false);
            });
    }, [id]);

    // Close modal on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setSelectedItem(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedItem]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
            </div>
        );
    }

    if (!org) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h1 className="text-4xl font-display font-black text-primary">ORGANIZATION NOT FOUND</h1>
                    <p className="text-slate-500 mt-4">The organization you are looking for does not exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white relative">
            {/* ─── Hero Section ─── */}
            <div className="h-[60vh] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    {org.mainImage && (
                        <img 
                            src={urlFor(org.mainImage).url()} 
                            alt={org.name} 
                            className="w-full h-full object-cover"
                        />
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-md text-white text-[0.7rem] font-black uppercase tracking-widest border border-white/10">
                            Campus Organization
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-display font-black text-white uppercase leading-tight tracking-tighter drop-shadow-lg">
                            {org.name}
                        </h1>
                        <p className="text-xl text-white/80 max-w-3xl mx-auto font-medium drop-shadow-md">
                            {org.fullName}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ─── Stats Bar ─── */}
            <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {org.stats && org.stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-xl border border-slate-50 flex flex-col items-center text-center"
                        >
                            <span className="text-3xl font-display font-black text-primary">{stat.value}</span>
                            <span className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 mt-1">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ─── Main Content ─── */}
            <div className="max-w-6xl mx-auto px-6 py-24">
                <div className="grid lg:grid-cols-3 gap-16">
                    {/* Left: Detailed Description */}
                    <div className="lg:col-span-2 space-y-16">
                        <section className="space-y-8">
                            <h2 className="text-3xl font-display font-black text-primary uppercase flex items-center gap-4">
                                <span className="w-12 h-1.5 bg-accent rounded-full" />
                                About {org.name}
                            </h2>
                            <div className="space-y-6">
                                {org.description && org.description.map((para, i) => (
                                    <p key={i} className="text-lg text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </section>

                        {/* Major Activities: Display if present in Sanity */}
                        {org.activities && org.activities.length > 0 && (
                            <section className="bg-slate-50 p-10 rounded-3xl space-y-8 border border-slate-100">
                                <h3 className="text-2xl font-display font-black text-primary uppercase flex items-center gap-3">
                                    <CheckCircle className="text-accent" />
                                    Major Activities
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {org.activities.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 text-slate-700 font-bold">
                                            <span className="inline-flex items-center justify-center shrink-0 w-2.5 h-2.5 rounded-full bg-accent mt-2 shadow-sm" />
                                            <span className="flex-1">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}



                        {/* Professional Ethics (If present) */}
                        {org.ethics && (
                            <section className="bg-slate-50 p-10 rounded-3xl space-y-8 border border-slate-100">
                                <h3 className="text-2xl font-display font-black text-primary uppercase flex items-center gap-3">
                                    <Shield className="text-accent" />
                                    Professional Ethics
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {org.ethics.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 text-slate-700 font-bold">
                                            <span className="inline-flex items-center justify-center shrink-0 w-2.5 h-2.5 rounded-full bg-accent mt-2 shadow-sm" />
                                            <span className="flex-1">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        {/* ─── Achievements Section ─── */}
                        {org.achievements && org.achievements.length > 0 && (
                            <section className="space-y-8">
                                <h2 className="text-3xl font-display font-black text-primary uppercase flex items-center gap-4">
                                    <span className="w-12 h-1.5 bg-accent rounded-full" />
                                    Key Achievements
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {org.achievements.map((achieve, i) => (
                                        <div 
                                            key={i}
                                            onClick={() => setSelectedItem({ type: 'Achievement', ...achieve })}
                                            className="group cursor-pointer bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                                        >
                                            <div className="h-48 overflow-hidden relative">
                                                {achieve.image && (
                                                    <img 
                                                        src={urlFor(achieve.image).url()} 
                                                        alt={achieve.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-80" />
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <span className="text-[0.65rem] font-black uppercase tracking-widest text-accent bg-accent/20 px-2 py-1 rounded backdrop-blur-sm">
                                                        {achieve.date}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h4 className="text-lg font-display font-black text-primary leading-tight mb-2 group-hover:text-accent transition-colors">
                                                    {achieve.title}
                                                </h4>
                                                <p className="text-slate-500 text-sm font-medium line-clamp-2">
                                                    {achieve.description}
                                                </p>
                                                <div className="mt-4 flex items-center gap-1 text-accent text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                                    View Details <ChevronRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right: Sidebar Info */}
                    <div className="space-y-8">
                        <div className="bg-primary p-10 rounded-[2rem] text-white shadow-xl space-y-8 sticky top-32">
                            <div>
                                <h3 className="text-xl font-display font-black uppercase mb-4 tracking-wider">Connect</h3>
                                <div className="w-12 h-1 bg-accent rounded-full mb-6" />
                            </div>
                            
                            {org.website && (
                                <a 
                                    href={org.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-accent hover:text-primary transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <Globe size={18} className="group-hover:text-primary text-accent transition-colors" />
                                        <span className="font-bold text-sm">Official Website</span>
                                    </div>
                                    <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                            )}

                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="flex items-center gap-3 mb-1">
                                    <Calendar size={18} className="text-accent" />
                                    <span className="font-bold text-sm">Established</span>
                                </div>
                                <p className="text-white/60 text-xs ml-7 font-medium">{org.founded || "Academic Legacy"}</p>
                            </div>

                            {org.facultyInCharge && (
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="flex items-center gap-3 mb-1">
                                        <Users size={18} className="text-accent" />
                                        <span className="font-bold text-sm">Faculty in Charge</span>
                                    </div>
                                    <p className="text-white/60 text-xs ml-7 leading-relaxed font-medium">{org.facultyInCharge}</p>
                                </div>
                            )}

                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="flex items-center gap-3 mb-1">
                                    <Award size={18} className="text-accent" />
                                    <span className="font-bold text-sm">Eligibility</span>
                                </div>
                                <p className="text-white/60 text-xs ml-7 font-medium">Open to Interested Students</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Gallery Section ─── */}
                {org.gallery && org.gallery.length > 0 && (
                    <motion.section 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-32 pt-16 border-t border-slate-100 space-y-12"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-display font-black text-primary uppercase flex items-center justify-center gap-4">
                                <ImageIcon className="text-accent" />
                                Moment Gallery
                            </h2>
                            <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
                                Glimpses into the activities, workshops, and milestones achieved by our community.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {org.gallery.map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    onClick={() => setSelectedItem({ type: 'Gallery', ...item })}
                                    className="relative h-72 rounded-2xl overflow-hidden shadow-md group cursor-pointer"
                                >
                                    {item.image && (
                                        <img 
                                            src={urlFor(item.image).url()} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    )}
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="text-[0.65rem] font-black uppercase tracking-[0.1em] text-accent mb-1">Click to View</p>
                                            <h4 className="font-display font-black text-white text-xl leading-tight">{item.title}</h4>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </div>

            {/* ─── Modal Pop-up ─── */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedItem(null)}
                        className="fixed inset-0 z-[9999] bg-primary/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
                        data-lenis-prevent="true"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
                            className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative"
                        >
                            {/* Close Button */}
                            <button 
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-accent text-white p-2 rounded-full transition-colors backdrop-blur-md"
                            >
                                <X size={20} />
                            </button>

                            {/* Modal Image */}
                            <div className="w-full h-64 sm:h-96 relative bg-slate-100 shrink-0">
                                {selectedItem.image && (
                                    <img 
                                        src={urlFor(selectedItem.image).url()} 
                                        alt={selectedItem.title} 
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 sm:left-10 text-white">
                                    <span className="inline-block px-3 py-1 bg-accent text-primary text-[0.65rem] font-black uppercase tracking-widest rounded-full mb-3 shadow-md">
                                        {selectedItem.type}
                                    </span>
                                    <h2 className="text-3xl sm:text-5xl font-display font-black drop-shadow-md">
                                        {selectedItem.title}
                                    </h2>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar">
                                <div className="flex flex-col sm:flex-row justify-between gap-6">
                                    <div className="flex-1 space-y-4">
                                        <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                                            {selectedItem.description}
                                        </p>
                                    </div>
                                    {selectedItem.date && (
                                        <div className="shrink-0 bg-slate-50 p-6 rounded-2xl border border-slate-100 self-start sm:w-64">
                                            <div className="flex items-center gap-3 mb-2 text-accent">
                                                <Calendar size={20} />
                                                <span className="font-black uppercase tracking-wider text-sm text-primary">Date / Period</span>
                                            </div>
                                            <p className="text-slate-600 font-bold text-lg">{selectedItem.date}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default OrganizationDetail;
