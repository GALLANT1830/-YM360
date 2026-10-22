import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Mic, BookOpen, GraduationCap, Briefcase, Award, Quote, Lock, Bookmark } from "lucide-react";
import Page from "@/components/common/Page";
import ProgressRing from "@/components/common/ProgressRing";
import Notice from "@/components/common/Notice";
import EmptyState from "@/components/common/EmptyState";
import DailyChallenge from "@/components/home/DailyChallenge";
import { Image } from "@/components/ui/image";
import { KEYS, useStore } from "@/lib/storage";
import { journeyItems } from "@/data/journeyItems";
import { allBoardQuestions } from "@/data/boardQuestions";
import { resources } from "@/data/resources";
import { buildCards } from "@/lib/studyBank";
import { useSiteContent } from "@/lib/useSiteContent";
import { resolveContent, resolveHomeSections } from "@/lib/siteContentDefs";

const QUICK = [
  { to: "/study", label: "Study", icon: Brain },
  { to: "/board", label: "Board practice", icon: Mic },
  { to: "/guidebooks", label: "Guidebook tests", icon: BookOpen },
  { to: "/schools", label: "Leadership schools", icon: GraduationCap },
  { to: "/billets", label: "Billet prep", icon: Briefcase },
  { to: "/awards", label: "Awards", icon: Award },
  { to: "/veteran-advice", label: "Veteran advice", icon: Quote },
  { to: "/serve360", label: "SERVE360", icon: Lock },
];

