import React, { useState, useEffect } from 'react';
import bg2 from '../../assets/cec12.jpg';
import bg3 from '../../assets/cec14.png';

const slides = [
    {
        id: 2,
        image: bg2,
        title: "Principal in charge",
        subtitle: "Leading our institution towards a brighter and more innovative future."
    },
    {
        id: 3,
        image: bg3,
        title: "dean",
        subtitle: "Dedicated to fostering academic excellence and student success."
    }
];

const AboutSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatic sliding effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full overflow-hidden bg-coral">
            {/* Slider track */}
            <div 
                className="flex h-[400px] md:h-[500px] lg:h-[600px] w-full transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className="relative h-full min-w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        {/* Dramatic Overlay for premium feel */}
                        <div className="absolute inset-0 bg-coral/50 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-coral2/95 via-coral/60 to-transparent"></div>
                        
                        {/* Text Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12">
                            <div className={`transition-all duration-1000 transform ${currentIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-cream mb-6 drop-shadow-xl tracking-tight">
                                    {slide.title}
                                </h2>
                                <p className="text-lg md:text-2xl font-body text-cream-alt max-w-3xl mx-auto drop-shadow-md font-light leading-relaxed">
                                    {slide.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Indicator Dots */}
            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-4 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-500 ease-in-out ${
                            currentIndex === index ? 'bg-cream w-10 shadow-[0_0_10px_rgba(240,240,219,0.8)]' : 'bg-cream/40 hover:bg-cream/80 w-2.5'
                        }`}
                    ></button>
                ))}
            </div>
            
            {/* Decorative bottom border */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cream-alt via-cream to-cream-alt opacity-30"></div>
        </section>
    );
};

export default AboutSlider;
