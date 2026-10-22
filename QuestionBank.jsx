import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import NativeSelect from "@/components/common/NativeSelect";
import SourceBadge from "@/components/common/SourceBadge";
import Notice from "@/components/common/Notice";
import BoardCoach, { STATUSES } from "@/components/board/BoardCoach";
import { allBoardQuestions, boardTopics, LEVELS, getQuestion } from "@/data/boardQuestions";
import { KEYS, useStore } from "@/lib/storage";

export default function QuestionBank() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("all");
  const [topic, setTopic] = useState("all");
  const [source, setSource] = useState("all");
  const [statusF, setStatusF] = useState("all");
  const [statuses] = useStore(KEYS.boardStatus, {});
  const [openId, setOpenId] = useState(params.get("q"));

  useEffect(() => { setOpenId(params.get("q")); }, [params]);

  const list = useMemo(
    () =>
      allBoardQuestions.filter((x) => {
        if (level !== "all" && !x.levels.includes(level)) return false;
        if (topic !== "all" && x.topic !== topic) return false;
        if (source !== "all" && x.source !== source) return false;
        if (statusF !== "all" && (statuses[x.id] || "none") !== statusF) return false;
        if (q && !x.text.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [q, level, topic, source, statusF, statuses]
  );

  const open = openId ? getQuestion(openId) : null;
  const close = () => { setOpenId(null); if (params.get("q")) setParams({}); };

  return (
    <div>
      <Notice className="mb-5" title="One master question bank">
        Each question exists once and is tagged for the board levels where it may fit — adjust to what your board actually uses, since boards do not all follow the same procedure. Questions marked “User-recalled” were supplied by the site owner from their own preparation; they are not verified as official.
      </Notice>
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Search</label>
          <Search className="absolute left-3 top-[34px] h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} className="mt-1 h-10 pl-9" placeholder="Search questions" />
        </div>
        <NativeSelect label="Board level" value={level} onChange={setLevel} options={[{ value: "all", label: "All levels" }, ...LEVELS.map((l) => ({ value: l.id, label: l.label }))]} />
        <NativeSelect label="Topic" value={topic} onChange={setTopic} options={[{ value: "all", label: "All topics" }, ...boardTopics.map((t) => ({ value: t, label: t }))]} />
        <NativeSelect label="Origin" value={source} onChange={setSource} options={[{ value: "all", label: "All" }, { value: "original", label: "User-recalled (original)" }, { value: "supplemental", label: "Supplemental YM360" }]} />
        <NativeSelect label="Status" value={statusF} onChange={setStatusF} options={[{ value: "all", label: "Any status" }, { value: "none", label: "Not started" }, ...STATUSES.map((s) => ({ value: s.id, label: s.label }))]} />
      </div>
      <p className="mb-3 text-sm text-muted-foreground">{list.length} of {allBoardQuestions.length} questions</p>
      <ul className="space-y-2">
        {list.map((x) => (
          <li key={x.id}>
            <button onClick={() => setOpenId(x.id)} className="w-full rounded-md border bg-card p-4 text-left transition-colors hover:border-primary">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <span className="font-heading text-xs font-semibold tracking-widest text-muted-foreground">{x.id}</span>
                <SourceBadge type={x.source === "original" ? "recalled" : "supplemental"} />
                <span className="text-xs text-muted-foreground">{x.topic}</span>
                {statuses[x.id] && (
                  <span className="ml-auto rounded-sm bg-secondary px-2 py-0.5 text-[11px] font-semibold uppercase text-white">
                    {STATUSES.find((s) => s.id === statuses[x.id])?.label}
                  </span>
                )}
              </div>
              <div className="text-base font-medium">{x.text}</div>
            </button>
          </li>
        ))}
      </ul>
      <Dialog open={!!open} onOpenChange={(v) => !v && close()}>
        <DialogContent className="max-h-[92vh] w-[calc(100vw-1rem)] max-w-6xl overflow-y-auto">
          <DialogTitle className="sr-only">Board Coach</DialogTitle>
          <DialogDescription className="sr-only">Practice a board question and review coaching</DialogDescription>
          {open && <BoardCoach key={open.id} q={open} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}