import {
  LayoutDashboard, Route, BookOpen, Library, Brain, GraduationCap, Mic, Briefcase, Tent, Award, Quote, Lightbulb, Lock, Info, Settings, Shield, Medal,
} from "lucide-react";

export const NAV = [
  { to: "/", label: "Home Dashboard", short: "Home", icon: LayoutDashboard },
  { to: "/journey", label: "My YM Journey", short: "Journey", icon: Route },
  { to: "/guidebooks", label: "Rank & Guidebook Center", short: "Guidebooks", icon: BookOpen },
  { to: "/resources", label: "Resource Library", short: "Library", icon: Library },
  { to: "/study", label: "Study Center", short: "Study", icon: Brain },
  { to: "/schools", label: "Leadership Schools", short: "Schools", icon: GraduationCap },
  { to: "/board", label: "YMOY & Board Preparation", short: "Board", icon: Mic },
  { to: "/billets", label: "Billets & Leadership Roles", short: "Billets", icon: Briefcase },
  { to: "/roles", label: "Ranks & Billets Guide", short: "Ranks", icon: Medal },
  { to: "/events", label: "Events & Field Preparation", short: "Events", icon: Tent },
  { to: "/awards", label: "Awards & Advancement", short: "Awards", icon: Award },
  { to: "/veteran-advice", label: "Veteran YM Advice", short: "Veterans", icon: Quote },
  { to: "/advice", label: "Personal YM Advice", short: "Advice", icon: Lightbulb },
  { to: "/serve360", label: "SERVE360 Leadership Hub", short: "SERVE360", icon: Lock },
  { to: "/coach", label: "AI Coaches", short: "Coaches", icon: Shield },
  { to: "/about", label: "About YM360", short: "About", icon: Info },
  { to: "/admin", label: "Content Studio (Admin)", short: "Admin", icon: Settings, adminOnly: true },
  { to: "/admin/ribbons", label: "Ribbon Images (Admin)", short: "Ribbons", icon: Medal, adminOnly: true },
];

export const MOBILE_TABS = ["/", "/study", "/board", "/journey"];