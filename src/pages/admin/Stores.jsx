// src/pages/admin/Stores.jsx
import { useState, useEffect } from 'react';

import { branchService } from '../../services/branchService';

export default function AdminStores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      const data = await branchService.getAllBranchesAdmin();
      setStores(data);
    } catch (error) {
      console.error("Error al cargar sedes", error);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const updatedBranch = await branchService.toggleBranchStatus(id);
      setStores(stores.map(s => s.id === id ? updatedBranch : s));
    } catch (error) {
      console.error("Error al cambiar estado de sede", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-black text-[#8B572A] uppercase">Estado de Sedes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map(s => (
          <div key={s.id} className={`p-4 rounded-xl border transition-all flex justify-between items-center bg-white ${s.isActive ? 'border-orange-100 shadow-sm' : 'border-gray-200 opacity-60'}`}>
            <div>
              <p className="font-bold text-sm text-[#554336]">{s.name}</p>
              <p className={`text-[10px] font-black uppercase ${s.isActive ? 'text-green-600' : 'text-red-500'}`}>
                {s.isActive ? 'Activo' : 'Inactivo'}
              </p>
            </div>
            <button 
              onClick={() => toggleStatus(s.id)}
              className={`w-12 h-6 rounded-full transition-all relative ${s.isActive ? 'bg-[#8B572A]' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${s.isActive ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}