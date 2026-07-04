import Link from "next/link";
import { methodSteps } from "@/lib/sibylle/siteData";

export default function MethodePage() {
  return (
    <main className="bg-white px-4 py-16 text-warmBlack md:px-0 md:py-24">
      <div className="container space-y-10">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-deepGold">
            Methode
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            Systemische Arbeit als Prozess von Wahrnehmen zu Verändern
          </h1>
          <p className="max-w-3xl text-base leading-8 text-deepGold md:text-lg">
            Diese Arbeit ist Coaching und Selbsterfahrung, keine ärztliche oder
            psychotherapeutische Behandlung. Sie unterstützt dich dabei, Muster
            zu sehen und andere Entscheidungen zu treffen.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-5">
          {methodSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[2rem] border border-mist bg-white p-8 shadow-soft"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sand text-xl font-semibold text-deepGold">
                {index + 1}
              </div>
              <h2 className="mt-6 text-xl font-semibold text-warmBlack">
                {step.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-deepGold">
                {step.description}
              </p>
            </article>
          ))}
        </div>
        <div className="rounded-[2rem] border border-mist bg-white p-10 shadow-soft">
          <h2 className="text-2xl font-semibold text-warmBlack">
            Wichtige Hinweise
          </h2>
          <p className="mt-4 text-base leading-8 text-deepGold">
            Die Begleitung ersetzt keine medizinische, psychologische oder
            psychotherapeutische Behandlung. Sie ist ein Raum für
            Selbsterfahrung, Achtsamkeit und systemisches Verständnis.
          </p>
        </div>
        <Link
          href="/preise"
          className="inline-flex rounded-[1.75rem] bg-deepGold px-8 py-4 text-sm font-semibold text-white transition hover:bg-gold"
        >
          Zu den Preisen
        </Link>
      </div>
    </main>
  );
}
