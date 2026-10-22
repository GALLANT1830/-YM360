import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import SourceBadge from "@/components/common/SourceBadge";
import { FRAMEWORKS, GENERIC_RUBRIC, SHARED_FOLLOWUPS } from "@/data/boardQuestions";

function Block({ title, children }) {
  return (
    <section className="mb-6">
      <h3 className="mb-2 text-xl font-semibold uppercase text-secondary">{title}</h3>
      {children}
    </section>
  );
}

export default function CoachingPanel({ q }) {
  const [checks, setChecks] = useState({});
  const fw = FRAMEWORKS[q.fw];
  const followups = q.source === "supplemental" ? [...q.f, ...SHARED_FOLLOWUPS] : q.f;
  const rubric = [...q.w.map((w) => `My answer showed: ${w.charAt(0).toLowerCase()}${w.slice(1)}`), ...GENERIC_RUBRIC];
  const score = Object.values(checks).filter(Boolean).length;

  return (
    <div className="rounded-md bg-muted p-5">
      <Block title="What a strong answer should demonstrate">
        <ul className="list-disc space-y-1 pl-5 text-sm">{q.w.map((w) => <li key={w}>{w}</li>)}</ul>
      </Block>
      <Block title={`Suggested answer structure — ${fw.name}`}>
        <ol className="space-y-1.5 text-sm">
          {fw.steps.map((s, i) => (
            <li key={s} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">{i + 1}</span>
              <span className="pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-2 text-xs text-muted-foreground">A framework to organize your thinking. Not every answer needs every step — fit it to the question.</p>
      </Block>
      <Block title="Common mistakes">
        <ul className="list-disc space-y-1 pl-5 text-sm">{q.m.map((m) => <li key={m}>{m}</li>)}</ul>
      </Block>
      <Block title="Possible follow-up questions">
        <ul className="list-disc space-y-1 pl-5 text-sm">{followups.map((f) => <li key={f}>{f}</li>)}</ul>
      </Block>
      <Block title="Self-evaluation">
        <ul className="space-y-2">
          {rubric.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Checkbox id={`${q.id}-r${i}`} checked={!!checks[i]} onCheckedChange={(v) => setChecks((c) => ({ ...c, [i]: !!v }))} className="mt-0.5" />
              <label htmlFor={`${q.id}-r${i}`}>{r}</label>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-muted-foreground">{score} of {rubric.length} checked. This is your own review, not an official score.</p>
      </Block>
      <Block title="Source and question origin">
        <div className="space-y-2 text-sm">
          {q.source === "original" ? (
            <>
              <SourceBadge type="recalled" />
              <p>Recalled by the site owner from their own board-preparation experience. YM360 has <strong>not verified</strong> this wording as an official question, and it does not appear at every board or represent a national requirement. Stored wording is preserved exactly as supplied.</p>
            </>
          ) : (
            <>
              <SourceBadge type="supplemental" />
              <p>Written by YM360 for practice. This is <strong>not</strong> a real board question.</p>
            </>
          )}
          <p className="text-muted-foreground">Coaching is an educational explanation (not an official requirement). Where it cites the Advanced Guidebook, the page label is shown.</p>
        </div>
      </Block>
    </div>
  );
}