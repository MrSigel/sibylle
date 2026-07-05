import { pageMetadata } from "@/lib/sibylle/metadata";

export const metadata = pageMetadata({
  title: "Datenschutzerklärung",
  description: "Datenschutzhinweise zur Website von Sibylle Bergold, Hosting, Supabase, Kontaktwegen und Analyse nach Einwilligung.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <main className="grain min-h-screen bg-white py-16 text-warmBlack md:py-24">
      <div className="container max-w-4xl">
        <div className="mb-12">
          <p className="eyebrow">Rechtliches</p>
          <h1 className="editorial mt-6 text-5xl md:text-7xl">Datenschutz</h1>
        </div>

        <div className="premium-panel space-y-12 rounded-[2.5rem] p-8 md:p-12">
          <section>
            <h2 className="editorial text-3xl text-deepGold">1. Datenschutz auf einen Blick</h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-deepGold/80">
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
            </div>
          </section>

          <section>
            <h2 className="editorial text-3xl text-deepGold">2. Verantwortliche Stelle</h2>
            <div className="mt-6 space-y-2 text-lg leading-relaxed text-deepGold/90">
              <p className="font-bold">Sibylle Bergold</p>
              <p>Cranachstraße 52</p>
              <p>63739 Aschaffenburg</p>
              <p className="mt-4">Telefon: +49 (0) 178 / 55 11 230</p>
              <p>E-Mail: info@sibylle-bergold.de</p>
            </div>
          </section>

          <section>
            <h2 className="editorial text-3xl text-deepGold">3. Hosting und Infrastruktur</h2>
            <div className="mt-6 space-y-6 text-base leading-8 text-deepGold/80">
              <div>
                <h3 className="font-bold text-warmBlack">Vercel</h3>
                <p className="mt-2">
                  Wir hosten unsere Website bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Vercel ist eine Cloud-Plattform, über die wir unsere Website bereitstellen. Beim Besuch unserer Website werden Daten (wie IP-Adresse, Browsertyp, Betriebssystem) auf den Servern von Vercel verarbeitet, um die Auslieferung der Seite zu ermöglichen.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-warmBlack">Supabase</h3>
                <p className="mt-2">
                  Für Datenbankdienste nutzen wir Supabase (Supabase Inc., 970 Summer St, Stamford, CT 06905, USA). Supabase wird zur sicheren Speicherung von Daten (z. B. im Rahmen von Kontaktanfragen oder Nutzerinteraktionen) verwendet. Die Datenverarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einer sicheren und effizienten Datenverwaltung.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="editorial text-3xl text-deepGold">4. Datenerfassung auf dieser Website</h2>
            <div className="mt-6 space-y-6 text-base leading-8 text-deepGold/80">
              <div>
                <h3 className="font-bold text-warmBlack">Server-Log-Dateien</h3>
                <p className="mt-2">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp/Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-warmBlack">Kontaktformular / E-Mail</h3>
                <p className="mt-2">
                  Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="editorial text-3xl text-deepGold">5. Ihre Rechte</h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-deepGold/80">
              <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
            </div>
          </section>

          <section className="border-t border-gold/10 pt-10 text-sm text-deepGold/60">
            <p>Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
