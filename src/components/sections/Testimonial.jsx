import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client, urlFor } from '../../lib/sanity';

const testimonials = [
  {
    id: 1,
    name: "Dr. APJ Abdul Kalam",
    role: "Former President of India",
    image: "https://i.pravatar.cc/150?img=11",
    quote: "The students of CEC display an extraordinary capacity for innovation and futuristic thinking."
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Director of Engineering, TechCorp",
    image: "https://i.pravatar.cc/150?img=5",
    quote: "The alumni we've hired from this institution have consistently pushed the boundaries of what's possible."
  },
  {
    id: 3,
    name: "David Chen",
    role: "Startup Founder",
    image: "https://i.pravatar.cc/150?img=12",
    quote: "Exceptional talent pool. The practical, future-ready skills taught here are transforming the industry."
  },
  {
    id: 4,
    name: "Dr. Maya Patel",
    role: "Lead Researcher, AI Institute",
    image: "https://i.pravatar.cc/150?img=9",
    quote: "A beacon of technological advancement. The campus environment perfectly nurtures out-of-the-box ideas."
  }
];

const Testimonial = () => {
  const [sanityData, setSanityData] = useState([]);
  const containerRef = React.useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    client.fetch('*[_type == "testimonial"]')
      .then(data => {
        if (data && data.length > 0) {
          setSanityData(data);
        }
      })
      .catch(err => console.error("Sanity fetch error:", err));
  }, []);

  const displayData = sanityData.length > 0 ? sanityData : testimonials;

  // Auto-scroll logic
  useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      let animationId;
      const scrollStep = () => {
          if (!isHovered && container) {
              container.scrollLeft += 1;
              if (container.scrollLeft >= container.scrollWidth / 2) {
                  container.scrollLeft = 0;
              }
          }
          animationId = requestAnimationFrame(scrollStep);
      };

      animationId = requestAnimationFrame(scrollStep);
      return () => cancelAnimationFrame(animationId);
  }, [isHovered, displayData]);

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden bg-secondary">
      
      <div className="max-w-[95%] mx-auto px-4 lg:px-6 relative z-10">
        <div className="mb-14 text-center">
            <h2 className="text-[1.8rem] md:text-[2.25rem] font-display font-bold text-white mb-4 tracking-wide uppercase">
                VOICE OF ALUMNI
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto font-body">
                Hear what our distinguished alumni have to say about their journey and our community.
            </p>
        </div>

        <style>
        {`
        :root {
            --testimonial-width: 240px;
            --testimonial-gap: 16px;
        }
        @media (min-width: 640px) {
            :root {
                --testimonial-width: 400px;
                --testimonial-gap: 24px;
            }
        }
        `}
        </style>

        <div className="relative group">
            {/* We duplicate the array to create an infinite scroll illusion */}
            <div 
               ref={containerRef}
               className="flex overflow-x-auto no-scrollbar px-4 pb-8 items-stretch"
               style={{ gap: 'var(--testimonial-gap)' }}
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
               onTouchStart={() => setIsHovered(true)}
               onTouchEnd={() => setIsHovered(false)}
            >
                {[...displayData, ...displayData].map((t, idx) => (
                    <div 
                        key={idx} 
                        className="relative rounded-2xl bg-white/10 border border-white/20 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer shrink-0"
                        style={{ width: 'var(--testimonial-width)' }}
                    >
                        <div className="h-full w-full rounded-2xl p-4 sm:p-8 flex flex-col justify-between">
                            <div>
                                <div className="text-accent text-3xl sm:text-5xl font-serif leading-none mb-1 sm:mb-2 opacity-50">"</div>
                                <p className="text-white text-xs sm:text-base leading-relaxed font-body mb-4 sm:mb-8">
                                    {t.quote}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-4 mt-auto">
                                <img 
                                    src={t.image && t.image.asset ? urlFor(t.image).url() : t.image} 
                                    alt={t.name} 
                                    className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover border border-white/20"
                                    loading="lazy"
                                />
                                <div>
                                    <h4 className="text-white font-bold tracking-wide text-xs sm:text-sm">{t.name}</h4>
                                    <p className="text-white/70 text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-wider">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Fade overlays for smooth scrolling edges matching the new secondary background */}
            <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-secondary to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-secondary to-transparent z-20 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
