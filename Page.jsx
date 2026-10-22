export default function Page({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 py-6 sm:px-8 lg:py-10 ${className}`}>{children}</div>;
}