export default function Home() {
  const [stage] = useStore(KEYS.stage, "");
  const [journey] = useStore(KEYS.journey, {});
  const [goals] = useStore(KEYS.goals, []);
  const [hist] = useStore(KEYS.quizHistory, []);
  const [qStats] = useStore(KEYS.qStats, {});
  const [cardsP] = useStore(KEYS.cards, {});
  const [bStatus] = useStore(KEYS.boardStatus, {});
  const [saved] = useStore(KEYS.saved, []);
  const [activity] = useStore(KEYS.activity, []);
  const [advice] = useStore(KEYS.advice, []);
  const { content } = useSiteContent();
  const totalCards = useMemo(() => buildCards().length, []);

  const heroTitle = resolveContent(content, "home_hero_title");
  const heroSubtitle = resolveContent(content, "home_hero_subtitle");
  const heroImage = resolveContent(content, "home_hero_image");

  const journeyPct = (journeyItems.reduce((s, i) => s + ({ done: 100, doing: 50 }[journey[i.id]?.status] || 0), 0)) / journeyItems.length;
  const cardPct = (Object.values(cardsP).filter((c) => c.box >= 4).length / totalCards) * 100;
  const confident = Object.values(bStatus).filter((s) => s === "confident").length;
  const boardPct = (confident / allBoardQuestions.length) * 100;

  const weak = Object.values(qStats).reduce((m, s) => { if (s.missed > 0) m[s.topic] = (m[s.topic] || 0) + s.missed; return m; }, {});
  const weakTopics = Object.entries(weak).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const lesson = advice.find((a) => a.featured);
  const goalsOpen = goals.filter((g) => !g.done);

  let next = { to: "/board", title: "Practice a board question", why: "Write your own answer, then study the coaching." };
  if (!stage) next = { to: "/journey", title: "Choose your learning stage", why: "Set your own stage and goals — YM360 doesn't assume your rank." };
  else if (weakTopics.length) next = { to: "/study", title: `Review missed questions: ${weakTopics[0][0]}`, why: "You've missed questions here before. Quiz it again in adaptive mode." };
  else if (hist.length === 0) next = { to: "/study", title: "Take your first practice quiz", why: "A quick quiz shows what to study next." };
  else if (journeyPct === 0) next = { to: "/journey", title: "Set a learning goal", why: "Pick one area from the tracker and add a target date." };

  const sections = resolveHomeSections(content);

  const renderSection = (key) => {
    switch (key) {
      case "next_step":
        return (
          <Link to={next.to} className="group flex flex-col justify-between rounded-md border-2 border-primary bg-card p-5 transition-shadow hover:shadow-lg">
            <div>
              <div className="kicker">Recommended next step</div>
              <h2 className="mt-1 text-3xl font-bold normal-case text-secondary">{next.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{next.why}</p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">Go <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
          </Link>
        );
      case "daily_challenge":
        return <DailyChallenge />;
      case "quick_actions":
        return (
          <section className="mb-8">
            <h2 className="mb-3 text-2xl font-semibold uppercase text-secondary">Quick actions</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {QUICK.map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to} className="flex items-center gap-3 rounded-md border bg-card p-4 font-semibold transition-colors hover:border-primary">
                  <Icon className="h-5 w-5 text-primary" />{label}
                </Link>
              ))}
            </div>
          </section>
        );
      case "weak_topics":
        return (
          <div className="rounded-md border bg-card p-5">
            <h2 className="mb-2 text-xl font-semibold uppercase text-secondary">Topics requiring more study</h2>
            {weakTopics.length ? <ul className="space-y-1 text-sm">{weakTopics.map(([t, n]) => <li key={t}>{t} <span className="text-muted-foreground">— {n} missed</span></li>)}</ul> : <p className="text-sm text-muted-foreground">Nothing yet. Take a quiz and your weak spots appear here.</p>}
          </div>
        );
      case "goals":
        return (
          <div className="rounded-md border bg-card p-5">
            <h2 className="mb-2 text-xl font-semibold uppercase text-secondary">Personal goals</h2>
            {goalsOpen.length ? <ul className="list-disc space-y-1 pl-5 text-sm">{goalsOpen.slice(0, 4).map((g) => <li key={g.id}>{g.text}</li>)}</ul> : <p className="text-sm text-muted-foreground">No open goals. <Link to="/journey" className="font-semibold text-primary">Add one</Link>.</p>}
          </div>
        );
      case "saved":
        return (
          <div className="rounded-md border bg-card p-5">
            <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold uppercase text-secondary"><Bookmark className="h-4 w-4" />Saved resources</h2>
            {saved.length ? <ul className="space-y-1 text-sm">{saved.map((id) => <li key={id}>{resources.find((r) => r.id === id)?.title}</li>)}</ul> : <p className="text-sm text-muted-foreground">Bookmark items in the Resource Library.</p>}
          </div>
        );
      case "activity":
        return (
          <div className="rounded-md border bg-card p-5">
            <h2 className="mb-2 text-xl font-semibold uppercase text-secondary">Recent activity</h2>
            {activity.length ? <ul className="space-y-1 text-sm">{activity.slice(0, 5).map((a, i) => <li key={i}>{a.text} <span className="text-xs text-muted-foreground">{new Date(a.at).toLocaleDateString()}</span></li>)}</ul> : <p className="text-sm text-muted-foreground">Your activity appears here.</p>}
          </div>
        );
      case "lesson":
        return (
          <div className="rounded-md border-2 border-gold bg-card p-5 md:col-span-2">
            <h2 className="mb-2 text-xl font-semibold uppercase text-secondary">Lesson of the week</h2>
            {lesson ? <blockquote className="border-l-4 border-gold pl-3 italic">“{lesson.quote}” <span className="not-italic text-sm text-muted-foreground">— {lesson.name || "Anonymous"}</span></blockquote> : <p className="text-sm text-muted-foreground">No featured lesson yet. Real advice from experienced Young Marines goes in <Link to="/veteran-advice" className="font-semibold text-primary">Veteran YM Advice</Link> — YM360 never invents quotes.</p>}
          </div>
        );
      default:
        return null;
    }
  };

  // full-width sections render alone; the 2-col grid holds the card sections
  const fullWidth = new Set(["next_step", "daily_challenge", "quick_actions"]);
  const ordered = sections.filter((s) => s.enabled);
  const gridSections = ordered.filter((s) => !fullWidth.has(s.key));
  const showGrid = gridSections.length > 0;

  return (
    <div>
      <section className="bg-secondary text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-8 md:flex-row md:items-center lg:py-12">
          <Image src={heroImage} alt="YM360" fittingType="fit" className="h-28 w-28 shrink-0 object-contain md:h-40 md:w-40" />
          <div>
            <div className="kicker !text-gold">Mission control</div>
            <h1 className="mt-1 text-4xl font-bold uppercase sm:text-6xl">{heroTitle}</h1>
            <p className="mt-3 max-w-2xl text-white/80">{heroSubtitle}</p>
            <p className="mt-3 text-sm text-gold">{stage ? `Learning stage: ${stage}` : "No learning stage chosen yet"}</p>
          </div>
        </div>
      </section>

      <Page>
        <section className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[["Journey", journeyPct], ["Flashcards mastered", cardPct], ["Board confident", boardPct], ["Last quiz", hist[0] ? (hist[0].score / hist[0].total) * 100 : 0]].map(([l, v]) => (
            <div key={l} className="flex items-center gap-3 rounded-md border bg-card p-4">
              <ProgressRing value={v} size={64} stroke={7} />
              <div className="text-xs font-semibold uppercase leading-tight tracking-wide text-muted-foreground">{l}</div>
            </div>
          ))}
        </section>

        {ordered.map((s) => (
          s.key === "next_step" || s.key === "daily_challenge" ? (
            <section key={s.key} className="mb-8 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
              {renderSection("next_step")}
              {renderSection("daily_challenge")}
            </section>
          ) : s.key === "quick_actions" ? (
            <div key={s.key}>{renderSection("quick_actions")}</div>
          ) : null
        ))}

        {showGrid && (
          <section className="grid gap-5 md:grid-cols-2">
            {gridSections.map((s) => renderSection(s.key))}
          </section>
        )}

        <Notice className="mt-8">Progress on this page is calculated from what you do in YM360 on this device. It is not an official record and does not affect promotions, awards or qualifications.</Notice>
      </Page>
    </div>
  );
}