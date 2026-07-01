import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, ChevronDown, ChevronRight, Bell } from 'lucide-react';
import collegeLogo from '../../assets/cec122.png';
import ktulogo from '../../assets/ktu.png';
import ihrdlogo from '../../assets/ihrd.png';
import excell from '../../assets/excell.png'
import Updates from './Updates.jsx';
import { client } from '../../lib/sanity';

const navItems = [
    { name: 'HOME', path: '/', hasDropdown: false, isHome: true },
    {
        name: 'ABOUT', path: '#', hasDropdown: true,
        dropdownItems: [
            {
                label: 'Administrations', path: '#', hasSubDropdown: true,
                subItems: [
                    { label: 'Board of Governors', path: '/page/board-of-governors' },
                    { label: 'Principal', path: '/page/principal' },
                    { label: 'Administrative Staff', path: '/page/administrative-staff' },
                    { label: 'Library Staff', path: '/page/library-staff' }
                ]
            },
            {
                label: 'Facilities', path: '#', hasSubDropdown: true,
                subItems: [
                    { label: 'FAB Lab', path: '/page/fab-lab' },
                    { label: 'Photo Gallery', path: '/page/photo-gallery' },
                    { label: 'Library', path: '/page/library' },
                    { label: 'Transportation Facility', path: '/page/college-bus' },
                    { label: 'Hostel', path: '/page/hostel' }
                ]
            },
            {
                label: 'Committees', path: '#', hasSubDropdown: true,
                subItems: [
                    { label: 'Parents Teachers Association (PTA)', path: '/page/parents-teachers' },
                    { label: 'Women Cell', path: '/page/women-cell' },
                    { label: 'Grievance Redressal', path: '/page/grievance' },
                    { label: 'Anti Ragging Cell', path: '/page/anti-ragging' },
                    { label: 'Internal Complaints Committee', path: '/page/internal-complaints' },
                    { label: 'Intellectual Property Rights Cells', path: '/page/iprc' },
                    { label: 'Research & Development Cell', path: '/page/research' },
                    { label: 'SC/ST/OBC Committee', path: '/page/sc-st-cell' },
                    { label: 'Institution Innovation Council', path: '/page/iic' },
                    { label: 'Institution Industry Cell', path: '/page/institution-industry-cell' },
                    { label: 'Internal Quality Assurance Cell', path: '/page/iqac' }
                ]
            }
        ]
    },
    {
        name: 'ACADEMICS', path: '#', hasDropdown: true,
        dropdownItems: [
            {
                label: 'Department', path: '#', hasSubDropdown: true,
                subItems: [
                    { label: 'Department of Computer Engineering', path: '/page/dept-computer-engineering' },
                    { label: 'Department of Electrical Engineering', path: '/page/dept-electrical-engineering' },
                    { label: 'Department of Electronics Engineering', path: '/page/dept-electronics-engineering' },
                    { label: 'Department of General Engineering', path: '/page/dept-general-engineering' },
                    { label: 'Department of Basic Science & Language', path: '/page/dept-basic-science-language' }
                ]
            },
            { label: 'APJAKTU', path: '/page/apjaktu' },
            { label: 'AICTE', path: '/page/aicte' }
        ]
    },
    {
        name: 'PROGRAMMES', path: '#', hasDropdown: true,
        dropdownItems: [
            { label: 'BTech', path: '/page/btech' },
            { label: 'MCA', path: '/page/mca' },
            { label: 'DOCTORAL PROGRAMME', path: '/page/doctoral' }
        ]
    },
    {
        name: 'PLACEMENT', path: '/page/placement', hasDropdown: false
    },
    {
        name: 'ORGANIZATIONS', path: '#', hasDropdown: true,
        dropdownItems: [
            {
                label: 'Technical Forums', path: '#', hasSubDropdown: true,
                subItems: [
                    { label: 'IEEE', path: '/organization/ieee' },
                    { label: 'FOCES', path: '/organization/foces' },
                    { label: 'PRODECC', path: '/organization/prodecc' },
                    { label: 'ExCESS', path: '/organization/excess' },
                    { label: 'SURGE', path: '/organization/surge' }
                ]
            },
            { label: 'Arts', path: '/organization/arts' },
            { label: 'Sports', path: '/organization/sports' },
            { label: 'Naval NCC Unit', path: '/organization/ncc' },
            { label: 'NSS', path: '/organization/nss' }
        ]
    },
    {
        name: 'DOWNLOADS', path: '/page/downloads', hasDropdown: false
    },
    {
        name: 'RTI', path: '/page/right-to-info', hasDropdown: false
    },
    {
        name: 'CAMPUS LIFE', path: '/page/campus-life', hasDropdown: false
    },
    {
        name: 'CONTACT', path: '/page/contact', hasDropdown: false
    }
];

