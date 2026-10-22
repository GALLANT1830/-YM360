import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import AdminGate from "@/components/admin/AdminGate";
import Notice from "@/components/common/Notice";
import NativeSelect from "@/components/common/NativeSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from "@/api/base44Client";

const CATS = [
  "Study strategies", "Promotion preparation", "School preparation", "Board practice",
  "Public speaking", "Leadership", "Safety", "Billets", "Events", "Service",
  "Personal development", "Other",
];

const empty = { category: CATS[0], source: "supplemental", reference: "", question: "", answer: "" };

export default function AdminAdvice() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const { items: rows } = await base44.entities.Advice.filter({}, { sort: "order", limit: 200 });
      setItems(rows);
    } catch (e) {
      setErr(e.message || "Could not load advice");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!form.question.trim() || !form.answer.trim()) { setErr("Add a question and an answer."); return; }
    setBusy(true);
    try {
      const payload = {
        category: form.category,
        source: form.source,
        reference: form.reference.trim(),
        question: form.question.trim(),
        answer: form.answer.trim(),
      };
      if (editingId) {
        await base44.entities.Advice.update(editingId, payload);
      } else {
        payload.order = items.length;
        await base44.entities.Advice.create(payload);
      }
      setForm(empty);
      setEditingId(null);
      await load();
    } catch (e) {
      setErr(e.message || "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const edit = (it) => {
    setEditingId(it.id);
    setForm({ category: it.category, source: it.source, reference: it.reference || "", question: it.question, answer: it.answer });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancel = () => { setEditingId(null); setForm(empty); };

  const remove = async (id) => {
    if (!confirm("Delete this advice entry?")) return;
    try { await base44.entities.Advice.delete(id); await load(); } catch (e) { setErr(e.message); }
  };

  const move = async (it, dir) => {
    const idx = items.findIndex((x) => x.id === it.id);
    const swap = items[idx + dir];
    if (!swap) return;
    try {
      await base44.entities.Advice.bulkUpdate([
        { id: it.id, order: swap.order ?? idx + dir },
        { id: swap.id, order: it.order ?? idx },
      ]);
      await load();
    } catch (e) { setErr(e.message); }
  };

  return (
    <AdminGate kicker="Admin" title="Advice manager" desc="Add, edit and reorder the questions and answers shown on the Personal YM Advice page. Mark an answer “verified” only when it cites a supplied manual.">
      <form onSubmit={submit} className="mb-8 rounded-md border bg-card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold uppercase text-secondary">{editingId ? "Edit entry" : "Add an entry"}</h2>
          {editingId && <Button type="button" size="sm" variant="outline" onClick={cancel}><X className="mr-1.5 h-3.5 w-3.5" />Cancel</Button>}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <NativeSelect label="Topic" value={form.category} onChange={(v) => setForm({ ...form, category: v })} options={CATS.map((c) => ({ value: c, label: c }))} />
          <NativeSelect label="Source" value={form.source} onChange={(v) => setForm({ ...form, source: v })} options={[{ value: "supplemental", label: "Supplemental (YM360 suggestion)" }, { value: "verified", label: "Verified (cites a manual)" }]} />
        </div>
        <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Question
          <Input className="mt-1" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
        </label>
        <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Answer
          <Textarea className="mt-1" rows={3} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
        </label>
        <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Source citation (optional)
          <Input className="mt-1" value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} placeholder="e.g. Awards Manual p. 80" />
        </label>
        {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
        <Button className="mt-4" type="submit" disabled={busy}>
          {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
          {busy ? "Saving…" : editingId ? "Save changes" : "Add entry"}
        </Button>
      </form>

      <h2 className="mb-3 text-2xl font-semibold uppercase text-secondary">Published advice ({items.length})</h2>
      {loading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : items.length === 0 ? (
        <Notice>No advice entries yet. The page still shows the built-in FAQ until you add your own.</Notice>
      ) : (
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.id} className="rounded-md border bg-card p-4">
              <div className="flex items-start gap-3">
                <div className="flex flex-col gap-1">
                  <button onClick={() => move(it, -1)} className="text-muted-foreground hover:text-foreground" aria-label="Move up"><ArrowUp className="h-4 w-4" /></button>
                  <button onClick={() => move(it, 1)} className="text-muted-foreground hover:text-foreground" aria-label="Move down"><ArrowDown className="h-4 w-4" /></button>
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">{it.category}</span>
                    <span className={`rounded-sm px-1.5 py-0.5 text-[11px] font-semibold uppercase ${it.source === "verified" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>{it.source}</span>
                  </div>
                  <div className="font-semibold text-secondary">{it.question}</div>
                  <p className="mt-1 text-sm">{it.answer}</p>
                  {it.reference && <p className="mt-1 text-xs text-muted-foreground">Source: {it.reference}</p>}
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="outline" onClick={() => edit(it)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="outline" onClick={() => remove(it.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AdminGate>
  );
}