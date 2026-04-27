import { useCallback, useEffect, useState } from "react";
import type { Garage } from "@/data/mockData";

type GeoStatus = "idle" | "prompt" | "granted" | "denied" | "unavailable";

const STORAGE_KEY = "parkshare:geo-permission";

// Haversine distance in km
const distanceKm = (
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
) => {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

export type NearbyGarage = Garage & { distanceKm?: number };

/**
 * Returns garages sorted by distance to user when geolocation is granted,
 * otherwise returns highest-rated first as a graceful fallback.
 */
export const useNearbyGarages = (garages: Garage[]) => {
  const [status, setStatus] = useState<GeoStatus>("idle");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Re-read previously granted permission on mount (no prompt)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("geolocation" in navigator)) {
      setStatus("unavailable");
      return;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted") {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setStatus("granted");
        },
        () => setStatus("prompt"),
        { maximumAge: 5 * 60 * 1000, timeout: 8000 }
      );
    } else if (stored === "denied") {
      setStatus("denied");
    } else {
      setStatus("prompt");
    }
  }, []);

  const requestLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setStatus("unavailable");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus("granted");
        localStorage.setItem(STORAGE_KEY, "granted");
      },
      () => {
        setStatus("denied");
        localStorage.setItem(STORAGE_KEY, "denied");
      },
      { enableHighAccuracy: false, timeout: 8000 }
    );
  }, []);

  const sorted: NearbyGarage[] = coords
    ? garages
        .map((g) => ({ ...g, distanceKm: distanceKm(coords, g.coordinates) }))
        .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0))
    : [...garages].sort((a, b) => b.rating - a.rating);

  return { status, coords, sorted, requestLocation };
};
