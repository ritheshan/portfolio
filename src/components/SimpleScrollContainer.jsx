import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SimpleScrollContainer = ({ children }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  
  const sections = Array.isArray(children) ? children : [children];
  const totalSections = sections.length;

  // Handle wheel scrolling with better threshold
  const handleWheel = (e) => {
    if (isScrolling) return;
    
    e.preventDefault();
    
    const deltaY = e.deltaY;
    const threshold = 10; // Lower threshold for more responsive scrolling
    
    if (Math.abs(deltaY) > threshold) {
      if (deltaY > 0 && currentSection < totalSections - 1) {
        // Scroll down
        setCurrentSection(prev => prev + 1);
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 1000);
      } else if (deltaY < 0 && currentSection > 0) {
        // Scroll up
        setCurrentSection(prev => prev - 1);
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 1000);
      }
    }
  };

  // Handle touch scrolling
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (isScrolling) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    const threshold = 50;
    
    if (Math.abs(deltaY) > threshold) {
      if (deltaY > 0 && currentSection < totalSections - 1) {
        setCurrentSection(prev => prev + 1);
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 1000);
      } else if (deltaY < 0 && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 1000);
      }
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (isScrolling) return;
    
    if ((e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') && currentSection < totalSections - 1) {
      e.preventDefault();
      setCurrentSection(prev => prev + 1);
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 1000);
    } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentSection > 0) {
      e.preventDefault();
      setCurrentSection(prev => prev - 1);
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
      window.addEventListener('keydown', handleKeyDown);
      
      // Focus container for keyboard events
      container.focus();
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentSection, isScrolling, totalSections]);

  // Slide transition variants for smooth animations
  const slideVariants = {
    enter: {
      x: '100%',
      opacity: 0
    },
    center: {
      x: '0%',
      opacity: 1
    },
    exit: {
      x: '-100%',
      opacity: 0
    }
  };

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-hidden relative focus:outline-none bg-white"
      tabIndex={0}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 10
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth feel
          }}
          className="absolute inset-0 w-full h-full"
        >
          {sections[currentSection]}
        </motion.div>
      </AnimatePresence>

      {/* Scroll hint for first visit */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="text-gray-400 text-sm flex flex-col items-center space-y-2"
          >
            <span>Scroll to explore</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SimpleScrollContainer;
