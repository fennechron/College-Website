import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, ChevronLeft, ChevronRight, Home, ChevronRight as ArrowIcon, FileText, ArrowRight, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const staffMembers = [
    { id: 1, name: "Smt. Asha K Pillai", designation: "Senior Superintendent" },
    { id: 2, name: "Smt. Danley Mary Johnson", designation: "Senior Superintendent" },
    { id: 3, name: "Sri. Anoop Raj T V", designation: "Junior Superintendent" },
    { id: 4, name: "Sri. Manoj K Mathew", designation: "Junior Superintendent" },
    { id: 5, name: "Smt. Priya N Peethambar", designation: "Head Clerk" },
    { id: 6, name: "Smt. Lekshmi Rani R", designation: "Head Clerk" },
    { id: 7, name: "Smt. Manjusha Devi N P", designation: "Senior Office Assistant" },
    { id: 8, name: "Sri. Dhananjayan P V", designation: "Office Assistant" },
    { id: 9, name: "Smt. Reshmi Raj K R", designation: "Technical Store Keeper" },
    { id: 10, name: "Smt. Niza N", designation: "Office Assistant" },
    { id: 11, name: "Smt. Smitha K R", designation: "Office Assistant" },
    { id: 12, name: "Smt. Aswathy U", designation: "Office Assistant" },
    { id: 13, name: "Smt. Renjini S", designation: "Data Entry Operator" },
    { id: 14, name: "Smt. Sheeba George", designation: "Data Entry Operator" },
    { id: 15, name: "Smt. Vidya Vijayan", designation: "Data Entry Operator" },
    { id: 16, name: "Sri. Suresh Kumar N", designation: "Watcher/Peon" },
    { id: 17, name: "Smt. Suja Kumari V R", designation: "Peon/Sweeper" },
    { id: 18, name: "Sri. Asharaf A", designation: "Watcher/Peon" },
    { id: 19, name: "Sri. Lathesh Kumar P A", designation: "Watcher/Peon" },
    { id: 20, name: "Sri. G Suresh Kumar", designation: "Security Guard" },
    { id: 21, name: "Sri. Raghunathan N G", designation: "Security Guard" },
    { id: 22, name: "Sri. Manoj K R", designation: "Security Guard" },
    { id: 23, name: "Sri. Muraleedharan Pillai", designation: "Security Guard" }
];

const calendarEvents = {
    // Year-Month-Day formatted keys
    "2026-05-12": { title: "Staff Development Program", desc: "Training session on E-Governance and office automation software in the Seminar Hall.", time: "10:00 AM", type: "Training" },
    "2026-05-20": { title: "Monthly Administrative Review", desc: "All section heads to present progress on academic registration audits.", time: "02:00 PM", type: "Meeting" },
    "2026-05-25": { title: "Fee Submission Deadline", desc: "Last date for submitting B.Tech S4 & S6 tuition fees without fine.", time: "04:00 PM", type: "Deadline" },
    "2026-05-29": { title: "Internal Academic & Audit Committee", desc: "Audit and verification of stock registers and academic documents.", time: "09:30 AM", type: "Audit" },
    "2026-06-03": { title: "Administrative Board Council", desc: "Annual strategic meeting chaired by the Principal and Governing Board representatives.", time: "11:00 AM", type: "Meeting" },
    "2026-06-12": { title: "Tech-Fest Budget Planning", desc: "Financial planning meeting for the upcoming national level tech-fest.", time: "03:00 PM", type: "Planning" },
    "2026-06-18": { title: "Public Holiday", desc: "State Festival - Administrative office closed.", time: "All Day", type: "Holiday" }
};

