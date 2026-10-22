import { useState } from "react";
import { ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import SourceBadge from "@/components/common/SourceBadge";
import { KEYS, useStore } from "@/lib/storage";

const STATUS = [
  { id: "todo", label: "Not started" },
  { id: "learning", label: "Learning" },
  { id: "confident", label: "Confident" },
];

function QA({ item }) {
  const [show, setShow] = useState(false);
  const answer = item.t === "mc" ? item.o[item.a] : item.t === "tf" ? (item.a ? "True" : "False") : item.a;
  return (
    <li className="rounded-md bg-muted p-3 text-sm">
      <div className="font-medium">{item.q}</div>
      {item.t === "mc" && <div className="mt-1 text-muted-foreground">Options: {item.o.join(" · ")}</div>}
      <button className="mt-2 text-xs font-semibold uppercase tracking-wide text-primary" onClick={() => setShow(!show)}>
        {show ? "Hide answer" : "Show answer & explanation"}
      </button>
      {show && (
        <div className="mt-2 border-l-4 border-gold pl-3">
          <div><strong>Answer:</strong> {answer}</div>
          {item.x && <div className="text-muted-foreground">{item.x}</div>}
        </div>
      )}
    </li>
  );
}

export default function EOCard({ eo, prev, next }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useStore(KEYS.eoStatus, {});
  const current = status[eo.id] || "todo";

  return (
    <article id={eo.id} className="rounded-md border bg-card">
      <button className="flex w-full items-start gap-3 p-4 text-left" onClick={() => setOpen(!open)} aria-expanded={open}>
        <div className="flex-1">
          <div className="font-heading text-xs font-semibold uppercase tracking-widest text-primary">
            PO {eo.po} · EO {eo.eo} · {eo.ref}
          </div>
          <h3 className="text-xl font-semibold normal-case text-secondary">{eo.title}</h3>
        </div>
        <span className="mt-1 rounded-sm bg-muted px-2 py-0.5 text-[11px] font-semibold uppercase">{STATUS.find((s) => s.id === current).label}</span>
        <ChevronDown className={`mt-1 h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="space-y-5 border-t p-4">
          <div>
            <div className="mb-1 flex items-center gap-2"><SourceBadge type="explained" /></div>
            <p className="text-base">{eo.sum}</p>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2"><h4 className="text-lg font-semibold uppercase text-secondary">Key facts</h4><SourceBadge type="explained" /></div>
            <ul className="space-y-2">
              {eo.facts.map(([f, b]) => (
                <li key={f} className="text-sm"><span className="font-semibold">{f}</span> {b}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2"><h4 className="text-lg font-semibold uppercase text-secondary">Practice questions</h4><SourceBadge type="supplemental" /></div>
            <ul className="space-y-2">{eo.qs.map((q) => <QA key={q.q} item={q} />)}</ul>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a href={eo.pdf} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-2 hover:underline">
              Open verified page in the guidebook ({eo.ref}) <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">My study status (not an official sign-off)</div>
            <div className="flex flex-wrap gap-2">
              {STATUS.map((s) => (
                <Button key={s.id} size="sm" variant={current === s.id ? "default" : "outline"} onClick={() => setStatus((p) => ({ ...p, [eo.id]: s.id }))}>{s.label}</Button>
              ))}
            </div>
          </div>

          {(prev || next) && (
            <div className="text-xs text-muted-foreground">
              Related objectives: {prev && <span>Previous — EO {prev.eo} {prev.title}. </span>}
              {next && <span>Next — EO {next.eo} {next.title}.</span>}
            </div>
          )}
        </div>
      )}
    </article>
  );
}