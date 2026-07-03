export default function CookiesPage() {
  const cookieGroups = [
    {
      title: "Essenziell",
      desc: "Diese Cookies sind für den technischen Betrieb der Website notwendig und können nicht deaktiviert werden.",
      items: [
        { name: "sibylle-cookie-consent", purpose: "Speichert den Status deiner Cookie-Einwilligung.", duration: "1 Jahr" },
        { name: "next-auth.session-token", purpose: "Wird für die sichere Anmeldung und Sitzungsverwaltung benötigt (falls zutreffend).", duration: "Sitzung" }
      ]
    },
    {
      title: "Funktional & Infrastruktur",
      desc: "Cookies, die von unseren Infrastruktur-Partnern gesetzt werden, um die Performance und Sicherheit zu gewährleisten.",
      items: [
        { name: "sb-api-auth", purpose: "Supabase Authentifizierung und API-Zugriff.", duration: "Sitzung" },
        { name: "__vc_static", purpose: "Vercel Infrastruktur-Cookie zur Optimierung der Auslieferung.", duration: "Sitzung" }
      ]
    }
  ];

  return (
    <main className="grain min-h-screen bg-cream py-16 text-warmBlack md:py-24">
      <div className="container max-w-4xl">
        <div className="mb-12 text-center md:text-left">
          <p className="eyebrow mx-auto md:mx-0">Privatsphäre</p>
          <h1 className="editorial mt-6 text-5xl md:text-7xl">Cookie-Richtlinie</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-deepOlive/80">
            Hier erfährst du, welche Cookies wir verwenden und warum. Transparenz ist uns wichtig, damit du dich auf unserer Seite sicher fühlst.
          </p>
        </div>

        <div className="space-y-8">
          {cookieGroups.map((group) => (
            <div key={group.title} className="premium-panel rounded-[2.5rem] p-8 md:p-12">
              <h2 className="editorial text-3xl text-deepOlive">{group.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-deepOlive/70">{group.desc}</p>
              
              <div className="mt-10 overflow-hidden rounded-2xl border border-olive/10 bg-white/40">
                <div className="grid grid-cols-[1fr_2fr_1fr] bg-deepOlive/5 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-deepOlive/60">
                  <span>Name</span>
                  <span>Zweck</span>
                  <span>Dauer</span>
                </div>
                <div className="divide-y divide-olive/5">
                  {group.items.map((item) => (
                    <div key={item.name} className="grid grid-cols-[1fr_2fr_1fr] px-6 py-5 text-sm leading-relaxed text-deepOlive/80">
                      <code className="text-[11px] font-bold text-softGold">{item.name}</code>
                      <span>{item.purpose}</span>
                      <span className="text-xs text-deepOlive/50">{item.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
