import { Link } from 'react-router-dom';
import logo from '../../assets/cec122.png';
import { Linkedin, Instagram, Facebook, Twitter, Youtube, ArrowUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
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
                            <a className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 transition hover:bg-blue-600 hover:text-white hover:border-blue-600" href="https://www.facebook.com/cecchengannur/" target="_blank" rel="noopener noreferrer" title="Facebook">
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
                            <li><Link className="text-[0.95rem] text-slate-400 transition hover:text-white" to="/page/about">About CEC</Link></li>
                            <li><Link className="text-[0.95rem] text-slate-400 transition hover:text-white" to="/page/departments">Departments</Link></li>
                            <li><Link className="text-[0.95rem] text-slate-400 transition hover:text-white" to="/page/admission-2026">Admissions</Link></li>
                            <li><a className="text-[0.95rem] text-slate-400 transition hover:text-white" href="https://ktu.edu.in/eu/res/examResults.htm" target="_blank" rel="noopener noreferrer">Examination Results</a></li>
                            <li><Link className="text-[0.95rem] text-slate-400 transition hover:text-white" to="/page/placement">Placement Cell</Link></li>
                            <li><Link className="text-[0.95rem] text-slate-400 transition hover:text-white" to="/page/research">Research</Link></li>
                            <li><Link className="text-[0.95rem] text-slate-400 transition hover:text-white" to="/page/alumni">Alumni Association</Link></li>
                            <li><Link className="text-[0.95rem] text-slate-400 transition hover:text-white" to="/page/iqac">IQAC</Link></li>
                        </ul>
                    </div>
                    <div id="useful-links">
                        <h4 className="mb-4 text-[0.9rem] font-bold uppercase tracking-[0.1em] text-white">Useful Links</h4>
                        <ul className="space-y-[9px]">
                            <li><Link className="text-[0.95rem] text-slate-400 transition hover:text-white" to="/page/principal">Principal's Desk</Link></li>
                            <li><Link className="text-[0.95rem] text-slate-400 transition hover:text-white" to="/page/board-of-governors">Board of Governors</Link></li>
                            <li><Link className="text-[0.95rem] text-slate-400 transition hover:text-white" to="/page/administrative-staff">Administrative Staff</Link></li>
                            <li><Link className="text-[0.95rem] text-slate-400 transition hover:text-white" to="/page/library-staff">Library Staff</Link></li>
                            <li><Link className="text-[0.95rem] text-slate-400 transition hover:text-white" to="/page/campus-life">Campus Life</Link></li>
                            <li><Link className="text-[0.95rem] text-slate-400 transition hover:text-white" to="/page/downloads">Downloads & Forms</Link></li>
                            <li><Link className="text-[0.95rem] text-slate-400 transition hover:text-white" to="/page/contact">Contact Us</Link></li>
                            <li><Link className="text-[0.95rem] text-slate-400 transition hover:text-white" to="/page/teachers">Faculty Directory</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-6 py-[18px] text-[0.95rem] text-slate-500">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
                        <span>© 2025 College of Engineering Chengannur · Government of Kerala</span>
                        <span className="hidden sm:inline text-slate-700">|</span>
                        <span className="flex items-center gap-1.5">Developed by <a href="https://fennechron.com" target="_blank" rel="noopener noreferrer" className="text-accent font-black tracking-wider hover:text-white transition">Fennechron Labs</a></span>
                    </div>
                    
                    <button 
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-accent rounded-full border border-white/10 hover:border-accent text-slate-400 hover:text-white transition-all duration-300"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest">Back to Top</span>
                        <div className="p-1 bg-white/10 rounded-full group-hover:-translate-y-1 transition-transform duration-300">
                            <ArrowUp size={14} />
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
