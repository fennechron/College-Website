import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../../lib/sanity';
import * as LucideIcons from 'lucide-react';

const Placement = () => {
    const [data, setData] = useState(null);
    const [placements, setPlacements] = useState([]);
    
    // Auto-scroll states
    const recruitersRef = React.useRef(null);
    const galleryRef = React.useRef(null);
    const [isRecruitersHovered, setIsRecruitersHovered] = useState(false);
    const [isGalleryHovered, setIsGalleryHovered] = useState(false);

    useEffect(() => {
        client.fetch(`*[_type == "homePage"][0]{ placementSection }`).then(res => setData(res?.placementSection)).catch(console.error);
        client.fetch(`*[_type == "placement" && defined(groupPhoto)] | order(year desc) { year, groupPhoto }`).then(res => setPlacements(res)).catch(console.error);
    }, []);

    // Recruiters Auto-scroll
    useEffect(() => {
        const container = recruitersRef.current;
        if (!container || !data?.recruiters?.length) return;
        let animationId;
        let scrollPos = container.scrollLeft;

        const scrollStep = () => {
            if (!isRecruitersHovered && container) {
                const singleSetWidth = container.scrollWidth / 4;
                scrollPos += 0.8;
                if (scrollPos >= singleSetWidth) {
                    scrollPos -= singleSetWidth;
                }
                container.scrollLeft = scrollPos;
            } else if (container) {
                scrollPos = container.scrollLeft;
            }
            animationId = requestAnimationFrame(scrollStep);
        };
        animationId = requestAnimationFrame(scrollStep);
        return () => cancelAnimationFrame(animationId);
    }, [isRecruitersHovered, data?.recruiters]);

    // Gallery Auto-scroll
    useEffect(() => {
        const container = galleryRef.current;
        if (!container || !placements.length) return;
        let animationId;
        let scrollPos = container.scrollLeft;

        const scrollStep = () => {
            if (!isGalleryHovered && container) {
                const singleSetWidth = container.scrollWidth / 4;
                scrollPos += 0.8;
                if (scrollPos >= singleSetWidth) {
                    scrollPos -= singleSetWidth;
                }
                container.scrollLeft = scrollPos;
            } else if (container) {
                scrollPos = container.scrollLeft;
            }
            animationId = requestAnimationFrame(scrollStep);
        };
        animationId = requestAnimationFrame(scrollStep);
        return () => cancelAnimationFrame(animationId);
    }, [isGalleryHovered, placements]);

    if (!data) return null;

    const { recruiters = [], stats = [] } = data;
    const repeatedRecruiters = [...recruiters, ...recruiters, ...recruiters, ...recruiters];
    const repeatedPlacements = [...placements, ...placements, ...placements, ...placements];

    return (
        <section id="placement" className="py-20 bg-background">
            <div className="max-w-[95%] mx-auto px-4 lg:px-6">
                <div className="mb-14 text-center">
                    <h2 className="text-[1.8rem] md:text-[2.5rem] font-display font-black text-primary mb-4 uppercase tracking-tighter">
                        Training & Placement <span className="text-accent block sm:inline">Cell</span>
                    </h2>
                    <div className="w-32 h-1.5 bg-accent mx-auto rounded-full"></div>
                </div>

                <div className="bg-white border text-secondary border-primary/20 rounded-[1.5rem] md:rounded-[2.5rem] p-4 sm:p-8 md:p-16 relative overflow-hidden shadow-[0_10px_50px_rgba(12,43,78,0.12)]">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full animate-pulse-dot"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-full"></div>

                    <h3 className="text-xl md:text-2xl font-display font-bold text-primary text-center mb-6 md:mb-12 uppercase tracking-[0.2em] relative">
                        Our Recruiters
                    </h3>

                    <style>
                        {`
                    :root {
                        --recruiter-width: 190px;
                        --recruiter-gap: 16px;
                    }
                    @media (min-width: 640px) {
                        :root {
                            --recruiter-width: 256px;
                            --recruiter-gap: 64px;
                        }
                    }
                    `}
                    </style>

                    <div className="relative py-6 md:py-12 mask-gradient">
                        <div 
                            ref={recruitersRef}
                            className="flex overflow-x-auto no-scrollbar items-center" 
                            style={{ gap: 'var(--recruiter-gap)' }}
                            onMouseEnter={() => setIsRecruitersHovered(true)}
                            onMouseLeave={() => setIsRecruitersHovered(false)}
                            onTouchStart={() => setIsRecruitersHovered(true)}
                            onTouchEnd={() => setIsRecruitersHovered(false)}
                        >
                            {recruiters.length > 0 && repeatedRecruiters.map((rec, idx) => (
                                <div key={idx} className="group bg-slate-50 flex items-center justify-center rounded-2xl md:rounded-3xl border-2 border-transparent hover:border-accent hover:bg-white hover:shadow-2xl transition-all duration-500 px-4 md:px-10 shrink-0" style={{ width: 'var(--recruiter-width)', height: 'calc(var(--recruiter-width) / 2)' }}>
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
                                        <span className="font-bold text-primary text-xs md:text-base tracking-widest uppercase">{rec.name}</span>
                                        <div className="w-8 h-1 bg-accent mt-2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-13 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-center bg-primary rounded-2xl sm:rounded-3xl p-4 sm:p-10 backdrop-blur-sm border border-accent/20">
                        {stats.map((stat, idx) => {
                            const IconComponent = LucideIcons[stat.icon] || LucideIcons.HelpCircle;
                            return (
                                <div key={idx} className="group flex flex-col items-center">
                                    <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/40 transition-colors duration-300">
                                        <IconComponent className="text-accent" size={20} />
                                    </div>
                                    <div className="text-[1rem] md:text-[1.5rem] font-display font-black text-white mb-1 transition-transform group-hover:scale-110 duration-300">{stat.value}</div>
                                    <div className="text-[0.6rem] md:text-[0.85rem] font-bold text-teal-light uppercase tracking-[0.15em]">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Placement Gallery Section */}
                    {placements.length > 0 && (
                        <div className="mt-5 pt-10 border-t border-primary/10">
                            <h3 className="text-xl md:text-2xl font-display font-bold text-primary text-center mb-12 uppercase tracking-[0.2em] relative">
                                Placed Students Gallery
                            </h3>

                            <style>
                                {`
                            :root {
                                --gallery-width: 400px;
                                --gallery-gap: 16px;
                            }
                            @media (min-width: 640px) {
                                :root {
                                    --gallery-width: 800px;
                                    --gallery-gap: 32px;
                                }
                            }
                            .gallery-mask {
                                mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
                                -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
                            }
                            @media (min-width: 640px) {
                                .gallery-mask {
                                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                                }
                            }
                            `}
                            </style>

                            <div className="relative py-4 gallery-mask">
                                <div 
                                    ref={galleryRef}
                                    className="flex overflow-x-auto no-scrollbar items-center" 
                                    style={{ gap: 'var(--gallery-gap)' }}
                                    onMouseEnter={() => setIsGalleryHovered(true)}
                                    onMouseLeave={() => setIsGalleryHovered(false)}
                                    onTouchStart={() => setIsGalleryHovered(true)}
                                    onTouchEnd={() => setIsGalleryHovered(false)}
                                >
                                    {repeatedPlacements.map((placement, idx) => (
                                        <div key={idx} className="group relative aspect-[16/10] bg-slate-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex-shrink-0" style={{ width: 'var(--gallery-width)' }}>
                                            <img
                                                src={urlFor(placement.groupPhoto).width(1200).url()}
                                                alt={`Placed Students ${placement.year}`}
                                                className="w-full h-full object-contain bg-white transform group-hover:scale-[1.03] transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                                                <h4 className="text-white text-lg md:text-2xl font-display font-black tracking-wider uppercase transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                    Year of {placement.year}
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
