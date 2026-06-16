import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Users, Coffee, Music, BookOpen, Target } from 'lucide-react';

const CampusLifePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const facilities = [
        {
            title: "Synthetic Sports Turf",
            description: "Experience the thrill of the game on our state-of-the-art synthetic turf. Perfect for 5-a-side football, box cricket, and evening matches under the floodlights. It's the ultimate hotspot for inter-departmental tournaments and daily fitness.",
            image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=1200",
            icon: <Trophy size={24} />,
            colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
            rowSpan: "row-span-2"
        },
        {
            title: "Premium Pool Table",
            description: "Unwind and strategize with friends at our premium indoor pool table. The recreational lounge is the perfect place to relax after intense lab sessions.",
            image: "https://images.unsplash.com/photo-1582236398934-11883edc9fbc?auto=format&fit=crop&q=80&w=800",
            icon: <Target size={24} />,
            colSpan: "col-span-1",
            rowSpan: "row-span-1"
        },
        {
            title: "Basketball Court",
            description: "Shoot some hoops at our outdoor synthetic basketball court. Home to the college basketball team and high-energy evening matches.",
            image: "https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&q=80&w=800",
            icon: <Users size={24} />,
            colSpan: "col-span-1",
            rowSpan: "row-span-1"
        },
        {
            title: "Campus Cafeteria",
            description: "The heart of student discussions! Grab a coffee, enjoy delicious meals, and share brilliant ideas in our vibrant campus cafeteria.",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
            icon: <Coffee size={24} />,
            colSpan: "col-span-1 md:col-span-2 lg:col-span-3",
            rowSpan: "row-span-1"
        }
    ];

    const highlights = [
        { title: "Tech & Cultural Fests", icon: <Music size={32} className="text-accent" />, desc: "Massive annual events that bring out the hidden talents of every student." },
        { title: "Student Clubs", icon: <Users size={32} className="text-accent" />, desc: "From robotics to literature, join a community that shares your exact passion." },
        { title: "Quiet Study Zones", icon: <BookOpen size={32} className="text-accent" />, desc: "Lush green spots around the campus perfect for reading and reflection." }
    ];

    const events = [
        { title: "Annual Tech Fest", category: "Technology", date: "March 2026", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800", span: "md:col-span-2 md:row-span-2" },
        { title: "Cultural Extravaganza", category: "Arts & Culture", date: "February 2026", image: "https://images.unsplash.com/photo-1540039155732-d688921b4b1e?auto=format&fit=crop&q=80&w=800", span: "md:col-span-1 md:row-span-1" },
        { title: "Inter-College Sports Meet", category: "Sports", date: "January 2026", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800", span: "md:col-span-1 md:row-span-1" },
        { title: "National Level Hackathon", category: "Innovation", date: "November 2025", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800", span: "md:col-span-1 md:row-span-2" },
        { title: "Guest Lecture Series", category: "Seminar", date: "October 2025", image: "https://images.unsplash.com/photo-1475721025505-1976b9117670?auto=format&fit=crop&q=80&w=800", span: "md:col-span-1 md:row-span-1" },
        { title: "Convocation Ceremony", category: "Academics", date: "July 2025", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800", span: "md:col-span-1 md:row-span-1" }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* ─── Hero Section ─── */}
            <div className="h-[70vh] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600" 
                        alt="Campus Life at CEC" 
                        className="w-full h-full object-cover"
                    />
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
                        World-Class <span className="text-accent">Recreation</span>
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
                            <img 
                                src={facility.image} 
                                alt={facility.title} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent transition-opacity duration-300" />
                            
                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary mb-4 shadow-xl">
                                        {facility.icon}
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
                                    {item.icon}
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
                                <img 
                                    src={event.image} 
                                    alt={event.title} 
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
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

            {/* ─── CTA Section ─── */}
            <div className="bg-primary text-white py-20 border-t-4 border-accent">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                    <h2 className="text-4xl font-display font-black uppercase tracking-widest">
                        Ready to Join the Family?
                    </h2>
                    <p className="text-lg text-white/80 font-medium max-w-2xl mx-auto">
                        Your college years are the best years of your life. Make them count at CEC.
                    </p>
                    <button onClick={() => window.location.href = '/page/admission-2026'} className="inline-flex items-center gap-3 bg-accent text-primary px-8 py-4 rounded-full font-black uppercase tracking-wider hover:bg-white transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                        Apply Now <ArrowRight size={20} />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default CampusLifePage;
