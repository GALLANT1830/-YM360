import { useState, useCallback, useRef, useEffect } from "react";

export const KEYS = {
  stage: "ym360.stage",
  journey: "ym360.journey",
  goals: "ym360.goals",
  quizHistory: "ym360.quizHistory",
  qStats: "ym360.qStats",
  cards: "ym360.cards",
  boardStatus: "ym360.boardStatus",
  boardAnswers: "ym360.boardAnswers",
  boardChecks: "ym360.boardChecks",
  saved: "ym360.savedResources",
  advice: "ym360.veteranAdvice",
  activity: "ym360.activity",
  schoolChecks: "ym360.schoolChecks",
  customBillets: "ym360.customBillets",
  aars: "ym360.aars",
  eventChecks: "ym360.eventChecks",
  eoStatus: "ym360.eoStatus",
};

export function readStore(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("ym360-store", { detail: key }));
}

export function useStore(key, initial) {
  const [value, setValue] = useState(() => readStore(key, initial));
  const ref = useRef(value);
  const set = useCallback(
    (update) => {
      const next = typeof update === "function" ? update(ref.current) : update;
      ref.current = next;
      setValue(next);
      writeStore(key, next);
    },
    [key]
  );
  useEffect(() => {
    const handler = (e) => {
      if (e.detail !== key) return;
      const v = readStore(key, initial);
      ref.current = v;
      setValue(v);
    };
    window.addEventListener("ym360-store", handler);
    return () => window.removeEventListener("ym360-store", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return [value, set];
}

export function logActivity(text) {
  const list = readStore(KEYS.activity, []);
  writeStore(KEYS.activity, [{ text, at: new Date().toISOString() }, ...list].slice(0, 40));
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}