import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, X, Gauge, ShieldCheck, Wrench, FileText, Scale } from 'lucide-react';

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
  const [isComparing, setIsComparing] = useState(false);
  const [compareList, setCompareList] = useState<ModelSpec[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        // Navbar is ~56px high when scrolled (32px content + 12px py * 2).
        setIsStuck(rect.top <= 57);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (compareList.length === 2) {
      setShowCompareModal(true);
    }
  }, [compareList]);

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
    <section className="py-24 relative" id="catalogo">
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
        <div 
          ref={headerRef}
          className={`sticky top-[56px] z-40 transition-all duration-300 mb-16 ${
            isStuck 
              ? 'bg-transparent backdrop-blur-sm pt-2 pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8' 
              : 'pt-0'
          }`}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-3 sm:gap-4 transition-all duration-300"
          >
            <div className={`flex justify-center w-full overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 shrink-0 ${isStuck ? 'pb-0' : 'pb-1 md:pb-0'}`}>
              {(Object.keys(catalogData) as Array<keyof typeof catalogData>).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-bold uppercase tracking-widest transition-all whitespace-nowrap rounded-full shrink-0 border ${
                    isStuck 
                      ? 'text-[10px] px-3 py-1.5' 
                      : 'text-xs sm:text-sm md:text-base px-4 py-2 sm:px-6 sm:py-3'
                  } ${
                    activeCategory === cat 
                      ? 'bg-brand-orange border-brand-orange text-white shadow-[0_0_15px_rgba(242,125,38,0.4)] scale-105' 
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <button
               onClick={() => {
                 setIsComparing(!isComparing);
                 if (isComparing) setCompareList([]);
               }}
               className={`flex items-center gap-1.5 rounded-full font-bold uppercase tracking-widest transition-all whitespace-nowrap shrink-0 ${
                  isStuck 
                    ? 'text-[9px] px-3 py-1.5' 
                    : 'text-[10px] md:text-xs px-6 py-2'
               } ${
                  isComparing ? 'bg-brand-orange text-white' : 'glass text-zinc-300 hover:text-white hover:bg-white/10'
               }`}
            >
               <Scale size={isStuck ? 12 : 16} />
               {isComparing ? (isStuck ? 'Cancelar' : 'Cancelar Comparativa') : (isStuck ? 'Comparar' : 'Comparar Modelos')}
            </button>
          </motion.div>
        </div>

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
                  onClick={() => {
                    if (isComparing) {
                      if (compareList.find(m => m.name === model.name)) {
                        setCompareList(prev => prev.filter(m => m.name !== model.name));
                      } else if (compareList.length < 2) {
                        setCompareList(prev => [...prev, model]);
                      }
                    } else {
                      setSelectedModel(model);
                    }
                  }}
                  className={`glass flex flex-col items-center justify-between p-6 rounded-xl transition-all duration-300 group cursor-pointer ${
                    isComparing && compareList.find(m => m.name === model.name) 
                      ? 'border-brand-orange ring-2 ring-brand-orange scale-105 shadow-2xl shadow-brand-orange/20' 
                      : 'hover:border-brand-orange/50 hover:scale-105 hover:shadow-2xl hover:shadow-brand-orange/20'
                  }`}
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
                    <button className={`flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest transition-colors ${
                      isComparing && compareList.find(m => m.name === model.name)
                        ? 'text-white'
                        : 'text-brand-orange group-hover:text-white'
                    }`}>
                      {isComparing ? (
                         compareList.find(m => m.name === model.name) ? 'Seleccionado' : 'Añadir a comparar'
                      ) : (
                         <>Ver Ficha <ChevronRight size={14} /></>
                      )}
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

      {/* Compare Modal */}
      <AnimatePresence>
        {showCompareModal && compareList.length === 2 && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6" style={{ pointerEvents: 'auto' }}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                 setShowCompareModal(false);
                 setCompareList([]);
                 setIsComparing(false);
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl max-h-[90dvh] sm:max-h-[85vh] glass bg-[#090909]/95 overflow-hidden rounded-t-3xl sm:rounded-2xl border-t sm:border border-white/10 shadow-2xl flex flex-col z-10"
            >
              <button 
                onClick={() => {
                   setShowCompareModal(false);
                   setCompareList([]);
                   setIsComparing(false);
                }}
                className="absolute top-4 right-4 z-20 p-2 glass rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>

              <div className="p-6 sm:p-8 text-center border-b border-white/10 shrink-0">
                <span className="tech-label text-brand-orange mb-2 block">Comparativa</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">Batalla de Modelos</h3>
              </div>

              <div className="flex flex-row flex-1 overflow-y-auto min-h-0 bg-black/40 pb-24 sm:pb-0">
                {compareList.map((model, idx) => (
                  <div key={idx} className={`w-1/2 p-3 sm:p-10 flex flex-col ${idx === 0 ? 'border-r border-white/10' : ''}`}>
                    <div className="h-28 sm:h-48 flex items-center justify-center mb-4 sm:mb-8 bg-white/5 rounded-xl p-2 sm:p-4 relative shrink-0">
                       <div className="absolute inset-0 bg-brand-orange/5 mix-blend-overlay rounded-xl"></div>
                       <img src={model.image} alt={model.name} className="max-h-full object-contain relative z-10 drop-shadow-2xl" />
                    </div>
                    <div className="min-h-[48px] sm:min-h-[64px] flex items-center justify-center mb-4 sm:mb-8">
                      <h4 className="text-sm sm:text-2xl font-black uppercase tracking-tight text-white text-center leading-tight">{model.name}</h4>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-4 flex-1">
                       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center glass p-3 sm:p-4 rounded-lg bg-white/5 border border-white/5">
                         <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-0 justify-center sm:justify-start">
                            <Gauge className="text-brand-orange hidden sm:block" size={16} />
                            <span className="text-[9px] sm:text-xs text-brand-orange uppercase font-bold tracking-widest">Motor</span>
                         </div>
                         <span className="text-[10px] sm:text-sm text-white text-center sm:text-right font-medium leading-tight">{model.specs.engine}<br/>{model.specs.power}</span>
                       </div>
                       
                       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center glass p-3 sm:p-4 rounded-lg bg-white/5 border border-white/5">
                         <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-0 justify-center sm:justify-start">
                            <ShieldCheck className="text-brand-orange hidden sm:block" size={16} />
                            <span className="text-[9px] sm:text-xs text-brand-orange uppercase font-bold tracking-widest">Tracción</span>
                         </div>
                         <span className="text-[10px] sm:text-sm text-white text-center sm:text-right font-medium leading-tight">{model.specs.traction}</span>
                       </div>

                       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center glass p-3 sm:p-4 rounded-lg bg-white/5 border border-white/5">
                         <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-0 justify-center sm:justify-start">
                            <Wrench className="text-brand-orange hidden sm:block" size={16} />
                            <span className="text-[9px] sm:text-xs text-brand-orange uppercase font-bold tracking-widest">Capacidad</span>
                         </div>
                         <span className="text-[10px] sm:text-sm text-white text-center sm:text-right font-medium leading-tight">{model.specs.capacity}</span>
                       </div>

                       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center glass p-3 sm:p-4 rounded-lg bg-white/5 border border-white/5">
                         <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-0 justify-center sm:justify-start">
                            <FileText className="text-brand-orange hidden sm:block" size={16} />
                            <span className="text-[9px] sm:text-xs text-brand-orange uppercase font-bold tracking-widest">Homolog.</span>
                         </div>
                         <span className="text-[10px] sm:text-sm text-white text-center sm:text-right font-medium leading-tight">{model.specs.homologation}</span>
                       </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('select-model', { 
                          detail: { family: activeCategory, model: model.name } 
                        }));
                        setShowCompareModal(false);
                        setCompareList([]);
                        setIsComparing(false);
                        document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-6 sm:mt-8 bg-brand-orange text-white py-3 sm:py-4 px-2 sm:px-6 text-[10px] sm:text-sm font-bold tracking-widest uppercase hover:scale-105 transition-transform text-center rounded-lg w-full shrink-0"
                    >
                      <span className="sm:hidden">Elegir</span>
                      <span className="hidden sm:inline">Me quedo con este</span>
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
