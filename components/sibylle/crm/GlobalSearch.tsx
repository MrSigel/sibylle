"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/sibylle/supabase";
import { formatCurrency, formatDateTime } from "@/lib/sibylle/crm";
import { useDebounce } from "@/lib/sibylle/hooks";

type SearchType = "page" | "action" | "customer" | "invoice" | "project" | "document" | "appointment" | "selftest";

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  type: SearchType;
  href: string;
  keywords?: string[];
}

const staticPages: SearchResult[] = [
  { id: "p-dash", title: "Dashboard", type: "page", href: "/crm", keywords: ["übersicht", "start"] },
  { id: "p-cust", title: "Kunden", subtitle: "Kunden-Datenbank", type: "page", href: "/crm/customers", keywords: ["kontakte", "klienten", "telefon", "email"] },
  { id: "p-proj", title: "Projekte", subtitle: "Projekt-Board", type: "page", href: "/crm/projects", keywords: ["aufgaben", "board", "planung"] },
  { id: "p-fin", title: "Finanzen", subtitle: "Rechnungen & Umsatz", type: "page", href: "/crm/finances", keywords: ["rechnung", "umsatz", "bezahlt", "offen"] },
  { id: "p-doc", title: "Dokumente", subtitle: "Tresor & Vorlagen", type: "page", href: "/crm/documents", keywords: ["dateien", "upload", "vertrag", "pdf"] },
  { id: "p-cal", title: "Kalender", subtitle: "Termin-Übersicht", type: "page", href: "/crm/calendar", keywords: ["termine", "zoom", "telefon"] },
  { id: "p-mail", title: "E-Mail", subtitle: "Eingang, Ausgang und Versand", type: "page", href: "/crm/mail", keywords: ["mail", "email", "smtp", "imap", "postfach", "eingang", "ausgang"] },
  { id: "p-ava", title: "Freigaben", subtitle: "Öffentliche Terminfreigaben", type: "page", href: "/crm/availability", keywords: ["buchung", "landingpage", "reserviert"] },
  { id: "p-self", title: "Selbsttest", subtitle: "Beziehungs-Kompass und Inneres Schloss Leads", type: "page", href: "/crm/selbsttest", keywords: ["kompass", "schloss", "lead", "whatsapp", "email", "beziehung"] },
  { id: "p-stats", title: "Analyse", subtitle: "Performance & Kennzahlen", type: "page", href: "/crm/stats", keywords: ["statistik", "auswertung", "zahlen"] },
  { id: "p-settings", title: "Einstellungen", subtitle: "Rechnungs- und CRM-Daten", type: "page", href: "/crm/settings", keywords: ["ust", "iban", "logo", "adresse"] },
];

const actions: SearchResult[] = [
  { id: "a-ncust", title: "Neuer Kunde", subtitle: "Kontakt anlegen", type: "action", href: "/crm/customers?new=1", keywords: ["erstellen", "kontakt"] },
  { id: "a-ninv", title: "Rechnung erstellen", subtitle: "Finanz-Management", type: "action", href: "/crm/finances?new=1", keywords: ["angebot", "zahlung"] },
  { id: "a-ndoc", title: "Dokument hochladen", subtitle: "Dokumenten-Tresor", type: "action", href: "/crm/documents?new=1", keywords: ["datei", "upload"] },
  { id: "a-napp", title: "Termin anlegen", subtitle: "Kalender", type: "action", href: "/crm/calendar?new=1", keywords: ["kalender", "meeting"] },
  { id: "a-navail", title: "Termin freigeben", subtitle: "Landingpage-Kalender", type: "action", href: "/crm/availability?new=1", keywords: ["frei", "öffentlich"] },
];

function normalize(value: unknown) {
  return String(value ?? "").toLowerCase().trim();
}

function matches(result: SearchResult, query: string) {
  const haystack = [result.title, result.subtitle, result.type, ...(result.keywords || [])].map(normalize).join(" ");
  return haystack.includes(query);
}

function containsAny(row: Record<string, unknown>, query: string) {
  return Object.values(row).some((value) => normalize(value).includes(query));
}

function relationName(relation: any) {
  if (Array.isArray(relation)) return relation[0]?.name || "";
  return relation?.name || "";
}

