export default function EmptyState({ title, children }) {
  return (
    <div className="rounded-md border border-dashed bg-card p-8 text-center">
      <div className="font-heading text-xl font-semibold uppercase text-secondary">{title}</div>
      {children && <div className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{children}</div>}
    </div>
  );
}