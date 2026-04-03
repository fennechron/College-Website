import React from 'react';
import logo from '../../assets/cec122.png';

const Footer = () => {
    return (
        <footer id="contact" className="bg-[#0f1522] pt-16 text-slate-300">
            <div className="mx-auto max-w-[1280px] px-6">
                <div className="grid gap-10 border-b border-slate-700/50 pb-12 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
                    <div>
                        <div className="mb-6">
                            <img src={logo} alt="CEC Logo" className="h-24 w-24 object-contain rounded-md bg-white p-1" />
                        </div>
                        <p className="max-w-[280px] text-[0.95rem] leading-[1.75] text-slate-400">
                            A premier Government Engineering Institution in Kerala committed to academic excellence, research, and holistic development of future engineers.
                        </p>
                        <div className="mt-5 flex gap-[10px]">
                            <a className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-[0.95rem] text-slate-400 transition hover:border-coral hover:bg-coral hover:text-white" href="#" title="Facebook">f</a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-[0.95rem] text-slate-400 transition hover:border-coral hover:bg-coral hover:text-white" href="#" title="Twitter">𝕏</a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-[0.95rem] text-slate-400 transition hover:border-coral hover:bg-coral hover:text-white" href="#" title="YouTube">▶</a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-[0.95rem] text-slate-400 transition hover:border-coral hover:bg-coral hover:text-white" href="#" title="LinkedIn">in</a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-[0.95rem] text-slate-400 transition hover:border-coral hover:bg-coral hover:text-white" href="#" title="Instagram">ig</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-4 text-[0.9rem] font-bold uppercase tracking-[0.1em] text-white">Contact</h4>
                        <div className="space-y-[10px] text-[0.95rem] text-slate-400">
                            <p className="flex items-start gap-[10px]">
                                <span className="shrink-0 text-[1.1rem] text-coral2">📍</span>Chengannur - 689121, Alappuzha District, Kerala, India
                            </p>
                            <p className="flex items-start gap-[10px]">
                                <span className="shrink-0 text-[1.1rem] text-coral2">📞</span><a className="text-slate-400 hover:text-white transition" href="tel:04792453327">0479-2453327</a>
                            </p>
                            <p className="flex items-start gap-[10px]">
                                <span className="shrink-0 text-[1.1rem] text-coral2">✉</span><a className="text-slate-400 hover:text-white transition" href="mailto:principal@ceconline.edu.in">principal@ceconline.edu.in</a>
                            </p>
                            <p className="flex items-start gap-[10px]">
                                <span className="shrink-0 text-[1.1rem] text-coral2">🌐</span><a className="text-slate-400 hover:text-white transition" href="#">ceconline.edu.in</a>
                            </p>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-4 text-[0.9rem] font-bold uppercase tracking-[0.1em] text-white">Explore</h4>
                        <ul className="space-y-[9px]">
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="#">About CEC</a></li>
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="#">Departments</a></li>
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="#">Admissions</a></li>
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="#">Examination Results</a></li>
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="#">Placement Cell</a></li>
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="#">Research</a></li>
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="#">Alumni Association</a></li>
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="#">IQAC</a></li>
                        </ul>
                    </div>
                    <div id="downloads">
                        <h4 className="mb-4 text-[0.9rem] font-bold uppercase tracking-[0.1em] text-white">Downloads</h4>
                        <ul className="space-y-[9px]">
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="#">📄 Prospectus 2025-26</a></li>
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="#">📋 Admission Form</a></li>
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="#">🗓 Academic Calendar</a></li>
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="#">📅 Exam Time Table</a></li>
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="#">📑 NAAC SSR Report</a></li>
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="#">📊 Annual Report 2024</a></li>
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="#">📃 Fee Notification</a></li>
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="#">📜 Scholarship Forms</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 py-[18px] text-[0.85rem] text-slate-500">
                    <span>© 2025 College of Engineering Chengannur · Government of Kerala · All Rights Reserved</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
