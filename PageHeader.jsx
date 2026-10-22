export default function PageHeader({ kicker, title, desc, children }) {
  return (
    <header className="mb-8 border-b pb-6">
      {kicker && <div className="kicker mb-2">{kicker}</div>}
      <h1 className="text-4xl font-bold uppercase text-secondary sm:text-5xl">{title}</h1>
      {desc && <p className="mt-3 max-w-3xl text-base text-muted-foreground">{desc}</p>}
      {children && <div className="mt-4">{children}</div>}
    </header>
  );
}