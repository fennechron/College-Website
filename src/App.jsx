import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
    const [isAdmissionsModalOpen, setIsAdmissionsModalOpen] = useState(false);

    useEffect(() => {
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

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
                    <Route path="/page/:slug" element={<ContentPage />} />
                </Routes>
            </main>
            <Footer />
            
            {/* Floating Admissions Button */}
            <button 
                onClick={() => setIsAdmissionsModalOpen(true)}
                className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 bg-accent hover:bg-primary text-white font-display font-bold px-8 py-4 rounded-full shadow-[0_15px_40px_rgba(29,84,108,0.4)] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(29,84,108,0.5)] z-[100] flex items-center gap-3 border-2 border-white/20 animate-pulse-soft"
            >
                <div className="bg-white/20 p-1.5 rounded-full">
                    <GraduationCap size={24} className="text-white" />
                </div>
                <span className="text-xl tracking-tighter uppercase font-black">Admissions 2026</span>
            </button>

            {/* Admissions Modal */}
            {isAdmissionsModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
                        <button 
                            onClick={() => setIsAdmissionsModalOpen(false)}
                            className="absolute top-3 right-3 md:top-4 md:right-4 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-primary transition-colors p-2 rounded-full z-[210]"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-xl md:text-2xl font-display font-bold text-primary mb-4 mt-2">
                            Registration Form for B.Tech Admission 2026–27( KEAM And NON-KEAM )
                        </h2>
                        <p className="text-sm md:text-base text-secondary/80 mb-8 font-body">
                            This form is intended for registration of prospective students for spot admission after the KEAM Centralized Allotment by CEE Kerala.
                        </p>
                        <a 
                            href="https://docs.google.com/forms/d/e/1FAIpQLSfJUpcMKTLCnW3rsszP-okVQuDPmKRA4O_FYoH93SlBmMXT6w/viewform"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-accent hover:bg-primary text-white font-bold py-3 rounded transition-colors duration-300 uppercase tracking-widest"
                        >
                            Register Now
                        </a>
                    </div>
                </div>
            )}
        </Router>
    );
}

export default App;
