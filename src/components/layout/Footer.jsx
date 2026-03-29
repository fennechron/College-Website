import React from 'react';

const Footer = () => {
    return (
        <footer id="contact" className="bg-slate-50 pt-16">
            <div className="mx-auto max-w-[1280px] px-6">
                <div className="grid gap-10 border-b border-slate-200 pb-12 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
                    <div>
                        <div className="mb-4 flex h-16 w-16 flex-col items-center justify-center gap-[2px] rounded-xl bg-gradient-to-br from-coral to-coral2">
                            <span className="font-display text-[1.4rem] font-extrabold leading-none text-slate-900">CEC</span>
                            <span className="text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-slate-900/75">Kerala</span>
                        </div>
                        <p className="max-w-[280px] text-[0.84rem] leading-[1.75] text-slate-900/50">
                            A premier Government Engineering Institution in Kerala committed to academic excellence, research, and holistic development of future engineers.
                        </p>
                        <div className="mt-5 flex gap-[10px]">
                            <a className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-[0.85rem] text-slate-900/55 transition hover:border-coral hover:bg-coral hover:text-slate-900" href="#" title="Facebook">f</a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-[0.85rem] text-slate-900/55 transition hover:border-coral hover:bg-coral hover:text-slate-900" href="#" title="Twitter">𝕏</a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-[0.85rem] text-slate-900/55 transition hover:border-coral hover:bg-coral hover:text-slate-900" href="#" title="YouTube">▶</a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-[0.85rem] text-slate-900/55 transition hover:border-coral hover:bg-coral hover:text-slate-900" href="#" title="LinkedIn">in</a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-[0.85rem] text-slate-900/55 transition hover:border-coral hover:bg-coral hover:text-slate-900" href="#" title="Instagram">ig</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-4 text-[0.82rem] font-bold uppercase tracking-[0.1em] text-slate-900/90">Contact</h4>
                        <div className="space-y-[10px] text-[0.84rem] text-slate-900/45">
                            <p className="flex items-start gap-[10px]">
                                <span className="shrink-0 text-[0.9rem] text-coral2">📍</span>Chengannur - 689121, Alappuzha District, Kerala, India
                            </p>
                            <p className="flex items-start gap-[10px]">
                                <span className="shrink-0 text-[0.9rem] text-coral2">📞</span><a className="text-slate-900/45" href="tel:04792453327">0479-2453327</a>
                            </p>
                            <p className="flex items-start gap-[10px]">
                                <span className="shrink-0 text-[0.9rem] text-coral2">✉</span><a className="text-slate-900/45" href="mailto:principal@ceconline.edu.in">principal@ceconline.edu.in</a>
                            </p>
                            <p className="flex items-start gap-[10px]">
                                <span className="shrink-0 text-[0.9rem] text-coral2">🌐</span><a className="text-slate-900/45" href="#">ceconline.edu.in</a>
                            </p>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-4 text-[0.82rem] font-bold uppercase tracking-[0.1em] text-slate-900/90">Explore</h4>
                        <ul className="space-y-[9px]">
                            <li><a className="text-[0.84rem] text-slate-900/45 transition hover:text-slate-900" href="#">About CEC</a></li>
                            <li><a className="text-[0.84rem] text-slate-900/45 transition hover:text-slate-900" href="#">Departments</a></li>
                            <li><a className="text-[0.84rem] text-slate-900/45 transition hover:text-slate-900" href="#">Admissions</a></li>
                            <li><a className="text-[0.84rem] text-slate-900/45 transition hover:text-slate-900" href="#">Examination Results</a></li>
                            <li><a className="text-[0.84rem] text-slate-900/45 transition hover:text-slate-900" href="#">Placement Cell</a></li>
                            <li><a className="text-[0.84rem] text-slate-900/45 transition hover:text-slate-900" href="#">Research</a></li>
                            <li><a className="text-[0.84rem] text-slate-900/45 transition hover:text-slate-900" href="#">Alumni Association</a></li>
                            <li><a className="text-[0.84rem] text-slate-900/45 transition hover:text-slate-900" href="#">IQAC</a></li>
                        </ul>
                    </div>
                    <div id="downloads">
                        <h4 className="mb-4 text-[0.82rem] font-bold uppercase tracking-[0.1em] text-slate-900/90">Downloads</h4>
                        <ul className="space-y-[9px]">
                            <li><a className="text-[0.84rem] text-slate-900/45 transition hover:text-slate-900" href="#">📄 Prospectus 2025-26</a></li>
                            <li><a className="text-[0.84rem] text-slate-900/45 transition hover:text-slate-900" href="#">📋 Admission Form</a></li>
                            <li><a className="text-[0.84rem] text-slate-900/45 transition hover:text-slate-900" href="#">🗓 Academic Calendar</a></li>
                            <li><a className="text-[0.84rem] text-slate-900/45 transition hover:text-slate-900" href="#">📅 Exam Time Table</a></li>
                            <li><a className="text-[0.84rem] text-slate-900/45 transition hover:text-slate-900" href="#">📑 NAAC SSR Report</a></li>
                            <li><a className="text-[0.84rem] text-slate-900/45 transition hover:text-slate-900" href="#">📊 Annual Report 2024</a></li>
                            <li><a className="text-[0.84rem] text-slate-900/45 transition hover:text-slate-900" href="#">📃 Fee Notification</a></li>
                            <li><a className="text-[0.84rem] text-slate-900/45 transition hover:text-slate-900" href="#">📜 Scholarship Forms</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 py-[18px] text-[0.78rem] text-slate-900/30">
                    <span>© 2025 College of Engineering Chengannur · Government of Kerala · All Rights Reserved</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
