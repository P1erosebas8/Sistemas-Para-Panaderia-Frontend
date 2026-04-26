// src/components/ui/MapContainer.jsx
import { useEffect } from 'react';
import { Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';

export default function MapContainer({ currentPos }) {
  const map = useMap();

  useEffect(() => {
    if (map && currentPos) {
      map.panTo(currentPos);
    }
  }, [map, currentPos]);

  return (
    <Map
      defaultCenter={currentPos}
      defaultZoom={17}
      mapId="BRIS_MAP_ID"
      gestureHandling={'greedy'}
      disableDefaultUI={false}
    >
      <AdvancedMarker position={currentPos}>
        <Pin background={'#8B572A'} glyphColor={'#FDFBF7'} borderColor={'#D4A373'} />
      </AdvancedMarker>
    </Map>
  );
}