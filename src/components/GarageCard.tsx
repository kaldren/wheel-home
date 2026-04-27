import { Link } from "react-router-dom";
import { MapPin, Star, Maximize2 } from "lucide-react";
import type { Garage } from "@/data/mockData";
import { sizeText } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const GarageCard = ({
  garage,
  className,
  distanceKm,
}: {
  garage: Garage;
  className?: string;
  distanceKm?: number;
}) => {
  return (
    <Link
      to={`/garages/${garage.id}`}
      className={cn(
        "group block animate-fade-in",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-2xl bg-muted aspect-[4/3] shadow-card">
        <img
          src={garage.photos[0]}
          alt={garage.title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-xs font-semibold text-foreground shadow-card">
          {garage.area}
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold leading-snug line-clamp-1">
            {garage.title}
          </h3>
          {garage.rating > 0 && (
            <span className="flex items-center gap-1 text-sm shrink-0">
              <Star className="h-3.5 w-3.5 fill-foreground" />
              {garage.rating}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate">{garage.city}</span>
          <span>·</span>
          {typeof distanceKm === "number" ? (
            <span className="truncate font-medium text-foreground">
              {distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m` : `${distanceKm.toFixed(1)} km`} away
            </span>
          ) : (
            <>
              <Maximize2 className="h-3.5 w-3.5" />
              <span className="truncate">{sizeText(garage.size).split(" ·")[0]}</span>
            </>
          )}
        </div>
        <p className="pt-1">
          <span className="font-display font-bold text-base">€{garage.pricePerDay}</span>
          <span className="text-muted-foreground text-sm"> / day</span>
        </p>
      </div>
    </Link>
  );
};
