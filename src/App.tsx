import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteLayout } from "@/components/SiteLayout";
import Landing from "./pages/Landing";
import Listings from "./pages/Listings";
import GarageDetails from "./pages/GarageDetails";
import HostDashboard from "./pages/HostDashboard";
import AddGarage from "./pages/AddGarage";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SiteLayout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/garages" element={<Listings />} />
            <Route path="/garages/:id" element={<GarageDetails />} />
            <Route path="/host" element={<HostDashboard />} />
            <Route path="/host/new" element={<AddGarage />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SiteLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
