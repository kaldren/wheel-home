import { Link, NavLink, useLocation } from "react-router-dom";
import { Warehouse, LayoutGrid, Calendar, User, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SiteHeader = () => {
  const location = useLocation();
  const onLanding = location.pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b backdrop-blur-md transition-smooth",
        onLanding
          ? "border-transparent bg-background/70"
          : "border-border bg-background/90"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-hero text-primary-foreground shadow-glow">
            <Warehouse className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline">ParkShare</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavItem to="/garages" icon={Search} label="Browse" />
          <NavItem to="/host" icon={LayoutGrid} label="Host" />
          <NavItem to="/bookings" icon={Calendar} label="Bookings" />
          <NavItem to="/profile" icon={User} label="Profile" />
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex">
            <Link to="/host/new">
              <Plus className="h-4 w-4" /> List your garage
            </Link>
          </Button>
          <Button asChild size="sm" className="md:hidden">
            <Link to="/garages">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: typeof Search;
  label: string;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-smooth",
        isActive
          ? "bg-primary text-primary-foreground shadow-card"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )
    }
  >
    <Icon className="h-4 w-4" />
    {label}
  </NavLink>
);
