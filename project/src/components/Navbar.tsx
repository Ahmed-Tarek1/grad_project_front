import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    console.log(`Current language: ${i18n.language}`);
  }, [i18n.language]);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-500">{t('Home')}</Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/about" active={location.pathname === "/about"}>{t('About')}</NavLink>
            <NavLink to="/services" active={location.pathname === "/services"}>{t('Services')}</NavLink>
            <NavLink to="/travels" active={location.pathname === "/travels"}>{t('Travels')}</NavLink>
            <NavLink to="/companies" active={location.pathname === "/companies"}>{t('Companies')}</NavLink>
            <NavLink to="/events" active={location.pathname === "/events"}>{t('Events')}</NavLink>
            <NavLink to="/packages" active={location.pathname === "/packages"}>{t('Upcoming Packages')}</NavLink>
            <Link to="/favorites" className={`flex items-center text-sm font-medium ${location.pathname === "/favorites" ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
              <Heart size={18} className="mr-1" />
              {t('Favorites')}
            </Link>
            <button onClick={toggleTheme} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              {theme === 'light' ? t('Dark Mode') : t('Light Mode')}
            </button>
            <button onClick={() => changeLanguage(i18n.language === 'en' ? 'ar' : 'en')} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              {i18n.language === 'en' ? t('Arabic') : t('English')}
            </button>
            <Link to="/signup" className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
              {t('Sign Up')}
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700" aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" active={location.pathname === "/"}>{t('Home')}</MobileNavLink>
            <MobileNavLink to="/about" active={location.pathname === "/about"}>{t('About')}</MobileNavLink>
            <MobileNavLink to="/services" active={location.pathname === "/services"}>{t('Services')}</MobileNavLink>
            <MobileNavLink to="/travels" active={location.pathname === "/travels"}>{t('Travels')}</MobileNavLink>
            <MobileNavLink to="/companies" active={location.pathname === "/companies"}>{t('Companies')}</MobileNavLink>
            <MobileNavLink to="/events" active={location.pathname === "/events"}>{t('Events')}</MobileNavLink>
            <Link to="/favorites" className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/favorites" ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
              <Heart size={18} className="mr-2" />
              {t('Favorites')}
            </Link>
            <Link to="/getintouch" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500">
              {t('Get in Touch')}
            </Link>
            <button onClick={toggleTheme} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500">
              {theme === 'light' ? t('Dark Mode') : t('Light Mode')}
            </button>
            <button onClick={() => changeLanguage(i18n.language === 'en' ? 'ar' : 'en')} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500">
              {i18n.language === 'en' ? t('Arabic') : t('English')}
            </button>
            <Link to="/signup" className="w-full text-left px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
              {t('Sign Up')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active?: boolean }) => (
  <Link to={to} className={`text-sm font-medium ${active ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active?: boolean }) => (
  <Link to={to} className={`block px-3 py-2 rounded-md text-base font-medium ${active ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
    {children}
  </Link>
);

export default Navbar;
