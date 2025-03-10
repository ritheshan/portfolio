import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const GSAPScrollContainer = ({ children }) => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const sections = Array.isArray(children) ? children : [children];
  const totalSections = sections.length;

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Use default scroll on mobile
    
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    let ctx = gsap.context(() => {
      // Set up sections positioning
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          gsap.set(section, {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            x: index === 0 ? '0%' : '100%'
          });
        }
      });

      // Create main scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${(totalSections - 1) * 100}vh`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const newSection = Math.min(
              Math.floor(progress * totalSections),
              totalSections - 1
            );
            
            if (newSection !== currentSection) {
              setCurrentSection(newSection);
            }
          }
        }
      });

      // Add section transitions to timeline
      for (let i = 1; i < totalSections; i++) {
        const currentSectionEl = sectionsRef.current[i - 1];
        const nextSectionEl = sectionsRef.current[i];
        
        if (currentSectionEl && nextSectionEl) {
          tl.to(currentSectionEl, {
            x: '-100%',
            duration: 1,
            ease: 'power2.inOut'
          }, i - 1)
          .fromTo(nextSectionEl, 
            { x: '100%' },
            {
              x: '0%',
              duration: 1,
              ease: 'power2.inOut'
            }, 
            i - 1
          );
        }
      }

    }, container);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [totalSections, currentSection, isMobile]);

  if (isMobile) {
    // Mobile: Use standard scrolling
    return (
      <div className="w-full">
        {sections.map((section, index) => (
          <div key={index} className="w-full min-h-screen">
            {section}
          </div>
        ))}
      </div>
    );
  }

  // Desktop: Use GSAP scroll
  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden"
    >
      {sections.map((section, index) => (
        <div
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          className="w-full h-full"
        >
          {section}
        </div>
      ))}
      
      {/* Section indicators */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const targetScroll = index * window.innerHeight;
              window.scrollTo({ 
                top: targetScroll, 
                behavior: 'smooth' 
              });
            }}
            className={`
              w-3 h-3 rounded-full transition-all duration-300 border border-gray-300
              ${index === currentSection 
                ? 'bg-gray-800 scale-125 shadow-lg' 
                : 'bg-transparent hover:bg-gray-400'
              }
            `}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">
              {String(currentSection + 1).padStart(2, '0')}
            </span>
            <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-800 rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${((currentSection + 1) / totalSections) * 100}%` 
                }}
              />
            </div>
            <span className="text-sm text-gray-500">
              {String(totalSections).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GSAPScrollContainer;
