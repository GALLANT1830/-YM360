import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logo from "@/components/brand/Logo";
import SidebarNav from "@/components/layout/SidebarNav";
import GlobalSearch from "@/components/layout/GlobalSearch";

export default function TopBar() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-card/95 px-4 backdrop-blur sm:px-8">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenu(true)} aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </Button>
      <div className="lg:hidden">
        <Logo size="h-9 w-9" light={false} showText={false} />
      </div>
      <button
        onClick={() => setSearch(true)}
        className="ml-auto flex h-9 w-full max-w-md items-center gap-2 rounded-md border bg-background px-3 text-sm text-muted-foreground hover:border-primary/50 lg:ml-0"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="truncate">Search objectives, awards, questions…</span>
      </button>
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side="left" className="w-72 border-0 p-0">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
          <SidebarNav onNavigate={() => setMenu(false)} />
        </SheetContent>
      </Sheet>
      <GlobalSearch open={search} onOpenChange={setSearch} />
    </header>
  );
}