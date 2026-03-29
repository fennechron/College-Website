import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-[999] border-b-2 border-border bg-white shadow-[0_2px_20px_rgba(10,22,40,0.08)]">
            <div className="relative mx-auto flex max-w-[1280px] items-center px-6">
                <ul
                    className={`${isOpen ? 'flex' : 'hidden'} absolute left-0 top-full w-full flex-col bg-white py-2 text-[0.84rem] font-medium tracking-[0.02em] text-[#444] shadow-[0_8px_20px_rgba(10,22,40,0.1)] md:static md:flex md:w-auto md:flex-row md:bg-transparent md:py-0 md:shadow-none`}
                >
                    <li><a href="#home" onClick={() => setIsOpen(false)} className="nav-link active block whitespace-nowrap border-b-2 border-coral px-6 py-3 text-coral transition hover:text-coral md:px-[15px] md:py-4">Home</a></li>
                    <li><a href="#about" onClick={() => setIsOpen(false)} className="nav-link block whitespace-nowrap border-b-2 border-transparent px-6 py-3 transition hover:border-coral hover:text-coral md:px-[15px] md:py-4">About</a></li>
                    <li><a href="#academics" onClick={() => setIsOpen(false)} className="nav-link block whitespace-nowrap border-b-2 border-transparent px-6 py-3 transition hover:border-coral hover:text-coral md:px-[15px] md:py-4">Academics</a></li>
                    <li><a href="#programs" onClick={() => setIsOpen(false)} className="nav-link block whitespace-nowrap border-b-2 border-transparent px-6 py-3 transition hover:border-coral hover:text-coral md:px-[15px] md:py-4">Programs</a></li>
                    <li><a href="#placement" onClick={() => setIsOpen(false)} className="nav-link block whitespace-nowrap border-b-2 border-transparent px-6 py-3 transition hover:border-coral hover:text-coral md:px-[15px] md:py-4">Placement</a></li>
                    <li><a href="#organization" onClick={() => setIsOpen(false)} className="nav-link block whitespace-nowrap border-b-2 border-transparent px-6 py-3 transition hover:border-coral hover:text-coral md:px-[15px] md:py-4">Organization</a></li>
                    <li><a href="#ncicst" onClick={() => setIsOpen(false)} className="nav-link-conf my-2 mx-[6px] block whitespace-nowrap rounded-md bg-gold px-[14px] py-2 text-[0.8rem] font-bold tracking-[0.04em] text-text transition hover:bg-gold2 md:my-2">✦ NCICST-25</a></li>
                    <li><a href="#contact" onClick={() => setIsOpen(false)} className="nav-link block whitespace-nowrap border-b-2 border-transparent px-6 py-3 transition hover:border-coral hover:text-coral md:px-[15px] md:py-4">Contact Us</a></li>
                    <li><a href="#downloads" onClick={() => setIsOpen(false)} className="nav-link block whitespace-nowrap border-b-2 border-transparent px-6 py-3 transition hover:border-coral hover:text-coral md:px-[15px] md:py-4">Downloads</a></li>
                </ul>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="ml-auto block p-[10px] text-text md:hidden"
                    aria-label="Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
