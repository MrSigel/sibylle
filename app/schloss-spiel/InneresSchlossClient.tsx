"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import { supabase } from "@/lib/sibylle/supabase";
import { notifyLead } from "@/lib/sibylle/notify";
import { SelbsttestSwitch } from "@/components/sibylle/SelbsttestSwitch";

const ease = [0.22, 1, 0.36, 1] as const;

type Phase = "portal" | "warping" | "playing" | "gate" | "done";

type Choice = {
  label: string;
  text: string;
  energy: number;
  authenticity: number;
};

type Scene = {
  room: string;
  title: string;
  text: string;
  choices: Choice[];
};

const scenes: Scene[] = [
  {
    room: "Spiegelkeller",
    title: "Ein alter Satz sieht dich an.",
    text: "Im Spiegel steht nicht dein Gesicht, sondern eine Erwartung: Sei angenehm. Sei stark. Sei nicht zu viel.",
    choices: [
      { label: "Anpassen", text: "Ich lächle und mache es den anderen leichter.", energy: -18, authenticity: -16 },
      { label: "Atmen", text: "Ich bleibe kurz stehen und spüre, was wirklich in mir ist.", energy: -4, authenticity: 14 },
      { label: "Aussprechen", text: "Ich sage ruhig, was für mich gerade nicht stimmt.", energy: 6, authenticity: 18 },
    ],
  },
  {
    room: "Brücke der Erwartungen",
    title: "Auf der Brücke warten viele Stimmen.",
    text: "Jede Stimme trägt einen Wunsch an dich heran. Manche klingen vertraut, manche gehören längst nicht mehr zu dir.",
    choices: [
      { label: "Alles tragen", text: "Ich nehme die Erwartungen mit, damit niemand enttäuscht ist.", energy: -22, authenticity: -12 },
      { label: "Sortieren", text: "Ich prüfe, welche Erwartung wirklich zu meinem Weg gehört.", energy: -2, authenticity: 12 },
      { label: "Ablegen", text: "Ich lege eine fremde Last bewusst an den Rand der Brücke.", energy: 12, authenticity: 16 },
    ],
  },
  {
    room: "Saal der alten Rollen",
    title: "Ein Platz ist für dich reserviert.",
    text: "Der Stuhl trägt deinen Namen, aber die Rolle darauf fühlt sich älter an als dein heutiges Leben.",
    choices: [
      { label: "Hinsetzen", text: "Ich setze mich hinein, weil ich diese Rolle kenne.", energy: -16, authenticity: -18 },
      { label: "Betrachten", text: "Ich sehe die Rolle an, ohne sie sofort wieder zu übernehmen.", energy: 2, authenticity: 14 },
      { label: "Neu wählen", text: "Ich stelle den Stuhl an einen neuen Platz und nehme Raum ein.", energy: 8, authenticity: 20 },
    ],
  },
  {
    room: "Turm der Kontrolle",
    title: "Von oben wirkt alles überschaubar.",
    text: "Der Turm schenkt Abstand. Doch unten im Hof wartet eine Begegnung, die nicht vollständig planbar ist.",
    choices: [
      { label: "Oben bleiben", text: "Ich analysiere weiter, bis ich mich ganz sicher fühle.", energy: -10, authenticity: -10 },
      { label: "Langsam steigen", text: "Ich gehe eine Stufe nach unten und bleibe achtsam.", energy: 0, authenticity: 12 },
      { label: "Kontakt wagen", text: "Ich betrete den Hof und spreche aus, was lebendig ist.", energy: 6, authenticity: 18 },
    ],
  },
  {
    room: "Innerer Garten",
    title: "Ein stiller Garten öffnet sich.",
    text: "Hier geht es nicht um richtig oder falsch. Nur darum, ob deine Kraft bei dir bleiben darf.",
    choices: [
      { label: "Funktionieren", text: "Ich gehe weiter wie bisher und hoffe, dass es leichter wird.", energy: -14, authenticity: -14 },
      { label: "Innehalten", text: "Ich erkenne mein Muster und nehme mir einen kleinen nächsten Schritt.", energy: 8, authenticity: 14 },
      { label: "Klar wählen", text: "Ich entscheide mich für einen Umgang, der mich nicht verlässt.", energy: 14, authenticity: 20 },
    ],
  },
];

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

