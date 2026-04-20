import { motion } from 'motion/react';
import { ArrowRight, Mountain, ShieldCheck, Wrench } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe 
          src="https://www.youtube.com/embed/Ipc7kuuCGHQ?autoplay=1&mute=1&controls=0&loop=1&playlist=Ipc7kuuCGHQ&modestbranding=1&showinfo=0&rel=0&disablekb=1" 
          title="CFMoto Background Video" 
          allow="autoplay; encrypted-media" 
          className="w-[150vw] h-[150vh] sm:w-[120vw] sm:h-[120vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60"
          frameBorder="0"
        ></iframe>
        <div className="absolute inset-0 bg-[#0F0F0F]/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent md:w-[60%] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded border border-brand-orange/20 tech-label text-brand-orange mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            Concesionario Oficial CFMoto en España
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-[80px] font-extrabold text-white leading-[0.9] tracking-[-0.04em] uppercase mb-6"
          >
            Fuerza Bruta para el <br className="hidden md:block"/><span className="text-brand-orange">Trabajo.</span>
            <br />
            Pura Adrenalina en el <span className="text-white">Ocio.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl font-light text-gray-400 mb-10 max-w-2xl leading-relaxed"
          >
            Descubre la gama CFMoto en ATV Melli. Desde los incansables UForce para el campo, hasta los salvajes ZForce para conquistar cualquier ruta. Rendimiento asegurado por Grupo Melli Automoción.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="bg-brand-orange text-white px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:scale-105">
              Ver Catálogo CFMoto
            </button>
            <button className="border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:glass transition-all">
              Agenda tu Prueba
            </button>
          </motion.div>
        </div>

        {/* Quick Features Row */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 pt-10 border-t border-white/10"
        >
          <div className="flex items-start gap-4 glass p-6 rounded-lg">
            <div className="text-brand-orange">
              <Mountain size={28} />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase mb-1 text-white">Versatilidad Total</h3>
              <p className="text-xs font-light text-gray-400 leading-relaxed">Modelos diseñados para el barro, la roca y las labores agrícolas más exigentes.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 glass p-6 rounded-lg">
            <div className="text-brand-orange">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase mb-1 text-white">Garantía Grupo Melli</h3>
              <p className="text-xs font-light text-gray-400 leading-relaxed">El respaldo de un grupo automoción líder. Fiabilidad y soporte asegurados.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 glass p-6 rounded-lg">
            <div className="text-brand-orange">
              <Wrench size={28} />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase mb-1 text-white">Servicio Técnico Oficial</h3>
              <p className="text-xs font-light text-gray-400 leading-relaxed">Taller especializado CFMoto y stock permanente de recambios originales.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
