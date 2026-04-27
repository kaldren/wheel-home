import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Navigation, ShieldCheck, CalendarCheck, Wallet, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GarageCard } from "@/components/GarageCard";
import { SearchPill } from "@/components/SearchPill";
import { useAppStore } from "@/store/useAppStore";
import { useNearbyGarages } from "@/hooks/useNearbyGarages";
import heroImage from "@/assets/hero-garage.jpg";

const Landing = () => {
  const garages = useAppStore((s) => s.garages);
  const { status, sorted, requestLocation } = useNearbyGarages(garages);

  const showingNearby = status === "granted";
  const sectionTitle = showingNearby ? "Garages near you" : "Popular garages around";
  const sectionSubtitle = showingNearby
    ? "Sorted by distance from your current location."
    : "Top-rated spots from our hosts. Share your location for nearby results.";

  return (
    <div>
      {/* HERO with search pill (Airbnb-style) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Modern residential garage at dusk"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/65 to-background" />
        </div>
        <div className="relative container pt-16 pb-24 md:pt-24 md:pb-32 text-primary-foreground">
          <div className="max-w-3xl space-y-5 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" /> Trusted by drivers across the city
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Find a garage,<br />
              <span className="text-accent">park stress-free.</span>
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/85 max-w-xl">
              Private garages and parking spots, hosted by neighbors. Book by the day — every stay approved by the host.
            </p>
          </div>

          {/* Search pill */}
          <div className="relative mt-8 md:mt-12">
            <SearchPill />
          </div>
        </div>
      </section>

      {/* NEARBY / POPULAR */}
      <section className="container -mt-8 md:-mt-12 relative z-10 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-2">
              {showingNearby ? <Navigation className="h-5 w-5 text-primary" /> : <MapPin className="h-5 w-5 text-primary" />}
              {sectionTitle}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">{sectionSubtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            {!showingNearby && status !== "unavailable" && (
              <Button
                onClick={requestLocation}
                variant="outline"
                className="rounded-full"
              >
                <Navigation className="h-4 w-4" />
                {status === "denied" ? "Location blocked" : "Use my location"}
              </Button>
            )}
            <Button asChild variant="ghost" className="rounded-full">
              <Link to="/garages">View all <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>

        {/* Permission hint banner */}
        {status === "prompt" && (
          <div className="mb-6 rounded-2xl border border-border bg-card-gradient p-4 sm:p-5 shadow-card flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shrink-0">
              <Navigation className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold leading-snug">See garages closest to you</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Share your location and we'll sort spots by distance — nothing leaves your device.
              </p>
            </div>
            <Button onClick={requestLocation} className="rounded-full shrink-0">
              Allow
            </Button>
          </div>
        )}

        {status === "denied" && (
          <div className="mb-6 rounded-2xl border border-border bg-muted/40 p-4 flex items-center gap-3 text-sm">
            <X className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Location is blocked. Showing top-rated garages instead — you can enable location in your browser settings.
            </span>
          </div>
        )}

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
          {sorted.slice(0, 8).map((g) => (
            <GarageCard
              key={g.id}
              garage={g}
              distanceKm={showingNearby ? g.distanceKm : undefined}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link to="/garages">Explore all garages <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container py-16 md:py-20 border-t border-border">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold">How ParkShare works</h2>
          <p className="text-muted-foreground mt-3">Three simple steps. No instant bookings — every stay is approved by the host.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: MapPin, title: "Find a spot near you", body: "Browse on the map or in a list. Filter by area, size, and access type." },
            { icon: CalendarCheck, title: "Send a booking request", body: "Pick your dates and add a short note. The host has 24 hours to respond." },
            { icon: Wallet, title: "Park with confidence", body: "Once confirmed, you'll receive access instructions. No surprises, no double-bookings." },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card-gradient p-6 shadow-card transition-smooth hover:shadow-elevated hover:-translate-y-1">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground mb-4">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-1.5">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="rounded-3xl bg-hero p-8 md:p-14 text-primary-foreground shadow-elevated overflow-hidden relative">
          <div className="relative z-10 max-w-xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">Got an empty garage?</h2>
            <p className="mt-3 text-primary-foreground/85">Earn extra income from a space you're not using. List in minutes — you stay in control of every booking.</p>
            <Button asChild size="lg" className="mt-6 bg-background text-primary hover:bg-background/90">
              <Link to="/host/new">Become a host <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
