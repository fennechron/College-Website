import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../../lib/sanity';

const Achievements = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        client.fetch(`*[_type == "homePage"][0]{ achievements }`).then(res => {
            if (res?.achievements) setSlides(res.achievements);
        }).catch(console.error);
    }, []);

    // Automatic sliding effect
    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides.length]);

    if (!slides || slides.length === 0) return null;

    return (
        <section id="achievements" className="py-10 bg-transparent border-t border-primary/10">
            <div className="max-w-[95%] mx-auto px-4 lg:px-6">
                <div className="mb-10 text-center">
                    <h2 className="text-[1.8rem] md:text-[2.25rem] font-display font-bold text-primary mb-4 uppercase tracking-wide">Our Achievements</h2>
                    <div className="w-16 h-1 bg-accent mx-auto"></div>
                </div>

                <div className="relative w-full overflow-hidden rounded-xl shadow-lg border border-primary/20 bg-primary">
                    {/* Slider track */}
                    <div 
                        className="flex h-[350px] sm:h-[450px] md:h-[650px] w-full transition-transform duration-1000 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className="relative h-full min-w-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${urlFor(slide.image).url()})` }}
                            >
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-800/50 to-transparent"></div>
                                
                                {/* Text Content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-4 sm:p-12 mb-6 sm:mb-10">
                                    <div className={`transition-all duration-1000 transform ${currentIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} max-w-[90%] sm:max-w-4xl`}>
                                        <h3 className="text-xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-2 sm:mb-6 drop-shadow-md">
                                            {slide.title}
                                        </h3>
                                        <p className="text-xs sm:text-lg md:text-2xl text-slate-200 mx-auto drop-shadow-sm leading-relaxed">
                                            {slide.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Indicator Dots */}
                    {slides.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 z-10">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                    className={`transition-all duration-500 ease-in-out rounded-full ${
                                        currentIndex === index ? 'bg-accent w-8 h-2.5 shadow-[0_0_8px_rgba(29,84,108,0.8)]' : 'bg-white/60 hover:bg-white w-2.5 h-2.5'
                                    }`}
                                ></button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
