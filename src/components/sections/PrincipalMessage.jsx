import React from 'react';

const PrincipalMessage = () => {
    return (
        <section id="principal" className="bg-[#f8fafc] py-[60px]">
            <div className="mx-auto max-w-[1200px] px-5">
                <div className="mb-9">
                    <h2 className="relative inline-block pb-[10px] font-display text-[2rem] text-text after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-14 after:bg-coral">
                        Message from the Principal
                    </h2>
                </div>
                <div className="grid items-start gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
                    <div className="text-center">
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&amp;q=80" alt="Principal Dr. Ravi Kumar" className="mx-auto h-[210px] w-[180px] border-[3px] border-coral object-cover" />
                        <div className="mt-3 font-display text-[1.05rem] font-bold text-text">Dr. Ravi Kumar P.</div>
                        <div className="text-[0.78rem] uppercase tracking-[0.05em] text-muted">Principal, CEC</div>
                        <div className="mt-[3px] text-[0.78rem] uppercase tracking-[0.05em] text-muted">Ph.D, M.Tech, B.Tech</div>
                    </div>
                    <div>
                        <blockquote className="mb-4 border-l-4 border-coral pl-[18px] font-display text-[1.12rem] italic leading-[1.7] text-text">
                            "Engineering is not merely a profession - it is a responsibility to society. At CEC, we nurture not just technically proficient graduates, but thoughtful human beings who will contribute meaningfully to the world."
                        </blockquote>
                        <p className="mb-[10px] text-[0.9rem] leading-[1.75] text-[#4a5568]">It gives me immense pride to welcome you to the College of Engineering Chengannur, one of Kerala's finest government technical institutions. Since its inception in 1999, CEC has maintained an unwavering commitment to academic rigour, research excellence, and the all-round development of every student who walks through our gates.</p>
                        <p className="mb-[10px] text-[0.9rem] leading-[1.75] text-[#4a5568]">We have consistently produced graduates who excel in top national and multinational organisations, in research institutions, and as entrepreneurs. Our NBA-accredited programmes, experienced faculty, and modern infrastructure ensure that students receive an education that meets international standards while remaining rooted in the values of Kerala's rich educational tradition.</p>
                        <p className="mb-[10px] text-[0.9rem] leading-[1.75] text-[#4a5568]">I invite prospective students and their families to explore the numerous opportunities CEC offers - for learning, for growth, and for building the foundation of a fulfilling career in engineering and technology.</p>
                        <a href="#" className="mt-2 inline-block border-2 border-coral bg-coral px-[22px] py-2 text-[0.84rem] font-semibold uppercase tracking-[0.04em] text-white transition hover:border-coral2 hover:bg-coral2">Read Full Message</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PrincipalMessage;