const recentPosts = [
    {
        id: "post-1",
        date: "May 18, 2026",
        category: "Announcements",
        title: "Extension of Admission Registration for B.Tech & MCA 2026",
        summary: "The last date for submitting online applications for management and NRI seat registrations has been extended to May 30, 2026 due to numerous requests.",
        readTime: "2 min read",
        link: "/page/downloads"
    },
    {
        id: "post-2",
        date: "May 15, 2026",
        category: "Scholarships",
        title: "MCM Scholarship Applications for EWS Students open",
        summary: "Eligible B.Tech students are instructed to submit their Merit-cum-Means scholarship applications with income and community certificates to the administrative desk.",
        readTime: "3 min read",
        link: "/page/downloads"
    },
    {
        id: "post-3",
        date: "May 10, 2026",
        category: "Logistics",
        title: "Revised College Bus Route & Timings for Summer Term",
        summary: "Bus route No. 3 (via Chengannur Railway Station) has been updated with a new early departure schedule. Click to view the revised boarding points and time charts.",
        readTime: "1 min read",
        link: "/page/downloads"
    }
];

const getInitials = (name) => {
    const cleanName = name.replace(/^(Smt|Sri|Shri|Dr)\.?\s+/i, '');
    const parts = cleanName.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0] ? parts[0].substring(0, 2).toUpperCase() : 'ST';
};

