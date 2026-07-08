"use client";

import Link from "next/link";

type TestKey = "kompass" | "schloss";

const tests: { key: TestKey; href: string; badge: string; title: string; desc: string }[] = [
  {
    key: "kompass",
    href: "/kompass",
    badge: "Quiz",
    title: "Beziehungs-Kompass",
    desc: "7 Fragen · welches Beziehungsmuster ist gerade besonders sichtbar?",
  },
  {
    key: "schloss",
    href: "/schloss-spiel",
    badge: "Spiel",
    title: "Inneres Schloss",
    desc: "5 Räume · ein Entscheidungs-Abenteuer zu Energie & Authentizität.",
  },
];

export function SelbsttestSwitch({ active, variant = "light" }: { active: TestKey; variant?: "light" | "dark" }) {
  const dark = variant === "dark";
  return (
    <div className="mx-auto mb-12 grid max-w-3xl gap-4 sm:grid-cols-2">
      {tests.map((t) => {
        const isActive = t.key === active;
        const base = "group relative flex flex-col rounded-[1.75rem] border p-6 text-left transition-all";
        const theme = dark
          ? isActive
            ? "border-gold/60 bg-white/[0.07] shadow-[0_20px_60px_rgba(0,0,0,.4)]"
            : "border-gold/15 bg-white/[0.02] hover:border-gold/40 hover:bg-white/[0.05]"
          : isActive
            ? "border-gold/50 bg-white shadow-soft"
            : "border-gold/15 bg-white/60 hover:border-gold/35 hover:bg-white";
        return (
          <Link key={t.key} href={t.href} aria-current={isActive ? "page" : undefined} className={`${base} ${theme}`}>
            <div className="flex items-center justify-between">
              <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${dark ? "bg-gold/15 text-gold" : "bg-sand/50 text-deepGold"}`}>
                {t.badge}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? (dark ? "text-gold/70" : "text-softGold") : (dark ? "text-cream/40" : "text-deepGold/40")}`}>
                {isActive ? "Aktiv" : "Wechseln →"}
              </span>
            </div>
            <h3 className={`mt-5 text-xl font-bold ${dark ? "text-white" : "text-warmBlack"}`}>{t.title}</h3>
            <p className={`mt-2 text-sm leading-7 ${dark ? "text-cream/60" : "text-deepGold/70"}`}>{t.desc}</p>
            {isActive && (
              <span className={`pointer-events-none absolute inset-x-6 -bottom-px h-0.5 rounded-full ${dark ? "bg-gold/60" : "bg-deepGold/50"}`} />
            )}
          </Link>
        );
      })}
    </div>
  );
}
