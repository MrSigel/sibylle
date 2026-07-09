'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { pricingPackages, academyInfo, getWhatsAppLink, whatsappConfig } from '@/lib/sibylle/siteData';
import { CTAButton } from '@/components/sibylle/CTAButton';
import { trackEvent } from '@/lib/sibylle/tracking';

const ease = [0.22, 1, 0.36, 1] as const;

type Scores = Record<string, number>;

type QuizOption = { label: string; scores: Scores };
type QuizQuestion = { id: string; question: string; hint: string; options: QuizOption[] };

// Each answer adds weight to one or more packages. After all questions are
// answered, the package with the highest total is shown as "empfohlen".
const quizQuestions: QuizQuestion[] = [
  {
    id: 'situation',
    question: 'Was beschreibt deine Situation gerade am besten?',
    hint: 'Es gibt kein richtig oder falsch – wähle, was sich am stimmigsten anfühlt.',
    options: [
      { label: 'Ich möchte erst einmal hineinspüren und einen Eindruck gewinnen', scores: { 'Erstklarheit': 3 } },
      { label: 'Ich habe ein konkretes Thema, das ich klären möchte', scores: { 'Klarheits-Session': 3, 'Erstklarheit': 1 } },
      { label: 'Ein Muster wiederholt sich und ich komme allein nicht weiter', scores: { 'System-Reset': 3, 'Tiefe Transformation': 1 } },
      { label: 'Ich möchte grundlegend etwas in meinem Leben verändern', scores: { 'Tiefe Transformation': 2, 'Full Legacy Begleitung': 2 } },
    ],
  },
  {
    id: 'zeit',
    question: 'Wie viel Zeit möchtest du dir für diesen Prozess geben?',
    hint: 'Veränderung darf ihr eigenes Tempo haben.',
    options: [
      { label: 'Eine einzelne, fokussierte Session', scores: { 'Erstklarheit': 3 } },
      { label: 'Ein paar intensive Sitzungen zu einem Kernthema', scores: { 'Klarheits-Session': 3 } },
      { label: 'Einige Wochen mit mehreren Sessions', scores: { 'System-Reset': 3 } },
      { label: 'Mehrere Monate kontinuierliche Begleitung', scores: { 'Tiefe Transformation': 2, 'Full Legacy Begleitung': 2 } },
    ],
  },
  {
    id: 'umfang',
    question: 'Wie weit reicht dein Anliegen?',
    hint: 'Manchmal ist es ein Thema – manchmal ein ganzes Geflecht.',
    options: [
      { label: 'Ein klar umrissenes, einzelnes Thema', scores: { 'Klarheits-Session': 2, 'Erstklarheit': 1 } },
      { label: 'Zwei Bereiche, z. B. Beziehung und Herkunft', scores: { 'System-Reset': 2, 'Tiefe Transformation': 1 } },
      { label: 'Es zieht sich durch mehrere Bereiche meines Lebens', scores: { 'Tiefe Transformation': 3 } },
      { label: 'Es betrifft im Grunde mein ganzes Leben', scores: { 'Full Legacy Begleitung': 3 } },
    ],
  },
  {
    id: 'begleitung',
    question: 'Wie eng möchtest du begleitet werden?',
    hint: 'Von einem Impuls bis zur intensiven Begleitung ist alles möglich.',
    options: [
      { label: 'Ein Impuls, mit dem ich selbst weiterarbeite', scores: { 'Erstklarheit': 2 } },
      { label: 'Punktuelle Begleitung mit ruhiger Nachbereitung', scores: { 'Klarheits-Session': 2, 'System-Reset': 1 } },
      { label: 'Regelmäßige Begleitung über mehrere Wochen', scores: { 'System-Reset': 1, 'Tiefe Transformation': 2 } },
      { label: 'Enger, persönlicher Zugang über Monate', scores: { 'Full Legacy Begleitung': 3 } },
    ],
  },
];

function computeRecommended(answers: (number | null)[]): string {
  const totals: Scores = {};
  answers.forEach((answer, qi) => {
    if (answer === null) return;
    const option = quizQuestions[qi].options[answer];
    for (const [title, points] of Object.entries(option.scores)) {
      totals[title] = (totals[title] || 0) + points;
    }
  });
  let best = pricingPackages[0].title;
  let bestScore = -1;
  for (const pkg of pricingPackages) {
    const score = totals[pkg.title] || 0;
    if (score > bestScore) {
      bestScore = score;
      best = pkg.title;
    }
  }
  return best;
}

