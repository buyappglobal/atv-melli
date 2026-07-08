import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    id: 1,
    name: 'Carlos Martínez',
    location: 'Madrid',
    text: 'Compré el CFORCE 1000 MV para rutas extremas y no me ha decepcionado. El servicio post-venta de Talleres Melli es de otro nivel.',
    rating: 5,
    modelName: 'CFORCE 1000 MV',
    modelImage: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cde6aa3c21fac2782fb3_CFORCE_1000MV.webp'
  },
  {
    id: 2,
    name: 'Javier Domínguez',
    location: 'Asturias',
    text: 'El ZFORCE 950 SPORT es una bestia. Increíble atención de Ángel y José, te asesoran en todo antes de comprar.',
    rating: 5,
    modelName: 'ZFORCE 950 SPORT',
    modelImage: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/67d882ec3b2d6e588fa0debf_ZFORCE_950%20SPORT_Tundra%20Grey_Left%2045.webp'
  },
  {
    id: 3,
    name: 'Miguel Ángel Silva',
    location: 'Andalucía',
    text: 'Trabajo en el campo y el UFORCE 1000 ha sido la mejor inversión para la finca. Robusto y con una capacidad de carga increíble.',
    rating: 5,
    modelName: 'UFORCE 1000',
    modelImage: 'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf6e1662e561ba65d8d1_UFORCE_1000.webp'
  }
];

export function Testimonials() {
  return (
    <section className="py-24 relative" id="testimonios">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F] to-transparent z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="tech-label text-brand-orange mb-4 block">Lo que dicen nuestros clientes</span>
          <h2 className="text-4xl md:text-5xl font-extrabold italic uppercase tracking-tighter">
            Testimonios
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col"
            >
              <Quote className="absolute top-6 right-6 text-white/5" size={80} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-brand-orange text-brand-orange" />
                ))}
              </div>

              <p className="text-gray-300 italic mb-8 relative z-10 flex-grow">
                "{testimonial.text}"
              </p>

              <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-auto">
                <div>
                  <span className="block font-bold text-white uppercase tracking-widest text-sm">{testimonial.name}</span>
                  <span className="block text-brand-orange text-xs mt-1">{testimonial.location}</span>
                </div>
                
                <div className="text-right flex flex-col items-end">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Compró</span>
                  <div className="flex items-center gap-2 bg-black/30 rounded-lg p-2 border border-white/5">
                    <img 
                      src={testimonial.modelImage} 
                      alt={testimonial.modelName}
                      className="w-12 h-8 object-cover rounded bg-white/5"
                    />
                    <span className="text-xs font-bold text-gray-300">{testimonial.modelName}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
