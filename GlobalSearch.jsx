import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { searchAll } from "@/lib/searchIndex";

export default function GlobalSearch({ open, onOpenChange }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const results = useMemo(() => searchAll(q), [q]);

  const go = (to) => {
    onOpenChange(false);
    setQ("");
    navigate(to);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[10%] max-h-[80vh] translate-y-0 gap-3 overflow-hidden sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Search YM360</DialogTitle>
          <DialogDescription>Objectives, awards, board questions, billets, advice and resources.</DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try “retention”, “Good Conduct” or “counseling”" className="h-11 pl-9" />
        </div>
        <ul className="max-h-[50vh] space-y-1 overflow-y-auto">
          {q && results.length === 0 && <li className="p-3 text-sm text-muted-foreground">No results found.</li>}
          {results.map((r, i) => (
            <li key={`${r.to}-${i}`}>
              <button onClick={() => go(r.to)} className="w-full rounded-md p-3 text-left hover:bg-muted">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="shrink-0 text-[11px]">{r.type}</Badge>
                  <span className="line-clamp-2 text-sm font-semibold">{r.title}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}