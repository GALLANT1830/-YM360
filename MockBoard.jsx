import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import NativeSelect from "@/components/common/NativeSelect";
import BoardCoach, { STATUSES } from "@/components/board/BoardCoach";
import TimerBar from "@/components/board/TimerBar";
import { allBoardQuestions, boardTopics, LEVELS } from "@/data/boardQuestions";
import { KEYS, readStore, shuffle, logActivity } from "@/lib/storage";

export default function MockBoard() {
  const [phase, setPhase] = useState("setup");
  const [cfg, setCfg] = useState({ level: "all", topic: "all", count: "5", timed: false, secs: "120", coaching: "after" });
  const [queue, setQueue] = useState([]);
  const [idx, setIdx] = useState(0);
  const [summary, setSummary] = useState(null);

  const set = (k) => (v) => setCfg((c) => ({ ...c, [k]: v }));
  const pool = allBoardQuestions.filter(
    (q) => (cfg.level === "all" || q.levels.includes(cfg.level)) && (cfg.topic === "all" || q.topic === cfg.topic)
  );
  const n = Math.min(Number(cfg.count), pool.length);

  const start = (list) => { setQueue(list); setIdx(0); setPhase("run"); };
  const finish = () => {
    const st = readStore(KEYS.boardStatus, {});
    const ans = readStore(KEYS.boardAnswers, {});
    const rows = queue.map((q) => ({ q, status: st[q.id] || "unrated", answered: !!(ans[q.id] || "").trim() }));
    setSummary(rows);
    setPhase("done");
    logActivity(`Completed a mock board (${queue.length} questions)`);
  };

  if (phase === "setup")
    return (
      <div className="max-w-2xl rounded-md border bg-card p-5">
        <h2 className="mb-1 text-2xl font-semibold uppercase text-secondary">Mock board setup</h2>
        <p className="mb-4 text-sm text-muted-foreground">Practice one question at a time. Boards differ, so choose the level closest to yours.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <NativeSelect label="Board level" value={cfg.level} onChange={set("level")} options={[{ value: "all", label: "Any level" }, ...LEVELS.map((l) => ({ value: l.id, label: l.label }))]} />
          <NativeSelect label="Topic" value={cfg.topic} onChange={set("topic")} options={[{ value: "all", label: "All topics" }, ...boardTopics.map((t) => ({ value: t, label: t }))]} />
          <NativeSelect label="Number of questions" value={cfg.count} onChange={set("count")} options={["3", "5", "10", "15", "20"].map((v) => ({ value: v, label: v }))} />
          <NativeSelect label="Coaching" value={cfg.coaching} onChange={set("coaching")} options={[{ value: "after", label: "After I answer" }, { value: "before", label: "Before I answer" }]} />
          <div className="flex items-center gap-3 sm:col-span-2">
            <Switch id="timed" checked={cfg.timed} onCheckedChange={set("timed")} />
            <label htmlFor="timed" className="text-sm font-medium">Timed practice</label>
            {cfg.timed && (
              <NativeSelect className="ml-auto w-40" label="" value={cfg.secs} onChange={set("secs")} options={[{ value: "60", label: "1 min each" }, { value: "120", label: "2 min each" }, { value: "180", label: "3 min each" }, { value: "300", label: "5 min each" }]} />
            )}
          </div>
        </div>
        <p className="mt-4 text-sm">{pool.length} matching questions · you will practice {n}.</p>
        <Button className="mt-3" disabled={!n} onClick={() => start(shuffle(pool).slice(0, n))}>Begin mock board</Button>
      </div>
    );

  if (phase === "run") {
    const q = queue[idx];
    const last = idx === queue.length - 1;
    return (
      <div>
        <div className="mb-4 flex items-center justify-between border-b pb-3">
          <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Question {idx + 1} of {queue.length}</div>
          {cfg.timed && <TimerBar seconds={Number(cfg.secs)} resetKey={q.id} />}
        </div>
        <BoardCoach key={q.id} q={q} coachingMode={cfg.coaching} />
        <div className="mt-6 flex justify-between gap-3">
          <Button variant="outline" onClick={() => setPhase("setup")}>End practice</Button>
          <Button onClick={() => (last ? finish() : setIdx(idx + 1))}>{last ? "Finish & see summary" : "Next question"}</Button>
        </div>
      </div>
    );
  }

  const count = (s) => summary.filter((r) => r.status === s).length;
  const topics = [...new Set(summary.map((r) => r.q.topic))];
  const improve = summary.filter((r) => r.status === "need" || r.status === "unrated");
  return (
    <div className="max-w-3xl">
      <h2 className="mb-4 text-3xl font-bold uppercase text-secondary">Mock board summary</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Practiced", summary.length], ["Answered in writing", summary.filter((r) => r.answered).length], ...STATUSES.map((s) => [s.label, count(s.id)])].map(([l, v]) => (
          <div key={l} className="rounded-md border bg-card p-3 text-center">
            <div className="font-heading text-3xl font-bold text-primary">{v}</div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
      <h3 className="mt-6 text-xl font-semibold uppercase text-secondary">Topics covered</h3>
      <p className="text-sm">{topics.join(" · ")}</p>
      <h3 className="mt-6 text-xl font-semibold uppercase text-secondary">Areas to improve</h3>
      {improve.length === 0 ? (
        <p className="text-sm">You rated everything Practicing or Confident. Keep rehearsing out loud.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {improve.map((r) => (
            <li key={r.q.id} className="rounded-md border bg-card p-3 text-sm">{r.q.text}<span className="ml-2 text-xs text-muted-foreground">({r.status === "need" ? "Need Practice" : "not rated"})</span></li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-xs text-muted-foreground">This is your own self-assessment, not an official board score or a prediction.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {improve.length > 0 && <Button onClick={() => start(shuffle(improve.map((r) => r.q)))}>Practice these again</Button>}
        <Button variant="outline" onClick={() => setPhase("setup")}>New mock board</Button>
      </div>
    </div>
  );
}