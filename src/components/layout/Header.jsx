import React from 'react';

const Header = () => {
    return (
        <header className="relative bg-cream py-4">
            <div className="mx-auto flex max-w-[1280px] items-center gap-[18px] px-6">
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center gap-[2px] rounded-xl bg-gradient-to-br from-coral to-coral2">
                    <span className="font-display text-[1.4rem] font-extrabold leading-none text-slate-900">
                        CEC
                    </span>
                    <span className="text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-slate-900/75">
                        Kerala
                    </span>
                </div>
                <div>
                    <h1 className="font-display text-[1.45rem] font-bold leading-[1.2] text-slate-900">
                        College of Engineering Chengannur
                    </h1>
                    <p className="mt-[3px] text-[0.78rem] tracking-[0.04em] text-slate-900/55">
                        Government of Kerala &nbsp;&middot;&nbsp; APJ Abdul Kalam Technological University &nbsp;&middot;&nbsp; AICTE Approved
                    </p>
                </div>
                <div className="ml-auto hidden items-center gap-[10px] md:flex">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-[14px] py-[6px] text-center">
                        <div className="font-display text-base font-bold leading-none text-gold2">
                            NAAC
                        </div>
                        <div className="text-[0.62rem] uppercase tracking-[0.07em] text-slate-900/50">
                            B++ Grade
                        </div>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-[14px] py-[6px] text-center">
                        <div className="font-display text-base font-bold leading-none text-gold2">
                            NBA
                        </div>
                        <div className="text-[0.62rem] uppercase tracking-[0.07em] text-slate-900/50">
                            Accredited
                        </div>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-[14px] py-[6px] text-center">
                        <div className="font-display text-base font-bold leading-none text-gold2">
                            Est.
                        </div>
                        <div className="text-[0.62rem] uppercase tracking-[0.07em] text-slate-900/50">
                            1999
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
