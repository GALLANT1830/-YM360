import { useEffect, useMemo, useState } from "react";
import { Upload, Trash2, Image as ImageIcon, Loader2, ShieldAlert, LogIn, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Notice from "@/components/common/Notice";
import NativeSelect from "@/components/common/NativeSelect";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { awards } from "@/data/awards";

// Only awards that carry an actual ribbon number can have a ribbon image.
const RIBBON_AWARDS = awards
  .filter((a) => a.no && a.no !== "—" && a.no !== "N/A")
  .map((a) => ({ value: a.no, label: `${a.no} — ${a.name}`, awardName: a.name }));

export default function AdminRibbons() {
  const { user, isAuthenticated, isLoadingAuth, navigateToLogin } = useAuth();
  const [ribbons, setRibbons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selNo, setSelNo] = useState(RIBBON_AWARDS[0]?.value || "");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const { items } = await base44.entities.Ribbon.filter({}, { limit: 200 });
      setRibbons(items);
    } catch (e) {
      setErr(e.message || "Could not load ribbon images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") load();
  }, [isAuthenticated, user]);

  const byNo = useMemo(() => {
    const map = {};
    for (const r of ribbons) map[r.ribbon_no] = r;
    return map;
  }, [ribbons]);

  if (isLoadingAuth) {
    return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }
  if (!isAuthenticated) {
    return (
      <Page>
        <PageHeader kicker="Admin" title="Ribbon images" />
        <Notice tone="warn" title="Sign in required">Only signed-in admins can upload ribbon images.</Notice>
        <Button className="mt-4" onClick={() => navigateToLogin()}><LogIn className="mr-2 h-4 w-4" />Sign in</Button>
      </Page>
    );
  }
  if (user?.role !== "admin") {
    return (
      <Page>
        <PageHeader kicker="Admin" title="Ribbon images" />
        <Notice tone="warn" title="Admins only"><span className="flex items-center gap-2"><ShieldAlert className="h-4 w-4" />Your account does not have admin access.</span></Notice>
      </Page>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!selNo || !file) { setErr("Choose an award and an image."); return; }
    setBusy(true);
    try {
      const award = RIBBON_AWARDS.find((a) => a.value === selNo);
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      const existing = byNo[selNo];
      if (existing) {
        await base44.entities.Ribbon.update(existing.id, { image_url: file_url });
      } else {
        await base44.entities.Ribbon.create({
          ribbon_no: selNo,
          award_name: award.awardName,
          image_url: file_url,
        });
      }
      setFile(null);
      await load();
    } catch (e) {
      setErr(e.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id, no) => {
    if (!confirm(`Remove the ribbon image for ribbon #${no}?`)) return;
    try { await base44.entities.Ribbon.delete(id); await load(); } catch (e) { setErr(e.message); }
  };

  return (
    <Page>
      <PageHeader kicker="Admin" title="Ribbon images" desc="Upload a ribbon image for each award. Images are stored publicly — anyone with the link can open them. They appear next to the award on the Awards page. Match each image to its ribbon number from the Awards Manual." />
      <form onSubmit={submit} className="mb-8 rounded-md border bg-card p-5">
        <h2 className="mb-3 text-xl font-semibold uppercase text-secondary">Add / replace a ribbon image</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <NativeSelect label="Award (by ribbon #)" value={selNo} onChange={setSelNo} options={RIBBON_AWARDS} />
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ribbon image (PNG, JPG)
            <input type="file" accept="image/*" className="mt-1 block w-full text-sm file:mr-3 file:rounded file:border file:border-input file:bg-primary file:px-3 file:py-1.5 file:text-primary-foreground" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
        </div>
        {file && <p className="mt-2 text-sm text-muted-foreground">Selected: {file.name}</p>}
        {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
        <Button className="mt-4" type="submit" disabled={busy}>
          {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
          {busy ? "Uploading…" : byNo[selNo] ? "Replace image" : "Upload ribbon"}
        </Button>
      </form>

      <h2 className="mb-3 text-2xl font-semibold uppercase text-secondary">Published ribbon images ({ribbons.length})</h2>
      {loading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : ribbons.length === 0 ? (
        <p className="text-sm text-muted-foreground">No ribbon images uploaded yet.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ribbons.map((r) => (
            <li key={r.id} className="flex items-start gap-3 rounded-md border bg-card p-4">
              {r.image_url ? (
                <Image src={r.image_url} alt={r.award_name} className="h-12 w-20 shrink-0 rounded border object-contain" fittingType="fit" />
              ) : <ImageIcon className="h-12 w-12 shrink-0 text-muted-foreground" />}
              <div className="flex-1">
                <div className="text-xs font-semibold uppercase tracking-wide text-primary">#{r.ribbon_no}</div>
                <div className="text-sm font-semibold text-secondary">{r.award_name}</div>
                <Button size="sm" variant="outline" className="mt-2" onClick={() => remove(r.id, r.ribbon_no)}><Trash2 className="mr-1 h-3.5 w-3.5" /> Remove</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 flex items-center gap-1 text-sm text-muted-foreground"><Check className="h-4 w-4 text-primary" /> Ribbon images show automatically on the Awards page once uploaded.</p>
    </Page>
  );
}