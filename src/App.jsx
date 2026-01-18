import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import TerminalUI from './components/TerminalUI';
import SimpleScrollContainer from './components/SimpleScrollContainer';
import BlogList from './blog/BlogList';
import BlogPost from './blog/BlogPost';

function Home({ isTerminalMode, toggleTerminalMode }) {
  return (
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
            <Footer />
          </SimpleScrollContainer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [isTerminalMode, setIsTerminalMode] = useState(false);

  const toggleTerminalMode = () => {
    setIsTerminalMode(!isTerminalMode);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Navbar 
            onTerminalToggle={toggleTerminalMode} 
            isTerminalMode={isTerminalMode} 
          />
          
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  isTerminalMode={isTerminalMode} 
                  toggleTerminalMode={toggleTerminalMode} 
                />
              } 
            />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
