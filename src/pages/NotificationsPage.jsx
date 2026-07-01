import React, { useState, useEffect } from 'react';
import { client } from '../lib/sanity';
import { Bell, AlertCircle, FileText, ChevronRight } from 'lucide-react';

const NotificationsPage = () => {
    const [sanityData, setSanityData] = useState({
        Announcements: [],
        Notifications: [],
        'Notice Board': []
    });
    const [activeTab, setActiveTab] = useState('Announcements');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Updates & Notifications | College of Engineering Chengannur";
        client.fetch('*[_type == "announcement"] | order(date desc) { text, category, externalLink, "pdfUrl": pdf.asset->url, date }')
            .then(data => {
                if (data && data.length > 0) {
                    setSanityData({
                        Announcements: data.filter(d => d.category === 'Announcements'),
                        Notifications: data.filter(d => d.category === 'Notifications'),
                        'Notice Board': data.filter(d => d.category === 'Notice Board')
                    });
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Sanity fetch error:", err);
                setLoading(false);
            });
    }, []);

    const tabs = [
        { id: 'Announcements', label: 'Announcements', icon: Bell },
        { id: 'Notifications', label: 'Notifications', icon: AlertCircle },
        { id: 'Notice Board', label: 'Notice Board', icon: FileText }
    ];

    const currentItems = sanityData[activeTab] || [];

    return (
        <div className="min-h-screen bg-background pt-8 pb-20">
            <div className="max-w-4xl mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="mb-8 text-center sm:text-left">
                    <h1 className="text-3xl md:text-5xl font-display font-extrabold text-primary uppercase tracking-wide mb-3">
                        Notifications & <span className="text-accent">Updates</span>
                    </h1>
                    <div className="w-20 h-1.5 bg-accent rounded-full mx-auto sm:mx-0"></div>
                </div>

                {/* Tabs */}
                <div className="flex overflow-x-auto no-scrollbar gap-1 sm:gap-2 mb-6 sm:mb-8 pb-1 sm:pb-2 border-b border-primary/10 -mx-4 px-4 sm:mx-0 sm:px-0">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-t-lg font-bold text-[0.75rem] sm:text-sm tracking-wide transition-all whitespace-nowrap shrink-0 ${
                                    isActive 
                                        ? 'bg-primary text-white border-b-4 border-accent' 
                                        : 'bg-white text-secondary hover:bg-primary/5 hover:text-primary'
                                }`}
                            >
                                <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                                {tab.label}
                                {isActive && (
                                    <span className="ml-1 sm:ml-2 bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full text-[0.65rem] sm:text-xs">
                                        {currentItems.length}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(10,22,40,0.06)] border border-primary/10 p-4 sm:p-6 min-h-[50vh]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-40 gap-3">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            <p className="text-secondary font-medium animate-pulse text-sm sm:text-base">Loading updates...</p>
                        </div>
                    ) : currentItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-center">
                            <AlertCircle size={32} className="text-primary/20 mb-3 sm:w-10 sm:h-10" />
                            <p className="text-secondary font-medium text-sm sm:text-base">No recent updates in this category.</p>
                        </div>
                    ) : (
                        <ul className="flex flex-col divide-y divide-primary/5">
                            {currentItems.map((item, idx) => (
                                <li key={idx} className="group flex items-start gap-3 sm:gap-4 py-4 sm:py-5 hover:bg-primary/5 px-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                                    <div className="bg-accent/10 p-2 sm:p-2.5 rounded-lg text-accent mt-0.5 shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                                        <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        {idx === 0 && (
                                            <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded bg-accent px-1.5 sm:px-2 py-0.5 text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-wider text-white mb-1.5 sm:mb-2 shadow-sm">
                                                <span className="relative flex h-1.5 w-1.5">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                                                </span>
                                                LATEST
                                            </span>
                                        )}
                                        {item.date && (
                                            <p className="text-[0.65rem] sm:text-xs font-semibold text-primary/50 mb-1">
                                                {new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        )}
                                        
                                        {item.externalLink || item.pdfUrl ? (
                                            <a 
                                                href={item.externalLink || item.pdfUrl} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="text-[0.95rem] sm:text-[1.05rem] font-bold leading-snug text-secondary group-hover:text-primary transition-colors block group-hover:underline underline-offset-2 break-words"
                                            >
                                                {item.text}
                                            </a>
                                        ) : (
                                            <span className="text-[0.95rem] sm:text-[1.05rem] font-bold leading-snug text-secondary group-hover:text-primary transition-colors block break-words">
                                                {item.text}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