const NavItem = ({ item, closeMobileMenu }) => {
    const [isMobileExpanded, setIsMobileExpanded] = useState(false);
    const [expandedSubMenu, setExpandedSubMenu] = useState(null);

    const toggleSubMenu = (e, idx) => {
        e.preventDefault();
        setExpandedSubMenu(expandedSubMenu === idx ? null : idx);
    };

    if (!item.hasDropdown) {
        return (
            <li>
                <Link
                    to={item.path}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-1 block whitespace-nowrap px-4 py-3 transition hover:bg-secondary hover:text-white md:py-[14px] text-white"
                >
                    {item.isHome && <Home size={18} />} {item.name}
                </Link>
            </li>
        );
    }

    return (
        <li className="relative group">
            {/* Desktop link rendering */}
            <Link
                to={item.path}
                className="hidden md:flex items-center gap-1 whitespace-nowrap px-4 py-[14px] transition hover:bg-secondary hover:text-white cursor-pointer text-white"
            >
                {item.name}
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </Link>

            {/* Mobile rendering */}
            <div 
                onClick={(e) => {
                    if (item.path === '#') {
                        e.preventDefault();
                        setIsMobileExpanded(!isMobileExpanded);
                    }
                }}
                className="md:hidden flex items-center justify-between px-4 py-3 transition hover:bg-secondary hover:text-white cursor-pointer"
            >
                {item.path === '#' ? (
                    <span className="flex-grow whitespace-nowrap font-semibold tracking-[0.03em]">
                        {item.name}
                    </span>
                ) : (
                    <Link
                        to={item.path}
                        onClick={closeMobileMenu}
                        className="flex-grow whitespace-nowrap font-semibold tracking-[0.03em]"
                    >
                        {item.name}
                    </Link>
                )}
                <button
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        e.preventDefault(); 
                        setIsMobileExpanded(!isMobileExpanded); 
                    }}
                    className="p-1 min-w-[32px] flex justify-end"
                >
                    <ChevronDown size={18} className={`transition transform duration-300 ${isMobileExpanded ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Desktop Dropdown */}
            <div className="hidden md:block absolute top-[100%] left-0 bg-primary shadow-[0_10px_30px_rgba(0,0,0,0.3)] min-w-[220px] z-[1000] border-t-2 border-accent rounded-b-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 pt-1">
                <ul className="flex flex-col py-2">
                    {item.dropdownItems.map((subItem, idx) => (
                        <li key={idx} className={subItem.hasSubDropdown ? "relative group/sub" : ""}>
                            {subItem.hasSubDropdown ? (
                                <>
                                    <div className="flex items-center justify-between px-6 py-3.5 hover:bg-secondary cursor-pointer group-hover/sub:bg-secondary">
                                        <span className="text-[0.95rem] font-medium tracking-wide text-white/95">{subItem.label}</span>
                                        <ChevronRight size={14} className="text-white/70" />
                                    </div>
                                    <div 
                                        className={`absolute ${subItem.label === 'Committees' ? 'top-[-100px]' : 'top-[-10px]'} left-full -ml-[2px] bg-primary shadow-[0_10px_30px_rgba(0,0,0,0.3)] min-w-[320px] max-h-[calc(100vh-200px)] overflow-y-auto z-[1000] border-l-2 border-accent rounded-r-md opacity-0 pointer-events-none group-hover/sub:opacity-100 group-hover/sub:pointer-events-auto hidden md:block transition-all duration-300 custom-scrollbar`}
                                        data-lenis-prevent="true"
                                    >
                                        <ul className="flex flex-col py-2">
                                            {subItem.subItems.map((sItem, sIdx) => (
                                                <li key={sIdx}>
                                                    <Link
                                                        to={sItem.path}
                                                        onClick={closeMobileMenu}
                                                        className={`block px-6 py-3 hover:bg-secondary hover:text-white transition text-[0.95rem] tracking-wide ${sItem.label === 'Anti Ragging Cell' ? 'bg-red-500/20 text-red-100 font-extrabold' : 'font-medium text-white/95'}`}
                                                    >
                                                        {sItem.label} {sItem.label === 'Anti Ragging Cell' && '🚨'}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    to={subItem.path}
                                    onClick={closeMobileMenu}
                                    className="block px-6 py-3.5 hover:bg-secondary hover:text-white transition text-[0.95rem] font-medium tracking-wide text-white/95"
                                >
                                    {subItem.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mobile Dropdown */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
                <ul className="bg-secondary flex flex-col">
                    {item.dropdownItems.map((subItem, idx) => (
                        <li key={idx} className="border-b border-primary/20 border-solid last:border-b-0">
                            {subItem.hasSubDropdown ? (
                                <>
                                    <div className="flex items-center justify-between px-8 py-3 hover:text-white text-slate-300 transition text-[0.9rem] font-medium tracking-wide">
                                        <div onClick={(e) => toggleSubMenu(e, idx)} className="flex-1 cursor-pointer flex items-center gap-2">
                                            • {subItem.label}
                                        </div>
                                        <button onClick={(e) => toggleSubMenu(e, idx)} className="p-1">
                                            <ChevronDown size={16} className={`transition transform duration-300 ${expandedSubMenu === idx ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSubMenu === idx ? 'max-h-[1000px]' : 'max-h-0'}`}>
                                        <ul className="bg-primary/80 flex flex-col">
                                            {subItem.subItems.map((sItem, sIdx) => (
                                                <li key={sIdx} className="border-b border-secondary/30 last:border-0">
                                                    <Link
                                                        to={sItem.path}
                                                        onClick={closeMobileMenu}
                                                        className={`block px-12 py-2.5 hover:text-white transition text-[0.85rem] font-medium ${sItem.label === 'Anti Ragging Cell' ? 'text-red-400 font-bold' : 'text-slate-300'}`}
                                                    >
                                                        - {sItem.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    to={subItem.path}
                                    onClick={closeMobileMenu}
                                    className="block px-8 py-3 hover:text-white text-slate-300 transition text-[0.9rem] font-medium tracking-wide"
                                >
                                    • {subItem.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [orgGroups, setOrgGroups] = useState([]);

    useEffect(() => {
        client.fetch(`*[_type == "organization"]{ name, slug, "category": category->title }`).then(data => {
            const groups = {};
            data.forEach(org => {
                const cat = org.category || 'Other';
                if (!groups[cat]) groups[cat] = [];
                groups[cat].push({ label: org.name, path: `/organization/${org.slug.current}` });
            });
            const formattedGroups = Object.keys(groups).map(cat => ({
                label: cat, path: '#', hasSubDropdown: true, subItems: groups[cat]
            }));
            setOrgGroups(formattedGroups);
        }).catch(console.error);
    }, []);

    // Prevent body scrolling when mobile menu drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (window.lenis) window.lenis.stop();
        } else {
            document.body.style.overflow = '';
            if (window.lenis) window.lenis.start();
        }
        return () => {
            document.body.style.overflow = '';
            if (window.lenis) window.lenis.start();
        };
    }, [isOpen]);

    // Close mobile menu automatically if user expands window to desktop size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const dynamicNavItems = navItems.map(item => {
        if (item.name === 'ORGANIZATIONS') {
            return {
                ...item,
                dropdownItems: orgGroups.length > 0 ? orgGroups : item.dropdownItems
            };
        }
        return item;
    });

    const closeMobileMenu = () => setIsOpen(false);

    return (
        <>
            {/* Top Tier: Logo and College Info */}
            <header className="relative z-[999] bg-background py-1.5 border-b border-slate-200">
                <div className="flex w-full flex-col lg:flex-row items-center justify-between gap-[10px] lg:gap-[20px] px-4 lg:px-8">
                    {/* Left Side: College Logo and Title */}
                    <div className="flex flex-col sm:flex-row items-center gap-[10px] sm:gap-[20px] text-center sm:text-left">
                        <img src={collegeLogo} alt="CEC Logo" className="h-[50px] w-[50px] sm:h-[70px] sm:w-[70px] lg:h-[100px] lg:w-[100px] shrink-0 object-contain rounded-sm shadow-sm" />
                        <div className="flex flex-col justify-center">
                            <h1 className="font-display text-[1.1rem] sm:text-[1.5rem] lg:text-[2.2rem] font-extrabold leading-tight text-primary uppercase mb-1 tracking-wide">
                                College Of Engineering Chengannur
                            </h1>
                            <p className="text-[0.75rem] sm:text-[0.85rem] lg:text-[1.1rem] font-bold tracking-[0.02em] text-secondary">
                                ESTD : 1993 Institute of Human Resource Development(IHRD), Government of Kerala
                            </p>
                            <p className="text-[0.7rem] sm:text-[0.8rem] lg:text-[1.05rem] font-semibold tracking-[0.02em] text-primary/80 mt-[2px]">
                                Affiliated to APJ Abdul Kalam Technological University, Kerala
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Organizational Logos Provision (KTU, AICTE, IHRD etc.) */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 mt-2 lg:mt-0 lg:pr-4">
                        <div className="flex flex-col items-center gap-1 group/logo">
                            <img src={excell} alt="IHRD Logo" className="h-[36px] w-[36px] sm:h-[50px] sm:w-[50px] lg:h-[110px] lg:w-[110px] shrink-0 object-contain rounded-sm shadow-sm" />
                        </div>
                        <div className="flex flex-col items-center gap-1 group/logo">
                            <img src={ktulogo} alt="KTU Logo" className="h-[32px] w-[32px] sm:h-[45px] sm:w-[45px] lg:h-[90px] lg:w-[90px] shrink-0 object-contain rounded-sm shadow-sm" />
                        </div>
                        <div className="flex flex-col items-center gap-1 group/logo">
                            <img src={ihrdlogo} alt="IHRD Logo" className="h-[32px] w-[32px] sm:h-[45px] sm:w-[45px] lg:h-[90px] lg:w-[90px] shrink-0 object-contain rounded-sm shadow-sm" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Bottom Tier: Sticky Navigation Links */}
            <nav className="sticky top-0 z-[1000] bg-primary transition-colors duration-300 shadow-[0_2px_20px_rgba(10,22,40,0.08)]">
                <div className="relative flex w-full items-center px-4 lg:px-8 justify-between md:justify-start h-14 md:h-auto">
                    {/* Mobile-only Branding on Sticky Navbar */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <img src={collegeLogo} alt="CEC Mini Logo" className="h-[32px] w-[32px] object-contain rounded bg-white p-0.5 shrink-0" />
                        <span className="font-display text-[0.95rem] font-black text-white uppercase tracking-wider">
                            CEC Chengannur
                        </span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <ul className="hidden lg:flex w-full md:w-auto md:flex-row md:py-0 md:shadow-none justify-between flex-nowrap text-[0.75rem] xl:text-[0.95rem] 2xl:text-[1rem] font-semibold tracking-[0.03em] text-white">
                        {dynamicNavItems.map((item, index) => (
                            <NavItem key={index} item={item} closeMobileMenu={closeMobileMenu} />
                        ))}
                    </ul>

                    {/* Mobile Action Buttons (Bell & Hamburger) */}
                    <div className="ml-auto flex items-center gap-2 lg:hidden shrink-0">
                        <Link
                            to="/page/notifications"
                            className="p-2 text-white border border-white/20 rounded-md hover:bg-white/10 transition"
                            aria-label="View Notifications"
                        >
                            <Bell size={20} />
                        </Link>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="p-2 text-white border border-white/20 rounded-md hover:bg-white/10 transition"
                            aria-label="Open Menu"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            {/* Backdrop overlay */}
            <div 
                className={`fixed inset-0 z-[1001] bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={closeMobileMenu}
            />

            {/* Side Drawer Panel */}
            <div
                className={`fixed top-0 right-0 bottom-0 z-[1002] w-[290px] max-w-[85vw] bg-primary text-white shadow-2xl flex flex-col md:hidden transition-transform duration-300 ease-in-out transform ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-2">
                        <img src={collegeLogo} alt="CEC Mini Logo" className="h-[28px] w-[28px] object-contain rounded bg-white p-0.5 shrink-0" />
                        <span className="font-display text-[0.85rem] font-black uppercase tracking-wider text-white">
                            CEC Navigation
                        </span>
                    </div>
                    <button 
                        onClick={closeMobileMenu}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition"
                        aria-label="Close Menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Drawer Links with custom scrollbar */}
                <div className="flex-grow overflow-y-auto py-2 custom-scrollbar" data-lenis-prevent="true">
                    <ul className="flex flex-col text-[0.9rem] font-semibold tracking-[0.03em] divide-y divide-white/5">
                        {dynamicNavItems.map((item, index) => (
                            <NavItem key={index} item={item} closeMobileMenu={closeMobileMenu} />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
