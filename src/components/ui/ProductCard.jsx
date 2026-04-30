export default function ProductCard({ title, price, img }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group relative">
      
      {/* Imagen */}
      <div className="relative overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Etiqueta */}
        <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#3E2723] text-xs font-bold px-3 py-1 rounded-full shadow">
          Más Vendido
        </span>
      </div>

      {/* Contenido */}
      <div className="p-5 text-center">
        <h3 className="text-xl font-bold text-[#3E2723] mb-2">
          {title}
        </h3>

        <p className="text-[#D4AF37] text-2xl font-extrabold mb-3">
          S/ {price}
        </p>

        <p className="text-gray-600 text-sm leading-relaxed">
          Uno de los favoritos de nuestros clientes por su sabor artesanal y calidad premium.
        </p>
      </div>
    </div>
  );
}