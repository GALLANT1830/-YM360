import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus, Search, Trash2 } from "lucide-react";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Notice from "@/components/common/Notice";
import SourceBadge from "@/components/common/SourceBadge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { billets, GENERIC_BILLET_PREP } from "@/data/billets";
import { KEYS, useStore } from "@/lib/storage";

function BilletBody({ b, custom, onDelete }) {
  const [checks, setChecks] = useStore(KEYS.eventChecks, {});
  const prep = [...(b.prep || []), ...GENERIC_BILLET_PREP];
  return (
    <div className="space-y-4 text-sm">
      <p>{b.overview}</p>
      <div>
        <div className="mb-1 flex items-center gap-2"><h4 className="text-lg font-semibold uppercase text-secondary">Responsibilities</h4>
          <SourceBadge type={custom ? "user" : "verified"} /></div>
        <ul className="list-disc space-y-1 pl-5">{b.duties.map((d) => <li key={d}>{d}</li>)}</ul>
        {b.limits?.length > 0 && <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">{b.limits.map((d) => <li key={d}>{d}</li>)}</ul>}
        <p className="mt-2 text-xs text-muted-foreground">Source: {b.source}</p>
      </div>
      {!custom && (
        <>
          <div>
            <div className="mb-1 flex items-center gap-2"><h4 className="text-lg font-semibold uppercase text-secondary">Skills &amp; preparation</h4><SourceBadge type="supplemental" /></div>
            <p className="mb-2">Skills to build: {b.skills.join(", ")}.</p>
            <ul className="space-y-1.5">
              {prep.map((p) => {
                const id = `${b.id}-${p}`;
                return (
                  <li key={id} className="flex items-start gap-2">
                    <Checkbox id={id} checked={!!checks[id]} onCheckedChange={(v) => setChecks((c) => ({ ...c, [id]: !!v }))} className="mt-0.5" />
                    <label htmlFor={id}>{p}</label>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4 className="mb-1 text-lg font-semibold uppercase text-secondary">Reflection prompts</h4>
            <ul className="list-disc space-y-1 pl-5">{b.reflect.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
        </>
      )}
      {custom && <Button size="sm" variant="outline" onClick={onDelete}><Trash2 className="mr-1.5 h-3.5 w-3.5" />Remove</Button>}
    </div>
  );
}

export default function Billets() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [custom, setCustom] = useStore(KEYS.customBillets, []);
  const [form, setForm] = useState({ name: "", overview: "", duties: "" });

  const all = useMemo(() => [...billets.map((b) => ({ ...b, custom: false })), ...custom.map((b) => ({ ...b, custom: true }))], [custom]);
  const list = all.filter((b) => `${b.name} ${b.overview} ${b.duties.join(" ")}`.toLowerCase().includes(q.toLowerCase()));

  const add = () => {
    if (!form.name.trim()) return;
    setCustom((c) => [...c, { id: `c-${Date.now()}`, name: form.name.trim(), overview: form.overview.trim(), duties: form.duties.split("\n").map((d) => d.trim()).filter(Boolean), limits: [], source: "Added by you on this device — not verified" }]);
    setForm({ name: "", overview: "", duties: "" });
  };

  return (
    <Page>
      <PageHeader kicker="Billets & Leadership Roles" title="Prepare for the role" desc="Responsibilities come from the supplied Advanced Guidebook and Awards Manual. Preparation checklists and reflection prompts are supplemental YM360 suggestions, labeled separately." />
      <div className="relative mb-5">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input className="h-10 pl-9" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search billets and duties" />
      </div>
      <Accordion type="multiple" className="space-y-2">
        {list.map((b) => (
          <AccordionItem key={b.id} value={b.id} className="rounded-md border bg-card px-4">
            <AccordionTrigger className="py-3 text-left hover:no-underline">
              <div>
                <div className="font-heading text-xs font-semibold uppercase tracking-widest text-primary">{b.custom ? "Added by you" : `${b.level} · ${b.rank}`}</div>
                <div className="text-lg font-semibold text-secondary">{b.name}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4"><BilletBody b={b} custom={b.custom} onDelete={() => setCustom((c) => c.filter((x) => x.id !== b.id))} /></AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <section className="mt-10 rounded-md border bg-card p-5">
        <h2 className="text-2xl font-semibold uppercase text-secondary">Add a billet</h2>
        <p className="mb-3 text-sm text-muted-foreground">Saved only in this browser, labeled as unverified. A shared billet library for everyone needs a database and an admin sign-in (not connected yet).</p>
        <div className="space-y-3">
          <Input placeholder="Billet name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Textarea placeholder="Overview" rows={2} value={form.overview} onChange={(e) => setForm({ ...form, overview: e.target.value })} />
          <Textarea placeholder="Responsibilities (one per line)" rows={4} value={form.duties} onChange={(e) => setForm({ ...form, duties: e.target.value })} />
          <Button onClick={add}><Plus className="mr-1.5 h-4 w-4" />Add billet</Button>
        </div>
      </section>
      <Notice className="mt-6">Billets, duties and rank limits vary by unit. Confirm duties with your commander.</Notice>
    </Page>
  );
}