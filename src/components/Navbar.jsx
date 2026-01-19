import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NAV_SECTIONS, SITE_CONFIG } from '../constants';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ onTerminalToggle, isTerminalMode, profileViews }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';
  
  // Check if we're on a blog page
  const isBlogPage = location.pathname.startsWith('/blog');

  // Handle navigation to section
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    
    if (isHomePage) {
      // If on home page, just scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to home with hash
      navigate(`/#${sectionId}`);
    }
  };

  // Scroll to section after navigation
  useEffect(() => {
    if (location.hash && isHomePage) {
      const sectionId = location.hash.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location, isHomePage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const sections = NAV_SECTIONS.map(section => section.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
if (isTerminalMode) return null;
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${isBlogPage ? 'relative' : 'fixed'} z-[100] w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 shadow-lg backdrop-blur-sm border-b border-gray-200' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <motion.span 
            className="text-xl font-bold text-gray-900 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {SITE_CONFIG.name}<span className="text-blue-600">.</span>
          </motion.span>
          {profileViews > 0 && (
            <span className="flex items-center gap-1 text-sm text-gray-500 font-medium">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                />
              </svg>
              {profileViews}
            </span>
          )}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-8 md:flex">
          {NAV_SECTIONS.map((section) => (
            <motion.a
              key={section.id}
              href={`/#${section.id}`}
              onClick={(e) => handleSectionClick(e, section.id)}
              className={`relative font-medium transition-colors duration-200 ${
                activeSection === section.id && isHomePage
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {section.label}
              {activeSection === section.id && isHomePage && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                  layoutId="activeSection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.a>
          ))}
          
          {/* Blog Link */}
          <Link
            to="/blog"
            className="relative font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <motion.span
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="inline-block"
            >
              Blog
            </motion.span>
          </Link>
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Terminal Toggle Button */}
          {onTerminalToggle && (
            <motion.button
              onClick={onTerminalToggle}
              className={`relative p-2 rounded-lg transition-colors duration-200 ${
                isTerminalMode
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isTerminalMode ? 'Exit Terminal Mode' : 'Enter Terminal Mode'}
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" 
                />
              </svg>
              {isTerminalMode && (
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            whileTap={{ scale: 0.95 }}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 py-2 space-y-1">
            {NAV_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`/#${section.id}`}
                className={`block py-2 px-3 rounded-lg text-base font-medium transition-colors ${
                  activeSection === section.id && isHomePage
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={(e) => {
                  handleSectionClick(e, section.id);
                  setMobileMenuOpen(false);
                }}
              >
                {section.label}
              </a>
            ))}
            
            {/* Blog Link - Mobile */}
            <Link
              to="/blog"
              className="block py-2 px-3 rounded-lg text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              📝 Blog
            </Link>
            
            {onTerminalToggle && (
              <motion.button
                onClick={() => {
                  onTerminalToggle();
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left py-2 px-3 rounded-lg text-base font-medium transition-colors ${
                  isTerminalMode
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {isTerminalMode ? '⚡ Exit Terminal' : '💻 Terminal Mode'}
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
