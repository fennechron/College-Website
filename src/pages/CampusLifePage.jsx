import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Trophy, Users, Coffee, Music, BookOpen, Target, X, Image as ImageIcon } from 'lucide-react';
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
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

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

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedEvent) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [selectedEvent]);

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
            <div className="min-h-[500px] h-[60vh] sm:h-[80vh] relative overflow-hidden flex items-center justify-center bg-primary">
                <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
                    {heroImage && (
                        <img 
                            src={urlFor(heroImage).url()} 
                            alt="Campus Life at CEC" 
                            className="w-full h-full object-cover opacity-70 mix-blend-luminosity"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/90 to-primary/40" />
                </motion.div>
                
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-12 mt-16 sm:mt-0">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <motion.div
                            style={{ opacity: opacityHero }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="max-w-3xl space-y-6 text-center md:text-left mx-auto md:mx-0"
                        >
                             
                            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-white uppercase leading-[0.95] tracking-tighter drop-shadow-2xl">
                                Live Your <br/>Best Life.
                            </h1>
                            <p className="text-sm sm:text-xl text-slate-300 font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
                                At College of Engineering Chengannur, education doesn't stop at the classroom door. Discover a vibrant ecosystem of sports, arts, and lifelong friendships.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className="hidden lg:flex flex-col gap-6"
                        >
                             
                             
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ─── Facilities Bento Grid ─── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-12 py-12 sm:py-24">
                <div className="mb-10 sm:mb-16 text-center sm:text-left">
                    <h2 className="text-3xl sm:text-5xl font-display font-black text-primary uppercase tracking-tight mb-3 sm:mb-4">
                        <span className="text-accent">Recreation</span>
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-lg font-medium max-w-2xl">
                        Whether you're a sports fanatic or just looking to blow off some steam, our newly upgraded campus facilities have something for everyone.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[250px]">
                    {facilities.map((facility, idx) => {
                        const colSpan = facility.colSpan ? (facility.colSpan.includes('col-span') ? `md:${facility.colSpan}` : facility.colSpan) : '';
                        const rowSpan = facility.rowSpan ? (facility.rowSpan.includes('row-span') ? `md:${facility.rowSpan}` : facility.rowSpan) : '';
                        return (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                className={`group relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-2xl hover:border-accent/50 transition-all duration-500 ${colSpan} ${rowSpan}`}
                            >
                                {facility.image && (
                                    <img 
                                        src={urlFor(facility.image).url()} 
                                        alt={facility.title} 
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}
                                {/* Deep Glassmorphic Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* Content */}
                                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end overflow-hidden z-10">
                                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col h-full justify-end">

                                        <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-wider mb-2 drop-shadow-md">
                                            {facility.title}
                                        </h3>
                                        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                                            <p className="text-slate-300 font-medium text-xs sm:text-sm leading-relaxed mt-2 text-justify">
                                                {facility.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* ─── Highlights Section ─── */}
            <div className="bg-primary py-16 sm:py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/5 pattern-dots pattern-primary pattern-bg-white pattern-size-4 pattern-opacity-10 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {highlights.map((item, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2, type: "spring", stiffness: 300, damping: 20 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl hover:bg-white/10 hover:border-accent/30 transition-colors duration-300 flex flex-col items-center text-center group"
                            >

                                <h4 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-wider mb-4">
                                    {item.title}
                                </h4>
                                <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── Events Photo Gallery ─── */}
            <div className="py-12 sm:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-12">
                    <div className="mb-10 sm:mb-16 text-center">
                        <span className="text-accent font-black uppercase tracking-widest text-xs sm:text-sm mb-2 block">Memories & Milestones</span>
                        <h2 className="text-3xl sm:text-5xl font-display font-black text-primary uppercase tracking-tight mb-3 sm:mb-4">
                            Major Campus <span className="text-accent">Events</span>
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-lg font-medium max-w-2xl mx-auto">
                            Relive the excitement of our biggest fests, workshops, and sports meets.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
                        {events.map((event, idx) => {
                            const span = event.span ? (event.span.includes('span') ? `md:${event.span}` : event.span) : '';
                            return (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    onClick={() => setSelectedEvent(event)}
                                    className={`group relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl hover:ring-2 hover:ring-accent/50 transition-all duration-500 cursor-pointer ${span}`}
                                >
                                    {event.image && (
                                        <img 
                                            src={urlFor(event.image).url()} 
                                            alt={event.title} 
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end overflow-hidden">
                                        <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                            <div className="flex items-center gap-3 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                <span className="bg-accent/90 backdrop-blur-sm text-primary text-[0.65rem] font-black uppercase px-3 py-1.5 rounded-md shadow-sm">
                                                    {event.category}
                                                </span>
                                                <span className="text-white/90 text-xs font-bold uppercase tracking-wider">
                                                    {event.date}
                                                </span>
                                            </div>
                                            <h3 className="text-xl sm:text-3xl font-display font-black text-white leading-tight drop-shadow-lg ">
                                                {event.title}
                                            </h3>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ─── Event Gallery Modal ─── */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-primary/95 backdrop-blur-xl"
                        onClick={() => setSelectedEvent(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-100">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-accent/10 text-accent text-[0.65rem] font-black uppercase px-3 py-1 rounded-full">
                                            {selectedEvent.category}
                                        </span>
                                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                                            {selectedEvent.date}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl sm:text-4xl font-display font-black text-primary">
                                        {selectedEvent.title}
                                    </h3>
                                </div>
                                <button 
                                    onClick={() => setSelectedEvent(null)}
                                    className="w-12 h-12 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-primary transition-colors shrink-0"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Gallery Content */}
                            <div className="p-6 sm:p-8 overflow-y-auto no-scrollbar bg-slate-50 flex-1">
                                {!selectedEvent.gallery || selectedEvent.gallery.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                            <ImageIcon size={32} className="text-slate-300" />
                                        </div>
                                        <p className="font-bold text-lg">No gallery images available yet.</p>
                                        <p className="text-sm font-medium">Check back later for photos from this event!</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                        {selectedEvent.gallery.map((img, imgIdx) => (
                                            <motion.div 
                                                key={imgIdx}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: imgIdx * 0.1 }}
                                                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group"
                                            >
                                                <img 
                                                    src={urlFor(img).url()} 
                                                    alt={`${selectedEvent.title} - Photo ${imgIdx + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default CampusLifePage;
