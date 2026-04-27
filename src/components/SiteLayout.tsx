import { type ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { MobileTabBar } from "./MobileTabBar";

export const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 pb-20 md:pb-10">{children}</main>
      <MobileTabBar />
    </div>
  );
};
