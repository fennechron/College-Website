import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../../lib/sanity';
import * as LucideIcons from 'lucide-react';

const Placement = () => {
    const [data, setData] = useState(null);
    const [placements, setPlacements] = useState([]);

    useEffect(() => {
        client.fetch(`*[_type == "homePage"][0]{ placementSection }`).then(res => setData(res?.placementSection)).catch(console.error);
        client.fetch(`*[_type == "placement" && defined(groupPhoto)] | order(year desc) { year, groupPhoto }`).then(res => setPlacements(res)).catch(console.error);
    }, []);

    if (!data) return null;

    const { recruiters = [], stats = [] } = data;

    return (
        <section id="placement" className="py-20 bg-background">
            <div className="max-w-[95%] mx-auto px-4 lg:px-6">
                <div className="mb-14 text-center">
                    <h2 className="text-[1.8rem] md:text-[2.5rem] font-display font-black text-primary mb-4 uppercase tracking-tighter">
                        Training & Placement <span className="text-accent block sm:inline">Cell</span>
                    </h2>
                    <div className="w-32 h-1.5 bg-accent mx-auto rounded-full"></div>
                </div>

                <div className="bg-white border text-secondary border-primary/20 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-[0_10px_50px_rgba(12,43,78,0.12)]">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full animate-pulse-dot"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-full"></div>

                    <h3 className="text-2xl font-display font-bold text-primary text-center mb-12 uppercase tracking-[0.2em] relative">
                        Our Recruiters
                    </h3>
                    
                    <style>
                    {`
                    @keyframes slide {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-320px * ${recruiters.length})); }
                    }
                    .recruiters-track {
                        animation: slide ${recruiters.length * 5}s linear infinite;
                    }
                    .recruiters-track:hover {
                        animation-play-state: paused;
                    }
                    `}
                    </style>
                    
                    <div className="flex overflow-hidden relative py-12 mask-gradient">
                        <div className="flex gap-16 recruiters-track items-center min-w-max">
                            {recruiters.length > 0 && [...recruiters, ...recruiters].map((rec, idx) => (
                                <div key={idx} className="group w-64 h-32 bg-slate-50 flex items-center justify-center rounded-3xl border-2 border-transparent hover:border-accent hover:bg-white hover:shadow-2xl transition-all duration-500 px-10">
                                    <img 
                                        src={urlFor(rec.logo).url()} 
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
                    
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-primary rounded-3xl p-6 md:p-10 backdrop-blur-sm border border-accent/20">
                        {stats.map((stat, idx) => {
                            const IconComponent = LucideIcons[stat.icon] || LucideIcons.HelpCircle;
                            return (
                                <div key={idx} className="group flex flex-col items-center">
                                    <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/40 transition-colors duration-300">
                                        <IconComponent className="text-accent" size={24} />
                                    </div>
                                    <div className="text-[2rem] md:text-[2.5rem] font-display font-black text-white mb-1 transition-transform group-hover:scale-110 duration-300">{stat.value}</div>
                                    <div className="text-[0.85rem] font-bold text-teal-light uppercase tracking-[0.15em]">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Placement Gallery Section */}
                    {placements.length > 0 && (
                        <div className="mt-20 pt-10 border-t border-primary/10">
                            <h3 className="text-2xl font-display font-bold text-primary text-center mb-12 uppercase tracking-[0.2em] relative">
                                Placed Students Gallery
                            </h3>
                            
                            <style>
                            {`
                            @keyframes slideGallery {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(calc(-482px * ${placements.length})); }
                            }
                            .gallery-track {
                                animation: slideGallery ${placements.length * 8}s linear infinite;
                            }
                            .gallery-track:hover {
                                animation-play-state: paused;
                            }
                            `}
                            </style>
                            
                            <div className="flex overflow-hidden relative py-4 mask-gradient">
                                <div className="flex gap-8 gallery-track items-center min-w-max">
                                    {[...placements, ...placements].map((placement, idx) => (
                                        <div key={idx} className="group relative w-[450px] aspect-video bg-slate-100 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex-shrink-0">
                                            <img 
                                                src={urlFor(placement.groupPhoto).width(800).url()} 
                                                alt={`Placed Students ${placement.year}`} 
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <h4 className="text-white text-2xl font-display font-black tracking-wider uppercase transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                    Class of {placement.year}
                                                </h4>
                                                <div className="w-12 h-1 bg-accent mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Placement;
