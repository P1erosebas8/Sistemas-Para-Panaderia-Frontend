import { useState } from "react";

const pasteles = [
  // ── TORTAS CLÁSICAS ──────────────────────────────────────────────
  {
    id: 1,
    categoria: "Tortas Clásicas",
    nombre: "Torta Negra de Chocolate",
    precio: 115,
    porciones: "8–10 personas",
    etiqueta: "Más Vendido",
    descripcion: "Tres generosas capas de bizcocho húmedo elaborado con cacao 70% de origen, separadas por ganache de chocolate amargo y cubiertas con buttercream de vainilla de Madagascar. Intensa y elegante.",
    notas: "Cacao intenso, avellana, vainilla",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    categoria: "Tortas Clásicas",
    nombre: "Red Velvet con Cream Cheese",
    precio: 105,
    porciones: "8–10 personas",
    etiqueta: null,
    descripcion: "Suaves capas carmesí de bizcocho de cacao con un toque de buttermilk, intercaladas con frosting sedoso de queso crema Philadelphia y vainilla real. Un clásico sureño que nunca decepciona.",
    notas: "Cacao suave, queso crema, vainilla",
    img: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    categoria: "Tortas Clásicas",
    nombre: "Torta de Zanahoria y Nuez",
    precio: 92,
    porciones: "8–10 personas",
    etiqueta: null,
    descripcion: "Bizcocho jugoso aromatizado con canela de Ceilán, nuez moscada y jengibre, repleto de zanahoria rallada y nueces pecanas tostadas. Cubierto con generoso frosting de queso crema.",
    notas: "Canela, jengibre, queso crema",
    img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    categoria: "Tortas Clásicas",
    nombre: "Selva Negra",
    precio: 98,
    porciones: "8–10 personas",
    etiqueta: "Nuevo",
    descripcion: "El clásico alemán: capas de bizcocho de chocolate empapadas en kirsch, rellenas de Chantilly fresca y cerezas Amarena importadas, decoradas con virutas de chocolate negro.",
    notas: "Cereza, chocolate amargo, kirsch",
    img: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    categoria: "Tortas Clásicas",
    nombre: "Torta de Vainilla y Fresas",
    precio: 88,
    porciones: "8–10 personas",
    etiqueta: null,
    descripcion: "Delicado bizcocho génoise de vainilla de Tahití con relleno de crema diplomática y fresas frescas de temporada. Cubierta con merengue italiano y decoración de frutas naturales.",
    notas: "Vainilla Tahití, fresa fresca, crema",
    img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    categoria: "Tortas Clásicas",
    nombre: "Pastel Ópera",
    precio: 125,
    porciones: "10–12 personas",
    etiqueta: "Artesanal",
    descripcion: "El símbolo de la repostería francesa: capas alternas de bizcocho Joconde de almendra empapado en espresso, buttercream de café Arabica y ganache de chocolate 66%.",
    notas: "Café Arabica, almendra, chocolate negro",
    img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    categoria: "Tortas Clásicas",
    nombre: "Torta de Tres Leches",
    precio: 88,
    porciones: "10–12 personas",
    etiqueta: "Favorita",
    descripcion: "Bizcocho esponjoso empapado en mezcla de leche evaporada, leche condensada y crema de leche. Coronado con merengue suizo tostado y canela en polvo.",
    notas: "Tres leches, merengue, canela",
    img: "https://images.unsplash.com/photo-1673974798330-23e8f4c9ae05?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    categoria: "Tortas Clásicas",
    nombre: "Chiffon de Limón",
    precio: 82,
    porciones: "8–10 personas",
    etiqueta: null,
    descripcion: "Bizcocho extraordinariamente etéreo elaborado con claras montadas a punto de nieve y ralladura de limón. Glaseado con lemon curd brillante y Chantilly de limón.",
    notas: "Limón, vainilla, textura aerada",
    img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800",
  },

  // ── TARTAS Y PASTELES FINOS ───────────────────────────────────────
  {
    id: 9,
    categoria: "Tartas y Pasteles Finos",
    nombre: "Tarta de Frutas del Bosque",
    precio: 95,
    porciones: "6–8 personas",
    etiqueta: "Nuevo",
    descripcion: "Base sablée bretona crujiente, crema pastelera de vainilla de Madagascar y corona de moras, frambuesas y arándanos frescos. Acabado con nappage brillante.",
    notas: "Frutos rojos, vainilla, mantequilla",
    img: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 10,
    categoria: "Tartas y Pasteles Finos",
    nombre: "Cheesecake New York",
    precio: 98,
    porciones: "8–10 personas",
    etiqueta: "Más Vendido",
    descripcion: "Auténtico estilo Nueva York: base de galleta Graham, relleno denso y cremoso de queso crema Philadelphia y vainilla. Horneado a baño maría.",
    notas: "Queso crema, vainilla, limón",
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 11,
    categoria: "Tartas y Pasteles Finos",
    nombre: "Tarta de Limón y Merengue",
    precio: 78,
    porciones: "6–8 personas",
    etiqueta: null,
    descripcion: "Base sablée, lemon curd intenso preparado con limones de Sicilia, recubierto de generoso merengue italiano tostado al soplete. Equilibrio entre acidez y dulzor.",
    notas: "Limón Sicilia, merengue italiano, mantequilla",
    img: "https://www.splenda.com/wp-content/uploads/2020/05/lemon-meringue-pie-scaled.jpg",
  },
  {
    id: 12,
    categoria: "Tartas y Pasteles Finos",
    nombre: "Tarta de Chocolate y Caramelo",
    precio: 88,
    porciones: "6–8 personas",
    etiqueta: null,
    descripcion: "Masa quebrada de cacao, ganache de chocolate 72% y capa de caramelo salado hecho con mantequilla de Normandía. Finalizada con flor de sal marina.",
    notas: "Chocolate 72%, caramelo, flor de sal",
    img: "https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 13,
    categoria: "Tartas y Pasteles Finos",
    nombre: "Tiramisú Clásico",
    precio: 82,
    porciones: "8–10 personas",
    etiqueta: null,
    descripcion: "Receta italiana auténtica: savoiardi empapados en espresso doble, capas de crema de mascarpone con marsala seco y cacao puro de Holanda.",
    notas: "Espresso, mascarpone, cacao Holanda",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800",
  },

  // ── PASTELERÍA INDIVIDUAL ─────────────────────────────────────────
  {
    id: 17,
    categoria: "Pastelería Individual",
    nombre: "Éclair de Chocolate",
    precio: 18,
    porciones: "1 unidad",
    etiqueta: null,
    descripcion: "Masa choux aireada y crujiente, rellena de crema pastelera de chocolate amargo infusionada con espresso y cubierta con glasé brillante de chocolate negro.",
    notas: "Chocolate, café, crema pastelera",
    img: "https://images.aws.nestle.recipes/resized/69acec9dbef59c252adb76fc126c58df_eclairs-de-chocolate-negro-70-_1290_742.jpg",
  },
  {
    id: 18,
    categoria: "Pastelería Individual",
    nombre: "Croissant de Mantequilla",
    precio: 15,
    porciones: "1 unidad",
    etiqueta: null,
    descripcion: "81 capas de hojaldre laminado con mantequilla de Normandía. Fermentado en frío por 48 horas para desarrollar aroma. Dorado y crujiente.",
    notas: "Mantequilla Normandía, trigo, levadura",
    img: "https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&q=80&w=800",
  },

  // ── TORTAS ESPECIALES ─────────────────────────────────────────────
  {
    id: 27,
    categoria: "Tortas Especiales",
    nombre: "Torta de Lúcuma y Manjar",
    precio: 105,
    porciones: "8–10 personas",
    etiqueta: "Sabor Peruano",
    descripcion: "Capas de bizcocho de lúcuma fresca, rellenas con manjar blanco artesanal de Cajamarca y cubiertas con ganache de chocolate de leche con polvo de lúcuma.",
    notas: "Lúcuma, manjar blanco, chocolate leche",
    img: "https://cdnx.jumpseller.com/pasteleria-francesa1/image/25951729/PAsteleria_julio2022-6.jpg?1659047919",
  },
  {
    id: 28,
    categoria: "Tortas Especiales",
    nombre: "Drip Cake de Vainilla",
    precio: 135,
    porciones: "12–15 personas",
    etiqueta: "Celebración",
    descripcion: "Espectacular torta de celebración: cuatro capas de bizcocho de vainilla con buttercream, cobertura de ganache blanca y efecto drip de chocolate negro.",
    notas: "Vainilla, buttercream, ganache blanca",
    img: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=800",
  },

  // ── POSTRES DE TEMPORADA ──────────────────────────────────────────
  {
    id: 38,
    categoria: "Temporada",
    nombre: "Pavlova Tropical",
    precio: 95,
    porciones: "8–10 personas",
    etiqueta: "Temporada",
    descripcion: "Merengue crujiente por fuera y suave por dentro. Coronado con Chantilly y una explosión de frutas tropicales frescas: mango, maracuyá y kiwi.",
    notas: "Merengue, Chantilly, frutas tropicales",
    img: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 40,
    categoria: "Temporada",
    nombre: "Tronco Navideño",
    precio: 145,
    porciones: "10–12 personas",
    etiqueta: "Edición Limitada",
    descripcion: "Bizcocho suizo de chocolate enrollado con mousse de castañas y ganache de chocolate negro, cubierto con textura de corteza nevada.",
    notas: "Castañas, chocolate negro, merengue",
    img: "https://i.ytimg.com/vi/peYSZayrP7c/maxresdefault.jpg",
  },
];

