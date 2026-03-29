import React, { useState } from 'react';

const Programs = () => {
    const [activeTab, setActiveTab] = useState('B.Tech');

    const tabs = ['B.Tech', 'M.Tech', 'Ph.D'];

    const programsData = [
        { title: 'Computer Science & Engineering', duration: '4 Years', seats: '60 Seats \u00B7 NBA Accredited', type: 'B.Tech' },
        { title: 'Electronics & Communication Engineering', duration: '4 Years', seats: '60 Seats \u00B7 NBA Accredited', type: 'B.Tech' },
        { title: 'Electrical & Electronics Engineering', duration: '4 Years', seats: '60 Seats', type: 'B.Tech' },
        { title: 'Mechanical Engineering', duration: '4 Years', seats: '60 Seats', type: 'B.Tech' },
        { title: 'Civil Engineering', duration: '4 Years', seats: '60 Seats', type: 'B.Tech' },
        { title: 'Information Technology', duration: '4 Years', seats: '60 Seats', type: 'B.Tech' },
    ];

    return (
        <section id="programs" className="bg-slate-50 py-20">
            <div className="mx-auto max-w-[1280px] px-6">
                <span className="mb-[10px] inline-block rounded-[20px] bg-gold/15 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold2">
                    Academics
                </span>
                <h2 className="mb-3 font-display text-[2.2rem] font-bold leading-[1.2] text-slate-900">
                    Our Programmes
                </h2>
                <p className="max-w-[540px] text-[0.95rem] leading-[1.7] text-slate-900/55">
                    Undergraduate, postgraduate, and doctoral pathways across leading engineering disciplines
                </p>
                <div className="my-8 flex flex-wrap gap-[10px]">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`rounded-[30px] px-5 py-2 text-[0.82rem] font-semibold transition ${activeTab === tab
                                    ? 'bg-coral text-white border-coral'
                                    : 'border border-slate-200 bg-white text-slate-900/55 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="grid gap-4 max-[480px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {programsData.map((prog, idx) => (
                        <div
                            key={idx}
                            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-5 py-[22px] transition hover:-translate-y-[3px] hover:border-coral/50 hover:bg-coral/20"
                        >
                            <div className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-gold2">
                                {prog.type} &middot; {prog.duration}
                            </div>
                            <h4 className="text-[0.92rem] font-semibold leading-[1.4] text-slate-900">
                                {prog.title}
                            </h4>
                            <p className="mt-[5px] text-[0.78rem] text-slate-900/45">{prog.seats}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Programs;
