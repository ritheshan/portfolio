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
  default: {
    name: 'Default',
    colors: {
      primary: 'blue',
      secondary: 'purple',
      background: 'from-blue-50 via-white to-purple-50',
      accent: 'blue-100',
      text: 'gray-900',
      textSecondary: 'gray-600',
      border: 'gray-300'
    }
  },
  orange: {
    name: 'Orange Sunset',
    colors: {
      primary: 'orange',
      secondary: 'red',
      background: 'from-orange-50 via-white to-red-50',
      accent: 'orange-100',
      text: 'gray-900',
      textSecondary: 'gray-600',
      border: 'orange-300'
    }
  },
  green: {
    name: 'Nature Green',
    colors: {
      primary: 'green',
      secondary: 'emerald',
      background: 'from-green-50 via-white to-emerald-50',
      accent: 'green-100',
      text: 'gray-900',
      textSecondary: 'gray-600',
      border: 'green-300'
    }
  },
  purple: {
    name: 'Purple Dream',
    colors: {
      primary: 'purple',
      secondary: 'violet',
      background: 'from-purple-50 via-white to-violet-50',
      accent: 'purple-100',
      text: 'gray-900',
      textSecondary: 'gray-600',
      border: 'purple-300'
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('default');
  
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

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    changeTheme,
    availableThemes: Object.keys(themes)
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
