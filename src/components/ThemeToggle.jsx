import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import mercuryImg from '../assets/planets/mercury.svg';
import venusImg from '../assets/planets/venus.svg';
import earthImg from '../assets/planets/earth.svg';
import marsImg from '../assets/planets/mars.jpeg';
import jupiterImg from '../assets/planets/jupiter.svg';
import saturnImg from '../assets/planets/saturn1.svg';
import uranusImg from '../assets/planets/uranus.svg';
import neptuneImg from '../assets/planets/neptune.svg';

const ThemeToggle = () => {
  const { theme, toggleToNextTheme } = useTheme();

  return (
    <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 group">
      {/* Invisible clickable area */}
      <motion.button
        onClick={toggleToNextTheme}
        className="w-full h-full bg-transparent border-none p-0 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={`Current: ${theme.name} - Click to switch`}
      >
        <motion.img
          src={{
            Mercury: mercuryImg,
            Venus: venusImg,
            Earth: earthImg,
            Mars: marsImg,
            Jupiter: jupiterImg,
            Saturn: saturnImg,
            Uranus: uranusImg,
            Neptune: neptuneImg
          }[theme.name]}
          alt={theme.name}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: 'linear'
          }}
          className="max-w-full max-h-full object-contain pointer-events-none"
          key={theme.name}
        />
      </motion.button>

      {/* Tooltip */}
      <motion.div
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10"
        initial={{ opacity: 0, y: 5 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        {theme.name}
      </motion.div>
    </div>
  );
};

export default ThemeToggle;
