import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Notice from "@/components/common/Notice";
import SourceBadge from "@/components/common/SourceBadge";
import { schools } from "@/data/eventsAndSchools";
import { pdfLink } from "@/data/awards";
import { KEYS, useStore } from "@/lib/storage";

function School({ s }) {
  const [checks, setChecks] = useStore(KEYS.schoolChecks, {});
  const prep = [
    ...s.verified.map((v, i) => ({ id: `${s.id}-v${i}`, text: `I can explain and practice: ${v.replace(/\.$/, "")}` })),
    { id: `${s.id}-x1`, text: "I have talked with my commander about whether and when to apply" },
    { id: `${s.id}-x2`, text: "I have read the official school notice and instructions when it is published" },
  ];
  const done = prep.filter((p) => checks[p.id]).length;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold uppercase text-secondary">{s.name}</h2>
        <p className="text-muted-foreground">{s.summary}</p>
      </div>
      <section>
        <div className="mb-2 flex items-center gap-2"><h3 className="text-xl font-semibold uppercase text-secondary">Verified requirements</h3><SourceBadge type="verified" /></div>
        <p className="mb-2 text-sm">From the {s.ribbon} entry, Awards Manual p. {s.pg}:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm">{s.verified.map((v) => <li key={v}>{v}</li>)}</ul>
        <p className="mt-3 text-sm">{s.extra}</p>
        <a href={pdfLink(s.pg)} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-semibold text-primary hover:underline">Open the manual page</a>
      </section>
      <section>
        <div className="mb-2 flex items-center gap-2"><h3 className="text-xl font-semibold uppercase text-secondary">My preparation checklist</h3><SourceBadge type="supplemental" /></div>
        <Progress value={(done / prep.length) * 100} className="mb-3 h-2" />
        <ul className="space-y-2">
          {prep.map((p) => (
            <li key={p.id} className="flex items-start gap-2 text-sm">
              <Checkbox id={p.id} checked={!!checks[p.id]} onCheckedChange={(v) => setChecks((c) => ({ ...c, [p.id]: !!v }))} className="mt-0.5" />
              <label htmlFor={p.id}>{p.text}</label>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-muted-foreground">A personal study checklist. Completing it does not qualify you for anything.</p>
      </section>
      <section>
        <h3 className="mb-2 text-xl font-semibold uppercase text-secondary">Practice</h3>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm"><Link to="/guidebooks/advanced?po=1">Drill — PO 1</Link></Button>
          <Button asChild variant="outline" size="sm"><Link to="/guidebooks/advanced?po=7">Public speaking — PO 7</Link></Button>
          <Button asChild variant="outline" size="sm"><Link to="/study">Flashcards &amp; quizzes</Link></Button>
          <Button asChild variant="outline" size="sm"><Link to="/board">Leadership school interview practice</Link></Button>
        </div>
      </section>
    </div>
  );
}

export default function Schools() {
  return (
    <Page>
      <PageHeader kicker="Leadership Schools" title="JLS · SLS · ALS" desc="Preparation centers built from the ribbon criteria in the supplied Awards Manual." />
      <Notice className="mb-6" tone="warn" title="Not published here">
        YM360 does not include official schedules, packing lists, grading criteria or application details because none were supplied. Follow the instructions issued by Headquarters Young Marines and the school director.
      </Notice>
      <Tabs defaultValue="jls">
        <TabsList className="mb-5">
          {schools.map((s) => <TabsTrigger key={s.id} value={s.id}>{s.id.toUpperCase()}</TabsTrigger>)}
        </TabsList>
        {schools.map((s) => <TabsContent key={s.id} value={s.id}><School s={s} /></TabsContent>)}
      </Tabs>
    </Page>
  );
}