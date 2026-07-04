"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { supabase } from "@/lib/sibylle/supabase";

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
  if (percent < 30) return "Dein Muster wird sichtbar...";
  if (percent < 60) return "Schon 50% analysiert...";
  if (percent < 90) return "Die Dynamik wird klarer...";
  return "Fast geschafft...";
}

export function BeziehungsKompassClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<CompassType[]>([]);
  const [selected, setSelected] = useState<CompassType | null>(null);
  const [phase, setPhase] = useState<"questions" | "loading" | "gate" | "done">("questions");
  const [lead, setLead] = useState({ vorname: "", telefonnummer: "", consent: false });
  const [saving, setSaving] = useState(false);

  const resultType = useMemo(() => getResult(answers), [answers]);
  const question = questions[step];
  const progress = phase === "questions" ? ((step + 1) / questions.length) * 100 : 100;

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
    }, 300);
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
    setPhase("done");
  }

  return (
    <main className="grain min-h-screen bg-cream px-4 py-16 text-warmBlack md:py-24">
      <div className="container max-w-5xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="eyebrow mx-auto">Selbsttest Beziehungsmuster</p>
          <h1 className="editorial mt-6 text-[clamp(3rem,7vw,6.5rem)] leading-[.9]">Dein Beziehungs-Kompass</h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-deepGold/75 md:text-lg">
            Sieben ruhige Fragen zeigen dir, welches Beziehungsmuster im Moment besonders sichtbar ist. Die Auswertung ist Coaching und Selbsterfahrung, ohne Heilversprechen.
          </p>
        </div>

        <section className="mx-auto overflow-hidden rounded-[2.5rem] border border-gold/15 bg-white shadow-soft">
          <div className="h-2 bg-mist/30">
            <motion.div className="h-full bg-deepGold" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }} />
          </div>
          <div className="p-6 md:p-10">
            {phase === "questions" && (
              <>
                <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-softGold">Frage {step + 1} von {questions.length}</span>
                  <span className="text-sm font-semibold text-deepGold/65">{progressText(step + 1)}</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: .42, ease: [0.22, 1, 0.36, 1] }}>
                    <p className="eyebrow">{question.eyebrow}</p>
                    <h2 className="mt-4 text-3xl font-bold leading-tight text-warmBlack md:text-4xl">{question.question}</h2>
                    <div className="mt-8 grid gap-4">
                      {question.answers.map((answer) => (
                        <motion.button
                          key={answer.type}
                          type="button"
                          onClick={() => chooseAnswer(answer.type)}
                          whileHover={{ y: -2 }}
                          className={`rounded-2xl border p-5 text-left text-base leading-7 transition-all ${selected === answer.type ? "border-gold/50 bg-sand/35 text-warmBlack shadow-soft" : "border-gold/15 bg-white text-deepGold/80 hover:border-gold/35 hover:bg-gold/5"}`}
                        >
                          <span className="mr-3 font-bold text-deepGold">{answer.type}</span>{answer.text}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </>
            )}

            {phase === "loading" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} className="mb-8 h-16 w-16 rounded-full border-2 border-gold/20 border-t-deepGold" />
                <h2 className="text-3xl font-bold text-warmBlack">Deine Auswertung wird berechnet...</h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-deepGold/70">Dein Antwortmuster wird sortiert. Gleich öffnet sich der nächste Schritt.</p>
              </motion.div>
            )}

            {phase === "gate" && (
              <motion.form onSubmit={submitLead} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl space-y-6">
                <div className="rounded-[2rem] bg-sand/20 p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-softGold">Dein vorläufiges Muster</p>
                  <h2 className="mt-3 text-3xl font-bold text-warmBlack">{resultLabels[resultType]}</h2>
                  <p className="mt-4 leading-8 text-deepGold/75">{resultDescriptions[resultType]}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Vorname" value={lead.vorname} required onChange={(value) => setLead({ ...lead, vorname: value })} />
                  <Field label="WhatsApp-Telefonnummer" value={lead.telefonnummer} required onChange={(value) => setLead({ ...lead, telefonnummer: value })} />
                </div>
                <label className="flex gap-3 rounded-2xl border border-gold/15 bg-mist/5 p-4 text-sm leading-7 text-deepGold/80">
                  <input required type="checkbox" checked={lead.consent} onChange={(e) => setLead({ ...lead, consent: e.target.checked })} className="mt-1 h-4 w-4 accent-deepGold" />
                  <span>Ich willige ein, dass Sibylle Bergold mir meine persönliche Auswertung sowie anschließende Impulse zu Coaching-Themen per WhatsApp zusendet. Diese Einwilligung kann ich jederzeit mit Wirkung für die Zukunft widerrufen. Es gelten die Bestimmungen der Datenschutzerklärung.</span>
                </label>
                <button type="submit" disabled={saving || !lead.consent} className="w-full rounded-full bg-deepGold px-8 py-4 font-bold text-white shadow-soft transition hover:bg-gold disabled:opacity-50">{saving ? "Wird gespeichert..." : "Auswertung via WhatsApp erhalten"}</button>
              </motion.form>
            )}

            {phase === "done" && (
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl py-10 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sand/40 text-2xl text-deepGold">✓</div>
                <h2 className="text-3xl font-bold text-warmBlack">Vielen Dank!</h2>
                <p className="mt-5 text-lg leading-8 text-deepGold/75">Dein persönlicher Beziehungs-Kompass wird in wenigen Augenblicken direkt per WhatsApp an {lead.telefonnummer} gesendet.</p>
                <motion.a whileHover={{ y: -3 }} href="/#termine" className="mt-9 inline-flex rounded-full bg-deepGold px-8 py-4 font-bold text-white shadow-soft transition hover:bg-gold">Jetzt kostenfreies Erstgespräch buchen</motion.a>
              </motion.div>
            )}
          </div>
        </section>

        <div className="mx-auto mt-8 max-w-3xl rounded-[2rem] border border-gold/15 bg-white/70 p-6 text-center shadow-soft">
          <p className="text-xs font-bold uppercase tracking-widest text-softGold">Weiterer Selbsttest</p>
          <h2 className="mt-3 text-2xl font-bold text-warmBlack">Inneres Schloss</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-deepGold/70">
            Ein textbasiertes Mini-Spiel zu Energie, Authentizität und inneren Rollen.
          </p>
          <motion.a whileHover={{ y: -2 }} href="/schloss-spiel" className="mt-5 inline-flex rounded-full border border-gold/20 px-6 py-3 text-sm font-bold text-deepGold transition hover:bg-gold/5">
            Inneres Schloss spielen
          </motion.a>
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
