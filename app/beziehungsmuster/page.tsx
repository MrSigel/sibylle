import { BeziehungsmusterClient } from './BeziehungsmusterClient';
import { pageMetadata } from '@/lib/sibylle/metadata';

export const metadata = pageMetadata({
  title: "Beziehungsmuster erkennen und verstehen",
  description: "Wiederholen sich deine Beziehungsprobleme? Sibylle Jutta Bergold hilft dir, deine Beziehungsmuster zu erkennen, ihre tieferen Ursachen zu verstehen und nachhaltig zu lösen.",
  path: "/beziehungsmuster",
  keywords: ["Beziehungsmuster erkennen", "Beziehungsmuster verstehen", "Beziehungsmuster", "wiederkehrende Beziehungsmuster", "Bindungsangst", "Verlustangst", "Partnerschaft Probleme", "Systemisches Coaching"],
});

// FAQ schema targeting the real Search-Console queries ("beziehungsmuster
// erkennen/verstehen") — helps ranking and can win a featured snippet.
const faq = [
  {
    q: "Wie erkenne ich meine Beziehungsmuster?",
    a: "Beziehungsmuster erkennst du an Wiederholungen: der immer gleiche Streit, Rückzug sobald Nähe entsteht, eine ähnliche Partnerwahl oder ein vertrautes, schon früher erlebtes Gefühl. Meist zeigt sich ein Muster nicht als einzelnes Ereignis, sondern als wiederkehrende Dynamik über mehrere Beziehungen hinweg.",
  },
  {
    q: "Was bedeutet es, ein Beziehungsmuster zu verstehen?",
    a: "Ein Beziehungsmuster zu verstehen heißt, den Ursprung zu sehen: Wiederkehrende Dynamiken haben oft eine Geschichte, die älter ist als die aktuelle Beziehung – etwa Prägungen aus der Herkunftsfamilie. In einer systemischen Aufstellung wird dieser Hintergrund sichtbar.",
  },
  {
    q: "Woher kommen wiederkehrende Beziehungsmuster?",
    a: "Häufig liegt die Ursache nicht allein im aktuellen Partner, sondern in alten Loyalitäten, Erfahrungen aus der Herkunftsfamilie oder übernommenen Dynamiken, die bis heute wirken. Das bedeutet nicht, dass du „falsch“ bist – es bedeutet, dass etwas gesehen werden möchte.",
  },
  {
    q: "Lassen sich Beziehungsmuster verändern oder lösen?",
    a: "Was sichtbar wird, kann sich verändern. In der Aufstellungsarbeit mit Sibylle Jutta Bergold wird erkennbar, woher ein Muster stammt – und genau dort kann es sich lösen. Ohne Druck, ohne Heilversprechen, in einem ruhigen und geschützten Rahmen.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function BeziehungsmusterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BeziehungsmusterClient faq={faq} />
    </>
  );
}
