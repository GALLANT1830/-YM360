import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, FileText, ShieldAlert, Loader2 } from "lucide-react";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Notice from "@/components/common/Notice";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { allEOs, advancedPOs } from "@/data/advancedGuidebook";
import { awards } from "@/data/awards";

const BOOKS = [
  { key: "junior", name: "YM Junior Guidebook", to: null },
  { key: "basic", name: "YM Basic Guidebook", to: null, note: "Revision dated August 1, 2021 (per site owner)." },
  { key: "senior", name: "YM Senior Guidebook", to: null },
  { key: "advanced", name: "YM Advanced Guidebook", to: "/guidebooks/advanced", note: `${advancedPOs.length} Performance Objectives · ${allEOs.length} Enabling Objectives with study pages, flashcards and quizzes.` },
  { key: "drill", name: "Marine Corps Order 5060.20 — Drill and Ceremonies Manual", to: null, note: "A Marine Corps publication, not a Young Marines manual. Version dated May 15, 2019 (per site owner)." },
  { key: "awards", name: "YM Awards Manual", to: "/awards", note: `${awards.length} entries with eligibility, devices and page references. Treated as the edition in use; not labeled outdated.` },
];

export default function Guidebooks() {
  const { user } = useAuth();
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Curriculum.filter({}, { sort: "-created_date", limit: 100 })
      .then(({ items }) => setDocs(items))
      .catch(() => setDocs([]))
      .finally(() => setLoading(false));
  }, []);

  const byCat = (key) => docs.filter((d) => d.category === key);
  const other = byCat("other");

  return (
    <Page>
      <PageHeader
        kicker="Rank & Guidebook Center"
        title="Learn the material, not just read it"
        desc="Each supplied manual becomes a learning page: plain-language explanations, key facts, practice questions and a link to the verified page in the source."
      />
      {user?.role === "admin" && (
        <Notice className="mb-4" title="Admin">
          <Link to="/admin/curriculum" className="font-semibold text-primary hover:underline">Upload curriculum documents</Link> to add or replace guidebook files.
        </Notice>
      )}
      <Notice className="mb-6" title="Built only from files that have been supplied">
        YM360 does not invent objectives, identifiers, sign-off criteria or page numbers. Guidebooks marked “Awaiting file” will get the same treatment once the files are added.
      </Notice>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading curriculum…</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {BOOKS.map((b) => {
            const files = byCat(b.key);
            const ready = files.length > 0 || !!b.to;
            return (
              <div key={b.key} className={`flex flex-col rounded-md border p-5 ${ready ? "bg-card" : "bg-muted/50"}`}>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                  {files.length > 0 || b.to ? <><BookOpen className="h-4 w-4 text-primary" /> Available</> : <><Clock className="h-4 w-4 text-muted-foreground" /> Awaiting file</>}
                </div>
                <h2 className="text-2xl font-semibold normal-case text-secondary">{b.name}</h2>
                {b.note && <p className="mt-1 text-sm text-muted-foreground">{b.note}</p>}
                {files.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {files.map((f) => (
                      <li key={f.id} className="flex items-start gap-2 text-sm">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>
                          <a href={f.file_url} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">{f.title}</a>
                          {f.description && <span className="text-muted-foreground"> — {f.description}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {b.to && <Button asChild className="mt-4 w-fit"><Link to={b.to}>Open study page</Link></Button>}
              </div>
            );
          })}
        </div>
      )}

      {other.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-2xl font-semibold uppercase text-secondary">Other documents</h2>
          <ul className="space-y-2">
            {other.map((f) => (
              <li key={f.id} className="flex items-start gap-2 rounded-md border bg-card p-3 text-sm">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <a href={f.file_url} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">{f.title}</a>
                  {f.description && <span className="text-muted-foreground"> — {f.description}</span>}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Page>
  );
}