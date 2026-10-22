export default function NativeSelect({ value, onChange, options, label, className = "" }) {
  return (
    <label className={`block text-xs font-semibold uppercase tracking-wide text-muted-foreground ${className}`}>
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block h-10 w-full rounded-md border border-input bg-card px-3 text-sm font-normal normal-case tracking-normal text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}