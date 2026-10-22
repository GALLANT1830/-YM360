import { useEffect, useState } from "react";
import { Loader2, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";
import AdminGate from "@/components/admin/AdminGate";
import Notice from "@/components/common/Notice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Image } from "@/components/ui/image";
import { base44 } from "@/api/base44Client";
import { CONTENT_BLOCKS, HOME_SECTIONS } from "@/lib/siteContentDefs";

export default function AdminContent() {
  const [map, setMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [savedAt, setSavedAt] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const { items } = await base44.entities.SiteContent.filter({}, { limit: 200, sort: "order" });
      const m = {};
      items.forEach((it) => { m[it.key] = it; });
      setMap(m);
    } catch (e) { setErr(e.message); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const upsert = async (block, fields) => {
    const existing = map[block.key];
    const payload = {
      key: block.key,
      section: block.section,
      label: block.label,
      type: block.type,
      ...fields,
    };
    if (existing?.id) {
      await base44.entities.SiteContent.update(existing.id, payload);
    } else {
      await base44.entities.SiteContent.create(payload);
    }
  };

  const saveText = async (block, value) => {
    setBusy(true); setErr("");
    try { await upsert(block, { value }); await load(); setSavedAt(block.key); }
    catch (e) { setErr(e.message); } finally { setBusy(false); }
  };

  const uploadImage = async (block, file) => {
    if (!file) return;
    setBusy(true); setErr("");
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      await upsert(block, { image_url: file_url });
      await load();
    } catch (e) { setErr(e.message || "Upload failed"); } finally { setBusy(false); }
  };

  const toggleSection = async (s, enabled) => {
    setBusy(true); setErr("");
    try {
      const block = { key: `home_section_${s.key}`, section: "Home layout", label: s.label, type: "section" };
      await upsert(block, { enabled });
      await load();
    } catch (e) { setErr(e.message); } finally { setBusy(false); }
  };

  const moveSection = async (s, dir) => {
    const list = HOME_SECTIONS.map((x, i) => {
      const rec = map[`home_section_${x.key}`];
      return { key: x.key, order: rec?.order ?? i };
    });
    const idx = list.findIndex((x) => x.key === s.key);
    const swap = list[idx + dir];
    if (!swap) return;
    setBusy(true); setErr("");
    try {
      const a = { ...list[idx], order: swap.order };
      const b = { ...swap, order: list[idx].order };
      const updates = [];
      [a, b].forEach((x) => {
        const rec = map[`home_section_${x.key}`];
        if (rec?.id) updates.push({ id: rec.id, order: x.order });
      });
      if (updates.length) await base44.entities.SiteContent.bulkUpdate(updates);
      await load();
    } catch (e) { setErr(e.message); } finally { setBusy(false); }
  };

  const grouped = CONTENT_BLOCKS.reduce((acc, b) => {
    (acc[b.section] = acc[b.section] || []).push(b);
    return acc;
  }, {});

  return (
    <AdminGate kicker="Admin" title="Site content & photos" desc="Edit the copy and photos on the Home and About pages, and choose which dashboard sections appear on Home. Text and images are stored publicly — anyone with the link can open them.">
      {err && <Notice tone="warn" className="mb-4">{err}</Notice>}
      {loading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : (
        <>
          {Object.entries(grouped).map(([section, blocks]) => (
            <section key={section} className="mb-8 rounded-md border bg-card p-5">
              <h2 className="mb-3 text-xl font-semibold uppercase text-secondary">{section}</h2>
              <div className="space-y-4">
                {blocks.map((b) => {
                  const rec = map[b.key];
                  const val = b.type === "image" ? rec?.image_url || b.default : rec?.value ?? b.default;
                  return (
                    <div key={b.key}>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{b.label}
                        {b.type === "longtext" ? (
                          <Textarea className="mt-1" rows={3} defaultValue={val} key={rec?.id || "new"} onBlur={(e) => saveText(b, e.target.value)} />
                        ) : b.type === "image" ? (
                          <div className="mt-2 flex flex-wrap items-center gap-3">
                            <Image src={val} alt={b.label} fittingType="fit" className="h-24 w-24 rounded-md border object-contain" />
                            <Input type="file" accept="image/*" onChange={(e) => uploadImage(b, e.target.files?.[0])} />
                          </div>
                        ) : (
                          <Input className="mt-1" defaultValue={val} key={rec?.id || "new"} onBlur={(e) => saveText(b, e.target.value)} />
                        )}
                      </label>
                      {b.type !== "image" && savedAt === b.key && <span className="text-xs text-primary">Saved.</span>}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          <section className="mb-8 rounded-md border bg-card p-5">
            <h2 className="mb-1 text-xl font-semibold uppercase text-secondary">Home dashboard layout</h2>
            <p className="mb-3 text-sm text-muted-foreground">Toggle sections on or off, and reorder them. Changes appear on the Home page immediately.</p>
            <ul className="space-y-1">
              {HOME_SECTIONS.map((s, i) => {
                const rec = map[`home_section_${s.key}`];
                const enabled = rec ? rec.enabled !== false : true;
                return (
                  <li key={s.key} className="flex items-center gap-2 rounded-md border p-2">
                    <div className="flex flex-col">
                      <button onClick={() => moveSection(s, -1)} disabled={busy || i === 0} className="text-muted-foreground hover:text-foreground disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
                      <button onClick={() => moveSection(s, 1)} disabled={busy || i === HOME_SECTIONS.length - 1} className="text-muted-foreground hover:text-foreground disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
                    </div>
                    <span className="flex-1 font-medium text-secondary">{s.label}</span>
                    <Button size="sm" variant="outline" onClick={() => toggleSection(s, !enabled)} disabled={busy}>
                      {enabled ? <><EyeOff className="mr-1.5 h-3.5 w-3.5" />Hide</> : <><Eye className="mr-1.5 h-3.5 w-3.5" />Show</>}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </section>
        </>
      )}
      {busy && <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Saving…</div>}
    </AdminGate>
  );
}