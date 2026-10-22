import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ExternalLink, Search, ImageOff } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Notice from "@/components/common/Notice";
import SourceBadge from "@/components/common/SourceBadge";
import NativeSelect from "@/components/common/NativeSelect";
import { Input } from "@/components/ui/input";
import { Image } from "@/components/ui/image";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { awards, awardNotes, AWARD_CATEGORIES, AWARDS_PDF } from "@/data/awards";

export default function Awards() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [cat, setCat] = useState("All");
  const [ribbons, setRibbons] = useState({});

  useEffect(() => {
    base44.entities.Ribbon.filter({}, { limit: 200 })
      .then(({ items }) => {
        const map = {};
        for (const r of items) map[r.ribbon_no] = r.image_url;
        setRibbons(map);
      })
      .catch(() => setRibbons({}));
  }, []);

  const list = useMemo(
    () =>
      awards.filter((a) => {
        const inCat = cat === "All" || a.category === cat || (cat === "Other" && !AWARD_CATEGORIES.slice(1, 7).includes(a.category));
        const hay = `${a.name} ${a.eligibility} ${a.authority} ${a.no} ${a.prec}`.toLowerCase();
        return inCat && q.toLowerCase().split(/\s+/).every((t) => hay.includes(t));
      }),
    [q, cat]
  );

  return (
    <Page>
      <PageHeader kicker="Awards & Advancement" title="Awards reference" desc="A searchable summary of the supplied Awards Manual with page references. Summaries are shortened — open the manual page for the complete wording.">
        <a href={AWARDS_PDF} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          Open the Awards Manual PDF <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </PageHeader>

      <Notice className="mb-5" title="Study reference only">
        This page explains award criteria. It does not determine eligibility. Awards and advancement are decided only by the issuing authority named for each award, and your personal study progress is kept separate from official eligibility.
      </Notice>

      <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_16rem]">
        <div className="relative">
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Search</label>
          <Search className="absolute left-3 top-[34px] h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, ribbon number, authority or requirement" className="mt-1 h-10 pl-9" />
        </div>
        <NativeSelect label="Category" value={cat} onChange={setCat} options={AWARD_CATEGORIES.map((c) => ({ value: c, label: c }))} />
      </div>
      <p className="mb-3 text-sm text-muted-foreground">{list.length} of {awards.length} entries</p>

      <Accordion type="multiple" className="space-y-2">
        {list.map((a) => (
          <AccordionItem key={a.id} value={a.id} className="rounded-md border bg-card px-4">
            <AccordionTrigger className="py-3 text-left hover:no-underline">
              <div className="flex items-center gap-3">
                {ribbons[a.no] ? (
                  <Image src={ribbons[a.no]} alt={`${a.name} ribbon`} className="h-9 w-16 shrink-0 rounded-sm border object-contain" fittingType="fit" />
                ) : a.no !== "—" ? (
                  <span className="flex h-9 w-16 shrink-0 items-center justify-center rounded-sm border border-dashed text-muted-foreground" title="Ribbon image not uploaded yet"><ImageOff className="h-4 w-4" /></span>
                ) : null}
                <div>
                  <div className="font-heading text-xs font-semibold uppercase tracking-widest text-primary">{a.category}{a.prec !== "—" && a.prec !== "N/A" ? ` · ${a.prec}` : ""}{a.no !== "—" ? ` · #${a.no}` : ""}</div>
                  <div className="text-lg font-semibold text-secondary">{a.name}</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pb-4 text-sm">
              {ribbons[a.no] && (
                <div className="flex items-center gap-3">
                  <Image src={ribbons[a.no]} alt={`${a.name} ribbon`} className="h-12 w-24 rounded-sm border object-contain" fittingType="fit" />
                  <span className="text-xs text-muted-foreground">Ribbon #{a.no}</span>
                </div>
              )}
              <SourceBadge type="explained" />
              <p><strong>Lowest issuing authority:</strong> {a.authority}</p>
              <p><strong>Eligibility &amp; key criteria:</strong> {a.eligibility}</p>
              <p><strong>Authorized devices:</strong> {a.devices}</p>
              <a href={a.pdf} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                Source: Awards Manual {typeof a.pg === "number" ? `p. ${a.pg}` : "Appendix A"} <ExternalLink className="h-3 w-3" />
              </a>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h2 className="mb-3 mt-10 text-2xl font-semibold uppercase text-secondary">Flagged items — verify with program leadership</h2>
      <div className="space-y-3">
        {awardNotes.map((n) => (
          <Notice key={n.title} tone="warn" title={n.title}>{n.detail}</Notice>
        ))}
      </div>
    </Page>
  );
}