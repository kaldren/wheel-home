import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import type { Garage } from "@/data/mockData";

// Custom price-pin marker built from inline SVG so it's themed
const buildIcon = (price: number, active: boolean) => {
  const bg = active ? "hsl(213,70%,15%)" : "hsl(0,0%,100%)";
  const fg = active ? "hsl(180,35%,96%)" : "hsl(213,70%,15%)";
  const border = active ? "hsl(213,70%,15%)" : "hsl(213,70%,15%)";
  const html = `
    <div style="
      transform: translate(-50%, -100%);
      background:${bg};
      color:${fg};
      border:1.5px solid ${border};
      border-radius: 9999px;
      padding: 4px 10px;
      font: 600 12px 'Manrope',system-ui,sans-serif;
      box-shadow: 0 4px 12px hsl(213 70% 15% / 0.18);
      white-space: nowrap;
    ">€${price}</div>`;
  return L.divIcon({
    html,
    className: "garage-price-marker",
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

const FitToBounds = ({ garages }: { garages: Garage[] }) => {
  const map = useMap();
  useEffect(() => {
    if (!garages.length) return;
    const bounds = L.latLngBounds(
      garages.map((g) => [g.coordinates.lat, g.coordinates.lng] as [number, number])
    );
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [garages, map]);
  return null;
};

export const GarageMap = ({
  garages,
  activeId,
  onMarkerClick,
  className,
}: {
  garages: Garage[];
  activeId?: string | null;
  onMarkerClick?: (id: string) => void;
  className?: string;
}) => {
  const center = useMemo<[number, number]>(() => {
    if (!garages.length) return [38.7223, -9.1393];
    return [garages[0].coordinates.lat, garages[0].coordinates.lng];
  }, [garages]);

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        className="h-full w-full rounded-2xl overflow-hidden"
        style={{ minHeight: 320 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitToBounds garages={garages} />
        {garages.map((g) => (
          <Marker
            key={g.id}
            position={[g.coordinates.lat, g.coordinates.lng]}
            icon={buildIcon(g.pricePerDay, activeId === g.id)}
            eventHandlers={{
              click: () => onMarkerClick?.(g.id),
            }}
          >
            <Popup closeButton={false}>
              <Link to={`/garages/${g.id}`} className="block">
                <img
                  src={g.photos[0]}
                  alt={g.title}
                  className="h-32 w-full object-cover"
                />
                <div className="p-3 space-y-1">
                  <div className="text-xs text-muted-foreground">{g.area} · {g.city}</div>
                  <div className="font-display font-semibold text-sm leading-snug line-clamp-2">
                    {g.title}
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-display font-bold text-sm">€{g.pricePerDay}<span className="text-muted-foreground font-normal"> / day</span></span>
                    <span className="text-xs font-semibold text-primary">View details →</span>
                  </div>
                </div>
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
