"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/sibylle/supabase";
import { notifyLead } from "@/lib/sibylle/notify";
import { SelbsttestSwitch } from "@/components/sibylle/SelbsttestSwitch";

type CompassType = "A" | "B" | "C" | "D";

type Answer = {
  type: CompassType;
  text: string;
};

type Question = {
  eyebrow: string;
  question: string;
  answers: Answer[];
};

const ease = [0.22, 1, 0.36, 1] as const;

const resultLabels: Record<CompassType, string> = {
  A: "Der harmonisierende Fels",
  B: "Der freiheitsliebende Satellit",
  C: "Der feinfühlige Seismograph",
  D: "Der analytische Beobachter",
};

const resultDescriptions: Record<CompassType, string> = {
  A: "Du hältst Beziehung oft durch Ruhe, Loyalität und Verlässlichkeit zusammen. Dein Wachstum beginnt dort, wo Harmonie nicht mehr bedeutet, dich selbst zu übergehen.",
  B: "Du brauchst Nähe, aber auch viel inneren Raum. Dein Muster zeigt sich dort, wo Freiheit zum Schutz wird und echte Verbindung vorsichtig dosiert bleibt.",
  C: "Du nimmst Zwischentöne früh wahr und spürst Stimmungen intensiv. Dein Beziehungskompass reagiert fein, manchmal schneller als dein Verstand sortieren kann.",
  D: "Du verstehst Beziehungen gern über Klarheit, Abstand und Analyse. Dein Muster zeigt sich dort, wo Denken schützt, bevor Gefühl wirklich berührt werden darf.",
};

const questions: Question[] = [
  {
    eyebrow: "Nähe",
    question: "Was passiert in dir, wenn dir ein Mensch emotional sehr nah kommt?",
    answers: [
      { type: "A", text: "Ich werde ruhig und versuche, die Verbindung stabil zu halten." },
      { type: "B", text: "Ich brauche schnell wieder Raum, um mich nicht eingeengt zu fühlen." },
      { type: "C", text: "Ich spüre sehr viel und achte sofort auf jedes kleine Signal." },
      { type: "D", text: "Ich beobachte erst einmal, ob diese Nähe wirklich sicher ist." },
    ],
  },
  {
    eyebrow: "Konflikt",
    question: "Wie reagierst du, wenn in einer Beziehung Spannung entsteht?",
    answers: [
      { type: "A", text: "Ich versuche zu vermitteln und Frieden herzustellen." },
      { type: "B", text: "Ich ziehe mich zurück, bis ich wieder freier atmen kann." },
      { type: "C", text: "Ich fühle die Spannung sofort körperlich und werde innerlich unruhig." },
      { type: "D", text: "Ich analysiere, was passiert ist, bevor ich emotional reagiere." },
    ],
  },
  {
    eyebrow: "Tie-Breaker",
    question: "Welcher Satz beschreibt dein Beziehungsmuster am ehesten?",
    answers: [
      { type: "A", text: "Ich bleibe oft länger, als es mir eigentlich guttut." },
      { type: "B", text: "Ich gehe innerlich auf Abstand, wenn Erwartungen zu groß werden." },
      { type: "C", text: "Ich spüre sofort, wenn sich etwas zwischen uns verändert." },
      { type: "D", text: "Ich möchte erst verstehen, bevor ich mich ganz einlasse." },
    ],
  },
  {
    eyebrow: "Bindung",
    question: "Was ist in Beziehungen deine größte innere Anstrengung?",
    answers: [
      { type: "A", text: "Nicht für alles verantwortlich zu sein." },
      { type: "B", text: "Mich einzulassen, ohne mich selbst zu verlieren." },
      { type: "C", text: "Mich nicht von jeder Stimmung erfassen zu lassen." },
      { type: "D", text: "Gefühle zuzulassen, bevor alles logisch sortiert ist." },
    ],
  },
  {
    eyebrow: "Herkunft",
    question: "Welche Rolle kennst du aus deinem Familiensystem besonders gut?",
    answers: [
      { type: "A", text: "Die Person, die zusammenhält und ausgleicht." },
      { type: "B", text: "Die Person, die unabhängig bleiben musste." },
      { type: "C", text: "Die Person, die viel gespürt hat, auch wenn wenig gesagt wurde." },
      { type: "D", text: "Die Person, die beobachtet und verstanden hat." },
    ],
  },
  {
    eyebrow: "Schutz",
    question: "Was schützt dich am meisten, wenn Beziehung unsicher wird?",
    answers: [
      { type: "A", text: "Verlässlichkeit, Geduld und Durchhalten." },
      { type: "B", text: "Abstand, Bewegung und Selbstbestimmung." },
      { type: "C", text: "Feine Wahrnehmung und frühes Erkennen von Veränderung." },
      { type: "D", text: "Klarheit, Struktur und ein innerer Überblick." },
    ],
  },
  {
    eyebrow: "Wunsch",
    question: "Was wünschst du dir in Beziehung am meisten?",
    answers: [
      { type: "A", text: "Frieden, Sicherheit und ein gemeinsames Zuhause-Gefühl." },
      { type: "B", text: "Nähe, die meine Freiheit respektiert." },
      { type: "C", text: "Feinfühlige Verbindung, in der ich nicht zu viel bin." },
      { type: "D", text: "Ehrliche Klarheit, die Vertrauen entstehen lässt." },
    ],
  },
];

