import { pageMetadata } from "@/lib/sibylle/metadata";

export const metadata = pageMetadata({
  title: "Widerrufsbelehrung",
  description:
    "Widerrufsbelehrung und Muster-Widerrufsformular für Coaching-Begleitung und Vereinbarungen im Fernabsatz mit Sibylle Jutta Bergold.",
  path: "/widerruf",
});

export default function WiderrufPage() {
  return (
    <main className="bg-white px-4 py-16 text-warmBlack md:px-0 md:py-24">
      <div className="container max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-warmBlack md:text-4xl">Widerrufsbelehrung</h1>
          <p className="mt-3 text-sm text-deepGold/70">
            Für Verbraucherinnen und Verbraucher bei Verträgen im Fernabsatz und außerhalb von Geschäftsräumen.
          </p>
        </div>

        <section className="rounded-[2rem] border border-mist bg-white p-8 shadow-soft md:p-10">
          <div className="space-y-6 text-base leading-8 text-deepGold">
            <div>
              <h2 className="text-xl font-semibold text-warmBlack">Widerrufsrecht</h2>
              <p className="mt-3">
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu
                widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
              </p>
              <p className="mt-3">
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
              </p>
              <p className="mt-3 rounded-2xl bg-mist/20 p-4 not-italic">
                Sibylle Jutta Bergold<br />
                Cranachstraße 52<br />
                63739 Aschaffenburg<br />
                E-Mail: kontakt@sibylle-bergold.com<br />
                Telefon: +49 178 5511230
              </p>
              <p className="mt-3">
                mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine
                E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür
                das unten stehende Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
              </p>
              <p className="mt-3">
                Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des
                Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-warmBlack">Folgen des Widerrufs</h2>
              <p className="mt-3">
                Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen
                erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen,
                an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese
                Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion
                eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in
                keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
              </p>
              <p className="mt-3">
                Haben Sie verlangt, dass die Dienstleistung während der Widerrufsfrist beginnen soll, so
                haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt,
                zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags
                unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im
                Vertrag vorgesehenen Dienstleistungen entspricht.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-warmBlack">Vorzeitiges Erlöschen des Widerrufsrechts</h2>
              <p className="mt-3">
                Das Widerrufsrecht erlischt bei einem Vertrag zur Erbringung von Dienstleistungen, wenn wir
                die Dienstleistung vollständig erbracht haben und mit der Ausführung der Dienstleistung erst
                begonnen haben, nachdem Sie dazu Ihre ausdrückliche Zustimmung gegeben und gleichzeitig Ihre
                Kenntnis davon bestätigt haben, dass Sie Ihr Widerrufsrecht bei vollständiger
                Vertragserfüllung durch uns verlieren.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-mist bg-white p-8 shadow-soft md:p-10">
          <h2 className="text-xl font-semibold text-warmBlack">Muster-Widerrufsformular</h2>
          <p className="mt-3 text-sm text-deepGold/70">
            (Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden Sie es
            zurück.)
          </p>
          <div className="mt-5 space-y-4 rounded-2xl bg-mist/20 p-6 text-base leading-8 text-deepGold">
            <p>
              An:<br />
              Sibylle Jutta Bergold, Cranachstraße 52, 63739 Aschaffenburg, E-Mail: kontakt@sibylle-bergold.com
            </p>
            <p>
              Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die
              Erbringung der folgenden Dienstleistung (*):
            </p>
            <p>_______________________________________________</p>
            <p>
              Bestellt am (*)/erhalten am (*): __________________<br />
              Name des/der Verbraucher(s): ____________________<br />
              Anschrift des/der Verbraucher(s): _______________<br />
              Datum: ____________________<br />
              Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)
            </p>
            <p className="text-sm text-deepGold/60">(*) Unzutreffendes streichen.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
