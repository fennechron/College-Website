import React, { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { pageContent } from '../data/pageContent';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ContentPage = () => {
    const { slug } = useParams();
    const { pathname } = useLocation();
    const content = pageContent[slug];

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (!content) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background p-8">
                <div className="text-primary font-display font-black text-[5rem] animate-bounce">404</div>
                <h2 className="text-2xl font-bold text-secondary mb-6 text-center tracking-wide">Information Not Found</h2>
                <p className="text-lg text-slate-600 mb-8 max-w-md text-center">
                    The page you are looking for doesn't exist or is still under development.
                </p>
                <Link to="/" className="flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-bold hover:bg-secondary transition-all shadow-lg hover:shadow-xl">
                    <ArrowLeft size={18} /> BACK TO HOME
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Premium Hero Header */}
            <div className="bg-primary text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                
                <div className="relative z-10 max-w-[90%] lg:max-w-[1280px] mx-auto px-4 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-4"
                    >
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-[0.8rem] font-bold tracking-widest text-white/60 mb-2 uppercase">
                            <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1.5 whitespace-nowrap">
                                <Home size={14} /> HOME
                            </Link>
                            <ChevronRight size={12} />
                            <span className="text-white/40 whitespace-nowrap">{content.category}</span>
                            <ChevronRight size={12} />
                            <span className="text-accent underline decoration-2 underline-offset-4 whitespace-nowrap">{content.title}</span>
                        </div>
                        
                        <h1 className="text-[2.5rem] sm:text-[3.5rem] font-display font-black leading-tight tracking-tighter uppercase max-w-4xl">
                            {content.title}
                        </h1>
                        <div className="w-24 h-2 bg-accent rounded-full mt-2"></div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-grow py-16">
                <div className="max-w-[90%] lg:max-w-[1280px] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Main Content Area */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-8 bg-white p-8 md:p-14 rounded-[2.5rem] shadow-[0_10px_50px_rgba(12,43,78,0.06)] border border-primary/5"
                    >
                        <div className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-secondary/80 prose-p:leading-relaxed prose-li:text-secondary/80">
                            <h2 className="text-3xl font-bold text-primary mb-8 flex items-center gap-4">
                                Section Overview
                                <div className="flex-1 h-px bg-primary/10"></div>
                            </h2>
                            <p className="text-[1.15rem] leading-[1.8] mb-10 whitespace-pre-line drop-shadow-sm font-medium">
                                {content.content}
                            </p>
                            
                            <h3 className="text-2xl font-bold text-primary mb-6">Key Details & Context</h3>
                            <p className="text-[1.15rem] mb-10">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            </p>

                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                <div className="bg-background/50 p-6 rounded-2xl border-l-4 border-accent">
                                    <h4 className="font-bold text-lg text-primary mb-2 uppercase tracking-wide">Vision 2026</h4>
                                    <p className="text-sm">Excellence in research and infrastructure to support future student innovation hub in Kerala's technological ecosystem.</p>
                                </div>
                                <div className="bg-background/50 p-6 rounded-2xl border-l-4 border-secondary">
                                    <h4 className="font-bold text-lg text-primary mb-2 uppercase tracking-wide">Core Objective</h4>
                                    <p className="text-sm">Focusing on skill development and industry connections through the prestigious IHRD educational framework.</p>
                                </div>
                            </div>

                            <p className="text-[1.1rem]">
                                For more information or specific inquiries regarding {content.title}, please reach out to the institutional desk during office hours or visit our contact page for dedicated department extensions.
                            </p>
                        </div>
                    </motion.div>

                    {/* Quick Sidebar */}
                    <div className="lg:col-span-4 space-y-10">
                        {/* Notice Card */}
                        <div className="bg-primary p-8 rounded-[2rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
                           <h3 className="text-xl font-black mb-6 uppercase tracking-widest flex items-center gap-2">
                               Helpdesk
                           </h3>
                           <p className="text-sm text-white/70 mb-8 leading-relaxed font-bold">
                               Need more clarification on institutional policies or specific details regarding {content.title}?
                           </p>
                           <Link to="/contact" className="block w-full bg-accent py-4 rounded-xl text-center font-black hover:bg-white hover:text-primary transition-all duration-300 tracking-wider">
                                CONTACT US
                           </Link>
                        </div>

                        {/* Recent Items / Sidebar Menu */}
                        <div className="bg-white p-8 rounded-[2rem] border border-primary/5 shadow-lg">
                           <h3 className="text-lg font-black text-primary mb-6 uppercase tracking-widest border-b border-primary/5 pb-4">
                               Related Info
                           </h3>
                           <ul className="space-y-4">
                               {['Academic Calendar', 'Mandatory Disclosures', 'Anti-Ragging Committee'].map((link, i) => (
                                   <li key={i}>
                                       <a href="#" className="flex items-center justify-between group py-2">
                                           <span className="text-[0.95rem] font-bold text-secondary/60 group-hover:text-accent transition-colors">{link}</span>
                                           <ChevronRight size={16} className="text-primary/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                       </a>
                                   </li>
                               ))}
                           </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContentPage;
