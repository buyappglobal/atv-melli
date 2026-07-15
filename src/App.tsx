import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { Contact } from './components/Contact';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, Phone, MapPin, ShieldCheck } from 'lucide-react';

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
        <Catalog />
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

      <footer className="bg-[#030614] pt-16 pb-8 border-t border-white/5 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div className="flex flex-col md:w-1/3">
            <div className="flex items-center gap-2 mb-6 text-[#1A8BBF]">
              {/* Fake logo for MELLI */}
              <div className="flex items-center font-black text-xl tracking-wider">
                <span className="text-2xl mr-1">M</span> MELLI
              </div>
            </div>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
              Pasión por la mecánica, compromiso con la excelencia. Tu taller de confianza en la provincia desde 1996.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-zinc-400 hover:text-white">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-zinc-400 hover:text-white">
                <Phone size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-zinc-400 hover:text-white">
                <MapPin size={20} />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24 w-full md:w-2/3 justify-between">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">NAVEGACIÓN</h4>
              <a href="#inicio" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors uppercase">INICIO</a>
              <a href="#servicios" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors uppercase">SERVICIOS</a>
              <a href="#contacto" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors uppercase">CONTACTO Y OFICINAS</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">HORARIOS</h4>
              <div className="flex justify-between items-center gap-8">
                <span className="text-xs text-zinc-500 font-semibold">LUN-VIE</span>
                <span className="text-sm font-bold text-white">08:30 - 13:30</span>
              </div>
              <div className="flex justify-between items-center gap-8">
                <span className="text-xs text-zinc-500 font-semibold">TARDES</span>
                <span className="text-sm font-bold text-white">15:30 - 18:30</span>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-0">SEDES</h4>
              
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-zinc-300">ARACENA (PRINCIPAL)</span>
                <div className="flex items-center gap-2 text-sm text-[#1A8BBF] font-bold">
                  <Phone size={14} /> 959 127 262
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-zinc-300">GALAROZA (CHAPA Y PINTURA)</span>
                <div className="flex items-center gap-2 text-sm text-[#1A8BBF] font-bold">
                  <Phone size={14} /> 959 12 32 83
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-zinc-300">DESGUACE (RECAMBIOS)</span>
                <div className="flex items-center gap-2 text-sm text-[#1A8BBF] font-bold">
                  <Phone size={14} /> 959 50 12 48
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xs font-semibold text-zinc-500 tracking-wide">
            <span>© 2026 TALLERES MELLI S.L. - CIF B21179353</span>
            <div className="flex gap-4 md:gap-6">
              <a href="#" className="hover:text-zinc-300 transition-colors">Aviso Legal</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Consentimiento</a>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#106AE0] tracking-widest uppercase">
            <ShieldCheck size={14} />
            SISTEMAS AUDITADOS 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
