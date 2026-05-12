import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { GraduationCap } from 'lucide-react';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
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

function App() {
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
                    <Route path="/teacher/:id" element={<TeacherDetail />} />
                    <Route path="/page/:slug" element={<ContentPage />} />
                </Routes>
            </main>
            <Footer />
            
            {/* Floating Admissions Button */}
            <a 
                href="#admissions" 
                className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 bg-accent hover:bg-primary text-white font-display font-bold px-8 py-4 rounded-full shadow-[0_15px_40px_rgba(29,84,108,0.4)] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(29,84,108,0.5)] z-[100] flex items-center gap-3 border-2 border-white/20 animate-pulse-soft"
            >
                <div className="bg-white/20 p-1.5 rounded-full">
                    <GraduationCap size={24} className="text-white" />
                </div>
                <span className="text-xl tracking-tighter uppercase font-black">Admissions 2025</span>
            </a>
        </Router>
    );
}

export default App;
