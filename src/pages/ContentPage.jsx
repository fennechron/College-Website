import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import { ChevronRight, Home, ArrowLeft, Calendar, Users, BookOpen, Clock, FileText, ExternalLink, Phone, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import NotFoundPage from './NotFoundPage';

const AccordionItem = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50 mb-4 transition-all">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-black text-sm tracking-wider bg-slate-50 hover:bg-slate-100/80 text-primary transition-all"
            >
                <span>{title}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0 }}
                className="overflow-hidden bg-white"
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="p-6 space-y-3">
                    {items.map((item, index) => (
                        <p key={index} className="text-md text-slate-600 leading-relaxed font-semibold pl-6 relative whitespace-pre-wrap">
                            <span className="absolute left-0 text-accent font-extrabold">•</span>
                            {renderTextWithBold(item)}
                        </p>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

const parseContent = (text) => {
    const lines = text.split('\n');
    const segments = [];
    let currentAccordion = null;

    for (let line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        if (trimmed.startsWith('[Dropdown]')) {
            const title = trimmed.replace('[Dropdown]', '').trim();
            currentAccordion = { type: 'accordion', title: title, items: [] };
            segments.push(currentAccordion);
        } else if (trimmed.startsWith('•') && currentAccordion) {
            currentAccordion.items.push(trimmed.substring(1).trim());
        } else {
            currentAccordion = null;
            segments.push({ type: 'normal', text: trimmed });
        }
    }
    return segments;
};

// Helper to render bold text marked with **
const renderTextWithBold = (text) => {
    if (!text) return text;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="text-primary font-black">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

// Helper to generate id from name
const generateId = (name) => {
    if (!name) return '';
    const cleanName = name.replace(/^(?:(?:Dr|Prof|Sri|Smt|Mr|Mrs|Ms)\.?\s*)+/i, '');
    return cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
};


const DepartmentAccordion = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-slate-100 rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 bg-slate-50/50 hover:bg-slate-50 text-left transition-colors"
            >
                <span className="font-display font-black text-primary text-base sm:text-xl tracking-wide">{title}</span>
                <span className={`text-accent font-black text-sm sm:text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>
            {isOpen && (
                <div className="p-4 sm:p-6 border-t border-slate-100 bg-white space-y-3 sm:space-y-4">
                    {items && items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-slate-700 font-bold text-xs sm:text-base leading-relaxed">
                            <span className="inline-flex items-center justify-center shrink-0 w-2 h-2 rounded-full bg-accent mt-2 shadow-sm" />
                            <span className="flex-1 text-justify">{item}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};



/**
 * Main Dynamic Content Page Component.
 * 
 * Renders pages dynamically based on the 'slug' parameter from the URL.
 * Fetches content from Sanity CMS and falls back to local data if needed.
 * - For slugs starting with 'dept-', it renders custom department layouts.
 * - For other slugs, it falls back to a generic tabbed content renderer.
 * 
 * @component
 * @returns {JSX.Element} The rendered dynamic content page.
 */
const ContentPage = () => {
    const { slug } = useParams();
    const { pathname } = useLocation();

    const [sanityContent, setSanityContent] = useState(null);
    const [departmentInfo, setDepartmentInfo] = useState(null);
    const [departmentFaculty, setDepartmentFaculty] = useState([]);
    const [departmentHod, setDepartmentHod] = useState(null);
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState('');
    const [activeEligibility, setActiveEligibility] = useState(null);
    const [copiedNumber, setCopiedNumber] = useState(null);

    const handleCopy = async (num, e) => {
        e.preventDefault();
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(num);
            } else {
                // Fallback for non-secure contexts (like local network testing on mobile)
                const textArea = document.createElement("textarea");
                textArea.value = num;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                } catch (error) {
                    console.error("Fallback copy failed", error);
                }
                textArea.remove();
            }
        } catch (err) {
            console.error("Failed to copy", err);
        }
        
        // Always show the tick mark to give feedback
        setCopiedNumber(num);
        setTimeout(() => setCopiedNumber(null), 2000);
    };

    const isValidPhoneNumber = (num) => {
        if (typeof num !== 'string') return false;
        return /^[\d\s+]+$/.test(num) && /\d/.test(num);
    };

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            try {
                let data;
                if (slug === 'admission-2026') {
                    data = await client.fetch(`*[_type == "admission"][0] {
                        ...,
                        categories[]{
                            ...,
                            relatedDocuments[]{
                                ...,
                                "pdfUrl": file.asset->url
                            }
                        }
                    }`);
                } else if (slug === 'btech' || slug === 'mca' || slug === 'doctoral') {
                    data = await client.fetch(`*[_type == "programme" && slug.current == $slug][0]`, { slug });
                } else {
                    data = await client.fetch(`*[( _type == "pageContent" || _type == "committee" ) && slug.current == $slug][0] {
                        ...,
                        downloads[]{
                            title,
                            "pdfUrl": pdf.asset->url
                        }
                    }`, { slug });
                }
                
                if (slug.startsWith('dept-')) {
                    let deptShort = '';
                    if (slug === 'dept-computer-engineering') deptShort = 'CS';
                    else if (slug === 'dept-electronics-engineering') deptShort = 'EC';
                    else if (slug === 'dept-electrical-engineering') deptShort = 'EEE';

                    const facultyData = await client.fetch(`*[_type == "teacher" && references(*[_type == "department" && (slug.current == $slug || (short != null && $deptShort != "" && short == $deptShort))]._id)] | order(name asc)`, { slug, deptShort });
                    const hodData = facultyData.find(fac => fac.isHOD) || null;
                    const deptData = await client.fetch(`*[_type == "department" && (slug.current == $slug || (short != null && $deptShort != "" && short == $deptShort))][0]`, { slug, deptShort });
                    
                    const getRank = (fac) => {
                        if (fac.isHOD) return 1;
                        if (!fac.designation) return 4;
                        const desig = fac.designation.toLowerCase();
                        if (desig.includes('associate')) return 2;
                        if (desig.includes('assistant')) return 3;
                        return 4;
                    };

                    const sortedFaculty = facultyData.sort((a, b) => getRank(a) - getRank(b));

                    setDepartmentFaculty(sortedFaculty);
                    setDepartmentHod(hodData);
                    setDepartmentInfo(deptData || null);
                } else {
                    setDepartmentFaculty([]);
                    setDepartmentHod(null);
                    setDepartmentInfo(null);
                }

                setSanityContent(data);
            } catch (error) {
                console.error("Error fetching content from Sanity:", error);
                setSanityContent(null);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [slug]);

    const content = sanityContent || departmentInfo;

    // Reset active tab on slug/content change
    useEffect(() => {
        if (content && content.tabs) {
            if (Array.isArray(content.tabs)) {
                setActiveTab(content.tabs[0].tabName);
            } else {
                setActiveTab(Object.keys(content.tabs)[0]);
            }
        } else {
            setActiveTab('');
        }
    }, [slug, content]);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
            </div>
        );
    }

    if (!content) {
        return <NotFoundPage />;
    }

    if (slug.startsWith('dept-')) {
        const fetchedDept = departmentInfo || {};
        
        const dept = {
            ...fetchedDept,
            fullName: fetchedDept.fullName || fetchedDept.name,
            description: fetchedDept.overview || [],
            programmesTable: fetchedDept.programmes || [],
            labsExtended: fetchedDept.labsExtended || fetchedDept.labs || [],
            technicalStaff: fetchedDept.technicalStaff || [],
            news: fetchedDept.news
        };

        const renderHodCard = (extraClasses = '') => (
            <div className={`bg-primary p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] text-white shadow-xl text-center border border-white/5 space-y-6 ${extraClasses}`}>
                <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-display font-black uppercase tracking-wider mb-2">Head of Department</h3>
                    <div className="w-12 h-1 bg-accent rounded-full mb-4 sm:mb-6" />
                </div>

                {/* HOD Image Container (Provision) */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full overflow-hidden border-4 border-accent shadow-lg bg-white/10 group">
                    {(departmentHod?.photo || dept.hodImage) ? (
                        <img 
                            src={departmentHod?.photo ? urlFor(departmentHod.photo).width(500).height(500).fit('crop').url() : dept.hodImage} 
                            alt={departmentHod?.name || dept.hod} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-tr from-accent to-secondary flex items-center justify-center">
                            <span className="text-white text-4xl sm:text-5xl font-black">{(departmentHod?.name || dept.hod || 'H').charAt(0)}</span>
                        </div>
                    )}
                </div>

                {/* HOD Text & Contact Details */}
                <div className="space-y-4 text-left">
                    <div className="text-center">
                        <h4 className="text-xl sm:text-2xl font-display font-black text-white">{departmentHod?.name || dept.hod}</h4>
                        {(departmentHod?.designation || dept.hodDesignation) && (
                            <p className="text-[0.65rem] sm:text-xs text-accent font-black uppercase tracking-widest mt-1">
                                {departmentHod?.designation || dept.hodDesignation}
                            </p>
                        )}
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/10">
                        {/* We can use either departmentHod.email or dept.hodEmail */}
                        {(departmentHod?.email || dept.hodEmail) && (
                            <a href={`mailto:${departmentHod?.email || dept.hodEmail}`} className="flex items-center gap-3 text-sm font-semibold hover:text-accent transition-colors">
                                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </span>
                                <span className="truncate">{departmentHod?.email || dept.hodEmail}</span>
                            </a>
                        )}
                        {dept.hodAddressLines && (
                            <div className="flex items-start gap-3 text-sm font-semibold text-white/80">
                                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </span>
                                <div className="space-y-1 mt-1 text-xs sm:text-sm">
                                    {dept.hodAddressLines?.map((line, i) => <p key={i}>{line}</p>)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );

        if (dept && Object.keys(dept).length > 0 && dept.name) {
            return (
                <div className="min-h-screen bg-white">
                    {/* ─── Hero Section ─── */}
                    <div className="h-[40vh] sm:h-[60vh] min-h-[300px] relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 z-0">
                            <img 
                                src={dept.heroImage} 
                                alt={dept.name} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary" />
                        </div>
                        
                        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="space-y-4 sm:space-y-6"
                            >
                                <h1 className="text-xl sm:text-3xl lg:text-5xl font-display font-black text-white uppercase leading-tight tracking-tighter px-2">
                                    {dept.fullName}
                                </h1>
                            </motion.div>
                        </div>
                    </div>

                    {/* ─── Stats Bar ─── */}
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-12 relative z-20">
                        <div className="grid grid-cols-3 gap-2 sm:gap-6">
                            {dept.stats?.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-3 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center text-center justify-center min-h-[80px] sm:min-h-[120px]"
                                >
                                    <span className="text-lg sm:text-3xl font-display font-black text-primary leading-none">{stat.value}</span>
                                    <span className="text-[0.5rem] sm:text-[0.65rem] font-black uppercase tracking-widest text-slate-400 mt-1 text-center leading-normal">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ─── Main Content ─── */}
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-24 text-left">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
                            {/* Left: Detailed Description */}
                            <div className="lg:col-span-2 space-y-10 lg:space-y-12">
                                <section className="space-y-6 sm:space-y-8">
                                    <h2 className="text-xl sm:text-3xl font-display font-black text-primary uppercase flex items-center gap-3 sm:gap-4">
                                        <span className="w-10 sm:w-12 h-1 sm:h-1.5 bg-accent rounded-full" />
                                        Department Overview
                                    </h2>
                                    <div className="space-y-4 sm:space-y-6">
                                        {dept.description?.map((para, i) => (
                                            <p key={i} className="text-sm sm:text-[1.15rem] leading-[1.8] text-slate-600 font-medium text-justify">
                                                {para}
                                            </p>
                                        ))}
                                    </div>
                                </section>

                                {/* Render HOD Card on Mobile viewports right after Department Overview */}
                                {renderHodCard('lg:hidden')}

                                {/* Vision & Mission Accordions */}
                                {(dept.vision || dept.mission) && (
                                    <section className="space-y-4 sm:space-y-6">
                                        {dept.vision && (
                                            <DepartmentAccordion 
                                                title="Department Vision" 
                                                items={dept.vision} 
                                            />
                                        )}
                                        {dept.mission && (
                                            <DepartmentAccordion 
                                                title="Department Mission" 
                                                items={dept.mission} 
                                            />
                                        )}
                                    </section>
                                )}

                                {/* Programmes Offered Section */}
                                {/* Programmes Offered Section */}
                                {dept.programmesTable && (
                                    <section className="space-y-6 sm:space-y-8">
                                        <h3 className="text-lg sm:text-2xl font-display font-black text-primary uppercase flex items-center gap-3 sm:gap-4">
                                            <span className="w-8 h-1 sm:h-1.5 bg-accent rounded-full" />
                                            Programmes Offered
                                        </h3>
                                        <div className="overflow-x-auto rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm bg-white">
                                            <table className="w-full text-left border-collapse bg-white">
                                                <thead>
                                                    <tr className="bg-slate-50 border-b border-slate-100">
                                                        <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-black text-[0.65rem] sm:text-sm uppercase tracking-wider text-primary">Programme</th>
                                                        <th className="px-3 sm:px-6 py-2.5 sm:py-4 font-black text-[0.65rem] sm:text-sm uppercase tracking-wider text-primary">Duration</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 text-left">
                                                    {dept.programmesTable?.map((prog, idx) => (
                                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-3 sm:px-6 py-3 sm:py-5 text-xs sm:text-base font-black text-primary">{prog.name}</td>
                                                            <td className="px-3 sm:px-6 py-3 sm:py-5 text-xs sm:text-base font-black text-accent">{prog.duration}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                )}

                                {/* PEOs & PSOs Accordions */}
                                {(dept.peos || dept.psos) && (
                                    <section className="space-y-6">
                                        {dept.peos && (
                                            <DepartmentAccordion 
                                                title="Program Educational Objectives (PEOs)" 
                                                items={dept.peos} 
                                            />
                                        )}
                                        {dept.psos && (
                                            Array.isArray(dept.psos) ? (
                                                dept.psos.length > 0 && typeof dept.psos[0] === 'string' ? (
                                                    <DepartmentAccordion 
                                                        title="Program Specific Outcomes (PSOs)" 
                                                        items={dept.psos} 
                                                    />
                                                ) : (
                                                    <div className="space-y-4 mt-6">
                                                        <div className="space-y-4">
                                                            {dept.psos?.map((prog, idx) => (
                                                                <DepartmentAccordion 
                                                                    key={idx}
                                                                    title={`PSOs - ${prog.programName || prog}`} 
                                                                    items={prog.outcomes || prog} 
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                <div className="space-y-4 mt-6">
                                                    <div className="space-y-4">
                                                        {Object.entries(dept.psos).map(([prog, psos]) => (
                                                            <DepartmentAccordion 
                                                                key={prog}
                                                                title={`${prog}`} 
                                                                items={psos} 
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </section>
                                )}

                                {/* Laboratory Facility */}
                                <section className="space-y-6 sm:space-y-8">
                                    <h3 className="text-lg sm:text-2xl font-display font-black text-primary uppercase flex items-center gap-3 sm:gap-4">
                                        <span className="w-8 h-1 sm:h-1.5 bg-accent rounded-full" />
                                        Laboratory Facility
                                    </h3>
                                    <div className="grid gap-4 sm:gap-6">
                                        {dept.labsExtended ? dept.labsExtended.map((lab, i) => {
                                            const [title, desc] = lab.split(': ');
                                            return (
                                                <div key={i} className="bg-slate-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100 hover:shadow-md transition-all duration-300">
                                                    <div className="flex items-start gap-3 sm:gap-4">
                                                        <span className="inline-flex items-center justify-center shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-accent text-primary font-black text-xs sm:text-sm">
                                                            {i + 1}
                                                        </span>
                                                        <div className="space-y-1">
                                                            <h4 className="text-sm sm:text-lg font-display font-black text-primary uppercase">
                                                                {title}
                                                            </h4>
                                                            {desc && (
                                                                <p className="text-slate-600 text-xs sm:text-base font-medium leading-relaxed text-justify">
                                                                    {desc}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }) : dept.labs?.map((lab, i) => (
                                            <div key={i} className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                                                <span className="inline-flex items-center justify-center shrink-0 w-5 h-5 rounded-full bg-accent/15 text-accent text-[0.6rem] sm:text-xs font-black">
                                                    ✓
                                                </span>
                                                <span className="text-primary font-bold text-xs sm:text-base">{lab}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Faculty Section */}
                                {departmentFaculty && departmentFaculty.length > 0 && (
                                    <section className="space-y-6 sm:space-y-8">
                                        <h3 className="text-lg sm:text-2xl font-display font-black text-primary uppercase flex items-center gap-3 sm:gap-4">
                                            <span className="w-8 h-1 sm:h-1.5 bg-accent rounded-full" />
                                            Faculty
                                        </h3>
                                        <div className="overflow-x-auto rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm bg-white max-h-[500px] overflow-y-auto custom-scrollbar">
                                            <table className="w-full text-left border-collapse bg-white">
                                                <thead className="sticky top-0 z-10 bg-slate-50">
                                                    <tr className="border-b border-slate-100">
                                                        <th className="px-3 sm:px-6 py-3 sm:py-4 font-black text-[0.65rem] sm:text-sm uppercase tracking-wider text-primary">SL NO.</th>
                                                        <th className="px-3 sm:px-6 py-3 sm:py-4 font-black text-[0.65rem] sm:text-sm uppercase tracking-wider text-primary">Name</th>
                                                        <th className="px-3 sm:px-6 py-3 sm:py-4 font-black text-[0.65rem] sm:text-sm uppercase tracking-wider text-primary">Designation</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 text-left">
                                                    {departmentFaculty.map((fac, idx) => (
                                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-black text-slate-400">{idx + 1}</td>
                                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-black text-primary">
                                                                <Link to={`/teacher/${fac._id || generateId(fac.name)}`} className="hover:text-accent hover:underline transition-colors">
                                                                    {fac.name}
                                                                </Link>
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-semibold text-slate-600">
                                                                <span className={`inline-block px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[0.6rem] sm:text-[0.7rem] font-black uppercase tracking-wider ${
                                                                    fac.designation && fac.designation.toLowerCase().includes('head')
                                                                        ? 'bg-accent/15 text-accent border border-accent/25'
                                                                        : fac.designation && fac.designation.toLowerCase().includes('associate')
                                                                        ? 'bg-primary/10 text-primary border border-primary/20'
                                                                        : 'bg-slate-100 text-slate-600'
                                                                }`}>
                                                                    {fac.designation}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                )}

                                {/* Technical Staff Section (List format) */}
                                {dept.technicalStaffList && (
                                    <section className="space-y-6 sm:space-y-8">
                                        <h3 className="text-lg sm:text-2xl font-display font-black text-primary uppercase flex items-center gap-3 sm:gap-4">
                                            <span className="w-8 h-1 sm:h-1.5 bg-accent rounded-full" />
                                            Technical Staff
                                        </h3>
                                        <div className="overflow-x-auto rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm bg-white">
                                            <table className="w-full text-left border-collapse bg-white">
                                                <thead>
                                                    <tr className="bg-slate-50 border-b border-slate-100">
                                                        <th className="px-3 sm:px-6 py-3 sm:py-4 font-black text-[0.65rem] sm:text-sm uppercase tracking-wider text-primary">SL NO.</th>
                                                        <th className="px-3 sm:px-6 py-3 sm:py-4 font-black text-[0.65rem] sm:text-sm uppercase tracking-wider text-primary">Name</th>
                                                        <th className="px-3 sm:px-6 py-3 sm:py-4 font-black text-[0.65rem] sm:text-sm uppercase tracking-wider text-primary">Designation</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 text-left">
                                                    {dept.technicalStaffList?.map((staff, idx) => (
                                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-black text-slate-400">{idx + 1}</td>
                                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-black text-primary">{staff.name}</td>
                                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-semibold text-slate-500">{staff.designation}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                )}

                                {/* Technical Staff Section (Grid/Key format) */}
                                {dept.technicalStaff && dept.technicalStaff.length > 0 && (
                                    <section className="space-y-6 sm:space-y-8">
                                        <h3 className="text-lg sm:text-2xl font-display font-black text-primary uppercase flex items-center gap-3 sm:gap-4">
                                            <span className="w-8 h-1 sm:h-1.5 bg-accent rounded-full" />
                                            Technical Staff
                                        </h3>
                                        <div className="overflow-x-auto rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm bg-white">
                                            <table className="w-full text-left border-collapse bg-white">
                                                <thead className="bg-slate-50">
                                                    <tr className="border-b border-slate-100">
                                                        <th className="px-3 sm:px-6 py-3 sm:py-4 font-black text-[0.65rem] sm:text-sm uppercase tracking-wider text-primary">Name</th>
                                                        <th className="px-3 sm:px-6 py-3 sm:py-4 font-black text-[0.65rem] sm:text-sm uppercase tracking-wider text-primary">Designation</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {dept.technicalStaff?.map((staff, idx) => (
                                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base font-bold text-primary">{staff.name}</td>
                                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-base text-slate-600 font-medium">{staff.designation}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* Right Sidebar: HOD Profile & Details */}
                            <div className="space-y-6 sm:space-y-8">
                                {renderHodCard('hidden lg:block')}

                                {/* Programs & Department Info Card */}
                                <div className="bg-slate-50 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100 text-left space-y-6">
                                    <div>
                                        <h3 className="text-base sm:text-lg font-display font-black text-primary uppercase tracking-wider mb-2">Department Info</h3>
                                        <div className="w-12 h-1 bg-accent rounded-full" />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                            <div className="text-[0.65rem] sm:text-xs text-slate-400 font-black uppercase tracking-wider mb-1">Established</div>
                                            <div className="font-bold text-sm sm:text-base text-primary">{dept.founded}</div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Department News Section */}
                        <section className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-slate-100 space-y-6 sm:space-y-8 text-left">
                            <div className="text-center space-y-2 sm:space-y-3">
                                <span className="text-[0.65rem] sm:text-xs font-black uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full">
                                    Announcements
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-display font-black text-primary uppercase">
                                    Department News &amp; Updates
                                </h3>
                                <p className="text-slate-500 font-semibold max-w-xl mx-auto text-sm sm:text-base">
                                    Stay informed with the latest updates, workshops, achievements, and notices from the department.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                {dept.news ? dept.news.map((item, idx) => (
                                    <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-accent/25 transition-all group flex flex-col justify-between">
                                        <div className="space-y-3 sm:space-y-4">
                                            <span className="inline-flex items-center gap-2 text-[0.65rem] sm:text-xs font-black text-accent uppercase">
                                                📅 {item.date}
                                            </span>
                                            <h4 className="text-lg sm:text-xl font-display font-black text-primary group-hover:text-accent transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-1 md:grid-cols-2 text-center py-12 text-slate-400 font-bold">
                                        No recent announcements at this time.
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            );
        }
    }

    if (content.category === 'Facilities') {
        return (
            <div className="min-h-screen bg-white">
                {/* ─── Hero Section ─── */}
                <div className="h-[40vh] sm:h-[60vh] min-h-[300px] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 z-0">
                        {content.image ? (
                            <img 
                                src={content.image} 
                                alt={content.title} 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-tr from-primary via-secondary to-accent" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary" />
                    </div>
                    
                    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4 sm:space-y-6"
                        >
                            {/* Breadcrumbs */}
                            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[0.7rem] sm:text-[0.8rem] font-bold tracking-widest text-white/60 uppercase mb-2">
                                <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1.5 whitespace-nowrap">
                                    <Home size={14} /> HOME
                                </Link>
                                <ChevronRight size={12} />
                                <span className="text-white/40 whitespace-nowrap">{content.category}</span>
                                <ChevronRight size={12} />
                                <span className="text-accent underline decoration-2 underline-offset-4 whitespace-nowrap">{content.title}</span>
                            </div>

                            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-display font-black text-white uppercase leading-tight tracking-tighter">
                                {content.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>

                {/* ─── Main Content ─── */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
                        {/* Left: Detailed Description */}
                        <div className="lg:col-span-2 space-y-10 lg:space-y-12 text-left">
                            <section className="space-y-6 sm:space-y-8">
                                <h2 className="text-2xl sm:text-3xl font-display font-black text-primary uppercase flex items-center gap-3 sm:gap-4">
                                    <span className="w-10 sm:w-12 h-1 sm:h-1.5 bg-accent rounded-full" />
                                    About {content.title}
                                </h2>

                                {/* Dynamic Tabs Navigation */}
                                {content.tabs && (
                                    <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4 sm:pb-6 mb-6 sm:mb-8">
                                        {(Array.isArray(content.tabs) ? content.tabs.map(t => t.tabName) : Object.keys(content.tabs)).map((tabName) => {
                                            const isActive = activeTab === tabName;
                                            return (
                                                <button
                                                    key={tabName}
                                                    onClick={() => setActiveTab(tabName)}
                                                    className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-black text-[0.7rem] sm:text-xs uppercase tracking-wider transition-all duration-300 ${
                                                        isActive
                                                            ? 'bg-accent text-white shadow-lg shadow-accent/25'
                                                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-primary border border-slate-100'
                                                    }`}
                                                >
                                                    {tabName}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                <div className="space-y-4 sm:space-y-6">
                                    {parseContent(content.tabs ? (Array.isArray(content.tabs) ? content.tabs.find(t => t.tabName === activeTab)?.tabContent : content.tabs[activeTab]) || '' : content.content).map((segment, i) => {
                                        if (segment.type === 'accordion') {
                                            return <AccordionItem key={i} title={segment.title} items={segment.items} />;
                                        }

                                        const trimmed = segment.text.trim();
                                        if (!trimmed) return null;
                                        
                                        // If it starts with a bullet point or a dash
                                        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
                                        const isNumber = /^\d+\./.test(trimmed);
                                        
                                        if (isBullet) {
                                            return (
                                                <p key={i} className="text-sm sm:text-lg text-slate-600 leading-relaxed font-medium pl-6 relative text-justify whitespace-pre-wrap">
                                                    <span className="absolute left-0 text-accent font-extrabold">•</span>
                                                    {renderTextWithBold(trimmed.substring(1).trim())}
                                                </p>
                                            );
                                        }
                                        
                                        if (isNumber) {
                                            const match = trimmed.match(/^(\d+)\.(.*)/);
                                            const num = match ? match[1] : '';
                                            const text = match ? match[2].trim() : trimmed;
                                            return (
                                                <div key={i} className="flex items-start gap-3 sm:gap-4 pl-1 py-1">
                                                    <span className="inline-flex items-center justify-center shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/10 text-accent font-black text-xs sm:text-sm">
                                                        {num}
                                                    </span>
                                                    <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-medium pt-0.5 text-justify whitespace-pre-wrap">
                                                        {renderTextWithBold(text)}
                                                    </p>
                                                </div>
                                            );
                                        }
                                        
                                        // Header styling inside content blocks
                                        const isHeader = trimmed.endsWith(':') || 
                                                         trimmed.startsWith('Key Resources') || 
                                                         trimmed.startsWith('TEQIP Book Bank') || 
                                                         trimmed.startsWith('Book Bank Scheme') || 
                                                         trimmed.startsWith('Alumni Book Bank') || 
                                                         trimmed.startsWith('Developing Library') || 
                                                         trimmed.startsWith('National Programme') || 
                                                         trimmed.startsWith('Print & Online') || 
                                                         trimmed.startsWith('Reference and');
                                        if (isHeader) {
                                            return (
                                                <h3 key={i} className="text-lg sm:text-xl font-display font-black text-primary uppercase pt-4 sm:pt-6 pb-2 border-b border-slate-100 flex items-center gap-2 sm:gap-3">
                                                    <span className="w-1.5 h-5 sm:h-6 bg-accent rounded-full shrink-0" />
                                                    {renderTextWithBold(trimmed)}
                                                </h3>
                                            );
                                        }

                                        return (
                                            <p key={i} className="text-sm sm:text-lg text-slate-600 leading-relaxed font-medium text-justify">
                                                {renderTextWithBold(trimmed)}
                                            </p>
                                        );
                                    })}
                                </div>
                            </section>

                            {content.gallery && content.gallery.length > 0 && (
                                <div className="mt-12 pt-12 border-t border-slate-100">
                                    <h3 className="text-2xl font-bold text-primary mb-6">Photo Gallery</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {content.gallery.map((image, i) => (
                                            <div key={i} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-video bg-slate-100 group">
                                                <img 
                                                    src={image} 
                                                    alt={`Gallery view ${i + 1}`} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right: Sidebar Info */}
                        <div className="space-y-8 text-left">
                            <div className="bg-primary p-10 rounded-3xl text-white space-y-8 shadow-xl">
                                <div>
                                    <h3 className="text-xl font-display font-black uppercase mb-4">Connect</h3>
                                    <div className="w-12 h-1 bg-accent rounded-full mb-6" />
                                </div>
                                
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="flex items-center gap-3 mb-1">
                                        <Calendar size={18} className="text-accent" />
                                        <span className="font-bold text-sm">Access</span>
                                    </div>
                                    <p className="text-white/60 text-xs ml-7">Open to all students & staff</p>
                                </div>

                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="flex items-center gap-3 mb-1">
                                        <Users size={18} className="text-accent" />
                                        <span className="font-bold text-sm">Status</span>
                                    </div>
                                    <p className="text-white/60 text-xs ml-7">Fully Functional & Active</p>
                                </div>
                                
                                <Link to="/page/contact" className="block w-full bg-accent py-4 rounded-xl text-center font-black hover:bg-white hover:text-primary transition-all duration-300 tracking-wider">
                                    CONTACT HELPDESK
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[50vh] bg-background flex flex-col">
            {/* Premium Hero Header */}
            <div className="bg-primary text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                
                <div className="relative z-10 max-w-[90%] lg:max-w-[1280px] mx-auto px-4 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-4"
                    >
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-[0.8rem] font-bold tracking-widest text-white/60 mb-2">
                            <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1.5 whitespace-nowrap">
                                <Home size={14} /> HOME
                            </Link>
                            <ChevronRight size={12} />
                            <span className="text-white/40 whitespace-nowrap">
                                {['btech', 'mca', 'doctoral'].includes(slug) ? 'Programmes' : content.category}
                            </span>
                            <ChevronRight size={12} />
                            <span className="text-accent underline decoration-2 underline-offset-4 whitespace-nowrap">
                                {slug === 'btech' ? 'B.Tech Programmes' : slug === 'mca' ? 'MCA Programme' : slug === 'doctoral' ? 'Doctoral Programmes' : content.title}
                            </span>
                        </div>
                        
                        <h1 className="text-[1.8rem] sm:text-[3.5rem] font-display font-black leading-tight tracking-tighter max-w-4xl">
                            {slug === 'btech' ? 'B.Tech Programmes' : slug === 'mca' ? 'MCA Programme' : slug === 'doctoral' ? 'Doctoral Programmes' : content.title}
                        </h1>
                        <div className="w-20 sm:w-24 h-1.5 sm:h-2 bg-accent rounded-full mt-2"></div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-grow py-8 sm:py-16">
                <div className="max-w-[95%] lg:max-w-[1280px] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    
                    {/* Main Content Area */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`${(slug === 'parents-teachers' || slug === 'right-to-info' || slug === 'btech' || slug === 'mca' || slug === 'doctoral' || slug === 'apjaktu' || slug === 'aicte') ? 'lg:col-span-12' : 'lg:col-span-8'} bg-white ${slug === 'admission-2026' ? 'py-4 sm:py-8 md:py-14 px-2 sm:px-4 md:px-8' : 'p-4 sm:p-8 md:p-14'} rounded-2xl sm:rounded-[2.5rem] shadow-[0_10px_50px_rgba(12,43,78,0.06)] border border-primary/5`}
                    >
                        <div className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-secondary/80 prose-p:leading-relaxed prose-li:text-secondary/80">
                            {slug !== 'parents-teachers' && slug !== 'right-to-info' && slug !== 'btech' && slug !== 'mca' && slug !== 'doctoral' && slug !== 'apjaktu' && slug !== 'aicte' && slug !== 'admission-2026' && (
                                <h2 className="text-3xl font-bold text-primary mb-8 flex items-center gap-4">
                                    Section Overview
                                    <div className="flex-1 h-px bg-primary/10"></div>
                                </h2>
                            )}
                            {slug === 'college-bus' ? (
                                <div className="space-y-8 mb-10">
                                    <p className="text-[1.15rem] leading-[1.8] text-secondary/80 font-medium">
                                        The college is providing efficient transportation facilities for the staffs and students to the nearby places/towns.
                                    </p>
                                    
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-display font-black text-primary uppercase pb-2 border-b border-slate-100 flex items-center gap-3">
                                            <span className="w-1.5 h-6 bg-accent rounded-full shrink-0" />
                                            College Bus Routes
                                        </h3>
                                        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white">
                                            <table className="w-full text-left border-collapse bg-white">
                                                <thead>
                                                    <tr className="bg-slate-50 border-b border-slate-100">
                                                        <th className="px-6 py-4 font-black text-xs uppercase tracking-wider text-primary">From (Starting Point)</th>
                                                        <th className="px-6 py-4 font-black text-xs uppercase tracking-wider text-primary">Starting Time</th>
                                                        <th className="px-6 py-4 font-black text-xs uppercase tracking-wider text-primary">VIA Route</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {[
                                                        { from: "Changanacherry", time: "8.10 AM", via: "Thiruvalla" },
                                                        { from: "Haripad", time: "7.50 AM", via: "Mavelikkara" }
                                                    ].map((route, i) => (
                                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-6 py-4 text-sm font-bold text-primary">{route.from}</td>
                                                            <td className="px-6 py-4 text-sm font-black text-accent">{route.time}</td>
                                                            <td className="px-6 py-4 text-sm font-semibold text-slate-600">{route.via}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ) : slug === 'parents-teachers' ? (
                                <div className="space-y-12 mb-10 max-w-5xl mx-auto">
                                    {/* Parents Executive Table */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-display font-black text-primary uppercase pb-2 border-b border-slate-100 flex items-center gap-3">
                                            <span className="w-1.5 h-6 bg-accent rounded-full shrink-0" />
                                            Executive Members (Parents)
                                        </h3>
                                        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white">
                                            <table className="w-full text-left border-collapse bg-white">
                                                <thead>
                                                    <tr className="bg-slate-50 border-b border-slate-100">
                                                        <th className="px-4 sm:px-6 py-3 sm:py-4 font-black text-xs uppercase tracking-wider text-primary whitespace-nowrap">Sl. No.</th>
                                                        <th className="px-4 sm:px-6 py-3 sm:py-4 font-black text-xs uppercase tracking-wider text-primary whitespace-nowrap">Name</th>
                                                        <th className="px-4 sm:px-6 py-3 sm:py-4 font-black text-xs uppercase tracking-wider text-primary whitespace-nowrap">Mobile</th>
                                                        <th className="px-4 sm:px-6 py-3 sm:py-4 font-black text-xs uppercase tracking-wider text-primary whitespace-nowrap">Name of Student</th>
                                                        <th className="px-4 sm:px-6 py-3 sm:py-4 font-black text-xs uppercase tracking-wider text-primary whitespace-nowrap">Class</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {[
                                                        { sl: 1, name: "Sri. Thomas M David", role: "Vice President", mob: "9446666139", student: "Deepa Hannah Thomas", class: "S8 CS" },
                                                        { sl: 2, name: "Dr. Jayalekshmi P A", role: "Joint Secretary", mob: "9447009355", student: "R. Devanarayanan", class: "S6 CS" },
                                                        { sl: 3, name: "Sri. Santhosh Ampadi", role: "Member", mob: "9446294472", student: "Meenakshi S", class: "S4 CL" },
                                                        { sl: 4, name: "Smt. Sunitha Sajeev", role: "Member", mob: "9947968941", student: "Sreeraman S Nair", class: "S6 EEE" },
                                                        { sl: 5, name: "Sri. Suresh M", role: "Member", mob: "9846218001", student: "Sidharth Suresh Madhav", class: "S4 CS" },
                                                        { sl: 6, name: "Sri. Unnikrishnan K G", role: "Member", mob: "7025498009", student: "Arjun Krishna", class: "S2 EC" }
                                                    ].map((p) => (
                                                        <tr key={p.sl} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-bold text-slate-400">{p.sl}</td>
                                                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm">
                                                                <div className="font-bold text-primary whitespace-nowrap">{p.name}</div>
                                                                <div className="text-xs text-slate-500 font-semibold whitespace-nowrap">{p.role}</div>
                                                            </td>
                                                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-semibold text-slate-600 whitespace-nowrap">{p.mob}</td>
                                                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-bold text-accent whitespace-nowrap">{p.student}</td>
                                                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm"><span className="px-2.5 py-1 rounded-md bg-slate-100 text-xs font-black text-slate-600 uppercase whitespace-nowrap">{p.class}</span></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Teachers Executive Table */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-display font-black text-primary uppercase pb-2 border-b border-slate-100 flex items-center gap-3">
                                            <span className="w-1.5 h-6 bg-accent rounded-full shrink-0" />
                                            Executive Committee Members (Teachers)
                                        </h3>
                                        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white">
                                            <table className="w-full text-left border-collapse bg-white">
                                                <thead>
                                                    <tr className="bg-slate-50 border-b border-slate-100">
                                                        <th className="px-4 sm:px-6 py-3 sm:py-4 font-black text-xs uppercase tracking-wider text-primary whitespace-nowrap">Sl. No.</th>
                                                        <th className="px-4 sm:px-6 py-3 sm:py-4 font-black text-xs uppercase tracking-wider text-primary whitespace-nowrap">Name & Designation</th>
                                                        <th className="px-4 sm:px-6 py-3 sm:py-4 font-black text-xs uppercase tracking-wider text-primary whitespace-nowrap">Mobile</th>
                                                        <th className="px-4 sm:px-6 py-3 sm:py-4 font-black text-xs uppercase tracking-wider text-primary whitespace-nowrap">Position</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {[
                                                        { sl: 1, name: "Dr. Hari V S", desig: "Principal", mob: "8547005032", pos: "President" },
                                                        { sl: 2, name: "Dr. T E Ayoob Khan", desig: "Professor, Dept. of Electronics Engg.", mob: "9447556722", pos: "Secretary" },
                                                        { sl: 3, name: "Dr. Lekha R Nair", desig: "Professor, Dept. of Electronics Engg.", mob: "9496570592", pos: "Treasurer" },
                                                        { sl: 4, name: "Dr. Shanavaz K T", desig: "Dean (Academic)", mob: "9496108494", pos: "Member" },
                                                        { sl: 5, name: "Dr. C V Anilumar", desig: "HOD (Electronics Engg)", mob: "9446108491", pos: "Member" },
                                                        { sl: 6, name: "Dr. Ashok Kumar T V", desig: "HOD (General Engg.)", mob: "9447709779", pos: "Member" },
                                                        { sl: 7, name: "Dr. Renu George", desig: "HOD (Computer Engg.)", mob: "9747401150", pos: "Member" },
                                                        { sl: 8, name: "Dr. Raju M", desig: "HOD (Electrical Engg.)", mob: "9747405790", pos: "Member" },
                                                        { sl: 9, name: "Smt. Moni P John", desig: "HOD (Basic Science & Language)", mob: "9446538651", pos: "Member" }
                                                    ].map((t) => (
                                                        <tr key={t.sl} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-bold text-slate-400">{t.sl}</td>
                                                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm">
                                                                <div className="font-bold text-primary whitespace-nowrap">{t.name}</div>
                                                                <div className="text-xs text-slate-500 font-semibold whitespace-nowrap">{t.desig}</div>
                                                            </td>
                                                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-semibold text-slate-600 whitespace-nowrap">{t.mob}</td>
                                                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm"><span className="px-2.5 py-1 rounded-md bg-accent/10 text-xs font-black text-accent uppercase whitespace-nowrap">{t.pos}</span></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ) : slug === 'btech' || slug === 'mca' || slug === 'doctoral' ? (
                                <div className="space-y-8 sm:space-y-12">
                                    <div className="border-b border-slate-100 pb-6 mb-8 text-left">
                                        <span className="text-xs font-black uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
                                            Programmes
                                        </span>
                                        <h2 className="text-2xl sm:text-3xl font-display font-black text-primary uppercase mt-3">
                                            {content.title}
                                        </h2>
                                    </div>

                                    {content.courses && content.courses.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
                                            {content.courses.map((course, idx) => {
                                                return (
                                                    <div 
                                                        key={idx} 
                                                        className={`bg-slate-50/50 hover:bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-100 hover:shadow-xl hover:border-accent/20 transition-all duration-300 flex flex-col justify-between group ${content.courses.length === 1 ? 'md:col-span-2 max-w-2xl mx-auto w-full' : ''}`}
                                                    >
                                                        <div className="space-y-5 sm:space-y-6">
                                                            <div className="w-12 h-12 rounded-xl sm:rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300">
                                                                <BookOpen size={24} />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <h3 className="text-lg sm:text-xl font-display font-black text-primary group-hover:text-accent transition-colors duration-300 leading-snug">
                                                                    {course.name}
                                                                </h3>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                                                                <div className="bg-white p-3 rounded-xl border border-slate-100/60 shadow-sm flex items-center gap-2 sm:gap-3">
                                                                    <Clock size={16} className="text-accent shrink-0" />
                                                                    <div>
                                                                        <div className="text-[0.6rem] sm:text-[0.65rem] text-slate-400 font-black uppercase tracking-wider">Duration</div>
                                                                        <div className="text-[0.7rem] sm:text-xs font-black text-primary">{course.duration}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="bg-white p-3 rounded-xl border border-slate-100/60 shadow-sm flex items-center gap-2 sm:gap-3">
                                                                    <Users size={16} className="text-accent shrink-0" />
                                                                    <div>
                                                                        <div className="text-[0.6rem] sm:text-[0.65rem] text-slate-400 font-black uppercase tracking-wider">Intake</div>
                                                                        <div className="text-[0.7rem] sm:text-xs font-black text-primary">{course.intake}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {course.eligibility && (
                                                            <div className="mt-6 sm:mt-8 border-t border-slate-100 pt-5 sm:pt-6">
                                                                <button 
                                                                    onClick={() => setActiveEligibility(activeEligibility === idx ? null : idx)}
                                                                    className="inline-flex items-center gap-2 text-[0.65rem] sm:text-xs font-black uppercase tracking-wider text-accent hover:text-primary transition-colors cursor-pointer"
                                                                >
                                                                    <span>Eligibility Requirements</span>
                                                                    <span className="text-accent/60 font-medium">({activeEligibility === idx ? 'click to collapse' : 'click here'})</span>
                                                                    <ChevronRight size={14} className={`transform transition-transform duration-300 ${activeEligibility === idx ? 'rotate-90' : ''}`} />
                                                                </button>

                                                                <motion.div
                                                                    initial={false}
                                                                    animate={{ height: activeEligibility === idx ? 'auto' : 0, opacity: activeEligibility === idx ? 1 : 0 }}
                                                                    className="overflow-hidden"
                                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                                >
                                                                    <div className="mt-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-slate-100 shadow-inner space-y-3 sm:space-y-4 text-[0.7rem] sm:text-xs font-semibold text-slate-600 leading-relaxed">
                                                                        {course.eligibility.academic && (
                                                                            <div>
                                                                                <span className="font-black text-primary uppercase block mb-1">Academic Qualification</span>
                                                                                {course.eligibility.academic}
                                                                            </div>
                                                                        )}
                                                                        {course.eligibility.marks && (
                                                                            <div>
                                                                                <span className="font-black text-primary uppercase block mb-1">Marks Requirement</span>
                                                                                {course.eligibility.marks}
                                                                            </div>
                                                                        )}
                                                                        {course.eligibility.entrance && (
                                                                            <div>
                                                                                <span className="font-black text-primary uppercase block mb-1">Entrance Exam</span>
                                                                                {course.eligibility.entrance}
                                                                            </div>
                                                                        )}
                                                                        {course.eligibility.notes && course.eligibility.notes.length > 0 && (
                                                                            <div className="pt-2">
                                                                                <span className="font-black text-primary uppercase block mb-2">Important Notes</span>
                                                                                <ul className="space-y-2">
                                                                                    {course.eligibility.notes.map((note, i) => (
                                                                                        <li key={i} className="flex gap-2">
                                                                                            <span className="text-accent font-black">({i + 1})</span>
                                                                                            <span>{note}</span>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </motion.div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-slate-400 font-bold">
                                            No courses found for this programme.
                                        </div>
                                    )}

                                    {content.commonEligibility && (
                                        <div className="mt-8 sm:mt-12 bg-slate-50/50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-100 text-left">
                                            <h3 className="text-xl sm:text-2xl font-display font-black text-primary uppercase mb-6 flex items-center gap-3">
                                                <span className="w-8 h-1 bg-accent rounded-full" />
                                                Eligibility Requirements
                                            </h3>
                                            <div className="grid gap-6 md:grid-cols-3">
                                                {content.commonEligibility.academic && (
                                                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                                        <span className="font-black text-accent uppercase block mb-2 text-xs sm:text-sm tracking-wider">Academic Qualification</span>
                                                        <p className="text-slate-600 text-[0.7rem] sm:text-xs font-semibold leading-relaxed">
                                                            {content.commonEligibility.academic}
                                                        </p>
                                                    </div>
                                                )}
                                                {content.commonEligibility.marks && (
                                                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                                        <span className="font-black text-accent uppercase block mb-2 text-xs sm:text-sm tracking-wider">Marks Requirement</span>
                                                        <p className="text-slate-600 text-[0.7rem] sm:text-xs font-semibold leading-relaxed">
                                                            {content.commonEligibility.marks}
                                                        </p>
                                                    </div>
                                                )}
                                                {content.commonEligibility.entrance && (
                                                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                                        <span className="font-black text-accent uppercase block mb-2 text-xs sm:text-sm tracking-wider">Entrance Exam</span>
                                                        <p className="text-slate-600 text-[0.7rem] sm:text-xs font-semibold leading-relaxed">
                                                            {content.commonEligibility.entrance}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            {content.commonEligibility.notes && content.commonEligibility.notes.length > 0 && (
                                                <div className="mt-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                                    <span className="font-black text-accent uppercase block mb-3 text-xs sm:text-sm tracking-wider">Important Notes</span>
                                                    <ul className="space-y-2">
                                                        {content.commonEligibility.notes.map((note, i) => (
                                                            <li key={i} className="flex gap-2 text-slate-600 text-[0.7rem] sm:text-xs font-semibold leading-relaxed">
                                                                <span className="text-accent font-black">({i + 1})</span>
                                                                <span>{note}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                </div>
                            ) : slug === 'right-to-info' ? (
                                <div className="space-y-12 text-left">
                                    <div className="border-b border-slate-100 pb-6 mb-8">
                                        <span className="text-xs font-black uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
                                            RTI Act Compliance
                                        </span>
                                        <h2 className="text-2xl sm:text-3xl font-display font-black text-primary uppercase mt-3">
                                            Right to Information
                                        </h2>
                                        <p className="text-slate-500 font-semibold text-sm sm:text-base mt-2">
                                            In compliance with the Right to Information (RTI) Act, College of Engineering Chengannur maintains absolute transparency in all its academic, administrative, and financial activities. The designated officers under the RTI Act are listed below:
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                                        {[
                                            {
                                                role: "Public Information Officer",
                                                name: "Smt. Asha K Pillai",
                                                desig: "Senior Superintendent",
                                                email: "ashakpillai2016@gmail.com",
                                                phone: "94473731"
                                            },
                                            {
                                                role: "Assistant Public Information Officer",
                                                name: "Sri. Anoop Raj T V",
                                                desig: "Junior Superintendent",
                                                email: "anoopraj@ceconline.edu",
                                                phone: "7561866090"
                                            },
                                            {
                                                role: "Appellate Authority",
                                                name: "Dr. Hari V S",
                                                desig: "Principal, College of Engineering Chengannur",
                                                email: "principal@ceconline.edu",
                                                phone: "8547005032"
                                            }
                                        ].map((officer, idx) => (
                                            <div 
                                                key={idx}
                                                className="bg-slate-50/50 hover:bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-100 hover:shadow-xl hover:border-accent/20 transition-all duration-300 flex flex-col justify-between group"
                                            >
                                                <div className="space-y-4">
                                                    <span className="text-[0.65rem] font-black uppercase tracking-widest text-accent bg-accent/5 px-3 py-1 rounded-md inline-block">
                                                        {officer.role}
                                                    </span>
                                                    <div>
                                                        <h3 className="text-lg sm:text-xl font-display font-black text-primary group-hover:text-accent transition-colors uppercase leading-snug">
                                                            {officer.name}
                                                        </h3>
                                                        <p className="text-xs text-slate-400 font-bold uppercase mt-1">
                                                            {officer.desig}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-6 pt-6 border-t border-slate-100/80 space-y-3">
                                                    <a href={`mailto:${officer.email}`} className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-600 hover:text-accent transition-colors min-w-0">
                                                        <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                                        <span className="truncate">{officer.email}</span>
                                                    </a>
                                                    <a href={`tel:${officer.phone}`} className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-600 hover:text-accent transition-colors min-w-0">
                                                        <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                                        <span className="truncate">{officer.phone}</span>
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : slug === 'admission-2026' ? (
                                <div className="space-y-10 sm:space-y-12 text-left">
                                    {/* Introduction Card */}
                                    {content.description && (
                                        <div className="bg-slate-50/50 p-6 sm:p-8 rounded-2xl border border-slate-100/80 shadow-sm">
                                            <p className="text-base sm:text-xl font-medium text-slate-700 leading-relaxed whitespace-pre-wrap">
                                                {content.description}
                                            </p>
                                        </div>
                                    )}

                                    {/* Admission Categories Grid */}
                                    <div className="grid grid-cols-1 gap-6">
                                        {content.categories && content.categories.map((category, idx) => (
                                            <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-lg hover:border-accent/20 transition-all duration-300 flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12 group">
                                                <div className="space-y-4 md:flex-1">
                                                    <div className="flex items-center">
                                                        {category.isOpen ? (
                                                            <span className="text-[0.65rem] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">
                                                                Admission Open
                                                            </span>
                                                        ) : (
                                                            <span className="text-[0.65rem] font-black uppercase tracking-widest text-slate-500 bg-slate-50 px-3 py-1 rounded-md border border-slate-100">
                                                                Currently Closed
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="text-xl font-display font-black text-primary uppercase group-hover:text-accent transition-colors">
                                                        {category.heading}
                                                    </h3>
                                                    {category.shortDescription && (
                                                        <p className="text-sm text-slate-500 font-medium leading-relaxed whitespace-pre-wrap max-w-xl">
                                                            {category.shortDescription}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="md:w-[40%] flex flex-col space-y-4 shrink-0 w-full">
                                                    {category.registrationLink && category.registrationLink.url && (
                                                        <div className="pt-0">
                                                            <a href={category.registrationLink.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-between w-full gap-2 px-6 py-4 font-bold rounded-xl transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider ${category.isOpen ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-accent hover:-translate-y-0.5' : 'bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none'}`}>
                                                                {category.registrationLink.text || 'Register Now'} {category.isOpen && <ChevronRight size={18} className="opacity-70" />}
                                                            </a>
                                                        </div>
                                                    )}

                                                    {category.relatedDocuments && category.relatedDocuments.length > 0 && (
                                                        <div className="space-y-2 pt-2">
                                                            <span className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 block mb-3">Related Resources</span>
                                                            {category.relatedDocuments.map((doc, docIdx) => (
                                                                <a key={docIdx} href={doc.type === 'file' ? doc.pdfUrl : doc.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group/doc border border-transparent hover:border-slate-200">
                                                                    <div className="text-slate-400 bg-white shadow-sm border border-slate-100 p-2.5 rounded-lg group-hover/doc:text-accent group-hover/doc:border-accent/20 transition-all">
                                                                        {doc.type === 'file' ? <FileText size={18} /> : <ExternalLink size={18} />}
                                                                    </div>
                                                                    <div className="pt-0.5 flex-1">
                                                                        <div className="text-[0.85rem] font-bold text-primary group-hover/doc:text-accent transition-colors leading-tight">{doc.title}</div>
                                                                        {doc.description && <div className="text-[0.7rem] font-semibold text-slate-500 mt-1.5">{doc.description}</div>}
                                                                    </div>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : slug === 'apjaktu' || slug === 'aicte' ? (
                                <div className="space-y-8 sm:space-y-12 text-left">
                                    {/* University Affiliation Header */}
                                    <div className="border-b border-slate-100 pb-4 sm:pb-6 mb-6 sm:mb-8">
                                        <span className="text-[0.65rem] sm:text-xs font-black uppercase tracking-widest text-accent bg-accent/10 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full">
                                            {slug === 'apjaktu' ? 'University Affiliation' : 'National Council'}
                                        </span>
                                        <h2 className="text-xl sm:text-3xl font-display font-black text-primary uppercase mt-3">
                                            {slug === 'apjaktu' ? 'APJ Abdul Kalam Technological University' : 'All India Council for Technical Education'}
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 sm:gap-12 items-start">
                                        {/* Description Card */}
                                        <div className="bg-slate-50/50 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 md:p-10 border border-slate-100 shadow-sm text-justify flex flex-col justify-between h-full">
                                            <p className="text-sm sm:text-lg lg:text-xl leading-relaxed sm:leading-[1.8] text-slate-700 font-medium font-sans mb-6 sm:mb-8">
                                                {content.content}
                                            </p>

                                            {slug === 'apjaktu' && (
                                                <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-auto pt-4 sm:pt-6 border-t border-slate-200/60">
                                                    <a href="https://ktu.edu.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white font-bold rounded-xl hover:bg-accent transition-colors text-xs sm:text-sm uppercase tracking-wider text-center">
                                                        Official KTU Website
                                                    </a>
                                                    <a href="https://app.ktu.edu.in/login.htm/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-primary border-2 border-primary font-bold rounded-xl hover:bg-slate-50 transition-colors text-xs sm:text-sm uppercase tracking-wider text-center">
                                                       KTU Login Portal
                                                    </a>
                                                </div>
                                            )}

                                            {slug === 'aicte' && (
                                                <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-auto pt-4 sm:pt-6 border-t border-slate-200/60">
                                                    <a href="https://www.aicte.gov.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white font-bold rounded-xl hover:bg-accent transition-colors text-xs sm:text-sm uppercase tracking-wider text-center">
                                                        Official AICTE Website
                                                    </a>
                                                </div>
                                            )}
                                        </div>

                                        {/* Logo Branding Card */}
                                        <div className="flex justify-center">
                                            <a 
                                                href={slug === 'apjaktu' ? "https://ktu.edu.in/" : "https://www.aicte.gov.in/"} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[2rem] border border-slate-100 shadow-[0_15px_40px_rgba(12,43,78,0.04)] flex items-center justify-center w-full transition-transform duration-500 hover:scale-[1.02] cursor-pointer"
                                                title={`Visit ${content.title} Official Website`}
                                            >
                                                <img 
                                                    src={slug === 'apjaktu' ? "/images/apjaktu_logo.png" : "/images/aicte_logo.jpg"} 
                                                    alt={`${content.title} Logo`} 
                                                    className="w-full max-w-[140px] sm:max-w-[200px] object-contain"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 mb-10">
                                    {parseContent(content.content).map((segment, i) => {
                                        if (segment.type === 'accordion') {
                                            return <AccordionItem key={i} title={segment.title} items={segment.items} />;
                                        }

                                        const trimmed = segment.text.trim();
                                        if (!trimmed) return null;
                                        
                                        // Bullet points
                                        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
                                        const isNumber = /^\d+\./.test(trimmed);
                                        
                                        if (isBullet) {
                                            return (
                                                <p key={i} className="text-sm sm:text-lg text-slate-600 leading-relaxed font-medium pl-6 relative text-justify whitespace-pre-wrap">
                                                    <span className="absolute left-0 text-accent font-extrabold">•</span>
                                                    {renderTextWithBold(trimmed.substring(1).trim())}
                                                </p>
                                            );
                                        }
                                        
                                        if (isNumber) {
                                            const match = trimmed.match(/^(\d+)\.(.*)/);
                                            const num = match ? match[1] : '';
                                            const text = match ? match[2].trim() : trimmed;
                                            return (
                                                <div key={i} className="flex items-start gap-3 sm:gap-4 pl-1 py-1">
                                                    <span className="inline-flex items-center justify-center shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/10 text-accent font-black text-xs sm:text-sm">
                                                        {num}
                                                    </span>
                                                    <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-medium pt-0.5 text-justify whitespace-pre-wrap">
                                                        {renderTextWithBold(text)}
                                                    </p>
                                                </div>
                                            );
                                        }
                                        
                                        // Header styling inside content blocks
                                        const isHeader = trimmed.endsWith(':') || 
                                                         trimmed.startsWith('Name of Executive') || 
                                                         trimmed.startsWith('Key Resources');
                                        if (isHeader) {
                                            return (
                                                <h3 key={i} className="text-lg sm:text-xl font-display font-black text-primary uppercase pt-4 sm:pt-6 pb-2 border-b border-slate-100 flex items-center gap-2 sm:gap-3">
                                                    <span className="w-1.5 h-5 sm:h-6 bg-accent rounded-full shrink-0" />
                                                    {trimmed}
                                                </h3>
                                            );
                                        }

                                        return (
                                            <p key={i} className="text-sm sm:text-[1.15rem] leading-[1.8] text-secondary/80 font-medium text-justify whitespace-pre-wrap">
                                                {renderTextWithBold(trimmed)}
                                            </p>
                                        );
                                    })}
                                </div>
                            )}

                            {content.category !== 'Committees' && slug !== 'btech' && slug !== 'mca' && slug !== 'doctoral' && slug !== 'apjaktu' && slug !== 'aicte' && slug !== 'admission-2026' && (
                                <>
                                    <h3 className="text-2xl font-bold text-primary mb-6">Key Details & Context</h3>
                                    <p className="text-[1.15rem] mb-10">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                                        <div className="bg-background/50 p-6 rounded-2xl border-l-4 border-accent">
                                            <h4 className="font-bold text-lg text-primary mb-2 uppercase tracking-wide">Vision 2026</h4>
                                            <p className="text-sm">Excellence in research and infrastructure to support future student innovation hub in Kerala's technological ecosystem.</p>
                                        </div>
                                        <div className="bg-background/50 p-6 rounded-2xl border-l-4 border-secondary">
                                            <h4 className="font-bold text-lg text-primary mb-2 uppercase tracking-wide">Core Objective</h4>
                                            <p className="text-sm">Focusing on skill development and industry connections through the prestigious IHRD educational framework.</p>
                                        </div>
                                    </div>

                                    <p className="text-[1.1rem]">
                                        For more information or specific inquiries regarding {content.title}, please reach out to the institutional desk during office hours or visit our contact page for dedicated department extensions.
                                    </p>
                                </>
                            )}


                            {content.gallery && content.gallery.length > 0 && (
                                <div className="mt-12 pt-12 border-t border-slate-100">
                                    <h3 className="text-2xl font-bold text-primary mb-6">Photo Gallery</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                        {content.gallery.map((image, i) => (
                                            <div key={i} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-video bg-slate-100 group">
                                                <img 
                                                    src={image} 
                                                    alt={`Gallery view ${i + 1}`} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {content.downloads && content.downloads.length > 0 && (
                                <div className="mt-12 pt-12 border-t border-slate-100">
                                    <h3 className="text-2xl font-display font-black text-primary mb-6 uppercase tracking-wider">Downloads & Documents</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {content.downloads.map((doc, i) => (
                                            <a 
                                                key={i} 
                                                href={doc.pdfUrl} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="flex items-center gap-4 p-5 bg-white border border-slate-200 shadow-sm rounded-xl hover:border-accent hover:shadow-md transition-all group"
                                            >
                                                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                                    <FileText size={24} />
                                                </div>
                                                <span className="font-semibold text-primary text-[1.1rem] group-hover:text-accent transition-colors">{doc.title}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {slug !== 'parents-teachers' && slug !== 'right-to-info' && slug !== 'btech' && slug !== 'mca' && slug !== 'doctoral' && slug !== 'apjaktu' && slug !== 'aicte' && (
                        <div className="lg:col-span-4 space-y-10">
                            {/* Notice Card */}
                            <div className="bg-primary p-8 rounded-[2rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                               <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
                               <h3 className="text-xl font-black mb-6 uppercase tracking-widest flex items-center gap-2">
                                   Helpdesk
                               </h3>
                               <p className="text-sm text-white/70 mb-8 leading-relaxed font-bold">
                                   Need more clarification on institutional policies or specific details regarding {content.title}?
                               </p>
                               {slug?.includes('admission') && content.helpdeskContacts && content.helpdeskContacts.length > 0 && (
                                   <div className="mb-8 space-y-4">
                                       {content.helpdeskContacts.map((contact, idx) => {
                                           const isValid = isValidPhoneNumber(contact.number);
                                           return (
                                               <div key={idx} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10 group">
                                                    <div className="flex items-center gap-3">
                                                        <Phone size={18} className="text-accent" />
                                                        <div>
                                                            <p className="text-[0.65rem] font-black uppercase tracking-widest text-white/50 mb-0.5">{contact.title}</p>
                                                            <span className="font-bold text-sm text-white/90">{contact.number}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {isValid && (
                                                            <a 
                                                                href={`tel:${contact.number.replace(/\s/g, '')}`} 
                                                                className="md:hidden p-2 bg-accent/50 hover:bg-accent text-white rounded-md transition-colors shadow-sm"
                                                                aria-label="Call Number"
                                                            >
                                                                <Phone size={16} />
                                                            </a>
                                                        )}
                                                        <button 
                                                            onClick={(e) => handleCopy(contact.number, e)}
                                                            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                                                            aria-label="Copy Number"
                                                        >
                                                            {copiedNumber === contact.number ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                                                        </button>
                                                    </div>
                                               </div>
                                           );
                                       })}
                                   </div>
                               )}
                               <Link to="/page/contact" className="block w-full bg-accent py-4 rounded-xl text-center font-black hover:bg-white hover:text-primary transition-all duration-300 tracking-wider">
                                    CONTACT US
                               </Link>
                            </div>

                            {/* Recent Items / Sidebar Menu */}
                            <div className="bg-white p-8 rounded-[2rem] border border-primary/5 shadow-lg">
                               <h3 className="text-lg font-black text-primary mb-6 uppercase tracking-widest border-b border-primary/5 pb-4">
                                   Related Info
                               </h3>
                               <ul className="space-y-4">
                                   {[
                                       { label: 'Academic Calendar', path: '/downloads' },
                                       { label: 'Mandatory Disclosures', path: '/downloads' },
                                       { label: 'Anti-Ragging Committee', path: '/page/anti-ragging' }
                                   ].map((link, i) => (
                                       <li key={i}>
                                           <Link to={link.path} className="flex items-center justify-between group py-2">
                                               <span className="text-[0.95rem] font-bold text-secondary/60 group-hover:text-accent transition-colors">{link.label}</span>
                                               <ChevronRight size={16} className="text-primary/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                           </Link>
                                       </li>
                                   ))}
                                </ul>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ContentPage;
