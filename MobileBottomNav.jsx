import { NavLink } from "react-router-dom";
import { NAV, MOBILE_TABS } from "@/components/layout/nav";

export default function MobileBottomNav() {
  const tabs = NAV.filter((n) => MOBILE_TABS.includes(n.to));
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-sidebar-border bg-secondary pb-[env(safe-area-inset-bottom)] lg:hidden"
      aria-label="Quick navigation"
    >
      {tabs.map(({ to, short, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold ${isActive ? "text-white" : "text-white/60"}`
          }
        >
          {({ isActive }) => (
            <>
              <Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
              {short}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}