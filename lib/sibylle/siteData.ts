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
      "Hallo Sibylle, ich möchte gern ein kostenloses Erstgespräch buchen und schauen, ob systemisches Coaching und Selbsterfahrung zu meinem Anliegen passen.",
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
    label: "Kostenloses Erstgespräch buchen",
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
    duration: "2 × 90 Min.",
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
    cta: "Erstgespräch buchen",
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
      "Persönlicher Zugang zu Sibylle Bergold",
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
      "Nein. Die Begleitung bei Sibylle Bergold ist Coaching und Selbsterfahrung. Sie ersetzt keine medizinische, psychotherapeutische oder heilpraktische Behandlung und enthält keine Heilversprechen.",
  },
  {
    question: "Wie läuft eine Sitzung ab?",
    answer:
      "Zu Beginn wird dein Anliegen geklärt. Danach wird das relevante System über Stellvertreter, Bilder oder innere Positionen sichtbar gemacht und behutsam integriert.",
  },
  {
    question: "Muss ich Vorerfahrung mit Familienaufstellungen haben?",
    answer:
      "Nein. Du brauchst keine Vorerfahrung. Sibylle Bergold begleitet dich ruhig durch den Prozess und achtet auf einen sicheren, geschützten Rahmen.",
  },
  {
    question: "Kann ich eine systemische Aufstellung online machen?",
    answer:
      "Ja. Systemische Aufstellungen und systemisches Coaching sind online möglich, wenn der Rahmen klar gehalten wird und du dich ungestört einlassen kannst.",
  },
  {
    question: "Wer ist Sibylle Bergold?",
    answer:
      "Sibylle Bergold ist Gründerin der Deutschen Akademie für Systemaufstellungen und begleitet Menschen seit über 25 Jahren in systemischer Aufstellung, Coaching und Selbsterfahrung.",
  },
  {
    question: "Wie lange dauert eine systemische Aufstellung?",
    answer:
      "Eine Einzelsession dauert in der Regel 90 Minuten. Intensivere Begleitungen können mehrere Termine über einige Wochen oder Monate umfassen.",
  },
  {
    question: "Was kostet eine systemische Aufstellung bei Sibylle Bergold?",
    answer:
      "Die Pakete beginnen bei 399 Euro für eine 90-minütige Einzelsession. Mehrmonatige Begleitungen werden auf der Preise-Seite transparent als Pakete dargestellt.",
  },
  {
    question: "Findet die Begleitung in München oder online statt?",
    answer:
      "Die Begleitung ist online möglich und kann je nach Rahmen auch vor Ort im Raum München abgestimmt werden. Der passende Rahmen wird vorab persönlich geklärt.",
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

export const testimonials = [
  {
    name: "Tanja S.",
    text:
      "Ich bin sehr dankbar für die Begleitung durch Sibylle. Die Aufstellung hat mir geholfen, eine tiefe Klarheit über mein Muster zu finden.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    name: "Michael R.",
    text:
      "Sibylle schafft einen sehr sicheren und ruhigen Raum. Ihre Intuition und über 25 Jahre Erfahrung sind in jedem Moment spürbar.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    name: "Sarah M.",
    text:
      "Die Ausbildung bei Sibylle ist tiefgehend. Man lernt nicht nur die Methode, sondern begegnet den eigenen Mustern sehr bewusst.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    name: "Elena B.",
    text:
      "Eine sehr wertschätzende und professionelle Begleitung. Ich habe mich gut aufgehoben gefühlt und konnte mein Thema klarer sehen.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    name: "Johannes W.",
    text:
      "Wer die tieferen Zusammenhänge seiner Themen verstehen möchte, findet bei Sibylle Bergold einen klaren und geschützten Rahmen.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    name: "Anja K.",
    text:
      "Die Arbeit mit systemischen Bildern war für mich neu und sehr eindrücklich. Danke für diese ruhige, klare Begleitung.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    name: "Markus L.",
    text:
      "Ich habe schon viele Coachings gemacht, aber diese systemische Tiefe war besonders. Sibylles Klarheit hat mir sehr geholfen.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    name: "Claudia H.",
    text:
      "Ein Raum voller Wärme und Vertrauen. Die systemische Aufstellung hat sichtbar gemacht, was vorher schwer in Worte zu fassen war.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
  },
];

