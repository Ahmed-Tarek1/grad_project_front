
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

import AboutUs from "./pages/AboutUs";
import Packages from "./pages/Packages";
import PackageDetail from "./pages/PackageDetail";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";

import "./styles.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/package-detail" element={<PackageDetail />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

