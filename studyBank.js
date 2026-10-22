import { allEOs } from "@/data/advancedGuidebook";
import { awards } from "@/data/awards";
import { shuffle } from "@/lib/storage";

const RIBBON_CATS = ["Personal", "Achievement", "Service", "Qualification"];
const ribbons = awards.filter((a) => RIBBON_CATS.includes(a.category));
const authorities = [...new Set(ribbons.map((a) => a.authority))];

export function buildQuestions() {
  const out = [];
  allEOs.forEach((e) =>
    e.qs.forEach((q, i) =>
      out.push({ ...q, id: `${e.id}-Q${i + 1}`, src: "advanced", topic: `PO ${e.po}: ${e.poTitle}`, ref: e.ref })
    )
  );
  ribbons.forEach((a) => {
    const opts = shuffle([a.authority, ...shuffle(authorities.filter((x) => x !== a.authority)).slice(0, 3)]);
    out.push({
      t: "mc", q: `Who is the lowest issuing authority for the ${a.name}?`, o: opts, a: opts.indexOf(a.authority),
      x: `Awards Manual p. ${a.pg}.`, id: `${a.id}-Q1`, src: "awards", topic: `Awards: ${a.category}`, ref: `Awards Manual p. ${a.pg}`,
    });
  });
  return out;
}

export function buildCards() {
  const out = [];
  allEOs.forEach((e) =>
    e.facts.forEach(([front, back], i) =>
      out.push({ id: `${e.id}-F${i + 1}`, front, back, deck: "advanced", topic: `PO ${e.po}: ${e.poTitle}`, ref: e.ref })
    )
  );
  ribbons.forEach((a) => {
    out.push({ id: `${a.id}-C1`, front: `Who is the lowest issuing authority for the ${a.name}?`, back: a.authority, deck: "awards", topic: `Awards: ${a.category}`, ref: `Awards Manual p. ${a.pg}` });
    out.push({ id: `${a.id}-C2`, front: `${a.name}: order of precedence and ribbon number?`, back: `${a.prec} · #${a.no}`, deck: "awards", topic: `Awards: ${a.category}`, ref: `Awards Manual p. ${a.pg}` });
  });
  return out;
}

export const DECKS = [
  { id: "all", label: "All decks" },
  { id: "advanced", label: "Advanced Guidebook" },
  { id: "awards", label: "Awards Manual" },
];