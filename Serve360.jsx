import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ExternalLink, Download, FileText, Loader2, GraduationCap,
  Users, ShieldHalf, BookOpen, Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { schools } from "@/data/eventsAndSchools";
import { CATEGORY_LABEL } from "@/data/curriculumCategories";
import { base44 } from "@/api/base44Client";
import Serve360Gate from "@/components/serve360/Serve360Gate";

function DocCard({ d }) {
  return (
    <li className="flex flex-col rounded-md border border-white/15 bg-white/5 p-4">
      <div className="mb-1 flex items-center gap-2">
        <FileText className="h-4 w-4 text-gold" />
        <span className="text-[11px] font-semibold uppercase tracking-wide text-gold">{CATEGORY_LABEL[d.category] || d.category}</span>
      </div>
      <div className="font-semibold text-white">{d.title}</div>
      {d.description && <p className="mt-1 text-sm text-white/60">{d.description}</p>}
      {d.audience && <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/40">For: {d.audience}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        <Button asChild size="sm" className="bg-gold text-charcoal hover:bg-gold/90">
          <a href={d.file_url} target="_blank" rel="noreferrer">Open <ExternalLink className="ml-1.5 h-3.5 w-3.5" /></a>
        </Button>
        <Button asChild size="sm" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
          <a href={d.file_url} download={d.file_name || true}>Download <Download className="ml-1.5 h-3.5 w-3.5" /></a>
        </Button>
      </div>
    </li>
  );
}

function Section({ icon: Icon, title, kicker, docs, children }) {
  return (
    <section className="mt-10">
      <div className="mb-1 flex items-center gap-2 text-gold">
        <Icon className="h-5 w-5" />
        <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em]">{kicker}</span>
      </div>
      <h2 className="text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">{title}</h2>
      {children && <div className="mt-3 max-w-2xl text-white/75">{children}</div>}
      {docs.length === 0 ? (
        <p className="mt-4 text-sm text-white/50">No resources uploaded for this section yet. Once the site owner adds files in Content Studio, they appear here automatically.</p>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {docs.map((d) => <DocCard key={d.id} d={d} />)}
        </ul>
      )}
    </section>
  );
}

export default function Serve360() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Curriculum.filter({}, { sort: "-created_date", limit: 200 })
      .then(({ items }) => setDocs(items))
      .catch(() => setDocs([]))
      .finally(() => setLoading(false));
  }, []);

  const byCat = useMemo(() => {
    const map = {};
    for (const d of docs) {
      (map[d.category] = map[d.category] || []).push(d);
    }
    return map;
  }, [docs]);

  const schoolDocs = (id) => byCat[id] || [];
  const recruitDocs = byCat.recruit_cycle || [];
  const ricDocs = byCat.recruit_instructor || [];
  const ymClassDocs = byCat.ym_classes || [];

  return (
    <div className="min-h-[70vh] bg-charcoal text-white">
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-8 lg:py-16">
        <div className="mb-3 flex items-center gap-2 text-gold">
          <ShieldHalf className="h-5 w-5" />
          <span className="font-heading text-sm font-semibold uppercase tracking-[0.2em]">Advanced Leadership & Training Hub</span>
        </div>
        <h1 className="text-5xl font-bold uppercase tracking-wider text-white sm:text-7xl">SERVE<span className="text-gold">360</span></h1>
        <p className="mt-3 font-heading text-2xl uppercase tracking-widest text-gold">Become the Leader You Needed.</p>
        <p className="mt-5 max-w-2xl text-white/75">
          SERVE360 is the home for everything at the leadership-school level and above: Junior, Senior and Advanced Leadership School classes and resources, the recruit cycle curriculum, the Recruit Instructor Course, and YM classes for every rank. Upload materials in Content Studio and they show up here instantly.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Button asChild variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
            <Link to="/schools"><GraduationCap className="mr-2 h-4 w-4" /> School checklists</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
            <Link to="/coach"><Compass className="mr-2 h-4 w-4" /> Ask a coach</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
            <Link to="/resources"><BookOpen className="mr-2 h-4 w-4" /> Resource Library</Link>
          </Button>
        </div>

        {loading && (
          <div className="mt-10 flex items-center gap-2 text-sm text-white/60"><Loader2 className="h-4 w-4 animate-spin" /> Loading resources…</div>
        )}

        {/* Leadership Schools — public JLS & SLS */}
        <Section icon={GraduationCap} kicker="Leadership Schools" title="JLS · SLS classes & prep" docs={[...schoolDocs("jls"), ...schoolDocs("sls")]}>
          <p>
            These classes help Young Marines prepare for Junior and Senior Leadership School. Use the uploaded class materials to learn the material before you go. ALS (Advanced Leadership School) classes and prep are reserved for ALS graduates — see the gated section below.
          </p>
        </Section>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {schools.map((s) => (
            <div key={s.id} className="rounded-md border border-white/15 bg-white/5 p-4">
              <div className="font-heading text-xs font-semibold uppercase tracking-widest text-gold">{s.id.toUpperCase()}</div>
              <div className="mt-1 font-semibold text-white">{s.name}</div>
              <p className="mt-1 text-xs text-white/60">{s.summary}</p>
              {schoolDocs(s.id).length > 0 && (
                <ul className="mt-2 space-y-1 text-xs text-white/70">
                  {schoolDocs(s.id).slice(0, 3).map((d) => (
                    <li key={d.id}><a href={d.file_url} target="_blank" rel="noreferrer" className="font-semibold text-gold hover:underline">{d.title}</a></li>
                  ))}
                </ul>
              )}
              <Button asChild size="sm" variant="link" className="mt-1 h-auto p-0 text-gold">
                <Link to="/schools">View checklist →</Link>
              </Button>
            </div>
          ))}
        </div>

        <Section icon={Users} kicker="Recruit Training" title="Recruit cycle curriculum" docs={recruitDocs}>
          <p>The full recruit training cycle — lesson plans, POs/EOs and materials for running new Young Marines through recruit training.</p>
        </Section>

        {/* ALS-level resources — gated to ALS graduates */}
        <Serve360Gate label="ALS classes, prep and the Recruit Instructor Course">
          <Section icon={GraduationCap} kicker="Advanced Leadership School" title="ALS classes & prep" docs={schoolDocs("als")}>
            <p>Advanced Leadership School classes and preparation materials — reserved for ALS graduates and returning cadre.</p>
          </Section>

          <Section icon={ShieldHalf} kicker="Cadre Development" title="Recruit Instructor Course" docs={ricDocs}>
            <p>Resources for the Recruit Instructor Course — the certification that lets senior Young Marines train recruits. ALS graduates serving as cadre can study and teach from these materials.</p>
          </Section>
        </Serve360Gate>

        <Section icon={BookOpen} kicker="For Every Young Marine" title="YM classes (all ranks)" docs={ymClassDocs}>
          <p>Classes and downloadable lessons available to every Young Marine, across every rank. Use them to learn on your own or to teach others.</p>
        </Section>

        <p className="mt-12 text-sm text-white/50">
          SERVE360 resources are public study materials uploaded by the site owner. Confirm schedules, packing lists and application details with Headquarters Young Marines and your school director.
        </p>
      </section>
    </div>
  );
}