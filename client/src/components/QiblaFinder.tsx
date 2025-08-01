import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navigation, MapPin } from "lucide-react";

export function QiblaFinder() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat, lng });
          
          // Calculate Qibla direction (simplified calculation)
          const kaabaLat = 21.4225; // Kaaba latitude
          const kaabaLng = 39.8262; // Kaaba longitude
          
          const bearing = calculateBearing(lat, lng, kaabaLat, kaabaLng);
          setQiblaDirection(bearing);
          
          const dist = calculateDistance(lat, lng, kaabaLat, kaabaLng);
          setDistance(dist);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const calculateBearing = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    
    const y = Math.sin(dLng) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);
    
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = (bearing + 360) % 360;
    
    return bearing;
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getDirectionText = (bearing: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(bearing / 45) % 8;
    return directions[index];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Qibla Direction</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {location ? 'Location detected' : 'Detecting location...'}
        </p>
      </div>
      <div className="p-6">
        <div className="relative mb-6">
          <div className="w-full h-48 bg-gradient-to-br from-islamic-emerald/20 to-islamic-navy/20 rounded-xl flex items-center justify-center relative">
            <div className="w-32 h-32 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center border-4 border-islamic-gold">
              <div className="text-center">
                <Navigation 
                  className="w-8 h-8 text-islamic-emerald mb-2 mx-auto"
                  style={{ transform: `rotate(${qiblaDirection}deg)` }}
                />
                <div className="text-sm font-semibold text-islamic-navy dark:text-islamic-gold">
                  {Math.round(qiblaDirection)}° {getDirectionText(qiblaDirection)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-islamic-cream/30 dark:bg-gray-700/30 rounded-lg p-4 text-center mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Distance to Kaaba</p>
          <p className="text-lg font-semibold text-islamic-emerald dark:text-islamic-gold">
            {distance > 0 ? `${Math.round(distance).toLocaleString()} km` : 'Calculating...'}
          </p>
        </div>

        {!location && (
          <Button 
            onClick={() => window.location.reload()}
            className="w-full bg-islamic-emerald hover:bg-islamic-emerald/90"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Enable Location
          </Button>
        )}
      </div>
    </div>
  );
}
