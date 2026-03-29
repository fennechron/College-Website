import React from 'react';

const Hero = () => {
    return (
        <section id="home" className="relative h-[380px] overflow-hidden bg-slate-100 md:h-[500px]">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%), url("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/College_of_Engineering_Chengannur_Main_Block.jpg/1280px-College_of_Engineering_Chengannur_Main_Block.jpg")`,
                }}
            ></div>
            <div className="relative z-10 mx-auto flex h-full max-w-[1200px] flex-col items-start justify-center px-5">
                <div className="mb-[14px] rounded-[2px] border border-slate-300 bg-slate-100/50 px-[14px] py-[5px] text-[0.75rem] uppercase tracking-[0.12em] text-slate-900">
                    Established 1999 &nbsp;&middot;&nbsp; Kerala, India
                </div>
                <h1 className="max-w-[680px] font-display text-[2rem] font-bold leading-[1.1] text-slate-900 drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] md:text-[3rem]">
                    College of Engineering<br />Chengannur
                </h1>
                <p className="mt-[10px] font-display text-[1.05rem] italic tracking-[0.03em] text-slate-900/85">
                    "Shaping engineers. Inspiring futures."
                </p>
                <div className="mt-[26px] flex flex-wrap gap-3">
                    <a
                        href="#about"
                        className="border-2 border-coral bg-coral px-[26px] py-[10px] text-[0.88rem] font-semibold uppercase tracking-[0.04em] text-white transition hover:border-coral2 hover:bg-coral2"
                    >
                        Explore CEC
                    </a>
                    <a
                        href="#admissions"
                        className="border-2 border-slate-800 px-[26px] py-[10px] text-[0.88rem] font-semibold uppercase tracking-[0.04em] text-slate-900 transition hover:border-slate-900 hover:bg-slate-800 hover:text-white"
                    >
                        Admissions 2025-26
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
