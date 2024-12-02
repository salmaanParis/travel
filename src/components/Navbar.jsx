import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@/components/Button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
    }

    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    }, 100);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 shadow-md' : 'bg-transparent'}`}>
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src="/videos/your-video-file.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <span 
              onClick={() => scrollToSection('#home')}
              className={`text-2xl font-bold cursor-pointer ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            >
              <img 
                src="/toplogo.png" 
                alt="Toptal Logo"
                className="h-28 w-auto" 
              />
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {[
                { name: 'Home', section: '#home' },
                { name: 'Destinations', section: '#featureDestination' },
                { name: 'Services', section: '#services' },
                { name: 'About Us', section: '#about' },
                { name: 'Contact', section: '#contact' }
              ].map((item) => (
                <div 
                  key={item.name}
                  onClick={() => scrollToSection(item.section)}
                  className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${isScrolled ? 'text-gray-800 hover:bg-gray-200' : 'text-white hover:bg-white hover:bg-opacity-20'}`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop Book Now Button */}
          <div className="hidden md:block">
            <Button className={isScrolled ? 'bg-primary text-white' : 'text-primary'}>
              Book Now
            </Button>
          </div>
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${isScrolled ? 'text-gray-800 hover:bg-gray-200' : 'text-white hover:bg-white hover:bg-opacity-20'}`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50">
          <div className="p-4">
            <div className="flex justify-end">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4 mt-8">
              {[
                { name: 'Home', section: '#home' },
                { name: 'Destinations', section: '#featureDestination' },
                { name: 'Services', section: '#services' },
                { name: 'About Us', section: '#about' },
                { name: 'Contact', section: '#contact' }
              ].map((item) => (
                <div
                  key={item.name}
                  onClick={() => scrollToSection(item.section)}
                  className="block px-4 py-3 text-xl text-gray-800 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;