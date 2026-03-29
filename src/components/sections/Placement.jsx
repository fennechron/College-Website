import React from 'react';

const Placement = () => {
    return (
        <section id="placement" className="bg-slate-50 py-[60px]">
            <div className="mx-auto max-w-[1280px] px-6">
                <div className="flex flex-wrap items-center justify-between gap-10 max-md:flex-col">
                    <div>
                        <h2 className="mb-2 font-display text-[2rem] text-slate-900">Placement &amp; Careers</h2>
                        <p className="max-w-[480px] text-[0.95rem] leading-[1.7] text-slate-900/65">
                            The CEC Placement Cell has built strong ties with leading organisations across technology, infrastructure, and manufacturing sectors. Our graduates are valued for their technical depth and problem-solving abilities.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-[14px]">
                            <span className="rounded-md border border-slate-200 bg-white px-[14px] py-[6px] text-[0.78rem] font-semibold text-slate-900">TCS</span>
                            <span className="rounded-md border border-slate-200 bg-white px-[14px] py-[6px] text-[0.78rem] font-semibold text-slate-900">Infosys</span>
                            <span className="rounded-md border border-slate-200 bg-white px-[14px] py-[6px] text-[0.78rem] font-semibold text-slate-900">Wipro</span>
                            <span className="rounded-md border border-slate-200 bg-white px-[14px] py-[6px] text-[0.78rem] font-semibold text-slate-900">UST Global</span>
                            <span className="rounded-md border border-slate-200 bg-white px-[14px] py-[6px] text-[0.78rem] font-semibold text-slate-900">L&amp;T</span>
                            <span className="rounded-md border border-slate-200 bg-white px-[14px] py-[6px] text-[0.78rem] font-semibold text-slate-900">Cognizant</span>
                            <span className="rounded-md border border-slate-200 bg-white px-[14px] py-[6px] text-[0.78rem] font-semibold text-slate-900">ITC Infotech</span>
                        </div>
                    </div>
                    <div className="flex shrink-0 gap-10 max-md:flex-wrap max-md:justify-center">
                        <div className="text-center">
                            <div className="font-display text-[2.4rem] font-extrabold leading-none text-gold2">95%</div>
                            <div className="mt-1 text-[0.75rem] uppercase tracking-[0.07em] text-slate-900/55">Placed 2024</div>
                        </div>
                        <div className="text-center">
                            <div className="font-display text-[2.4rem] font-extrabold leading-none text-gold2">₹6.2L</div>
                            <div className="mt-1 text-[0.75rem] uppercase tracking-[0.07em] text-slate-900/55">Avg. Package</div>
                        </div>
                        <div className="text-center">
                            <div className="font-display text-[2.4rem] font-extrabold leading-none text-gold2">80+</div>
                            <div className="mt-1 text-[0.75rem] uppercase tracking-[0.07em] text-slate-900/55">Recruiters</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Placement;