function getResult(answers: CompassType[]) {
  const counts = answers.reduce<Record<CompassType, number>>((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, { A: 0, B: 0, C: 0, D: 0 });
  const max = Math.max(...Object.values(counts));
  const winners = (Object.keys(counts) as CompassType[]).filter((type) => counts[type] === max);
  if (winners.length === 1) return winners[0];
  return answers[2] && winners.includes(answers[2]) ? answers[2] : winners[0];
}

function progressText(index: number) {
  const percent = Math.round((index / questions.length) * 100);
  if (percent < 30) return "Dein Muster wird sichtbar";
  if (percent < 60) return "Schon über die Hälfte";
  if (percent < 90) return "Die Dynamik wird klarer";
  return "Fast geschafft";
}

type Phase = "cover" | "questions" | "loading" | "gate" | "done";

export function BeziehungsKompassClient() {
  const [phase, setPhase] = useState<Phase>("cover");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<CompassType[]>([]);
  const [selected, setSelected] = useState<CompassType | null>(null);
  const [lead, setLead] = useState({ vorname: "", telefonnummer: "", consent: false });
  const [saving, setSaving] = useState(false);

  const resultType = useMemo(() => getResult(answers), [answers]);
  const question = questions[step];
  const inQuestions = phase === "cover" || phase === "questions";
  const progress = inQuestions ? ((step + 1) / questions.length) * 100 : 100;

  function chooseAnswer(type: CompassType) {
    if (selected) return;
    setSelected(type);
    const nextAnswers = [...answers, type];
    setTimeout(() => {
      setAnswers(nextAnswers);
      setSelected(null);
      if (step === questions.length - 1) {
        setPhase("loading");
        setTimeout(() => setPhase("gate"), 2000);
      } else {
        setStep((current) => current + 1);
      }
    }, 320);
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    if (!lead.consent) return;
    setSaving(true);
    const type = getResult(answers);
    const { error } = await supabase.from("selbsttests").insert([{
      vorname: lead.vorname.trim(),
      telefonnummer: lead.telefonnummer.trim(),
      ergebnis_typ: resultLabels[type],
    }]);
    setSaving(false);
    if (error) {
      alert("Deine Daten konnten gerade nicht gespeichert werden. Bitte versuche es erneut.");
      return;
    }
    notifyLead("selbsttest", [
      { label: "Selbsttest", value: "Beziehungs-Kompass" },
      { label: "Vorname", value: lead.vorname.trim() },
      { label: "WhatsApp", value: lead.telefonnummer.trim() },
      { label: "Ergebnis", value: resultLabels[type] },
    ]);
    setPhase("done");
  }

  return (
    <main className="grain relative min-h-screen overflow-hidden bg-cream px-4 py-16 text-warmBlack md:py-24">
      <div className="pointer-events-none absolute -left-40 top-20 h-[40rem] w-[40rem] rounded-full bg-sand/30 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[34rem] w-[34rem] rounded-full bg-softGold/10 blur-[120px]" />

      <div className="container relative z-10 max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <p className="eyebrow mx-auto">Selbsttest Beziehungsmuster</p>
          <h1 className="editorial mt-6 text-[clamp(3rem,7vw,6.5rem)] leading-[.9]">Dein Beziehungs-Kompass</h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-deepGold/75 md:text-lg">
            Sieben ruhige Fragen zeigen dir, welches Beziehungsmuster gerade besonders sichtbar ist. Die Auswertung ist Coaching und Selbsterfahrung, ohne Heilversprechen.
          </p>
        </div>

        <SelbsttestSwitch active="kompass" />

        {/* Book */}
        <div className="relative mx-auto w-full max-w-5xl [perspective:2400px]">
          <div className="absolute inset-x-10 -bottom-2 h-12 rounded-[50%] bg-warmBlack/20 blur-2xl" />

          {/* Two-page spread */}
          <div className="relative grid min-h-[600px] overflow-hidden rounded-[2rem] border border-gold/20 bg-cream shadow-[0_45px_130px_rgba(35,42,26,.28)] md:grid-cols-2">
            {/* top progress line */}
            <div className="absolute inset-x-0 top-0 z-20 h-1.5 bg-mist/40 md:col-span-2">
              <motion.div className="h-full bg-deepGold" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.55, ease }} />
            </div>

            {/* LEFT PAGE */}
            <div className="relative hidden flex-col justify-between border-r border-gold/15 bg-gradient-to-br from-sand/25 to-cream p-10 md:flex lg:p-14">
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-warmBlack/10 to-transparent" />
              {(phase === "cover" || phase === "questions" || phase === "loading") && (
                <>
                  <div>
                    <p className="eyebrow">Beziehungs-Kompass</p>
                    <p className="mt-12 text-xs font-bold uppercase tracking-[0.3em] text-softGold">{question.eyebrow}</p>
                    <div className="editorial mt-2 text-[7.5rem] leading-none text-deepGold/15">0{step + 1}</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-deepGold/50">
                      <span>Frage {step + 1} von {questions.length}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-mist/40">
                      <motion.div className="h-full rounded-full bg-gradient-to-r from-softGold to-deepGold" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.55, ease }} />
                    </div>
                    <p className="mt-6 text-sm leading-7 text-deepGold/60">{progressText(step + 1)} · wähle spontan, dein erster Impuls zählt.</p>
                  </div>
                </>
              )}
              {phase === "gate" && (
                <div className="flex h-full flex-col justify-center">
                  <p className="eyebrow">Dein vorläufiges Muster</p>
                  <h2 className="editorial mt-5 text-4xl leading-tight text-warmBlack lg:text-5xl">{resultLabels[resultType]}</h2>
                  <p className="mt-6 leading-8 text-deepGold/75">{resultDescriptions[resultType]}</p>
                </div>
              )}
              {phase === "done" && (
                <div className="flex h-full flex-col justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-deepGold text-2xl text-cream">✓</div>
                  <h2 className="editorial mt-8 text-4xl leading-tight text-warmBlack lg:text-5xl">Dein Kompass ist unterwegs.</h2>
                  <p className="mt-6 leading-8 text-deepGold/75">Dein Muster: <span className="font-semibold text-deepGold">{resultLabels[resultType]}</span></p>
                </div>
              )}
            </div>

            {/* RIGHT PAGE */}
            <div className="relative flex flex-col bg-gradient-to-bl from-white to-cream p-8 [perspective:1600px] md:p-12 lg:p-14">
              <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-warmBlack/10 to-transparent md:block" />

              {/* mobile progress */}
              {inQuestions && (
                <div className="mb-6 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-deepGold/50 md:hidden">
                  <span>{question.eyebrow}</span>
                  <span>Frage {step + 1} / {questions.length}</span>
                </div>
              )}

              {(phase === "cover" || phase === "questions") && (
                <div className="relative flex-1 [perspective:1600px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={step}
                      initial={{ rotateY: 62, opacity: 0, x: 26 }}
                      animate={{ rotateY: 0, opacity: 1, x: 0 }}
                      exit={{ rotateY: -62, opacity: 0, x: -26 }}
                      transition={{ duration: 0.5, ease }}
                      style={{ transformOrigin: "left center" }}
                      className="[backface-visibility:hidden] [transform-style:preserve-3d]"
                    >
                      <p className="eyebrow">{question.eyebrow}</p>
                      <h2 className="editorial mt-4 text-3xl leading-tight text-warmBlack md:text-4xl">{question.question}</h2>
                      <div className="mt-8 grid gap-3.5">
                        {question.answers.map((answer) => {
                          const active = selected === answer.type;
                          return (
                            <motion.button
                              key={answer.type}
                              type="button"
                              onClick={() => chooseAnswer(answer.type)}
                              whileHover={{ x: 5 }}
                              className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition-colors ${active ? "border-gold/50 bg-sand/40 shadow-soft" : "border-gold/15 bg-white/70 hover:border-gold/35 hover:bg-white"}`}
                            >
                              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-serif text-sm font-bold transition-colors ${active ? "border-deepGold bg-deepGold text-cream" : "border-gold/25 text-deepGold group-hover:bg-deepGold group-hover:text-cream"}`}>
                                {answer.type}
                              </span>
                              <span className="text-[.98rem] leading-6 text-deepGold/85">{answer.text}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {phase === "loading" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-1 flex-col items-center justify-center text-center">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} className="mb-8 h-16 w-16 rounded-full border-2 border-gold/20 border-t-deepGold" />
                  <h2 className="editorial text-3xl text-warmBlack">Deine Auswertung wird gelesen…</h2>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-deepGold/70">Dein Antwortmuster wird sortiert. Gleich schlägt sich die nächste Seite auf.</p>
                </motion.div>
              )}

              {phase === "gate" && (
                <motion.form
                  onSubmit={submitLead}
                  initial={{ rotateY: 62, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.55, ease }}
                  style={{ transformOrigin: "left center" }}
                  className="flex flex-1 flex-col justify-center"
                >
                  <p className="eyebrow">Deine Auswertung</p>
                  <h2 className="editorial mt-4 text-3xl leading-tight text-warmBlack md:text-4xl">Wohin darf dein Kompass?</h2>
                  <p className="mt-4 text-sm leading-7 text-deepGold/70">Sibylle schickt dir deine persönliche Auswertung samt Impulsen direkt per WhatsApp.</p>
                  <div className="mt-7 space-y-4">
                    <Field label="Vorname" value={lead.vorname} required onChange={(value) => setLead({ ...lead, vorname: value })} />
                    <Field label="WhatsApp-Telefonnummer" value={lead.telefonnummer} required onChange={(value) => setLead({ ...lead, telefonnummer: value })} />
                  </div>
                  <label className="mt-4 flex gap-3 rounded-2xl border border-gold/15 bg-mist/5 p-4 text-xs leading-6 text-deepGold/80">
                    <input required type="checkbox" checked={lead.consent} onChange={(e) => setLead({ ...lead, consent: e.target.checked })} className="mt-0.5 h-4 w-4 accent-deepGold" />
                    <span>Ich willige ein, dass Sibylle Bergold mir meine Auswertung sowie Impulse zu Coaching-Themen per WhatsApp zusendet. Der Widerruf ist jederzeit möglich. Es gelten die Bestimmungen der Datenschutzerklärung.</span>
                  </label>
                  <button type="submit" disabled={saving || !lead.consent} className="mt-6 w-full rounded-full bg-deepGold px-8 py-4 font-bold text-white shadow-soft transition hover:bg-gold disabled:opacity-50">
                    {saving ? "Wird gesendet…" : "Auswertung per WhatsApp erhalten"}
                  </button>
                </motion.form>
              )}

              {phase === "done" && (
                <motion.div
                  initial={{ rotateY: 62, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.55, ease }}
                  style={{ transformOrigin: "left center" }}
                  className="flex flex-1 flex-col justify-center"
                >
                  <p className="eyebrow">Vielen Dank</p>
                  <h2 className="editorial mt-4 text-3xl leading-tight text-warmBlack md:text-4xl">Was jetzt möglich wird.</h2>
                  <p className="mt-5 leading-8 text-deepGold/75">
                    Sibylle wurde direkt benachrichtigt und schickt dir deine persönliche Auswertung zeitnah per WhatsApp an {lead.telefonnummer}.
                  </p>
                  <p className="mt-4 text-sm leading-7 text-deepGold/60">Wenn du magst, gehen wir deinem Muster in einem ruhigen Erstgespräch gemeinsam auf den Grund.</p>
                  <a href="/#termine" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-deepGold px-8 py-4 font-bold text-white shadow-soft transition hover:bg-gold">
                    Kostenfreies Erstgespräch buchen <span aria-hidden="true">→</span>
                  </a>
                </motion.div>
              )}
            </div>
          </div>

          {/* Cover */}
          <AnimatePresence>
            {phase === "cover" && (
              <motion.div
                key="cover"
                className="absolute inset-0 z-30 [transform-style:preserve-3d]"
                initial={{ rotateY: 0 }}
                exit={{ rotateY: -172, opacity: 0 }}
                transition={{ duration: 1.15, ease }}
                style={{ transformOrigin: "left center" }}
              >
                <div className="relative flex h-full flex-col items-center justify-center gap-8 overflow-hidden rounded-[2rem] border border-softGold/30 bg-gradient-to-br from-deepGold via-[#7a5d2c] to-[#5f4a24] p-10 text-center text-cream shadow-[0_45px_130px_rgba(35,42,26,.4)] [backface-visibility:hidden]">
                  <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-softGold/20 blur-3xl" />
                  <div className="pointer-events-none absolute inset-y-4 right-3 w-2 rounded-full bg-cream/25" />
                  <Image src="/assets/sibylle/brand/monogram-cream.png" alt="" width={618} height={799} className="relative h-24 w-auto opacity-90" />
                  <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-[0.4em] text-cream/70">Selbsttest</p>
                    <h2 className="editorial mt-4 text-4xl md:text-5xl">Beziehungs-Kompass</h2>
                    <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-cream/75">Sieben Fragen. Ein ehrlicher Impuls. Schlag das Buch auf und beginne.</p>
                  </div>
                  <motion.button
                    onClick={() => setPhase("questions")}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7, ease }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative rounded-full bg-cream px-10 py-4 text-sm font-bold uppercase tracking-widest text-deepGold shadow-lg transition hover:bg-white"
                  >
                    Selbsttest jetzt starten
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </main>
  );
}

function Field({ label, value, onChange, required }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</label>
      <input required={required} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white" />
    </div>
  );
}
