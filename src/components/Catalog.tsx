import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, X, Gauge, ShieldCheck, Wrench, FileText } from 'lucide-react';

const catalogData = {
  CFORCE: [
    { name: 'CFORCE 1000 MV', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cde6aa3c21fac2782fb3_CFORCE_1000MV.webp', specs: { engine: '963cc V-Twin', power: '90 CV (Deslimitado)', traction: '2WD/4WD/4WD Lock', capacity: '1 Plaza', homologation: 'T3b (Tractor)' } },
    { name: 'CFORCE 1000 TOURING', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce0ac5e27c5fc6fb8871_CFORCE_1000T.webp', specs: { engine: '963cc V-Twin', power: '90 CV (Deslimitado)', traction: '2WD/4WD/4WD Lock', capacity: '2 Plazas', homologation: 'T3b / L7e' } },
    { name: 'CFORCE 1000 OVERLAND', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cdf6f255d29df1d6c910_CFORCE_1000OV.webp', specs: { engine: '963cc V-Twin', power: '90 CV (Deslimitado)', traction: '2WD/4WD/4WD Lock', capacity: '2 Plazas', homologation: 'T3b / L7e' } },
    { name: 'CFORCE 850 TOURING', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cea962a0c0a68d0697e0_CFORCE_850T.webp', specs: { engine: '800cc V-Twin', power: '75 CV (Deslimitado)', traction: '2WD/4WD/4WD Lock', capacity: '2 Plazas', homologation: 'T3b / L7e' } },
    { name: 'CFORCE 625 OVERLAND', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/67d8813294a60d904a2ed9cf_CFORCE_625%20TOURING_OVERLAND_Granite%20Ridge_Left45.webp', specs: { engine: '580cc Monocilíndrico', power: '45 CV', traction: '2WD/4WD/4WD Lock', capacity: '2 Plazas', homologation: 'T3b / L7e' } },
    { name: 'CFORCE 625 TOURING', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce84c227e2fd7ede9e5c_CFORCE_625T.webp', specs: { engine: '580cc Monocilíndrico', power: '45 CV', traction: '2WD/4WD/4WD Lock', capacity: '2 Plazas', homologation: 'T3b / L7e' } },
    { name: 'CFORCE 625', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce3ea44aa607e214b432_CFORCE_625.webp', specs: { engine: '580cc Monocilíndrico', power: '45 CV', traction: '2WD/4WD/4WD Lock', capacity: '1 Plaza', homologation: 'T3b / L7e' } },
    { name: 'CFORCE 520L', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce1a0d8b5ef424f36c49_CFORCE_520L.webp', specs: { engine: '495cc Monocilíndrico', power: '34 CV', traction: '2WD/4WD/4WD Lock', capacity: '2 Plazas', homologation: 'T3b / L7e' } },
    { name: 'CFORCE 520S', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce2809b40338817a4658_CFORCE_520S.webp', specs: { engine: '495cc Monocilíndrico', power: '34 CV', traction: '2WD/4WD/4WD Lock', capacity: '1 Plaza', homologation: 'T3b / L7e' } }
  ],
  ZFORCE: [
    { name: 'Z10 TURBO', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/680a6d43d929130486136f62_Z10_Lava%20Orange_Left45_portada_11zon.webp', specs: { engine: '998cc Tri-Cilíndrico Turbo', power: '143 CV', traction: '2WD/4WD/4WD Lock', capacity: '2 Plazas', homologation: 'Pendiente EU' } },
    { name: 'Z10-4 TURBO', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/680a6d544f20721583e44f2c_Z10-4_Lava%20Orange_Left45_portada_11zon.webp', specs: { engine: '998cc Tri-Cilíndrico Turbo', power: '143 CV', traction: '2WD/4WD/4WD Lock', capacity: '4 Plazas', homologation: 'Pendiente EU' } },
    { name: 'ZFORCE 950 SPORT', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/67d882ec3b2d6e588fa0debf_ZFORCE_950%20SPORT_Tundra%20Grey_Left%2045.webp', specs: { engine: '963cc V-Twin', power: '85 CV', traction: '2WD/4WD/4WD Lock', capacity: '2 Plazas', homologation: 'T1b / L7e' } },
    { name: 'ZFORCE 950 SPORT-4', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/684c352f207aa54c1698bbd0_ZFORCE%20950%20SPORT-4_Magma%20Red_Left%2045_2_11zon.webp', specs: { engine: '963cc V-Twin', power: '85 CV', traction: '2WD/4WD/4WD Lock', capacity: '4 Plazas', homologation: 'T1b (Tractor)' } }
  ],
  UFORCE: [
    { name: 'U10 PRO XL', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf3ae626eb901b6e6c19_UFORCE_U10XL-PRO.webp', specs: { engine: '998cc Tri-Cilíndrico', power: '82 CV', traction: '2WD/4WD/4WD Lock', capacity: '6 Plazas', homologation: 'T1b (Tractor)' } },
    { name: 'U6 EV', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6942e3857a13d2179be85fd3_UFORCE_U6-EV.webp', specs: { engine: 'Eléctrico Síncrono', power: '43 CV (Max)', traction: '2WD/4WD', capacity: '2 Plazas', homologation: 'T1b (Tractor)' } },
    { name: 'U10 PRO & Highland', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf23c5525165624900c7_UFORCE_U10-PRO.webp', specs: { engine: '998cc Tri-Cilíndrico', power: '82 CV', traction: '2WD/4WD/4WD Lock', capacity: '3 Plazas', homologation: 'T1b (Tractor)' } },
    { name: 'UFORCE 1000', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf6e1662e561ba65d8d1_UFORCE_1000.webp', specs: { engine: '963cc V-Twin', power: '71 CV', traction: '2WD/4WD/4WD Lock', capacity: '3 Plazas', homologation: 'T1b (Tractor)' } },
    { name: 'UFORCE 1000 XL', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf3ae626eb901b6e6c19_UFORCE_U10XL-PRO.webp', specs: { engine: '963cc V-Twin', power: '71 CV', traction: '2WD/4WD/4WD Lock', capacity: '6 Plazas', homologation: 'T1b (Tractor)' } },
    { name: 'UFORCE 800XL', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf23c5525165624900c7_UFORCE_U10-PRO.webp', specs: { engine: '800cc V-Twin', power: '62 CV', traction: '2WD/4WD/4WD Lock', capacity: '3 Plazas', homologation: 'T1b (Tractor)' } },
    { name: 'UFORCE 600', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf6e1662e561ba65d8d1_UFORCE_1000.webp', specs: { engine: '580cc Monocilíndrico', power: '41 CV', traction: '2WD/4WD/4WD Lock', capacity: '2 Plazas', homologation: 'T1b / T3b' } }
  ]
};

export type ModelSpec = {
  name: string;
  image: string;
  specs: {
    engine: string;
    power: string;
    traction: string;
    capacity: string;
    homologation: string;
  }
};

export function Catalog() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof catalogData>('CFORCE');
  const [selectedModel, setSelectedModel] = useState<ModelSpec | null>(null);

  useEffect(() => {
    const handleCategoryChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const category = customEvent.detail as keyof typeof catalogData;
      if (['CFORCE', 'UFORCE', 'ZFORCE'].includes(category)) {
        setActiveCategory(category);
      }
    };

    window.addEventListener('changeCatalogCategory', handleCategoryChange);
    return () => window.removeEventListener('changeCatalogCategory', handleCategoryChange);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" id="catalogo">
      <div className="absolute inset-0 bg-brand-orange/5 mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="tech-label text-brand-orange mb-4 block">Catálogo Completo 2024</span>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-[-0.04em] text-white leading-[0.9]">
            Encuentra tu <br/><span className="text-brand-orange">Máquina Perfecta</span>
          </h2>
        </motion.div>

        {/* Category Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 md:gap-8 mb-16 border-b border-white/10 pb-4 overflow-x-auto overflow-y-hidden no-scrollbar"
        >
          {(Object.keys(catalogData) as Array<keyof typeof catalogData>).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xl md:text-2xl font-bold uppercase tracking-widest transition-all whitespace-nowrap px-4 py-2 relative ${
                activeCategory === cat ? 'text-brand-orange' : 'text-zinc-600 hover:text-white'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-[-16px] left-0 right-0 h-[2px] bg-brand-orange"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Category Description */}
        <div className="min-h-[40px] mb-8">
          <AnimatePresence mode="wait">
             <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-center"
             >
                {activeCategory === 'ZFORCE' && (
                  <p className="text-gray-400 font-light max-w-2xl mx-auto text-xs md:text-sm">
                    El rendimiento bruto de la familia ZFORCE diseñado para conquistar todos los terrenos con precisión milimétrica.
                  </p>
                )}
                {activeCategory === 'UFORCE' && (
                  <p className="text-gray-400 font-light max-w-2xl mx-auto text-xs md:text-sm">
                    La serie UFORCE es tu compañera de trabajo ideal, combinando capacidad de carga y resistencia extrema.
                  </p>
                )}
                {activeCategory === 'CFORCE' && (
                  <p className="text-gray-400 font-light max-w-2xl mx-auto text-xs md:text-sm">
                    La gama CFORCE domina con versatilidad superior, lista para explorar y superar cualquier obstáculo.
                  </p>
                )}
             </motion.div>
          </AnimatePresence>
        </div>

        {/* Grid of Models */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {catalogData[activeCategory].map((model, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={model.name} 
                  onClick={() => setSelectedModel(model)}
                  className="glass flex flex-col items-center justify-between p-6 rounded-xl hover:border-brand-orange/50 hover:scale-105 hover:shadow-2xl hover:shadow-brand-orange/20 transition-all duration-300 group cursor-pointer"
                >
                  <div className="h-40 w-full flex items-center justify-center mb-6">
                    <img 
                      src={model.image || 'https://images.unsplash.com/photo-1594951473187-5735cf57662c?q=80&w=600&auto=format&fit=crop'} 
                      alt={model.name} 
                      className="max-h-full max-w-full object-contain filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                         // Fallback handler if image isn't available
                         e.currentTarget.src = 'https://images.unsplash.com/photo-1594951473187-5735cf57662c?q=80&w=600&auto=format&fit=crop';
                      }}
                    />
                  </div>
                  <div className="w-full flex flex-col items-center">
                    <span className="text-white font-bold text-center tracking-tight text-lg mb-4">{model.name}</span>
                    <button className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-brand-orange group-hover:text-white transition-colors">
                      Ver Ficha <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center text-zinc-500 text-[9px] md:text-[10px] tracking-wide">
           * Especificaciones preliminares sujetas a la homologación europea. Las versiones deslimitadas o pendientes pueden variar.
        </div>
      </div>

      {/* Internal Ficha Modal */}
      <AnimatePresence>
        {selectedModel && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6" style={{ pointerEvents: 'auto' }}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModel(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] glass bg-[#090909]/95 overflow-hidden rounded-t-3xl sm:rounded-2xl border-t sm:border border-white/10 shadow-2xl flex flex-col md:flex-row z-10"
            >
              <button 
                onClick={() => setSelectedModel(null)}
                className="absolute top-4 right-4 z-20 p-2 glass rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>

              <div className="w-full md:w-1/2 p-6 sm:p-10 flex items-center justify-center bg-white/5 relative min-h-[250px]">
                <div className="absolute inset-0 bg-brand-orange/10 mix-blend-overlay"></div>
                <img 
                  src={selectedModel.image} 
                  alt={selectedModel.name}
                  className="w-full max-h-[30vh] md:max-h-[50vh] object-contain drop-shadow-2xl relative z-10"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                     e.currentTarget.src = 'https://images.unsplash.com/photo-1594951473187-5735cf57662c?q=80&w=600&auto=format&fit=crop';
                  }}
                />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto no-scrollbar">
                <span className="tech-label text-brand-orange mb-2 block">{activeCategory} Series</span>
                <h3 className="text-3xl md:text-4xl font-extrabold uppercase tracking-[-0.04em] text-white mb-6">
                  {selectedModel.name}
                </h3>
                
                <p className="text-gray-400 font-light mb-8 leading-relaxed">
                  Especificaciones preliminares sujetas a la homologación europea. El rendimiento bruto de la familia {activeCategory} diseñado para conquistar todos los terrenos con precisión milimétrica.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                   <div className="glass p-4 rounded-lg bg-white/5">
                     <Gauge className="text-brand-orange mb-2" size={20} />
                     <div className="text-xs text-brand-orange mb-1 font-bold tracking-widest uppercase">Motor / Potencia</div>
                     <div className="text-white text-sm font-medium">{selectedModel.specs.engine} <br/> {selectedModel.specs.power}</div>
                   </div>
                   <div className="glass p-4 rounded-lg bg-white/5">
                     <ShieldCheck className="text-brand-orange mb-2" size={20} />
                     <div className="text-xs text-brand-orange mb-1 font-bold tracking-widest uppercase">Tracción</div>
                     <div className="text-white text-sm font-medium">{selectedModel.specs.traction}</div>
                   </div>
                   <div className="glass p-4 rounded-lg bg-white/5">
                     <Wrench className="text-brand-orange mb-2" size={20} />
                     <div className="text-xs text-brand-orange mb-1 font-bold tracking-widest uppercase">Capacidad</div>
                     <div className="text-white text-sm font-medium">{selectedModel.specs.capacity}</div>
                   </div>
                   <div className="glass p-4 rounded-lg bg-white/5">
                     <FileText className="text-brand-orange mb-2" size={20} />
                     <div className="text-xs text-brand-orange mb-1 font-bold tracking-widest uppercase">Homologación EU</div>
                     <div className="text-white text-sm font-medium">{selectedModel.specs.homologation}</div>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <button 
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('select-model', { 
                        detail: { family: activeCategory, model: selectedModel.name } 
                      }));
                      setSelectedModel(null);
                      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 bg-brand-orange text-white py-4 px-6 text-sm font-bold tracking-widest uppercase hover:scale-105 transition-transform text-center"
                  >
                    Solicitar Presupuesto
                  </button>
                  <button 
                    onClick={() => setSelectedModel(null)}
                    className="flex-1 border border-white/20 text-white py-4 px-6 text-sm font-bold tracking-widest uppercase hover:bg-white/5 transition-colors text-center"
                  >
                    Cerrar Ficha
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
