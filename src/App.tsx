import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Models } from './components/Models';
import { Catalog } from './components/Catalog';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="offroad-gradient min-h-screen text-white font-sans selection:bg-brand-orange/30 selection:text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-orange origin-left z-[100]"
        style={{ scaleX }}
      />
      <Navbar />
      <main>
        <Hero />
        <Models />
        <Catalog />
        <Testimonials />
        <Contact />
      </main>
      
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-brand-orange text-white rounded-full shadow-2xl shadow-brand-orange/20 hover:scale-110 transition-transform focus:outline-none"
            aria-label="Volver arriba"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="glass py-8 border-t border-white/5 px-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto flex-col md:flex-row gap-6">
          <div className="flex flex-col text-center md:text-left">
             <span className="tech-label opacity-70">Stack Tecnológico</span>
             <span className="text-[11px] font-bold mt-1 text-gray-400">React + Tailwind + Headless CMS Preview</span>
          </div>
          <div className="flex flex-col items-center md:items-end">
             <span className="tech-label opacity-70">SEO Strategy</span>
             <span className="text-[10px] italic text-gray-400 mt-1">#CFMotoEspaña #AtvMelli #OutdoorAdrenaline</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
