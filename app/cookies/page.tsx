import { pageMetadata } from "@/lib/sibylle/metadata";

export const metadata = pageMetadata({
  title: "Cookie-Richtlinie",
  description: "Informationen zu essenziellen Cookies, Infrastruktur-Cookies und optionaler Analyse auf sibylle-bergold.com.",
  path: "/cookies",
  noIndex: true,
});

export default function CookiesPage() {
  const cookieGroups = [
    {
      title: "Notwendig",
      desc: "Diese Einträge sind für den technischen Betrieb der Website erforderlich und werden ohne gesonderte Einwilligung verwendet.",
      items: [
        { name: "sibylle-cookie-consent", purpose: "Speichert deine Cookie-Auswahl. Wird technisch im lokalen Speicher (localStorage) deines Browsers abgelegt – kein klassisches Cookie.", duration: "Bis zum Löschen im Browser" },
        { name: "crm_session", purpose: "Sichere Anmelde-Sitzung für den internen Verwaltungsbereich. Wird ausschließlich nach einem Login gesetzt – nicht für normale Besucher.", duration: "Bis zur Abmeldung" }
      ]
    },
    {
      title: "Statistik & Analyse (optional)",
      desc: "Diese Cookies werden nur gesetzt, wenn du im Cookie-Hinweis „Alle akzeptieren“ wählst (Google Consent Mode). Sie helfen uns zu verstehen, wie die Website genutzt wird.",
      items: [
        { name: "_ga", purpose: "Google Analytics: unterscheidet Besucher voneinander.", duration: "2 Jahre" },
        { name: "_ga_N2LYRE0S8V", purpose: "Google Analytics: speichert den Sitzungsstatus für die Auswertung.", duration: "2 Jahre" }
      ]
    }
  ];

  return (
    <main className="grain min-h-screen bg-white py-16 text-warmBlack md:py-24">
      <div className="container max-w-4xl">
        <div className="mb-12 text-center md:text-left">
          <p className="eyebrow mx-auto md:mx-0">Privatsphäre</p>
          <h1 className="editorial mt-6 text-5xl md:text-7xl">Cookie-Richtlinie</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-deepGold/80">
            Hier erfährst du, welche Cookies wir verwenden und warum. Transparenz ist uns wichtig, damit du dich auf unserer Seite sicher fühlst.
          </p>
        </div>

        <div className="space-y-8">
          {cookieGroups.map((group) => (
            <div key={group.title} className="premium-panel rounded-[2.5rem] p-8 md:p-12">
              <h2 className="editorial text-3xl text-deepGold">{group.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-deepGold/70">{group.desc}</p>
              
              <div className="mt-10 overflow-hidden rounded-2xl border border-gold/10 bg-white/40">
                <div className="grid grid-cols-[1fr_2fr_1fr] bg-deepGold/5 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-deepGold/60">
                  <span>Name</span>
                  <span>Zweck</span>
                  <span>Dauer</span>
                </div>
                <div className="divide-y divide-gold/5">
                  {group.items.map((item) => (
                    <div key={item.name} className="grid grid-cols-[1fr_2fr_1fr] px-6 py-5 text-sm leading-relaxed text-deepGold/80">
                      <code className="text-[11px] font-bold text-softGold">{item.name}</code>
                      <span>{item.purpose}</span>
                      <span className="text-xs text-deepGold/50">{item.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="premium-panel mt-8 rounded-[2.5rem] p-8 md:p-12">
          <h2 className="editorial text-3xl text-deepGold">Einwilligung &amp; Widerruf</h2>
          <p className="mt-6 text-base leading-8 text-deepGold/80">
            Statistik- und Analyse-Cookies werden ausschließlich nach deiner ausdrücklichen Einwilligung geladen. Solange du nur „Nur essenziell“ wählst, findet keine Analyse statt. Du kannst deine Auswahl jederzeit ändern, indem du die gespeicherte Einstellung in deinem Browser löschst und die Seite erneut aufrufst.
          </p>
        </div>
      </div>
    </main>
  );
}
