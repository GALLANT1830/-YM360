import { Link } from "react-router-dom";

export const DISCLAIMER =
  "YM360 is an independent educational resource created by a Young Marine. It is not an official Young Marines website and is not affiliated with or endorsed by the Young Marines national organization, the U.S. Marine Corps, or the Department of Defense.";

export default function LegalFooter() {
  return (
    <footer className="bg-charcoal px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase leading-relaxed tracking-wide">{DISCLAIMER}</p>
        <p className="mt-4 text-sm text-white/70">
          Completing a YM360 checklist or practice test does not grant a promotion, award, qualification or official sign-off.{" "}
          <Link to="/about" className="text-gold underline underline-offset-2">
            About YM360 &amp; source labels
          </Link>
        </p>
      </div>
    </footer>
  );
}