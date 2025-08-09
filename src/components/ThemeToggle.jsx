import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themes } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { currentTheme, changeTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeIcons = {
    default: '🌊',
    orange: '🌅',
    green: '🌿',
    purple: '🌸'
  };

  const handleThemeChange = (themeName) => {
    changeTheme(themeName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xl">
          {themeIcons[currentTheme]}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute top-12 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-2 min-w-[200px] z-50"
          >
            <div className="text-sm font-medium text-gray-700 px-3 py-2 border-b border-gray-100">
              Choose Theme
            </div>
            <div className="space-y-1 mt-2">
              {availableThemes.map((themeName) => (
                <motion.button
                  key={themeName}
                  onClick={() => handleThemeChange(themeName)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors duration-200 ${
                    currentTheme === themeName
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                  whileHover={{ x: 2 }}
                >
                  <span className="text-lg">{themeIcons[themeName]}</span>
                  <span className="text-sm font-medium">{themes[themeName].name}</span>
                  {currentTheme === themeName && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 bg-blue-600 rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
