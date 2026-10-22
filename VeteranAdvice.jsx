import { useMemo, useState } from "react";
import { Plus, Star, Trash2 } from "lucide-react";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Notice from "@/components/common/Notice";
import EmptyState from "@/components/common/EmptyState";
import SourceBadge from "@/components/common/SourceBadge";
import NativeSelect from "@/components/common/NativeSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { KEYS, useStore } from "@/lib/storage";

export const ADVICE_TOPICS = ["Leadership", "Discipline", "Mentorship", "JLS, SLS, and ALS", "Promotion preparation", "YMOY preparation", "Billets", "Events", "Public speaking", "Service", "Failure and resilience", "Personal development"];
const PERMISSION = ["Permission confirmed in writing", "Permission pending", "Anonymous only"];
const empty = { quote: "", name: "", role: "", topic: ADVICE_TOPICS[0], story: "", lesson: "", permission: PERMISSION[1], verified: "Not verified" };

export default function VeteranAdvice() {
  const [entries, setEntries] = useStore(KEYS.advice, []);
  const [f, setF] = useState(empty);
  const [topic, setTopic] = useState("all");
  const [q, setQ] = useState("");

  const list = useMemo(
    () => entries.filter((e) => (topic === "all" || e.topic === topic) && `${e.quote} ${e.lesson} ${e.story} ${e.name}`.toLowerCase().includes(q.toLowerCase())).sort((a, b) => Number(!!b.featured) - Number(!!a.featured)),
    [entries, topic, q]
  );
  const add = () => {
    if (!f.quote.trim()) return;
    setEntries((l) => [{ ...f, id: Date.now(), date: new Date().toISOString().slice(0, 10) }, ...l]);
    setF(empty);
  };

  return (
    <Page>
      <PageHeader kicker="Veteran YM Advice" title="Lessons from Young Marines" desc="A place to collect real advice, quotes and lessons from experienced Young Marines — only with their permission." />
      <Notice className="mb-6" tone="warn" title="This archive is private to this device for now">
        YM360 contains no sample quotes and will never invent advice or attribute made-up quotes to real people. Entries you add are stored only in this browser. Public submissions, review-before-publishing and a shared “Lesson of the Week” for all visitors need a database and a protected admin sign-in, which are not connected yet. Get permission before using anyone’s name, quotation, photo or story.
      </Notice>

      <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_16rem]">
        <Input className="h-10 self-end" placeholder="Search advice" value={q} onChange={(e) => setQ(e.target.value)} />
        <NativeSelect label="Topic" value={topic} onChange={setTopic} options={[{ value: "all", label: "All topics" }, ...ADVICE_TOPICS.map((t) => ({ value: t, label: t }))]} />
      </div>

      {list.length === 0 ? (
        <EmptyState title="No advice collected yet">Add a quote below once you have the contributor’s permission. Featured entries appear first and the featured one on top becomes the Lesson of the Week on your Home page.</EmptyState>
      ) : (
        <ul className="space-y-4">
          {list.map((e) => (
            <li key={e.id} className={`rounded-md border bg-card p-5 ${e.featured ? "border-gold border-2" : ""}`}>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">{e.topic}</span>
                <SourceBadge type="advice" />
                <span className="text-xs text-muted-foreground">{e.permission} · {e.verified}</span>
              </div>
              <blockquote className="border-l-4 border-gold pl-4 text-xl font-medium italic">“{e.quote}”</blockquote>
              <p className="mt-2 text-sm font-semibold">{e.name || "Anonymous"}{e.role ? `, ${e.role}` : ""} <span className="font-normal text-muted-foreground">· {e.date}</span></p>
              {e.story && <p className="mt-2 text-sm">{e.story}</p>}
              {e.lesson && <p className="mt-2 text-sm"><strong>Lesson for younger Young Marines:</strong> {e.lesson}</p>}
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setEntries((l) => l.map((x) => ({ ...x, featured: x.id === e.id ? !x.featured : false })))}>
                  <Star className="mr-1.5 h-3.5 w-3.5" />{e.featured ? "Unfeature" : "Feature"}
                </Button>
                <Button size="sm" variant="outline" onClick={() => setEntries((l) => l.filter((x) => x.id !== e.id))}><Trash2 className="mr-1.5 h-3.5 w-3.5" />Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <section className="mt-10 rounded-md border bg-card p-5">
        <h2 className="text-2xl font-semibold uppercase text-secondary">Add real advice</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Textarea className="sm:col-span-2" rows={3} placeholder="Quote or advice (exactly as the contributor gave it)" value={f.quote} onChange={(e) => setF({ ...f, quote: e.target.value })} />
          <Input placeholder="Contributor name or approved display name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <Input placeholder="Role or experience (only if permitted)" value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} />
          <NativeSelect label="Topic" value={f.topic} onChange={(v) => setF({ ...f, topic: v })} options={ADVICE_TOPICS.map((t) => ({ value: t, label: t }))} />
          <NativeSelect label="Permission status" value={f.permission} onChange={(v) => setF({ ...f, permission: v })} options={PERMISSION.map((t) => ({ value: t, label: t }))} />
          <Textarea className="sm:col-span-2" rows={2} placeholder="Optional background story" value={f.story} onChange={(e) => setF({ ...f, story: e.target.value })} />
          <Textarea className="sm:col-span-2" rows={2} placeholder="Lesson for younger Young Marines" value={f.lesson} onChange={(e) => setF({ ...f, lesson: e.target.value })} />
        </div>
        <Button className="mt-3" onClick={add}><Plus className="mr-1.5 h-4 w-4" />Save entry</Button>
      </section>
    </Page>
  );
}