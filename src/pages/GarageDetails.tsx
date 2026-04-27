import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format, differenceInCalendarDays, isBefore, startOfToday } from "date-fns";
import { ArrowLeft, MapPin, Star, Maximize2, KeyRound, Calendar as CalendarIcon, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/store/useAppStore";
import { accessText, sizeText } from "@/data/mockData";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const GarageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const garage = useAppStore((s) => s.garages.find((g) => g.id === id));
  const addBookingRequest = useAppStore((s) => s.addBookingRequest);

  const [range, setRange] = useState<{ from?: Date; to?: Date }>({});
  const [message, setMessage] = useState("");

  const nights = useMemo(() => {
    if (!range.from || !range.to) return 0;
    return Math.max(1, differenceInCalendarDays(range.to, range.from));
  }, [range]);

  if (!garage) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Garage not found.</p>
        <Button asChild className="mt-4"><Link to="/garages">Back to listings</Link></Button>
      </div>
    );
  }

  const total = nights * garage.pricePerDay;

  const handleRequest = () => {
    if (!range.from || !range.to) {
      toast.error("Please pick a start and end date.");
      return;
    }
    addBookingRequest({
      garageId: garage.id,
      startDate: range.from.toISOString().slice(0, 10),
      endDate: range.to.toISOString().slice(0, 10),
      totalPrice: total,
      message,
    });
    toast.success("Booking request sent!", {
      description: `${garage.hostName} has 24 hours to respond.`,
    });
    navigate("/bookings");
  };

  return (
    <div className="container py-6 md:py-10 max-w-6xl">
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
        <Link to="/garages"><ArrowLeft className="h-4 w-4" /> Back to listings</Link>
      </Button>

      {/* Header */}
      <div className="space-y-2 mb-6">
        <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">{garage.title}</h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          {garage.rating > 0 && (
            <span className="flex items-center gap-1 text-foreground">
              <Star className="h-4 w-4 fill-foreground" /> {garage.rating}
              <span className="text-muted-foreground">({garage.reviewCount} reviews)</span>
            </span>
          )}
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{garage.address}, {garage.area}, {garage.city}</span>
        </div>
      </div>

      {/* Photos */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 mb-10 rounded-3xl overflow-hidden">
        <img
          src={garage.photos[0]}
          alt={garage.title}
          className="md:col-span-2 md:row-span-2 h-64 md:h-full w-full object-cover"
          width={1024}
          height={768}
        />
        {garage.photos.slice(1, 5).map((p, i) => (
          <img
            key={i}
            src={p}
            alt={`${garage.title} ${i + 2}`}
            loading="lazy"
            className="hidden md:block h-full w-full object-cover"
            width={512}
            height={384}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        {/* Left: details */}
        <div className="space-y-8">
          <section>
            <h2 className="font-display font-bold text-xl mb-3">About this garage</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{garage.description}</p>
          </section>

          <section className="grid sm:grid-cols-2 gap-3">
            <Feature icon={Maximize2} title="Size" body={sizeText(garage.size)} />
            <Feature icon={KeyRound} title="Access" body={accessText(garage.accessType)} />
            <Feature icon={ShieldCheck} title="Verified host" body={`Hosted by ${garage.hostName}`} />
            <Feature icon={CalendarIcon} title="Booking style" body="Request — host approves" />
          </section>

          <section className="rounded-2xl border border-border bg-muted/40 p-5">
            <h3 className="font-display font-semibold mb-2">Access instructions</h3>
            <p className="text-sm text-muted-foreground">{garage.accessInstructions}</p>
            <p className="text-xs text-muted-foreground mt-3">Full details are shared once the host confirms your request.</p>
          </section>
        </div>

        {/* Right: booking form */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-3xl border border-border bg-card-gradient p-6 shadow-elevated">
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-display text-2xl font-bold">€{garage.pricePerDay}</span>
              <span className="text-sm text-muted-foreground">/ day</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">No instant booking — every stay is host-approved.</p>

            <div className="rounded-xl border border-border bg-background p-1 mb-4">
              <Calendar
                mode="range"
                selected={range as never}
                onSelect={(r) => setRange(r as never)}
                numberOfMonths={1}
                disabled={(d) => isBefore(d, startOfToday())}
                className={cn("p-2 pointer-events-auto")}
              />
            </div>

            {range.from && range.to && (
              <div className="rounded-xl bg-muted p-3 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{format(range.from, "MMM d")} → {format(range.to, "MMM d")}</span>
                  <span className="font-medium">{nights} day{nights === 1 ? "" : "s"}</span>
                </div>
                <div className="flex justify-between mt-2 pt-2 border-t border-border">
                  <span className="font-display font-semibold">Total</span>
                  <span className="font-display font-bold">€{total}</span>
                </div>
              </div>
            )}

            <div className="space-y-2 mb-4">
              <Label htmlFor="msg">Message to host (optional)</Label>
              <Textarea
                id="msg"
                rows={3}
                placeholder={`Hi ${garage.hostName}, I'd like to park here for…`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <Button className="w-full" size="lg" onClick={handleRequest}>
              Request to book
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-3">You won't be charged until {garage.hostName} accepts.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

const Feature = ({ icon: Icon, title, body }: { icon: typeof MapPin; title: string; body: string }) => (
  <div className="flex gap-3 rounded-xl border border-border p-4 bg-card">
    <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted shrink-0">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <div className="min-w-0">
      <p className="font-medium text-sm">{title}</p>
      <p className="text-xs text-muted-foreground truncate">{body}</p>
    </div>
  </div>
);

export default GarageDetails;
