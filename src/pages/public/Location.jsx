// src/pages/public/Location.jsx
import { Link } from 'react-router-dom';

const storeInfo = {
  name: "Pastelería Fina Briselli",
  address: "Av. Las Palmeras 4099, Los Olivos 15301",
  coordinates: { lat: -11.989, lng: -77.076 }, // Coordenadas aproximadas basadas en el mapa
  hours: [
    { day: "Lunes", range: "8:00 a.m. – 10:00 p.m." },
    { day: "Martes", range: "8:00 a.m. – 10:00 p.m." },
    { day: "Miércoles", range: "8:00 a.m. – 10:00 p.m." },
    { day: "Jueves", range: "8:00 a.m. – 10:00 p.m." },
    { day: "Viernes", range: "8:00 a.m. – 10:00 p.m." },
    { day: "Sábado", range: "8:00 a.m. – 10:00 p.m." },
    { day: "Domingo", range: "12:00 p.m. – 10:00 p.m." },
  ]
};

// Generar una URL de inserción de Google Maps (esto es un marcador de posición)
const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=TU_CLAVE_API_DE_GOOGLE_AQUÍ&q=Pasteleria+Fina+Briselli+Los+Olivos&center=${storeInfo.coordinates.lat},${storeInfo.coordinates.lng}&zoom=17`;

export default function LocationPage() {
  // Estilo de texto general usando el color de texto base y la fuente Inter
  const textBodyStyles = "font-inter text-briselli-text";

  return (
    <div className={`min-h-screen pt-24 pb-12 bg-briselli-neutral ${textBodyStyles}`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* --- Sección de Información de la Tienda (Izquierda) --- */}
        <div className="md:col-span-1 space-y-8 bg-white p-8 rounded-lg shadow-md border border-briselli-tertiary/20">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-briselli-primary leading-tight font-inter">
              {storeInfo.name}
            </h1>
            <div className="flex items-center space-x-2 text-briselli-primary/80">
                <span className="text-xl">📍</span>
                <p className="text-lg">
                    {storeInfo.address}
                </p>
            </div>
            <p className="text-briselli-primary/80">
              <span className="font-semibold">📞</span> (01) 7506881
            </p>
          </div>
          
          <div className="flex space-x-4">
            <button className="bg-briselli-primary text-white px-6 py-3 rounded-md font-bold font-inter text-sm flex-1">
              Indicaciones
            </button>
            <button className="border border-briselli-tertiary text-briselli-primary px-6 py-3 rounded-md font-bold font-inter text-sm flex-1">
              Llamar
            </button>
          </div>
        </div>

        {/* --- Sección de Mapa y Horario (Derecha) --- */}
        <div className="md:col-span-2 space-y-12">
          {/* El Mapa */}
          <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-xl border-2 border-briselli-tertiary">
            <iframe
              title="Google Map"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Sección de Horarios */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-briselli-tertiary/20">
            <h2 className="text-3xl font-extrabold text-briselli-primary mb-6 font-inter">
              Horario de Atención
            </h2>
            <ul className="space-y-3 font-inter">
              {storeInfo.hours.map((entry, index) => (
                <li key={index} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <span className={`text-lg font-semibold ${entry.day === "Domingo" ? "text-briselli-secondary" : ""}`}>
                    {entry.day}
                  </span>
                  <span className={`text-lg font-mono ${entry.day === "Domingo" ? "text-briselli-secondary" : ""}`}>
                    {entry.range}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}