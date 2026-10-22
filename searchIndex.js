import { NAV } from "@/components/layout/nav";
import { allEOs } from "@/data/advancedGuidebook";
import { awards } from "@/data/awards";
import { allBoardQuestions } from "@/data/boardQuestions";
import { billets } from "@/data/billets";
import { faq } from "@/data/advice";
import { resources } from "@/data/resources";

let cache = null;

export function getIndex() {
  if (cache) return cache;
  const items = [];
  NAV.forEach((n) => items.push({ type: "Page", title: n.label, text: "", to: n.to }));
  allEOs.forEach((e) =>
    items.push({ type: "Objective", title: `PO ${e.po} EO ${e.eo}: ${e.title}`, text: `${e.sum} ${e.facts.flat().join(" ")} ${e.ref}`, to: `/guidebooks/advanced?po=${e.po}` })
  );
  awards.forEach((a) =>
    items.push({ type: "Award", title: a.name, text: `${a.eligibility} ${a.category} ${a.authority}`, to: `/awards?q=${encodeURIComponent(a.name)}` })
  );
  allBoardQuestions.forEach((q) =>
    items.push({ type: q.source === "original" ? "Board question" : "Supplemental question", title: q.text, text: q.topic, to: `/board?q=${q.id}` })
  );
  billets.forEach((b) =>
    items.push({ type: "Billet", title: b.name, text: `${b.overview} ${b.duties.join(" ")}`, to: `/billets?q=${encodeURIComponent(b.name)}` })
  );
  faq.forEach((f) => items.push({ type: "Advice", title: f.q, text: f.a, to: `/advice?q=${encodeURIComponent(f.q)}` }));
  resources.forEach((r) => items.push({ type: "Resource", title: r.title, text: r.desc, to: "/resources" }));
  cache = items.map((i) => ({ ...i, hay: `${i.title} ${i.text}`.toLowerCase() }));
  return cache;
}

export function searchAll(query) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return getIndex()
    .filter((i) => terms.every((t) => i.hay.includes(t)))
    .map((i) => ({ ...i, score: terms.reduce((s, t) => s + (i.title.toLowerCase().includes(t) ? 2 : 0), 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 30);
}