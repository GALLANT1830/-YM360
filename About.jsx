import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Notice from "@/components/common/Notice";
import SourceBadge, { SOURCE_TYPES } from "@/components/common/SourceBadge";
import { DISCLAIMER } from "@/components/layout/LegalFooter";
import { sourceNotes } from "@/data/advancedGuidebook";
import { useSiteContent } from "@/lib/useSiteContent";
import { resolveContent } from "@/lib/siteContentDefs";

const working = [
  "Home dashboard, journey tracker, goals and notes (saved in your browser)",
  "Advanced Guidebook PO/EO study pages, flashcards and adaptive quizzes",
  "Awards reference built from the supplied Awards Manual",
  "Board Coach: 42 recalled questions with exact wording, 16 supplemental questions, mock board with optional timer",
  "Leadership schools, billets, events checklists, after-action reflection",
  "Global search and a local-only Veteran YM Advice archive",
];
const needs = [
  "Junior, Basic, Senior guidebooks and the Marine Corps drill manual — files not yet supplied",
  "Secure SERVE360 sign-in and protected ALS documents — needs accounts, roles and protected file storage",
  "Admin screens, CSV/JSON import and shared content for all visitors — needs a database and protected admin sign-in",
  "Public Veteran advice submissions with review before publishing — needs a database and moderation",
  "Syncing progress across devices — needs accounts",
  "AI feedback and an AI advice assistant — not connected",
];

export default function About() {
  const { content } = useSiteContent();
  const intro = resolveContent(content, "about_intro");
  return (
    <Page>
      <PageHeader kicker="About YM360" title="Learn. Lead. Serve. Become More." desc={intro} />
      <Notice tone="warn" title="Independent project disclaimer"><span className="font-bold uppercase">{DISCLAIMER}</span></Notice>

      <section className="mt-8">
        <h2 className="mb-3 text-2xl font-semibold uppercase text-secondary">How content is labeled</h2>
        <ul className="space-y-2">
          {Object.entries(SOURCE_TYPES).map(([k]) => <li key={k}><SourceBadge type={k} /></li>)}
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">YM360 never claims completing a checklist or practice test grants a promotion, award, qualification or official sign-off, and practice scores do not guarantee success on an official test.</p>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-md border bg-card p-5">
          <h2 className="mb-2 text-xl font-semibold uppercase text-secondary">Working now</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm">{working.map((w) => <li key={w}>{w}</li>)}</ul>
        </div>
        <div className="rounded-md border border-accent bg-card p-5">
          <h2 className="mb-2 text-xl font-semibold uppercase text-secondary">Needs more work or services</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm">{needs.map((w) => <li key={w}>{w}</li>)}</ul>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-2xl font-semibold uppercase text-secondary">Privacy</h2>
        <p className="text-sm">YM360 collects no personal information. Your notes, answers, goals and progress are stored only in this browser on this device and are private by default. Clearing your browser data erases them. Please don’t type private details about other people.</p>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-2xl font-semibold uppercase text-secondary">Source notes & discrepancies</h2>
        <div className="space-y-3">
          {sourceNotes.map((n) => <Notice key={n.title} tone="warn" title={n.title}>{n.detail}</Notice>)}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">When sources conflict, YM360 flags it rather than choosing silently. Verify with the appropriate program leadership. See also the flagged items on the Awards page.</p>
      </section>
    </Page>
  );
}