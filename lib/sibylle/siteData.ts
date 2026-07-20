export const navLinks = [
  { href: "/", label: "Start" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/systemaufstellung", label: "Systemaufstellung" },
  { href: "/beziehungsmuster", label: "Beziehungsmuster" },
  { href: "/kompass", label: "Selbsttest" },
  { href: "/partnerschaft", label: "Partnerschaft" },
  { href: "/preise", label: "Preise" },
  { href: "/referenzen", label: "Referenzen" },
];

export const whatsappConfig = {
  phone: "491785511230",
  messages: {
    default:
      "Hallo Sibylle, ich habe deine Website gesehen und möchte mein Anliegen in Ruhe mit dir besprechen.",
    erstgespraech:
      "Hallo Sibylle, ich möchte gern einen Termin für eine erste Session vereinbaren und schauen, ob systemisches Coaching und Selbsterfahrung zu meinem Anliegen passen.",
    partnerschaft:
      "Hallo Sibylle, ich melde mich wegen eines Beziehungsthemas und möchte wissen, ob eine systemische Aufstellung für mich passend ist.",
    beziehungsmuster:
      "Hallo Sibylle, ich erkenne bei mir wiederkehrende Beziehungsmuster und möchte gern mit dir darüber sprechen.",
    paketAnfrage: (paketName: string) =>
      `Hallo Sibylle, ich interessiere mich für das Paket "${paketName}" und möchte gern klären, ob es zu meinem Anliegen passt.`,
    success: (paketName: string) =>
      `Hallo Sibylle, ich habe gerade das Paket "${paketName}" gebucht und möchte die nächsten Schritte mit dir besprechen.`,
  },
};

export const getWhatsAppLink = (message: string) => {
  return `https://wa.me/${whatsappConfig.phone}?text=${encodeURIComponent(message)}`;
};

export const ctaLinks = {
  primary: {
    href: getWhatsAppLink(whatsappConfig.messages.default),
    label: "Jetzt persönlich bei Sibylle melden",
  },
  secondary: {
    href: getWhatsAppLink(whatsappConfig.messages.erstgespraech),
    label: "Termin für erste Session",
  },
};

export const trustItems = [
  "Systemische Aufstellung & Coaching",
  "Über 25 Jahre Erfahrung",
  "34 Bewertungen auf Google",
];

export const heroQuestions = [
  "Warum wiederholen sich Beziehungsmuster, obwohl du es anders willst?",
  "Welche familiären Dynamiken wirken noch in deinem heutigen Leben?",
  "Was, wenn dein Muster nicht bei dir begonnen hat?",
];

export const emotionalPatterns = [
  {
    title: "Wiederkehrende Beziehungsmuster",
    description:
      "Du erkennst alte Geschichten in neuen Beziehungen und fragst dich, warum sich Nähe, Rückzug oder Verlustangst wiederholen.",
  },
  {
    title: "Innere Unruhe und alte Prägungen",
    description:
      "Es bleibt eine leise Spannung, ein Gefühl von Nicht-Ankommen, obwohl äußerlich vieles stabil erscheint.",
  },
  {
    title: "Sinnfragen und Lebensrichtung",
    description:
      "Du spürst, dass deine Rolle in Familie, Liebe oder Beruf mit tieferen systemischen Mustern verbunden sein könnte.",
  },
];

export const themeCards = [
  {
    label: "Beziehungsmuster lösen",
    title: "Wenn Liebe sich wiederholt",
    description:
      "Systemisches Coaching macht sichtbar, welche Dynamiken dich immer wieder in ähnliche Beziehungssituationen führen.",
    href: "/beziehungsmuster",
  },
  {
    label: "Partnerschaft",
    title: "Nähe neu verstehen",
    description:
      "Erkenne, wie Bindung, Freiheit und alte Erwartungen in deiner Partnerschaft zusammenwirken.",
    href: "/partnerschaft",
  },
  {
    label: "Sinnfrage",
    title: "Dein Leben als Antwort",
    description:
      "Spüre, ob dein Weg stimmig ist oder ob ein tieferes Ja noch Raum braucht.",
    href: "/sinnfrage",
  },
  {
    label: "Familienmuster lösen",
    title: "Erbschaften erkennen",
    description:
      "Eine systemische Aufstellung kann zeigen, welche Loyalitäten, Erwartungen oder Rollen aus deiner Herkunft wirken.",
    href: "/familienmuster",
  },
];

export const methodSteps = [
  {
    title: "Anliegen klären",
    description:
      "Gemeinsam wird dein Thema präzise eingegrenzt, damit die systemische Aufstellung einen klaren Fokus bekommt.",
  },
  {
    title: "System sichtbar machen",
    description:
      "Stellvertreter, Bilder oder innere Positionen machen Beziehungen, Rollen und Dynamiken wahrnehmbar.",
  },
  {
    title: "Muster erkennen",
    description:
      "Du siehst, wie alte Erfahrungen, Bindungen oder familiäre Prägungen im Heute wirken.",
  },
  {
    title: "Neue Position finden",
    description:
      "Im geschützten Raum darf eine stimmigere innere Haltung entstehen, ohne Druck und ohne Bewertung.",
  },
  {
    title: "Integration begleiten",
    description:
      "Die Erkenntnisse werden in den Alltag übersetzt. Die Begleitung bleibt Coaching und Selbsterfahrung, ohne Heilversprechen.",
  },
];

export const pricingPackages = [
  {
    title: "Erstklarheit",
    price: "399 €",
    duration: "90 Min. Einzelsession",
    features: [
      "Online-Session im geschützten Raum",
      "Anliegen und Muster sichtbar machen",
      "Systemische Standortbestimmung",
      "Schriftlicher Integrationsimpuls",
    ],
    cta: "Jetzt anfragen",
    highlight: false,
  },
  {
    title: "Klarheits-Session",
    price: "1.490 €",
    duration: "3 × 90 Min.",
    features: [
      "Systemische Aufstellung zu einem Kernthema",
      "Ruhige Vor- und Nachbereitung",
      "1 Follow-up-Call nach 2 Wochen",
    ],
    cta: "Termin anfragen",
    highlight: true,
  },
  {
    title: "System-Reset",
    price: "3.490 €",
    duration: "6 Wochen Begleitung",
    features: [
      "3-4 Sessions",
      "Vertiefte Aufstellungsarbeit",
      "Integrationsimpulse für den Alltag",
      "WhatsApp-Begleitung werktags",
    ],
    cta: "Termin für erste Session",
    highlight: false,
  },
  {
    title: "Tiefe Transformation",
    price: "6.490 €",
    duration: "3 Monate Begleitung",
    features: [
      "6-8 Sessions",
      "Mehrere systemische Aufstellungen",
      "Beziehung, Herkunft und Lebensrichtung",
      "Kontinuierliche Begleitung",
    ],
    cta: "Beratungsgespräch",
    highlight: false,
  },
  {
    title: "Full Legacy Begleitung",
    price: "9.999 €",
    duration: "6 Monate Intensiv",
    features: [
      "Intensive 1:1-Begleitung",
      "Tiefgehende Aufstellungsarbeit",
      "Persönlicher Zugang zu Sibylle Jutta Bergold",
      "Inkl. Academy-Zugang",
    ],
    cta: "Persönliche Anfrage",
    highlight: true,
  },
];

export const academyInfo = {
  title: "Academy",
  price: "47-97 € / Monat",
  features: [
    "Aufzeichnungen ausgewählter Sessions",
    "Selbst-Aufstellungs-Übungen",
    "Monatliche Live-Gruppensession",
  ],
};

export const faqItems = [
  {
    question: "Was ist eine systemische Aufstellung?",
    answer:
      "Eine systemische Aufstellung ist eine Methode im Coaching und in der Selbsterfahrung. Sie macht Beziehungen, Rollen und unbewusste Dynamiken sichtbar, ohne sie zu bewerten.",
  },
  {
    question: "Ist systemisches Coaching eine Heilbehandlung?",
    answer:
      "Nein. Die Begleitung bei Sibylle Jutta Bergold ist Coaching und Selbsterfahrung. Sie ersetzt keine medizinische, psychotherapeutische oder heilpraktische Behandlung und enthält keine Heilversprechen.",
  },
  {
    question: "Wie läuft eine Sitzung ab?",
    answer:
      "Zu Beginn wird dein Anliegen geklärt. Danach wird das relevante System über Stellvertreter, Bilder oder innere Positionen sichtbar gemacht und behutsam integriert.",
  },
  {
    question: "Muss ich Vorerfahrung mit Familienaufstellungen haben?",
    answer:
      "Nein. Du brauchst keine Vorerfahrung. Sibylle Jutta Bergold begleitet dich ruhig durch den Prozess und achtet auf einen sicheren, geschützten Rahmen.",
  },
  {
    question: "Arbeitet Sibylle Jutta Bergold nach Bert Hellinger?",
    answer:
      "Ja. Die Aufstellungsarbeit folgt der von Bert Hellinger geprägten Tradition des Familienstellens – ergänzt um Methoden und Erfahrungen, die Sibylle Jutta Bergold über mehr als 25 Jahre eigenständig entwickelt hat.",
  },
  {
    question: "Was ist der Unterschied zwischen Familienaufstellung und Familienstellen?",
    answer:
      "Es ist dasselbe: „Familienstellen\" und „systemisches Familienstellen\" sind gängige andere Bezeichnungen für die Familienaufstellung. Gemeint ist die systemische Arbeit, die familiäre Dynamiken und Verstrickungen sichtbar und lösbar macht.",
  },
  {
    question: "Kann ich eine systemische Aufstellung online machen?",
    answer:
      "Ja. Systemische Aufstellungen und systemisches Coaching sind online möglich, wenn der Rahmen klar gehalten wird und du dich ungestört einlassen kannst.",
  },
  {
    question: "Wer ist Sibylle Jutta Bergold?",
    answer:
      "Sibylle Jutta Bergold ist Gründerin der Deutschen Akademie für Systemaufstellungen und begleitet Menschen seit über 25 Jahren in systemischer Aufstellung, Coaching und Selbsterfahrung.",
  },
  {
    question: "Wie lange dauert eine systemische Aufstellung?",
    answer:
      "Eine Einzelsession dauert in der Regel 90 Minuten. Intensivere Begleitungen können mehrere Termine über einige Wochen oder Monate umfassen.",
  },
  {
    question: "Was kostet eine systemische Aufstellung bei Sibylle Jutta Bergold?",
    answer:
      "Die Kosten richten sich nach Umfang und Anliegen – von der einzelnen Session bis zur mehrmonatigen Begleitung. Den passenden Rahmen und die Konditionen besprechen wir individuell in einem persönlichen Gespräch.",
  },
  {
    question: "Findet die Begleitung in Aschaffenburg oder online statt?",
    answer:
      "Die Begleitung ist online möglich und kann je nach Rahmen auch vor Ort im Raum Aschaffenburg abgestimmt werden. Der passende Rahmen wird vorab persönlich geklärt.",
  },
  {
    question: "Welche Voraussetzungen brauche ich?",
    answer:
      "Du brauchst keine Vorerfahrung. Wichtig sind ein konkretes Anliegen, Offenheit für Selbstreflexion und ein ungestörter Rahmen während der Sitzung.",
  },
  {
    question: "Wo liegen die Grenzen der Methode?",
    answer:
      "Systemische Aufstellungen sind Coaching und Selbsterfahrung. Sie ersetzen keine ärztliche, psychotherapeutische oder heilpraktische Diagnose oder Behandlung.",
  },
  {
    question: "Welches Ergebnis kann ich erwarten?",
    answer:
      "Viele Menschen gewinnen mehr Klarheit über Dynamiken, Rollen und nächste Schritte. Ein bestimmtes Ergebnis oder eine Heilwirkung wird nicht versprochen.",
  },
];

export const footerLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/cookies", label: "Cookies" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/widerruf", label: "Widerruf" },
];

