import React from 'react';

const Alumni = () => {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-[1280px] px-6">
                <span className="mb-[10px] inline-block rounded-[20px] bg-coral/10 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-coral">
                    Alumni Voices
                </span>
                <h2 className="mb-8 font-display text-[2.2rem] font-bold leading-[1.2] text-text">
                    What Our Graduates Say
                </h2>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <div className="rounded-2xl border border-border bg-white p-[26px] transition hover:-translate-y-[3px] hover:shadow-[0_10px_30px_rgba(10,22,40,0.09)]">
                        <div className="mb-3 text-[0.9rem] text-gold">★★★★★</div>
                        <p className="mb-[18px] text-[0.9rem] italic leading-[1.75] text-[#4a5568]">
                            "CEC gave me a strong technical foundation. The faculty was incredibly supportive and the hands-on lab sessions prepared me well for industry. The placement support helped me land a role at Infosys right out of college."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-coral to-coral2 font-display text-[1.1rem] font-bold text-white">A</div>
                            <div>
                                <div className="text-[0.9rem] font-bold text-text">Anju Krishnan</div>
                                <div className="text-[0.75rem] text-muted">B.Tech CSE, 2022 &middot; Software Engineer, Infosys</div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-white p-[26px] transition hover:-translate-y-[3px] hover:shadow-[0_10px_30px_rgba(10,22,40,0.09)]">
                        <div className="mb-3 text-[0.9rem] text-gold">★★★★★</div>
                        <p className="mb-[18px] text-[0.9rem] italic leading-[1.75] text-[#4a5568]">
                            "The research culture at CEC encouraged me to pursue my M.Tech and eventually a Ph.D. The ECE department has world-class labs and professors who are genuine leaders in their respective fields."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-coral to-coral2 font-display text-[1.1rem] font-bold text-white">V</div>
                            <div>
                                <div className="text-[0.9rem] font-bold text-text">Vishnu Prasad</div>
                                <div className="text-[0.75rem] text-muted">B.Tech ECE, 2020 &middot; Research Scholar, IIT Bombay</div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-white p-[26px] transition hover:-translate-y-[3px] hover:shadow-[0_10px_30px_rgba(10,22,40,0.09)]">
                        <div className="mb-3 text-[0.9rem] text-gold">★★★★☆</div>
                        <p className="mb-[18px] text-[0.9rem] italic leading-[1.75] text-[#4a5568]">
                            "CEC fostered both academic excellence and personal growth. The IEEE and NSS chapters were outstanding platforms for leadership development. The strong alumni network was invaluable during my career transition."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-coral to-coral2 font-display text-[1.1rem] font-bold text-white">P</div>
                            <div>
                                <div className="text-[0.9rem] font-bold text-text">Priya Mohan</div>
                                <div className="text-[0.75rem] text-muted">B.Tech Civil, 2019 &middot; Project Manager, L&amp;T</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Alumni;
