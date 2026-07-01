import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { client, urlFor } from '../../lib/sanity';
import { Link } from 'react-router-dom';
const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const eventsNews = [
    { 
        id: 1, 
        date: "15 OCT 2025", 
        type: "EVENT", 
        title: "International Conference on AI & ML", 
        desc: "A 3-day deep dive into Artificial Intelligence with global keynote speakers and industry experts.",
        actionType: "content"
    },
    { 
        id: 2, 
        date: "10 OCT 2025", 
        type: "NEWS", 
        title: "CEC Alumnus Receives Prestigious R&D Award", 
        desc: "Our alumni from the 2018 batch recognized for their pioneering work in sustainable energy solutions.",
        actionType: "content"
    },
    { 
        id: 3, 
        date: "05 OCT 2025", 
        type: "EVENT", 
        title: "Annual Sports Meet 'AARAMBH' 2025", 
        desc: "The annual inter-collegiate sports championship returns. Register your teams by Oct 3rd.",
        actionType: "content"
    },
    { 
        id: 4, 
        date: "01 OCT 2025", 
        type: "NEWS", 
        title: "New Advanced Robotics Lab Inaugurated", 
        desc: "A state-of-the-art facility for research in Automated Systems and IOT, funded by IHRD.",
        actionType: "content"
    }
];

const EventsNews = () => {
    const [sanityData, setSanityData] = useState([]);
    const containerRef = React.useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        client.fetch('*[_type == "eventNews"]')
            .then(data => {
                if (data && data.length > 0) {
                    setSanityData(data);
                }
            })
            .catch(err => console.error("Sanity fetch error:", err));
    }, []);

    const displayData = sanityData.length > 0 ? sanityData : eventsNews;

    // Auto-scroll logic
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let animationId;
        const scrollStep = () => {
            if (!isHovered && container) {
                container.scrollLeft += 1;
                // If we scrolled past the first half of the duplicated content, reset back to 0 for infinite loop
                if (container.scrollLeft >= container.scrollWidth / 2) {
                    container.scrollLeft = 0;
                }
            }
            animationId = requestAnimationFrame(scrollStep);
        };

        animationId = requestAnimationFrame(scrollStep);
        return () => cancelAnimationFrame(animationId);
    }, [isHovered, displayData]);

    return (
        <section id="events-news" className="py-20 bg-background border-t border-primary/5">
            <div className="max-w-[95%] mx-auto px-4 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="text-left text-center md:text-left">
                        <h2 className="text-[2rem] md:text-[2.5rem] font-display font-black text-primary uppercase tracking-tight leading-tight">
                            Events & <span className="text-accent underline decoration-primary decoration-4 underline-offset-8">News</span>
                        </h2>
                        <p className="mt-4 text-secondary/70 text-base md:text-lg font-medium max-w-xl mx-auto md:mx-0">
                            Stay updated with the latest happenings, research breakthroughs, and upcoming cultural activities at CEC.
                        </p>
                    </div>
                </div>

                <style>
                {`
                :root {
                    --event-card-width: 240px;
                    --event-card-gap: 16px;
                }
                @media (min-width: 640px) {
                    :root {
                        --event-card-width: 370px;
                        --event-card-gap: 32px;
                    }
                }
                @media (min-width: 768px) {
                    .mask-gradient-horizontal {
                        mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                        -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                    }
                }
                `}
                </style>

                <div className="relative py-10 mask-gradient-horizontal">
                    <div 
                        ref={containerRef}
                        className="flex overflow-x-auto no-scrollbar items-stretch" 
                        style={{ gap: 'var(--event-card-gap)' }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onTouchStart={() => setIsHovered(true)}
                        onTouchEnd={() => setIsHovered(false)}
                    >
                        {[...displayData, ...displayData].map((item, idx) => (
                            <div key={`${item._id || item.id}-${idx}`} className="h-[360px] sm:h-[460px] group bg-white rounded-[1.5rem] sm:rounded-3xl border border-primary/10 overflow-hidden hover:shadow-[0_20px_50px_rgba(12,43,78,0.12)] transition-all duration-500 hover:-translate-y-2 flex flex-col shrink-0" style={{ width: 'var(--event-card-width)' }}>
                                {/* Card Header with Date Banner */}
                                <div className="h-32 sm:h-48 shrink-0 relative bg-primary/5 flex items-center justify-center overflow-hidden">
                                    {item.image ? (
                                        <img 
                                            src={urlFor(item.image).url()} 
                                            alt={item.title} 
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5"></div>
                                    )}
                                    <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors duration-500"></div>
                                    

                                    
                                    <div className="absolute top-4 right-4 bg-accent text-white text-[0.65rem] font-black px-3 py-1 rounded-full tracking-widest z-10 shadow-md">
                                        {item.type}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-4 sm:p-8 flex flex-col flex-grow">
                                    <h3 className="text-[0.95rem] sm:text-[1.25rem] font-display font-bold text-primary mb-2 sm:mb-4 leading-tight group-hover:text-accent transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-secondary/70 text-xs sm:text-base leading-relaxed mb-4 sm:mb-6 flex-grow min-h-[48px] sm:min-h-[72px]">
                                        {truncateText(item.desc || item.description, 110)}
                                    </p>
                                    
                                    {item.actionType === 'content' ? (
                                        <Link to={`/event/${item._id || item.id}`} className="inline-flex items-center text-primary font-bold text-[0.7rem] sm:text-sm tracking-wide group/link mt-auto">
                                            READ MORE
                                            <div className="ml-2 w-0 h-[2px] bg-accent group-hover/link:w-6 transition-all duration-300"></div>
                                        </Link>
                                    ) : (
                                        <a href={item.linkUrl || "#"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary font-bold text-[0.7rem] sm:text-sm tracking-wide group/link mt-auto">
                                            READ MORE
                                            <div className="ml-2 w-0 h-[2px] bg-accent group-hover/link:w-6 transition-all duration-300"></div>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventsNews;
