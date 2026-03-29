import React, { useState } from 'react';

const NoticeBoard = () => {
    const [filter, setFilter] = useState('All');

    const notices = [
        { date: 'March 28, 2025', type: 'Exam', title: 'Internal Examination Time Table — S4 & S6 (April 2025)', desc: 'All students must report 15 minutes prior. Electronic devices strictly prohibited during examination.' },
        { date: 'March 24, 2025', type: 'Event', title: 'Workshop: Embedded Systems & ARM Architecture — ECE Department', desc: 'Two-day hands-on workshop. Registration closes March 30, 2025. Limited seats available.' },
        { date: 'March 22, 2025', type: 'Fee', title: 'Semester Fee Payment Deadline — April 2025 Semester', desc: 'Complete payment via KTU portal before March 31, 2025 to avoid late fine of ₹500 per day.' },
        { date: 'March 18, 2025', type: 'General', title: 'Anti-Ragging Committee — Mandatory Declaration Submission', desc: 'All students to submit signed undertaking to the department office before April 1, 2025.' },
        { date: 'March 15, 2025', type: 'Event', title: 'NCICST-25 Paper Submission Deadline Extended to March 31', desc: 'Last date for research paper submission extended. Authors notified via registered email.' },
        { date: 'March 10, 2025', type: 'General', title: 'Library — No-Dues Certificate for Final Year Students', desc: 'Final year students must clear pending dues and return materials before April 10, 2025.' },
    ];

    const getTypeStyle = (type) => {
        switch (type) {
            case 'Exam': return 'bg-indigo-500/20 text-indigo-300';
            case 'Event': return 'bg-emerald-500/20 text-emerald-300';
            case 'Fee': return 'bg-amber-500/20 text-amber-300';
            case 'General': return 'bg-slate-400/15 text-slate-400';
            default: return 'bg-slate-400/15 text-slate-400';
        }
    };

    const filteredNotices = filter === 'All' ? notices : notices.filter(n => {
        if (filter === 'Admin') return ['General', 'Fee'].includes(n.type);
        if (filter === 'Exams') return n.type === 'Exam';
        if (filter === 'Events') return n.type === 'Event';
        return true;
    });

    return (
        <section className="py-20">
            <div className="mx-auto max-w-[1280px] px-6">
                <span className="mb-[10px] inline-block bg-coral/10 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-coral">
                    Official
                </span>
                <h2 className="mb-7 font-display text-[2.2rem] font-bold leading-[1.2] text-text">
                    Notice Board
                </h2>
                <div className="overflow-hidden rounded-[10px] border-2">
                    <div className="flex flex-col gap-3 border-b border-white/10 px-7 py-6 md:flex-row md:items-center md:justify-between">
                        <h2 className="font-display text-[1.4rem] text-black">Latest Notices</h2>
                        <div className="flex flex-wrap gap-[10px]">
                            {['All', 'Exams', 'Events', 'Admin'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`rounded-[20px] px-[14px] py-[6px] text-[0.78rem] font-semibold transition ${filter === f ? 'bg-coral text-white' : 'bg-black/10 text-black/60 hover:bg-coral hover:text-white'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2">
                        {filteredNotices.map((notice, idx) => (
                            <div
                                key={idx}
                                className={`px-7 py-5 transition hover:bg-black/[0.04] border-black/10 ${idx % 2 === 0 ? 'md:border-r' : ''
                                    } ${idx < filteredNotices.length - (filteredNotices.length % 2 === 0 ? 2 : 1) ? 'border-b' : ''
                                    }`}
                            >
                                <div className="mb-2 flex items-center gap-[10px]">
                                    <span className="text-[0.72rem] text-black/40">{notice.date}</span>
                                    <span className={`rounded-[10px] px-2 py-[2px] text-[0.62rem] font-bold uppercase tracking-[0.08em] ${getTypeStyle(notice.type)}`}>
                                        {notice.type}
                                    </span>
                                </div>
                                <h4 className="mb-[5px] text-[0.9rem] font-semibold leading-[1.4] text-black">
                                    {notice.title}
                                </h4>
                                <p className="text-[0.8rem] leading-[1.5] text-black/45">{notice.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NoticeBoard;
