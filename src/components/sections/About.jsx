import React from 'react';
import aboutImg from '../../assets/cec12.jpg';

const About = () => {
    return (
        <section id="about" className="py-20">
            <div className="mx-auto max-w-[1280px] px-6">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    <div className="relative">
                        <div className="absolute left-[-16px] top-[-16px] -z-10 h-[100px] w-[100px] rounded-2xl bg-gold opacity-70"></div>
                        <img
                            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-hero"
                            src={aboutImg}
                            alt="CEC Campus"
                        />
                        <div className="absolute bottom-[-10px] right-[10px] rounded-[14px] bg-coral px-[22px] py-[18px] text-center text-white shadow-coral max-[480px]:hidden lg:bottom-[-20px] lg:right-[-20px]">
                            <div className="font-display text-[2rem] font-bold leading-none">25+</div>
                            <div className="text-[0.72rem] tracking-[0.06em] text-white/85">Years of Excellence</div>
                        </div>
                    </div>
                    <div>
                        <span className="mb-[10px] inline-block rounded-[20px] bg-coral/10 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-coral">
                            Who We Are
                        </span>
                        <h2 className="mb-3 font-display text-[2.2rem] font-bold leading-[1.2] text-text">
                            Rooted in Kerala.<br />Built for the World.
                        </h2>
                        <div className="space-y-4 text-[#4a5568] leading-[1.8]">
                            <p>
                                College of Engineering Chengannur (CEC) is a premier government engineering institution established in 1999 under the Government of Kerala. Affiliated to APJ Abdul Kalam Technological University (KTU), the college offers undergraduate, postgraduate, and doctoral programmes across core engineering disciplines.
                            </p>
                            <p>
                                Situated in the vibrant district of Alappuzha, CEC has earned a reputation for academic rigour, research excellence, and producing graduates who lead in technology, industry, and academia. Our NBA-accredited programmes and NAAC B++ grading reflect our unwavering commitment to quality education.
                            </p>
                            <p>
                                With state-of-the-art laboratories, an active placement cell, industry partnerships, and vibrant student communities, CEC nurtures well-rounded engineers ready for a rapidly evolving world.
                            </p>
                        </div>
                        <div className="my-6 flex flex-wrap gap-[10px]">
                            <span className="rounded-[30px] border border-coral/20 bg-coral/10 px-4 py-[6px] text-[0.8rem] font-semibold text-coral">NBA Accredited</span>
                            <span className="rounded-[30px] border border-coral/20 bg-coral/10 px-4 py-[6px] text-[0.8rem] font-semibold text-coral">NAAC B++</span>
                            <span className="rounded-[30px] border border-coral/20 bg-coral/10 px-4 py-[6px] text-[0.8rem] font-semibold text-coral">AICTE Approved</span>
                            <span className="rounded-[30px] border border-coral/20 bg-coral/10 px-4 py-[6px] text-[0.8rem] font-semibold text-coral">KTU Affiliated</span>
                            <span className="rounded-[30px] border border-coral/20 bg-coral/10 px-4 py-[6px] text-[0.8rem] font-semibold text-coral">Govt. of Kerala</span>
                        </div>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 rounded-lg bg-coral px-7 py-3 text-[0.88rem] font-semibold text-white transition hover:-translate-y-px hover:bg-coral2"
                        >
                            Read More About CEC →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
