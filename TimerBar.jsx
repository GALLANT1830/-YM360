import { useEffect, useState } from "react";

export default function TimerBar({ seconds, resetKey }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    setLeft(seconds);
    const t = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(t);
  }, [seconds, resetKey]);
  const pct = (left / seconds) * 100;
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-1.5 bg-transparent">
        <div className="h-full bg-primary shadow-[0_0_12px_hsl(var(--primary))] transition-all duration-1000 ease-linear" style={{ width: `${pct}%` }} />
      </div>
      <div className="text-sm font-semibold tabular-nums text-primary" aria-live="off">
        {left === 0 ? "Time — finish your thought, then move on" : `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`}
      </div>
    </>
  );
}