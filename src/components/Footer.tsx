import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Travel</h3>
            <p className="text-gray-400 mb-6">
              Book your trip in minutes, get full control for much longer.
            </p>
            <div className="flex space-x-4">
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Instagram} />
              <SocialIcon Icon={Youtube} />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <FooterLink>About</FooterLink>
              <FooterLink>Careers</FooterLink>
              <FooterLink>Mobile</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <FooterLink>Help/FAQ</FooterLink>
              <FooterLink>Press</FooterLink>
              <FooterLink>Partners</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">More</h4>
            <ul className="space-y-4">
              <FooterLink>Travel Guide</FooterLink>
              <FooterLink>Destinations</FooterLink>
              <FooterLink>Blog</FooterLink>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ Icon }: { Icon: React.ElementType }) => (
  <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors">
    <Icon size={20} />
  </a>
);

const FooterLink = ({ children }: { children: React.ReactNode }) => (
  <li>
    <a href="#" className="text-gray-400 hover:text-white transition-colors">
      {children}
    </a>
  </li>
);

export default Footer;