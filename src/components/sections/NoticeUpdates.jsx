import React, { useState, useEffect } from 'react';
import { ChevronDown, GraduationCap, Building2, Key, Info, FileText, Newspaper, BookOpen } from 'lucide-react';
import { client } from '../../lib/sanity';

const quickLinks = [
    { name: 'FACILITIES', icon: Building2, color: 'bg-white text-primary border border-primary/20 hover:border-accent hover:bg-accent/5', hasDropdown: true },
    { name: 'ADMISSION', icon: GraduationCap, color: 'bg-accent text-white border border-accent hover:bg-primary', hasDropdown: false },
    { name: 'HOSTEL', icon: Building2, color: 'bg-white text-primary border border-primary/20 hover:border-accent hover:bg-accent/5', hasDropdown: false },
    { name: 'LOGIN', icon: Key, color: 'bg-white text-primary border border-primary/20 hover:border-accent hover:bg-accent/5', hasDropdown: true },
    { name: 'DISCLOSURES', icon: Info, color: 'bg-white text-primary border border-primary/20 hover:border-accent hover:bg-accent/5', hasDropdown: false },
    { name: 'BLOG', icon: FileText, color: 'bg-white text-primary border border-primary/20 hover:border-accent hover:bg-accent/5', hasDropdown: false },
    { name: 'NEWS-EVENTS', icon: Newspaper, color: 'bg-white text-primary border border-primary/20 hover:border-accent hover:bg-accent/5', hasDropdown: false },
    { name: 'CENTRAL LIBRARY', icon: BookOpen, color: 'bg-white text-primary border border-primary/20 hover:border-accent hover:bg-accent/5', hasDropdown: false },
];

const announcements = [
    "New Result - B.Tech S6 (S) Exam, November 2025 (2022 Scheme)",
    "New Result - B.Tech S1 (R) Exam, December 2025 (2023 Scheme)",
    "Registration open for Annual Technical Fest 2025",
    "Notification regarding odd semester fee payment",
    "Guidelines for B.Tech Honors Registration published",
];

const upcomingEvents = [
    "» College of Engineering Chengannur is organizing the National Conference on Emerging Technologies from 19th to 21st December 2025.",
    "» The Department of Computer Science is organizing a Six-day AICTE Training and Learning (ATAL) Online Faculty Development Programme.",
    "» Annual Techfest 'Drishti 2025' dates announced.",
];

const events = [
    "» The 7th International Conference on Modelling and Simulation",
    "» Summer internship program - Computer Science Dept",
    "» Internship on Optical Communication Design with Opticystem",
    "» Workshop on Advanced AI and Machine Learning",
];

