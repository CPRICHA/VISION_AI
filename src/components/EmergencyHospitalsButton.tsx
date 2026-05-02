import { useEffect, useState } from "react";
import { PhoneCall } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Hospital {
  place_id: string;
  name: string;
  rating?: number;
  geometry?: {
    location?: {
      lat: number;
      lng: number;
    };
  };
}

interface Location {
  lat: number;
  lng: number;
}

const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY as string | undefined;

const haversineDistanceKm = (a: Location, b: Location) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
};

const EmergencyHospitalsButton = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (!open) return;

    setError(null);
    setHospitals([]);

    if (!navigator.geolocation) {
      setError("Unable to fetch your location. Please enable location access.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(coords);
        fetchHospitals(coords);
      },
      () => {
        setLoading(false);
        setError("Unable to fetch your location. Please enable location access.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const fetchHospitals = async (coords: Location) => {
    try {
      if (!GOOGLE_PLACES_API_KEY) {
        setError("Google Places API key is not configured.");
        setLoading(false);
        return;
      }

      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.lat},${coords.lng}&radius=5000&type=hospital&key=${GOOGLE_PLACES_API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.status !== "OK") {
        setError("No hospitals found nearby.");
        setHospitals([]);
      } else {
        setHospitals(data.results || []);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to fetch nearby hospitals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMaps = (placeId: string) => {
    const url = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 focus-visible:ring-red-500"
        size="icon"
      >
        <PhoneCall className="h-6 w-6" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white text-black max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Nearby Emergency Hospitals</DialogTitle>
            <DialogDescription>
              Hospitals within a 5 km radius of your current location.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {loading && (
              <p className="text-sm text-gray-700">Fetching nearby hospitals...</p>
            )}

            {!loading && error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            {!loading && !error && hospitals.length === 0 && (
              <p className="text-sm text-gray-700">No hospitals found nearby.</p>
            )}

            {!loading && !error && hospitals.length > 0 && (
              <div className="space-y-3">
                {hospitals.map((hospital) => {
                  const hospitalLocation = hospital.geometry?.location;
                  let distanceKm: number | null = null;

                  if (userLocation && hospitalLocation?.lat && hospitalLocation.lng) {
                    distanceKm = haversineDistanceKm(userLocation, {
                      lat: hospitalLocation.lat,
                      lng: hospitalLocation.lng,
                    });
                  }

                  return (
                    <Card key={hospital.place_id} className="border border-gray-200 shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-gray-900">
                          {hospital.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2">
                        {distanceKm !== null && (
                          <p className="text-xs text-gray-600">
                            Distance: {distanceKm.toFixed(2)} km
                          </p>
                        )}
                        {hospital.rating !== undefined && (
                          <p className="text-xs text-gray-600">Rating: {hospital.rating} / 5</p>
                        )}
                        <Button
                          type="button"
                          onClick={() => handleOpenMaps(hospital.place_id)}
                          className="mt-2 bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 h-8 text-xs"
                          size="sm"
                        >
                          Open in Maps
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencyHospitalsButton;
