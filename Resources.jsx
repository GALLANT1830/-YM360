import { useEffect, useMemo, useState } from "react";
import { Search, ExternalLink, Download, FileText, Loader2, Library } from "lucide-react";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Notice from "@/components/common/Notice";
import NativeSelect from "@/components/common/NativeSelect";
import EmptyState from "@/components/common/EmptyState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { CATEGORY_LABEL as CATEGORY_LABELS, CATEGORY_OPTIONS } from "@/data/curriculumCategories";

export default function Resources() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  useEffect(() => {
    base44.entities.Curriculum.filter({}, { sort: "-created_date", limit: 200 })
      .then(({ items }) => setDocs(items))
      .catch(() => setDocs([]))
      .finally(() => setLoading(false));
  }, []);

  const list = useMemo(
    () => docs.filter((d) => (cat === "all" || d.category === cat) && `${d.title} ${d.description || ""} ${d.audience || ""} ${CATEGORY_LABELS[d.category] || ""}`.toLowerCase().includes(q.toLowerCase())),
    [docs, q, cat]
  );

  return (
    <Page>
      <PageHeader kicker="Resource Library" title="Find the source" desc="Documents, manuals and resources uploaded by the site owner. Search by title or topic, then open or download what you need." />
      <Notice className="mb-5" tone="warn" title="Before publishing this site publicly">
        The files here were uploaded by the site owner. Confirm you have permission to share them publicly before publishing, and never redistribute materials without appropriate permission.
      </Notice>

      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_16rem]">
        <div className="relative">
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Search</label>
          <Search className="absolute left-3 top-[34px] h-4 w-4 text-muted-foreground" />
          <Input className="mt-1 h-10 pl-9" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search documents" />
        </div>
        <NativeSelect label="Category" value={cat} onChange={setCat} options={[{ value: "all", label: "All categories" }, ...CATEGORY_OPTIONS]} />
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading resources…</div>
      ) : list.length === 0 ? (
        <EmptyState title="No documents yet">
          {docs.length === 0 ? "Once documents are uploaded they appear here for everyone to search, open and download." : "No documents match your search. Try a different term or category."}
        </EmptyState>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((d) => (
            <article key={d.id} className="flex flex-col rounded-md border bg-card p-5">
              <div className="mb-2 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="rounded-sm bg-muted px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{CATEGORY_LABELS[d.category] || d.category}</span>
              </div>
              <h2 className="text-xl font-semibold normal-case text-secondary">{d.title}</h2>
              {d.description && <p className="mt-1 text-sm text-muted-foreground">{d.description}</p>}
              {d.audience && <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Audience: {d.audience}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="sm"><a href={d.file_url} target="_blank" rel="noreferrer">Open <ExternalLink className="ml-1.5 h-3.5 w-3.5" /></a></Button>
                <Button asChild size="sm" variant="outline"><a href={d.file_url} download={d.file_name || true}>Download <Download className="ml-1.5 h-3.5 w-3.5" /></a></Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </Page>
  );
}