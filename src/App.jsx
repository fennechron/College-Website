import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { GraduationCap, X } from 'lucide-react';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Preloader from './components/layout/Preloader.jsx';
import Home from './pages/Home.jsx';
import ContentPage from './pages/ContentPage.jsx';
import TeachersPage from './pages/TeachersPage.jsx';
import TeacherDetail from './pages/TeacherDetail.jsx';
import PlacementPage from './pages/PlacementPage.jsx';
import DownloadsPage from './pages/DownloadsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import OrganizationDetail from './pages/OrganizationDetail.jsx';
import PrincipalPage from './pages/PrincipalPage.jsx';
import BoardOfGovernors from './pages/BoardOfGovernors.jsx';
import AdministrativeStaff from './pages/AdministrativeStaff.jsx';
import LibraryStaff from './pages/LibraryStaff.jsx';
import CampusLifePage from './pages/CampusLifePage.jsx';

import EventDetail from './pages/EventDetail.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import MaintenancePage from './pages/MaintenancePage.jsx';
import { client } from './lib/sanity.js';

/**
 * Floating Admissions Button Component.
 * Hides itself when the user is already on the admissions page.
 */
function FloatingAdmissionsButton({ isFooterVisible }) {
    const location = useLocation();

    if (location.pathname === '/page/admission-2026') {
        return null;
    }

    return (
        <button 
            onClick={() => window.location.href = '/page/admission-2026'}
            className={`fixed bottom-6 right-6 lg:bottom-10 lg:right-10 bg-accent hover:bg-primary text-white font-display font-bold px-8 py-4 rounded-full shadow-[0_15px_40px_rgba(29,84,108,0.4)] transition-all duration-500 z-[100] flex items-center gap-3 border-2 border-white/20 animate-pulse-soft ${isFooterVisible ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 transform hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(29,84,108,0.5)]'}`}
        >
            <div className="bg-white/20 p-1.5 rounded-full">
                <GraduationCap size={24} className="text-white" />
            </div>
            <span className="text-xl tracking-tighter uppercase font-black">Admissions 2026</span>
        </button>
    );
}

/**
 * Main Application Component.
 * 
 * Handles routing across the entire application using react-router-dom.
 * Manages global states such as maintenance mode, footer visibility, and preloader.
 * Integrates smooth scrolling via Lenis.
 * 
 * @component
 * @returns {JSX.Element} The rendered application layout and routes.
 */
function App() {
    const [isMaintenance, setIsMaintenance] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    useEffect(() => {
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Fetch site settings
        client.fetch(`*[_type == "siteSettings"][0]`)
            .then(data => {
                if (data && data.maintenanceMode) {
                    setIsMaintenance(true);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch site settings:", err);
                setLoading(false);
            });

        // Intersection Observer for Footer
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFooterVisible(entry.isIntersecting);
            },
            { threshold: 0.05 }
        );

        // Observe footer after initial render
        setTimeout(() => {
            const footer = document.getElementById('contact');
            if (footer) {
                observer.observe(footer);
            }
        }, 1000);

        return () => {
            lenis.destroy();
            observer.disconnect();
        };
    }, []);

    if (loading) {
        return <Preloader />;
    }

    if (isMaintenance) {
        return <MaintenancePage />;
    }

    return (
        <Router>
            <Preloader />
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/page/teachers" element={<TeachersPage />} />
                    <Route path="/page/placement" element={<PlacementPage />} />
                    <Route path="/page/downloads" element={<DownloadsPage />} />
                    <Route path="/page/contact" element={<ContactPage />} />
                    <Route path="/organization/:id" element={<OrganizationDetail />} />
                    <Route path="/page/principal" element={<PrincipalPage />} />
                    <Route path="/page/board-of-governors" element={<BoardOfGovernors />} />
                    <Route path="/page/administrative-staff" element={<AdministrativeStaff />} />
                    <Route path="/page/library-staff" element={<LibraryStaff />} />
                    <Route path="/teacher/:id" element={<TeacherDetail />} />
                    <Route path="/event/:id" element={<EventDetail />} />
                    <Route path="/page/campus-life" element={<CampusLifePage />} />
                    <Route path="/page/:slug" element={<ContentPage />} />
                    <Route path="/maintenance" element={<MaintenancePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer />
            
            {/* Floating Admissions Button */}
            <FloatingAdmissionsButton isFooterVisible={isFooterVisible} />
        </Router>
    );
}

export default App;
