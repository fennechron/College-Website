import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Preloader from './components/layout/Preloader.jsx';
import Home from './pages/Home.jsx';
import { client } from './lib/sanity.js';

const ContentPage = lazy(() => import('./pages/ContentPage.jsx'));
const TeachersPage = lazy(() => import('./pages/TeachersPage.jsx'));
const TeacherDetail = lazy(() => import('./pages/TeacherDetail.jsx'));
const PlacementPage = lazy(() => import('./pages/PlacementPage.jsx'));
const DownloadsPage = lazy(() => import('./pages/DownloadsPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const OrganizationDetail = lazy(() => import('./pages/OrganizationDetail.jsx'));
const PrincipalPage = lazy(() => import('./pages/PrincipalPage.jsx'));
const BoardOfGovernors = lazy(() => import('./pages/BoardOfGovernors.jsx'));
const AdministrativeStaff = lazy(() => import('./pages/AdministrativeStaff.jsx'));
const LibraryStaff = lazy(() => import('./pages/LibraryStaff.jsx'));
const CampusLifePage = lazy(() => import('./pages/CampusLifePage.jsx'));
const EventDetail = lazy(() => import('./pages/EventDetail.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));
const MaintenancePage = lazy(() => import('./pages/MaintenancePage.jsx'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage.jsx'));
const GalleryPage = lazy(() => import('./pages/GalleryPage.jsx'));
const ARCPage = lazy(() => import('./pages/ARCPage.jsx'));

/**
 * Floating Admissions Button Component.
 * Hides itself when the user is already on the admissions page.
 */
function FloatingAdmissionsButton() {
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [slugPath, setSlugPath] = useState("admission");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const footer = document.getElementById('contact');
        if (!footer) return;
        const observer = new IntersectionObserver(([entry]) => setIsFooterVisible(entry.isIntersecting), { threshold: 0.05 });
        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Fetch site settings
        client.fetch(`*[_type == "admission"][0]`)
            .then(data => {
                if (data && data.title) {
                    setTitle(data.title);
                    setSlugPath(data.title.toLowerCase().replace(/\s+/g, '-'));
                }
            })
            .catch(err => {
                console.error("Failed to fetch site settings:", err);
            });
    }, []);

    if (location.pathname === `/page/${slugPath}`) {
        return null;
    }

    return (
        <button
            onClick={() => navigate(`/page/${slugPath}`)}
            className={`fixed bottom-10 right-4 sm:bottom-6 sm:right-6 lg:bottom-10 lg:right-10 bg-accent hover:bg-primary text-white font-display font-bold px-4 py-2.5 sm:px-8 sm:py-4 rounded-full shadow-[0_15px_40px_rgba(29,84,108,0.4)] transition duration-300 z-[100] flex items-center gap-2 sm:gap-3 border-2 border-white/20 ${isFooterVisible ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 transform hover:-translate-y-1'}`}
        >
            <div className="bg-white/20 p-1 sm:p-1.5 rounded-full">
                <GraduationCap className="text-white h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="text-[0.9rem] sm:text-lg lg:text-xl tracking-tighter uppercase font-black">{title}</span>
        </button>
    );
}

/**
 * Main Application Component.
 * 
 * Handles routing across the entire application using react-router-dom.
 * Loads route code on demand and uses native browser scrolling.
 * 
 * @component
 * @returns {JSX.Element} The rendered application layout and routes.
 */
function App() {
    const [isMaintenance, setIsMaintenance] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        // Fetch site settings
        client.fetch(`*[_type == "siteSettings"][0]`, {}, { useCdn: false })
            .then(data => {
                if (!active) return;
                setIsMaintenance(Boolean(data?.maintenanceMode));
                setLoading(false);
            })
            .catch(err => {
                if (!active) return;
                console.error("Failed to fetch site settings:", err);
                setLoading(false);
            });

        return () => { active = false; };
    }, []);

    return (
        <Router>
            <Preloader />
            {loading ? null : isMaintenance ? (
                <Suspense fallback={null}><MaintenancePage /></Suspense>
            ) : (
                <>
                    <Navbar />
                    <main className="overflow-x-hidden w-full">
                        <Suspense fallback={null}>
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
                            <Route path="/page/notifications" element={<NotificationsPage />} />
                            <Route path="/page/photo-gallery" element={<GalleryPage />} />
                            <Route path="/page/arc" element={<ARCPage />} />
                            <Route path="/page/:slug" element={<ContentPage />} />
                            <Route path="/maintenance" element={<MaintenancePage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                        </Suspense>
                    </main>
                    <Footer />

                    {/* Floating Admissions Button */}
                    <FloatingAdmissionsButton />
                </>
            )}
        </Router>
    );
}

export default App;
