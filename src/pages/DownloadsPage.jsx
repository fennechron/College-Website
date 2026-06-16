import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Download, Search, FileText, BookOpen, 
    Calendar, ClipboardCheck, ArrowRight, File, Shield
} from 'lucide-react';
import { downloadCategories as localCategories } from '../data/downloadsData';
import { client } from '../lib/sanity';

const DownloadsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [categories, setCategories] = useState([]);

    const iconMap = {
        BookOpen: <BookOpen />,
        FileText: <FileText />,
        Calendar: <Calendar />,
        ClipboardCheck: <ClipboardCheck />,
        Shield: <Shield />
    };

    useEffect(() => {
        const query = `*[_type == "downloadCategory"]{
            ...,
            items[]{
                ...,
                "fileUrl": file.asset->url,
                "fileSize": file.asset->size,
                "fileDate": file.asset->_createdAt
            }
        }`;
        
        client.fetch(query)
            .then(data => {
                let combinedCategories = [...localCategories];
                
                if (data && data.length > 0) {
                    // Merge Sanity data with local data (Sanity takes precedence for matching IDs)
                    data.forEach(sanityCat => {
                        const existingIdx = combinedCategories.findIndex(c => c.id === sanityCat.id);
                        if (existingIdx >= 0) {
                            combinedCategories[existingIdx] = sanityCat;
                        } else {
                            combinedCategories.push(sanityCat);
                        }
                    });
                }
                
                setCategories(combinedCategories);
            })
            .catch(err => {
                console.error("Error fetching download categories:", err);
                setCategories(localCategories);
            });
    }, []);

    const formatBytes = (bytes, decimals = 1) => {
        if (!bytes) return '';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        try {
            const d = new Date(dateStr);
            return d.toISOString().split('T')[0];
        } catch (e) {
            return dateStr;
        }
    };

    const filteredCategories = categories.filter(cat => 
        activeCategory === 'all' || cat.id === activeCategory
    ).map(cat => ({
        ...cat,
        items: (cat.items || []).filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.items.length > 0);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* ─── Hero Section ─── */}
            <div className="bg-primary text-white pt-24 pb-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90" />
                
                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl sm:text-6xl font-display font-black leading-tight uppercase tracking-tighter mb-6">
                            Downloads <br/> & Resources
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium mb-12">
                            Quick access to official forms, syllabus, academic calendars, and examination resources.
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto relative group"
                    >
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={24} />
                        <input 
                            type="text" 
                            placeholder="Search for forms, syllabus, calendars..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-8 py-6 rounded-2xl bg-white text-primary font-bold shadow-2xl focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-slate-300"
                        />
                    </motion.div>
                </div>
            </div>

            {/* ─── Category Filter ─── */}
            <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
                <div className="flex flex-wrap justify-center gap-4">
                    {['all', ...categories.map(c => c.id)].map(catId => (
                        <button
                            key={catId}
                            onClick={() => setActiveCategory(catId)}
                            className={`px-8 py-4 rounded-xl font-black text-[0.7rem] uppercase tracking-widest transition-all duration-300 shadow-lg ${
                                activeCategory === catId 
                                ? 'bg-accent text-white scale-105' 
                                : 'bg-white text-slate-400 hover:text-primary'
                            }`}
                        >
                            {catId}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── Documents Grid ─── */}
            <div className="max-w-6xl mx-auto px-6 py-24">
                <AnimatePresence mode="popLayout">
                    {filteredCategories.length > 0 ? (
                        <div className="space-y-16">
                            {filteredCategories.map((cat, catIdx) => (
                                <motion.div 
                                    key={cat.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center">
                                            {iconMap[cat.icon]}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-display font-black text-primary uppercase leading-none">{cat.title}</h2>
                                            <p className="text-slate-400 text-sm font-medium mt-1">{cat.description}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {cat.items.map((item, itemIdx) => (
                                            <motion.div
                                                key={item.title}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: itemIdx * 0.05 }}
                                                whileHover={{ y: -5 }}
                                                className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col justify-between group hover:shadow-xl transition-all"
                                            >
                                                <div className="space-y-4">
                                                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                                                        <File size={20} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-primary leading-tight group-hover:text-accent transition-colors">{item.title}</h3>
                                                        <div className="flex items-center gap-4 mt-2 text-[0.65rem] font-black uppercase tracking-widest text-slate-400">
                                                            <span>{item.size || formatBytes(item.fileSize)}</span>
                                                            <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                            <span>{item.date ? formatDate(item.date) : formatDate(item.fileDate)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {item.fileUrl ? (
                                                    <a 
                                                        href={item.fileUrl} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        download
                                                        className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-slate-50 rounded-xl text-[0.7rem] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                                                    >
                                                        <Download size={14} /> Download
                                                    </a>
                                                ) : (
                                                    <button className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-slate-50 rounded-xl text-[0.7rem] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all">
                                                        <Download size={14} /> Download
                                                    </button>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-20 text-center"
                        >
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                <Search size={40} />
                            </div>
                            <h3 className="text-2xl font-display font-black text-primary uppercase">No documents found</h3>
                            <p className="text-slate-400 font-medium">Try adjusting your search or filters.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ─── Quick Links / Contact ─── */}
            <div className="bg-primary py-20 text-white rounded-t-[2rem]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-display font-black uppercase mb-4">Can't find what you're looking for?</h2>
                    <p className="text-white/60 font-medium mb-10">Get in touch with the administrative office for specific document requests or academic support.</p>
                    <button className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-white font-black uppercase tracking-widest rounded-full shadow-lg hover:bg-white hover:text-primary transition-all group">
                        Contact Administration <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DownloadsPage;
