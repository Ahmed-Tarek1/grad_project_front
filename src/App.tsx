import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import TravelWithUs from './pages/TravelWithUs';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <Navbar />
        <main className="pb-[400px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/travel-with-us" element={<TravelWithUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;