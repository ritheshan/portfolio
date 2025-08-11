import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const themes = {
  mercury: {
    name: 'Mercury',
    planet: '☿️',
    planetImg: '/src/assets/planets/mercury.svg',
    colors: {
      primary: 'gray',
      secondary: 'slate',
      background: 'from-gray-50 via-white to-slate-50',
      accent: 'gray-100',
      text: 'gray-900',
      textSecondary: 'gray-600',
      border: 'gray-300'
    }
  },
  venus: {
    name: 'Venus',
    planet: '♀️',
    planetImg: '/src/assets/planets/venus.svg',
    colors: {
      primary: 'yellow',
      secondary: 'amber',
      background: 'from-yellow-50 via-white to-amber-50',
      accent: 'yellow-100',
      text: 'gray-900',
      textSecondary: 'gray-600',
      border: 'yellow-300'
    }
  },
  earth: {
    name: 'Earth',
    planet: '🌍',
    planetImg: '/src/assets/planets/earth.svg',
    colors: {
      primary: 'blue',
      secondary: 'green',
      background: 'from-blue-50 via-white to-green-50',
      accent: 'blue-100',
      text: 'gray-900',
      textSecondary: 'gray-600',
      border: 'blue-300'
    }
  },
  mars: {
    name: 'Mars',
    planet: '♂️',
    planetImg: '/src/assets/planets/mars.jpeg',
    colors: {
      primary: 'red',
      secondary: 'orange',
      background: 'from-red-50 via-white to-orange-50',
      accent: 'red-100',
      text: 'gray-900',
      textSecondary: 'gray-600',
      border: 'red-300'
    }
  },
  jupiter: {
    name: 'Jupiter',
    planet: '♃',
    planetImg: '/src/assets/planets/jupiter.svg',
    colors: {
      primary: 'orange',
      secondary: 'yellow',
      background: 'from-orange-50 via-white to-yellow-50',
      accent: 'orange-100',
      text: 'gray-900',
      textSecondary: 'gray-600',
      border: 'orange-300'
    }
  },
  saturn: {
    name: 'Saturn',
    planet: '♄',
    planetImg: '/src/assets/planets/saturn1.svg',
    colors: {
      primary: 'yellow',
      secondary: 'orange',
      background: 'from-yellow-50 via-white to-orange-50',
      accent: 'yellow-100',
      text: 'gray-900',
      textSecondary: 'gray-600',
      border: 'yellow-300'
    }
  },
  uranus: {
    name: 'Uranus',
    planet: '♅',
    planetImg: '/src/assets/planets/uranus.svg',
    colors: {
      primary: 'cyan',
      secondary: 'blue',
      background: 'from-cyan-50 via-white to-blue-50',
      accent: 'cyan-100',
      text: 'gray-900',
      textSecondary: 'gray-600',
      border: 'cyan-300'
    }
  },
  neptune: {
    name: 'Neptune',
    planet: '♆',
    planetImg: '/src/assets/planets/neptune.svg',
    colors: {
      primary: 'blue',
      secondary: 'indigo',
      background: 'from-blue-50 via-white to-indigo-50',
      accent: 'blue-100',
      text: 'gray-900',
      textSecondary: 'gray-600',
      border: 'blue-300'
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('earth');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem('portfolio-theme', themeName);
    }
  };

  const toggleToNextTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    const nextTheme = themeKeys[nextIndex];
    changeTheme(nextTheme);
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    changeTheme,
    toggleToNextTheme,
    availableThemes: Object.keys(themes)
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
