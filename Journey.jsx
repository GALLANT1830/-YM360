import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, X } from "lucide-react";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Notice from "@/components/common/Notice";
import ProgressRing from "@/components/common/ProgressRing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { STAGES, journeyItems } from "@/data/journeyItems";
import { KEYS, useStore, logActivity } from "@/lib/storage";

const STATUS = [
  { id: "todo", label: "Not started", pct: 0 },
  { id: "doing", label: "In progress", pct: 50 },
  { id: "done", label: "Done", pct: 100 },
];

function Item({ item, data, onChange }) {
  const st = data.status || "todo";
  return (
    <li className="rounded-md border bg-card p-4">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="flex-1 text-xl font-semibold normal-case text-secondary">{item.title}</h3>
        <div className="flex gap-1">
          {STATUS.map((s) => (
            <Button key={s.id} size="sm" variant={st === s.id ? "default" : "outline"} onClick={() => onChange({ status: s.id })}>{s.label}</Button>
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{item.hint} <Link to={item.link} className="font-semibold text-primary hover:underline">Related resources</Link></p>
      <div className="mt-3 grid gap-3 sm:grid-cols-[12rem_1fr]">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Target date
          <Input type="date" className="mt-1" value={data.date || ""} onChange={(e) => onChange({ date: e.target.value })} />
        </label>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Notes
          <Textarea rows={2} className="mt-1" placeholder="Private notes (stored only on this device)" value={data.notes || ""} onChange={(e) => onChange({ notes: e.target.value })} />
        </label>
      </div>
    </li>
  );
}

export default function Journey() {
  const [stage, setStage] = useStore(KEYS.stage, "");
  const [journey, setJourney] = useStore(KEYS.journey, {});
  const [goals, setGoals] = useStore(KEYS.goals, []);
  const [goal, setGoal] = useState("");

  const pct = journeyItems.reduce((s, i) => s + (STATUS.find((x) => x.id === (journey[i.id]?.status || "todo")).pct), 0) / journeyItems.length;
  const patch = (id) => (p) => setJourney((j) => ({ ...j, [id]: { ...j[id], ...p } }));

  return (
    <Page>
      <PageHeader kicker="My YM Journey" title="Personal study tracker" desc="Set a learning stage, goals and notes across the areas that matter. Everything stays private on this device." />
      <Notice className="mb-6" title="Not an official record">
        This is a personal study tracker. It is not a record book or sign-off system, and it does not assume your rank or qualifications. Completing items here does not grant any promotion, award or qualification.
      </Notice>

      <section className="mb-8 grid gap-5 md:grid-cols-[auto_1fr]">
        <div className="flex items-center gap-4 rounded-md border bg-card p-5">
          <ProgressRing value={pct} size={104} label="overall" />
          <div className="text-sm text-muted-foreground">Average across {journeyItems.length} areas</div>
        </div>
        <div className="rounded-md border bg-card p-5">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">My learning stage (you choose)</div>
          <div className="flex flex-wrap gap-2">
            {STAGES.map((s) => (
              <Button key={s} variant={stage === s ? "default" : "outline"} onClick={() => { setStage(s); logActivity(`Set learning stage: ${s}`); }}>{s}</Button>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold uppercase text-secondary">Goals</h2>
        <div className="flex gap-2">
          <Input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Add a learning goal" onKeyDown={(e) => { if (e.key === "Enter" && goal.trim()) { setGoals([...goals, { id: Date.now(), text: goal.trim(), done: false }]); setGoal(""); } }} />
          <Button onClick={() => { if (goal.trim()) { setGoals([...goals, { id: Date.now(), text: goal.trim(), done: false }]); setGoal(""); } }}><Plus className="h-4 w-4" /></Button>
        </div>
        <ul className="mt-3 space-y-2">
          {goals.map((g) => (
            <li key={g.id} className="flex items-center gap-3 rounded-md border bg-card px-3 py-2">
              <Checkbox checked={g.done} onCheckedChange={(v) => setGoals(goals.map((x) => (x.id === g.id ? { ...x, done: !!v } : x)))} />
              <span className={`flex-1 text-sm ${g.done ? "text-muted-foreground line-through" : ""}`}>{g.text}</span>
              <button aria-label="Remove goal" onClick={() => setGoals(goals.filter((x) => x.id !== g.id))}><X className="h-4 w-4" /></button>
            </li>
          ))}
          {goals.length === 0 && <li className="text-sm text-muted-foreground">No goals yet.</li>}
        </ul>
      </section>

      <h2 className="mb-3 text-2xl font-semibold uppercase text-secondary">Learning areas</h2>
      <Progress value={pct} className="mb-4 h-2" />
      <ul className="space-y-3">
        {journeyItems.map((it) => <Item key={it.id} item={it} data={journey[it.id] || {}} onChange={patch(it.id)} />)}
      </ul>
    </Page>
  );
}