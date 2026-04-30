// src/pages/public/About.jsx
const AboutSection = () => {
  return (
    <section className="py-32 bg-artisan-neutral overflow-hidden" id="story">
      <div className="max-w-7xl mx-auto px-8">
        <div className="relative flex flex-col md:flex-row gap-20 items-center">
          
          {/* Columna de Imágenes/Visual */}
          <div className="md:w-1/2 relative">
            {/* Imagen Principal */}
            <div className="aspect-[4/5] bg-artisan-tertiary/20 rounded-lg overflow-hidden shadow-xl transform -rotate-3 z-10 relative border-8 border-white">
              <img 
                src="src/assets/PasteleríaFinaBriselli.png" // Aquí pondrás la foto de su local antiguo o producción
                alt="Tradición en Pastelería Briselli" 
                className="w-full h-full"
              />
            </div>
            
            <div className="absolute -bottom-10 -right-10 w-2/3 aspect-square bg-artisan-secondary rounded-lg shadow-2xl z-20 p-8 flex items-center justify-center text-center rotate-6">
              <div>
                <div className="text-5xl font-black text-white mb-2">30+</div>
                <div className="text-xs uppercase tracking-widest font-bold text-white">
                  Años de Dulce Tradición
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <label className="text-sm font-bold uppercase tracking-widest text-artisan-secondary mb-6 block">
              Nuestra Herencia
            </label>
            <h2 className="text-5xl font-black tracking-tighter mb-8 leading-[1.1] text-artisan-primary">
              Desde 1994, endulzando los momentos especiales de Lima.
            </h2>
            
            <div className="space-y-6 text-artisan-dark text-lg leading-relaxed">
              <p>
                <strong>Pastelería Fina Briselli</strong> nació hace tres décadas con un sueño familiar: 
                crear postres que no solo se vean bien, sino que transmitan el calor de un hogar. 
                Desde nuestra primera sede en Los Olivos, nos hemos dedicado a perfeccionar el arte 
                de la pastelería fina.
              </p>
              <p>
                Lo que comenzó como una pequeña vitrina de sueños se ha convertido en un referente del 
                cono norte. Nuestra promesa sigue siendo la misma: utilizar ingredientes de la más 
                alta calidad y mantener ese toque artesanal que nos diferencia de las grandes industrias.
              </p>
              <p className="italic font-medium">
                "Cada torta que sale de nuestro horno lleva consigo la dedicación de manos expertas 
                y el compromiso de ser parte de tus celebraciones más memorables."
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-16 w-16 bg-artisan-dark rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                B
              </div>
              <div>
                <div className="font-bold text-artisan-primary">Familia Briselli</div>
                <div className="text-sm text-artisan-tertiary font-semibold uppercase">Tradición y Calidad</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;