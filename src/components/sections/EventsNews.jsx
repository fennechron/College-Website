import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

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
    return (
        <section id="events-news" className="py-20 bg-background border-t border-primary/5">
            <div className="max-w-[95%] mx-auto px-4 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="text-left">
                        <h2 className="text-[2.5rem] font-display font-black text-primary uppercase tracking-tight leading-tight">
                            Events & <span className="text-accent underline decoration-primary decoration-4 underline-offset-8">News</span>
                        </h2>
                        <p className="mt-4 text-secondary/70 text-lg font-medium max-w-xl">
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
                        {[...eventsNews, ...eventsNews].map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className="w-[370px] group bg-white rounded-3xl border border-primary/10 overflow-hidden hover:shadow-[0_20px_50px_rgba(12,43,78,0.12)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                                {/* Card Header with Date Banner */}
                                <div className="h-40 relative bg-primary/5 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5"></div>
                                    <div className="relative z-10 flex flex-col items-center">
                                        <Calendar className="text-accent mb-2" size={32} />
                                        <span className="text-primary font-black tracking-widest text-sm">{item.date}</span>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-accent text-white text-[0.65rem] font-black px-3 py-1 rounded-full tracking-widest">
                                        {item.type}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-[1.25rem] font-display font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-secondary/70 text-base leading-relaxed mb-6 flex-grow ">
                                        {item.desc}
                                    </p>
                                    <a href="#read-more" className="inline-flex items-center text-primary font-bold text-sm tracking-wide group/link">
                                        READ MORE
                                        <div className="ml-2 w-0 h-[2px] bg-accent group-hover/link:w-6 transition-all duration-300"></div>
                                    </a>
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