// Helper to duplicate items for smooth infinite scrolling
const ScrollList = ({ items }) => {
    const containerRef = React.useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [showLatestBtn, setShowLatestBtn] = useState(false);
    
    const needsScroll = items.length > 3;

    useEffect(() => {
        const container = containerRef.current;
        if (!container || items.length === 0 || !needsScroll) return;

        let animationId;
        const scrollStep = () => {
            if (!isHovered && container) {
                container.scrollTop += 1;
                // If we scrolled past the first half of the duplicated content, reset back to 0
                if (container.scrollTop >= container.scrollHeight / 2) {
                    container.scrollTop = 0;
                }
                
                // Show button if scrolled down a bit
                setShowLatestBtn(container.scrollTop > 50);
            }
            animationId = requestAnimationFrame(scrollStep);
        };

        animationId = requestAnimationFrame(scrollStep);
        return () => cancelAnimationFrame(animationId);
    }, [isHovered, items.length, needsScroll]);

    // Handle manual scroll to update button visibility when user swipes manually
    const handleScroll = () => {
        if (containerRef.current) {
            setShowLatestBtn(containerRef.current.scrollTop > 50);
        }
    };

    const scrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            // Temporarily pause auto-scroll so user can read the top item
            setIsHovered(true);
            setTimeout(() => setIsHovered(false), 2000);
        }
    };

    return (
        <div 
            className="relative h-[300px] w-full overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <div 
                ref={containerRef}
                onScroll={handleScroll}
                className="w-full h-full overflow-y-hidden no-scrollbar px-4 pb-4" 
            >
                <ul className="flex flex-col gap-6 pb-6 pt-4 pr-4">
                    {items.map((item, idx) => (
                        <li key={`first-${idx}`} className="text-sm md:text-[1.15rem] font-semibold leading-[1.6] text-secondary border-b border-primary/10 pb-5 last:border-0 cursor-pointer hover:text-accent hover:translate-x-1 transition-all duration-200">
                            {idx === 0 && (
                                <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-md bg-accent px-1.5 sm:px-2 py-0.5 text-[0.55rem] sm:text-[0.7rem] font-extrabold uppercase tracking-wider text-white mr-2 sm:mr-2.5 align-middle select-none shadow-[0_2px_8px_rgba(29,84,108,0.25)] shrink-0">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                                    </span>
                                    LATEST
                                </span>
                            )}
                            {typeof item === 'object' && item !== null && (item.externalLink || item.pdfUrl) ? (
                                <a href={item.externalLink || item.pdfUrl} target="_blank" rel="noreferrer" className="align-middle hover:underline block">
                                    {item.text}
                                </a>
                            ) : (
                                <span className="align-middle block">{typeof item === 'object' && item !== null ? item.text : item}</span>
                            )}
                        </li>
                    ))}
                </ul>
                {needsScroll && (
                    <ul className="flex flex-col gap-6 pb-6 pr-4" aria-hidden="true">
                        {items.map((item, idx) => (
                            <li key={`second-${idx}`} className="text-sm md:text-[1.15rem] font-semibold leading-[1.6] text-secondary border-b border-primary/10 pb-5 last:border-0 cursor-pointer hover:text-accent hover:translate-x-1 transition-all duration-200">
                                {idx === 0 && (
                                    <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-md bg-accent px-1.5 sm:px-2 py-0.5 text-[0.55rem] sm:text-[0.7rem] font-extrabold uppercase tracking-wider text-white mr-2 sm:mr-2.5 align-middle select-none shadow-[0_2px_8px_rgba(29,84,108,0.25)] shrink-0">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                                        </span>
                                        LATEST
                                    </span>
                                )}
                                {typeof item === 'object' && item !== null && (item.externalLink || item.pdfUrl) ? (
                                    <a href={item.externalLink || item.pdfUrl} target="_blank" rel="noreferrer" className="align-middle hover:underline block">
                                        {item.text}
                                    </a>
                                ) : (
                                    <span className="align-middle block">{typeof item === 'object' && item !== null ? item.text : item}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
            {/* Scroll to Top / Latest Button */}
            <button
                onClick={scrollToTop}
                className={`absolute bottom-4 right-4 bg-primary text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg hover:bg-accent hover:scale-105 transition-all duration-300 flex items-center gap-1 z-20 ${showLatestBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
            >
                ↑ LATEST
            </button>
        </div>
    );
};

const NoticeUpdates = () => {
    const [sanityAnnouncements, setSanityAnnouncements] = useState([]);
    const [sanityNotifications, setSanityNotifications] = useState([]);
    const [sanityNotices, setSanityNotices] = useState([]);

    useEffect(() => {
        client.fetch('*[_type == "announcement"] | order(date desc) { text, category, externalLink, "pdfUrl": pdf.asset->url }')
            .then(data => {
                if (data && data.length > 0) {
                    setSanityAnnouncements(data.filter(d => d.category === 'Announcements'));
                    setSanityNotifications(data.filter(d => d.category === 'Notifications'));
                    setSanityNotices(data.filter(d => d.category === 'Notice Board'));
                }
            })
            .catch(err => console.error("Sanity fetch error:", err));
    }, []);

    const displayAnnouncements = sanityAnnouncements.length > 0 ? sanityAnnouncements : announcements;
    const displayNotifications = sanityNotifications.length > 0 ? sanityNotifications : upcomingEvents;
    const displayNotices = sanityNotices.length > 0 ? sanityNotices : events;

    return (
        <section className="relative w-full bg-background py-12 overflow-hidden">
            {/* 3 Columns Board */}
            <div className="w-full px-4 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {/* Announcement */}
                    <div className="bg-white rounded-[16px] shadow-[0_8px_30px_rgba(10,22,40,0.06)] border border-primary/10 overflow-hidden hover:shadow-[0_12px_40px_rgba(10,22,40,0.1)] transition-shadow duration-300">
                        <div className="bg-gradient-to-r from-primary to-secondary py-5 px-6 text-center border-b-[3px] border-accent">
                            <h3 className="font-display text-[1.3rem] font-extrabold text-white uppercase tracking-[0.1em]">Announcements</h3>
                        </div>
                        <ScrollList items={displayAnnouncements} />
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white rounded-[16px] shadow-[0_8px_30px_rgba(10,22,40,0.06)] border border-primary/10 overflow-hidden hover:shadow-[0_12px_40px_rgba(10,22,40,0.1)] transition-shadow duration-300">
                        <div className="bg-gradient-to-r from-primary to-secondary py-5 px-6 text-center border-b-[3px] border-accent">
                            <h3 className="font-display text-[1.3rem] font-extrabold text-white uppercase tracking-[0.1em]">Notifications</h3>
                        </div>
                        <ScrollList items={displayNotifications} />
                    </div>

                    {/* Events */}
                    <div className="bg-white rounded-[16px] shadow-[0_8px_30px_rgba(10,22,40,0.06)] border border-primary/10 overflow-hidden hover:shadow-[0_12px_40px_rgba(10,22,40,0.1)] transition-shadow duration-300">
                        <div className="bg-gradient-to-r from-primary to-secondary py-5 px-6 text-center border-b-[3px] border-accent">
                            <h3 className="font-display text-[1.3rem] font-extrabold text-white uppercase tracking-[0.1em]">Notice Board</h3>
                        </div>
                        <ScrollList items={displayNotices} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NoticeUpdates;
