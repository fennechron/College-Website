import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, ChevronLeft, ChevronRight, Home, ChevronRight as ArrowIcon, FileText, ArrowRight, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

import { client } from '../lib/sanity';

const getInitials = (name) => {
    if (!name) return 'LT';
    const cleanName = name.replace(/^(Smt|Sri|Shri|Dr)\.?\s+/i, '');
    const parts = cleanName.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0] ? parts[0].substring(0, 2).toUpperCase() : 'LT';
};

const LibraryStaff = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 20));
    const [selectedDateKey, setSelectedDateKey] = useState("2026-05-20");
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [staffList, setStaffList] = useState([]);
    const [calendarEventsMap, setCalendarEventsMap] = useState({});
    const [recentPostsList, setRecentPostsList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getEventMap = (events) => {
        if (!events) return {};
        if (!Array.isArray(events)) return events;
        const map = {};
        events.forEach(evt => {
            if (evt.dateKey) map[evt.dateKey] = evt;
        });
        return map;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        client.fetch(`*[_type == "administration"][0]`, {}, { ignoreCache: true })
            .then(data => {
                if (data) {
                    if (data.libraryStaffMembers && Array.isArray(data.libraryStaffMembers)) {
                        setStaffList(data.libraryStaffMembers);
                    }
                    const eventMap = getEventMap(data.libraryCalendarEvents);
                    setCalendarEventsMap(eventMap);
                    if (eventMap["2026-05-20"]) {
                        setSelectedEvent(eventMap["2026-05-20"]);
                    } else {
                        const firstKey = Object.keys(eventMap)[0];
                        if (firstKey) setSelectedEvent(eventMap[firstKey]);
                    }

                    if (data.libraryRecentPosts && Array.isArray(data.libraryRecentPosts)) {
                        setRecentPostsList(data.libraryRecentPosts);
                    }
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch library staff data from Sanity:", err);
                setLoading(false);
            });
    }, []);

    // Filter staff members based on search term
    const filteredStaff = staffList.filter(member => 
        (member.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
        (member.designation || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calendar logic
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    const totalDays = endOfMonth.getDate();
    const startDayOfWeek = startOfMonth.getDay();

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
        if (calendarEventsMap[dateKey]) {
            setSelectedEvent(calendarEventsMap[dateKey]);
        } else {
            setSelectedEvent(null);
        }
    };

    // Month Names
    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    // Helper to render calendar days
    const renderCalendarDays = () => {
        const days = [];
        
        for (let i = 0; i < startDayOfWeek; i++) {
            days.push(
                <div key={`empty-${i}`} className="h-10 w-10 flex items-center justify-center text-slate-300 text-xs"></div>
            );
        }

        for (let d = 1; d <= totalDays; d++) {
            const dateKey = getFormattedDateString(d);
            const hasEvent = !!calendarEventsMap[dateKey];
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
            <div className="bg-primary text-white py-12 sm:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-95"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-3 sm:gap-4 text-left"
                    >
                        {/* Breadcrumbs */}
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[0.7rem] sm:text-[0.8rem] font-bold tracking-widest text-white/60 mb-1 sm:mb-2 uppercase">
                            <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1.5 whitespace-nowrap">
                                <Home size={12} /> HOME
                            </Link>
                            <ArrowIcon size={10} className="text-white/40" />
                            <span className="text-white/40 whitespace-nowrap">ABOUT</span>
                            <ArrowIcon size={10} className="text-white/40" />
                            <span className="text-white/40 whitespace-nowrap">ADMINISTRATIONS</span>
                            <ArrowIcon size={10} className="text-white/40" />
                            <span className="text-accent underline decoration-2 underline-offset-4 whitespace-nowrap">LIBRARY STAFF</span>
                        </div>
                        
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tighter uppercase max-w-4xl">
                            Library Staff
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* ─── Main Content Grid ─── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 flex-grow">
                
                {/* ─── Left Column: Search Bar & Table ─── */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-8 space-y-6 sm:space-y-8"
                >
                    {/* Search Bar */}
                    <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-[0_10px_40px_rgba(12,43,78,0.04)] border border-primary/5">
                        <div className="relative w-full">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-primary/40" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search by name or designation..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-primary font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all text-xs sm:text-sm"
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
                    </div>

                    {/* Staff Table Card */}
                    <div className="bg-white rounded-2xl sm:rounded-[2.5rem] shadow-[0_10px_50px_rgba(12,43,78,0.06)] border border-primary/5 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-primary text-white border-b border-white/10">
                                        <th className="py-4 sm:py-6 px-4 sm:px-8 font-display font-black uppercase tracking-wider text-[0.6rem] sm:text-[0.7rem] w-16 sm:w-24 whitespace-nowrap">Profile</th>
                                        <th className="py-4 sm:py-6 px-4 sm:px-8 font-display font-black uppercase tracking-wider text-[0.6rem] sm:text-[0.7rem] whitespace-nowrap">Name</th>
                                        <th className="py-4 sm:py-6 px-4 sm:px-8 font-display font-black uppercase tracking-wider text-[0.6rem] sm:text-[0.7rem] whitespace-nowrap">Designation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence mode="popLayout">
                                        {loading ? (
                                            [...Array(5)].map((_, i) => (
                                                <tr key={`skel-${i}`} className="border-b border-slate-50 animate-pulse">
                                                    <td className="py-4 px-8">
                                                        <div className="h-10 w-10 bg-slate-200 rounded-xl"></div>
                                                    </td>
                                                    <td className="py-4 px-8">
                                                        <div className="h-4 w-36 bg-slate-200 rounded"></div>
                                                    </td>
                                                    <td className="py-4 px-8">
                                                        <div className="h-4 w-28 bg-slate-200 rounded"></div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : filteredStaff.length > 0 ? (
                                            filteredStaff.map((staff, idx) => (
                                                <motion.tr
                                                    key={staff._key || staff.id || idx}
                                                    initial={{ opacity: 0, y: 15 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.4) }}
                                                    className="group border-b border-slate-50 hover:bg-slate-50/70 transition-colors"
                                                >
                                                    {/* Avatar / Circle Icon */}
                                                    <td className="py-3 sm:py-5 px-4 sm:px-8">
                                                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 to-accent/15 flex items-center justify-center font-display font-black text-accent text-xs sm:text-sm group-hover:scale-105 transition-transform duration-300 shadow-sm border border-primary/5">
                                                            {getInitials(staff.name)}
                                                        </div>
                                                    </td>
                                                    
                                                    {/* Name */}
                                                    <td className="py-3 sm:py-5 px-4 sm:px-8">
                                                        <p className="text-sm sm:text-base font-black text-primary group-hover:text-accent transition-colors duration-300 whitespace-nowrap">
                                                            {staff.name}
                                                        </p>
                                                    </td>
                                                    
                                                    {/* Designation */}
                                                    <td className="py-3 sm:py-5 px-4 sm:px-8">
                                                        <span className="inline-block px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[0.65rem] sm:text-xs font-bold bg-slate-100/80 text-secondary border border-slate-200/50 group-hover:bg-accent/10 group-hover:text-accent group-hover:border-accent/15 transition-all whitespace-nowrap">
                                                            {staff.designation}
                                                        </span>
                                                    </td>
                                                </motion.tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3} className="py-12 sm:py-16 text-center text-slate-400">
                                                    <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 px-4">
                                                        <span className="p-3 sm:p-4 bg-slate-100 rounded-full text-slate-300">
                                                            <Search size={28} />
                                                        </span>
                                                        <p className="text-base sm:text-lg font-bold text-primary/70">No Staff Members Found</p>
                                                        <p className="text-xs sm:text-sm max-w-xs leading-relaxed">
                                                            {searchTerm ? `We couldn't find any staff matching "${searchTerm}". Please double-check the spelling or search parameters.` : 'No library staff members listed in Sanity CMS.'}
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
                    className="lg:col-span-4 space-y-6 sm:space-y-8"
                >
                    <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-[2.5rem] shadow-[0_10px_50px_rgba(12,43,78,0.06)] border border-primary/5 space-y-4 sm:space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 sm:pb-4">
                            <Calendar className="text-accent" size={20} />
                            <h3 className="text-base sm:text-lg font-black text-primary uppercase tracking-wider">
                                Library Calendar
                            </h3>
                        </div>
 
                        {/* Calendar Body */}
                        <div className="space-y-3 sm:space-y-4">
                            {/* Calendar Header with Controls */}
                            <div className="flex items-center justify-between">
                                <span className="text-xs sm:text-sm font-black uppercase text-primary/80 tracking-widest">
                                    {monthNames[month]} {year}
                                </span>
                                <div className="flex items-center gap-1">
                                    <button 
                                        onClick={prevMonth}
                                        className="p-1.5 hover:bg-slate-100 rounded-lg transition text-primary/60 hover:text-primary"
                                    >
                                        <ChevronLeft size={14} />
                                    </button>
                                    <button 
                                        onClick={nextMonth}
                                        className="p-1.5 hover:bg-slate-100 rounded-lg transition text-primary/60 hover:text-primary"
                                    >
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
 
                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-y-1 sm:gap-y-2 text-center">
                                {/* Week Days */}
                                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                                    <div key={day} className="text-[0.65rem] sm:text-xs font-black uppercase text-slate-400 py-1">
                                        {day}
                                    </div>
                                ))}
                                {/* Rendered days */}
                                {renderCalendarDays()}
                            </div>
                        </div>
 
                        {/* Calendar Event Display Details */}
                        <div className="pt-3 sm:pt-4 border-t border-slate-100">
                            <AnimatePresence mode="wait">
                                {selectedEvent ? (
                                    <motion.div
                                        key={selectedDateKey}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-slate-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border-l-4 border-accent space-y-2.5"
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <span className="inline-block px-2 py-0.5 text-[0.55rem] sm:text-[0.6rem] font-black uppercase tracking-wider rounded bg-accent/10 text-accent">
                                                {selectedEvent.type}
                                            </span>
                                            <div className="flex items-center gap-1 text-slate-500 font-bold text-[0.65rem] sm:text-xs shrink-0">
                                                <Clock size={10} />
                                                <span>{selectedEvent.time}</span>
                                            </div>
                                        </div>
                                        <h4 className="font-black text-primary text-xs sm:text-[0.95rem] leading-tight">
                                            {selectedEvent.title}
                                        </h4>
                                        <p className="text-[0.65rem] sm:text-xs text-secondary/70 leading-relaxed font-semibold">
                                            {selectedEvent.desc}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="no-event"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-4 sm:py-6 text-slate-400 text-[0.65rem] sm:text-xs font-bold leading-normal"
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
            <div className="bg-slate-100 py-12 sm:py-20 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6">
                        <div className="space-y-2 sm:space-y-3 text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[0.6rem] sm:text-[0.65rem] font-black uppercase tracking-[0.2em]">
                                Communications
                            </div>
                            <h2 className="text-2xl sm:text-[2.2rem] font-display font-black text-primary uppercase tracking-tight leading-tight">
                                Recent Posts
                            </h2>
                            <p className="text-secondary/70 text-sm sm:text-base font-semibold max-w-xl">
                                Stay informed with the latest updates, subscription reports, circulars, and book collection announcements from the central library.
                            </p>
                        </div>
                         
                    </div>
 
                    {/* Posts Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {recentPostsList.map((post, index) => (
                            <motion.div 
                                key={post._key || post.id || index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group bg-white rounded-2xl sm:rounded-3xl border border-primary/10 overflow-hidden hover:shadow-[0_20px_50px_rgba(12,43,78,0.08)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full text-left"
                            >
                                {/* Card Header with category & date */}
                                <div className="p-5 sm:p-8 pb-0 flex items-center justify-between">
                                    <span className="px-3 py-1 bg-accent/5 text-accent text-[0.6rem] sm:text-[0.65rem] font-black rounded-full tracking-widest uppercase">
                                        {post.category}
                                    </span>
                                    <span className="text-[0.65rem] sm:text-xs text-slate-400 font-bold">
                                        {post.date}
                                    </span>
                                </div>
 
                                {/* Card Body */}
                                <div className="p-5 sm:p-8 flex flex-col flex-grow">
                                    <h3 className="text-base sm:text-lg font-display font-bold text-primary mb-3 sm:mb-4 leading-snug group-hover:text-accent transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-secondary/70 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-grow font-semibold">
                                        {post.summary}
                                    </p>
                                    
                                    {/* Action link */}
                                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-50 mt-auto">
                                        <div className="flex items-center gap-1.5 text-[0.65rem] sm:text-xs text-slate-400 font-bold">
                                            <Clock size={10} />
                                            <span>{post.readTime}</span>
                                        </div>
                                        <Link 
                                            to={post.link} 
                                            className="inline-flex items-center text-primary hover:text-accent font-black text-[0.65rem] sm:text-xs tracking-wider group/link transition-colors"
                                        >
                                            READ POST
                                            <ArrowIcon size={10} className="ml-1 text-primary group-hover/link:text-accent group-hover/link:translate-x-1 transition-all" />
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

export default LibraryStaff;
