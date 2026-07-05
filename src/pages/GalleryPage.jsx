import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronRight, Image as ImageIcon, X, ChevronLeft, ChevronRight as ChevronRightIcon, Maximize2, Sparkles, Filter } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';

// Curated fallback gallery items in case Sanity CMS data is sparse
const fallbackGallery = [
    {
        title: "CEC Main Academic Block",
        category: "Campus & Infrastructure",
        url: "/images/cec_building.jpg",
        altText: "College of Engineering Chengannur Main Building"
    },
    {
        title: "Annual Tech Fest - SUMMIT",
        category: "Events & Fest",
        url: "/images/event_summit.jpg",
        altText: "Students participating in annual technical festival"
    },
    {
        title: "Advanced FAB Lab & Robotics",
        category: "Facilities",
        url: "/images/fablab.jpg",
        altText: "State of the art Fab Lab facility"
    },
    {
        title: "Central Library & Digital Resource Center",
        category: "Facilities",
        url: "/images/library.jpg",
        altText: "Quiet study zone in central library"
    },
    {
        title: "APJ Abdul Kalam Technological University Events",
        category: "Events & Fest",
        url: "/images/apjaktu_logo.png",
        altText: "KTU University Academic Meet"
    },
    {
        title: "Campus Greenery & Quadrangle",
        category: "Student Life",
        url: "/images/campus_life.jpg",
        altText: "Lush green courtyard at CEC"
    }
];

