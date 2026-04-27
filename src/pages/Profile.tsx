import { Link } from "react-router-dom";
import { Mail, MapPin, Settings, LogOut, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppStore } from "@/store/useAppStore";

const Profile = () => {
  const bookings = useAppStore((s) => s.bookings.filter((b) => b.guestId === "me"));
  const garages = useAppStore((s) => s.garages);
  const myGarages = garages.slice(0, 3);

  return (
    <div className="container py-6 md:py-10 max-w-3xl">
      {/* Profile header */}
      <div className="rounded-3xl bg-hero p-6 md:p-8 text-primary-foreground shadow-elevated">
        <div className="flex items-center gap-5">
          <Avatar className="h-20 w-20 ring-4 ring-primary-foreground/20">
            <AvatarFallback className="bg-background text-primary font-display text-2xl font-bold">YO</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">Your profile</h1>
            <p className="text-primary-foreground/80 text-sm flex items-center gap-1.5 mt-1">
              <MapPin className="h-3.5 w-3.5" /> Lisbon, Portugal
            </p>
            <p className="text-primary-foreground/80 text-sm flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> you@parkshare.app
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <StatBox value={bookings.length} label="Bookings" />
        <StatBox value={myGarages.length} label="Listings" />
        <StatBox value="4.9" label={<span className="flex items-center gap-1 justify-center"><Star className="h-3 w-3 fill-current" />Rating</span>} />
      </div>

      {/* Sections */}
      <div className="mt-8 space-y-3">
        <Row to="/bookings" title="My bookings" subtitle="Requested and confirmed trips" />
        <Row to="/host" title="Host dashboard" subtitle="Your listings and incoming requests" />
        <Row to="/host/new" title="Add a new garage" subtitle="Earn from a space you're not using" />
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-3">
        <Button variant="outline" className="w-full"><Settings className="h-4 w-4" /> Account settings</Button>
        <Button variant="outline" className="w-full"><LogOut className="h-4 w-4" /> Sign out</Button>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-10">
        ParkShare MVP · Auth and persistent profiles connect later via Lovable Cloud.
      </p>
    </div>
  );
};

const StatBox = ({ value, label }: { value: React.ReactNode; label: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-card">
    <div className="font-display text-2xl font-bold">{value}</div>
    <div className="text-xs text-muted-foreground mt-1">{label}</div>
  </div>
);

const Row = ({ to, title, subtitle }: { to: string; title: string; subtitle: string }) => (
  <Link
    to={to}
    className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-card transition-smooth hover:bg-muted/40"
  >
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
    <span className="text-muted-foreground">→</span>
  </Link>
);

export default Profile;
