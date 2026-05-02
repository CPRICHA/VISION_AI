import { useEffect, useState } from "react";
import { PhoneCall } from "lucide-react";
import { Button } from "./ui/button";
import fallbackPhonesData from "../data/hospital_fallback_numbers.json";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Location {
  lat: number;
  lng: number;
}

interface OverpassElement {
  id: number;
  type: "node" | "way" | "relation";
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags?: Record<string, string>;
}

interface Hospital {
  id: string;
  name: string;
  lat: number;
  lon: number;
  distanceKm: number;
  phone?: string;
}

interface FallbackPhoneEntry {
  name: string;
  phone: string | null;
}

const fallbackPhones = fallbackPhonesData as FallbackPhoneEntry[];

const levenshteinDistance = (a: string, b: string): number => {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0),
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }

  return dp[m][n];
};

const nameSimilarity = (a: string, b: string): number => {
  const s1 = a.toLowerCase().trim();
  const s2 = b.toLowerCase().trim();
  if (!s1 || !s2) return 0;
  const dist = levenshteinDistance(s1, s2);
  const maxLen = Math.max(s1.length, s2.length);
  return maxLen === 0 ? 1 : 1 - dist / maxLen;
};

const getFallbackPhoneForName = (name: string): string | undefined => {
  let bestPhone: string | undefined;
  let bestScore = 0;

  for (const entry of fallbackPhones) {
    const score = nameSimilarity(name, entry.name);
    if (score > 0.7 && score > bestScore && entry.phone) {
      bestScore = score;
      bestPhone = entry.phone;
    }
  }

  return bestPhone ?? undefined;
};

const haversineDistanceKm = (a: Location, b: Location) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // km

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

const EmergencyHospitalFinderButton = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [locationLabel, setLocationLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    setError(null);
    setHospitals([]);
    setLocationLabel(null);

    if (!navigator.geolocation) {
      setError("Unable to fetch your location. Please enable location access.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: Location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(coords);
        reverseGeocode(coords);
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

  const reverseGeocode = async (coords: Location) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lng}`;
      const res = await fetch(url, {
        headers: {
          "Accept-Language": "en",
        },
      });
      const data = await res.json();
      if (data && data.display_name) {
        setLocationLabel(data.display_name as string);
      }
    } catch {
      // Non-critical; ignore reverse geocode errors
    }
  };

  const fetchHospitals = async (coords: Location) => {
    try {
      const query = `
[out:json];
(
  node["amenity"="hospital"](around:5000, ${coords.lat}, ${coords.lng});
  way["amenity"="hospital"](around:5000, ${coords.lat}, ${coords.lng});
  relation["amenity"="hospital"](around:5000, ${coords.lat}, ${coords.lng});
);
out tags center;
`;

      const url =
        "https://overpass-api.de/api/interpreter?data=" +
        encodeURIComponent(query);

      const res = await fetch(url);
      const data = await res.json();

      if (!data.elements || data.elements.length === 0) {
        setError("No hospitals found nearby.");
        setHospitals([]);
        return;
      }

      const mapped: Hospital[] = (data.elements as OverpassElement[])
        .map((el) => {
          const tags = el.tags || {};
          const name = tags.name || "Unnamed hospital";
          const lat = el.lat ?? el.center?.lat;
          const lon = el.lon ?? el.center?.lon;
          if (lat == null || lon == null) return null;

          const distanceKm = haversineDistanceKm(coords, { lat, lng: lon });

          const osmPhone = tags.phone || tags["contact:phone"];
          const fallbackPhone = osmPhone ? undefined : getFallbackPhoneForName(name);
          const phone = osmPhone || fallbackPhone;

          return {
            id: String(el.id),
            name,
            lat,
            lon,
            distanceKm,
            phone: phone || undefined,
          } satisfies Hospital;
        })
        .filter((h): h is Hospital => h !== null)
        .sort((a, b) => {
          const aHasPhone = a.phone ? 1 : 0;
          const bHasPhone = b.phone ? 1 : 0;
          if (aHasPhone !== bHasPhone) return bHasPhone - aHasPhone;
          return a.distanceKm - b.distanceKm;
        });

      setHospitals(mapped);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch nearby hospitals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenInMaps = (lat: number, lon: number) => {
    const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-[60] h-14 w-14 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 focus-visible:ring-red-500"
        size="icon"
      >
        <PhoneCall className="h-6 w-6" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white text-black max-h-[80vh] overflow-hidden flex flex-col shadow-xl">
          <DialogHeader>
            <DialogTitle>Nearby Emergency Hospitals</DialogTitle>
            <DialogDescription>
              Hospitals within a 5 km radius of your current location.
            </DialogDescription>
          </DialogHeader>

          {locationLabel && (
            <p className="px-1 text-xs text-gray-600 mb-1">
              Location: {locationLabel}
            </p>
          )}

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
                {hospitals.map((hospital) => (
                  <Card key={hospital.id} className="border border-gray-200 shadow-sm">
                    <CardHeader className="pb-2 bg-gray-900 text-white">
                      <CardTitle className="text-base font-semibold text-white">
                        {hospital.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-2">
                      <p className="text-xs text-gray-600">
                        Phone: {hospital.phone ? (
                          <a
                            href={`tel:${hospital.phone}`}
                            className="text-blue-700 hover:underline"
                          >
                            {hospital.phone}
                          </a>
                        ) : (
                          "Phone Not Available"
                        )}
                      </p>
                      <Button
                        type="button"
                        onClick={() => handleOpenInMaps(hospital.lat, hospital.lon)}
                        className="mt-2 bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 h-8 text-xs"
                        size="sm"
                      >
                        Open in Maps
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencyHospitalFinderButton;
