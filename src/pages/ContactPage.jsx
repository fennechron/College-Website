import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Phone, Mail, MapPin, Clock, 
    Send, Globe, ShieldCheck, Bus,
    Train, Plane, Navigation2, Linkedin, Instagram,
    Facebook
} from 'lucide-react';

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const contactOffices = [
        {
            title: "Reception",
            person: "General Enquiries",
            phone: "+91 479 2455125",
            email: "office@ceconline.edu",
            icon: <Globe className="text-blue-500" />
        },
        {
            title: "College Office",
            person: "Administrative Section",
            phone: "+91 479 2454125",
            email: "office@ceconline.edu",
            icon: <Phone className="text-emerald-500" />
        },
        {
            title: "Principal Office",
            person: "Dr. Principal",
            phone: "+91 479 2456046",
            email: "principal@ceconline.edu",
            icon: <ShieldCheck className="text-accent" />
        }
    ];

    const transits = [
        { type: "Bus Stand", name: "Chengannur", dist: "1/2 km", icon: <Bus size={20} /> },
        { type: "Railway Station", name: "Chengannur (CNGR)", dist: "1 km", icon: <Train size={20} /> },
        { type: "Cochin Airport", name: "COK", dist: "110 km", icon: <Plane size={20} /> },
        { type: "Trivandrum Airport", name: "TRV", dist: "120 km", icon: <Plane size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* ─── Hero Section ─── */}
            <div className="bg-primary text-white py-16 sm:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90" />
                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter mb-4 sm:mb-6">
                            Contact <br/> Our Campus
                        </h1>
                        <p className="text-base sm:text-xl text-white/70 max-w-2xl mx-auto font-medium">
                            Official contact channels for the College of Engineering Chengannur.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ─── Contact Cards ─── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-12 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {contactOffices.map((office, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl border border-slate-50 hover:-translate-y-2 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-50 flex items-center justify-center mb-4 sm:mb-8 group-hover:rotate-12 transition-transform">
                                {React.cloneElement(office.icon, { size: 24, className: office.icon.props.className })}
                            </div>
                            <h3 className="text-lg sm:text-2xl font-display font-black text-primary leading-tight mb-1 sm:mb-2">{office.title}</h3>
                            <p className="text-[0.65rem] sm:text-[0.7rem] font-black uppercase tracking-widest text-slate-400 mb-4 sm:mb-8">{office.person}</p>
                            
                            <div className="space-y-3 sm:space-y-4">
                                <a href={`tel:${office.phone}`} className="flex items-center gap-3 sm:gap-4 text-sm sm:text-md font-bold text-slate-600 hover:text-accent transition-colors">
                                    <Phone size={16} className="text-slate-300 shrink-0" /> {office.phone}
                                </a>
                                <a href={`mailto:${office.email}`} className="flex items-center gap-3 sm:gap-4 text-sm sm:text-md font-bold text-slate-600 hover:text-accent transition-colors truncate block">
                                    <Mail size={16} className="text-slate-300 shrink-0" /> {office.email}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ─── Detailed Location Info ─── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
                    {/* Left: About Location */}
                    <div className="space-y-6 sm:space-y-10">
                        <div className="space-y-4 sm:space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-[0.7rem] font-black uppercase tracking-widest">
                                <Navigation2 size={14} /> Location Overview
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-display font-black text-primary uppercase leading-tight">
                                Situated in the heart <br/> of Kerala
                            </h2>
                            <p className="text-sm sm:text-lg text-slate-500 font-medium leading-relaxed text-justify">
                                CEC is located in Chengannur, a beautiful town in Kerala. Situated at the extreme east part of Alappuzha district, the college is conveniently placed along the <span className="text-primary font-bold">Main Central Road (M.C. Road)</span>.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="font-black text-primary uppercase text-[0.7rem] tracking-widest mb-1">Postal Address</p>
                                        <p className="text-slate-500 font-bold text-sm leading-relaxed">
                                            College of Engineering Chengannur<br/>
                                            Chengannur P.O., Alapuzha District<br/>
                                            Kerala, PIN 689121
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <p className="font-black text-primary uppercase text-[0.7rem] tracking-widest mb-1">Office Hours</p>
                                        <p className="text-slate-500 font-bold text-sm">
                                            Mon — Sat: 9:00 AM — 5:00 PM<br/>
                                            Closed on Sundays
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Transits Section */}
                        <div className="bg-slate-50 p-4 sm:p-8 rounded-2xl sm:rounded-3xl space-y-4 sm:space-y-6">
                            <h3 className="text-lg sm:text-xl font-display font-black text-primary uppercase">Distance to Transits</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {transits.map((t, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl sm:rounded-2xl shadow-sm border border-slate-100">
                                        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                                            {t.icon}
                                        </div>
                                        <div>
                                            <p className="text-[0.6rem] font-black uppercase text-slate-400 tracking-wider">{t.type}</p>
                                            <p className="font-bold text-primary text-sm">{t.name} — <span className="text-accent">{t.dist}</span></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Map Embed */}
                    <div className="space-y-6 sm:space-y-8 w-full">
                        <div className="rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 sm:border-8 border-white h-[300px] sm:h-[600px] bg-slate-100 relative">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.179869160442!2d76.61491067421983!3d9.31732529075598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0622ea027eb08f%3A0x41105b207db821c6!2sCollege%20of%20Engineering%20Chengannur!5e0!3m2!1sen!2sin!4v1782157484424!5m2!1sen!2sin"
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-1000"
                            ></iframe>
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50">
                                <p className="text-[0.55rem] sm:text-[0.6rem] font-black uppercase tracking-[0.2em] text-accent">Interactive Map</p>
                            </div>
                        </div>
                        
                        <div className="bg-primary p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem] text-white space-y-4 sm:space-y-6">
                            <h3 className="text-xl sm:text-2xl font-display font-black uppercase">Direct Inquiry</h3>
                            <p className="text-white/60 font-medium text-sm sm:text-base">For specific academic or administrative queries, feel free to send us an email directly.</p>
                            <a href="mailto:principal@ceconline.edu" className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-accent text-white font-black uppercase tracking-widest text-xs sm:text-sm rounded-xl hover:bg-white hover:text-primary transition-all">
                                <Mail size={16} className="sm:w-[18px] sm:h-[18px]" /> Send Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Social Connect Section ─── */}
            <div className="py-12 sm:py-24 bg-slate-50 relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-xl sm:text-3xl font-display font-black text-primary uppercase mb-8 sm:mb-12">Connect With Us</h2>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                        {[
                            { name: 'LinkedIn', url: 'https://www.linkedin.com/school/college-of-engineering-chengannur/', icon: <Linkedin size={24} className="sm:w-[28px] sm:h-[28px]" />, color: '#0077B5' },
                            { name: 'Instagram', url: 'https://www.instagram.com/cec_chengannur/', icon: <Instagram size={24} className="sm:w-[28px] sm:h-[28px]" />, color: '#E4405F' },
                            { name: 'Facebook', url: '#', icon: <Facebook size={24} className="sm:w-[28px] sm:h-[28px]" />, color: '#1877F2' }
                        ].map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -10 }}
                                className="flex flex-col items-center gap-2 sm:gap-4 group"
                            >
                                <div 
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white shadow-lg sm:shadow-xl flex items-center justify-center transition-all duration-300 group-hover:text-white"
                                    style={{ '--hover-bg': social.color }}
                                >
                                    <div className="group-hover:scale-110 transition-transform" style={{ color: social.color }}>
                                        {social.icon}
                                    </div>
                                </div>
                                <span className="text-[0.6rem] sm:text-[0.7rem] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">{social.name}</span>
                            </motion.a>
                        ))}
                    </div>
                </div>
                
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
            </div>
        </div>
    );
};

export default ContactPage;
