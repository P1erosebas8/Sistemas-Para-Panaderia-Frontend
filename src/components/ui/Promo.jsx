export default function PromoBanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#3E2723] to-[#5D4037] text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 md:p-16 text-center shadow-2xl border border-white/20">
          
          <span className="inline-block bg-[#D4AF37] text-[#3E2723] text-sm font-bold px-4 py-2 rounded-full mb-6">
            Promoción Especial
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Celebra el Día de la Madre con un sabor inolvidable
          </h2>

          
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Disfruta descuentos exclusivos en pasteles y postres especiales
            hechos con amor para sorprender a mamá.
          </p>

          
          <div className="mb-8">
            <p className="text-2xl font-bold text-[#D4AF37]">
              Hasta 20% de descuento en pedidos seleccionados
            </p>
          </div>

          <p className="text-sm text-gray-300 mt-6">
            Promoción válida por tiempo limitado.
          </p>
        </div>
      </div>
    </section>
  );
}