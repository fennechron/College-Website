import React from 'react';

const Gallery = () => {
    return (
        <section id="gallery" className="py-20">
            <div className="mx-auto max-w-[1280px] px-6">
                <span className="mb-[10px] inline-block rounded-[20px] bg-coral/10 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-coral">
                    Campus Life
                </span>
                <h2 className="mb-7 font-display text-[2.2rem] font-bold leading-[1.2] text-text">
                    Photo Gallery
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-2">
                    <div className="group relative overflow-hidden rounded-xl bg-section-alt sm:col-span-2 md:h-[200px] lg:row-span-2 lg:h-auto">
                        <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&amp;q=80" alt="Campus" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[rgba(10,22,40,0.6)] to-transparent p-[14px] opacity-0 transition group-hover:opacity-100">
                            <span className="text-[0.8rem] font-semibold text-white">Main Campus Building</span>
                        </div>
                    </div>
                    <div className="group relative h-[200px] overflow-hidden rounded-xl bg-section-alt">
                        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&amp;q=80" alt="Lab" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[rgba(10,22,40,0.6)] to-transparent p-[14px] opacity-0 transition group-hover:opacity-100">
                            <span className="text-[0.8rem] font-semibold text-white">Computer Lab</span>
                        </div>
                    </div>
                    <div className="group relative h-[200px] overflow-hidden rounded-xl bg-section-alt">
                        <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efd?w=400&amp;q=80" alt="Sports" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[rgba(10,22,40,0.6)] to-transparent p-[14px] opacity-0 transition group-hover:opacity-100">
                            <span className="text-[0.8rem] font-semibold text-white">Sports Meet</span>
                        </div>
                    </div>
                    <div className="group relative h-[200px] overflow-hidden rounded-xl bg-section-alt">
                        <img src="https://images.unsplash.com/photo-1584697964358-3e14ca57658b?w=400&amp;q=80" alt="Library" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[rgba(10,22,40,0.6)] to-transparent p-[14px] opacity-0 transition group-hover:opacity-100">
                            <span className="text-[0.8rem] font-semibold text-white">Central Library</span>
                        </div>
                    </div>
                    <div className="group relative h-[200px] overflow-hidden rounded-xl bg-section-alt">
                        <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&amp;q=80" alt="Classroom" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[rgba(10,22,40,0.6)] to-transparent p-[14px] opacity-0 transition group-hover:opacity-100">
                            <span className="text-[0.8rem] font-semibold text-white">Smart Classrooms</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
