import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-500">Travel</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
            <NavLink to="/about" active={location.pathname === "/about"}>About</NavLink>
            <div className="relative group">
              <NavLink to="/services" active={location.pathname === "/services"}>Services</NavLink>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link 
                  to="/travels" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                >
                  Travels
                </Link>
                <Link 
                  to="/travel-with-us" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                >
                  Travel With Us
                </Link>
                <Link 
                  to="/companies" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                >
                  Companies
                </Link>
              </div>
            </div>
            <NavLink to="/packages" active={location.pathname === "/packages"}>Upcoming Packages</NavLink>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
              Get in Touch
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" active={location.pathname === "/"}>Home</MobileNavLink>
            <MobileNavLink to="/about" active={location.pathname === "/about"}>About</MobileNavLink>
            <MobileNavLink to="/services" active={location.pathname === "/services"}>Services</MobileNavLink>
            <div className="pl-4 space-y-1">
              <MobileNavLink to="/travels" active={location.pathname === "/travels"}>Travels</MobileNavLink>
              <MobileNavLink to="/travel-with-us" active={location.pathname === "/travel-with-us"}>Travel With Us</MobileNavLink>
              <MobileNavLink to="/companies" active={location.pathname === "/companies"}>Companies</MobileNavLink>
            </div>
            <MobileNavLink to="/packages" active={location.pathname === "/packages"}>Upcoming Packages</MobileNavLink>
            <button className="w-full text-left px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active?: boolean }) => (
  <Link
    to={to}
    className={`text-sm font-medium ${
      active ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
    }`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active?: boolean }) => (
  <Link
    to={to}
    className={`block px-3 py-2 rounded-md text-base font-medium ${
      active ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
    }`}
  >
    {children}
  </Link>
);

export default Navbar;