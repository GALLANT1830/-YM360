import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Upload, Trash2, FileText, Loader2, ShieldAlert, LogIn } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Notice from "@/components/common/Notice";
import NativeSelect from "@/components/common/NativeSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { CURRICULUM_CATEGORIES as CATEGORIES } from "@/data/curriculumCategories";

const empty = { title: "", category: "junior", description: "", file: null };

export default function AdminCurriculum() {
  const { user, isAuthenticated, isLoadingAuth, navigateToLogin } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const { items: rows } = await base44.entities.Curriculum.filter({}, { sort: "-created_date", limit: 100 });
      setItems(rows);
    } catch (e) {
      setErr(e.message || "Could not load documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (isAuthenticated && user?.role === "admin") load(); }, [isAuthenticated, user]);

  if (isLoadingAuth) {
    return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  if (!isAuthenticated) {
    return (
      <Page>
        <PageHeader kicker="Admin" title="Curriculum manager" />
        <Notice tone="warn" title="Sign in required">Only signed-in admins can upload curriculum.</Notice>
        <Button className="mt-4" onClick={() => navigateToLogin()}><LogIn className="mr-2 h-4 w-4" />Sign in</Button>
      </Page>
    );
  }

  if (user?.role !== "admin") {
    return (
      <Page>
        <PageHeader kicker="Admin" title="Curriculum manager" />
        <Notice tone="warn" title="Admins only"><span className="flex items-center gap-2"><ShieldAlert className="h-4 w-4" />Your account does not have admin access. Ask a workspace admin to invite you as an admin.</span></Notice>
      </Page>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!form.title.trim() || !form.file) { setErr("Add a title and choose a file."); return; }
    setBusy(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file: form.file });
      await base44.entities.Curriculum.create({
        title: form.title.trim(),
        category: form.category,
        description: form.description.trim(),
        file_url,
        file_name: form.file.name,
      });
      setForm(empty);
      await load();
    } catch (e) {
      setErr(e.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Remove this document from the site? The uploaded file stays in storage.")) return;
    try { await base44.entities.Curriculum.delete(id); await load(); } catch (e) { setErr(e.message); }
  };

  return (
    <Page>
      <PageHeader kicker="Admin" title="Resources & guidebooks" desc="Upload documents, manuals, forms, classes and course materials. Files are stored publicly — anyone with the link can open them. Guidebook files appear on the Guidebooks page; leadership-school, recruit-cycle, recruit-instructor and YM-class materials also appear in the SERVE360 portal; everything is searchable in the Resource Library." />
      <form onSubmit={submit} className="mb-8 rounded-md border bg-card p-5">
        <h2 className="mb-3 text-xl font-semibold uppercase text-secondary">Add a document</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Title
            <Input className="mt-1" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. YM Junior Guidebook" />
          </label>
          <NativeSelect label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} options={CATEGORIES} />
        </div>
        <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Note (edition, revision date…)
          <Textarea className="mt-1" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </label>
        <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">File (PDF, DOCX, etc.)
          <Input type="file" className="mt-1" onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })} />
        </label>
        {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
        <Button className="mt-4" type="submit" disabled={busy}>
          {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
          {busy ? "Uploading…" : "Upload & publish"}
        </Button>
      </form>

      <h2 className="mb-3 text-2xl font-semibold uppercase text-secondary">Published documents</h2>
      {loading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No documents yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.id} className="flex items-start gap-3 rounded-md border bg-card p-4">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="flex-1">
                <div className="font-semibold text-secondary">{it.title}</div>
                <div className="text-xs font-semibold uppercase tracking-wide text-primary">{CATEGORIES.find((c) => c.value === it.category)?.label}</div>
                {it.description && <p className="mt-1 text-sm text-muted-foreground">{it.description}</p>}
                <a href={it.file_url} target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm font-semibold text-primary hover:underline">Open file</a>
              </div>
              <Button size="icon" variant="outline" onClick={() => remove(it.id)}><Trash2 className="h-4 w-4" /></Button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-sm text-muted-foreground"><Link to="/guidebooks" className="font-semibold text-primary">View the Guidebooks page</Link> to see how visitors experience these.</p>
    </Page>
  );
}