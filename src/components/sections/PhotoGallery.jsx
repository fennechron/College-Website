import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { client, urlFor } from '../../lib/sanity';

const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        client.fetch(`*[_type == "homePage"][0]{ gallery }`).then(res => {
            if (res?.gallery) setPhotos(res.gallery);
        }).catch(console.error);
    }, []);

    if (!photos || photos.length === 0) return null;

    return (
        <section id="gallery" className="py-12 sm:py-16 bg-background border-t border-primary/5">
            <div className="max-w-[95%] mx-auto px-4 lg:px-6">
                <div className="mb-10 text-center">
                    <h2 className="text-[1.8rem] md:text-[2.25rem] font-display font-bold text-primary mb-4 uppercase tracking-wide">Photo Gallery</h2>
                    <div className="w-16 h-1 bg-accent mx-auto mb-6"></div>
                    <p className="text-base md:text-lg text-secondary/80 max-w-2xl mx-auto">
                        Glimpses of life at College of Engineering Chengannur. Explore our beautiful campus and vibrant student community.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {photos.slice(0, 6).map((photo, idx) => (
                        <div key={idx} className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3] w-full">
                            <img 
                                src={urlFor(photo.image).url()} 
                                alt={photo.altText || "Gallery Image"} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <p className="text-white text-lg font-bold p-6 drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {photo.altText}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="mt-12 text-center">
                    <Link
                        to="/page/photo-gallery"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-display font-black text-sm uppercase tracking-wider rounded-full hover:bg-accent shadow-lg shadow-primary/20 hover:shadow-accent/30 transition-all duration-300 group"
                    >
                        <ImageIcon size={18} />
                        <span>View All Photos</span>
                        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PhotoGallery;
