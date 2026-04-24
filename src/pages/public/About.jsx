
const AboutSection = () => {
  return (
    <section className="py-32 bg-surface overflow-hidden" id="story">
      <div className="max-w-7xl mx-auto px-8">
        <div className="relative flex flex-col md:flex-row gap-20 items-center">
          
          {/* Columna de Imágenes/Visual */}
          <div className="md:w-1/2 relative">
            {/* Imagen Principal con rotación estética */}
            <div className="aspect-[4/5] bg-surface-variant rounded-lg overflow-hidden shadow-[0_8px_24px_rgba(27,28,26,0.06)] transform -rotate-3 z-10 relative">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEklcU9Cp-ocCJ8p0UpDLbDAKR1ydKU1XX7h-5l843LQG8-WWcJohrzdIcGWeIfpKaiq9G8jc4sQFqe2fdUuyIvNL1t90ahLo5hdPle8iD4mnceJlAQfHYnkcOWGWWcrOqk7CWFJg8Gm9ln4BNzfBGT0yELsXYZxYzeVQE5t3CVc-IBvYJYzp4Qr2zRP4lDsx6RBYvrhG8eoyBh1mp9xHaMBmA7qDzU6XkhszjgTQo5vF1BftR_S_9wmg0wUhkDSG9g4vioXYKOf4" 
                alt="Baker shaping dough" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Cuadro de estadísticas flotante */}
            <div className="absolute -bottom-10 -right-10 w-2/3 aspect-square bg-[#ffdcc5] rounded-lg shadow-[0_8px_24px_rgba(27,28,26,0.06)] z-20 p-8 flex items-center justify-center text-center rotate-6">
              <div>
                <div className="text-5xl font-black text-[#6f4014] mb-2">40+</div>
                <div className="text-xs uppercase tracking-widest font-bold text-[#6f4014]">
                  Years of Tradition
                </div>
              </div>
            </div>
          </div>

          {/* Columna de Texto/Contenido */}
          <div className="md:w-1/2">
            <label className="text-sm font-bold uppercase tracking-widest text-[#6f4014] mb-6 block">
              Our Heritage
            </label>
            <h2 className="text-5xl font-black tracking-tighter mb-8 leading-[1.1] text-[#1b1c1a]">
              The Ledger began with a single starter and a heavy stone oven.
            </h2>
            
            <div className="space-y-6 text-[#51443b] text-lg leading-relaxed">
              <p>
                Founded in 1984, our bakery was built on the principle that bread should be honest. 
                We don't use conditioners, accelerators, or shortcuts. Every morning, we record 
                our bakes in the ledger—a tradition that keeps us grounded in our craft.
              </p>
              <p>
                Our flour is sourced from three local family-owned mills, ensuring that every loaf 
                supports the soil it grew from. This is more than a business; it's a commitment 
                to the art of the slow bake.
              </p>
            </div>

            {/* Firma y Fundador */}
            <div className="mt-10 flex items-center gap-4">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPnExULTOP4yZE5gSkgUgG7FqvwXou8UnALVjXwY64n8ci93u5JZN1GUEXPfOfIaQOt1ENMlIbUVHp3AxJvRlyvO8Mj19WfJt0p5pWhSWl-v8RphIlXQ4KdFyMQYMe9ptTBZn7fcDxD5hOkZIbQ7KWYI7EP9xKNKC4ysEdcvacfFM7WOoqjqYjEtiRFyc8euwPxUzxyJGAfsizzFuO1TaTn9vnkrSFTYjHEoWtr6FR_XPfjdoo_X_J_KgB-1V6Bv1wZaQas7XVDsw" 
                alt="Signature" 
                className="h-16 opacity-40 grayscale"
              />
              <div>
                <div className="font-bold text-[#1b1c1a]">Elias Thorne</div>
                <div className="text-sm text-[#847469]">Master Baker & Founder</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;