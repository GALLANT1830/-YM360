import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SourceBadge from "@/components/common/SourceBadge";
import Notice from "@/components/common/Notice";
import CoachingPanel from "@/components/board/CoachingPanel";
import { KEYS, useStore, logActivity } from "@/lib/storage";

export const STATUSES = [
  { id: "need", label: "Need Practice" },
  { id: "practicing", label: "Practicing" },
  { id: "confident", label: "Confident" },
];

// coachingMode: "free" (reveal any time), "before" (coaching shown up front), "after" (shown after you submit your answer)
export default function BoardCoach({ q, coachingMode = "free" }) {
  const [answers, setAnswers] = useStore(KEYS.boardAnswers, {});
  const [statuses, setStatuses] = useStore(KEYS.boardStatus, {});
  const [revealed, setRevealed] = useState(coachingMode === "before");
  const status = statuses[q.id];

  const setStatus = (s) => {
    setStatuses((p) => ({ ...p, [q.id]: s }));
    logActivity(`Marked a board question “${STATUSES.find((x) => x.id === s).label}”`);
  };

  return (
    <div className={revealed ? "grid gap-6 lg:grid-cols-2" : ""}>
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="font-heading text-sm font-semibold tracking-widest text-muted-foreground">{q.id}</span>
          <SourceBadge type={q.source === "original" ? "recalled" : "supplemental"} />
        </div>
        <h2 className="text-3xl font-bold leading-tight text-secondary sm:text-4xl">{q.text}</h2>

        <label htmlFor={`ans-${q.id}`} className="mt-6 block text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Your answer
        </label>
        <Textarea
          id={`ans-${q.id}`}
          rows={9}
          value={answers[q.id] || ""}
          onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
          placeholder="Write your own answer using your real experiences. It is saved only on this device."
          className="mt-1 text-base"
        />

        {!revealed && (
          <Button className="mt-3" onClick={() => { setRevealed(true); logActivity("Reviewed board coaching"); }}>
            {coachingMode === "after" ? "Submit answer & view coaching" : "Reveal coaching"}
          </Button>
        )}

        <div className="mt-5">
          <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Practice status</div>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <Button key={s.id} size="sm" variant={status === s.id ? "default" : "outline"} onClick={() => setStatus(s.id)}>
                {s.label}
              </Button>
            ))}
          </div>
        </div>

        <Notice className="mt-5" title="AI feedback is not connected">
          Nothing here is graded by AI. Use the self-evaluation checklist and ask a mentor or leader to listen to your answer. YM360 will never present practice feedback as an official board score or prediction.
        </Notice>
      </div>

      {revealed && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <CoachingPanel q={q} />
        </div>
      )}
    </div>
  );
}