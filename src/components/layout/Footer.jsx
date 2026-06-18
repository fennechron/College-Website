import logo from '../../assets/cec122.png';
import { Linkedin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

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
                        <div className="mt-5 flex gap-4">
                            <a className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 transition hover:bg-accent hover:text-white hover:border-accent" href="https://www.linkedin.com/school/college-of-engineering-chengannur/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                                <Linkedin size={18} />
                            </a>
                            <a className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 transition hover:bg-pink-600 hover:text-white hover:border-pink-600" href="https://www.instagram.com/cec_chengannur/" target="_blank" rel="noopener noreferrer" title="Instagram">
                                <Instagram size={18} />
                            </a>
                            <a className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 transition hover:bg-blue-600 hover:text-white hover:border-blue-600" href="#" title="Facebook">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-4 text-[0.9rem] font-bold uppercase tracking-[0.1em] text-white">Contact</h4>
                        <div className="space-y-[10px] text-[0.95rem] text-slate-400">
                            <p className="flex items-start gap-[10px]">
                                <span className="shrink-0 text-[1.1rem] text-coral2">📍</span>Chengannur - 689121, Alappuzha District, Kerala, India
                            </p>
                            <p className="flex items-start gap-[10px]">
                                <span className="shrink-0 text-[1.1rem] text-accent">📞</span><a className="text-slate-400 hover:text-white transition" href="tel:+914792454125">+91-479-2454125</a>
                            </p>
                            <p className="flex items-start gap-[10px]">
                                <span className="shrink-0 text-[1.1rem] text-accent">✉</span><a className="text-slate-400 hover:text-white transition" href="mailto:principal@ceconline.edu">principal@ceconline.edu</a>
                            </p>
                            <p className="flex items-start gap-[10px]">
                                <span className="shrink-0 text-[1.1rem] text-accent">🌐</span><a className="text-slate-400 hover:text-white transition" href="https://ceconline.edu">ceconline.edu</a>
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
                <div className="flex flex-wrap items-center justify-between gap-2 py-[18px] text-[0.95rem] text-slate-500">
                    <span>© 2025 College of Engineering Chengannur · Government of Kerala · All Rights Reserved</span>
                    <span className="flex items-center gap-1.5">Developed by <a href="https://fennechron.com" target="_blank" rel="noopener noreferrer" className="text-accent font-black text-xl tracking-wider hover:text-white transition">Fennechron Labs</a></span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
