import Link from "next/link";

export default function FamilienmusterPage() {
  return (
    <main className="bg-cream px-4 py-16 text-warmBlack md:px-0 md:py-24">
      <div className="container space-y-10">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-deepOlive">
            Familienmuster
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            Welche Geschichten aus deiner Herkunft wiederholen sich?
          </h1>
          <p className="max-w-3xl text-base leading-8 text-deepOlive md:text-lg">
            Familienmuster wirken oft still. Erst wenn sie sichtbar werden,
            kannst du entscheiden, welche Teile du weitertragen möchtest und
            welche nicht.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-mist bg-white p-10 shadow-soft">
            <h2 className="text-2xl font-semibold text-warmBlack">
              Ahnenlinien und Rollen
            </h2>
            <p className="mt-4 text-base leading-8 text-deepOlive">
              Die systemische Arbeit lässt erkennen, wie familiäre Dynamiken
              deine Beziehungen, Entscheidungen und dein Selbstbild prägen.
            </p>
          </article>
          <article className="rounded-[2rem] border border-mist bg-sibylleMist p-10 shadow-soft">
            <h2 className="text-2xl font-semibold text-warmBlack">
              Freiheit in Verantwortung
            </h2>
            <p className="mt-4 text-base leading-8 text-deepOlive">
              Es geht darum, ins eigene Erleben zu kommen – nicht darum, Schuld
              zu verteilen oder alte Wunden zu diagnostizieren.
            </p>
          </article>
        </div>
        <Link
          href="/methode"
          className="inline-flex rounded-[1.75rem] bg-warmBlack px-8 py-4 text-sm font-semibold text-cream transition hover:bg-[#11120f]"
        >
          Zur Methode
        </Link>
      </div>
    </main>
  );
}
