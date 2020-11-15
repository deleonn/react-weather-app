import { useState, useEffect } from 'react';

interface Coords {
  latitude: number;
  longitude: number;
}

export const useLocation = (): {
  location: Coords | null;
  locationError: string | null;
  loading: boolean;
} => {
  const [location, setLocation] = useState<Coords | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const location = navigator.geolocation;

    if (!location) {
      setLocationError('Geolocation is not supported');
      return;
    }

    location.getCurrentPosition(onSuccess, onError, {
      maximumAge: 60000,
      timeout: 5000,
      enableHighAccuracy: true,
    });
  }, []);

  const onSuccess = ({ coords }: { coords: Coords }) => {
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    setLoading(false);
  };
  const onError = (error: PositionError) => {
    setLocationError(error.message);
    setLoading(false);
  };

  return { location, locationError, loading };
};
