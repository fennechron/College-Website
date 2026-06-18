import React from 'react';
import Hero from '../components/sections/Hero.jsx';
import NoticeUpdates from '../components/sections/NoticeUpdates.jsx';
import AboutUs from '../components/sections/AboutUs.jsx';
import Placement from '../components/sections/Placement.jsx';
import EventsNews from '../components/sections/EventsNews.jsx';
import Achievements from '../components/sections/Achievements.jsx';
import Testimonial from '../components/sections/Testimonial.jsx';
import PhotoGallery from '../components/sections/PhotoGallery.jsx';

/**
 * Home Page Component.
 * 
 * Serves as the landing page of the application. It aggregates and renders
 * various sections such as the Hero banner, Notice Updates, About Us,
 * Placement statistics, Events, Achievements, and Photo Gallery.
 * 
 * @component
 * @returns {JSX.Element} The rendered Home page.
 */
const Home = () => {
    return (
        <>
            <Hero />
            <NoticeUpdates />
            <AboutUs />
            <Placement />
            <EventsNews />
            <Achievements />
            <Testimonial />
            <PhotoGallery />
        </>
    );
};

export default Home;
