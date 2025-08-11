import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalUI from './components/TerminalUI';
import SimpleScrollContainer from './components/SimpleScrollContainer';

function App() {
  const [isTerminalMode, setIsTerminalMode] = useState(false);

  const toggleTerminalMode = () => {
    setIsTerminalMode(!isTerminalMode);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white">
        <Navbar 
          onTerminalToggle={toggleTerminalMode} 
          isTerminalMode={isTerminalMode} 
        />
        
        <AnimatePresence mode="wait">
          {isTerminalMode ? (
            <motion.div
              key="terminal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TerminalUI isVisible={true} onClose={toggleTerminalMode} />
            </motion.div>
          ) : (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SimpleScrollContainer>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
                <Footer />
              </SimpleScrollContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;
