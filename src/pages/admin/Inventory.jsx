// src/pages/admin/Inventory.jsx
import { useState, useEffect } from 'react';
import ProductModal from '../../components/admin/ProductModal';
import { pasteles as pastelesCatalog } from '../public/Pasteles';
import { panesCatalog } from '../../components/ui/ProductGrid';

const postresBase = [
  {
    name: "Cheesecake de Fresa",
    category: "Postres",
    price: 18,
    stock: 20,
    image: "https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/649514282_1541653711294103_4120625557878409919_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=_8jOzcR3vgIQ7kNvwHIVVAG&_nc_oc=AdrWo1xfl3Q5_JewGEuMbPTlHdaCjD_5l9G5DVBwQ4edURxCXz9CROrM82GK-gNq334&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=E4MCiHLmRAERrrxdhAldEA&_nc_ss=7b2a8&oh=00_Af09nRaFM49k2n-zjor0Rrn_Q5Rp4KX9zLgLsAF0IjoYJQ&oe=69F85025",
  },
  {
    name: "Rolls con Chips de Chocolate",
    category: "Postres",
    price: 12.5,
    stock: 20,
    image: "https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/619120779_1502410635218411_5840259771253580548_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=iCGWY-GxdTgQ7kNvwEPSvtX&_nc_oc=AdqamdPq6YbjhSQA2ac_UXVJznE5q8OM4oAPOJtvlbEzv70xumipEr00X-sgYnFQpIs&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=jVSyogjv1T5BklxJq-MIWw&_nc_ss=7b2a8&oh=00_Af2aCZS8CjGhsxNpcv_Umt7SAfjYhYT5qwEftIjjxwUPxA&oe=69F8401B",
  },
  {
    name: "Cañitas de Manjar",
    category: "Postres",
    price: 9.5,
    stock: 20,
    image: "https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/619285440_1502410648551743_8807975528775788450_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=BGjAkktAXvsQ7kNvwFCGWu9&_nc_oc=Ado7aSBBlRyaH22xdK-Nei5Ddlwh5RW_TmHoYYhGYRdENJuQPeuBonqddOaxTo2u8XE&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=k5NJJOhEvHmONODEZ2kMwA&_nc_ss=7b2a8&oh=00_Af1-FtLPcoHQuIYZPNAvRZ2UvfnuIRV_UT54ceqVuhg8RQ&oe=69F84A7C",
  },
  {
    name: "Galletas de Mantequilla con Guinda",
    category: "Postres",
    price: 11,
    stock: 20,
    image: "https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/608849094_1484520380340770_5071488719152032345_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=N2JFv69e8n4Q7kNvwH4T-yc&_nc_oc=Ado6Zfl5RVB49xB4KpPOtBNbqbENpA3NvRzvI7VGvO5v8bFQCCxMd4xYEj_OfjOnOH8&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=WB8EOZ4TbWS2Bw35HvsAPw&_nc_ss=7b2a8&oh=00_Af1tcx-GzeuRZqEMXf1XcoYL608S7DrGIQO9eunwBrBoYA&oe=69F84D1D",
  },
  {
    name: "Vasos de Postre Surtidos",
    category: "Postres",
    price: 7,
    stock: 20,
    image: "https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/492756468_1254704973322313_5267312312456129657_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=Pao4VrQOPCYQ7kNvwEqqGd3&_nc_oc=Adon_MobBW7RHiIKIwylmqWEf6FG-QcwvtW3ksIBxyEZQRC7RRDtaGTQPiCrjNOk8LE&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=IZ1lXnN4Fiv_GL7AseJ9Ww&_nc_ss=7b2a8&oh=00_Af0lqrosY1vJljMjofSevK7YOW8KQytWVLIJ5RWQoCMntw&oe=69F83DCC",
  },
  {
    name: "Copas de Crema y Gelatina",
    category: "Postres",
    price: 13,
    stock: 20,
    image: "https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/662591386_1566583222134485_1736429201353428355_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_ohc=UQMxw45VangQ7kNvwGRmVeO&_nc_oc=Adr8zb2QshUVlVszAc3zGJz7HCXp1KCdV_B9OMHFPaUKncWSh2CLt0aota0nSNywTco&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=XEV_es6up5Rs-dAgVD7ung&_nc_ss=7b2a8&oh=00_Af1u1jnffPi7syhti8zmfvns0gYEZGWgGvvh5oXLuDerDw&oe=69F834B0",
  },
];

const buildPostresInventory = () =>
  postresBase.map((item, index) => ({
    id: `seed-postre-${index + 1}`,
    ...item,
  }));

const buildPastelesInventory = () =>
  pastelesCatalog.map((item, index) => ({
    id: `seed-pastel-${index + 1}`,
    name: item.nombre,
    category: item.categoria || "Pasteles",
    price: Number(item.precio) || 0,
    stock: 20,
    image: item.img || "",
  }));

const buildPanesInventory = () =>
  panesCatalog.map((item, index) => ({
    id: `seed-pan-${index + 1}`,
    name: item.title,
    category: "Panes",
    price: Number(item.price) || 0,
    stock: 20,
    image: item.img || "",
  }));

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditing, setCurrentEditing] = useState(null);

  useEffect(() => {
    const loadInventory = () => {
    const saved = localStorage.getItem('briselli_inventory');
    const seededProducts = [
      ...buildPostresInventory(),
      ...buildPastelesInventory(),
      ...buildPanesInventory(),
    ];

    if (!saved) {
      setProducts(seededProducts);
      localStorage.setItem('briselli_inventory', JSON.stringify(seededProducts));
      return;
    }

    const parsed = JSON.parse(saved);
    const merged = [...parsed];
    const existingNames = new Set(parsed.map((item) => item.name?.toLowerCase?.()));

    seededProducts.forEach((catalogProduct) => {
      if (!existingNames.has(catalogProduct.name.toLowerCase())) {
        merged.push(catalogProduct);
      }
    });

    setProducts(merged);
    localStorage.setItem('briselli_inventory', JSON.stringify(merged));
    };

    const onStorage = (event) => {
      if (!event.key || event.key === 'briselli_inventory') {
        loadInventory();
      }
    };

    loadInventory();
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const saveAndSync = (list) => {
    setProducts(list);
    localStorage.setItem('briselli_inventory', JSON.stringify(list));
  };

  const handleSave = (productData) => {
    if (currentEditing) {
      const updated = products.map(p => p.id === productData.id ? productData : p);
      saveAndSync(updated);
    } else {
      saveAndSync([...products, productData]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este artículo de Briselli?")) {
      const updated = products.filter(p => p.id !== id);
      saveAndSync(updated);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    S/ {p.price.toFixed(2)}
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