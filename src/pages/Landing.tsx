import { Link } from "react-router-dom";
import { ArrowRight, MapPin, ShieldCheck, CalendarCheck, Wallet, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GarageCard } from "@/components/GarageCard";
import { useAppStore } from "@/store/useAppStore";
import heroImage from "@/assets/hero-garage.jpg";

const Landing = () => {
  const garages = useAppStore((s) => s.garages).slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Modern residential garage at dusk"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-secondary/60" />
        </div>
        <div className="relative container py-20 md:py-32 text-primary-foreground">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" /> Trusted by drivers across the city
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Park anywhere.<br />
              <span className="text-accent">Hosted by neighbors.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 max-w-xl">
              ParkShare connects drivers with private garages and parking spots — securely, by the day, and always with host approval.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="bg-background text-primary hover:bg-background/90 shadow-elevated">
                <Link to="/garages">
                  <Search className="h-4 w-4" /> Find a garage
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
                <Link to="/host/new">
                  List your garage <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container py-16 md:py-24">
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

      {/* FEATURED */}
      <section className="container pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">Featured garages</h2>
            <p className="text-muted-foreground mt-1">Hand-picked spots from our hosts.</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/garages">View all <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {garages.map((g) => <GarageCard key={g.id} garage={g} />)}
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
