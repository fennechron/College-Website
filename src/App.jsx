import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Updates from './components/layout/Updates.jsx';
import Header from './components/layout/Header.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/Home.jsx';

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
        <>
            <Updates />
            <Header />
            <Navbar />
            <main>
                <Home />
            </main>
            <Footer />
        </>
    );
}

export default App;
