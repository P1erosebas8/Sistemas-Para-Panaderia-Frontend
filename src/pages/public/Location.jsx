// src/pages/public/Location.jsx
import { useState, useEffect } from 'react';
import MapContainer from "../../components/ui/MapContainer";
import { APIProvider } from '@vis.gl/react-google-maps';
import { branchService } from '../../services/branchService';

export default function LocationPage() {
  const [activeStores, setActiveStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await branchService.getAllBranches();
        const filtered = data.filter(s => s.status === 'Activo' || s.status === 'ACTIVE');
        // Asegurarse de mapear lat/lng a coords si vienen sueltos en el backend
        const formatted = filtered.map(b => ({
          ...b,
          coords: b.latitude && b.longitude ? { lat: Number(b.latitude), lng: Number(b.longitude) } : (b.coords || { lat: 0, lng: 0 })
        }));
        
        setActiveStores(formatted);
        if (formatted.length > 0) {
          setSelectedStore(formatted[0]);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-artisan-neutral">
        <p className="font-bold text-[#8B572A]">Cargando sedes...</p>
      </div>
    );
  }

  if (activeStores.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-artisan-neutral">
        <div className="text-center">
          <h2 className="text-2xl font-black text-[#8B572A]">Sedes no disponibles</h2>
          <p className="text-gray-500">Estamos actualizando nuestra red de tiendas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-artisan-neutral">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1 space-y-4">
          <h1 className="text-3xl font-extrabold text-[#8B572A] mb-6">Nuestas Sedes</h1>
          <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2">
            {activeStores.map((store) => (
              <div
                key={store.id}
                onClick={() => setSelectedStore(store)}
                className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${selectedStore?.id === store.id ? "border-[#8B572A] bg-white shadow-md" : "border-transparent bg-white/50"
                  }`}
              >
                <h3 className="font-bold text-artisan-primary">{store.name}</h3>
                <p className="text-sm text-artisan-dark/70">{store.address}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="w-full h-[500px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
            <APIProvider apiKey={apiKey}>
              {selectedStore && (
                <MapContainer key={selectedStore.id} currentPos={selectedStore.coords} />
              )}
            </APIProvider>
          </div>
          {selectedStore && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50">
              <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Sede Seleccionada</p>
              <h2 className="text-xl font-black text-[#8B572A] uppercase">{selectedStore.name}</h2>
              <p className="text-gray-600 text-sm">{selectedStore.address}</p>
              <p className="text-x font-bold text-artisan-primary mt-2">📞 (01) 7506881</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}