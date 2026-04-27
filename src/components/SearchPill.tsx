import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "hero" | "compact";
  className?: string;
  defaultQuery?: string;
};

/**
 * Airbnb-style segmented search pill.
 * - Where (text)
 * - When (date range — single native input on mobile, two on desktop)
 * - Search button on the right
 *
 * Submits to /garages?q=...&from=...&to=...
 */
export const SearchPill = ({ variant = "hero", className, defaultQuery = "" }: Props) => {
  const navigate = useNavigate();
  const [where, setWhere] = useState(defaultQuery);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (where.trim()) params.set("q", where.trim());
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    navigate(`/garages${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const isHero = variant === "hero";

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "w-full rounded-full bg-background border border-border shadow-elevated",
        "flex items-stretch divide-x divide-border overflow-hidden",
        isHero ? "max-w-3xl" : "max-w-2xl",
        className
      )}
    >
      {/* Where */}
      <label className="flex-1 min-w-0 flex items-center gap-3 px-5 py-3 hover:bg-muted/60 transition-smooth cursor-text">
        <MapPin className="h-4 w-4 text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold text-foreground uppercase tracking-wide">Where</div>
          <input
            type="text"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
            placeholder="Search city or area"
            className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
        </div>
      </label>

      {/* When — from */}
      <label className="hidden sm:flex w-44 items-center gap-3 px-5 py-3 hover:bg-muted/60 transition-smooth cursor-text">
        <CalendarDays className="h-4 w-4 text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold text-foreground uppercase tracking-wide">From</div>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
        </div>
      </label>

      {/* When — to */}
      <label className="hidden md:flex w-44 items-center gap-3 px-5 py-3 hover:bg-muted/60 transition-smooth cursor-text">
        <CalendarDays className="h-4 w-4 text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold text-foreground uppercase tracking-wide">To</div>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
        </div>
      </label>

      {/* Submit */}
      <div className="flex items-center pr-1.5 pl-1">
        <button
          type="submit"
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground",
            "px-4 sm:px-5 py-2.5 my-1.5 text-sm font-semibold shadow-card",
            "hover:opacity-95 active:scale-[0.98] transition-smooth"
          )}
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </form>
  );
};
