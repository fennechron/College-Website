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
        <div className="min-h-screen pt-32 pb-20 bg-slate-50 selection:bg-accent selection:text-white">
            <div className="max-w-4xl mx-auto px-6">
                
                {/* Back Button */}
                <Link to="/#events-news" className="inline-flex items-center text-secondary/70 hover:text-accent font-bold mb-8 transition-colors group">
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Events
                </Link>

                {/* Header */}
                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_10px_40px_rgba(12,43,78,0.05)] border border-primary/5 mb-8">
                    {eventData.image && (
                        <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden mb-8 shadow-sm">
                            <img 
                                src={urlFor(eventData.image).url()} 
                                alt={eventData.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-accent/10 text-accent font-black px-4 py-1.5 rounded-full text-sm tracking-widest uppercase">
                            {eventData.type}
                        </div>
                        <div className="flex items-center text-secondary/60 font-semibold text-sm">
                            <Calendar size={16} className="mr-2" />
                            {eventData.date}
                        </div>
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-display font-black text-primary leading-tight mb-6">
                        {eventData.title}
                    </h1>

                    <div className="w-24 h-1.5 bg-accent rounded-full mb-8"></div>
                    
                    <div className="text-lg md:text-xl text-secondary/80 font-medium leading-relaxed border-l-4 border-accent/30 pl-6 mb-8">
                        {eventData.description}
                    </div>
                </div>

                {/* Main Content */}
                {eventData.content && (
                    <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_10px_40px_rgba(12,43,78,0.05)] border border-primary/5">
                        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                            <FileText className="text-accent" size={28} />
                            <h2 className="text-2xl font-display font-bold text-primary">Full Details</h2>
                        </div>
                        
                        <div className="prose prose-lg prose-slate max-w-none text-secondary/80 leading-relaxed font-body whitespace-pre-wrap">
                            {eventData.content}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventDetail;
