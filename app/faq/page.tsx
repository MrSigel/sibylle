import { faqItems } from '@/lib/sibylle/siteData';

export default function FAQPage() {
  return (
    <main className="bg-cream px-4 py-16 text-warmBlack md:px-0 md:py-24">
      <div className="container space-y-10">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-deepOlive">FAQ</p>
          <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">Antworten auf die wichtigsten Fragen</h1>
          <p className="max-w-3xl text-base leading-8 text-deepOlive md:text-lg">
            Hier klären wir, worum es bei systemischen Aufstellungen geht – und was du realistischerweise erwarten kannst.
          </p>
        </div>
        <div className="space-y-4">
          {faqItems.map((item) => (
            <div key={item.question} className="rounded-[2rem] border border-mist bg-white p-8 shadow-soft">
              <h2 className="text-lg font-semibold text-warmBlack">{item.question}</h2>
              <p className="mt-4 text-base leading-8 text-deepOlive">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
