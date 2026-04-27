import { useMemo, useState } from "react";
import { LayoutGrid, Map as MapIcon, SplitSquareHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GarageCard } from "@/components/GarageCard";
import { GarageMap } from "@/components/GarageMap";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

type View = "list" | "map" | "split";

const Listings = () => {
  const garages = useAppStore((s) => s.garages);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("split");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return garages;
    return garages.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.city.toLowerCase().includes(q) ||
        g.area.toLowerCase().includes(q) ||
        g.address.toLowerCase().includes(q)
    );
  }, [garages, query]);

  return (
    <div className="container py-6 md:py-10">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">
            {filtered.length} garage{filtered.length === 1 ? "" : "s"} available
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Lisbon and surrounding areas</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by area or city"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {/* View toggle */}
      <div className="mb-5 inline-flex rounded-full border border-border bg-muted p-1">
        <ViewBtn current={view} value="list" onClick={() => setView("list")} icon={LayoutGrid} label="List" />
        <ViewBtn current={view} value="map" onClick={() => setView("map")} icon={MapIcon} label="Map" />
        <ViewBtn
          current={view}
          value="split"
          onClick={() => setView("split")}
          icon={SplitSquareHorizontal}
          label="Split"
          desktopOnly
        />
      </div>

      {/* Layouts */}
      {view === "list" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((g) => <GarageCard key={g.id} garage={g} />)}
          {filtered.length === 0 && <EmptyState />}
        </div>
      )}

      {view === "map" && (
        <div className="h-[calc(100vh-260px)] min-h-[420px]">
          <GarageMap garages={filtered} activeId={activeId} onMarkerClick={setActiveId} className="h-full" />
        </div>
      )}

      {view === "split" && (
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 items-start">
          <div className="grid sm:grid-cols-2 gap-5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {filtered.map((g) => (
              <div
                key={g.id}
                onMouseEnter={() => setActiveId(g.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                <GarageCard garage={g} />
              </div>
            ))}
            {filtered.length === 0 && <EmptyState />}
          </div>
          <div className="lg:sticky lg:top-24 h-[60vh] lg:h-[calc(100vh-160px)]">
            <GarageMap garages={filtered} activeId={activeId} onMarkerClick={setActiveId} className="h-full" />
          </div>
        </div>
      )}
    </div>
  );
};

const ViewBtn = ({
  current,
  value,
  onClick,
  icon: Icon,
  label,
  desktopOnly,
}: {
  current: View;
  value: View;
  onClick: () => void;
  icon: typeof Search;
  label: string;
  desktopOnly?: boolean;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-smooth",
      current === value ? "bg-background text-foreground shadow-card" : "text-muted-foreground hover:text-foreground",
      desktopOnly && "hidden md:inline-flex"
    )}
  >
    <Icon className="h-4 w-4" /> {label}
  </button>
);

const EmptyState = () => (
  <div className="col-span-full text-center py-20">
    <p className="text-muted-foreground">No garages match your search.</p>
    <Button variant="outline" className="mt-4" onClick={() => location.reload()}>Reset</Button>
  </div>
);

export default Listings;
