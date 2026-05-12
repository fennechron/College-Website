import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Globe, Calendar, Users, Award, 
    CheckCircle, ArrowRight, ExternalLink, Shield,
    Image as ImageIcon
} from 'lucide-react';
import { organizationsData } from '../data/organizationsData';

const OrganizationDetail = () => {
    const { id } = useParams();
    const org = organizationsData[id];

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
        <div className="min-h-screen bg-white">
            {/* ─── Hero Section ─── */}
            <div className="h-[60vh] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={org.mainImage} 
                        alt={org.name} 
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
                            Campus Organization
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-display font-black text-white uppercase leading-tight tracking-tighter">
                            {org.name}
                        </h1>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto font-medium">
                            {org.fullName}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ─── Stats Bar ─── */}
            <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {org.stats.map((stat, i) => (
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
                    <div className="lg:col-span-2 space-y-12">
                        <section className="space-y-8">
                            <h2 className="text-3xl font-display font-black text-primary uppercase flex items-center gap-4">
                                <span className="w-12 h-1.5 bg-accent rounded-full" />
                                About The Forum
                            </h2>
                            <div className="space-y-6">
                                {org.description.map((para, i) => (
                                    <p key={i} className="text-lg text-slate-600 leading-relaxed font-medium">
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </section>

                        {/* Activities or Ethics if present */}
                        {(org.activities || org.ethics) && (
                            <section className="bg-slate-50 p-10 rounded-3xl space-y-8">
                                <h3 className="text-2xl font-display font-black text-primary uppercase">
                                    {org.activities ? "Major Activities" : "Professional Ethics"}
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {(org.activities || org.ethics).map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 text-primary font-bold">
                                            <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right: Sidebar Info */}
                    <div className="space-y-8">
                        <div className="bg-primary p-10 rounded-3xl text-white space-y-8">
                            <div>
                                <h3 className="text-xl font-display font-black uppercase mb-4">Connect</h3>
                                <div className="w-12 h-1 bg-accent rounded-full mb-6" />
                            </div>
                            
                            {org.website && (
                                <a 
                                    href={org.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <Globe size={18} className="text-accent" />
                                        <span className="font-bold text-sm">Official Website</span>
                                    </div>
                                    <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                            )}

                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="flex items-center gap-3 mb-1">
                                    <Calendar size={18} className="text-accent" />
                                    <span className="font-bold text-sm">Founded</span>
                                </div>
                                <p className="text-white/60 text-xs ml-7">{org.founded || "Academic Legacy"}</p>
                            </div>

                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="flex items-center gap-3 mb-1">
                                    <Users size={18} className="text-accent" />
                                    <span className="font-bold text-sm">Eligibility</span>
                                </div>
                                <p className="text-white/60 text-xs ml-7">Open to Department Students</p>
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
                        className="mt-32 space-y-12"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-display font-black text-primary uppercase flex items-center justify-center gap-4">
                                <ImageIcon className="text-accent" />
                                Moment Gallery
                            </h2>
                            <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                                Glimpses into the activities, workshops, and milestones achieved by our community.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {org.gallery.map((img, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="relative h-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                                >
                                    <img 
                                        src={img} 
                                        alt={`Gallery ${i}`} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                                        <div className="text-white">
                                            <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-accent">Activity Highlight</p>
                                            <p className="font-bold">Campus Engagement</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </div>
        </div>
    );
};

export default OrganizationDetail;
