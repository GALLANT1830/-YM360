import { NavLink } from "react-router-dom";
import Logo from "@/components/brand/Logo";
import { NAV } from "@/components/layout/nav";
import { useAuth } from "@/lib/AuthContext";

export default function SidebarNav({ onNavigate }) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="border-b border-sidebar-border px-5 py-5">
        <Logo />
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Primary">
        <ul className="space-y-1">
          {NAV.filter((n) => !n.adminOnly || isAdmin).map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-md border-l-4 px-3 py-2.5 text-[15px] font-medium transition-colors ${
                    isActive
                      ? "border-primary bg-sidebar-accent text-white"
                      : "border-transparent hover:bg-sidebar-accent/60 hover:text-white"
                  }`
                }
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-sidebar-border px-5 py-4 text-xs leading-snug text-sidebar-foreground/70">
        Independent educational project. Not an official Young Marines website.
      </div>
    </div>
  );
}