const categorias = ["Todas", ...Array.from(new Set(pasteles.map(p => p.categoria)))];

const etiquetaColor = {
  "Más Vendido":     { bg: "#ffdcbd", text: "#6b3800" },
  "Nuevo":           { bg: "#d1f0d9", text: "#165128" },
  "Artesanal":       { bg: "#e8d5f5", text: "#5a2d82" },
  "Tropical":        { bg: "#fff3cd", text: "#7a5500" },
  "Favorita":        { bg: "#fce4ec", text: "#7b003a" },
  "Sabor Peruano":   { bg: "#fff8e1", text: "#c84b00" },
  "Celebración":     { bg: "#ddeeff", text: "#0a3d7a" },
  "Edición Limitada":{ bg: "#ede7f6", text: "#3e1a7a" },
  "Temporada":       { bg: "#e8f5e9", text: "#1a5c26" },
};

export default function Pasteles() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [pastelSeleccionado, setPastelSeleccionado] = useState(null);

  const filtrados = pasteles.filter(p => 
    categoriaActiva === "Todas" || p.categoria === categoriaActiva
  );

  const gruposPorCategoria = Array.from(new Set(pasteles.map(p => p.categoria)));

  const mostrarBento = categoriaActiva === "Todas";
  const itemsBento = pasteles.slice(0, 4);
  const itemsRestantes = mostrarBento ? pasteles.slice(4) : filtrados;

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] font-sans selection:bg-[#ffdcc5] selection:text-[#663100]">
      <main className="pt-24 pb-24 px-6 sm:px-8 max-w-7xl mx-auto">
        
        {/* ── Hero Header Section ── */}
        <header className="mb-16 sm:mb-20 flex flex-col md:flex-row gap-8 sm:gap-12 items-end">
          <div className="flex-1">
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#6f4014] opacity-70 block mb-4">
              La Colección de Masa y Fuego
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-[#1b1c1a] leading-[0.95] sm:leading-[0.9]">
              Elaborado con <span className="text-[#944a00] italic font-serif font-medium pr-2">Paciencia</span>
              <br className="hidden sm:block" /> y Fuego.
            </h1>
          </div>
          <div className="max-w-xs text-[#51443b] text-base sm:text-lg leading-relaxed mb-2 sm:mb-4 italic">
             Nuestro horneado diario es un tributo a las artes antiguas. {pasteles.length} creaciones disponibles hoy — sin atajos, sin aditivos artificiales.
          </div>
        </header>

        {/* ── Category Filter Chips (Centrados) ── */}
        <div className="flex flex-nowrap sm:flex-wrap sm:justify-center gap-3 sm:gap-4 mb-20 overflow-x-auto pb-4 scrollbar-hide">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`cursor-pointer whitespace-nowrap px-6 sm:px-8 py-3 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 active:scale-95 ${
                categoriaActiva === cat
                  ? "bg-[#6f4014] text-white shadow-[0_8px_24px_rgba(111,64,20,0.2)]"
                  : "bg-[#f5f3ef] text-[#6f4014] hover:bg-[#eae8e4]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Bento Grid (Solo visible en "Todas") ── */}
        {mostrarBento && itemsBento.length >= 4 && (
          <section className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-24">
            
            {/* Destacado 1: Vertical Grande */}
            <div className="sm:col-span-12 md:col-span-5 flex flex-col h-full">
              <div className="bg-[#f5f3ef] rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
                <div className="aspect-4/5 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none" />
                  <img 
                    alt={itemsBento[0].nombre} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105" 
                    src={itemsBento[0].img} 
                  />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col bg-[#f5f3ef] z-20">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <div>
                      {itemsBento[0].etiqueta && (
                         <span className="px-3 py-1.5 bg-[#ffdcbd] text-[#623f18] rounded-full text-[10px] font-black uppercase tracking-[0.15em] mb-3 inline-block">
                           {itemsBento[0].etiqueta}
                         </span>
                      )}
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#6f4014] leading-tight">
                        {itemsBento[0].nombre}
                      </h3>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-[#944a00] shrink-0 mt-1">
                      S/ {itemsBento[0].precio}
                    </span>
                  </div>
                  <p className="text-[#51443b] text-base leading-relaxed line-clamp-3 flex-1 mb-4">
                    {itemsBento[0].descripcion}
                  </p>
                  
                  {/* Botones de acción Bento Vertical */}
                  <GrupoBotones pastel={itemsBento[0]} onAbrirModal={setPastelSeleccionado} />
                </div>
              </div>
            </div>

            {/* Columna Derecha (Destacados 2, 3 y 4) */}
            <div className="sm:col-span-12 md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Destacado 2 */}
              <div className="bg-[#f5f3ef] rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
                <div className="aspect-square overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/5 pointer-events-none z-10" />
                  <img alt={itemsBento[1].nombre} className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105" src={itemsBento[1].img} />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between bg-[#f5f3ef] z-20">
                  <div>
                    <div className="flex justify-between items-baseline mb-2 gap-2">
                      <h4 className="text-lg font-bold text-[#6f4014] leading-tight">{itemsBento[1].nombre}</h4>
                      <span className="text-base font-bold text-[#944a00] shrink-0">S/ {itemsBento[1].precio}</span>
                    </div>
                    <p className="text-[13px] text-[#51443b] mb-4 leading-relaxed italic line-clamp-2">
                      {itemsBento[1].descripcion}
                    </p>
                  </div>
                  <GrupoBotones pastel={itemsBento[1]} onAbrirModal={setPastelSeleccionado} />
                </div>
              </div>

              {/* Destacado 3 */}
              <div className="bg-[#f5f3ef] rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
                <div className="aspect-square overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/5 pointer-events-none z-10" />
                  <img alt={itemsBento[2].nombre} className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105" src={itemsBento[2].img} />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between bg-[#f5f3ef] z-20">
                  <div>
                    <div className="flex justify-between items-baseline mb-2 gap-2">
                      <h4 className="text-lg font-bold text-[#6f4014] leading-tight">{itemsBento[2].nombre}</h4>
                      <span className="text-base font-bold text-[#944a00] shrink-0">S/ {itemsBento[2].precio}</span>
                    </div>
                    <p className="text-[13px] text-[#51443b] mb-4 leading-relaxed italic line-clamp-2">
                      {itemsBento[2].descripcion}
                    </p>
                  </div>
                  <GrupoBotones pastel={itemsBento[2]} onAbrirModal={setPastelSeleccionado} />
                </div>
              </div>

              {/* Destacado 4: Horizontal Ancho */}
              <div className="sm:col-span-2 bg-[#f5f3ef] rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/5 pointer-events-none z-10" />
                  <img alt={itemsBento[3].nombre} className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105" src={itemsBento[3].img} />
                </div>
                <div className="md:w-1/2 p-6 sm:p-8 flex flex-col bg-[#f5f3ef] z-20">
                  {itemsBento[3].etiqueta && (
                    <span className="px-3 py-1.5 bg-[#d1f0d9] text-[#165128] rounded-full text-[10px] font-black uppercase tracking-[0.15em] mb-4 self-start">
                      {itemsBento[3].etiqueta}
                    </span>
                  )}
                  <h4 className="text-2xl font-bold text-[#6f4014] mb-2 leading-tight">
                    {itemsBento[3].nombre}
                  </h4>
                  <p className="text-[#51443b] text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                    {itemsBento[3].descripcion}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-2xl font-bold text-[#944a00] pr-4">S/ {itemsBento[3].precio}</span>
                    <div className="w-full md:w-auto flex-1">
                      <GrupoBotones pastel={itemsBento[3]} onAbrirModal={setPastelSeleccionado} bgOscuro />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ── Grid Dinámico (Catálogo general) ── */}
        {categoriaActiva === "Todas"
          ? gruposPorCategoria.map(cat => {
              const grupo = itemsRestantes.filter(p => p.categoria === cat);
              if (grupo.length === 0) return null;
              return <Seccion key={cat} titulo={cat} items={grupo} onAbrirModal={setPastelSeleccionado} />;
            })
          : <Seccion titulo={categoriaActiva} items={filtrados} onAbrirModal={setPastelSeleccionado} />
        }

        {/* ── Seasonal Highlight Section ── */}
        <section className="mt-24 sm:mt-32 p-8 sm:p-12 md:p-16 bg-[#835b31] rounded-3xl flex flex-col md:flex-row gap-12 sm:gap-16 items-center text-[#ffdab8] relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
          
          <div className="flex-1 order-2 md:order-1 z-10">
            <span className="text-[10px] uppercase tracking-[0.22em] font-bold opacity-60 block mb-4">Edición Limitada · Solo hasta agotar stock</span>
            <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-[1.05] tracking-tight">
              Torta de Lúcuma<br className="hidden sm:block"/> y Maracuyá
            </h2>
            <p className="text-base sm:text-lg mb-10 opacity-90 max-w-md leading-relaxed font-medium">
              Nuestra creación estrella de temporada: mousse de lúcuma de Huamachuco sobre base crujiente de praliné, con insert de maracuyá fresco y cobertura dorada. Un homenaje a los sabores del Perú.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <span className="text-3xl sm:text-4xl font-light tracking-tight">S/ 138</span>
              <svg 
                className="w-8 h-8 opacity-70 group-hover:translate-x-2 transition-transform duration-300" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
              <button className="cursor-pointer px-8 py-3.5 bg-white text-[#6f4014] rounded-xl font-black uppercase tracking-[0.15em] text-xs sm:text-sm shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
                Reservar Ahora
              </button>
            </div>
          </div>
          
          <div className="flex-1 order-1 md:order-2 w-full z-10">
            <div className="rounded-2xl overflow-hidden shadow-2xl rotate-2 transition-transform duration-700 ease-out group-hover:rotate-0 group-hover:scale-[1.02]">
              <img alt="Torta de Lúcuma y Maracuyá" className="w-full aspect-4/3 object-cover" src="https://brigams.pe/wp-content/uploads/FRONTAL-CON-PEDESTAL-4-scaled-e1627313204442.jpg" />
            </div>
          </div>
        </section>
      </main>

      {/* ── MODAL PROPORCIONAL DE DETALLES ── */}
      <ModalPastel pastel={pastelSeleccionado} onClose={() => setPastelSeleccionado(null)} />

    </div>
  );
}

// ── Componentes Auxiliares ──

function Seccion({ titulo, items, onAbrirModal }) {
  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#1b1c1a] whitespace-nowrap">{titulo}</h2>
        <div className="flex-1 h-px bg-[#d6c3b6]/60" />
        <span className="text-xs text-[#a08070] font-bold uppercase tracking-wider whitespace-nowrap">{items.length} {items.length === 1 ? "item" : "items"}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {items.map(pastel => (
          <TarjetaPastel key={pastel.id} pastel={pastel} onAbrirModal={onAbrirModal} />
        ))}
      </div>
    </div>
  );
}

// ── TARJETA INDIVIDUAL DE PRODUCTO ──
function TarjetaPastel({ pastel, onAbrirModal }) {
  const colores = pastel.etiqueta ? etiquetaColor[pastel.etiqueta] : null;

  return (
    <div className="bg-[#f5f3ef] rounded-2xl overflow-hidden shadow-sm flex flex-col h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div className="aspect-4/3 overflow-hidden relative">
        <div className="absolute inset-0 bg-black/5 pointer-events-none z-10" />
        <img alt={pastel.nombre} className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105" src={pastel.img} />
        <div className="absolute bottom-3 left-3 z-20 bg-[#1b1c1a]/70 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
          {pastel.porciones}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col bg-[#f5f3ef] z-20">
        <div>
          <div className="flex justify-between items-start mb-2 gap-2">
            <div>
              {pastel.etiqueta && colores && (
                <span className="px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] mb-2 inline-block" style={{ backgroundColor: colores.bg, color: colores.text }}>
                  {pastel.etiqueta}
                </span>
              )}
              <h4 className="text-lg font-bold text-[#6f4014] leading-tight">{pastel.nombre}</h4>
            </div>
            <span className="text-base font-bold text-[#944a00] shrink-0 mt-0.5">S/ {pastel.precio}</span>
          </div>
          <p className="text-[13px] text-[#51443b] mb-4 leading-relaxed italic line-clamp-2">
            {pastel.descripcion}
          </p>
        </div>
        
        <GrupoBotones pastel={pastel} onAbrirModal={onAbrirModal} />
      </div>
    </div>
  );
}

// ── COMPONENTE DE BOTONES PARA CARDS ──
function GrupoBotones({ pastel, onAbrirModal, bgOscuro = false }) {
  const [agregado, setAgregado] = useState(false);
  
  const handleAgregar = () => {
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1500);
  };

  const btnAñadirColor = agregado 
    ? "bg-[#165128] text-white border-[#165128]" 
    : bgOscuro 
      ? "bg-[#6f4014] text-white hover:bg-[#5a3310] border-[#6f4014]"
      : "bg-[#6f4014] text-white hover:bg-[#5a3310] border-[#6f4014]";

  return (
    <div className="flex gap-2 w-full mt-auto pt-2">
      {/* Botón Ver Detalles (Delineado) */}
      <button 
        onClick={() => onAbrirModal(pastel)}
        className="cursor-pointer flex-1 py-2.5 px-2 text-[10px] font-black uppercase tracking-[0.1em] text-center border border-[#6f4014] text-[#6f4014] rounded-xl hover:bg-[#6f4014] hover:text-white transition-all active:scale-[0.98]"
      >
        Ver detalles
      </button>

      {/* Botón Añadir Rápido (Relleno) */}
      <button 
        onClick={handleAgregar}
        className={`cursor-pointer flex-1 py-2.5 px-2 text-[10px] font-black uppercase tracking-[0.1em] border rounded-xl transition-all duration-300 active:scale-[0.98] flex justify-center items-center ${btnAñadirColor}`}
      >
        {agregado ? "✓" : "Añadir"}
      </button>
    </div>
  );
}

// ── COMPONENTE MODAL PROPORCIONAL ──
function ModalPastel({ pastel, onClose }) {
  const [agregado, setAgregado] = useState(false);

  if (!pastel) return null;

  const colores = pastel.etiqueta ? etiquetaColor[pastel.etiqueta] : null;

  const handleAgregarModal = () => {
    setAgregado(true);
    setTimeout(() => { setAgregado(false); onClose(); }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1b1c1a]/70 backdrop-blur-sm">
      {/* Contenedor Modal: Controlado a un 75vh máximo en desktop para que NUNCA pida scroll, y h-auto en celulares */}
      <div className="bg-[#fbf9f5] rounded-3xl w-full max-w-4xl max-h-[90vh] md:h-[75vh] flex flex-col md:flex-row overflow-hidden shadow-2xl relative">
        
        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-white/90 w-9 h-9 flex items-center justify-center rounded-full text-[#6f4014] font-bold shadow-md hover:bg-[#e5ded6] hover:scale-105 active:scale-95 transition-all"
        >
          ✕
        </button>
        
        {/* Lado Imagen: Oculta la parte sobrante en celulares (h-48), Mitad de pantalla en Desktop (h-full) */}
        <div className="w-full h-48 md:h-full md:w-1/2 relative bg-[#f5f3ef] shrink-0">
          <img src={pastel.img} alt={pastel.nombre} className="w-full h-full object-cover" />
          {pastel.etiqueta && colores && (
            <div 
              className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-md"
              style={{ backgroundColor: colores.bg, color: colores.text }}
            >
              {pastel.etiqueta}
            </div>
          )}
        </div>

        {/* Lado Contenido: Calculado para no sobresalir */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col bg-[#fbf9f5] overflow-y-auto">
          <div className="mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#a08070] mb-2 block">
              {pastel.categoria}
            </span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-[#6f4014] leading-[1.05] mb-2">
              {pastel.nombre}
            </h2>
            <div className="text-2xl font-bold text-[#944a00]">
              S/ {pastel.precio}
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[#51443b] text-sm md:text-base leading-relaxed mb-6 italic">
              "{pastel.descripcion}"
            </p>

            {/* Recuadro de Info extra (compacto) */}
            <div className="bg-[#f5f3ef] rounded-2xl p-4 md:p-5 mb-4 border border-[#d6c3b6]/40">
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-[#d6c3b6]/60">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#847469]">Porciones</span>
                <span className="text-sm font-semibold text-[#1b1c1a]">{pastel.porciones}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#847469]">Notas de Sabor</span>
                <span className="text-sm font-semibold text-[#1b1c1a] text-right line-clamp-1 w-2/3">{pastel.notas}</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-2">
            <button 
              onClick={handleAgregarModal}
              className={`cursor-pointer w-full py-4 rounded-xl font-black uppercase tracking-[0.15em] text-[12px] transition-all duration-300 active:scale-[0.98] ${
                agregado 
                  ? "bg-[#165128] text-white shadow-none" 
                  : "bg-[#6f4014] text-white shadow-[0_8px_24px_rgba(111,64,20,0.25)] hover:bg-[#5a3310]"
              }`}
            >
              {agregado ? "✓ Añadido al carrito" : "Añadir al carrito"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}