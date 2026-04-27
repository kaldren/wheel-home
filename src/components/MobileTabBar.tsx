import { NavLink } from "react-router-dom";
import { Search, LayoutGrid, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const MobileTabBar = () => {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-md">
      <div className="grid grid-cols-4">
        <Tab to="/garages" icon={Search} label="Browse" />
        <Tab to="/host" icon={LayoutGrid} label="Host" />
        <Tab to="/bookings" icon={Calendar} label="Bookings" />
        <Tab to="/profile" icon={User} label="Profile" />
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
};

const Tab = ({ to, icon: Icon, label }: { to: string; icon: typeof Search; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-smooth",
        isActive ? "text-primary" : "text-muted-foreground"
      )
    }
  >
    <Icon className="h-5 w-5" />
    {label}
  </NavLink>
);
