"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  properties: {
    address?: string;
    name: string;
    full_address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
}

// Add new interfaces for Search Box API
interface SearchBoxSuggestion {
  name: string;
  place_formatted: string;
  description?: string;
  mapbox_id: string;
  feature_type: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  context?: {
    region?: {
      name: string;
    };
    district?: {
      name: string;
    };
    place?: {
      name: string;
    };
  };
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
  const [suggestions, setSuggestions] = useState<SearchBoxSuggestion[]>([]);
  const [sessionToken] = useState(() => crypto.randomUUID());

  async function fetchSuggestions(query: string) {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/suggest?` +
          new URLSearchParams({
            q: query,
            access_token: mapboxgl.accessToken,
            session_token: sessionToken,
            country: "ID",
            limit: "5",
            types: "poi,address,place",
            poi_category: "pharmacy",
            language: "id",
          })
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuggestions(data?.suggestions || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
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

  const fetchNearbyPharmacies = useCallback(
    async (lat: number, lng: number) => {
      if (!lat || !lng) {
        console.warn("Invalid coordinates provided to fetchNearbyPharmacies");
        setPharmacies([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.mapbox.com/search/searchbox/v1/category/pharmacy?` +
            new URLSearchParams({
              access_token: mapboxgl.accessToken,
              language: "id",
              limit: "10",
              proximity: `${lng},${lat}`,
            })
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.features) {
          console.warn("No features found in response");
          setPharmacies([]);
          return;
        }

