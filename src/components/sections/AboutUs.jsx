import React from 'react';
import principalImg from '../../assets/cec12.jpg';

const AboutUs = () => {
    return (
        <section id="about" className="py-10 bg-transparent">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                    
                    {/* Left Column: Principal in Charge */}
                    <div className="w-full md:w-2/5 lg:w-1/3 flex flex-col items-start text-left pr-4">
                        <div className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-[6px] border-slate-100 shadow-md mb-6 flex-shrink-0 relative">
                            <img src={principalImg} alt="Principal In Charge" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-[2.2rem] font-display font-bold text-primary mb-2">Principal</h3>
                        <div className="w-16 h-[5px] bg-accent mb-4 rounded-full"></div>
                        <p className="text-secondary/80 font-body text-[1.1rem] leading-relaxed mb-5">
                            Dedicated to fostering academic excellence, innovation, and the holistic development of our students. We focus on nurturing a thriving engineering community ready to face global technological challenges.
                        </p>
                        <a href="#principal" className="inline-block px-10 py-3 bg-primary text-white font-bold text-[1.1rem] tracking-widest uppercase rounded hover:bg-secondary transition-colors duration-300 shadow-sm">
                            Read More
                        </a>
                    </div>

                    {/* Right Column: About Us, Vision, Mission */}
                    <div className="w-full md:w-3/5">
                        {/* About Us */}
                        <div className="mb-8">
                            <h2 className="text-[3rem] font-display font-bold text-primary mb-4 uppercase tracking-wide leading-tight">About Us</h2>
                            <p className="text-secondary font-body leading-relaxed text-[1.2rem]">
                                College of Engineering Chengannur is one of the premier technical institutions in Kerala, known for its academic excellence, vibrant campus life, and outstanding placement records. We are committed to shaping the next generation of engineers who are equipped technically, professionally, and ethically to build a better, sustainable future.
                            </p>
                        </div>

                        {/* Vision & Mission Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded border-t-4 border-primary shadow-sm border-l border-r border-b border-primary/5">
                                <h3 className="text-[1.8rem] font-display font-bold text-primary mb-3">Our Vision</h3>
                                <p className="text-secondary font-body text-[1.15rem] leading-relaxed">
                                    To become a leading center of excellence in technical education and research, fostering innovation, entrepreneurship, and sustainable growth for the betterment of society.
                                </p>
                            </div>

                            <div className="bg-primary p-6 rounded border-t-[5px] border-accent shadow-md">
                                <h3 className="text-[1.8rem] font-display font-bold text-white mb-3">Our Mission</h3>
                                <ul className="text-white/80 font-body text-[1.15rem] leading-relaxed list-none space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-accent mr-3 font-bold text-xl">•</span>
                                        Provide quality education aligned with industry benchmarks.
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-3 font-bold text-xl">•</span>
                                        Promote forward-thinking research and continuous learning environments.
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-3 font-bold text-xl">•</span>
                                        Inculcate ethical values and strong leadership qualities in students.
                                    </li>
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
