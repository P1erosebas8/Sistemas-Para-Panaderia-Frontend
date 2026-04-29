// src/pages/admin/Stores.jsx
import { useState, useEffect } from 'react';

export default function AdminStores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('briselli_stores');
    if (saved) {
      setStores(JSON.parse(saved));
    } else {
      // Si es la primera vez, cargamos tus sedes base con estado 'Activo'
      const initialStores = [
        { id: 1, name: "Briselli - Las Palmeras", address: "Av. Las Palmeras 4099", status: 'Activo' },
        { id: 2, name: "Briselli - Antunez de Mayolo", address: "Av. Antunez de Mayolo 1639", status: 'Activo' },
        // ... (Agrega las demás sedes aquí)
      ];
      setStores(initialStores);
      localStorage.setItem('briselli_stores', JSON.stringify(initialStores));
    }
  }, []);

  const toggleStatus = (id) => {
    const updated = stores.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'Activo' ? 'Inactivo' : 'Activo' };
      }
      return s;
    });
    setStores(updated);
    localStorage.setItem('briselli_stores', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-artisan-primary uppercase tracking-tighter">Estado de Sedes</h2>
        <p className="text-gray-400 text-sm font-medium">Habilita o deshabilita las tiendas que verán los clientes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stores.map((s) => (
          <div key={s.id} className={`p-5 rounded-2xl border-2 transition-all flex justify-between items-center ${
            s.status === 'Activo' ? 'bg-white border-green-100' : 'bg-gray-50 border-gray-200 opacity-75'
          }`}>
            <div>
              <h3 className={`font-black uppercase text-sm ${s.status === 'Activo' ? 'text-artisan-primary' : 'text-gray-400'}`}>
                {s.name}
              </h3>
              <p className="text-[11px] text-gray-500 font-medium">{s.address}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-2 inline-block ${
                s.status === 'Activo' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'
              }`}>
                {s.status}
              </span>
            </div>
            
            <button 
              onClick={() => toggleStatus(s.id)}
              className={`w-14 h-7 rounded-full relative transition-colors ${
                s.status === 'Activo' ? 'bg-artisan-secondary' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                s.status === 'Activo' ? 'left-8' : 'left-1'
              }`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}