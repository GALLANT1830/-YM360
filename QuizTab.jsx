import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import NativeSelect from "@/components/common/NativeSelect";
import QuizRunner from "@/components/study/QuizRunner";
import QuizResults from "@/components/study/QuizResults";
import { buildQuestions } from "@/lib/studyBank";
import { KEYS, readStore, writeStore, shuffle, logActivity } from "@/lib/storage";

function prepare(q) {
  if (q.t === "tf") return { ...q, options: ["True", "False"], correct: q.a ? 0 : 1 };
  if (q.t === "sa") return { ...q, model: q.a };
  const order = shuffle(q.o.map((text, idx) => ({ text, ok: idx === q.a })));
  return { ...q, options: order.map((o) => o.text), correct: order.findIndex((o) => o.ok) };
}

export default function QuizTab() {
  const bank = useMemo(buildQuestions, []);
  const [src, setSrc] = useState("all");
  const [topic, setTopic] = useState("all");
  const [count, setCount] = useState("10");
  const [adaptive, setAdaptive] = useState(true);
  const [run, setRun] = useState(null);
  const [results, setResults] = useState(null);

  const pool = bank.filter((q) => (src === "all" || q.src === src) && (topic === "all" || q.topic === topic));
  const topics = [...new Set(bank.filter((q) => src === "all" || q.src === src).map((q) => q.topic))];

  const begin = (list) => { setResults(null); setRun(list.map(prepare)); };

  const startNew = () => {
    const stats = readStore(KEYS.qStats, {});
    const weight = (q) => {
      const s = stats[q.id];
      if (!s) return 1.5 + Math.random();
      return (s.missed / s.seen) * 3 + Math.random() - Math.min(0.5, s.seen * 0.05);
    };
    const ordered = adaptive ? [...pool].sort((a, b) => weight(b) - weight(a)) : shuffle(pool);
    begin(shuffle(ordered.slice(0, Math.min(Number(count), pool.length))));
  };

  const finish = (res) => {
    const stats = readStore(KEYS.qStats, {});
    res.forEach(({ q, correct }) => {
      const s = stats[q.id] || { seen: 0, missed: 0, topic: q.topic };
      stats[q.id] = { ...s, seen: s.seen + 1, missed: s.missed + (correct ? 0 : 1), topic: q.topic };
    });
    writeStore(KEYS.qStats, stats);
    const score = res.filter((r) => r.correct).length;
    const hist = readStore(KEYS.quizHistory, []);
    writeStore(KEYS.quizHistory, [{ at: new Date().toISOString(), score, total: res.length, src }, ...hist].slice(0, 30));
    logActivity(`Practice quiz: ${score}/${res.length}`);
    setRun(null); setResults(res);
  };

  if (run) return <QuizRunner key={run.map((q) => q.id).join()} questions={run} onFinish={finish} />;
  if (results) return <QuizResults results={results} onRetake={() => begin(results.map((r) => r.q))} onRetakeMissed={() => begin(results.filter((r) => !r.correct).map((r) => r.q))} onNew={() => setResults(null)} />;

  return (
    <div className="max-w-2xl rounded-md border bg-card p-5">
      <h2 className="mb-1 text-2xl font-semibold uppercase text-secondary">Practice quiz</h2>
      <p className="mb-4 text-sm text-muted-foreground">Multiple choice, true/false and explain-in-your-own-words questions. YM360 practice assessments only — not official tests.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        <NativeSelect label="Source" value={src} onChange={(v) => { setSrc(v); setTopic("all"); }} options={[{ value: "all", label: "All" }, { value: "advanced", label: "Advanced Guidebook" }, { value: "awards", label: "Awards Manual" }]} />
        <NativeSelect label="Topic" value={topic} onChange={setTopic} options={[{ value: "all", label: "All topics" }, ...topics.map((t) => ({ value: t, label: t }))]} />
        <NativeSelect label="Questions" value={count} onChange={setCount} options={["5", "10", "15", "20"].map((v) => ({ value: v, label: v }))} />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Switch id="adaptive" checked={adaptive} onCheckedChange={setAdaptive} />
        <label htmlFor="adaptive" className="text-sm">Adaptive: prioritize questions I miss or haven’t seen</label>
      </div>
      <p className="mt-3 text-sm">{pool.length} questions available.</p>
      <Button className="mt-3" disabled={!pool.length} onClick={startNew}>Start quiz</Button>
    </div>
  );
}