const AdministrativeStaff = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 20)); // Set to mid-May 2026 to fit system context
    const [selectedDateKey, setSelectedDateKey] = useState("2026-05-20");
    const [selectedEvent, setSelectedEvent] = useState(calendarEvents["2026-05-20"]);

    // Filter staff members based on search term
    const filteredStaff = staffMembers.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        member.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calendar logic
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    const totalDays = endOfMonth.getDate();
    const startDayOfWeek = startOfMonth.getDay(); // 0: Sun, 1: Mon, etc.

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const getFormattedDateString = (dayNum) => {
        const d = dayNum.toString().padStart(2, '0');
        const m = (month + 1).toString().padStart(2, '0');
        return `${year}-${m}-${d}`;
    };

    const handleDateSelect = (dayNum) => {
        const dateKey = getFormattedDateString(dayNum);
        setSelectedDateKey(dateKey);
        if (calendarEvents[dateKey]) {
            setSelectedEvent(calendarEvents[dateKey]);
        } else {
            setSelectedEvent(null);
        }
    };

    // Auto scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Month Names
    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    // Helper to render calendar days
    const renderCalendarDays = () => {
        const days = [];
        
        // Blank spaces for days before the 1st of the month
        for (let i = 0; i < startDayOfWeek; i++) {
            days.push(
                <div key={`empty-${i}`} className="h-10 w-10 flex items-center justify-center text-slate-300 text-xs"></div>
            );
        }

        // Days of the month
        for (let d = 1; d <= totalDays; d++) {
            const dateKey = getFormattedDateString(d);
            const hasEvent = !!calendarEvents[dateKey];
            const isSelected = selectedDateKey === dateKey;
            
            days.push(
                <button
                    key={`day-${d}`}
                    onClick={() => handleDateSelect(d)}
                    className={`h-10 w-10 flex flex-col items-center justify-center rounded-xl text-sm font-bold relative transition-all duration-200 ${
                        isSelected 
                            ? "bg-accent text-white shadow-lg" 
                            : hasEvent 
                                ? "bg-primary/5 text-primary hover:bg-primary/10 border border-primary/20" 
                                : "text-primary/70 hover:bg-slate-100"
                    }`}
                >
                    <span>{d}</span>
                    {hasEvent && !isSelected && (
                        <span className="absolute bottom-1.5 w-1.5 h-1.5 bg-accent rounded-full animate-ping"></span>
                    )}
                    {hasEvent && isSelected && (
                        <span className="absolute bottom-1.5 w-1.5 h-1.5 bg-white rounded-full"></span>
                    )}
                </button>
            );
        }

        return days;
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-body">
            {/* ─── Hero Section ─── */}
            <div className="bg-primary text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-95"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-4 text-left"
                    >
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-[0.8rem] font-bold tracking-widest text-white/60 mb-2 uppercase">
                            <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1.5 whitespace-nowrap">
                                <Home size={14} /> HOME
                            </Link>
                            <ArrowIcon size={12} className="text-white/40" />
                            <span className="text-white/40 whitespace-nowrap">ABOUT</span>
                            <ArrowIcon size={12} className="text-white/40" />
                            <span className="text-white/40 whitespace-nowrap">ADMINISTRATIONS</span>
                            <ArrowIcon size={12} className="text-white/40" />
                            <span className="text-accent underline decoration-2 underline-offset-4 whitespace-nowrap">ADMINISTRATIVE STAFF</span>
                        </div>
                        
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tighter uppercase max-w-4xl">
                            Administrative Staff
                        </h1>
                        
                    </motion.div>
                </div>
            </div>

            {/* ─── Main Content Grid ─── */}
            <div className="max-w-7xl mx-auto px-6 py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 flex-grow">
                
                {/* ─── Left Column: Search Bar & Table ─── */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-8 space-y-8"
                >
                    {/* Search & Stats Bar */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-[0_10px_40px_rgba(12,43,78,0.04)] border border-primary/5 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:max-w-md">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-primary/40" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search by name or designation..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-primary font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all text-sm"
                            />
                            {searchTerm && (
                                <button 
                                    onClick={() => setSearchTerm('')}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary/40 hover:text-accent font-bold text-xs"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-2.5 bg-primary/5 px-4.5 py-2.5 rounded-2xl border border-primary/10">
                            <UserCheck className="h-4.5 w-4.5 text-accent" />
                            <span className="text-xs font-black uppercase text-primary tracking-wider">
                                {filteredStaff.length} Staff Members Found
                            </span>
                        </div>
                    </div>

                    {/* Staff Table Card */}
                    <div className="bg-white rounded-[2.5rem] shadow-[0_10px_50px_rgba(12,43,78,0.06)] border border-primary/5 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-primary text-white border-b border-white/10">
                                        <th className="py-6 px-8 font-display font-black uppercase tracking-wider text-[0.7rem] w-24">Profile</th>
                                        <th className="py-6 px-8 font-display font-black uppercase tracking-wider text-[0.7rem]">Name</th>
                                        <th className="py-6 px-8 font-display font-black uppercase tracking-wider text-[0.7rem]">Designation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence mode="popLayout">
                                        {filteredStaff.length > 0 ? (
                                            filteredStaff.map((staff, idx) => (
                                                <motion.tr
                                                    key={staff.id}
                                                    initial={{ opacity: 0, y: 15 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.4) }}
                                                    className="group border-b border-slate-50 hover:bg-slate-50/70 transition-colors"
                                                >
                                                    {/* Avatar / Circle Icon */}
                                                    <td className="py-5 px-8">
                                                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/15 flex items-center justify-center font-display font-black text-accent text-sm group-hover:scale-105 transition-transform duration-300 shadow-sm border border-primary/5">
                                                            {getInitials(staff.name)}
                                                        </div>
                                                    </td>
                                                    
                                                    {/* Name */}
                                                    <td className="py-5 px-8">
                                                        <p className="text-base font-black text-primary group-hover:text-accent transition-colors duration-300">
                                                            {staff.name}
                                                        </p>
                                                    </td>

                                                    {/* Designation */}
                                                    <td className="py-5 px-8">
                                                        <span className="inline-block px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100/80 text-secondary border border-slate-200/50 group-hover:bg-accent/10 group-hover:text-accent group-hover:border-accent/15 transition-all">
                                                            {staff.designation}
                                                        </span>
                                                    </td>
                                                </motion.tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3} className="py-16 text-center text-slate-400">
                                                    <div className="flex flex-col items-center justify-center gap-4">
                                                        <span className="p-4 bg-slate-100 rounded-full text-slate-300">
                                                            <Search size={32} />
                                                        </span>
                                                        <p className="text-lg font-bold text-primary/70">No Staff Members Found</p>
                                                        <p className="text-sm max-w-xs leading-relaxed">
                                                            We couldn't find any staff matching "{searchTerm}". Please double-check the spelling or search parameters.
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>

                {/* ─── Right Column: Interactive Calendar ─── */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:col-span-4 space-y-8"
                >
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_50px_rgba(12,43,78,0.06)] border border-primary/5 space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                            <Calendar className="text-accent" size={24} />
                            <h3 className="text-lg font-black text-primary uppercase tracking-wider">
                                Office Calendar
                            </h3>
                        </div>

                        {/* Calendar Body */}
                        <div className="space-y-4">
                            {/* Calendar Header with Controls */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-black uppercase text-primary/80 tracking-widest">
                                    {monthNames[month]} {year}
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <button 
                                        onClick={prevMonth}
                                        className="p-2 hover:bg-slate-100 rounded-xl transition text-primary/60 hover:text-primary"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button 
                                        onClick={nextMonth}
                                        className="p-2 hover:bg-slate-100 rounded-xl transition text-primary/60 hover:text-primary"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-y-2 text-center">
                                {/* Week Days */}
                                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                                    <div key={day} className="text-xs font-black uppercase text-slate-400 py-1">
                                        {day}
                                    </div>
                                ))}
                                {/* Rendered days */}
                                {renderCalendarDays()}
                            </div>
                        </div>

                        {/* Calendar Event Display Details */}
                        <div className="pt-4 border-t border-slate-100">
                            <AnimatePresence mode="wait">
                                {selectedEvent ? (
                                    <motion.div
                                        key={selectedDateKey}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-slate-50 p-5 rounded-2xl border-l-4 border-accent space-y-3"
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <span className="inline-block px-2.5 py-1 text-[0.6rem] font-black uppercase tracking-wider rounded bg-accent/10 text-accent">
                                                {selectedEvent.type}
                                            </span>
                                            <div className="flex items-center gap-1.5 text-slate-500 font-bold text-xs shrink-0">
                                                <Clock size={12} />
                                                <span>{selectedEvent.time}</span>
                                            </div>
                                        </div>
                                        <h4 className="font-black text-primary text-[0.95rem] leading-tight">
                                            {selectedEvent.title}
                                        </h4>
                                        <p className="text-xs text-secondary/70 leading-relaxed font-semibold">
                                            {selectedEvent.desc}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="no-event"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-6 text-slate-400 text-xs font-bold"
                                    >
                                        No scheduled events on this date.<br />
                                        Select highlighted dates to view details.
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ─── Bottom Section: RECENT POSTS ─── */}
            <div className="bg-slate-100 py-20 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 space-y-12">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                        <div className="space-y-3 text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[0.65rem] font-black uppercase tracking-[0.2em]">
                                Communications
                            </div>
                            <h2 className="text-[2.2rem] font-display font-black text-primary uppercase tracking-tight leading-tight">
                                Recent Posts
                            </h2>
                            <p className="text-secondary/70 text-base font-semibold max-w-xl">
                                Stay informed with the latest directives, circulars, office notifications, and deadlines published by the administrative sector.
                            </p>
                        </div>
                        {/* Premium Link to central Downloads/Notice page */}
                        <Link 
                            to="/page/downloads" 
                            className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-secondary transition-all hover:shadow-xl group shrink-0"
                        >
                            View All Announcements
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Posts Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {recentPosts.map((post, index) => (
                            <motion.div 
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group bg-white rounded-3xl border border-primary/10 overflow-hidden hover:shadow-[0_20px_50px_rgba(12,43,78,0.08)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full text-left"
                            >
                                {/* Card Header with category & date */}
                                <div className="p-8 pb-0 flex items-center justify-between">
                                    <span className="px-3 py-1 bg-accent/5 text-accent text-[0.65rem] font-black rounded-full tracking-widest uppercase">
                                        {post.category}
                                    </span>
                                    <span className="text-xs text-slate-400 font-bold">
                                        {post.date}
                                    </span>
                                </div>

                                {/* Card Body */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-lg font-display font-bold text-primary mb-4 leading-snug group-hover:text-accent transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-secondary/70 text-sm leading-relaxed mb-6 flex-grow font-semibold">
                                        {post.summary}
                                    </p>
                                    
                                    {/* Action link */}
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                                            <Clock size={12} />
                                            <span>{post.readTime}</span>
                                        </div>
                                        <Link 
                                            to={post.link} 
                                            className="inline-flex items-center text-primary hover:text-accent font-black text-xs tracking-wider group/link transition-colors"
                                        >
                                            READ POST
                                            <ArrowIcon size={12} className="ml-1 text-primary group-hover/link:text-accent group-hover/link:translate-x-1 transition-all" />
                                        </Link>
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

export default AdministrativeStaff;