export function PreiseClient() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quizQuestions.length).fill(null));
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const personalized = answers.some((a) => a !== null);
  const recommendedTitle = useMemo(() => computeRecommended(answers), [answers]);

  function selectOption(optionIndex: number) {
    const next = [...answers];
    next[step] = optionIndex;
    setAnswers(next);

    if (step < quizQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setCompleted(true);
      trackEvent('package_quiz_complete', { recommended: computeRecommended(next) });
    }
  }

  function goBack() {
    if (step > 0) setStep(step - 1);
  }

  function resetQuiz() {
    setAnswers(Array(quizQuestions.length).fill(null));
    setStep(0);
    setCompleted(false);
  }

  function skipQuiz() {
    setCompleted(true);
    trackEvent('package_quiz_skip', {});
  }

  const current = quizQuestions[step];
  const progress = ((step + (completed ? 1 : 0)) / quizQuestions.length) * 100;

  const recommended = pricingPackages.find((p) => p.title === recommendedTitle) ?? pricingPackages[0];
  const others = pricingPackages.filter((p) => p.title !== recommended.title);

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="grain relative px-4 pb-16 pt-16 md:pb-20 md:pt-24">
        <div className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-sand/20 blur-[100px]" />
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mx-auto max-w-4xl"
          >
            <p className="eyebrow mx-auto">Finde deinen Rahmen</p>
            <h1 className="editorial mt-7 text-[clamp(3rem,7vw,7.5rem)] leading-[.88] text-warmBlack">
              Welches Paket passt zu <span className="italic text-deepGold">dir?</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-deepGold/80 md:text-xl">
              Beantworte vier kurze Fragen – am Ende zeigen wir dir alle Pakete und heben das hervor, das am besten zu deinem Anliegen passt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quiz */}
      {!completed && (
        <section className="px-4 pb-20 md:pb-28">
          <div className="container">
            <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-gold/10 bg-white p-8 shadow-[0_30px_80px_rgba(35,42,26,.08)] md:p-14">
              {/* Progress */}
              <div className="mb-10">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-softGold">
                  <span>Frage {step + 1} von {quizQuestions.length}</span>
                  <span>{Math.round(progress)} %</span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gold/10">
                  <motion.div
                    className="h-full rounded-full bg-softGold"
                    initial={false}
                    animate={{ width: `${((step + 1) / quizQuestions.length) * 100}%` }}
                    transition={{ duration: 0.5, ease }}
                  />
                </div>
              </div>

              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease }}
              >
                <h2 className="editorial text-3xl leading-tight text-warmBlack md:text-4xl">{current.question}</h2>
                <p className="mt-4 text-sm italic text-deepGold/60">{current.hint}</p>

                <div className="mt-9 grid gap-4">
                  {current.options.map((option, optionIndex) => {
                    const selected = answers[step] === optionIndex;
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => selectOption(optionIndex)}
                        className={`group flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                          selected
                            ? 'border-softGold bg-softGold/10'
                            : 'border-gold/15 bg-mist/5 hover:border-softGold/50 hover:bg-softGold/5'
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                            selected ? 'border-softGold bg-softGold text-white' : 'border-gold/30 text-deepGold/40 group-hover:border-softGold/60'
                          }`}
                        >
                          {String.fromCharCode(65 + optionIndex)}
                        </span>
                        <span className="text-[1.02rem] font-medium leading-snug text-deepGold">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              <div className="mt-10 flex items-center justify-between border-t border-gold/10 pt-6 text-sm">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 0}
                  className="font-semibold text-deepGold/60 transition hover:text-deepGold disabled:opacity-30"
                >
                  ← Zurück
                </button>
                <button
                  type="button"
                  onClick={skipQuiz}
                  className="font-semibold text-deepGold/50 underline decoration-softGold/40 underline-offset-4 transition hover:text-softGold"
                >
                  Fragen überspringen
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {completed && (
        <section className="section-shell pt-4">
          <div className="container">
            {personalized ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease }}
                  className="mb-14 text-center"
                >
                  <p className="eyebrow mx-auto">Dein Ergebnis</p>
                  <h2 className="editorial mt-6 text-4xl md:text-5xl">Das passt am besten zu dir</h2>
                  <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-deepGold/70">
                    Basierend auf deinen Antworten empfehlen wir dir diesen Rahmen. Alle weiteren Pakete findest du direkt darunter.
                  </p>
                </motion.div>

                {/* Recommended package */}
                <div className="mx-auto max-w-2xl">
                  <PackageCard pkg={recommended} featured index={0} />
                </div>

                {/* Other packages, smaller */}
                <div className="mt-16">
                  <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-deepGold/40">Weitere Pakete</p>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {others.map((pkg, idx) => (
                      <PackageCard key={pkg.title} pkg={pkg} index={idx} />
                    ))}
                  </div>
                </div>

                <div className="mt-14 text-center">
                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="text-sm font-semibold text-deepGold/60 underline decoration-softGold/40 underline-offset-4 transition hover:text-softGold"
                  >
                    Fragen erneut beantworten
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-14 text-center">
                  <p className="eyebrow mx-auto">Alle Pakete</p>
                  <h2 className="editorial mt-6 text-4xl md:text-5xl">Wähle deinen Rahmen</h2>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {pricingPackages.map((pkg, idx) => (
                    <PackageCard key={pkg.title} pkg={pkg} featured={pkg.highlight} index={idx} />
                  ))}
                </div>
                <div className="mt-14 text-center">
                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="text-sm font-semibold text-deepGold/60 underline decoration-softGold/40 underline-offset-4 transition hover:text-softGold"
                  >
                    Passendes Paket finden →
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Academy Section */}
      <section className="section-shell bg-white/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[3rem] bg-white border border-gold/10 shadow-xl"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-softGold/10 blur-[80px]" />
            <div className="grid items-center gap-12 p-10 lg:grid-cols-[1fr_.7fr] lg:p-20">
              <div>
                <p className="eyebrow">Selbststudium & Community</p>
                <h2 className="editorial mt-6 text-4xl md:text-5xl lg:text-6xl">{academyInfo.title}</h2>
                <p className="mt-8 text-lg leading-8 text-deepGold/80">
                  Werde Teil der Academy und erhalte Zugang zu wertvollen Inhalten für deine eigene Prozessarbeit – flexibel und im eigenen Tempo.
                </p>
                <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                  {academyInfo.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-4 text-sm font-semibold text-deepGold">
                      <span className="h-2 w-2 rounded-full bg-softGold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-center justify-center rounded-3xl bg-white/50 p-10 text-center">
                <span className="text-sm font-bold uppercase tracking-widest text-softGold">Ab</span>
                <span className="mt-2 text-5xl font-bold text-deepGold">{academyInfo.price}</span>
                <div className="mt-8 w-full">
                  <CTAButton href={getWhatsAppLink(whatsappConfig.messages.paketAnfrage('Academy'))} className="w-full">Jetzt Platz anfragen</CTAButton>
                </div>
                <p className="mt-4 text-xs text-deepGold/50">Jederzeit monatlich kündbar</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Individual Inquiry */}
      <section className="section-shell text-center">
        <div className="container max-w-3xl">
          <h2 className="editorial text-4xl md:text-5xl">Individuelle Begleitung</h2>
          <p className="mt-8 text-lg text-deepGold/70 leading-8">
            Keines der Pakete passt genau zu deiner Situation? Rahmen, Dauer und Konditionen können auch ganz individuell passend zu deinem Anliegen vereinbart werden.
          </p>
          <div className="mt-12">
            <CTAButton href={getWhatsAppLink(whatsappConfig.messages.default)} variant="secondary">
              Schreib Sibylle eine Nachricht
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}

