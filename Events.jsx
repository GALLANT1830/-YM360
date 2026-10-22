import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Notice from "@/components/common/Notice";
import SourceBadge from "@/components/common/SourceBadge";
import { events } from "@/data/eventsAndSchools";
import { KEYS, useStore, logActivity } from "@/lib/storage";

function AAR() {
  const [list, setList] = useStore(KEYS.aars, []);
  const [f, setF] = useState({ event: "", topic: "", issue: "", discussion: "", recommendation: "" });
  const save = () => {
    if (!f.topic.trim()) return;
    setList((l) => [{ ...f, id: Date.now(), at: new Date().toISOString() }, ...l]);
    setF({ ...f, topic: "", issue: "", discussion: "", recommendation: "" });
    logActivity("Saved an after-action reflection");
  };
  return (
    <section className="rounded-md border bg-card p-5">
      <div className="mb-1 flex items-center gap-2"><h2 className="text-2xl font-semibold uppercase text-secondary">After-action reflection</h2><SourceBadge type="explained" /></div>
      <p className="mb-3 text-sm text-muted-foreground">Uses the Advanced Guidebook format (AYM-4-5): one topic at a time — topic, issue, discussion, recommendation. An AAR is not for putting anyone down; it can also record what worked. Saved only on this device; don’t include private details about other people.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input placeholder="Event name" value={f.event} onChange={(e) => setF({ ...f, event: e.target.value })} />
        <Input placeholder="Topic (one item only, e.g., chow)" value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })} />
        <Textarea placeholder="Issue (what happened)" rows={2} value={f.issue} onChange={(e) => setF({ ...f, issue: e.target.value })} />
        <Textarea placeholder="Discussion (the particulars)" rows={2} value={f.discussion} onChange={(e) => setF({ ...f, discussion: e.target.value })} />
        <Textarea className="sm:col-span-2" placeholder="Recommendation" rows={2} value={f.recommendation} onChange={(e) => setF({ ...f, recommendation: e.target.value })} />
      </div>
      <Button className="mt-3" onClick={save}>Save reflection</Button>
      {list.length > 0 && (
        <ul className="mt-5 space-y-3">
          {list.map((a) => (
            <li key={a.id} className="rounded-md bg-muted p-3 text-sm">
              <div className="font-semibold">{a.event || "Event"} — {a.topic}</div>
              <div><strong>Issue:</strong> {a.issue}</div>
              <div><strong>Discussion:</strong> {a.discussion}</div>
              <div><strong>Recommendation:</strong> {a.recommendation}</div>
              <button className="mt-1 text-xs font-semibold uppercase text-primary" onClick={() => setList((l) => l.filter((x) => x.id !== a.id))}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Events() {
  const [checks, setChecks] = useStore(KEYS.eventChecks, {});
  return (
    <Page>
      <PageHeader kicker="Events & Field Preparation" title="Prepare for the event" desc="Verified requirements come from the supplied manuals. YM360 does not invent event requirements, packing lists or safety procedures — follow your commander’s and the event’s official instructions." />
      <Accordion type="multiple" className="mb-10 space-y-2">
        {events.map((e) => (
          <AccordionItem key={e.id} value={e.id} className="rounded-md border bg-card px-4">
            <AccordionTrigger className="py-3 text-left text-lg font-semibold text-secondary hover:no-underline">{e.name}</AccordionTrigger>
            <AccordionContent className="space-y-4 pb-4 text-sm">
              <p>{e.overview}</p>
              <div>
                <div className="mb-1 flex items-center gap-2"><h3 className="text-lg font-semibold uppercase text-secondary">Verified requirements</h3><SourceBadge type="verified" /></div>
                <ul className="list-disc space-y-1 pl-5">{e.verified.map((v) => <li key={v}>{v}</li>)}</ul>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2"><h3 className="text-lg font-semibold uppercase text-secondary">My preparation checklist</h3><SourceBadge type="supplemental" /></div>
                <ul className="space-y-1.5">
                  {e.prep.map((p) => {
                    const id = `${e.id}-${p}`;
                    return (
                      <li key={id} className="flex items-start gap-2">
                        <Checkbox id={id} checked={!!checks[id]} onCheckedChange={(v) => setChecks((c) => ({ ...c, [id]: !!v }))} className="mt-0.5" />
                        <label htmlFor={id}>{p}</label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <AAR />
      <Notice className="mt-6">Your checklist is a personal study tool, not an official record.</Notice>
    </Page>
  );
}