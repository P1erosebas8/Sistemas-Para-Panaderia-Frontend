// src/pages/admin/Stores.jsx
import { useState, useEffect } from 'react';

const INITIAL_STORES_DATA = [
  { id: 1, name: "Briselli - Las Palmeras", address: "Av. Las Palmeras 4099, Los Olivos", coords: { lat: -11.986900008562472, lng: -77.07252834238831 }, status: 'Activo' },
  { id: 2, name: "Briselli - Antunez de Mayolo", address: "Av. Santiago Antunez de Mayolo 1639, Los Olivos", coords: { lat: -11.996172457316801, lng: -77.08373327552152 }, status: 'Activo' },
  { id: 3, name: "Briselli - Angélica Gamarra", address: "Av. Angélica Gamarra 1904, Los Olivos", coords: { lat: -12.006227911665578, lng: -77.08198680680607 }, status: 'Activo' },
  { id: 4, name: "Briselli - Universitaria", address: "Av. Universitaria 6117, Los Olivos 15314", coords: { lat: -11.963674409044833, lng: -77.07214010005937 }, status: 'Activo' },
  { id: 5, name: "Briselli - Huandoy", address: "Av. A Los Olivos, Cercado de Lima 15306", coords: { lat: -11.963674409044833, lng: -77.07771674666107 }, status: 'Activo' },
  { id: 6, name: "Briselli - Alfa", address: "Av. Alfa 2171, Los Olivos 15302", coords: { lat: -12.006515670569831, lng: -77.06959673749027 }, status: 'Activo' },
  { id: 7, name: "Briselli - Mexico", address: "Mexico 488, Comas 15311", coords: { lat: -11.955191527513517, lng: -77.05951937797056 }, status: 'Activo' },
  { id: 8, name: "Briselli - Tupac", address: "Av. Túpac Amaru 735, Lima 15311", coords: { lat: -11.959675708249497, lng: -77.05402315343272 }, status: 'Activo' },
  { id: 9, name: "Briselli - German Aguirre", address: "Av. Germán Aguirre 1199, SMP 15103", coords: { lat: -12.019266332865481, lng: -77.0760052178505 }, status: 'Activo' }
];

export default function AdminStores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('briselli_stores');
    if (saved) {
      setStores(JSON.parse(saved));
    } else {
      setStores(INITIAL_STORES_DATA);
      localStorage.setItem('briselli_stores', JSON.stringify(INITIAL_STORES_DATA));
    }
  }, []);

  const toggleStatus = (id) => {
    const updated = stores.map(s => 
      s.id === id ? { ...s, status: s.status === 'Activo' ? 'Inactivo' : 'Activo' } : s
    );
    setStores(updated);
    localStorage.setItem('briselli_stores', JSON.stringify(updated));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-black text-[#8B572A] uppercase">Estado de Sedes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map(s => (
          <div key={s.id} className={`p-4 rounded-xl border transition-all flex justify-between items-center bg-white ${s.status === 'Activo' ? 'border-orange-100 shadow-sm' : 'border-gray-200 opacity-60'}`}>
            <div>
              <p className="font-bold text-sm text-[#554336]">{s.name}</p>
              <p className={`text-[10px] font-black uppercase ${s.status === 'Activo' ? 'text-green-600' : 'text-red-500'}`}>
                {s.status}
              </p>
            </div>
            <button 
              onClick={() => toggleStatus(s.id)}
              className={`w-12 h-6 rounded-full transition-all relative ${s.status === 'Activo' ? 'bg-[#8B572A]' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${s.status === 'Activo' ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}