import { useState, useEffect } from 'react';

interface Coords {
  latitude: number;
  longitude: number;
}

export const useLocation = (): {
  location: Coords | null;
  locationError: string | null;
  loadingLocation: boolean;
} => {
  const [location, setLocation] = useState<Coords | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(true);

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
    setLoadingLocation(false);
  };
  const onError = (error: PositionError) => {
    setLocationError(error.message);
    setLoadingLocation(false);
  };

  return { location, locationError, loadingLocation };
};
