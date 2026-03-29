import React from 'react';
import Hero from '../components/sections/Hero.jsx';
import About from '../components/sections/About.jsx';
import Programs from '../components/sections/Programs.jsx';
import Academics from '../components/sections/Academics.jsx';
import NoticeBoard from '../components/sections/NoticeBoard.jsx';
import Gallery from '../components/sections/Gallery.jsx';
import PrincipalMessage from '../components/sections/PrincipalMessage.jsx';
import Placement from '../components/sections/Placement.jsx';
import Alumni from '../components/sections/Alumni.jsx';

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Programs />
            <Academics />
            <NoticeBoard />
            <Gallery />
            <PrincipalMessage />
            <Placement />
            <Alumni />
        </>
    );
};

export default Home;
