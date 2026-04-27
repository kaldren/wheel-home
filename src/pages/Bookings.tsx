import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import { StatusBadge } from "@/components/StatusBadge";
import { toast } from "sonner";

const Bookings = () => {
  const bookings = useAppStore((s) => s.bookings.filter((b) => b.guestId === "me"));
  const garages = useAppStore((s) => s.garages);
  const setBookingStatus = useAppStore((s) => s.setBookingStatus);

  return (
    <div className="container py-6 md:py-10 max-w-3xl">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Your bookings</h1>
      <p className="text-muted-foreground mb-8">Trips you've requested or confirmed.</p>

      {bookings.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">You haven't booked anything yet.</p>
          <Button asChild className="mt-4"><Link to="/garages">Browse garages</Link></Button>
        </div>
      )}

      <div className="space-y-3">
        {bookings.map((b) => {
          const g = garages.find((x) => x.id === b.garageId);
          if (!g) return null;
          return (
            <div key={b.id} className="rounded-2xl border border-border bg-card p-4 shadow-card">
              <div className="flex gap-4">
                <Link to={`/garages/${g.id}`} className="shrink-0">
                  <img src={g.photos[0]} alt={g.title} loading="lazy" className="h-24 w-24 sm:h-28 sm:w-36 rounded-xl object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <Link to={`/garages/${g.id}`} className="font-display font-semibold line-clamp-1 hover:underline">
                      {g.title}
                    </Link>
                    <StatusBadge status={b.status} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{g.area}, {g.city}</p>
                  <p className="text-sm mt-2">
                    {format(new Date(b.startDate), "MMM d, yyyy")} → {format(new Date(b.endDate), "MMM d, yyyy")}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-display font-bold">€{b.totalPrice}</span>
                    {(b.status === "pending" || b.status === "confirmed") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setBookingStatus(b.id, "cancelled");
                          toast.success("Booking cancelled");
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bookings;