const GalleryPage = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activePhotoIndex, setActivePhotoIndex] = useState(null);

    useEffect(() => {
        // Scroll to top on page load
        window.scrollTo(0, 0);

        // Fetch photos from Sanity (homePage, campusLife, organization, pageContent)
        client.fetch(`{
            "homeGallery": *[_type == "homePage"][0].gallery,
            "campusLife": *[_type == "campusLife"]{ title, category, gallery },
            "organizations": *[_type == "organization"]{ name, gallery },
            "pageContent": *[_type == "pageContent" && defined(gallery)]{ title, gallery }
        }`)
        .then(data => {
            let aggregated = [];

            // 1. Process Home Page Gallery
            if (data.homeGallery && Array.isArray(data.homeGallery)) {
                data.homeGallery.forEach(item => {
                    if (item?.image) {
                        aggregated.push({
                            title: item.altText || "CEC Campus Moment",
                            category: item.category || "Campus & Infrastructure",
                            url: urlFor(item.image).url(),
                            altText: item.altText || "Gallery Image"
                        });
                    }
                });
            }

            // 2. Process Campus Life Gallery
            if (data.campusLife && Array.isArray(data.campusLife)) {
                data.campusLife.forEach(event => {
                    if (event.gallery && Array.isArray(event.gallery)) {
                        event.gallery.forEach((img, i) => {
                            aggregated.push({
                                title: `${event.title || 'Campus Event'} (${i + 1})`,
                                category: "Events & Fest",
                                url: typeof img === 'string' ? img : (img.asset ? urlFor(img).url() : null),
                                altText: event.title
                            });
                        });
                    }
                });
            }

            // 3. Process Organization Gallery
            if (data.organizations && Array.isArray(data.organizations)) {
                data.organizations.forEach(org => {
                    if (org.gallery && Array.isArray(org.gallery)) {
                        org.gallery.forEach((img, i) => {
                            aggregated.push({
                                title: `${org.name || 'Organization'} Highlight ${i + 1}`,
                                category: "Student Life",
                                url: typeof img === 'string' ? img : (img.asset ? urlFor(img).url() : null),
                                altText: org.name
                            });
                        });
                    }
                });
            }

            // Filter out items without valid URL
            aggregated = aggregated.filter(p => p.url);

            // If empty or minimal, merge with curated fallback gallery items
            if (aggregated.length < 4) {
                const combined = [...aggregated];
                fallbackGallery.forEach(fallback => {
                    if (!combined.some(p => p.url === fallback.url)) {
                        combined.push(fallback);
                    }
                });
                setPhotos(combined);
            } else {
                setPhotos(aggregated);
            }
            setLoading(false);
        })
        .catch(err => {
            console.error("Failed to fetch gallery photos:", err);
            setPhotos(fallbackGallery);
            setLoading(false);
        });
    }, []);

    const [visibleCount, setVisibleCount] = useState(20);

    // Reset visible count when category changes
    useEffect(() => {
        setVisibleCount(20);
    }, [selectedCategory]);

    // Extract unique categories
    const categories = ['All', ...Array.from(new Set(photos.map(p => p.category || 'General')))];

    // Filter photos based on tab selection
    const filteredPhotos = selectedCategory === 'All'
        ? photos
        : photos.filter(p => (p.category || 'General') === selectedCategory);

    const displayedPhotos = filteredPhotos.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 20);
    };

    // Lightbox handlers
    const openLightbox = (index) => setActivePhotoIndex(index);
    const closeLightbox = () => setActivePhotoIndex(null);

    const prevPhoto = (e) => {
        e?.stopPropagation();
        if (activePhotoIndex !== null) {
            setActivePhotoIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1));
        }
    };

    const nextPhoto = (e) => {
        e?.stopPropagation();
        if (activePhotoIndex !== null) {
            setActivePhotoIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1));
        }
    };

    // Keyboard controls for Lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (activePhotoIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevPhoto();
            if (e.key === 'ArrowRight') nextPhoto();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activePhotoIndex, filteredPhotos]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* ─── Hero Header ─── */}
            <div className="bg-primary text-white py-16 sm:py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                
                <div className="relative z-10 max-w-[90%] lg:max-w-[1280px] mx-auto px-4 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-4 text-left"
                    >
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/60 mb-2">
                            <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1.5">
                                <Home size={14} /> HOME
                            </Link>
                            <ChevronRight size={12} />
                            <span className="text-white/40">FACILITIES</span>
                            <ChevronRight size={12} />
                            <span className="text-accent underline underline-offset-4 font-black">PHOTO GALLERY</span>
                        </div>
                        
                        <h1 className="text-3xl sm:text-5xl font-display font-black leading-tight tracking-tighter max-w-4xl uppercase">
                            Campus Photo Gallery
                        </h1>
                        <p className="text-white/80 max-w-2xl text-sm sm:text-base font-medium">
                            Explore visual memories of student achievements, campus infrastructure, cultural festivals, and everyday life at College of Engineering Chengannur.
                        </p>
                        <div className="w-20 sm:w-24 h-1.5 sm:h-2 bg-accent rounded-full mt-2"></div>
                    </motion.div>
                </div>
            </div>

            {/* ─── Main Content & Filter Tabs ─── */}
            <div className="flex-grow py-10 sm:py-16">
                <div className="max-w-[95%] lg:max-w-[1280px] mx-auto px-4 lg:px-8">
                    
                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 custom-scrollbar">
                        <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-wider mr-2 shrink-0">
                            <Filter size={16} className="text-accent" /> Filter:
                        </div>
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                                    selectedCategory === cat
                                        ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-accent hover:text-primary'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                <div key={n} className="bg-slate-200 rounded-2xl aspect-[4/3] w-full"></div>
                            ))}
                        </div>
                    ) : filteredPhotos.length === 0 ? (
                        <div className="bg-white p-12 rounded-3xl text-center border border-slate-100 shadow-sm space-y-4">
                            <ImageIcon size={48} className="mx-auto text-slate-300" />
                            <h3 className="text-xl font-bold text-primary">No photos in this category</h3>
                            <p className="text-slate-500 text-sm">Try selecting another category above to view more images.</p>
                        </div>
                    ) : (
                        <>
                            {/* Image Grid */}
                            <motion.div 
                                layout
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                            >
                                <AnimatePresence>
                                    {displayedPhotos.map((photo, idx) => (
                                        <motion.div
                                            key={photo.url + idx}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            onClick={() => openLightbox(idx)}
                                            className="group relative overflow-hidden rounded-2xl bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-500 aspect-[4/3] cursor-pointer border border-slate-200/50"
                                        >
                                            <img 
                                                src={photo.url} 
                                                alt={photo.altText || photo.title || "Gallery photo"} 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100" 
                                                loading="lazy"
                                            />
                                            
                                            {/* Gradient overlay & caption on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                                                 
                                                <h3 className="text-white font-bold text-base sm:text-lg leading-snug drop-shadow-md flex items-center justify-between">
                                                    <span>{photo.title}</span>
                                                    <Maximize2 size={18} className="text-accent shrink-0 ml-2" />
                                                </h3>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>

                            {/* Load More Button & Stats */}
                            <div className="mt-12 flex flex-col items-center gap-4">
                                <p className="text-xs sm:text-sm font-bold text-slate-500 tracking-wider uppercase">
                                    Showing <span className="text-primary font-black">{displayedPhotos.length}</span> of <span className="text-primary font-black">{filteredPhotos.length}</span> photos
                                </p>
                                {visibleCount < filteredPhotos.length && (
                                    <button
                                        onClick={handleLoadMore}
                                        className="inline-flex items-center gap-3 px-8 py-3.5 bg-primary hover:bg-accent text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg shadow-primary/20 hover:shadow-accent/30 transition-all duration-300 hover:scale-105"
                                    >
                                        <span>Load More Photos</span>
                                        <ChevronRight size={16} />
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* ─── Lightbox Modal ─── */}
            <AnimatePresence>
                {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                        className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
                    >
                        {/* Close button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/20"
                            aria-label="Close lightbox"
                        >
                            <X size={24} />
                        </button>

                        {/* Prev button */}
                        <button
                            onClick={prevPhoto}
                            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 p-3.5 bg-white/10 hover:bg-accent text-white rounded-full transition-all duration-300 border border-white/20"
                            aria-label="Previous photo"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        {/* Next button */}
                        <button
                            onClick={nextPhoto}
                            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 p-3.5 bg-white/10 hover:bg-accent text-white rounded-full transition-all duration-300 border border-white/20"
                            aria-label="Next photo"
                        >
                            <ChevronRightIcon size={24} />
                        </button>

                        {/* Main Image & Caption Container */}
                        <div 
                            onClick={(e) => e.stopPropagation()} 
                            className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center space-y-4"
                        >
                            <motion.img
                                key={filteredPhotos[activePhotoIndex].url}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                src={filteredPhotos[activePhotoIndex].url}
                                alt={filteredPhotos[activePhotoIndex].title}
                                className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
                            />
                            
                            <div className="text-center space-y-1 text-white">
                                <h3 className="text-lg sm:text-2xl font-bold font-display">
                                    {filteredPhotos[activePhotoIndex].title}
                                </h3>
                                <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-slate-400 font-medium">
                                    <span className="text-accent uppercase tracking-wider font-extrabold">{filteredPhotos[activePhotoIndex].category}</span>
                                    <span>•</span>
                                    <span>Image {activePhotoIndex + 1} of {filteredPhotos.length}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GalleryPage;
