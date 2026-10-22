import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Notice from "@/components/common/Notice";
import SourceBadge from "@/components/common/SourceBadge";
import { Input } from "@/components/ui/input";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { ranks } from "@/data/ranks";
import { billets } from "@/data/billets";

export default function RanksGuide() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");

  const rankList = useMemo(
    () => ranks.filter((r) => `${r.name} ${r.abbr} ${r.level} ${r.howTo} ${r.serves}`.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <Page>
      <PageHeader
        kicker="Ranks & Billets Guide"
        title="What each rank & billet requires"
        desc="A plain-language guide to the Young Marines rank ladder and to what each billet asks of you — the responsibilities, the skills to build, and the basics of how to get there."
      />

      <Notice className="mb-5" tone="warn" title="Supplemental study guide">
        Rank insignia, advancement steps and billet duties are summarized here to help you orient. Always confirm the exact requirements and insignia in your guidebook and with your commander — billets and rank limits vary by unit.
      </Notice>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold uppercase text-secondary">The rank ladder</h2>
        <div className="mb-4 relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input className="h-10 pl-9" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ranks" />
        </div>
        <ol className="relative space-y-3 border-l-2 border-primary/30 pl-5">
          {rankList.map((r, i) => (
            <li key={r.id} className="rounded-md border bg-card p-4">
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-xs font-semibold uppercase tracking-widest text-primary">Step {i + 1} · {r.abbr}</span>
                <SourceBadge type="supplemental" />
              </div>
              <h3 className="text-lg font-semibold text-secondary">{r.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{r.level} · Insignia: {r.insignia}</p>
              <p className="mt-2 text-sm"><strong>How to earn:</strong> {r.howTo}</p>
              <p className="mt-1 text-sm"><strong>What you do:</strong> {r.serves}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-1 text-2xl font-semibold uppercase text-secondary">What each billet requires</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Each billet lists its core responsibilities (verified from the supplied manuals), the skills to build, and how to prepare. For full duties, see the <Link to="/billets" className="font-semibold text-primary hover:underline">Billets & Leadership Roles</Link> page.
        </p>
        <Accordion type="multiple" className="space-y-2">
          {billets.map((b) => (
            <AccordionItem key={b.id} value={b.id} className="rounded-md border bg-card px-4">
              <AccordionTrigger className="py-3 text-left hover:no-underline">
                <div>
                  <div className="font-heading text-xs font-semibold uppercase tracking-widest text-primary">{b.level} · {b.rank}</div>
                  <div className="text-lg font-semibold text-secondary">{b.name}</div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pb-4 text-sm">
                <p>{b.overview}</p>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <h4 className="text-base font-semibold uppercase text-secondary">Responsibilities</h4>
                    <SourceBadge type="verified" />
                  </div>
                  <ul className="list-disc space-y-1 pl-5">
                    {b.duties.map((d) => <li key={d}>{d}</li>)}
                  </ul>
                  {b.limits?.length > 0 && (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
                      {b.limits.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">Source: {b.source}</p>
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <h4 className="text-base font-semibold uppercase text-secondary">Skills to build</h4>
                    <SourceBadge type="supplemental" />
                  </div>
                  <p>{b.skills.join(", ")}.</p>
                </div>
                <div>
                  <h4 className="mb-1 text-base font-semibold uppercase text-secondary">How to prepare</h4>
                  <ul className="list-disc space-y-1 pl-5">
                    {(b.prep || []).map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
                <Link to="/billets" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  Open full billet detail <ChevronRight className="h-4 w-4" />
                </Link>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </Page>
  );
}