function uniqueResults(results: SearchResult[]) {
  const seen = new Set<string>();
  return results.filter((result) => {
    const key = `${result.type}:${result.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 250);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    let cancelled = false;

    async function searchData() {
      setIsLoading(true);
      const q = normalize(debouncedQuery);
      const searchResults: SearchResult[] = [
        ...staticPages.filter((page) => matches(page, q)),
        ...actions.filter((action) => matches(action, q)),
      ];

      try {
        const [customersRes, invoicesRes, projectsRes, documentsRes, appointmentsRes, selbsttestsRes] = await Promise.all([
          supabase
            .from("customers")
            .select("id, name, email, phone, address, status, plan, notes, last_contact")
            .order("updated_at", { ascending: false })
            .limit(250),
          supabase
            .from("invoices")
            .select("id, amount, status, due_date, notes, customers(name)")
            .order("created_at", { ascending: false })
            .limit(250),
          supabase
            .from("projects")
            .select("id, title, description, column_name, priority, customers(name)")
            .order("updated_at", { ascending: false })
            .limit(250),
          supabase
            .from("documents")
            .select("id, file_name, category, file_size, created_at, customers(name)")
            .order("created_at", { ascending: false })
            .limit(250),
          supabase
            .from("appointments")
            .select("id, title, appointment_type, status, booking_status, booked_name, booked_email, booked_phone, booked_message, start_time, customers(name)")
            .order("start_time", { ascending: false })
            .limit(250),
          supabase
            .from("selbsttests")
            .select("id, vorname, email, telefonnummer, ergebnis_score, ergebnis_typ, created_at")
            .order("created_at", { ascending: false })
            .limit(250),
        ]);

        customersRes.data?.filter((customer) => containsAny(customer, q)).slice(0, 8).forEach((customer) => {
          searchResults.push({
            id: customer.id,
            title: customer.name,
            subtitle: `Kunde • ${customer.email || customer.phone || customer.status || "Kontaktprofil"}`,
            type: "customer",
            href: `/crm/customers?focus=${customer.id}`,
          });
        });

        invoicesRes.data?.filter((invoice: any) => containsAny({ ...invoice, customer: relationName(invoice.customers), amount_formatted: formatCurrency(invoice.amount) }, q)).slice(0, 8).forEach((invoice: any) => {
          const customerName = relationName(invoice.customers);
          searchResults.push({
            id: invoice.id,
            title: invoice.id,
            subtitle: `Rechnung • ${formatCurrency(invoice.amount)} • ${invoice.status}${customerName ? ` • ${customerName}` : ""}`,
            type: "invoice",
            href: `/crm/finances?focus=${invoice.id}`,
          });
        });

        projectsRes.data?.filter((project: any) => containsAny({ ...project, customer: relationName(project.customers) }, q)).slice(0, 8).forEach((project: any) => {
          const customerName = relationName(project.customers);
          searchResults.push({
            id: project.id,
            title: project.title,
            subtitle: `Projekt • ${project.column_name}${customerName ? ` • ${customerName}` : ""}`,
            type: "project",
            href: "/crm/projects",
          });
        });

        documentsRes.data?.filter((document: any) => containsAny({ ...document, customer: relationName(document.customers) }, q)).slice(0, 8).forEach((document: any) => {
          const customerName = relationName(document.customers);
          searchResults.push({
            id: document.id,
            title: document.file_name,
            subtitle: `Dokument • ${document.category}${document.file_size ? ` • ${document.file_size}` : ""}${customerName ? ` • ${customerName}` : ""}`,
            type: "document",
            href: `/crm/documents?focus=${document.id}`,
          });
        });

        appointmentsRes.data?.filter((appointment: any) => containsAny({ ...appointment, customer: relationName(appointment.customers), start_formatted: formatDateTime(appointment.start_time) }, q)).slice(0, 8).forEach((appointment: any) => {
          const customerName = relationName(appointment.customers);
          searchResults.push({
            id: appointment.id,
            title: appointment.title,
            subtitle: `Termin • ${formatDateTime(appointment.start_time)} • ${appointment.status}${customerName ? ` • ${customerName}` : ""}`,
            type: "appointment",
            href: "/crm/calendar",
          });
        });

        selbsttestsRes.data?.filter((lead) => containsAny(lead, q)).slice(0, 8).forEach((lead: any) => {
          const score = lead.ergebnis_score?.energy || lead.ergebnis_score?.authenticity
            ? ` • ${lead.ergebnis_score?.energy ?? 0}% Energie / ${lead.ergebnis_score?.authenticity ?? 0}% Authentizität`
            : "";
          const contact = lead.email || lead.telefonnummer || "ohne Kontakt";
          searchResults.push({
            id: lead.id,
            title: lead.vorname,
            subtitle: `Selbsttest • ${lead.ergebnis_typ}${score} • ${contact}`,
            type: "selftest",
            href: `/crm/selbsttest?focus=${lead.id}`,
          });
        });

        if (customersRes.error || invoicesRes.error || projectsRes.error || documentsRes.error || appointmentsRes.error || selbsttestsRes.error) {
          console.error("Search errors:", {
            customers: customersRes.error,
            invoices: invoicesRes.error,
            projects: projectsRes.error,
            documents: documentsRes.error,
            appointments: appointmentsRes.error,
            selbsttests: selbsttestsRes.error,
          });
        }
      } catch (error) {
        console.error("Search error:", error);
      }

      if (!cancelled) {
        setResults(uniqueResults(searchResults).filter((result) => containsAny(result as unknown as Record<string, unknown>, q) || matches(result, q)));
        setIsLoading(false);
      }
    }

    searchData();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const selectResult = (href: string) => {
    router.push(href);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <>
      <div className="relative hidden sm:block">
        <span className="absolute inset-y-0 left-4 flex items-center text-gold/50">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Suchen... (Cmd+K)"
          className="w-80 rounded-full border border-gold/10 bg-mist/10 py-2.5 pl-11 pr-4 text-sm text-warmBlack transition-all focus:border-gold/30 focus:bg-white focus:outline-none"
          onClick={() => setIsOpen(true)}
          readOnly
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-32">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-warmBlack/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative mx-4 w-full max-w-2xl overflow-hidden rounded-[32px] border border-gold/20 bg-white shadow-2xl"
              ref={searchRef}
            >
              <div className="flex items-center border-b border-gold/10 p-6">
                <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  autoFocus
                  className="ml-4 w-full bg-transparent text-xl text-warmBlack outline-none placeholder:text-gold/40"
                  placeholder="Wonach suchen Sie? Kunden, Termine, Rechnungen..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && results.length > 0) {
                      selectResult(results[0].href);
                    }
                  }}
                />
                {isLoading && (
                  <svg className="h-5 w-5 animate-spin text-gold" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4">
                {query.length < 2 ? (
                  <div className="p-8 text-center">
                    <p className="text-deepGold/60">Tippen Sie mindestens 2 Zeichen, um die globale CRM-Suche zu starten.</p>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      {staticPages.slice(1, 5).map((page) => (
                        <button
                          key={page.id}
                          onClick={() => selectResult(page.href)}
                          className="flex items-center gap-4 rounded-2xl border border-gold/10 p-4 text-left transition-all hover:bg-gold/5"
                        >
                          <ResultIcon type="page" />
                          <div>
                            <div className="font-bold text-warmBlack">{page.title}</div>
                            <div className="text-xs text-deepGold/50">Seite öffnen</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-2">
                    {results.map((result) => (
                      <button
                        key={`${result.type}-${result.id}`}
                        onClick={() => selectResult(result.href)}
                        className="group flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all hover:bg-gold/5"
                      >
                        <ResultIcon type={result.type} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-bold text-warmBlack group-hover:text-deepGold">{result.title}</div>
                          {result.subtitle && <div className="truncate text-xs text-deepGold/50">{result.subtitle}</div>}
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gold/40">
                          {typeLabel(result.type)}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <p className="italic text-deepGold/60">Keine Ergebnisse für "{query}" gefunden.</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-gold/10 bg-mist/5 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gold/40">
                <div className="flex gap-4">
                  <span><kbd className="rounded border border-gold/20 bg-white px-1.5 py-0.5 text-deepGold">Enter</kbd> Auswählen</span>
                  <span><kbd className="rounded border border-gold/20 bg-white px-1.5 py-0.5 text-deepGold">Esc</kbd> Schließen</span>
                </div>
                <div>Globale CRM-Suche</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function typeLabel(type: SearchType) {
  const labels: Record<SearchType, string> = {
    page: "Seite",
    action: "Aktion",
    customer: "Kunde",
    invoice: "Rechnung",
    project: "Projekt",
    document: "Dokument",
    appointment: "Termin",
    selftest: "Selbsttest",
  };
  return labels[type];
}

function ResultIcon({ type }: { type: SearchType }) {
  return (
    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
      type === "page" ? "bg-mist/20 text-deepGold" :
      type === "action" ? "bg-gold/10 text-deepGold" :
      type === "customer" ? "bg-sand/30 text-deepGold" :
      "bg-cream text-deepGold"
    }`}>
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {type === "page" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
        {type === "action" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />}
        {type === "customer" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
        {type === "invoice" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />}
        {type === "project" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />}
        {type === "document" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />}
        {type === "appointment" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
        {type === "selftest" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h6m-7 4h8m-8 4h5m-7 8h12a2 2 0 002-2V7.5a2 2 0 00-.586-1.414l-3.5-3.5A2 2 0 0014.5 2H6a2 2 0 00-2 2v15a2 2 0 002 2z" />}
      </svg>
    </div>
  );
}
