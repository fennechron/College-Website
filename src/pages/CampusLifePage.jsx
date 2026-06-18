import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Users, Coffee, Music, BookOpen, Target } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';

const IconMap = {
    Trophy: <Trophy size={24} />,
    Target: <Target size={24} />,
    Users: <Users size={24} />,
    Coffee: <Coffee size={24} />,
    Music: <Music size={32} className="text-accent" />,
    BookOpen: <BookOpen size={32} className="text-accent" />,
    UsersLarge: <Users size={32} className="text-accent" />
};

const CampusLifePage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        client.fetch(`*[_type == "campusLife"][0]`).then(res => {
            setData(res);
            setLoading(false);
        }).catch(err => {
            console.error("Failed to fetch campus life data:", err);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
            </div>
        );
    }

    if (!data) return null;

    const { facilities = [], highlights = [], events = [], heroImage } = data;

    return (
        <div className="min-h-screen bg-white">
            {/* ─── Hero Section ─── */}
            <div className="h-[70vh] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    {heroImage && (
                        <img 
                            src={urlFor(heroImage).url()} 
                            alt="Campus Life at CEC" 
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
                </div>
                
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-2xl space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest border border-white/10">
                            Beyond Academics
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-display font-black text-white uppercase leading-[1.1] tracking-tighter drop-shadow-lg">
                            Live Your <span className="text-accent">Best</span> College Life
                        </h1>
                        <p className="text-lg sm:text-xl text-white/90 font-medium leading-relaxed max-w-xl">
                            At College of Engineering Chengannur, education doesn't stop at the classroom door. Discover a vibrant ecosystem of sports, arts, and lifelong friendships.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ─── Facilities Bento Grid ─── */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 py-24">
                <div className="mb-16 text-center sm:text-left">
                    <h2 className="text-4xl sm:text-5xl font-display font-black text-primary uppercase tracking-tight mb-4">
                        <span className="text-accent">Recreation</span>
                    </h2>
                    <p className="text-slate-600 text-lg font-medium max-w-2xl">
                        Whether you're a sports fanatic or just looking to blow off some steam, our newly upgraded campus facilities have something for everyone.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
                    {facilities.map((facility, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className={`group relative overflow-hidden rounded-[2rem] shadow-lg ${facility.colSpan} ${facility.rowSpan}`}
                        >
                            {facility.image && (
                                <img 
                                    src={urlFor(facility.image).url()} 
                                    alt={facility.title} 
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent transition-opacity duration-300" />
                            
                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary mb-4 shadow-xl">
                                        {IconMap[facility.iconName]}
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-wider mb-2">
                                        {facility.title}
                                    </h3>
                                    <p className="text-white/80 font-medium text-sm sm:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                                        {facility.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ─── Highlights Section ─── */}
            <div className="bg-slate-50 border-t border-slate-100 py-24">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <div className="grid md:grid-cols-3 gap-12">
                        {highlights.map((item, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="text-center sm:text-left"
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto sm:mx-0 mb-6">
                                    {IconMap[item.iconName] || IconMap["UsersLarge"]}
                                </div>
                                <h4 className="text-2xl font-display font-black text-primary uppercase mb-3">
                                    {item.title}
                                </h4>
                                <p className="text-slate-600 font-medium leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── Events Photo Gallery ─── */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <div className="mb-16 text-center">
                        <span className="text-accent font-black uppercase tracking-widest text-sm mb-2 block">Memories & Milestones</span>
                        <h2 className="text-4xl sm:text-5xl font-display font-black text-primary uppercase tracking-tight mb-4">
                            Major Campus <span className="text-accent">Events</span>
                        </h2>
                        <p className="text-slate-600 text-lg font-medium max-w-2xl mx-auto">
                            Relive the excitement of our biggest fests, workshops, and sports meets.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
                        {events.map((event, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className={`group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all ${event.span}`}
                            >
                                {event.image && (
                                    <img 
                                        src={urlFor(event.image).url()} 
                                        alt={event.title} 
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="bg-accent text-primary text-[0.65rem] font-black uppercase px-2.5 py-1 rounded-sm">
                                                {event.category}
                                            </span>
                                            <span className="text-white/80 text-xs font-bold">
                                                {event.date}
                                            </span>
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-display font-black text-white leading-tight">
                                            {event.title}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

             

        </div>
    );
};

export default CampusLifePage;
