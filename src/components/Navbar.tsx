import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

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
    { name: 'Post-Venta', href: '#post-venta' },
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
          ? 'glass py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-baseline gap-2 cursor-pointer">
            <span className="text-2xl font-black tracking-tighter text-white">
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
                className="text-[11px] font-bold uppercase tracking-widest text-zinc-300 hover:text-brand-orange transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={(e: any) => handleNavClick(e, '#post-venta')}
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
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:hidden fixed inset-0 z-40 bg-[#0F0F0F]/95 backdrop-blur-xl flex flex-col justify-center items-center px-4"
        >
          <div className="flex flex-col items-center gap-8 w-full max-w-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl font-black uppercase tracking-widest text-zinc-300 hover:text-brand-orange transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={(e: any) => handleNavClick(e, '#post-venta')}
              className="mt-8 bg-brand-orange text-white px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full w-full transition-all active:scale-95"
            >
              Contacto / Taller
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
