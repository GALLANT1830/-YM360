export default function ProgressRing({ value = 0, size = 88, stroke = 8, label, tone = "text-primary" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="hsl(var(--muted))" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} fill="none" strokeLinecap="round"
          stroke="currentColor" className={`${tone} transition-all duration-700`}
          strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c}
        />
      </svg>
      <div className="absolute text-center leading-none">
        <div className="font-heading text-xl font-bold">{Math.round(pct)}%</div>
        {label && <div className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>}
      </div>
    </div>
  );
}