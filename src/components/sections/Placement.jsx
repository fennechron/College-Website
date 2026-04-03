import React from 'react';

// Local Logos
import tcsLogo from '../../assets/recruiters/tcs.png';
import infosysLogo from '../../assets/recruiters/infosys.png';
import wiproLogo from '../../assets/recruiters/wipro.png';
import cognizantLogo from '../../assets/recruiters/cognizant.png';
import accentureLogo from '../../assets/recruiters/accenture.png';
import ibmLogo from '../../assets/recruiters/ibm.png';
import ltLogo from '../../assets/recruiters/lt.png';
import oracleLogo from '../../assets/recruiters/oracle.png';
import { Briefcase, Building2, TrendingUp, Award } from 'lucide-react';

const recruiters = [
    { name: "TCS", logo: tcsLogo },
    { name: "Infosys", logo: infosysLogo },
    { name: "Wipro", logo: wiproLogo },
    { name: "Cognizant", logo: cognizantLogo },
    { name: "Accenture", logo: accentureLogo },
    { name: "IBM", logo: ibmLogo },
    { name: "L&T", logo: ltLogo },
    { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
    { name: "Oracle", logo: oracleLogo },
    { name: "Cisco", logo: "https://logo.clearbit.com/cisco.com" }
];

const Placement = () => {
    return (
        <section id="placement" className="py-20 bg-background">
            <div className="max-w-[95%] mx-auto px-4 lg:px-6">
                <div className="mb-14 text-center">
                    <h2 className="text-[2.5rem] font-display font-black text-primary mb-4 uppercase tracking-tighter">
                        Training & Placement <span className="text-accent block sm:inline">Portal</span>
                    </h2>
                    <div className="w-32 h-1.5 bg-accent mx-auto rounded-full"></div>
                </div>

                <div className="bg-white border text-secondary border-primary/20 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-[0_10px_50px_rgba(12,43,78,0.12)]">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full animate-pulse-dot"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-full"></div>

                    <h3 className="text-2xl font-display font-bold text-primary text-center mb-12 uppercase tracking-[0.2em] relative">
                        Strategic Recruitment Partners
                    </h3>
                    
                    <style>
                    {`
                    @keyframes slide {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-320px * 10)); }
                    }
                    .recruiters-track {
                        animation: slide 50s linear infinite;
                    }
                    .recruiters-track:hover {
                        animation-play-state: paused;
                    }
                    `}
                    </style>
                    
                    <div className="flex overflow-hidden relative py-12 mask-gradient">
                        <div className="flex gap-16 recruiters-track items-center min-w-max">
                            {[...recruiters, ...recruiters].map((rec, idx) => (
                                <div key={idx} className="group w-64 h-32 bg-slate-50 flex items-center justify-center rounded-3xl border-2 border-transparent hover:border-accent hover:bg-white hover:shadow-2xl transition-all duration-500 px-10">
                                    <img 
                                        src={rec.logo} 
                                        alt={rec.name} 
                                        className="max-w-full max-h-[85%] object-contain grayscale-[0.2] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="hidden flex-col items-center justify-center text-center">
                                        <span className="font-bold text-primary text-base tracking-widest uppercase">{rec.name}</span>
                                        <div className="w-8 h-1 bg-accent mt-2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-primary rounded-3xl p-10 backdrop-blur-sm border border-accent/20">
                        <div className="group flex flex-col items-center">
                            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/40 transition-colors duration-300">
                                <Briefcase className="text-accent" size={24} />
                            </div>
                            <div className="text-[2.5rem] font-display font-black text-white mb-1 transition-transform group-hover:scale-110 duration-300">450+</div>
                            <div className="text-[0.85rem] font-bold text-teal-light uppercase tracking-[0.15em]">Placement Offers</div>
                        </div>
                        <div className="group flex flex-col items-center">
                            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/40 transition-colors duration-300">
                                <Building2 className="text-accent" size={24} />
                            </div>
                            <div className="text-[2.5rem] font-display font-black text-white mb-1 transition-transform group-hover:scale-110 duration-300">60+</div>
                            <div className="text-[0.85rem] font-bold text-teal-light uppercase tracking-[0.15em]">Visiting Companies</div>
                        </div>
                        <div className="group flex flex-col items-center">
                            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/40 transition-colors duration-300">
                                <TrendingUp className="text-accent" size={24} />
                            </div>
                            <div className="text-[2.5rem] font-display font-black text-white mb-1 transition-transform group-hover:scale-110 duration-300">14 LPA</div>
                            <div className="text-[0.85rem] font-bold text-teal-light uppercase tracking-[0.15em]">Highest CTC</div>
                        </div>
                        <div className="group flex flex-col items-center">
                            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/40 transition-colors duration-300">
                                <Award className="text-accent" size={24} />
                            </div>
                            <div className="text-[2.5rem] font-display font-black text-white mb-1 transition-transform group-hover:scale-110 duration-300">90%</div>
                            <div className="text-[0.85rem] font-bold text-teal-light uppercase tracking-[0.15em]">Success Ratio</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Placement;
