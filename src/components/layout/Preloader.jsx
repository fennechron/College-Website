import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
    const [phase, setPhase] = useState('reveal-text');
    const [isFading, setIsFading] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);

    useEffect(() => {
        // Timeline:
        // 1. Reveal "CEC" text: 0s - 1.8s
        // 2. Shrink text to center ball: 1.8s - 2.4s
        // 3. Anticipation bounce up & drop directly to bottom: 2.4s - 3.25s
        // 4. Scale up the ball to cover screen: 3.25s - 3.75s
        // 5. Fade out preloader to reveal home page: 3.75s - 4.45s

        const t1 = setTimeout(() => {
            setPhase('shrink');
        }, 1800);

        const t2 = setTimeout(() => {
            setPhase('drop');
        }, 2400);

        const t3 = setTimeout(() => {
            setPhase('scale-up');
        }, 3250);

        const t4 = setTimeout(() => {
            setIsFading(true);
        }, 3750);

        const t5 = setTimeout(() => {
            setIsRemoved(true);
        }, 4450);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            clearTimeout(t5);
        };
    }, []);

    if (isRemoved) return null;

    return (
        <div 
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-700 ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            {/* 1. Condensation Center Shockwave (when text merges to ball) */}
            {phase === 'shrink' && (
                <motion.div
                    initial={{ scale: 0.1, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute w-24 h-24 rounded-full border-2 border-primary/30 z-40 pointer-events-none"
                />
            )}

            {/* 2. Floor Impact Wave (when ball impacts bottom) */}
            {phase === 'scale-up' && (
                <motion.div
                    initial={{ width: 0, opacity: 1 }}
                    animate={{ width: '100%', opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-primary to-transparent z-40 pointer-events-none"
                />
            )}

            {/* The "CEC" Text Container */}
            {(phase === 'reveal-text' || phase === 'shrink') && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={
                        phase === 'reveal-text'
                            ? { opacity: 1, scale: 1, y: 0 }
                            : { opacity: 0, scale: 0, y: 0 }
                    }
                    transition={
                        phase === 'reveal-text'
                            ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                            : { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
                    }
                    className="flex flex-col items-center justify-center select-none"
                >
                    <div className="flex items-center justify-center gap-6">
                        <motion.span
                            initial={{ y: 25, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="text-primary text-5xl lg:text-7xl font-black tracking-wider"
                        >
                            C
                        </motion.span>
                        <motion.span
                            initial={{ y: 25, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="text-accent text-5xl lg:text-7xl font-black tracking-wider"
                        >
                            E
                        </motion.span>
                        <motion.span
                            initial={{ y: 25, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="text-primary text-5xl lg:text-7xl font-black tracking-wider"
                        >
                            C
                        </motion.span>
                    </div>

                    {/* Elegant Estd. caption under text */}
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65, duration: 0.6 }}
                        className="text-[0.6rem] lg:text-[0.7rem] font-bold uppercase tracking-[0.4em] text-slate-400 mt-4 block"
                    >
                        ESTD. 1993
                    </motion.span>
                </motion.div>
            )}

            {/* The Fluid Droplet / Ball */}
            {phase !== 'reveal-text' && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                        phase === 'shrink'
                            ? { scale: 1, opacity: 1, y: 0, scaleY: 1 }
                            : phase === 'drop'
                            ? { 
                                scale: 1, 
                                opacity: 1, 
                                y: [ 0, -80, window.innerHeight / 2 + 50 ],
                                scaleY: [ 1, 0.9, 1.3 ]
                              }
                            : phase === 'scale-up'
                            ? { scale: 280, opacity: 1, y: window.innerHeight / 2 + 50, scaleY: 1 }
                            : { scale: 0, opacity: 0 }
                    }
                    transition={
                        phase === 'shrink'
                            ? { duration: 0.5, ease: 'easeOut' }
                            : phase === 'drop'
                            ? { 
                                duration: 0.85, 
                                times: [0, 0.3, 1],
                                ease: [ [0.33, 1, 0.68, 1], [0.32, 0, 0.67, 0] ] 
                              }
                            : phase === 'scale-up'
                            ? { duration: 0.5, ease: [0.85, 0, 0.15, 1] }
                            : { duration: 0.2 }
                    }
                    className="absolute w-6 h-6 bg-primary rounded-full z-50 pointer-events-none"
                    style={{
                        boxShadow: phase === 'scale-up' ? 'none' : 'inset -2px -2px 6px rgba(0,0,0,0.2), 0 4px 10px rgba(12, 43, 78, 0.2)'
                    }}
                />
            )}
        </div>
    );
};

export default Preloader;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
    const [phase, setPhase] = useState('reveal-text');
    const [isFading, setIsFading] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);

    useEffect(() => {
        // Timeline:
        // 1. Reveal "CEC" text: 0s - 1.8s
        // 2. Shrink text to center ball: 1.8s - 2.4s
        // 3. Anticipation bounce up & drop directly to bottom: 2.4s - 3.25s
        // 4. Scale up the ball to cover screen: 3.25s - 3.75s
        // 5. Fade out preloader to reveal home page: 3.75s - 4.45s

        const t1 = setTimeout(() => {
            setPhase('shrink');
        }, 1800);

        const t2 = setTimeout(() => {
            setPhase('drop');
        }, 2400);

        const t3 = setTimeout(() => {
            setPhase('scale-up');
        }, 3250);

        const t4 = setTimeout(() => {
            setIsFading(true);
        }, 3750);

        const t5 = setTimeout(() => {
            setIsRemoved(true);
        }, 4450);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            clearTimeout(t5);
        };
    }, []);

    if (isRemoved) return null;

    return (
        <div 
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-700 ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            {/* 1. Condensation Center Shockwave (when text merges to ball) */}
            {phase === 'shrink' && (
                <motion.div
                    initial={{ scale: 0.1, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute w-24 h-24 rounded-full border-2 border-primary/30 z-40 pointer-events-none"
                />
            )}

            {/* 2. Floor Impact Wave (when ball impacts bottom) */}
            {phase === 'scale-up' && (
                <motion.div
                    initial={{ width: 0, opacity: 1 }}
                    animate={{ width: '100%', opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-primary to-transparent z-40 pointer-events-none"
                />
            )}

            {/* The "CEC" Text Container */}
            {(phase === 'reveal-text' || phase === 'shrink') && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={
                        phase === 'reveal-text'
                            ? { opacity: 1, scale: 1, y: 0 }
                            : { opacity: 0, scale: 0, y: 0 }
                    }
                    transition={
                        phase === 'reveal-text'
                            ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                            : { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
                    }
                    className="flex flex-col items-center justify-center select-none"
                >
                    <div className="flex items-center justify-center gap-6">
                        <motion.span
                            initial={{ y: 25, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="text-primary text-5xl lg:text-7xl font-black tracking-wider"
                        >
                            C
                        </motion.span>
                        <motion.span
                            initial={{ y: 25, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="text-accent text-5xl lg:text-7xl font-black tracking-wider"
                        >
                            E
                        </motion.span>
                        <motion.span
                            initial={{ y: 25, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="text-primary text-5xl lg:text-7xl font-black tracking-wider"
                        >
                            C
                        </motion.span>
                    </div>

                    {/* Elegant Estd. caption under text */}
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65, duration: 0.6 }}
                        className="text-[0.6rem] lg:text-[0.7rem] font-bold uppercase tracking-[0.4em] text-slate-400 mt-4 block"
                    >
                        ESTD. 1993
                    </motion.span>
                </motion.div>
            )}

            {/* The Fluid Droplet / Ball */}
            {phase !== 'reveal-text' && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                        phase === 'shrink'
                            ? { scale: 1, opacity: 1, y: 0, scaleY: 1 }
                            : phase === 'drop'
                            ? { 
                                scale: 1, 
                                opacity: 1, 
                                y: [ 0, -80, window.innerHeight / 2 + 50 ],
                                scaleY: [ 1, 0.9, 1.3 ]
                              }
                            : phase === 'scale-up'
                            ? { scale: 280, opacity: 1, y: window.innerHeight / 2 + 50, scaleY: 1 }
                            : { scale: 0, opacity: 0 }
                    }
                    transition={
                        phase === 'shrink'
                            ? { duration: 0.5, ease: 'easeOut' }
                            : phase === 'drop'
                            ? { 
                                duration: 0.85, 
                                times: [0, 0.3, 1],
                                ease: [ [0.33, 1, 0.68, 1], [0.32, 0, 0.67, 0] ] 
                              }
                            : phase === 'scale-up'
                            ? { duration: 0.5, ease: [0.85, 0, 0.15, 1] }
                            : { duration: 0.2 }
                    }
                    className="absolute w-6 h-6 bg-primary rounded-full z-50 pointer-events-none"
                    style={{
                        boxShadow: phase === 'scale-up' ? 'none' : 'inset -2px -2px 6px rgba(0,0,0,0.2), 0 4px 10px rgba(12, 43, 78, 0.2)'
                    }}
                />
            )}
        </div>
    );
};

export default Preloader;
