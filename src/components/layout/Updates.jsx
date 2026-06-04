import React, { useState, useEffect } from 'react';
import { client } from '../../lib/sanity';

const localUpdates = [
    "🎓 NCICST-25 National Conference Registration Open — April 10-11, 2025",
    "📋 B.Tech Admissions 2025-26 via KEAM Now Open",
    "🏆 CEC Team Wins Smart Kerala Hackathon 2025",
    "📢 KTU S6/S8 Examination Schedule Published",
    "✅ 100% Placement — CSE & ECE Batch 2024"
];

const Updates = () => {
    const [updates, setUpdates] = useState(localUpdates);

    useEffect(() => {
        const query = `*[_type == "announcement"] | order(date desc)[0...5]{ text }`;
        client.fetch(query)
            .then(data => {
                if (data && data.length > 0) {
                    setUpdates(data.map(item => item.text));
                }
            })
            .catch(err => {
                console.error("Error fetching announcements from Sanity:", err);
            });
    }, []);

    return (
        <div className="overflow-hidden bg-secondary py-[8px] text-base font-medium text-white border-y border-white/10 relative z-10">
            <div className="flex w-full items-center gap-0 px-4 lg:px-8">
                <span className="mr-5 shrink-0 whitespace-nowrap rounded-[4px] bg-accent px-4 py-[4px] text-[0.8rem] font-bold uppercase tracking-[0.1em] text-white shadow-sm">
                    Updates
                </span>
                <div className="flex-1 overflow-hidden">
                    <p className="animate-scrolltxt whitespace-nowrap text-white/95 text-[1.05rem]">
                        {updates.join(" \u00A0|\u00A0 ")}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Updates;