function getResultType(energy: number, authenticity: number) {
  if (energy >= 75 && authenticity >= 75) return "Der klare Schlossgarten";
  if (energy < 45 && authenticity >= 70) return "Die wahre, erschöpfte Hüterin";
  if (energy >= 65 && authenticity < 55) return "Die funktionierende Burgmauer";
  if (energy < 50 && authenticity < 50) return "Das übernommene Schattenzimmer";
  return "Der Übergangsraum der Neuordnung";
}

function isValidEmail(value: string) {
  if (!value.trim()) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && /^[+0-9\s()./-]+$/.test(value.trim());
}

function scoreText(score: { energy: number; authenticity: number } | null | undefined) {
  if (!score) return "-";
  return `${score.energy}% Energie / ${score.authenticity}% Authentizität`;
}

export function InneresSchlossClient() {
  const [phase, setPhase] = useState<Phase>("portal");
  const [step, setStep] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [authenticity, setAuthenticity] = useState(100);
  const [selected, setSelected] = useState<number | null>(null);
  const [warpTo, setWarpTo] = useState("");
  const [lead, setLead] = useState({ vorname: "", email: "", telefonnummer: "", consent: false });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const scene = scenes[step];
  const resultType = useMemo(() => getResultType(energy, authenticity), [energy, authenticity]);
  const progress = ((step + 1) / scenes.length) * 100;
  const showHud = phase === "playing" || phase === "gate";

  function enterPortal() {
    setWarpTo(scenes[0].room);
    setPhase("warping");
    setTimeout(() => setPhase("playing"), 1150);
  }

  function choose(choice: Choice, index: number) {
    if (selected !== null || phase !== "playing") return;
    setSelected(index);
    setEnergy((value) => clamp(value + choice.energy));
    setAuthenticity((value) => clamp(value + choice.authenticity));

    const last = step === scenes.length - 1;
    setTimeout(() => {
      setSelected(null);
      setWarpTo(last ? "Deine Auswertung" : scenes[step + 1].room);
      setPhase("warping");
      setTimeout(() => {
        if (last) {
          setPhase("gate");
        } else {
          setStep((current) => current + 1);
          setPhase("playing");
        }
      }, 1150);
    }, 420);
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const email = lead.email.trim();
    const phone = lead.telefonnummer.trim();
    const hasValidEmail = isValidEmail(email);
    const hasValidPhone = isValidPhone(phone);

    if (!hasValidEmail && !hasValidPhone) {
      setError("Bitte gib eine gültige E-Mail-Adresse oder eine WhatsApp-Mobilnummer ein.");
      return;
    }

    if (!lead.consent) {
      setError("Bitte bestätige die Einwilligung, damit wir dir deine Auswertung zusenden dürfen.");
      return;
    }

    setSaving(true);
    const { error: insertError } = await supabase.from("selbsttests").insert([{
      vorname: lead.vorname.trim(),
      email: hasValidEmail ? email : null,
      telefonnummer: hasValidPhone ? phone : null,
      ergebnis_score: { energy, authenticity },
      ergebnis_typ: resultType,
    }]);
    setSaving(false);

    if (insertError) {
      console.error(insertError);
      setError("Deine Daten konnten gerade nicht gespeichert werden. Bitte versuche es erneut.");
      return;
    }

    notifyLead(
      "selbsttest",
      [
        { label: "Selbsttest", value: "Inneres Schloss" },
        { label: "Vorname", value: lead.vorname.trim() },
        { label: "E-Mail", value: hasValidEmail ? email : "-" },
        { label: "WhatsApp", value: hasValidPhone ? phone : "-" },
        { label: "Ergebnis", value: resultType },
      ],
      hasValidEmail ? email : undefined,
    );
    setPhase("done");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#100f0d] px-4 py-16 text-cream md:py-24">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(183,138,74,0.18),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(232,211,174,0.12),transparent_28%),linear-gradient(180deg,rgba(16,15,13,0),#100f0d_72%)]" />
      <div className="container relative max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mx-auto inline-flex rounded-full border border-gold/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.32em] text-gold/80">
            Selbsttest Mini-Spiel
          </p>
          <h1 className="editorial mt-6 text-[clamp(3.2rem,8vw,7rem)] leading-[.86] text-white">Inneres Schloss</h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-cream/68 md:text-lg">
            Ein ruhiges Entscheidungs-Abenteuer durch fünf innere Räume. Deine Werte zeigen, wie viel Energie und Authentizität im Moment bei dir bleiben.
          </p>
        </div>

        <SelbsttestSwitch active="schloss" variant="dark" />

        <section className="relative mx-auto overflow-hidden rounded-[2rem] border border-gold/20 bg-[#181612]/90 shadow-2xl backdrop-blur">
          <div className="h-2 bg-white/5">
            <motion.div className="h-full bg-gold" initial={false} animate={{ width: `${showHud ? progress : phase === "done" ? 100 : 0}%` }} transition={{ duration: 0.5 }} />
          </div>

          <div className={showHud ? "grid gap-0 lg:grid-cols-[320px_1fr]" : ""}>
            {showHud && (
              <aside className="border-b border-gold/10 bg-black/20 p-6 lg:border-b-0 lg:border-r">
                <div className="grid gap-4">
                  <Meter label="Energie" value={energy} />
                  <Meter label="Authentizität" value={authenticity} />
                </div>
                <div className="mt-8 rounded-3xl border border-gold/10 bg-white/[0.03] p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold/60">Aktueller Raum</p>
                  <p className="mt-2 text-xl font-bold text-white">{phase === "gate" ? "Innerer Garten" : scene.room}</p>
                  <p className="mt-3 text-sm leading-7 text-cream/55">Coaching und Selbsterfahrung, aufmerksam und ohne Heilversprechen.</p>
                </div>
              </aside>
            )}

            <div className="relative min-h-[560px] p-6 md:p-10">
              <AnimatePresence mode="wait">
                {phase === "portal" && (
                  <motion.div
                    key="portal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                    className="flex min-h-[520px] flex-col items-center justify-center text-center"
                  >
                    <div className="relative mb-10 h-52 w-52">
                      <motion.div className="absolute inset-0 rounded-full border border-gold/40" animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }} />
                      <motion.div className="absolute inset-3 rounded-full border border-dashed border-gold/25" animate={{ rotate: -360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
                      <motion.div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(232,211,174,.45),transparent_70%)] blur-md" animate={{ opacity: [0.45, 0.95, 0.45], scale: [0.9, 1.08, 0.9] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image src="/assets/sibylle/brand/monogram-cream.png" alt="" width={618} height={799} className="h-16 w-auto opacity-90" />
                      </div>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-gold/70">Betritt dein inneres Schloss</p>
                    <h2 className="editorial mt-5 text-4xl leading-tight text-white md:text-5xl">Fünf Räume. Ein Weg zu dir.</h2>
                    <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-cream/60 md:text-base">
                      Triff in jedem Raum eine ehrliche Entscheidung. Zwischen den Räumen reist du durch das Portal. Am Ende siehst du, wie viel Kraft bei dir bleibt.
                    </p>
                    <motion.button
                      onClick={enterPortal}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6, ease }}
                      whileHover={{ y: -2, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-9 rounded-full bg-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-[#100f0d] shadow-[0_10px_40px_rgba(232,211,174,.25)] transition hover:bg-cream"
                    >
                      Portal betreten
                    </motion.button>
                  </motion.div>
                )}

                {phase === "playing" && (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 0.72, filter: "blur(14px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.22, filter: "blur(10px)" }}
                    transition={{ duration: 0.55, ease }}
                    className="flex min-h-[500px] flex-col justify-center"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold/70">Raum {step + 1} / {scenes.length} · {scene.room}</p>
                    <h2 className="mt-5 text-3xl font-bold leading-tight text-white md:text-5xl">{scene.title}</h2>
                    <p className="mt-6 max-w-2xl text-base leading-8 text-cream/64 md:text-lg">{scene.text}</p>

                    <div className="mt-10 grid gap-4">
                      {scene.choices.map((choice, index) => (
                        <motion.button
                          key={choice.label}
                          type="button"
                          onClick={() => choose(choice, index)}
                          whileHover={{ x: 5 }}
                          className={`group rounded-3xl border p-5 text-left transition-all ${
                            selected === index
                              ? "border-gold/70 bg-gold/15 text-white shadow-soft"
                              : "border-gold/15 bg-white/[0.035] text-cream/75 hover:border-gold/40 hover:bg-white/[0.06]"
                          }`}
                        >
                          <span className="block text-xs font-bold uppercase tracking-widest text-gold/70">{choice.label}</span>
                          <span className="mt-2 block leading-7">{choice.text}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {phase === "gate" && (
                  <motion.form
                    key="gate"
                    onSubmit={submitLead}
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.55, ease }}
                    className="mx-auto flex min-h-[500px] max-w-2xl flex-col justify-center"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold/70">Dein Ergebnis ist bereit</p>
                    <h2 className="mt-5 text-3xl font-bold text-white md:text-5xl">{resultType}</h2>
                    <p className="mt-5 rounded-3xl border border-gold/15 bg-white/[0.04] p-5 text-cream/70">
                      {scoreText({ energy, authenticity })}
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      <Field label="Vorname" value={lead.vorname} required onChange={(value) => setLead({ ...lead, vorname: value })} />
                      <Field label="E-Mail" type="email" value={lead.email} onChange={(value) => setLead({ ...lead, email: value })} />
                      <Field label="WhatsApp-Mobilnummer" value={lead.telefonnummer} onChange={(value) => setLead({ ...lead, telefonnummer: value })} className="sm:col-span-2" />
                    </div>

                    <label className="mt-5 flex gap-3 rounded-3xl border border-gold/15 bg-white/[0.035] p-4 text-sm leading-7 text-cream/64">
                      <input required type="checkbox" checked={lead.consent} onChange={(event) => setLead({ ...lead, consent: event.target.checked })} className="mt-1 h-4 w-4 accent-gold" />
                      <span>Ich willige ein, dass Sibylle Bergold mir meine persönliche Auswertung sowie anschließende Impulse zu Coaching-Themen per E-Mail oder WhatsApp zusendet. Diese Einwilligung kann ich jederzeit widerrufen.</span>
                    </label>

                    {error && <p className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p>}

                    <button type="submit" disabled={saving} className="mt-6 rounded-full bg-gold px-8 py-4 font-bold text-[#100f0d] shadow-soft transition hover:bg-cream disabled:opacity-50">
                      {saving ? "Wird gesendet…" : "Auswertung erhalten"}
                    </button>
                  </motion.form>
                )}

                {phase === "done" && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease }}
                    className="mx-auto flex min-h-[500px] max-w-2xl flex-col items-center justify-center text-center"
                  >
                    <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-3xl text-gold">✓</div>
                    <h2 className="text-3xl font-bold text-white md:text-5xl">Vielen Dank!</h2>
                    <p className="mt-6 text-lg leading-8 text-cream/70">
                      Sibylle wurde direkt benachrichtigt und meldet sich zeitnah persönlich bei dir mit deinem Zustands-Bericht.
                    </p>
                    <motion.a whileHover={{ y: -3 }} href="/#termine" className="mt-9 inline-flex rounded-full bg-gold px-8 py-4 font-bold text-[#100f0d] shadow-soft transition hover:bg-cream">
                      Jetzt kostenfreies Erstgespräch buchen
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Warp / teleporter transition */}
              <AnimatePresence>
                {phase === "warping" && <WarpTunnel target={warpTo} />}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function WarpTunnel({ target }: { target: string }) {
  const streaks = Array.from({ length: 28 });
  return (
    <motion.div
      key="warp"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-40 flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 1.15, ease: "easeIn" }}
      >
        {streaks.map((_, i) => {
          const angle = (i / streaks.length) * 360;
          return (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 h-[2px] w-[52%] origin-left"
              style={{ rotate: `${angle}deg`, background: "linear-gradient(90deg, rgba(232,211,174,0) 0%, rgba(232,211,174,.15) 55%, rgba(255,255,255,.85) 100%)" }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1.5], opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: (i % 7) * 0.09, ease: "easeIn" }}
            />
          );
        })}
      </motion.div>

      <motion.div
        className="relative h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.95),rgba(232,211,174,.55),transparent_72%)]"
        initial={{ scale: 0.5, opacity: 0.6 }}
        animate={{ scale: [0.5, 1.4, 22], opacity: [0.6, 1, 0] }}
        transition={{ duration: 1.15, times: [0, 0.55, 1], ease: "easeIn" }}
      />

      <motion.p
        className="absolute bottom-12 text-center text-xs font-bold uppercase tracking-[0.4em] text-gold/80"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 1, 1, 0], y: 0 }}
        transition={{ duration: 1.15, times: [0, 0.25, 0.7, 1] }}
      >
        Du erreichst<br />
        <span className="mt-2 block text-base tracking-[0.2em] text-white">{target}</span>
      </motion.p>
    </motion.div>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-gold/10 bg-white/[0.035] p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-gold/60">{label}</span>
        <motion.span key={value} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="font-bold text-white">
          {value}%
        </motion.span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full rounded-full bg-gold" animate={{ width: `${value}%` }} transition={{ duration: 0.45 }} />
      </div>
    </div>
  );
}

function Field({ label, value, onChange, required, type = "text", className = "" }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-xs font-bold uppercase tracking-widest text-gold/60">{label}</label>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-gold/15 bg-black/20 px-4 py-3 text-cream outline-none transition focus:border-gold/50 focus:bg-black/30"
      />
    </div>
  );
}
