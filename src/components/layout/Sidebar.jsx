import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, ChevronDown } from 'lucide-react';
import collegeLogo from '../../assets/cec122.png';
import excell from '../../assets/excell.png';
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
                    { label: 'PTA', path: '/page/parents-teachers' },
                    { label: 'Women Cell', path: '/page/women-cell' },
                    { label: 'Grievance Redressal', path: '/page/grievance' },
                    { label: 'Anti Ragging Cell', path: '/page/anti-ragging' },
                    { label: 'Internal Complaints Committee', path: '/page/internal-complaints' }
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
                    { label: 'Computer Eng.', path: '/page/dept-computer-engineering' },
                    { label: 'Electrical Eng.', path: '/page/dept-electrical-engineering' },
                    { label: 'Electronics Eng.', path: '/page/dept-electronics-engineering' },
                    { label: 'General Eng.', path: '/page/dept-general-engineering' }
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
            { label: 'DOCTORAL', path: '/page/doctoral' }
        ]
    },
    { name: 'PLACEMENT', path: '/page/placement', hasDropdown: false },
    {
        name: 'ORGANIZATIONS', path: '#', hasDropdown: true,
        dropdownItems: [
            {
                label: 'Technical Forums', path: '#', hasSubDropdown: true,
                subItems: [
                    { label: 'IEEE', path: '/organization/ieee' },
                    { label: 'FOCES', path: '/organization/foces' }
                ]
            },
            { label: 'Arts', path: '/organization/arts' },
            { label: 'Sports', path: '/organization/sports' },
            { label: 'NCC Unit', path: '/organization/ncc' },
            { label: 'NSS', path: '/organization/nss' }
        ]
    },
    { name: 'DOWNLOADS', path: '/page/downloads', hasDropdown: false },
    { name: 'RTI', path: '/page/right-to-info', hasDropdown: false },
    { name: 'CAMPUS LIFE', path: '/page/campus-life', hasDropdown: false },
    { name: 'CONTACT', path: '/page/contact', hasDropdown: false }
];

const SidebarItem = ({ item, closeMobileMenu }) => {
    const [isExpanded, setIsExpanded] = useState(false);
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
                    className="flex items-center gap-2 px-6 py-3.5 transition hover:bg-secondary hover:text-white text-white/90 border-b border-white/5 font-medium tracking-wide"
                >
                    {item.isHome && <Home size={18} />} {item.name}
                </Link>
            </li>
        );
    }

    return (
        <li className="relative group border-b border-white/5">
            <div 
                onClick={(e) => {
                    if (item.path === '#') {
                        e.preventDefault();
                        setIsExpanded(!isExpanded);
                    }
                }}
                className="flex items-center justify-between px-6 py-3.5 transition hover:bg-secondary hover:text-white cursor-pointer text-white/90 font-medium tracking-wide"
            >
                <span className="flex-grow whitespace-nowrap">{item.name}</span>
                <button
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        e.preventDefault(); 
                        setIsExpanded(!isExpanded); 
                    }}
                    className="p-1 min-w-[32px] flex justify-end"
                >
                    <ChevronDown size={18} className={`transition transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-black/20 ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
                <ul className="flex flex-col">
                    {item.dropdownItems.map((subItem, idx) => (
                        <li key={idx} className="border-b border-white/5 last:border-b-0">
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
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-black/20 ${expandedSubMenu === idx ? 'max-h-[1000px]' : 'max-h-0'}`}>
                                        <ul className="flex flex-col">
                                            {subItem.subItems.map((sItem, sIdx) => (
                                                <li key={sIdx} className="border-b border-white/5 last:border-0">
                                                    <Link
                                                        to={sItem.path}
                                                        onClick={closeMobileMenu}
                                                        className={`block px-12 py-2.5 hover:text-white transition text-[0.85rem] font-medium ${sItem.label === 'Anti Ragging Cell' ? 'text-red-400 font-bold' : 'text-slate-400 hover:text-white'}`}
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

const Sidebar = () => {
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
            {/* Mobile Header / Toggle */}
            <div className="md:hidden flex items-center justify-between bg-primary p-4 sticky top-0 z-[50] shadow-md">
                <div className="flex items-center gap-2">
                    <img src={collegeLogo} alt="CEC Mini Logo" className="h-[36px] w-[36px] object-contain rounded bg-white p-0.5 shrink-0" />
                    <span className="font-display text-[1rem] font-black text-white uppercase tracking-wider">
                        CEC Chengannur
                    </span>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 text-white border border-white/20 rounded-md hover:bg-white/10 transition shrink-0"
                    aria-label="Open Menu"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Backdrop overlay for Mobile */}
            <div 
                className={`fixed inset-0 z-[1001] bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={closeMobileMenu}
            />

            {/* Sidebar Panel */}
            <aside
                className={`fixed top-0 left-0 bottom-0 z-[1002] md:z-auto w-[280px] lg:w-[320px] max-w-[85vw] bg-primary text-white shadow-[10px_0_30px_rgba(0,0,0,0.1)] flex flex-col transition-transform duration-300 ease-in-out transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                } md:sticky md:h-screen`}
            >
                {/* Sidebar Header */}
                <div className="flex flex-col items-center gap-3 p-6 pt-8 pb-4 border-b border-white/10 shrink-0 relative">
                    <button 
                        onClick={closeMobileMenu}
                        className="md:hidden absolute top-4 right-4 p-1.5 hover:bg-white/10 rounded-lg transition text-white"
                        aria-label="Close Menu"
                    >
                        <X size={20} />
                    </button>
                    <img src={collegeLogo} alt="CEC Logo" className="h-[70px] w-[70px] lg:h-[90px] lg:w-[90px] object-contain rounded-sm shadow-sm bg-white p-1" />
                    <div className="text-center">
                        <h1 className="font-display text-[1.1rem] lg:text-[1.3rem] font-extrabold leading-tight text-white uppercase mb-1 tracking-wider">
                            College Of Engineering Chengannur
                        </h1>
                        <p className="text-[0.65rem] lg:text-[0.75rem] font-medium tracking-[0.02em] text-white/70 uppercase">
                            Estd 1993 | IHRD, Govt. of Kerala
                        </p>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-grow overflow-y-auto py-2 custom-scrollbar">
                    <ul className="flex flex-col text-[0.95rem]">
                        {dynamicNavItems.map((item, index) => (
                            <SidebarItem key={index} item={item} closeMobileMenu={closeMobileMenu} />
                        ))}
                    </ul>
                </div>
                
                {/* Bottom Graphic / Info */}
                <div className="p-4 border-t border-white/10 shrink-0 flex justify-center gap-4 bg-black/10">
                    <img src={excell} alt="IHRD Logo" className="h-[40px] w-[40px] object-contain opacity-80 hover:opacity-100 transition-opacity" />
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
