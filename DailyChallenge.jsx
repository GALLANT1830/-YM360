import { useMemo, useState } from "react";
import { buildQuestions } from "@/lib/studyBank";
import { allBoardQuestions } from "@/data/boardQuestions";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function DailyChallenge() {
  const day = Math.floor(Date.now() / 86400000);
  const q = useMemo(() => {
    const pool = buildQuestions().filter((x) => x.t === "mc" || x.t === "tf");
    return pool[day % pool.length];
  }, [day]);
  const board = allBoardQuestions[(day * 7) % allBoardQuestions.length];
  const [picked, setPicked] = useState(null);
  const options = q.t === "tf" ? ["True", "False"] : q.o;
  const correct = q.t === "tf" ? (q.a ? 0 : 1) : q.a;

  return (
    <section className="rounded-md bg-secondary p-5 text-white">
      <div className="kicker !text-gold">Daily challenge</div>
      <h2 className="mt-1 text-2xl font-semibold normal-case">{q.q}</h2>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((o, i) => (
          <button
            key={o} disabled={picked !== null} onClick={() => setPicked(i)}
            className={`rounded-md border-2 px-3 py-2 text-left text-sm ${picked === null ? "border-white/30 hover:border-gold" : i === correct ? "border-gold bg-gold/20" : i === picked ? "border-primary bg-primary/30" : "border-white/10 opacity-60"}`}
          >{o}</button>
        ))}
      </div>
      {picked !== null && <p className="mt-3 text-sm text-white/90">{picked === correct ? "Correct. " : "Not quite. "}{q.x} <span className="text-white/60">({q.ref})</span></p>}
      <div className="mt-4 border-t border-white/20 pt-3 text-sm">
        <span className="text-white/70">Board question of the day: </span>
        <Button asChild variant="link" className="h-auto p-0 text-gold"><Link to={`/board?q=${board.id}`}>{board.text}</Link></Button>
      </div>
    </section>
  );
}