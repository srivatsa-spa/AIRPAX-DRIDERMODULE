import { useState, useEffect } from 'react';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDKEBTCflJhmLKu_u5Yg35umBhwdqoa0Qg';

export const useLocation = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string>('Cyber Hub, Gurugram');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMockLocation = async () => {
      setIsLoading(true);
      
      // Simulate a small delay for more realistic loading
      setTimeout(async () => {
        const latitude = 28.4951;
        const longitude = 77.0877;
        
        setLocation({ latitude, longitude });
        
        // Reverse Geocode mock coordinates (optional, but keep for consistency)
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
          );
          if (response.data.results && response.data.results.length > 0) {
            setAddress(response.data.results[0].formatted_address);
          }
        } catch (err) {
          console.error('Reverse geocoding failed', err);
          // Fallback to default mock address
        } finally {
          setIsLoading(false);
        }
      }, 1500);
    };

    fetchMockLocation();
  }, []);

  return { location, address, error, isLoading };
};
