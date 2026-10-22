import { Info, AlertTriangle } from "lucide-react";

export default function Notice({ children, tone = "info", title, className = "" }) {
  const warn = tone === "warn";
  const Icon = warn ? AlertTriangle : Info;
  return (
    <div
      className={`flex gap-3 rounded-md border p-4 text-sm ${
        warn ? "border-accent bg-accent/15" : "border-border bg-muted/60"
      } ${className}`}
    >
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${warn ? "text-accent-foreground" : "text-muted-foreground"}`} />
      <div>
        {title && <div className="mb-0.5 font-semibold">{title}</div>}
        <div className="text-foreground/90">{children}</div>
      </div>
    </div>
  );
}