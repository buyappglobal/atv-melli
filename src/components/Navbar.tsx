import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'CForce (ATV)', href: '#cforce' },
    { name: 'UForce (Trabajo)', href: '#uforce' },
    { name: 'ZForce (Deportivo)', href: '#zforce' },
  ];

  const handleNavClick = (e: any, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Si es una de las categorías del catálogo, disparamos evento y bajamos al catálogo
    if (['#cforce', '#uforce', '#zforce'].includes(href)) {
      const category = href.replace('#', '').toUpperCase();
      window.dispatchEvent(new CustomEvent('changeCatalogCategory', { detail: category }));
      
      const catalogEl = document.getElementById('catalogo');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const el = document.getElementById(href.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0F0F0F]/80 backdrop-blur-md border-b border-white/5 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-baseline gap-2 cursor-pointer">
            <span className="text-2xl font-black tracking-tighter text-white drop-shadow-md">
              ATV<span className="text-brand-orange">MELLI</span>
            </span>
            <span className="hidden sm:block text-[10px] opacity-40 uppercase tracking-widest font-bold border-l border-white/20 pl-2 ml-2">
              Grupo Melli Automoción
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-[11px] font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors group py-1"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/34647799983"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-[#25D366] hover:scale-110 transition-transform"
              title="Contactar por WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </a>
            <button 
              onClick={(e: any) => handleNavClick(e, '#contacto')}
              className="hidden sm:flex items-center justify-center gap-2 bg-white text-black px-6 py-2 text-[11px] font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105"
            >
              Contacto
            </button>
            <button
              className="lg:hidden text-zinc-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
            animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
            exit={{ opacity: 0, clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col justify-center items-center px-6 before:content-[''] before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] before:opacity-20 before:pointer-events-none"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col items-start gap-6 w-full max-w-sm relative z-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="relative text-3xl font-black uppercase tracking-widest text-zinc-300 hover:text-white transition-all group w-full border-b border-white/5 pb-2 flex items-center justify-between"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-[-10px] duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-brand-orange group-hover:w-full transition-all duration-300 ease-out"></span>
                </motion.a>
              ))}
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e: any) => handleNavClick(e, '#contacto')}
                className="mt-6 bg-brand-orange text-white px-8 py-4 text-sm font-black uppercase tracking-[0.2em] w-full transition-all active:scale-95 flex justify-center items-center gap-3 shadow-[0_0_20px_rgba(242,125,38,0.3)] hover:shadow-[0_0_30px_rgba(242,125,38,0.5)] border border-brand-orange/50 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">Contacto / Taller</span>
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
