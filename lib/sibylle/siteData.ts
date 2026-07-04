export const navLinks = [
  { href: "/", label: "Start" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/systemaufstellung", label: "Systemaufstellung" },
  { href: "/beziehungsmuster", label: "Beziehungsmuster" },
  { href: "/partnerschaft", label: "Partnerschaft" },
  { href: "/preise", label: "Preise" },
  { href: "/referenzen", label: "Referenzen" },
];

export const whatsappConfig = {
  phone: "491785511230",
  messages: {
    default: "Hallo Sibylle, ich habe deine Website gesehen und möchte mein Anliegen kurz mit dir besprechen.",
    erstgespraech: "Hallo Sibylle, ich möchte gerne ein Erstgespräch buchen und schauen, ob deine Arbeit zu meinem Anliegen passt.",
    partnerschaft: "Hallo Sibylle, ich melde mich wegen eines Beziehungsthemas und möchte wissen, ob eine Aufstellung für mich passend ist.",
    beziehungsmuster: "Hallo Sibylle, ich erkenne bei mir wiederkehrende Beziehungsmuster und möchte gerne mit dir darüber sprechen.",
    paketAnfrage: (paketName: string) => `Hallo Sibylle, ich interessiere mich für das Paket „${paketName}“ und möchte gerne klären, ob es zu meinem Anliegen passt.`,
    success: (paketName: string) => `Hallo Sibylle, ich habe gerade das Paket „${paketName}“ gebucht und möchte die nächsten Schritte mit dir besprechen.`,
  }
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
  "Klarheit und Wahrnehmung",
  "Persönliche Begleitung",
  "Systemische Tiefe",
];

export const heroQuestions = [
  "Warum lande ich immer wieder bei denselben Menschen?",
  "Warum fühlt sich mein Leben nicht vollständig an?",
  "Was, wenn dein Muster nicht bei dir begonnen hat?",
];

export const emotionalPatterns = [
  {
    title: "Wiederkehrende Muster",
    description:
      "Du erkennst alte Geschichten in neuen Beziehungen und fragst dich, warum sich dein Leben ständig wiederholt.",
  },
  {
    title: "Innere Unruhe",
    description:
      "Es bleibt eine leise Sehnsucht, ein Gefühl, dass etwas fehlt, obwohl äußerlich alles stabil erscheint.",
  },
  {
    title: "Sinnfragen",
    description:
      "Die Frage nach deiner eigenen Rolle in Familien-, Liebes- und Berufskontexten ist eng mit deinem Muster verbunden.",
  },
];

export const themeCards = [
  {
    label: "Beziehungsmuster",
    title: "Wenn Liebe sich wiederholt",
    description:
      "Erkenne die Dynamiken, die dich immer wieder in vergleichbare Situationen führen.",
    href: "/beziehungsmuster",
  },
  {
    label: "Partnerschaft",
    title: "Intimität neu erleben",
    description:
      "Finde Klarheit, wie du in Partnerschaften verbindlicher und freier sein kannst.",
    href: "/partnerschaft",
  },
  {
    label: "Sinnfrage",
    title: "Dein Leben als Antwort",
    description:
      "Spüre, ob dein Weg stimmig ist oder ob ein tieferes Ja noch wartet.",
    href: "/sinnfrage",
  },
  {
    label: "Familienmuster",
    title: "Erbschaften erkennen",
    description:
      "Löse dich behutsam von alten Erwartungen aus deiner Herkunft.",
    href: "/familienmuster",
  },
];

export const methodSteps = [
  {
    title: "Thema finden",
    description:
      "Gemeinsam klären wir dein Anliegen und sehen das Muster im Fokus.",
  },
  {
    title: "Aufstellung",
    description:
      "Eine systemische Aufstellung macht innere und äußere Verbindungen sichtbar.",
  },
  {
    title: "Erkennen",
    description: "Du nimmst wahr, wie sich alte Erfahrungen im Jetzt zeigen.",
  },
  {
    title: "Verstehen",
    description:
      "Entschlüsse und neue Positionen bringen dich ins eigene Erleben.",
  },
  {
    title: "Verändern",
    description:
      "In der Integration entsteht eine neue Freiheit im Alltag und in Beziehungen.",
  },
];

export const pricingPackages = [
  {
    title: "Erstklarheit",
    price: "399 €",
    duration: "90 Min. Einzelsession",
    features: [
      "Online Session",
      "Erstes Thema sichtbar machen",
      "Standortbestimmung",
      "Schriftliches Kurz-Feedback"
    ],
    cta: "Jetzt buchen",
    highlight: false
  },
  {
    title: "Klarheits-Session",
    price: "1.490 €",
    duration: "2 × 90 Min.",
    features: [
      "Systemische Aufstellung",
      "Audio-Nachbesprechung",
      "1 Follow-up-Call (nach 2 Wochen)"
    ],
    cta: "Termin anfragen",
    highlight: true
  },
  {
    title: "System-Reset",
    price: "3.490 €",
    duration: "6 Wochen Begleitung",
    features: [
      "3–4 Sessions",
      "Vertiefte Aufstellungsarbeit",
      "Integrationsimpulse",
      "WhatsApp-Begleitung (werktags)"
    ],
    cta: "Platz anfragen",
    highlight: false
  },
  {
    title: "Tiefe Transformation",
    price: "6.490 €",
    duration: "3 Monate Begleitung",
    features: [
      "6–8 Sessions",
      "Mehrere Aufstellungen",
      "Verschiedene Lebensbereiche",
      "Durchgehende Begleitung"
    ],
    cta: "Beratungsgespräch",
    highlight: false
  },
  {
    title: "Full Legacy Begleitung",
    price: "9.999 €",
    duration: "6 Monate Intensiv",
    features: [
      "Intensive Begleitung",
      "Tiefgehende Aufstellungen",
      "Persönlicher Zugang zu Sibylle",
      "Inkl. Academy-Zugang"
    ],
    cta: "Persönliche Anfrage",
    highlight: true
  }
];

export const academyInfo = {
  title: "Academy",
  price: "47–97 € / Monat",
  features: [
    "Aufzeichnungen aller Sessions",
    "Selbst-Aufstellungs-Übungen",
    "Monatliche Live-Gruppensession"
  ]
};

export const faqItems = [
  {
    question: "Ist das Coaching eine Heilbehandlung?",
    answer:
      "Nein. Es handelt sich um Coaching und Selbsterfahrung. Systemische Aufstellungen ersetzen keine medizinische, psychotherapeutische oder heilpraktische Behandlung.",
  },
  {
    question: "Wie läuft eine Sitzung ab?",
    answer:
      "Wir besprechen dein Anliegen, wählen das zentrale Thema und arbeiten mit Stellvertretern, Bildern und Worten, damit inneres Wissen sichtbar wird.",
  },
  {
    question: "Muss ich Vorerfahrung in Aufstellungen haben?",
    answer:
      "Nein. Du brauchst keine Vorbildung. Offenheit und der Wunsch nach tieferer Klarheit reichen aus.",
  },
  {
    question: "Wie schnell spüre ich eine Veränderung?",
    answer:
      "Jeder Prozess ist individuell. Eine konkrete Wirkung oder ein bestimmter Zeitpunkt lässt sich nicht versprechen. Die Begleitung lädt dazu ein, Zusammenhänge neu wahrzunehmen und eigene nächste Schritte zu entwickeln.",
  },
  {
    question:
      "Welche Rolle spielt die Deutsche Akademie für Systemaufstellungen?",
    answer:
      "Als Gründerin der Akademie bringe ich systemisches Wissen und langjährige Erfahrung in jede Begleitung ein.",
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
    text: "Ich bin sehr dankbar für die Begleitung durch Sibylle. Die Aufstellung hat mir geholfen, eine tiefe Klarheit über mein Muster zu finden, die ich vorher nicht für möglich gehalten hätte.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Michael R.",
    text: "Absolut empfehlenswert! Sibylle schafft einen sehr sicheren und ruhigen Raum. Ihre Intuition und Erfahrung sind in jedem Moment der Aufstellung spürbar.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Sarah M.",
    text: "Die Ausbildung bei Sibylle ist lebensverändernd. Man lernt nicht nur die Methode, sondern macht einen riesigen persönlichen Entwicklungsschritt.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Elena B.",
    text: "Eine sehr herzliche und professionelle Begleitung. Ich habe mich zu jeder Zeit gut aufgehoben gefühlt und konnte mein Thema endlich auflösen.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Johannes W.",
    text: "Wer wirklich an den Ursprung seiner Themen kommen möchte, ist hier genau richtig. Sibylles Klarheit ist beeindruckend.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Anja K.",
    text: "Die Arbeit mit dem morphogenetischen Feld war für mich eine völlig neue, aber extrem wirkungsvolle Erfahrung. Danke für alles!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Markus L.",
    text: "Ich habe schon viele Coachings gemacht, aber die Tiefe bei Sibylle ist einzigartig. Man merkt die 25 Jahre Erfahrung sofort.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Claudia H.",
    text: "Ein Raum voller Wärme und Vertrauen. Die systemische Aufstellung hat Türen geöffnet, die jahrelang verschlossen waren.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
  }
];