        const pharmaciesList: Pharmacy[] = data.features
          .filter(
            (feature: MapboxPharmacyFeature) =>
              feature?.properties?.name && feature?.geometry?.coordinates
          )
          .map((feature: MapboxPharmacyFeature) => ({
            id: feature.id || crypto.randomUUID(),
            name: feature.properties.name,
            address: feature.properties.address || "Alamat tidak tersedia",
            distance: calculateDistance(
              lat,
              lng,
              feature.geometry.coordinates[1],
              feature.geometry.coordinates[0]
            ),
            isOpen: true,
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0],
          }));

        setPharmacies(pharmaciesList);

        // Update markers on map
        if (map.current) {
          // Clear existing markers
          const existingMarkers = document.getElementsByClassName("marker");
          while (existingMarkers[0]) {
            existingMarkers[0].remove();
          }

          const bounds = new mapboxgl.LngLatBounds();

          pharmaciesList.forEach((pharmacy) => {
            // Create marker element
            const markerEl = document.createElement("div");
            markerEl.className = "marker";
            markerEl.innerHTML = `
            <div class="bg-white p-2 rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>
          `;

            bounds.extend([pharmacy.lng, pharmacy.lat]);

            // Create popup
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-2">
              <h3 class="font-bold">${pharmacy.name}</h3>
              <p class="text-sm text-gray-600">${pharmacy.address}</p>
              <p class="text-sm text-gray-500">${pharmacy.distance.toFixed(
                1
              )} km</p>
            </div>
          `);

            // Add marker to map
            if (map.current) {
              new mapboxgl.Marker(markerEl)
                .setLngLat([pharmacy.lng, pharmacy.lat])
                .setPopup(popup)
                .addTo(map.current);
            }
          });

          // Fit map to show all markers
          if (!bounds.isEmpty()) {
            map.current.fitBounds(bounds, {
              padding: 50,
              maxZoom: 15,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
        setPharmacies([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleSuggestionClick = useCallback(
    (suggestion: SearchBoxSuggestion) => {
      if (
        !suggestion?.coordinates?.latitude ||
        !suggestion?.coordinates?.longitude
      ) {
        console.warn("Invalid suggestion coordinates");
        return;
      }

      // Format detailed location with available context
      const locationDetails = [
        suggestion.name,
        suggestion.context?.district?.name,
        suggestion.context?.place?.name,
        suggestion.context?.region?.name,
      ]
        .filter(Boolean)
        .join(", ");

      setSearchQuery(locationDetails || suggestion.name);
      setSuggestions([]);

      if (map.current) {
        try {
          // Clear existing markers
          const existingMarkers =
            document.getElementsByClassName("selected-location");
          while (existingMarkers[0]) {
            existingMarkers[0].remove();
          }

          // Add a marker for the selected location
          const markerEl = document.createElement("div");
          markerEl.className = "selected-location";

          new mapboxgl.Marker({
            element: markerEl,
            color: "#FF0000",
          })
            .setLngLat([
              suggestion.coordinates.longitude,
              suggestion.coordinates.latitude,
            ])
            .setPopup(
              new mapboxgl.Popup().setHTML(
                `<div class="p-2">
                  <h3 class="font-bold">Lokasi yang Dipilih</h3>
                  <p class="text-sm text-gray-600">${
                    locationDetails || suggestion.name
                  }</p>
                </div>`
              )
            )
            .addTo(map.current);

          map.current.flyTo({
            center: [
              suggestion.coordinates.longitude,
              suggestion.coordinates.latitude,
            ],
            zoom: 15,
            essential: true,
          });

          fetchNearbyPharmacies(
            suggestion.coordinates.latitude,
            suggestion.coordinates.longitude
          );
        } catch (error) {
          console.error("Error handling suggestion click:", error);
        }
      }
    },
    [fetchNearbyPharmacies]
  );

  const handleDirections = (lat: number, lng: number): void => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
  };

  const handleLocationSuccess = useCallback(
    (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      if (!latitude || !longitude) {
        console.warn("Invalid coordinates from geolocation");
        return;
      }

      try {
        if (map.current) {
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 15,
            essential: true,
          });
        }

        fetchNearbyPharmacies(latitude, longitude);
      } catch (error) {
        console.error("Error handling location success:", error);
        // Fallback to default location
        fetchNearbyPharmacies(mapCenter[1], mapCenter[0]);
      }
    },
    [fetchNearbyPharmacies, mapCenter]
  );

  const handleMapClick = useCallback(
    (e: mapboxgl.MapMouseEvent) => {
      if (!e.lngLat) return;

      const { lng, lat } = e.lngLat;

      // Clear existing selected location markers
      const existingMarkers =
        document.getElementsByClassName("selected-location");
      while (existingMarkers[0]) {
        existingMarkers[0].remove();
      }

      // Add marker for clicked location
      const markerEl = document.createElement("div");
      markerEl.className = "selected-location";

      if (map.current) {
        new mapboxgl.Marker({
          element: markerEl,
          color: "#FF0000",
        })
          .setLngLat([lng, lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(
              `<div class="p-2">
              <h3 class="font-bold">Lokasi yang Dipilih</h3>
            </div>`
            )
          )
          .addTo(map.current);

        // Update search query with coordinates
        setSearchQuery(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);

        // Fetch nearby pharmacies for this location
        fetchNearbyPharmacies(lat, lng);
      }
    },
    [fetchNearbyPharmacies]
  );

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: mapCenter,
        zoom: 13,
      });

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
        trackUserLocation: true,
        showUserHeading: true,
      });

      map.current.addControl(geolocate);
      map.current.addControl(new mapboxgl.NavigationControl());
      map.current.addControl(new mapboxgl.FullscreenControl());
      map.current.addControl(new mapboxgl.ScaleControl());

      map.current.on("click", handleMapClick); // Add this line

      map.current.on("load", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            handleLocationSuccess,
            (error) => {
              console.warn("Geolocation error:", error.message);
              // Fallback to default location
              fetchNearbyPharmacies(mapCenter[1], mapCenter[0]);
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            }
          );
        } else {
          console.warn("Geolocation not supported");
          // Fallback to default location
          fetchNearbyPharmacies(mapCenter[1], mapCenter[0]);
        }
      });

      return () => {
        if (map.current) {
          map.current.off("click", handleMapClick); // Clean up event listener
          map.current.remove();
          map.current = null;
        }
      };
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [mapCenter, fetchNearbyPharmacies, handleLocationSuccess, handleMapClick]); // Add handleMapClick to dependencies

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
                if (e.target.value) {
                  fetchSuggestions(e.target.value);
                } else {
                  setSuggestions([]);
                }
              }}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
            />
            <Search
              className="absolute right-3 top-3 text-slate-400"
              size={20}
            />

            {Array.isArray(suggestions) && suggestions.length > 0 && (
              <Card className="absolute w-full mt-1 z-50">
                <ScrollArea className="max-h-[300px]">
                  {suggestions.map((suggestion) => {
                    const details = [
                      suggestion.context?.district?.name,
                      suggestion.context?.place?.name,
                      suggestion.context?.region?.name,
                    ]
                      .filter(Boolean)
                      .join(", ");

                    return (
                      <Button
                        key={suggestion.mapbox_id}
                        variant="ghost"
                        className="w-full justify-start font-normal p-4 hover:bg-slate-50"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="text-left w-full">
                          <div className="font-medium text-base">
                            {suggestion.name}
                          </div>
                          {details && (
                            <div className="text-sm text-slate-500 mt-1">
                              {details}
                            </div>
                          )}
                        </div>
                      </Button>
                    );
                  })}
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
