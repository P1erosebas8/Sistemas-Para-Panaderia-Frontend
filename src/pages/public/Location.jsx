// src/pages/public/Location.jsx
import { useState } from 'react';
import MapContainer from "../../components/ui/MapContainer";
import { APIProvider } from '@vis.gl/react-google-maps';

const stores = [
  {
    id: 1,
    name: "Briselli - Las Palmeras",
    address: "Av. Las Palmeras 4099, Los Olivos",
    coords: { lat: -11.986900008562472, lng: -77.07252834238831 }
  },
  {
    id: 2,
    name: "Briselli - Antunez de Mayolo",
    address: "Av. Santiago Antunez de Mayolo 1639, Los Olivos",
    coords: { lat: -11.996172457316801, lng: -77.08373327552152 }
  },
  {
    id: 3,
    name: "Briselli - Angélica Gamarra",
    address: "Av. Angélica Gamarra 1904, Los Olivos",
    coords: { lat: -12.006227911665578, lng: -77.08198680680607 }
  },
  {
    id: 4,
    name: "Briselli - Universitaria",
    address: "Av. Universitaria 6117, Los Olivos 15314",
    coords: { lat: -11.963674409044833, lng: -77.07214010005937 }
  },
  {
    id: 5,
    name: "Briselli - Huandoy",
    address: "Manzana 181, Lote 20 Avenida A Los Olivos, Cercado de Lima 15306",
    coords: { lat: -11.963674409044833, lng: -77.07771674666107 }
  },
  {
    id: 6,
    name: "Briselli - Alfa",
    address: "Av. Alfa 2171, Los Olivos 15302",
    coords: { lat: -12.006515670569831, lng: -77.06959673749027 }
  },
  {
    id: 7,
    name: "Briselli - Mexico",
    address: "Mexico 488, Comas 15311",
    coords: { lat: -11.955191527513517, lng: -77.05951937797056 }
  },
  {
    id: 8,
    name: "Briselli - Tupac",
    address: "Av. Túpac Amaru 735, Lima 15311",
    coords: { lat: -11.959675708249497, lng: -77.05402315343272 }
  },
  {
    id: 9,
    name: "Briselli - German Aguirre",
    address: "Av. Germán Aguirre 1199, San Martín de Porres 15103",
    coords: { lat: -12.019266332865481, lng: -77.0760052178505 } 
  }
];

export default function LocationPage() {
  const [selectedStore, setSelectedStore] = useState(stores[0]);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-artisan-neutral font-inter">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Lista de Sedes (Igual que antes) */}
        <div className="md:col-span-1 space-y-4">
          <h1 className="text-3xl font-extrabold text-artisan-primary mb-6">Nuestras Sedes</h1>
          <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2">
            {stores.map((store) => (
              <div
                key={store.id}
                onClick={() => setSelectedStore(store)}
                className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${selectedStore.id === store.id
                  ? "border-artisan-primary bg-white shadow-md"
                  : "border-transparent bg-white/50 hover:bg-white"
                  }`}
              >
                <h3 className="font-bold text-artisan-primary">{store.name}</h3>
                <p className="text-sm text-artisan-dark/70">{store.address}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contenedor del Mapa */}
        <div className="md:col-span-2 space-y-8">
          <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
            {/* El PROVIDER envuelve al CONTAINER */}
            <APIProvider apiKey={apiKey}>
              <MapContainer currentPos={selectedStore.coords} />
            </APIProvider>
          </div>

          {/* Info de la sede seleccionada abajo */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-artisan-tertiary/20">
            <h2 className="text-xl font-bold text-artisan-primary">Sede: {selectedStore.name}</h2>
            <p className="text-artisan-dark">{selectedStore.address}</p>
          </div>
        </div>

      </div>
    </div>
  );
}