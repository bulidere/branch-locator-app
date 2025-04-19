import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
  iconSize: [32, 32],
});

const branches = [
  { id: 1, name: "Main Branch", lat: 40.7128, lng: -74.006 },
  { id: 2, name: "Uptown Branch", lat: 40.7306, lng: -73.9352 }
];

const MapView = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <MapContainer center={position || [40.7128, -74.006]} zoom={13} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && (
          <Marker position={position} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        {branches.map(branch => (
          <Marker key={branch.id} position={[branch.lat, branch.lng]}>
            <Popup>{branch.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
