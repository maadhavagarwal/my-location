import { useState, useEffect } from "react";

const defaultSettings = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0
};

export const usePosition = (watch, settings = defaultSettings) => {
  const [position, setPosition] = useState();
  const [error, setError] = useState(null);

  const onChange = ({ coords, timestamp }) => {
    setPosition([coords.latitude, coords.longitude]);
  };

  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    let watcher = null;
    if (watch) {
      watcher = navigator.geolocation.watchPosition(
        onChange,
        onError,
        settings
      );
    } else {
      watcher && navigator.geolocation.clearWatch(watcher);
    }

    return () => watcher && navigator.geolocation.clearWatch(watcher);
  }, [settings, watch]);

  return { position, error };
};
