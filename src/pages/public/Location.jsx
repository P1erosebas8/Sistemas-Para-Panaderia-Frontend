// src/pages/public/Location.jsx
import { useState, useEffect } from 'react';
import MapContainer from "../../components/ui/MapContainer";
import { APIProvider } from '@vis.gl/react-google-maps';

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

export default function LocationPage() {
  const [activeStores, setActiveStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const saved = localStorage.getItem('briselli_stores');
    let data;

    if (saved) {
      data = JSON.parse(saved);
    } else {
      data = INITIAL_STORES_DATA;
      localStorage.setItem('briselli_stores', JSON.stringify(INITIAL_STORES_DATA));
    }

    const filtered = data.filter(s => s.status === 'Activo');
    setActiveStores(filtered);

    if (filtered.length > 0) {
      setSelectedStore(filtered[0]);
    }
  }, []);

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
                <h3 className="font-bold text-[#8B572A] text-sm">{store.name}</h3>
                <p className="text-xs text-gray-500">{store.address}</p>
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