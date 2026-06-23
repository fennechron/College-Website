import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';

const EventDetail = () => {
    const { id } = useParams();
    const [eventData, setEventData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        client.fetch(`*[_type == "eventNews" && _id == $id][0]`, { id })
            .then(data => {
                setEventData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch event detail:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-slate-50">
                <div className="text-xl font-bold text-primary animate-pulse">Loading Details...</div>
            </div>
        );
    }

    if (!eventData) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-slate-50">
                <h1 className="text-3xl font-display font-bold text-primary mb-4">Event Not Found</h1>
                <Link to="/" className="text-accent font-bold hover:underline">Return to Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 sm:pt-32 pb-12 sm:pb-20 bg-slate-50 selection:bg-accent selection:text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                
                {/* Back Button */}
                <Link to="/#events-news" className="inline-flex items-center text-secondary/70 hover:text-accent font-bold mb-6 sm:mb-8 transition-colors group text-sm sm:text-base">
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform shrink-0" />
                    Back to Events
                </Link>

                {/* Header */}
                <div className="bg-white p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-[2rem] shadow-[0_10px_40px_rgba(12,43,78,0.05)] border border-primary/5 mb-6 sm:mb-8">
                    {eventData.image && (
                        <div className="w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8 shadow-sm">
                            <img 
                                src={urlFor(eventData.image).url()} 
                                alt={eventData.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <div className="bg-accent/10 text-accent font-black px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm tracking-widest uppercase">
                            {eventData.type}
                        </div>
                        <div className="flex items-center text-secondary/60 font-semibold text-xs sm:text-sm">
                            <Calendar size={14} className="mr-1.5 sm:mr-2" />
                            {eventData.date}
                        </div>
                    </div>
                    
                    <h1 className="text-xl sm:text-3xl md:text-5xl font-display font-black text-primary leading-tight mb-4 sm:mb-6">
                        {eventData.title}
                    </h1>

                    <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-accent rounded-full mb-6 sm:mb-8"></div>
                    
                    <div className="text-sm sm:text-lg md:text-xl text-secondary/80 font-medium leading-relaxed border-l-4 border-accent/30 pl-4 sm:pl-6 mb-4 sm:mb-8">
                        {eventData.description}
                    </div>
                </div>

                {/* Main Content */}
                {eventData.content && (
                    <div className="bg-white p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-[2rem] shadow-[0_10px_40px_rgba(12,43,78,0.05)] border border-primary/5">
                        <div className="flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-slate-100">
                            <FileText className="text-accent shrink-0 w-[22px] h-[22px] sm:w-[28px] sm:h-[28px]" />
                            <h2 className="text-lg sm:text-2xl font-display font-bold text-primary">Full Details</h2>
                        </div>
                        
                        <div className="prose prose-sm sm:prose-base md:prose-lg prose-slate max-w-none text-secondary/80 leading-relaxed font-body whitespace-pre-wrap">
                            {eventData.content}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventDetail;
