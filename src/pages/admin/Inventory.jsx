// src/pages/admin/Inventory.jsx
import { useState, useEffect } from 'react';
import ProductModal from '../../components/admin/ProductModal';
import { productService } from '../../services/productService';
import api from '../../services/api';

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditing, setCurrentEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const [prodData, catData] = await Promise.all([
          productService.getAllProductsAdmin(),
          api.get('/categories').then(res => res.data)
        ]);
        
        // Map backend products to frontend structure
        const mappedProducts = prodData.map(p => ({
          id: p.id,
          name: p.name,
          category: p.categoryName || "Sin Categoría",
          price: p.price,
          stock: p.stock,
          image: p.imageUrl || "",
          originalProduct: p
        }));
        
        setProducts(mappedProducts);
        setCategories(catData);
      } catch (err) {
        console.error("Error cargando inventario", err);
      } finally {
        setLoading(false);
      }
    };
    
    loadInventory();
  }, []);

  const handleSave = async (productData) => {
    try {
      // Find category ID based on the string name selected in the modal
      const matchedCat = categories.find(c => c.name.toLowerCase() === String(productData.category || '').toLowerCase());
      // fallback to 1 if not found
      const categoryId = matchedCat ? matchedCat.id : (categories.length > 0 ? categories[0].id : 1);

      const payload = {
        name: productData.name,
        description: productData.description || "Delicioso producto de pastelería.",
        price: Number(productData.price),
        stock: Number(productData.stock),
        imageUrl: productData.image,
        categoryId: categoryId
      };

      if (currentEditing) {
        const res = await productService.updateProduct(currentEditing.id, payload);
        const updated = products.map(p => p.id === currentEditing.id ? {
          ...p,
          name: res.name,
          category: res.categoryName || "Sin Categoría",
          price: res.price,
          stock: res.stock,
          image: res.imageUrl,
          originalProduct: res
        } : p);
        setProducts(updated);
      } else {
        const res = await productService.createProduct(payload);
        const newProd = {
          id: res.id,
          name: res.name,
          category: res.categoryName || "Sin Categoría",
          price: res.price,
          stock: res.stock,
          image: res.imageUrl,
          originalProduct: res
        };
        setProducts([...products, newProd]);
      }
    } catch (err) {
      console.error("Error guardando producto:", err);
      alert("Hubo un error al guardar el producto.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar (desactivar) este artículo de Briselli?")) {
      try {
        await productService.deactivateProduct(id);
        const updated = products.filter(p => p.id !== id);
        setProducts(updated);
      } catch (err) {
        console.error("Error desactivando producto:", err);
        alert("Hubo un error al eliminar el producto.");
      }
    }
  };

  const filteredProducts = products.filter(p => 
    (p.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 animate-fadeIn">
        <p className="text-xl font-bold text-artisan-primary">Cargando inventario maestro...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-artisan-primary tracking-tighter">Inventario Maestro</h2>
          <p className="text-artisan-tertiary text-sm font-medium">Briselli: Gestión de Pasteles, Panes y Postres</p>
        </div>
        <button 
          onClick={() => { setCurrentEditing(null); setIsModalOpen(true); }}
          className="bg-artisan-secondary text-white px-8 py-3 rounded-xl font-black shadow-lg hover:bg-artisan-primary hover:-translate-y-1 transition-all"
        >
          + AGREGAR PRODUCTO
        </button>
      </div>

      {/* Buscador */}
      <div className="relative">
        <input 
          type="text"
          placeholder="Buscar producto por nombre o categoría..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-artisan-secondary transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl grayscale">🔍</span>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-artisan-neutral/30 text-artisan-primary text-[10px] font-black uppercase tracking-[0.2em]">
            <tr>
              <th className="p-5 border-b">Artículo</th>
              <th className="p-5 border-b">Categoría</th>
              <th className="p-5 border-b">Precio</th>
              <th className="p-5 border-b">Stock</th>
              <th className="p-5 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-artisan-neutral/10 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-300">N/A</div>
                        )}
                      </div>
                      <span className="font-bold text-artisan-dark text-lg">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-artisan-neutral text-artisan-primary rounded-full text-xs font-black uppercase border border-artisan-tertiary/10">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-artisan-primary text-base">
                    S/ {Number(p.price).toFixed(2)}
                  </td>
                  <td className="p-4">
                    <div className={`flex items-center gap-2 font-black ${p.stock < 5 ? 'text-red-500' : 'text-artisan-dark'}`}>
                      {p.stock} 
                      {p.stock < 5 && <span className="text-[10px] animate-pulse">¡BAJO!</span>}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-4">
                      <button 
                        onClick={() => { setCurrentEditing(p); setIsModalOpen(true); }}
                        className="p-2 hover:bg-artisan-secondary/10 rounded-lg transition-colors"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors grayscale hover:grayscale-0"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-20 text-center text-gray-300 font-medium italic">
                  No se encontraron resultados para tu búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setCurrentEditing(null); }} 
        onSave={handleSave}
        editingProduct={currentEditing}
      />
    </div>
  );
}
