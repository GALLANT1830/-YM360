import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Notice from "@/components/common/Notice";
import SourceBadge from "@/components/common/SourceBadge";
import NativeSelect from "@/components/common/NativeSelect";
import EmptyState from "@/components/common/EmptyState";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";
import { faq as seedFaq } from "@/data/advice";

export default function PersonalAdvice() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [cat, setCat] = useState("all");
  const [db, setDb] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Advice.filter({}, { sort: "order", limit: 200 })
      .then(({ items }) => setDb(items))
      .catch(() => setDb([]))
      .finally(() => setLoading(false));
  }, []);

  // Use admin-managed entries when present, otherwise fall back to the built-in FAQ.
  const all = useMemo(
    () => (db.length > 0 ? db.map((d) => ({ cat: d.category, src: d.source, ref: d.reference, q: d.question, a: d.answer })) : seedFaq),
    [db]
  );
  const cats = useMemo(() => [...new Set(all.map((f) => f.cat))], [all]);
  const list = useMemo(
    () => all.filter((f) => (cat === "all" || f.cat === cat) && `${f.q} ${f.a}`.toLowerCase().includes(q.toLowerCase())),
    [all, q, cat]
  );

  return (
    <Page>
      <PageHeader kicker="Personal YM Advice" title="Guidance center" desc="A curated, searchable FAQ. Answers marked “Verified” cite the supplied manuals; others are YM360 study suggestions." />
      <Notice className="mb-5" title="AI assistant not connected">
        Instead of an AI assistant, this page is a curated FAQ so nothing is guessed. When AI is added it will use the verified sources, state its uncertainty and never speak as official Young Marines leadership or invent requirements.
      </Notice>
      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_16rem]">
        <div className="relative">
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Search</label>
          <Search className="absolute left-3 top-[34px] h-4 w-4 text-muted-foreground" />
          <Input className="mt-1 h-10 pl-9" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search advice" />
        </div>
        <NativeSelect label="Topic" value={cat} onChange={setCat} options={[{ value: "all", label: "All topics" }, ...cats.map((c) => ({ value: c, label: c }))]} />
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading advice…</div>
      ) : list.length === 0 ? (
        <EmptyState title="No matching advice">Try a different search term or topic.</EmptyState>
      ) : (
        <ul className="space-y-3">
          {list.map((f, i) => (
            <li key={i} className="rounded-md border bg-card p-5">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">{f.cat}</span>
                <SourceBadge type={f.src === "verified" ? "explained" : "supplemental"} />
              </div>
              <h2 className="text-xl font-semibold normal-case text-secondary">{f.q}</h2>
              <p className="mt-1 text-sm">{f.a}</p>
              {f.ref && <p className="mt-2 text-xs text-muted-foreground">Source: {f.ref}</p>}
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
}