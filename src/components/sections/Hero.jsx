import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { client, urlFor } from '../../lib/sanity';
import { useAutoplay } from '../../hooks/useAutoScroll';

const Hero = () => {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch carousel images from Sanity
    useEffect(() => {
        const query = `*[_type == "carouselImage"] | order(order asc){
            title,
            subtitle,
            image
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

    const heroRef = useAutoplay(images.length, () => setCurrentIndex(index => (index + 1) % images.length), 5000);

    const prevSlide = () => {
        if (images.length > 1) setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        if (images.length > 1) setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <section ref={heroRef} id="home" className="relative group w-full overflow-hidden bg-slate-900 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] max-h-[550px]">
            {/* Slider track */}
            <div 
                className="flex h-full w-full transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((imgObj, index) => (
                    <div
                        key={index}
                        className="relative h-full min-w-full flex items-center justify-center text-center"
                    >
                        {imgObj.image && (
                            <img
                                src={urlFor(imgObj.image).width(1920).url()}
                                srcSet={`${urlFor(imgObj.image).width(960).url()} 960w, ${urlFor(imgObj.image).width(1440).url()} 1440w, ${urlFor(imgObj.image).width(1920).url()} 1920w`}
                                sizes="100vw"
                                alt={imgObj.title || 'CEC campus'}
                                loading={index === currentIndex ? 'eager' : 'lazy'}
                                fetchpriority={index === currentIndex ? 'high' : 'low'}
                                decoding="async"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        )}
                        {imgObj.title && (
                            <>
                                <div className="absolute inset-0 bg-black/40"></div>
                                <div className="relative z-10 p-4 sm:p-6 md:p-12 max-w-[90%] sm:max-w-2xl lg:max-w-4xl mx-auto">
                                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2 sm:mb-4 drop-shadow-xl tracking-tight leading-tight">
                                        {imgObj.title}
                                    </h1>
                                    <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-body text-white/90 drop-shadow-md font-light">
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
                disabled={images.length < 2}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/50 hover:text-white hover:scale-110 group-hover:opacity-100 md:left-8 md:p-3 z-10"
            >
                <ChevronLeft size={36} />
            </button>
            <button
                onClick={nextSlide}
                aria-label="Next image"
                disabled={images.length < 2}
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

