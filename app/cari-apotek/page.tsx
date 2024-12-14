"use client";

import { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  distance: number;
  isOpen: boolean;
  lat: number;
  lng: number;
}

interface MapboxFeature {
  id: string;
  place_name: string;
  center: [number, number];
  geometry: {
    coordinates: [number, number];
    type: string;
  };
  properties: {
    address?: string;
  };
}

interface MapboxPharmacyFeature extends MapboxFeature {
  text: string;
  place_name: string;
  center: [number, number];
}

function PharmacyCard({
  pharmacy,
  onDirections,
}: {
  pharmacy: Pharmacy;
  onDirections: (lat: number, lng: number) => void;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold">{pharmacy.name}</h3>
        <p className="text-sm text-slate-500">{pharmacy.address}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm">{pharmacy.distance.toFixed(1)} km</span>
          <Button
            size="sm"
            onClick={() => onDirections(pharmacy.lat, pharmacy.lng)}
          >
            Petunjuk Arah
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-8">
      <p className="text-slate-500">
        Belum ada apotek yang ditemukan. Silakan cari lokasi terlebih dahulu.
      </p>
    </div>
  );
}

export default function Pharmacies() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(false);
  const [mapCenter] = useState<[number, number]>([106.8456, -6.2088]);
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);

  async function fetchSuggestions(query: string) {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?` +
          new URLSearchParams({
            access_token: mapboxgl.accessToken,
            country: "ID",
            limit: "5",
            types: "place,locality,neighborhood,address",
            language: "id",
          })
      );
      const data = await response.json();
      setSuggestions(data.features);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  }

  async function fetchNearbyPharmacies(lat: number, lng: number) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/pharmacy.json?` +
          new URLSearchParams({
            access_token: mapboxgl.accessToken,
            proximity: `${lng},${lat}`,
            limit: "10",
            types: "poi",
            language: "id",
          })
      );
      const data = await response.json();

      const pharmaciesList: Pharmacy[] = data.features.map(
        (feature: MapboxPharmacyFeature) => ({
          id: feature.id,
          name: feature.text,
          address: feature.place_name,
          distance: calculateDistance(
            lat,
            lng,
            feature.center[1],
            feature.center[0]
          ),
          isOpen: true,
          lat: feature.center[1],
          lng: feature.center[0],
        })
      );

      setPharmacies(pharmaciesList);

      if (map.current) {
        const existingMarkers = document.getElementsByClassName("marker");
        while (existingMarkers[0]) {
          existingMarkers[0].remove();
        }

        pharmaciesList.forEach((pharmacy) => {
          const el = document.createElement("div");
          el.className = "marker";
          el.style.backgroundImage = "url(/pharmacy-marker.png)";
          el.style.width = "32px";
          el.style.height = "32px";
          el.style.backgroundSize = "cover";

          if (map.current) {
            new mapboxgl.Marker(el)
              .setLngLat([pharmacy.lng, pharmacy.lat])
              .setPopup(
                new mapboxgl.Popup().setHTML(
                  `<h3>${pharmacy.name}</h3><p>${pharmacy.address}</p>`
                )
              )
              .addTo(map.current);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching pharmacies:", error);
    } finally {
      setLoading(false);
    }
  }

  function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function handleSuggestionClick(suggestion: MapboxFeature) {
    const newCenter = suggestion.center;
    setSearchQuery(suggestion.place_name);
    setSuggestions([]);

    if (map.current) {
      map.current.flyTo({
        center: newCenter,
        zoom: 15,
        essential: true,
      });
    }

    fetchNearbyPharmacies(newCenter[1], newCenter[0]);
  }

  function handleDirections(lat: number, lng: number) {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
  }

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: mapCenter,
      zoom: 13,
    });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    map.current.addControl(geolocate);
    map.current.addControl(new mapboxgl.NavigationControl());
    map.current.addControl(new mapboxgl.FullscreenControl());
    map.current.addControl(new mapboxgl.ScaleControl());

    map.current.on("load", () => {
      geolocate.trigger();
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapCenter]);

  function handleSearch(searchQuery: string) {
    setLoading(true);
    fetchSuggestions(searchQuery);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b pt-20 from-slate-50 to-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
            Temukan Apotek Terdekat{" "}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Cari apotek terdekat dari lokasi Anda dengan mudah dan cepat.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-16 relative">
          <div className="relative">
            <Input
              className="w-full"
              placeholder="Masukkan alamat atau nama lokasi..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
            />
            <Search
              className="absolute right-3 top-3 text-slate-400"
              size={20}
            />

            {suggestions.length > 0 && (
              <Card className="absolute w-full mt-1 z-50">
                <ScrollArea className="max-h-[200px]">
                  {suggestions.map((suggestion) => (
                    <Button
                      key={suggestion.id}
                      variant="ghost"
                      className="w-full justify-start font-normal"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.place_name}
                    </Button>
                  ))}
                </ScrollArea>
              </Card>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Card className="lg:col-span-7">
            <div className="h-[700px]" ref={mapContainer} />
          </Card>

          <Card className="lg:col-span-5">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                {loading
                  ? "Mencari apotek..."
                  : pharmacies.length > 0
                  ? `${pharmacies.length} Apotek Ditemukan`
                  : "Daftar Apotek"}
              </h2>

              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                    </div>
                  ) : pharmacies.length > 0 ? (
                    pharmacies.map((pharmacy) => (
                      <PharmacyCard
                        key={pharmacy.id}
                        pharmacy={pharmacy}
                        onDirections={handleDirections}
                      />
                    ))
                  ) : (
                    <EmptyState />
                  )}
                </div>{" "}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
