import { useState, useEffect, useRef } from 'react';
import { Mail, Package, ArrowRight, ChevronDown, CheckCircle } from 'lucide-react';

const MODELS_DATA = {
  'CFORCE': [
    { name: 'CFORCE 1000 MV', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cde6aa3c21fac2782fb3_CFORCE_1000MV.webp' },
    { name: 'CFORCE 1000 TOURING', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce0ac5e27c5fc6fb8871_CFORCE_1000T.webp' },
    { name: 'CFORCE 1000 OVERLAND', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cdf6f255d29df1d6c910_CFORCE_1000OV.webp' },
    { name: 'CFORCE 850 TOURING', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cea962a0c0a68d0697e0_CFORCE_850T.webp' },
    { name: 'CFORCE 625 OVERLAND', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/67d8813294a60d904a2ed9cf_CFORCE_625%20TOURING_OVERLAND_Granite%20Ridge_Left45.webp' },
    { name: 'CFORCE 625 TOURING', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce84c227e2fd7ede9e5c_CFORCE_625T.webp' },
    { name: 'CFORCE 625', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce3ea44aa607e214b432_CFORCE_625.webp' },
    { name: 'CFORCE 520L', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce1a0d8b5ef424f36c49_CFORCE_520L.webp' },
    { name: 'CFORCE 520S', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce2809b40338817a4658_CFORCE_520S.webp' }
  ],
  'ZFORCE': [
    { name: 'Z10 TURBO', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/680a6d43d929130486136f62_Z10_Lava%20Orange_Left45_portada_11zon.webp' },
    { name: 'Z10-4 TURBO', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/680a6d544f20721583e44f2c_Z10-4_Lava%20Orange_Left45_portada_11zon.webp' },
    { name: 'ZFORCE 950 SPORT', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/67d882ec3b2d6e588fa0debf_ZFORCE_950%20SPORT_Tundra%20Grey_Left%2045.webp' },
    { name: 'ZFORCE 950 SPORT-4', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/684c352f207aa54c1698bbd0_ZFORCE%20950%20SPORT-4_Magma%20Red_Left%2045_2_11zon.webp' }
  ],
  'UFORCE': [
    { name: 'U10 PRO XL', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf3ae626eb901b6e6c19_UFORCE_U10XL-PRO.webp' },
    { name: 'U6 EV', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6942e3857a13d2179be85fd3_UFORCE_U6-EV.webp' },
    { name: 'U10 PRO & Highland', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf23c5525165624900c7_UFORCE_U10-PRO.webp' },
    { name: 'UFORCE 1000', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf6e1662e561ba65d8d1_UFORCE_1000.webp' },
    { name: 'UFORCE 1000 XL', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf3ae626eb901b6e6c19_UFORCE_U10XL-PRO.webp' },
    { name: 'UFORCE 800XL', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf23c5525165624900c7_UFORCE_U10-PRO.webp' },
    { name: 'UFORCE 600', image: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf6e1662e561ba65d8d1_UFORCE_1000.webp' }
  ]
};

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function Contact() {
  const [family, setFamily] = useState<keyof typeof MODELS_DATA | ''>('');
  const [model, setModel] = useState('');
  const [name, setName] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleSelectModel = (e: CustomEvent) => {
      setFamily(e.detail.family);
      setModel(e.detail.model);
    };

    window.addEventListener('select-model', handleSelectModel as EventListener);
    return () => window.removeEventListener('select-model', handleSelectModel as EventListener);
  }, []);

  const generateMessage = () => {
    return `prueba atv melli\n\nHola, soy ${name || 'un cliente'}.\nMotivo: Información sobre un vehículo\nVehículo: ${family} - ${model}\n\nMe gustaría recibir más información.`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(generateMessage());
    const phone = "34611436949";
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank');
    showSuccess();
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Solicitud CFMOTO - Información de Vehículo`);
    const body = encodeURIComponent(generateMessage());
    const emails = "angel@talleresmelli.com,jose@talleresmelli.com";
    const url = `mailto:${emails}?subject=${subject}&body=${body}`;
    window.open(url, '_blank');
    showSuccess();
  };

  const showSuccess = () => {
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFamily('');
      setModel('');
      setName('');
    }, 5000);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="contacto">
      <div className="absolute inset-0 bg-[#0F0F0F] z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-orange/5 z-0" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold italic uppercase tracking-tighter">
            Solicita <span className="text-brand-orange">Información</span>
          </h2>
          <p className="mt-4 text-gray-400 font-light max-w-2xl mx-auto">
            Selecciona el modelo de vehículo que te interesa para que podamos ofrecerte todos los detalles y opciones disponibles.
          </p>
        </div>

        <div className="glass p-6 sm:p-8 md:p-12 rounded-2xl border border-white/10">
          <div className="space-y-8">
            {/* Step 1: Vehicle Selection */}
            <div>
              <span className="tech-label mb-4 block">1. Selecciona tu Vehículo</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl p-4 text-gray-200 focus:outline-none focus:border-brand-orange transition-colors"
                  value={family}
                  onChange={(e) => {
                    setFamily(e.target.value as keyof typeof MODELS_DATA);
                    setModel('');
                  }}
                >
                  <option value="">Familia / Gama...</option>
                  {Object.keys(MODELS_DATA).map(fam => (
                    <option key={fam} value={fam}>{fam}</option>
                  ))}
                </select>

                <div className="relative" ref={dropdownRef}>
                  <button
                    className={`w-full bg-[#1A1A1A] border rounded-xl p-4 text-left flex items-center justify-between transition-colors ${!family ? 'opacity-50 cursor-not-allowed border-white/10' : isDropdownOpen ? 'border-brand-orange' : 'border-white/10 hover:border-white/30'} text-gray-200 focus:outline-none`}
                    onClick={() => family && setIsDropdownOpen(!isDropdownOpen)}
                    disabled={!family}
                  >
                    {model ? (
                      <div className="flex items-center gap-3">
                        <img 
                          src={family && MODELS_DATA[family].find(m => m.name === model)?.image} 
                          alt={model} 
                          className="w-10 h-6 object-cover rounded"
                        />
                        <span>{model}</span>
                      </div>
                    ) : (
                      <span>Modelo específico...</span>
                    )}
                    <ChevronDown size={20} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && family && (
                    <div className="absolute z-20 w-full mt-2 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto no-scrollbar">
                      {MODELS_DATA[family].map((m) => (
                        <button
                          key={m.name}
                          onClick={() => {
                            setModel(m.name);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-4 p-3 hover:bg-white/5 transition-colors ${model === m.name ? 'bg-brand-orange/10 text-brand-orange' : 'text-gray-200'}`}
                        >
                          <img src={m.image} alt={m.name} className="w-14 h-9 object-cover rounded bg-black/20" />
                          <span className="font-medium text-sm">{m.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Name and Send */}
            {model && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-6">
                <div>
                  <span className="tech-label mb-4 block">2. Tus Datos</span>
                  <input
                    type="text"
                    placeholder="Tu nombre (opcional)"
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl p-4 text-gray-200 focus:outline-none focus:border-brand-orange transition-colors"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="pt-4 border-t border-white/10 relative">
                  {isSent ? (
                    <div className="flex flex-col items-center justify-center p-6 text-green-400 bg-green-400/10 rounded-xl border border-green-400/20 animate-in fade-in zoom-in duration-300">
                      <CheckCircle size={48} className="mb-4" />
                      <span className="font-bold uppercase tracking-widest text-lg mb-2">¡Mensaje Preparado!</span>
                      <span className="text-sm text-center text-green-400/80">Se ha abierto tu aplicación seleccionada. En breve estaremos en contacto contigo.</span>
                    </div>
                  ) : (
                    <>
                      <span className="text-gray-400 text-sm mb-4 block text-center">Selecciona cómo prefieres enviar tu consulta:</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Botón WhatsApp (preferido en móvil) */}
                        <button
                          onClick={handleWhatsApp}
                          className={`flex items-center justify-center gap-3 py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${isMobile ? 'bg-[#25D366] text-white hover:bg-[#20bd5a] order-first' : 'bg-transparent border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10'}`}
                        >
                          <WhatsAppIcon size={20} />
                          Enviar por WhatsApp
                        </button>
                        
                        {/* Botón Email (preferido en PC) */}
                        <button
                          onClick={handleEmail}
                          className={`flex items-center justify-center gap-3 py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${!isMobile ? 'bg-brand-orange text-white hover:scale-[1.02] order-first' : 'bg-transparent border border-brand-orange text-brand-orange hover:bg-brand-orange/10'}`}
                        >
                          <Mail size={20} />
                          Enviar por Email
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
