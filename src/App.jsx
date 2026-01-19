import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "./lib/firebase";
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
  const [profileViews, setProfileViews] = useState(0);

  const toggleTerminalMode = () => {
    setIsTerminalMode(!isTerminalMode);
  };

  // Track global profile views
  useEffect(() => {
    const ref = doc(db, "stats", "profile");

    const track = async () => {
      try {
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          await setDoc(ref, { views: 1 });
          setProfileViews(1);
        } else {
          await updateDoc(ref, { views: increment(1) });
          const data = snap.data();
          setProfileViews(data.views + 1);
        }
      } catch (error) {
        console.error("Error tracking profile views:", error);
      }
    };

    track();
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Navbar 
            onTerminalToggle={toggleTerminalMode} 
            isTerminalMode={isTerminalMode}
            profileViews={profileViews}
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
