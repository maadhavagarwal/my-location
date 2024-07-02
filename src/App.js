import './style.css'
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup
} from "react-leaflet";
import { usePosition } from "./user-location";

export default function App() {
  const [trackData, setTrackData] = useState([]);
  const [polygonData, setPolygonData] = useState();
  const initialPosition = [19.075984, 72.877656];
  const [isTracking, setIsTracking] = useState(false);
  const { position } = usePosition(isTracking);

  useEffect(() => {
    if (isTracking && position) {
      setTrackData([...trackData, position]);
    }
  },[position])

  const finishPolygon = () => {
    setPolygonData([...trackData, trackData[0]]);
    setTrackData([]);
  };

  return (
    <div>
      {isTracking ? "tracking" : "not tracking"}
      <button onClick={() => setIsTracking(true)}>start</button>
      <button onClick={() => setIsTracking(false)}>stop</button>
      {/* <button onClick={finishPolygon}>render as polygon</button>*/}
      <MapContainer center={initialPosition} zoom={6} scrollWheelZoom={false}> 
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline pathOptions={{ color: "blue" }} positions={trackData} />
        {polygonData && (
          <Polyline pathOptions={{ color: "purple" }} positions={polygonData} />
        )}
      </MapContainer>
    </div>
  );
}
