import { pageMetadata } from "@/lib/sibylle/metadata";

export const metadata = pageMetadata({
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von Sibylle Bergold.",
  path: "/impressum",
});

export default function ImpressumPage() {
  return (
    <main className="grain min-h-screen bg-white py-16 text-warmBlack md:py-24">
      <div className="container max-w-4xl">
        <div className="mb-12">
          <p className="eyebrow">Rechtliches</p>
          <h1 className="editorial mt-6 text-5xl md:text-7xl">Impressum</h1>
        </div>

        <div className="premium-panel rounded-[2.5rem] p-8 md:p-12">
          <section className="space-y-10">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-softGold">Angaben gemäß § 5 DDG</h2>
              <div className="mt-6 space-y-2 text-lg leading-relaxed text-deepGold/90">
                <p className="font-bold">Sibylle Bergold</p>
                <p>Cranachstraße 52</p>
                <p>63739 Aschaffenburg</p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-softGold">Kontakt</h2>
              <div className="mt-6 space-y-2 text-lg leading-relaxed text-deepGold/90">
                <p>Telefon: +49 (0) 178 / 55 11 230</p>
                <p>E-Mail: kontakt@sibylle-bergold.com</p>
                <p>Website: sibylle-bergold.com</p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-softGold">Verantwortlich</h2>
              <div className="mt-6 space-y-2 text-lg leading-relaxed text-deepGold/90">
                <p>Inhaber: Sibylle Bergold</p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-softGold">Steuer-ID</h2>
              <div className="mt-6 space-y-2 text-lg leading-relaxed text-deepGold/90">
                <p>Steuer Nr.: 204 281 10146</p>
              </div>
            </div>

            <div className="border-t border-gold/10 pt-10">
              <h2 className="text-sm font-bold uppercase tracking-widest text-softGold">Streitbeilegung</h2>
              <p className="mt-6 text-base leading-8 text-deepGold/80">
                Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle weder verpflichtet noch bereit.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
