import { useState, useEffect } from "react";
import { productService } from "../../services/productService";
import { addProductToCartFlow } from "../../utils/cartFlow";

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
  "Últimos":         { bg: "#ffebee", text: "#b71c1c" }
};

export default function Pasteles() {
  const [pasteles, setPasteles] = useState([]);
  const categorias = ["Todas", ...Array.from(new Set(pasteles.map(p => p.categoria)))];
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [pastelSeleccionado, setPastelSeleccionado] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const pastelesData = await productService.getProductsByCategory(1);

        const mapped = pastelesData.map(p => ({
          id: p.id,
          categoria: p.categoryName || "Pasteles",
          nombre: p.name,
          precio: p.price,
          porciones: "8-10 personas",
          etiqueta: p.stock < 5 ? "Últimos" : (p.stock > 20 ? "Más Vendido" : null),
          descripcion: p.description || "Delicioso pastel preparado con ingredientes selectos.",
          notas: "Receta de la casa",
          img: p.imageUrl || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800",
        }));
        setPasteles(mapped);
      } catch (error) {
        console.error("Error al cargar pasteles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  
  const showAddToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1800);
  };

  const filtrados = pasteles.filter(p => 
    categoriaActiva === "Todas" || p.categoria === categoriaActiva
  );

  const gruposPorCategoria = Array.from(new Set(pasteles.map(p => p.categoria)));

  const mostrarBento = categoriaActiva === "Todas" && pasteles.length >= 4;
  const itemsBento = pasteles.slice(0, 4);
  const itemsRestantes = mostrarBento ? pasteles.slice(4) : filtrados;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf9f5] flex justify-center items-center">
        <p className="font-bold text-[#6f4014]">Cargando catálogo...</p>
      </div>
    );
  }


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
              return <Seccion key={cat} titulo={cat} items={grupo} onAbrirModal={setPastelSeleccionado} onAddSuccess={showAddToast} />;
            })
          : <Seccion titulo={categoriaActiva} items={filtrados} onAbrirModal={setPastelSeleccionado} onAddSuccess={showAddToast} />
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
              <button disabled className="cursor-not-allowed px-8 py-3.5 bg-white/20 text-[#ffdab8] rounded-xl font-black uppercase tracking-[0.15em] text-xs sm:text-sm border border-[#ffdab8]/30">
                Próximamente
              </button>
            </div>
          </div>
          
          <div className="flex-1 order-1 md:order-2 w-full z-10">
            <div className="rounded-2xl overflow-hidden shadow-2xl rotate-2 transition-transform duration-700 ease-out group-hover:rotate-0 group-hover:scale-[1.02]">
              <img alt="Torta de Lúcuma y Maracuyá" className="w-full aspect-4/3 object-cover" src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800" />
            </div>
          </div>
        </section>
      </main>

      {/* ── MODAL PROPORCIONAL DE DETALLES ── */}
      <ModalPastel pastel={pastelSeleccionado} onClose={() => setPastelSeleccionado(null)} onAddSuccess={showAddToast} />

      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-[60] bg-[#165128] text-white px-4 py-3 rounded-xl shadow-xl font-bold text-sm">
          Se anadio correctamente al carrito
        </div>
      )}

    </div>
  );
}

// ── Componentes Auxiliares ──

function Seccion({ titulo, items, onAbrirModal, onAddSuccess }) {
  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#1b1c1a] whitespace-nowrap">{titulo}</h2>
        <div className="flex-1 h-px bg-[#d6c3b6]/60" />
        <span className="text-xs text-[#a08070] font-bold uppercase tracking-wider whitespace-nowrap">{items.length} {items.length === 1 ? "item" : "items"}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {items.map(pastel => (
          <TarjetaPastel key={pastel.id} pastel={pastel} onAbrirModal={onAbrirModal} onAddSuccess={onAddSuccess} />
        ))}
      </div>
    </div>
  );
}

// ── TARJETA INDIVIDUAL DE PRODUCTO ──
function TarjetaPastel({ pastel, onAbrirModal, onAddSuccess }) {
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
        
        <GrupoBotones pastel={pastel} onAbrirModal={onAbrirModal} onAddSuccess={onAddSuccess} />
      </div>
    </div>
  );
}

// ── COMPONENTE DE BOTONES PARA CARDS ──
function GrupoBotones({ pastel, onAbrirModal, onAddSuccess, bgOscuro = false }) {
  const [agregado, setAgregado] = useState(false);
  
  const handleAgregar = () => {
    const result = addProductToCartFlow(pastel);
    if (!result.ok) {
      alert(result.message);
      return;
    }
    onAddSuccess?.();
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
function ModalPastel({ pastel, onClose, onAddSuccess }) {
  const [agregado, setAgregado] = useState(false);

  if (!pastel) return null;

  const colores = pastel.etiqueta ? etiquetaColor[pastel.etiqueta] : null;

  const handleAgregarModal = () => {
    const result = addProductToCartFlow(pastel);
    if (!result.ok) {
      alert(result.message);
      return;
    }
    onAddSuccess?.();
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