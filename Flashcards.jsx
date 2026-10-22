import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import NativeSelect from "@/components/common/NativeSelect";
import { buildCards, DECKS } from "@/lib/studyBank";
import { KEYS, useStore, shuffle, logActivity } from "@/lib/storage";

const DAYS = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 14 };
const DAY_MS = 86400000;

export default function Flashcards() {
  const cards = useMemo(buildCards, []);
  const [prog, setProg] = useStore(KEYS.cards, {});
  const [deck, setDeck] = useState("all");
  const [topic, setTopic] = useState("all");
  const [focus, setFocus] = useState("due");
  const [queue, setQueue] = useState(null);
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  const [tally, setTally] = useState({ known: 0, review: 0 });

  const filtered = cards.filter((c) => (deck === "all" || c.deck === deck) && (topic === "all" || c.topic === topic));
  const topics = [...new Set(cards.filter((c) => deck === "all" || c.deck === deck).map((c) => c.topic))];
  const mastered = filtered.filter((c) => (prog[c.id]?.box || 0) >= 4).length;
  const now = Date.now();
  const isDue = (c) => !prog[c.id] || prog[c.id].due <= now;

  const start = () => {
    let pool = filtered;
    if (focus === "missed") pool = filtered.filter((c) => prog[c.id]?.box === 1);
    else pool = filtered.filter(isDue);
    setQueue(shuffle(pool).slice(0, 20));
    setI(0); setShown(false); setTally({ known: 0, review: 0 });
  };

  const rate = (known) => {
    const c = queue[i];
    const box = known ? Math.min(5, (prog[c.id]?.box || 1) + 1) : 1;
    setProg((p) => ({ ...p, [c.id]: { box, due: Date.now() + DAYS[box] * DAY_MS } }));
    setTally((t) => ({ known: t.known + (known ? 1 : 0), review: t.review + (known ? 0 : 1) }));
    if (i + 1 >= queue.length) logActivity(`Reviewed ${queue.length} flashcards`);
    setI(i + 1); setShown(false);
  };

  const card = queue && queue[i];
  const done = queue && i >= queue.length;

  return (
    <div className="max-w-3xl">
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <NativeSelect label="Deck" value={deck} onChange={(v) => { setDeck(v); setTopic("all"); setQueue(null); }} options={DECKS.map((d) => ({ value: d.id, label: d.label }))} />
        <NativeSelect label="Topic" value={topic} onChange={(v) => { setTopic(v); setQueue(null); }} options={[{ value: "all", label: "All topics" }, ...topics.map((t) => ({ value: t, label: t }))]} />
        <NativeSelect label="Focus" value={focus} onChange={(v) => { setFocus(v); setQueue(null); }} options={[{ value: "due", label: "New & due cards" }, { value: "missed", label: "Cards I missed" }]} />
      </div>
      <div className="mb-5">
        <div className="mb-1 flex justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <span>Mastery</span><span>{mastered} of {filtered.length} cards</span>
        </div>
        <Progress value={filtered.length ? (mastered / filtered.length) * 100 : 0} className="h-2" />
      </div>

      {!queue && (
        <div className="rounded-md border bg-card p-6 text-center">
          <p className="mb-4 text-sm text-muted-foreground">Cards you miss return sooner; cards you know come back after longer gaps. Progress is saved on this device.</p>
          <Button onClick={start} disabled={!filtered.length}>Start session</Button>
        </div>
      )}

      {queue && !done && card && (
        <div>
          <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <span>Card {i + 1} of {queue.length}</span>
            <button onClick={() => { setQueue(shuffle(queue)); setI(0); setShown(false); }} className="flex items-center gap-1 hover:text-foreground"><Shuffle className="h-3.5 w-3.5" />Shuffle</button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={card.id} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.22 }} className="overflow-hidden rounded-md border-2 border-secondary bg-card">
              <div className="bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gold">{card.topic}</div>
              <div className="min-h-[9rem] p-6 text-xl font-semibold leading-snug">{card.front}</div>
              <AnimatePresence>
                {shown && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="overflow-hidden border-t bg-muted">
                    <div className="p-6 text-lg">{card.back}<div className="mt-2 text-xs text-muted-foreground">Source: {card.ref}</div></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
          <div className="mt-4 flex gap-3">
            {!shown ? (
              <Button className="w-full" onClick={() => setShown(true)}>Reveal answer</Button>
            ) : (
              <>
                <Button variant="outline" className="flex-1" onClick={() => rate(false)}><RotateCcw className="mr-2 h-4 w-4" />Needs review</Button>
                <Button className="flex-1" onClick={() => rate(true)}><Check className="mr-2 h-4 w-4" />I know it</Button>
              </>
            )}
          </div>
        </div>
      )}

      {done && (
        <div className="rounded-md border bg-card p-6 text-center">
          <h3 className="text-2xl font-semibold uppercase text-secondary">Session complete</h3>
          <p className="mt-2 text-sm">{tally.known} known · {tally.review} to review</p>
          <div className="mt-4 flex justify-center gap-3">
            <Button onClick={start}>Another session</Button>
            <Button variant="outline" onClick={() => setQueue(null)}>Change deck</Button>
          </div>
        </div>
      )}
      {queue && queue.length === 0 && <p className="mt-3 text-sm text-muted-foreground">No cards match this focus right now.</p>}
    </div>
  );
}