import React from 'react';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import ServicesSection from '../components/Services';
import AIEvents from '../components/AIEvents';
import RomanticDestination from '../components/RomanticDestination';
import PopularDestinations from '../components/PopularDestinations';
import TrendingTours from '../components/TrendingTours';
import Testimonials from '../components/Testimonials';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <Hero />
      <Partners />
      <ServicesSection />
      <AIEvents />
      <RomanticDestination />
      <PopularDestinations />
      <TrendingTours />
      <Testimonials />
    </div>
  );
};

export default Home;
