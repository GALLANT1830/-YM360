import { Image } from "@/components/ui/image";

export const LOGO_URL =
  "https://media.base44.com/images/public/6ad80d1336b2de75e224bfbd/c8a01d2cc_296590D4-08C6-478B-8078-6079346BCC48.png";

export default function Logo({ size = "h-12 w-12", showText = true, light = true }) {
  return (
    <div className="flex items-center gap-3">
      <Image src={LOGO_URL} alt="YM360 logo" fittingType="fit" className={`${size} shrink-0 object-contain`} />
      {showText && (
        <div className="leading-none">
          <div className={`font-heading text-2xl font-bold tracking-wider ${light ? "text-white" : "text-secondary"}`}>YM360</div>
          <div className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${light ? "text-gold" : "text-muted-foreground"}`}>
            Learn. Lead. Serve. Become More.
          </div>
        </div>
      )}
    </div>
  );
}