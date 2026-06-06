import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { client } from '../../lib/sanity';

import bg1 from '../../assets/cec11.jpeg';
import bg2 from '../../assets/cec12.jpg';
import bg3 from '../../assets/cec14.png';
import bg4 from '../../assets/cec15.webp';


const Hero = () => {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch carousel images from Sanity
    useEffect(() => {
        const query = `*[_type == "carouselImage"] | order(order asc){
            title,
            subtitle,
            "src": image.asset->url
        }`;
        client.fetch(query)
            .then(data => {
                if (data && data.length > 0) {
                    setImages(data);
                }
            })
            .catch(err => {
                console.error("Error fetching carousel images from Sanity:", err);
            });
    }, []);

    // Automatic sliding effect (change slide every 5 seconds)
    useEffect(() => {
        if (images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <section id="home" className="relative group w-full overflow-hidden bg-slate-900 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] max-h-[550px]">
            {/* Slider track */}
            <div 
                className="flex h-full w-full transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((imgObj, index) => (
                    <div
                        key={index}
                        className="relative h-full min-w-full bg-cover bg-center flex items-center justify-center text-center"
                        style={{ backgroundImage: `url(${imgObj.src})` }}
                    >
                        {imgObj.title && (
                            <>
                                <div className="absolute inset-0 bg-black/40"></div>
                                <div className="relative z-10 p-4 sm:p-6 md:p-12">
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2 sm:mb-4 drop-shadow-xl tracking-tight">
                                        {imgObj.title}
                                    </h1>
                                    <p className="text-lg sm:text-xl md:text-2xl font-body text-white/90 drop-shadow-md font-light">
                                        {imgObj.subtitle}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Manual Controls (Left & Right Arrows) */}
            <button
                onClick={prevSlide}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/50 hover:text-white hover:scale-110 group-hover:opacity-100 md:left-8 md:p-3 z-10"
            >
                <ChevronLeft size={36} />
            </button>
            <button
                onClick={nextSlide}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/50 hover:text-white hover:scale-110 group-hover:opacity-100 md:right-8 md:p-3 z-10"
            >
                <ChevronRight size={36} />
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-[10px] w-[10px] rounded-full transition-all duration-300 ${
                            currentIndex === index ? 'bg-white scale-125 w-[14px]' : 'bg-white/40 hover:bg-white/80'
                        }`}
                    ></button>
                ))}
            </div>
        </section>
    );
};

export default Hero;

