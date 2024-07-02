import "./styles.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { usePosition } from "./use-location";

export default function App() {
  const [mapProps, setMapProps] = useState({
    center: [19.075984, 72.877656],
    zoom: 6
  });
  const [trackData, setTrackData] = useState([]);
  const [polygonData, setPolygonData] = useState();
  const [isTracking, setIsTracking] = useState(false);
  const { position } = usePosition(isTracking);

  useEffect(() => {
    if (isTracking && position) {
      setTrackData([...trackData, position]);
    }
  }, [isTracking, position]);

  const finishPolygon = () => {
    setPolygonData([...trackData, trackData[0]]);
    setTrackData([]);
  };

  return (
    <div>
      <div className="mb">
        <h2>
          {isTracking ? "Tracking" : "Not Tracking"} ({trackData.length} Points)
        </h2>
      </div>
      <div className="mb">
        <button
          class="pure-button mr"
          disabled={isTracking}
          onClick={() => setIsTracking(true)}
        >
          Start
        </button>
        <button
          class="pure-button button-red mr"
          disabled={!isTracking}
          onClick={() => setIsTracking(false)}
        >
          Stop
        </button>

        <button className="pure-button mr" onClick={finishPolygon}>
          Render as Polygon
        </button>
      </div>
      <MapContainer {...mapProps} scrollWheelZoom={false}>
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
