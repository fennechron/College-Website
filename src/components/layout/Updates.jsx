import React from 'react';

const Updates = () => {
    return (
        <div className="overflow-hidden bg-secondary py-[8px] text-base font-medium text-white border-y border-white/10 relative z-10">
            <div className="flex w-full items-center gap-0 px-4 lg:px-8">
                <span className="mr-5 shrink-0 whitespace-nowrap rounded-[4px] bg-accent px-4 py-[4px] text-[0.8rem] font-bold uppercase tracking-[0.1em] text-white shadow-sm">
                    Updates
                </span>
                <div className="flex-1 overflow-hidden">
                    <p className="animate-scrolltxt whitespace-nowrap text-white/95 text-[1.05rem]">
                        🎓 NCICST-25 National Conference Registration Open — April 10-11, 2025 &nbsp;|&nbsp; 📋 B.Tech Admissions 2025-26 via KEAM Now Open &nbsp;|&nbsp; 🏆 CEC Team Wins Smart Kerala Hackathon 2025 &nbsp;|&nbsp; 📢 KTU S6/S8 Examination Schedule Published &nbsp;|&nbsp; ✅ 100% Placement — CSE &amp; ECE Batch 2024
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Updates;