type PricingPackage = (typeof pricingPackages)[number];

function PackageCard({ pkg, featured = false, index }: { pkg: PricingPackage; featured?: boolean; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.6, ease }}
      className={`relative flex flex-col transition-all duration-500 ${
        featured
          ? 'rounded-[2.5rem] bg-deepGold p-10 text-cream shadow-[0_30px_80px_rgba(35,42,26,.18)] md:p-12'
          : 'rounded-[2rem] border border-gold/10 bg-white p-7 shadow-sm hover:-translate-y-1.5 hover:border-softGold/30'
      }`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-softGold px-5 py-1 text-[10px] font-bold uppercase tracking-widest text-deepGold shadow-md">
          Für dich empfohlen
        </div>
      )}

      <div className={featured ? 'mb-8' : 'mb-6'}>
        <h3 className={`font-serif ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>{pkg.title}</h3>
        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-softGold sm:text-sm">{pkg.duration}</p>
      </div>

      <div className={featured ? 'mb-8' : 'mb-6'}>
        <span className={`font-bold ${featured ? 'text-5xl' : 'text-3xl'}`}>{pkg.price}</span>
      </div>

      <ul className={`flex-grow border-t border-current/10 ${featured ? 'mb-10 space-y-5 pt-8' : 'mb-8 space-y-3 pt-6'}`}>
        {pkg.features.map((feature) => (
          <li key={feature} className={`flex items-start gap-3 leading-snug ${featured ? 'text-[.95rem]' : 'text-[.85rem]'}`}>
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-softGold" />
            <span className={featured ? 'text-cream/80' : 'text-deepGold/80'}>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-3">
        <CTAButton
          href={`/success?paket=${encodeURIComponent(pkg.title)}`}
          variant={featured ? 'secondary' : 'primary'}
          className="w-full"
          onClick={() => trackEvent('package_click', { package: pkg.title, action: 'request_steps', featured })}
        >
          Paket anfragen
        </CTAButton>
        <CTAButton
          href={getWhatsAppLink(whatsappConfig.messages.paketAnfrage(pkg.title))}
          variant="ghost"
          className={`w-full !h-10 text-[10px] ${featured ? 'text-cream/90 hover:bg-white/10 hover:text-cream' : 'text-deepGold/80 hover:bg-gold/5'}`}
        >
          Vorher per WhatsApp klären
        </CTAButton>
      </div>
    </motion.article>
  );
}
