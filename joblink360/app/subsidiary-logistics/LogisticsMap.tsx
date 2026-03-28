'use client';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

export default function LogisticsMap() {
  const mombasa: [number, number] = [-4.0435, 39.6682];
  const naivasha: [number, number] = [-0.7172, 36.4310];
  const abim: [number, number] = [2.7032, 33.6570];
  const riftValleyDisturbance: [number, number] = [-0.3031, 36.0884]; // Near Nakuru

  const routeMombasaToNaivasha: [number, number][] = [mombasa, [-1.2921, 36.8219], naivasha];
  const routeNaivashaToAbim: [number, number][] = [naivasha, [0.5143, 34.8197], [2.1522, 33.4901], abim];

  return (
    <MapContainer center={[-0.7172, 36.4310]} zoom={6} className="h-[600px] w-full border border-zinc-800 rounded-lg">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Weather Disturbance Overlay - Rift Valley Alert */}
      <Circle 
        center={riftValleyDisturbance} 
        pathOptions={{ fillColor: '#ef4444', color: '#ef4444', fillOpacity: 0.2 }} 
        radius={150000} 
      />

      <Marker position={mombasa}>
        <Popup>
          <div className="font-sans">
            <b className="text-emerald-600 uppercase">Mombasa Hub</b><br/>
            Weather: 32°C | Humid<br/>
            Impact: <span className="text-emerald-500 font-bold">NOMINAL</span>
          </div>
        </Popup>
      </Marker>

      <Marker position={naivasha}>
        <Popup>
          <div className="font-sans">
            <b className="text-amber-500 uppercase">Naivasha Plant</b><br/>
            Weather: 25°C | Thunderstorms<br/>
            Impact: <span className="text-amber-500 font-bold">MODERATE DELAY</span>
          </div>
        </Popup>
      </Marker>

      <Marker position={abim}>
        <Popup>
          <div className="font-sans">
            <b className="text-blue-500 uppercase">Abim Hub</b><br/>
            Weather: 28°C | Rain Expected<br/>
            Impact: <span className="text-blue-500 font-bold">MONITORING</span>
          </div>
        </Popup>
      </Marker>

      <Polyline positions={routeMombasaToNaivasha} color="#10b981" weight={4} opacity={0.6} />
      <Polyline positions={routeNaivashaToAbim} color="#ef4444" weight={4} opacity={0.8} dashArray="10, 10" />
    </MapContainer>
  );
}
