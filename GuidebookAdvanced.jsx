import { useSearchParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Notice from "@/components/common/Notice";
import SourceBadge from "@/components/common/SourceBadge";
import EOCard from "@/components/guidebook/EOCard";
import { advancedPOs, allEOs, ADV_PDF, sourceNotes } from "@/data/advancedGuidebook";
import { KEYS, useStore } from "@/lib/storage";

const PQR = { 1: "AYM-1-4", 2: "AYM-2-7", 3: "AYM-3-12", 4: "AYM-4-7", 5: "AYM-5-5 – 5-6", 6: "AYM-6-8 – 6-9", 7: "AYM-7-4", 8: "AYM-8-5", 9: "AYM-9-5", 10: "AYM-10-4" };

export default function GuidebookAdvanced() {
  const [params, setParams] = useSearchParams();
  const po = Number(params.get("po")) || 1;
  const current = advancedPOs.find((p) => p.po === po) || advancedPOs[0];
  const [status] = useStore(KEYS.eoStatus, {});
  const done = (p) => allEOs.filter((e) => e.po === p && status[e.id] === "confident").length;

  return (
    <Page>
      <nav className="mb-3 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/guidebooks" className="hover:text-foreground">Guidebooks</Link><ChevronRight className="h-3 w-3" />
        <span>Advanced</span><ChevronRight className="h-3 w-3" /><span className="text-foreground">PO {current.po}</span>
      </nav>
      <PageHeader kicker="Advanced Young Marine Guidebook" title={`PO ${current.po}: ${current.title}`} desc={current.intro}>
        <div className="flex flex-wrap items-center gap-3">
          <SourceBadge type="verified" />
          <a href={ADV_PDF} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary underline-offset-2 hover:underline">Open the supplied guidebook PDF</a>
        </div>
      </PageHeader>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {advancedPOs.map((p) => (
          <button
            key={p.po}
            onClick={() => setParams({ po: String(p.po) })}
            className={`shrink-0 rounded-md border px-3 py-2 text-left text-sm ${p.po === current.po ? "border-secondary bg-secondary text-white" : "bg-card hover:border-primary"}`}
          >
            <div className="font-heading text-lg font-bold leading-none">PO {p.po}</div>
            <div className="mt-0.5 text-[11px] opacity-80">{done(p.po)}/{p.eos.length} confident</div>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {allEOs.filter((e) => e.po === current.po).map((e, idx, arr) => (
          <EOCard key={e.id} eo={e} prev={arr[idx - 1]} next={arr[idx + 1]} />
        ))}
      </div>

      <Notice className="mt-6" title="Sign-offs are not recorded here">
        Each Performance Objective ends with a Performance Qualification Review table (for PO {current.po}: {PQR[current.po]}) with a column for an authorized evaluator’s signature. YM360 never records or replaces sign-offs — your study status above is only for your own tracking.
      </Notice>

      {current.po === 8 || current.po === 10 || current.po === 4 ? (
        <Notice tone="warn" className="mt-4" title="Source notes for this chapter">
          <ul className="list-disc pl-5">
            {sourceNotes.filter((n) => (current.po === 8 ? n.title.includes("Objective 4") : current.po === 10 ? n.title.includes("CPR") || n.title.includes("Page labels") : n.title.includes("FLAME"))).map((n) => (
              <li key={n.title}><strong>{n.title}.</strong> {n.detail}</li>
            ))}
          </ul>
        </Notice>
      ) : null}
    </Page>
  );
}