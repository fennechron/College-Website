import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../../lib/sanity';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    const [data, setData] = useState(null);
    const [principalImage, setPrincipalImage] = useState(null);

    useEffect(() => {
        client.fetch(`*[_type == "homePage"][0]`).then(setData).catch(console.error);
        client.fetch(`*[_type == "principal"][0]{ image }`).then(res => setPrincipalImage(res?.image)).catch(console.error);
    }, []);

    if (!data) return null;

    return (
        <section id="about" className="py-10 bg-transparent">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
                    
                    {/* Left Column: Principal in Charge */}
                    <div className="w-full md:w-2/5 lg:w-1/3 flex flex-col items-center md:items-start text-center md:text-left md:pr-4">
                        <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-[6px] border-slate-100 shadow-md mb-6 flex-shrink-0 relative bg-slate-200">
                            {principalImage && (
                                <img src={urlFor(principalImage).url()} alt="Principal" className="w-full h-full object-cover" />
                            )}
                        </div>
                        <h3 className="text-[1.8rem] md:text-[2.2rem] font-display font-bold text-primary mb-2">Principal</h3>
                        <div className="w-16 h-[5px] bg-accent mb-4 rounded-full mx-auto md:mx-0"></div>
                        <p className="text-secondary/80 font-body text-[1.1rem] leading-relaxed mb-5">
                            Dedicated to fostering academic excellence, innovation, and the holistic development of our students. We focus on nurturing a thriving engineering community ready to face global technological challenges.
                        </p>
                        <Link to="/page/principal" className="inline-block px-10 py-3 bg-primary text-white font-bold text-[1.1rem] tracking-widest uppercase rounded hover:bg-secondary transition-colors duration-300 shadow-sm">
                            Read More
                        </Link>
                    </div>

                    {/* Right Column: About Us, Vision, Mission */}
                    <div className="w-full md:w-3/5">
                        {/* About Us */}
                        <div className="mb-8 text-center md:text-left">
                            <h2 className="text-[2.2rem] md:text-[3rem] font-display font-bold text-primary mb-4 uppercase tracking-wide leading-tight">About Us</h2>
                            <p className="text-secondary font-body leading-relaxed text-[1.1rem] md:text-[1.2rem]">
                                {data.aboutUs?.description}
                            </p>
                        </div>

                        {/* Vision & Mission Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            <div className="bg-white p-6 rounded border-t-4 border-primary shadow-sm border-l border-r border-b border-primary/5">
                                <h3 className="text-[1.5rem] md:text-[1.8rem] font-display font-bold text-primary mb-3">Our Vision</h3>
                                <p className="text-secondary font-body text-[1rem] md:text-[1.15rem] leading-relaxed">
                                    {data.aboutUs?.vision}
                                </p>
                            </div>

                            <div className="bg-primary p-6 rounded border-t-[5px] border-accent shadow-md">
                                <h3 className="text-[1.5rem] md:text-[1.8rem] font-display font-bold text-white mb-3">Our Mission</h3>
                                <ul className="text-white/80 font-body text-[1rem] md:text-[1.15rem] leading-relaxed list-none space-y-2">
                                    {data.aboutUs?.mission?.map((m, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="text-accent mr-3 font-bold text-xl">•</span>
                                            {m}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
