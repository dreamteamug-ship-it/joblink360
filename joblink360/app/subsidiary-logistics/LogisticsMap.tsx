'use client';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

export default function LogisticsMap() {
  const mombasa: [number, number] = [-4.0435, 39.6682];
  const naivasha: [number, number] = [-0.7172, 36.4310];
  const abim: [number, number] = [2.7032, 33.6570];

  const routeMombasaToNaivasha: [number, number][] = [mombasa, [-1.2921, 36.8219], naivasha]; // via Nairobi
  const routeNaivashaToAbim: [number, number][] = [naivasha, [0.5143, 34.8197], [2.1522, 33.4901], abim]; // via Kisumu/North

  return (
    <MapContainer center={[-0.7172, 36.4310]} zoom={6} className="h-[500px] w-full border border-zinc-800">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Mombasa Port */}
      <Marker position={mombasa}>
        <Popup className="font-sans">
          <b className="text-emerald-600">Mombasa Port (Inbound)</b><br/>
          Shipment: LFP Battery Cells<br/>
          Status: Cleared Customs
        </Popup>
      </Marker>

      {/* Naivasha EV Plant */}
      <Marker position={naivasha}>
        <Popup className="font-sans">
          <b>Naivasha EV Assembly</b><br/>
          Stock Level: 42%<br/>
          Priority: HIGH
        </Popup>
      </Marker>

      {/* Abim Agritech Hub */}
      <Marker position={abim}>
        <Popup className="font-sans">
          <b>Abim Hub (Uganda)</b><br/>
          Requirement: Solar Inverters<br/>
          Status: Awaiting Delivery
        </Popup>
      </Marker>

      {/* Supply Lines */}
      <Polyline positions={routeMombasaToNaivasha} color="#10b981" weight={3} dashArray="10, 10" />
      <Polyline positions={routeNaivashaToAbim} color="#3b82f6" weight={3} dashArray="5, 5" />
    </MapContainer>
  );
}
