import { useState } from "react";
import { Lock, ShieldCheck, Loader2, KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CODE = "SERVE360";
const STORAGE_KEY = "ym360_serve360_unlocked";

export function isServe360Unlocked() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export default function Serve360Gate({ children, label = "ALS resources & prep" }) {
  const [unlocked, setUnlocked] = useState(isServe360Unlocked);
  const [value, setValue] = useState("");
  const [err, setErr] = useState("");
  const [checking, setChecking] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setErr("");
    setChecking(true);
    // brief delay so the "verifying" state reads as a real check
    setTimeout(() => {
      if (value.trim().toUpperCase() === CODE) {
        try { sessionStorage.setItem(STORAGE_KEY, "true"); } catch {}
        setUnlocked(true);
      } else {
        setErr("That code is not correct. See your school director or unit staff for the ALS access code.");
      }
      setChecking(false);
    }, 500);
  };

  if (unlocked) {
    return (
      <div>
        <div className="mb-3 flex items-center gap-2 text-gold/80">
          <ShieldCheck className="h-4 w-4" />
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em]">ALS access verified for this session</span>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-lg border border-gold/30 bg-white/5 p-6 sm:p-8">
      <div className="flex items-center gap-3 text-gold">
        <Lock className="h-6 w-6" />
        <h2 className="text-2xl font-bold uppercase tracking-wide text-white">ALS access required</h2>
      </div>
      <p className="mt-3 max-w-xl text-sm text-white/70">
        {label} are reserved for Advanced Leadership School graduates. Enter the ALS verification code to unlock this section for this browser session.
      </p>
      <form onSubmit={submit} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex-1 text-xs font-semibold uppercase tracking-wide text-white/50">
          Verification code
          <div className="relative mt-1">
            <KeyRound className="absolute left-3 top-3 h-4 w-4 text-white/40" />
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter code"
              autoComplete="off"
              className="border-white/30 bg-white/5 pl-9 text-white placeholder:text-white/30"
            />
          </div>
        </label>
        <Button type="submit" disabled={checking} className="bg-gold text-charcoal hover:bg-gold/90">
          {checking ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
          {checking ? "Verifying…" : "Unlock"}
        </Button>
      </form>
      {err && <p className="mt-3 text-sm text-red-300">{err}</p>}
      <p className="mt-4 text-xs text-white/40">
        Don't have the code? Advanced Leadership School graduates receive it from their school director or unit staff.
      </p>
    </div>
  );
}