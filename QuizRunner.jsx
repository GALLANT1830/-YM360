import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// questions: prepared items { id, t, q, options[], correct(index) | model(string), x, topic, ref }
export default function QuizRunner({ questions, onFinish }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [text, setText] = useState("");
  const [reveal, setReveal] = useState(false);
  const [results, setResults] = useState([]);

  const q = questions[i];
  const answered = q.t === "sa" ? reveal : picked !== null;

  const record = (correct) => {
    const next = [...results, { q, correct }];
    setResults(next);
    setPicked(null); setText(""); setReveal(false);
    if (i + 1 >= questions.length) onFinish(next);
    else setI(i + 1);
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-3 flex justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <span>Question {i + 1} of {questions.length}</span><span>{q.topic}</span>
      </div>
      <div className="rounded-md border bg-card p-5">
        <div className="mb-4 text-xl font-semibold leading-snug">{q.q}</div>

        {q.t !== "sa" && (
          <div className="space-y-2">
            {q.options.map((o, idx) => {
              const isCorrect = idx === q.correct;
              const isPicked = idx === picked;
              const cls = !answered
                ? "border-input hover:border-primary"
                : isCorrect ? "border-secondary bg-secondary/10" : isPicked ? "border-primary bg-primary/10" : "border-input opacity-60";
              return (
                <button key={idx} disabled={answered} onClick={() => setPicked(idx)} className={`flex w-full items-center gap-3 rounded-md border-2 p-3 text-left text-base ${cls}`}>
                  <span className="flex-1">{o}</span>
                  {answered && isCorrect && <Check className="h-4 w-4 text-secondary" />}
                  {answered && isPicked && !isCorrect && <X className="h-4 w-4 text-primary" />}
                </button>
              );
            })}
          </div>
        )}

        {q.t === "sa" && (
          <>
            <Textarea rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder="Answer in your own words…" disabled={reveal} />
            {!reveal && <Button className="mt-3" onClick={() => setReveal(true)}>Show model answer</Button>}
            {reveal && <div className="mt-3 rounded-md bg-muted p-3 text-sm"><strong>Model answer:</strong> {q.model}</div>}
          </>
        )}

        {answered && (
          <div className="mt-4 rounded-md bg-muted p-3 text-sm">
            {q.t !== "sa" && <div className="mb-1 font-semibold">{picked === q.correct ? "Correct." : "Not quite."}</div>}
            {q.x && <div>{q.x}</div>}
            <div className="mt-1 text-xs text-muted-foreground">Source: {q.ref}</div>
          </div>
        )}

        {answered && q.t !== "sa" && (
          <Button className="mt-4" onClick={() => record(picked === q.correct)}>{i + 1 >= questions.length ? "See results" : "Next question"}</Button>
        )}
        {answered && q.t === "sa" && (
          <div className="mt-4 flex gap-3">
            <Button variant="outline" onClick={() => record(false)}>Needs work</Button>
            <Button onClick={() => record(true)}>I explained it well</Button>
          </div>
        )}
      </div>
    </div>
  );
}