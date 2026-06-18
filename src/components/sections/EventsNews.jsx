import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { client, urlFor } from '../../lib/sanity';
import { Link } from 'react-router-dom';
const eventsNews = [
    { 
        id: 1, 
        date: "15 OCT 2025", 
        type: "EVENT", 
        title: "International Conference on AI & ML", 
        desc: "A 3-day deep dive into Artificial Intelligence with global keynote speakers and industry experts." 
    },
    { 
        id: 2, 
        date: "10 OCT 2025", 
        type: "NEWS", 
        title: "CEC Alumnus Receives Prestigious R&D Award", 
        desc: "Our alumni from the 2018 batch recognized for their pioneering work in sustainable energy solutions." 
    },
    { 
        id: 3, 
        date: "05 OCT 2025", 
        type: "EVENT", 
        title: "Annual Sports Meet 'AARAMBH' 2025", 
        desc: "The annual inter-collegiate sports championship returns. Register your teams by Oct 3rd." 
    },
    { 
        id: 4, 
        date: "01 OCT 2025", 
        type: "NEWS", 
        title: "New Advanced Robotics Lab Inaugurated", 
        desc: "A state-of-the-art facility for research in Automated Systems and IOT, funded by IHRD." 
    }
];

const EventsNews = () => {
    const [sanityData, setSanityData] = useState([]);

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
                    <button className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-secondary transition-all hover:shadow-xl group shrink-0">
                        View All Highlights
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <style>
                {`
                @keyframes scrollEvents {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-403px * 4)); }
                }
                .events-track {
                    animation: scrollEvents 40s linear infinite;
                }
                .events-track:hover {
                    animation-play-state: paused;
                }
                .mask-gradient-horizontal {
                    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                }
                `}
                </style>

                <div className="overflow-hidden relative py-10 mask-gradient-horizontal">
                    <div className="flex gap-8 events-track items-stretch min-w-max">
                        {[...displayData, ...displayData].map((item, idx) => (
                            <div key={`${item._id || item.id}-${idx}`} className="w-[370px] group bg-white rounded-3xl border border-primary/10 overflow-hidden hover:shadow-[0_20px_50px_rgba(12,43,78,0.12)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                                {/* Card Header with Date Banner */}
                                <div className="h-48 relative bg-primary/5 flex items-center justify-center overflow-hidden">
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
                                    
                                    <div className="relative z-10 flex flex-col items-center bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-white/50 transform group-hover:-translate-y-1 transition-transform duration-300">
                                        <Calendar className="text-accent mb-1" size={24} />
                                        <span className="text-primary font-black tracking-widest text-sm">{item.date}</span>
                                    </div>
                                    
                                    <div className="absolute top-4 right-4 bg-accent text-white text-[0.65rem] font-black px-3 py-1 rounded-full tracking-widest z-10 shadow-md">
                                        {item.type}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-[1.25rem] font-display font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-secondary/70 text-base leading-relaxed mb-6 flex-grow ">
                                        {item.desc || item.description}
                                    </p>
                                    
                                    {item.actionType === 'content' ? (
                                        <Link to={`/event/${item._id}`} className="inline-flex items-center text-primary font-bold text-sm tracking-wide group/link">
                                            READ MORE
                                            <div className="ml-2 w-0 h-[2px] bg-accent group-hover/link:w-6 transition-all duration-300"></div>
                                        </Link>
                                    ) : (
                                        <a href={item.linkUrl || "#"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary font-bold text-sm tracking-wide group/link">
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
