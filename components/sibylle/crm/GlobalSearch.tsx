"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/sibylle/supabase";
import { useDebounce } from "@/lib/sibylle/hooks";

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  type: "page" | "action" | "customer" | "invoice" | "project" | "document";
  href: string;
}

const staticPages: SearchResult[] = [
  { id: "p-dash", title: "Dashboard", type: "page", href: "/crm" },
  { id: "p-cust", title: "Kunden", subtitle: "Kunden-Datenbank", type: "page", href: "/crm/customers" },
  { id: "p-proj", title: "Projekte", subtitle: "Projekt-Board", type: "page", href: "/crm/projects" },
  { id: "p-fin", title: "Finanzen", subtitle: "Rechnungen & Umsatz", type: "page", href: "/crm/finances" },
  { id: "p-doc", title: "Dokumente", subtitle: "Tresor & Vorlagen", type: "page", href: "/crm/documents" },
  { id: "p-cal", title: "Kalender", subtitle: "Termin-Übersicht", type: "page", href: "/crm/calendar" },
  { id: "p-stats", title: "Analyse", subtitle: "Performance & Kennzahlen", type: "page", href: "/crm/stats" },
];

const actions: SearchResult[] = [
  { id: "a-ncust", title: "Neuer Kunde", subtitle: "Kontakt anlegen", type: "action", href: "/crm/customers" },
  { id: "a-ninv", title: "Rechnung erstellen", subtitle: "Finanz-Management", type: "action", href: "/crm/finances" },
  { id: "a-ndoc", title: "Dokument hochladen", subtitle: "Dokumenten-Tresor", type: "action", href: "/crm/documents" },
];

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
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

    const searchData = async () => {
      setIsLoading(true);
      const searchResults: SearchResult[] = [];
      const q = debouncedQuery.toLowerCase();

      // Search static pages & actions
      staticPages.forEach(p => {
        if (p.title.toLowerCase().includes(q) || p.subtitle?.toLowerCase().includes(q)) {
          searchResults.push(p);
        }
      });
      actions.forEach(a => {
        if (a.title.toLowerCase().includes(q) || a.subtitle?.toLowerCase().includes(q)) {
          searchResults.push(a);
        }
      });

      // Search Database via Supabase
      try {
        // 1. Customers
        const { data: customers } = await supabase
          .from("customers")
          .select("id, name, email")
          .ilike("name", `%${debouncedQuery}%`)
          .limit(5);
        
        customers?.forEach(c => {
          searchResults.push({
            id: c.id,
            title: c.name,
            subtitle: `Kunde • ${c.email}`,
            type: "customer",
            href: `/crm/customers` // Ideally link to detail page
          });
        });

        // 2. Invoices
        const { data: invoices } = await supabase
          .from("invoices")
          .select("id, amount, status")
          .ilike("id", `%${debouncedQuery}%`)
          .limit(5);

        invoices?.forEach(inv => {
          searchResults.push({
            id: inv.id,
            title: inv.id,
            subtitle: `Rechnung • ${inv.amount} € • ${inv.status}`,
            type: "invoice",
            href: `/crm/finances`
          });
        });

        // 3. Projects
        const { data: projects } = await supabase
          .from("projects")
          .select("id, title")
          .ilike("title", `%${debouncedQuery}%`)
          .limit(5);

        projects?.forEach(p => {
          searchResults.push({
            id: p.id,
            title: p.title,
            subtitle: "Projekt",
            type: "project",
            href: `/crm/projects`
          });
        });

      } catch (error) {
        console.error("Search error:", error);
      }

      setResults(searchResults);
      setIsLoading(false);
    };

    searchData();
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
          className="w-80 rounded-full border border-gold/10 bg-mist/10 py-2.5 pl-11 pr-4 text-sm text-warmBlack focus:border-gold/30 focus:bg-white focus:outline-none transition-all"
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
              className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-gold/20 bg-white shadow-2xl mx-4"
              ref={searchRef}
            >
              <div className="flex items-center border-b border-gold/10 p-6">
                <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  autoFocus
                  className="ml-4 w-full bg-transparent text-xl text-warmBlack outline-none placeholder:text-gold/40"
                  placeholder="Wonach suchen Sie? (Kunden, Rechnungen, Seiten...)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && results.length > 0) {
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
                    <p className="text-deepGold/60">Tippen Sie mindestens 2 Zeichen, um die Suche zu starten.</p>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      {staticPages.slice(1, 5).map(p => (
                        <button
                          key={p.id}
                          onClick={() => selectResult(p.href)}
                          className="flex items-center gap-4 rounded-2xl border border-gold/10 p-4 text-left transition-all hover:bg-gold/5"
                        >
                          <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-mist/20 flex items-center justify-center text-deepGold">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-bold text-warmBlack">{p.title}</div>
                            <div className="text-xs text-deepGold/50">Seite öffnen</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-2">
                    {results.map((res) => (
                      <button
                        key={res.id}
                        onClick={() => selectResult(res.href)}
                        className="flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all hover:bg-gold/5 group"
                      >
                        <div className={`h-10 w-10 flex-shrink-0 rounded-xl flex items-center justify-center ${
                          res.type === 'page' ? 'bg-mist/20 text-deepGold' :
                          res.type === 'action' ? 'bg-gold/10 text-deepGold' :
                          res.type === 'customer' ? 'bg-sand/30 text-deepGold' :
                          'bg-cream text-deepGold'
                        }`}>
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {res.type === 'page' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                            {res.type === 'action' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />}
                            {res.type === 'customer' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                            {res.type === 'invoice' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />}
                            {res.type === 'project' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />}
                            {res.type === 'document' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />}
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-warmBlack group-hover:text-deepGold">{res.title}</div>
                          {res.subtitle && <div className="text-xs text-deepGold/50">{res.subtitle}</div>}
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gold/40">
                          {res.type}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <p className="text-deepGold/60 italic">Keine Ergebnisse für "{query}" gefunden.</p>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gold/10 bg-mist/5 px-6 py-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gold/40">
                <div className="flex gap-4">
                  <span><kbd className="rounded border border-gold/20 bg-white px-1.5 py-0.5 text-deepGold">Enter</kbd> Auswählen</span>
                  <span><kbd className="rounded border border-gold/20 bg-white px-1.5 py-0.5 text-deepGold">Esc</kbd> Schließen</span>
                </div>
                <div>Global Search</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
