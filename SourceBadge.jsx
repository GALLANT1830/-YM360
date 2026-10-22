const TYPES = {
  verified: { label: "Verified official source", cls: "bg-secondary text-secondary-foreground" },
  explained: { label: "Educational explanation of a source", cls: "bg-accent/25 text-foreground border border-accent" },
  supplemental: { label: "Supplemental YM360 practice", cls: "bg-muted text-foreground border border-border" },
  advice: { label: "Personal advice or experience", cls: "bg-card text-foreground border border-accent" },
  user: { label: "User-submitted contribution", cls: "bg-card text-foreground border border-border" },
  recalled: { label: "User-recalled board question", cls: "bg-primary/10 text-foreground border border-primary/40" },
};

export const SOURCE_TYPES = TYPES;

export default function SourceBadge({ type = "verified", className = "" }) {
  const t = TYPES[type] || TYPES.verified;
  return (
    <span className={`inline-flex items-center rounded-sm px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${t.cls} ${className}`}>
      {t.label}
    </span>
  );
}