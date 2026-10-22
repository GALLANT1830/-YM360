import { Outlet } from "react-router-dom";
import SidebarNav from "@/components/layout/SidebarNav";
import TopBar from "@/components/layout/TopBar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import LegalFooter from "@/components/layout/LegalFooter";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">
        <SidebarNav />
      </aside>
      <div className="flex min-h-screen flex-col lg:pl-64">
        <TopBar />
        <main className="flex-1 pb-20 lg:pb-0">
          <Outlet />
        </main>
        <div className="pb-16 lg:pb-0">
          <LegalFooter />
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}