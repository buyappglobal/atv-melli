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
    { name: 'Inicio', href: '#' },
    { name: 'CForce (ATV)', href: '#' },
    { name: 'UForce (Trabajo)', href: '#' },
    { name: 'ZForce (Deportivo)', href: '#' },
    { name: 'Post-Venta', href: '#' },
  ];

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
                className="text-[11px] font-bold uppercase tracking-widest text-zinc-300 hover:text-brand-orange transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center justify-center gap-2 bg-white text-black px-6 py-2 text-[11px] font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105">
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full left-0 w-full bg-zinc-900 border-b border-zinc-800"
        >
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-brand-orange px-2 py-1"
              >
                {link.name}
              </a>
            ))}
            <button className="flex justify-center items-center gap-2 bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-full w-full mt-4 transition-all hover:scale-105">
              Contacto
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