export const focusLinks = [
  { href: "/ahnenmuster", label: "Ahnenmuster verstehen" },
  { href: "/berufliche-aufstellung", label: "Business & Erfolg" },
  { href: "/inneres-kind", label: "Inneres Kind & System" },
  { href: "/familienmuster", label: "Familienmuster lösen" },
  { href: "/partnerschaft", label: "Partnerschaft & Liebe" },
];

// Echte Google-Bewertungen (Auszüge). Ohne Fotos – Initialen-Avatare, da echte
// Namen mit Stockfotos irreführend wären.
export const testimonials = [
  {
    name: "Elke E. Wolf",
    text:
      "Ich durfte bereits mehrfach am Familienstellen teilnehmen und bin jedes Mal aufs Neue tief berührt und dankbar für diese besondere Erfahrung. Die wertschätzende, achtsame Atmosphäre hat mir von Anfang an das Gefühl gegeben, gesehen, angenommen und sicher zu sein. Gerade bei sehr persönlichen und schwierigen Themen habe ich mich jederzeit gut aufgehoben gefühlt. Besonders bewegt mich die nachhaltige Wirkung der Aufstellungen: Sie haben mir neue Perspektiven eröffnet, Zusammenhänge verständlicher gemacht und mich in meiner persönlichen Entwicklung spürbar weitergebracht.",
    short:
      "Die wertschätzende, achtsame Atmosphäre gab mir von Anfang an das Gefühl, gesehen und sicher zu sein. Die Aufstellungen haben mir neue Perspektiven eröffnet und mich spürbar weitergebracht.",
    rating: 5,
  },
  {
    name: "Tom Kanitz",
    text:
      "Nach fast zwei Jahren, in denen wir uns schon kennen und begleiten, machte Sibylle mir das Angebot der systemischen Aufstellung als Ausbildung – und alles passte wie geführt. Jetzt weiß ich, warum ich diesen Weg gehen musste. Blockaden, die ich nicht einmal im Traum auf dem Schirm hatte, kamen zutage und machten den Weg für meine eigene Berufung frei. So zauberhaft, liebevoll, direkt, klar und deutlich vermittelte sie das, was dran war. Ich bin ihr sehr dankbar für ihre geniale Begleitung.",
    short:
      "So zauberhaft, liebevoll, direkt, klar und deutlich vermittelte Sibylle, was dran war. Ich bin ihr sehr dankbar für ihre geniale Begleitung.",
    rating: 5,
  },
  {
    name: "G. S.",
    text:
      "Ich wünschte zum Wohl von allen, jeder würde sich von ihrer tollen Arbeit und ihrer positiven Energie begleiten lassen. Ich bin so unendlich dankbar, dass ich Sibylle getroffen habe und dass mir das, was sie mir beigebracht hat, in jeder schweren Situation innerlich hilft. Danke.",
    short:
      "Ich bin so unendlich dankbar, dass ich Sibylle getroffen habe. Was sie mir beigebracht hat, hilft mir innerlich in jeder schweren Situation.",
    rating: 5,
  },
  {
    name: "Laura Miller",
    text:
      "In den Aufstellungen habe ich es endlich geschafft, tiefsitzende Blockaden, alte Begrenzungen und limitierende Glaubensmuster zu den Themen Geld, Liebe und Beziehungen loszulassen. Es fühlte sich an, als würden jahrelange schwere Ketten endlich von mir abfallen. Besonders beeindruckend war, wie liebevoll, professionell und gleichzeitig kraftvoll Sibylle und das Team arbeiten. Die Atmosphäre im Ausbildungszentrum ist wunderschön – warm, hell und einladend. Ich bin voller Energie, Freude und Zuversicht und erlebe erfüllende Beziehungen. Von ganzem Herzen empfehlenswert.",
    short:
      "Tiefsitzende Blockaden und limitierende Glaubensmuster endlich loslassen – liebevoll, professionell und kraftvoll begleitet. Ich bin voller Energie, Freude und Zuversicht.",
    rating: 5,
  },
  {
    name: "Betina Zackel",
    text:
      "Sibylle macht ihre Arbeit mit unglaublich viel Leidenschaft und Professionalität. Nach jedem Termin bin ich aufs Neue beeindruckt, wie treffsicher und faszinierend ihre Arbeit ist. Ich bin ihr von Herzen dankbar, weil sie mir schon so oft weitergeholfen hat. Sie ist ein unglaublich herzlicher Mensch, und ich verlasse jeden Termin mit einem guten, sicheren Gefühl. Danke für alles!",
    short:
      "Nach jedem Termin bin ich aufs Neue beeindruckt, wie treffsicher und faszinierend Sibylles Arbeit ist. Ich verlasse jeden Termin mit einem guten, sicheren Gefühl.",
    rating: 5,
  },
  {
    name: "Vanessa Seitz",
    text:
      "Sibylle ist eine super einfühlsame Person. Ich habe mich direkt bei ihr wohlgefühlt. Ich kann sie wärmstens empfehlen – wenn ihr euch nicht sicher seid, ruft sie an und sprecht mit ihr. Ihr werdet nicht enttäuscht sein.",
    short:
      "Sibylle ist eine super einfühlsame Person. Ich habe mich direkt wohlgefühlt und kann sie wärmstens empfehlen.",
    rating: 5,
  },
];

export function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

