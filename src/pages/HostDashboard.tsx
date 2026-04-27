import { Link } from "react-router-dom";
import { Plus, TrendingUp, CalendarClock, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import { StatusBadge } from "@/components/StatusBadge";
import { format } from "date-fns";
import { toast } from "sonner";

const HostDashboard = () => {
  const garages = useAppStore((s) => s.garages);
  const bookings = useAppStore((s) => s.bookings);
  const setBookingStatus = useAppStore((s) => s.setBookingStatus);

  // Pretend "my" hosted garages are the first three
  const myGarages = garages.slice(0, 3);
  const myGarageIds = new Set(myGarages.map((g) => g.id));
  const incoming = bookings.filter((b) => myGarageIds.has(b.garageId));

  const pendingCount = incoming.filter((b) => b.status === "pending").length;
  const confirmedCount = incoming.filter((b) => b.status === "confirmed").length;
  const revenue = incoming
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const handle = (id: string, status: "confirmed" | "rejected") => {
    setBookingStatus(id, status);
    toast.success(status === "confirmed" ? "Booking confirmed" : "Booking rejected");
  };

  return (
    <div className="container py-6 md:py-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Host dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your garages and incoming requests.</p>
        </div>
        <Button asChild size="lg">
          <Link to="/host/new"><Plus className="h-4 w-4" /> Add a new garage</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <Stat icon={CalendarClock} label="Pending requests" value={pendingCount} tone="warning" />
        <Stat icon={CheckCircle2} label="Confirmed bookings" value={confirmedCount} tone="success" />
        <Stat icon={TrendingUp} label="Revenue this month" value={`€${revenue}`} tone="primary" />
      </div>

      {/* Garages */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-bold mb-4">Your listings</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {myGarages.map((g) => (
            <Link
              key={g.id}
              to={`/garages/${g.id}`}
              className="group rounded-2xl overflow-hidden border border-border bg-card shadow-card transition-smooth hover:shadow-elevated"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={g.photos[0]} alt={g.title} className="h-full w-full object-cover group-hover:scale-105 transition-smooth" loading="lazy" />
              </div>
              <div className="p-4">
                <p className="font-display font-semibold line-clamp-1">{g.title}</p>
                <p className="text-sm text-muted-foreground">{g.area}</p>
                <p className="mt-2 font-display font-bold">€{g.pricePerDay}<span className="text-sm font-normal text-muted-foreground"> / day</span></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pending requests */}
      <section>
        <h2 className="font-display text-xl font-bold mb-4">Incoming requests</h2>
        <div className="space-y-3">
          {incoming.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No requests yet. Share your listings!
            </div>
          )}
          {incoming.map((b) => {
            const g = garages.find((x) => x.id === b.garageId)!;
            return (
              <div key={b.id} className="rounded-2xl border border-border bg-card p-4 md:p-5 shadow-card">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <img src={g.photos[0]} alt={g.title} className="h-20 w-28 rounded-xl object-cover shrink-0" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display font-semibold">{g.title}</p>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium text-foreground">{b.guestName}</span> · {format(new Date(b.startDate), "MMM d")} → {format(new Date(b.endDate), "MMM d")} · €{b.totalPrice}
                    </p>
                    {b.message && <p className="text-sm text-muted-foreground mt-2 italic">"{b.message}"</p>}
                  </div>
                  {b.status === "pending" && (
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => handle(b.id, "rejected")}>
                        <XCircle className="h-4 w-4" /> Decline
                      </Button>
                      <Button size="sm" onClick={() => handle(b.id, "confirmed")}>
                        <CheckCircle2 className="h-4 w-4" /> Approve
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

const Stat = ({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string | number;
  tone: "warning" | "success" | "primary";
}) => {
  const tones = {
    warning: "bg-warning/15 text-warning-foreground",
    success: "bg-success/15 text-success",
    primary: "bg-primary text-primary-foreground",
  };
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className={`grid h-10 w-10 place-items-center rounded-xl mb-3 ${tones[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-display text-2xl font-bold mt-0.5">{value}</p>
    </div>
  );
};

export default HostDashboard;
