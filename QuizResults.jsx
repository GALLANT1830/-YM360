import { Button } from "@/components/ui/button";
import ProgressRing from "@/components/common/ProgressRing";

export default function QuizResults({ results, onRetake, onRetakeMissed, onNew }) {
  const score = results.filter((r) => r.correct).length;
  const missed = results.filter((r) => !r.correct);
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-5 rounded-md border bg-card p-5">
        <ProgressRing value={(score / results.length) * 100} size={96} />
        <div>
          <h2 className="text-3xl font-bold uppercase text-secondary">{score} of {results.length} correct</h2>
          <p className="text-sm text-muted-foreground">Practice score only — not a prediction of any official result.</p>
        </div>
      </div>
      {missed.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-2 text-xl font-semibold uppercase text-secondary">Missed-question review</h3>
          <ul className="space-y-3">
            {missed.map(({ q }) => (
              <li key={q.id} className="rounded-md border bg-card p-4 text-sm">
                <div className="font-semibold">{q.q}</div>
                <div className="mt-1"><strong>Answer:</strong> {q.t === "sa" ? q.model : q.options[q.correct]}</div>
                {q.x && <div className="mt-1 text-muted-foreground">{q.x}</div>}
                <div className="mt-1 text-xs text-muted-foreground">Source: {q.ref}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={onRetake}>Retake (new order)</Button>
        {missed.length > 0 && <Button variant="outline" onClick={onRetakeMissed}>Retake missed only</Button>}
        <Button variant="outline" onClick={onNew}>New quiz</Button>
      </div>
    </div>
  );
}