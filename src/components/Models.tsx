import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Settings, Gauge, Key, X, Activity, Shield, Wrench } from 'lucide-react';

const models = [
  {
    id: 'cforce-1000t',
    name: 'CFORCE 1000 TOURING',
    category: 'ATV Premium / Máximo Rendimiento',
    image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce0ac5e27c5fc6fb8871_CFORCE_1000T.webp',
    description: 'El buque insignia de la gama. Un motor bicilíndrico en V de 963cc diseñado para superar cualquier obstáculo, ofreciendo la máxima potencia y confort en rutas largas y terrenos extremos.',
    specs: { cc: '963cc V-Twin', power: '75 CV', traction: '2WD/4WD/Lock', cargo: 'Del/Tras 100kg', susp: 'Doble Trapecio', seats: '2 Plazas bi-tono' }
  },
  {
    id: 'cforce-850t',
    name: 'CFORCE 850 TOURING',
    category: 'ATV Avanzado / Trabajo y Ruta',
    image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cea962a0c0a68d0697e0_CFORCE_850T.webp',
    description: 'El equilibrio perfecto entre rendimiento contundente y maniobrabilidad. Su motor de 800cc y la refinada suspensión independiente garantizan capacidad de trabajo pesado y adrenalina off-road.',
    specs: { cc: '800cc V-Twin', power: '65 CV', traction: '2WD/4WD/Lock', cargo: 'Del/Tras 100kg', susp: 'Doble Trapecio', seats: '2 Plazas' }
  },
  {
    id: 'cforce-625t',
    name: 'CFORCE 625 TOURING',
    category: 'ATV Polivalente',
    image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce84c227e2fd7ede9e5c_CFORCE_625T.webp',
    description: 'Agilidad y fiabilidad excepcionales. Un bloque monocilíndrico de 580cc que combina un excelente radio de giro con capacidades todoterreno serias. Perfecto para iniciarse en la aventura o el trabajo en finca.',
    specs: { cc: '580cc 1-Cil', power: '45 CV', traction: '2WD/4WD/Lock', cargo: 'Del/Tras 60kg', susp: 'Independiente', seats: '2 Plazas' }
  }
];

export function Models() {
  const [selectedModel, setSelectedModel] = useState<typeof models[0] | null>(null);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-16 md:flex justify-between items-end"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-[-0.04em] text-white leading-[0.9] mb-4">
              La Gama <span className="text-brand-orange">CFMoto</span>
            </h2>
            <p className="font-light text-gray-400 text-lg">
              Elige tu terreno. Tenemos la máquina diseñada para dominarlo. Alta ingeniería asiática con el soporte y garantías europeas.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-widest hover:text-[#FFA057] transition-colors">
            Ver catálogo completo <ArrowRight size={20} />
          </button>
        </motion.div>

        <div className="flex flex-col gap-12">
          {models.map((model, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              key={model.id} 
              className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image side */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute inset-0 bg-brand-orange/20 translate-x-4 translate-y-4 rounded-2xl -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6" />
                <div className="overflow-hidden rounded-2xl glass aspect-[4/3]">
                  <img 
                    src={model.image} 
                    alt={model.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-6 left-6">
                    <span className="text-5xl md:text-6xl font-extrabold italic opacity-90 uppercase tracking-tighter text-white">{model.name}</span>
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className="w-full lg:w-1/2">
                <span className="tech-label text-brand-orange mb-4 block">{model.category}</span>
                <h3 className="text-3xl font-extrabold text-white mb-4 uppercase tracking-[-0.02em]">Domina tu entorno</h3>
                <p className="font-light text-gray-400 text-lg mb-8 leading-relaxed">
                  {model.description}
                </p>

                {/* Specs Grid - Visual alternative to tables */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {Object.entries(model.specs).map(([key, value]) => {
                    const icons: Record<string, any> = { cc: Gauge, power: Settings, traction: Settings, cargo: Settings, susp: Settings, seats: Key };
                    const Icon = icons[key] || Settings;
                    const labels: Record<string, string> = { cc: 'Motor', power: 'Potencia', traction: 'Tracción', cargo: 'Carga', susp: 'Suspensión', seats: 'Capacidad' };
                    return (
                      <div key={key} className="glass p-4 rounded-lg">
                        <Icon className="text-brand-orange mb-3" size={24} />
                        <div className="tech-label mb-1 opacity-70">{labels[key]}</div>
                        <div className="text-white font-bold text-sm">{value}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button className="w-full sm:w-auto bg-brand-orange text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
                    Ver {model.name}
                  </button>
                  <button 
                    onClick={() => setSelectedModel(model)}
                    className="w-full sm:w-auto border border-white/20 px-8 py-4 text-xs font-bold uppercase tracking-widest hover:glass transition-all active:scale-95"
                  >
                    Ficha Técnica
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-8"
          >
            <div 
              className="absolute inset-0 bg-[#0F0F0F]/90 backdrop-blur-md"
              onClick={() => setSelectedModel(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="glass border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 rounded-t-3xl sm:rounded-2xl flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setSelectedModel(null)}
                className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-brand-orange text-white p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-auto relative bg-[#0F0F0F]">
                <img 
                  src={selectedModel.image} 
                  alt={selectedModel.name}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 pr-6">
                  <span className="text-2xl sm:text-3xl font-extrabold italic uppercase tracking-tighter text-white">{selectedModel.name}</span>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                <span className="tech-label text-brand-orange mb-4 block">Ficha Técnica Completa</span>
                <p className="text-gray-400 font-light mb-8 text-sm leading-relaxed">
                  {selectedModel.description}
                </p>

                <div className="space-y-4">
                   {Object.entries(selectedModel.specs).map(([key, value]) => {
                    const icons: Record<string, any> = { cc: Gauge, power: Activity, traction: Settings, cargo: Shield, susp: Wrench, seats: Key };
                    const Icon = icons[key] || Settings;
                    const labels: Record<string, string> = { cc: 'Motor', power: 'Potencia', traction: 'Tracción', cargo: 'Capacidad de Carga', susp: 'Suspensión', seats: 'Plazas' };
                    return (
                      <div key={key} className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                           <div className="bg-white/5 p-2 rounded-lg">
                             <Icon size={18} className="text-brand-orange" />
                           </div>
                           <span className="text-gray-300 font-medium text-sm">{labels[key]}</span>
                        </div>
                        <span className="text-white font-bold text-sm text-right">{value}</span>
                      </div>
                    );
                  })}
                </div>
                
                <button 
                  onClick={() => {
                    setSelectedModel(null);
                    document.getElementById('post-venta')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-8 bg-brand-orange text-white w-full py-4 text-xs font-bold uppercase tracking-widest transition-all hover:scale-105"
                >
                  Solicitar Oferta
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
