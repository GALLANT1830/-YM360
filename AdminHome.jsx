import { Link } from "react-router-dom";
import { BookOpen, Lightbulb, Image, FileText } from "lucide-react";
import AdminGate from "@/components/admin/AdminGate";
import { base44 } from "@/api/base44Client";
import { useEffect, useState } from "react";

const TOOLS = [
  { to: "/admin/curriculum", title: "Resources & guidebooks", desc: "Upload PDFs, manuals and documents. Visitors find them through the Resource Library and Guidebooks pages.", icon: BookOpen },
  { to: "/admin/advice", title: "Advice Q&A", desc: "Add, edit and reorder the questions and answers on the Personal YM Advice page.", icon: Lightbulb },
  { to: "/admin/content", title: "Site content & photos", desc: "Edit Home and About text, upload hero photos, and toggle or reorder Home dashboard sections.", icon: Image },
];

export default function AdminHome() {
  const [counts, setCounts] = useState({ curriculum: null, advice: null, content: null });

  useEffect(() => {
    Promise.all([
      base44.entities.Curriculum.filter({}, { limit: 1 }).then(({ items }) => items.length).catch(() => null),
      base44.entities.Advice.filter({}, { limit: 1 }).then(({ items }) => items.length).catch(() => null),
      base44.entities.SiteContent.filter({}, { limit: 1 }).then(({ items }) => items.length).catch(() => null),
    ]).then(([c, a, s]) => setCounts({ curriculum: c, advice: a, content: s }));
  }, []);

  const labels = ["curriculum", "advice", "content"];

  return (
    <AdminGate kicker="Admin" title="Content studio" desc="Everything you need to finish building YM360 in your image. Upload files, write advice, and edit the site's copy and photos.">
      <div className="grid gap-4 md:grid-cols-3">
        {TOOLS.map((t, i) => (
          <Link key={t.to} to={t.to} className="group flex flex-col rounded-md border bg-card p-5 transition-colors hover:border-primary">
            <t.icon className="h-7 w-7 text-primary" />
            <h2 className="mt-3 text-xl font-semibold uppercase text-secondary">{t.title}</h2>
            <p className="mt-1 flex-1 text-sm text-muted-foreground">{t.desc}</p>
            <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {counts[labels[i]] === null ? "…" : `${counts[labels[i]]} saved`}
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 rounded-md border bg-muted/40 p-4 text-sm text-muted-foreground">
        <FileText className="mr-1.5 inline h-4 w-4 align-text-bottom text-primary" />
        Admin links are hidden from regular visitors. You can also open pages directly: <Link to="/resources" className="font-semibold text-primary">Resource Library</Link>, <Link to="/guidebooks" className="font-semibold text-primary">Guidebooks</Link>, <Link to="/advice" className="font-semibold text-primary">Advice</Link>.
      </div>
    </AdminGate>
  );
}