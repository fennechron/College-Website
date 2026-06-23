import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    TrendingUp, Award, Users, Briefcase, 
    CheckCircle, ArrowRight, Download, BarChart3, Mail,
    PieChart as PieIcon
} from 'lucide-react';
import Papa from 'papaparse';
import { client } from '../lib/sanity';
import { topRecruiters, placementTraining } from '../data/placementData';

const CHART_COLORS = [
    '#0C2B4E', '#1D546C', '#2A789A', '#3B82F6', 
    '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', 
    '#F97316', '#F59E0B', '#10B981', '#14B8A6', 
    '#06B6D4', '#0EA5E9', '#8B5CF6', '#94A3B8'
];

const PlacementPage = () => {
    const [sanityPlacements, setSanityPlacements] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [currentYearData, setCurrentYearData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const query = `*[_type == "placement"] | order(year asc) {
            year,
            totalOffers,
            highestPackage,
            "csvUrl": csvFile.asset->url
        }`;
        
        client.fetch(query).then(data => {
            if (data && data.length > 0) {
                setSanityPlacements(data);
                setSelectedYear(data[data.length - 1].year);
            }
            setLoading(false);
        }).catch(err => {
            console.error("Error fetching placements from Sanity:", err);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (!selectedYear) return;
        const yearData = sanityPlacements.find(p => p.year === selectedYear);
        if (yearData && yearData.csvUrl) {
            Papa.parse(yearData.csvUrl, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const parsedData = results.data.map((row, index) => ({
                        name: row.Company,
                        offers: parseInt(row.Offers) || 0,
                        color: row.Color || CHART_COLORS[index % CHART_COLORS.length]
                    }));
                    setCurrentYearData(parsedData);
                },
                error: (error) => {
                    console.error("Error parsing CSV:", error);
                }
            });
        }
    }, [selectedYear, sanityPlacements]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* ─── Hero Section ─── */}
            <div className="bg-primary text-white py-16 sm:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                
                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-display font-black leading-tight uppercase tracking-tighter mb-4 sm:mb-6">
                            Training & <br className="sm:hidden"/> Placement Cell
                        </h1>
                        <p className="text-sm sm:text-base md:text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed mb-6 sm:mb-10">
                            Empowering students to transition from academia to excellence in the global corporate landscape.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ─── Quick Stats ─── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-12 relative z-20">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {[
                        { label: "Highest Package", value: "32 LPA", icon: <Award />, color: "#F59E0B" },
                        { label: "Placement Rate", value: "95%", icon: <TrendingUp />, color: "#10B981" },
                        { label: "Total Offers", value: "280+", icon: <Briefcase />, color: "#3B82F6" },
                        { label: "Avg. Package", value: "7.5 LPA", icon: <Users />, color: "#8B5CF6" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white p-4 sm:p-8 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.08)] border border-slate-50 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300"
                        >
                            <div 
                                className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-transform group-hover:rotate-12"
                                style={{ background: `${stat.color}15`, color: stat.color }}
                            >
                                {React.cloneElement(stat.icon, { className: "w-5 h-5 sm:w-7 sm:h-7" })}
                            </div>
                            <h3 className="text-xl sm:text-3xl font-display font-black text-primary leading-none mb-1">{stat.value}</h3>
                            <p className="text-[0.6rem] sm:text-[0.7rem] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-slate-400">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ─── Animated Bar Chart Section ─── */}
            <div className="py-12 sm:py-24 bg-slate-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
                        <div className="lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[0.7rem] font-black uppercase tracking-widest">
                                <BarChart3 size={14} /> Annual Growth
                            </div>
                            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-primary uppercase leading-tight tracking-tight">
                                Our Placement <br/> Statistics
                            </h2>
                            <p className="text-sm sm:text-base lg:text-lg text-slate-500 font-medium leading-relaxed">
                                Consistently breaking records year after year. Our students are placed in top Fortune 500 companies with industry-leading packages.
                            </p>
                            <div className="space-y-3 sm:space-y-4">
                                {['Consistent increase in Average Package', 'Diverse roles across Product & Service sectors', 'Strong alumni network in global tech hubs'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-primary font-bold text-sm sm:text-base">
                                        <CheckCircle size={18} className="text-green-500 shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Animated Bar Chart */}
                        <div className="lg:w-1/2 w-full bg-white p-4 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.05)] border border-slate-100">
                            <div className="flex items-end justify-between h-[200px] sm:h-[300px] gap-1.5 sm:gap-4">
                                {sanityPlacements.map((stat, i) => {
                                    const maxHeight = window.innerWidth < 640 ? 180 : 280;
                                    const maxOffers = Math.max(...sanityPlacements.map(s => s.totalOffers));
                                    const barHeight = (stat.totalOffers / maxOffers) * maxHeight;

                                    return (
                                        <div key={i} className="flex-1 flex flex-col items-center group relative">
                                            {/* Tooltip on hover */}
                                            <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[0.65rem] font-black px-3 py-1.5 rounded-lg whitespace-nowrap z-10 pointer-events-none">
                                                {stat.totalOffers} Offers <br/> {stat.highestPackage} Highest
                                            </div>

                                            <motion.div
                                                initial={{ height: 0 }}
                                                whileInView={{ height: barHeight }}
                                                transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                                                className="w-full rounded-t-lg sm:rounded-t-xl relative overflow-hidden group-hover:brightness-110 transition-all shadow-md"
                                                style={{ background: `linear-gradient(180deg, #1D546C 0%, #0C2B4E 100%)` }}
                                            >
                                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </motion.div>
                                            
                                            <span className="mt-3 sm:mt-4 text-[0.55rem] sm:text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">{stat.year}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Top Recruiters Section ─── */}
            <div className="py-12 sm:py-24 overflow-hidden bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-16">
                    <h2 className="text-2xl sm:text-4xl font-display font-black text-primary uppercase tracking-tight">Job Providers</h2>
                    <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-accent mx-auto mt-3 sm:mt-4 rounded-full" />
                </div>
                
                <div className="flex space-x-8 sm:space-x-12 animate-scroll">
                    {[...topRecruiters, ...topRecruiters].map((company, i) => (
                        <div key={i} className="flex-shrink-0 w-28 h-16 sm:w-40 sm:h-24 flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300">
                            <img src={company.logo} alt={company.name} className="max-w-full max-h-full object-contain" />
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── Company-wise Analysis ─── */}
            <div className="py-12 sm:py-24 bg-slate-50 relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-[0.7rem] font-black uppercase tracking-widest">
                            <PieIcon size={14} /> Recruitment Analysis
                        </div>
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-primary uppercase tracking-tight">Company-wise Analysis</h2>
                        <div className="flex justify-center gap-2 mt-6 sm:mt-8 flex-wrap">
                            {[...sanityPlacements].reverse().map(p => (
                                <button
                                    key={p.year}
                                    onClick={() => setSelectedYear(p.year)}
                                    className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-black text-[0.6rem] sm:text-[0.7rem] tracking-widest uppercase transition-all duration-300 ${
                                        selectedYear === p.year 
                                        ? 'bg-primary text-white shadow-lg' 
                                        : 'bg-white text-slate-400 hover:text-primary border border-slate-100'
                                    }`}
                                >
                                    Year of {p.year}
                                </button>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={selectedYear}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-start"
                        >
                            {/* Custom Pie Chart */}
                            <div className="bg-white p-5 sm:p-10 rounded-2xl sm:rounded-3xl shadow-xl flex flex-col items-center min-h-0">
                                <h3 className="text-lg sm:text-xl font-display font-black text-primary uppercase mb-6 sm:mb-8 self-start font-bold">Offer Distribution ({selectedYear})</h3>
                                <div className="relative w-56 h-56 sm:w-80 sm:h-80">
                                    <PieChart data={currentYearData} />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-[0.55rem] sm:text-[0.65rem] font-black uppercase text-slate-400 tracking-widest">Total Offers</span>
                                        <span className="text-2xl sm:text-4xl font-display font-black text-primary">
                                            {currentYearData.reduce((acc, curr) => acc + curr.offers, 0)}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Legend */}
                                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-12 w-full">
                                    {currentYearData.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 min-w-0">
                                            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                            <span className="text-[0.7rem] font-bold text-slate-600 truncate">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Company Bar Chart */}
                            <div className="bg-white p-5 sm:p-10 rounded-2xl sm:rounded-3xl shadow-xl min-h-0">
                                <h3 className="text-lg sm:text-xl font-display font-black text-primary uppercase mb-6 sm:mb-8 font-bold">Top Offers ({selectedYear})</h3>
                                <div className="space-y-4 sm:space-y-6">
                                    {currentYearData.map((item, i) => {
                                        const maxOffers = Math.max(...currentYearData.map(d => d.offers));
                                        const percentage = (item.offers / maxOffers) * 100;
                                        
                                        return (
                                            <div key={i} className="space-y-1.5 sm:space-y-2">
                                                <div className="flex justify-between items-center text-[0.65rem] sm:text-[0.7rem] font-black uppercase tracking-widest text-slate-500">
                                                    <span className="truncate max-w-[70%]">{item.name}</span>
                                                    <span className="text-primary shrink-0">{item.offers} Offers</span>
                                                </div>
                                                <div className="h-2 sm:h-3 bg-slate-100 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${percentage}%` }}
                                                        transition={{ duration: 0.8, delay: i * 0.03 }}
                                                        className="h-full rounded-full"
                                                        style={{ backgroundColor: item.color }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>


            {/* ─── Training Programs ─── */}
            <div className="py-12 sm:py-24 bg-slate-900 text-white rounded-t-2xl sm:rounded-t-[2rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center mb-10 sm:mb-20">
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight mb-4 sm:mb-6">How We Prepare You</h2>
                        <p className="text-white/50 text-sm sm:text-lg max-w-2xl mx-auto font-medium">Our structured training modules ensure every student is industry-ready by the time they graduate.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {placementTraining.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 sm:p-10 rounded-2xl sm:rounded-3xl hover:bg-white/10 transition-all group"
                            >
                                <div className="flex gap-4 sm:gap-6">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-accent flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                                        <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-2xl font-display font-black mb-2 sm:mb-3">{item.title}</h3>
                                        <p className="text-xs sm:text-sm md:text-base text-white/60 font-medium leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                     
                </div>
            </div>
            
             
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 60s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}} />
        </div>
    );
};

const PieChart = ({ data }) => {
    const total = data.reduce((acc, curr) => acc + curr.offers, 0);
    let cumulativePercent = 0;

    return (
        <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }} className="w-full h-full drop-shadow-2xl">
            {data.map((item, i) => {
                const segmentPercent = item.offers / total;
                const startX = Math.cos(2 * Math.PI * cumulativePercent);
                const startY = Math.sin(2 * Math.PI * cumulativePercent);
                
                // Calculate mid-angle for the explode effect
                const midAngle = 2 * Math.PI * (cumulativePercent + segmentPercent / 2);
                const explodeX = Math.cos(midAngle) * 0.15;
                const explodeY = Math.sin(midAngle) * 0.15;

                cumulativePercent += segmentPercent;
                
                const endX = Math.cos(2 * Math.PI * cumulativePercent);
                const endY = Math.sin(2 * Math.PI * cumulativePercent);
                
                const largeArcFlag = segmentPercent > 0.5 ? 1 : 0;
                const pathData = [
                    `M ${startX} ${startY}`,
                    `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                    `L 0 0`,
                ].join(' ');

                return (
                    <motion.path
                        key={i}
                        d={pathData}
                        fill={item.color}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ 
                            translateX: explodeX, 
                            translateY: explodeY,
                            filter: 'brightness(1.1)'
                        }}
                        style={{ originX: 0, originY: 0 }}
                        transition={{ 
                            type: 'spring',
                            stiffness: 300,
                            damping: 20
                        }}
                        className="cursor-pointer outline-none"
                    >
                        <title>{`${item.name}: ${item.offers}`}</title>
                    </motion.path>
                );
            })}
            {/* Inner circle for donut look */}
            <circle cx="0" cy="0" r="0.65" fill="white" />
        </svg>
    );
};

export default PlacementPage;

