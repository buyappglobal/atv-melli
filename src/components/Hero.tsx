import { motion } from 'motion/react';
import { ArrowRight, Mountain, ShieldCheck, Wrench } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Hero() {
  const [textState, setTextState] = useState<'hidden' | 'visible_temp' | 'hidden_again' | 'visible_permanent'>('hidden');

  useEffect(() => {
    // Show after 5 seconds
    const t1 = setTimeout(() => setTextState('visible_temp'), 5000);
    // Hide 5 seconds after showing
    const t2 = setTimeout(() => setTextState('hidden_again'), 10000);
    
    // The video is ~43 seconds long. Show permanently when it loops.
    const t3 = setTimeout(() => setTextState('visible_permanent'), 43000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const wrapperVariants = {
    hidden: { opacity: 0, filter: 'blur(10px)', scale: 0.95 },
    visible_temp: { opacity: 1, filter: 'blur(0px)', scale: 1 },
    hidden_again: { opacity: 0, filter: 'blur(10px)', scale: 1.05 },
    visible_permanent: { opacity: 1, filter: 'blur(0px)', scale: 1 }
  };

  return (
    <div id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0F0F0F]">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <iframe 
          src="https://www.youtube.com/embed/Ipc7kuuCGHQ?autoplay=1&mute=1&controls=0&loop=1&playlist=Ipc7kuuCGHQ&modestbranding=1&showinfo=0&rel=0&disablekb=1&playsinline=1" 
          title="CFMoto Background Video" 
          allow="autoplay; encrypted-media" 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-90"
          style={{ width: 'max(120vw, 213.33vh)', height: 'max(67.5vw, 120vh)' }}
          frameBorder="0"
        ></iframe>
        <div className="absolute inset-0 bg-[#0F0F0F]/0 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/40 to-transparent md:w-[60%] pointer-events-none" />
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        variants={wrapperVariants}
        initial="hidden"
        animate={textState}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              boxShadow: ["0px 0px 0px rgba(242,125,38,0)", "0px 0px 12px rgba(242,125,38,0.6)", "0px 0px 0px rgba(242,125,38,0)"],
              borderColor: ["rgba(242,125,38,0.2)", "rgba(242,125,38,0.8)", "rgba(242,125,38,0.2)"],
              color: ["#F27D26", "#FFFFFF", "#F27D26"]
            }}
            transition={{ 
              duration: 0.5,
              boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              borderColor: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              color: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 glass rounded border tech-label mb-1.5 text-[7px] md:text-[8px]"
          >
            <motion.span 
              animate={{ 
                backgroundColor: ["#F27D26", "#FFFFFF", "#F27D26"],
                scale: [1, 1.5, 1]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 h-1 rounded-full" 
            />
            Concesionario Oficial CFMoto en España
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm md:text-base font-extrabold text-white leading-[1.1] tracking-tight uppercase mb-1.5"
          >
            <span className="text-brand-orange text-lg md:text-xl block mb-0.5">CFMOTO</span>
            Fuerza Bruta para el <br className="hidden md:block"/><span className="text-brand-orange">Trabajo.</span>
            <br />
            Adrenalina en el <span className="text-white">Ocio.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[8px] md:text-[9px] font-light text-gray-300 mb-3 max-w-sm leading-relaxed"
          >
            Descubre la gama CFMoto en ATV Melli. Desde los incansables UForce para el campo, hasta los salvajes ZForce para conquistar cualquier ruta. Rendimiento asegurado por Grupo Melli Automoción.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-2 w-full"
          >
            <button 
              onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-brand-orange text-white px-3 py-1.5 text-[7px] md:text-[8px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
            >
              Ver Catálogo Completo
            </button>
            <button 
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto border border-white/20 px-3 py-1.5 text-[7px] md:text-[8px] font-bold uppercase tracking-widest hover:glass transition-all active:scale-95"
            >
              Solicitar Información
            </button>
          </motion.div>
        </div>

        {/* Quick Features Row */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-8 pt-4 border-t border-white/10"
        >
          <div className="flex items-start gap-2 glass p-2 rounded-lg">
            <div className="text-brand-orange">
              <Mountain size={14} />
            </div>
            <div>
              <h3 className="text-[8px] md:text-[9px] font-bold tracking-wider uppercase mb-0.5 text-white">Versatilidad Total</h3>
              <p className="text-[7px] md:text-[8px] font-light text-gray-400 leading-relaxed">Modelos diseñados para el barro, la roca y labores agrícolas.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 glass p-2 rounded-lg">
            <div className="text-brand-orange">
              <ShieldCheck size={14} />
            </div>
            <div>
              <h3 className="text-[8px] md:text-[9px] font-bold tracking-wider uppercase mb-0.5 text-white">Garantía Grupo Melli</h3>
              <p className="text-[7px] md:text-[8px] font-light text-gray-400 leading-relaxed">Respaldo de un grupo líder. Fiabilidad y soporte asegurados.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 glass p-2 rounded-lg">
            <div className="text-brand-orange">
              <Wrench size={14} />
            </div>
            <div>
              <h3 className="text-[8px] md:text-[9px] font-bold tracking-wider uppercase mb-0.5 text-white">Servicio Técnico Oficial</h3>
              <p className="text-[7px] md:text-[8px] font-light text-gray-400 leading-relaxed">Taller especializado CFMoto y recambios originales.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
