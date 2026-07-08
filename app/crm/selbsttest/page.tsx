"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/sibylle/supabase";
import { formatDateTime } from "@/lib/sibylle/crm";
import { useCrmDeepLink } from "@/lib/sibylle/hooks";

type Score = { energy?: number; authenticity?: number } | null;

type SelbsttestLead = {
  id: string;
  vorname: string;
  email: string | null;
  telefonnummer: string | null;
  ergebnis_score: Score;
  ergebnis_typ: string;
  created_at: string;
};

function scoreLabel(score: Score) {
  if (!score?.energy && !score?.authenticity) return "";
  return `${score.energy ?? 0}% Energie / ${score.authenticity ?? 0}% Authentizität`;
}

function selftestLabel(score: Score) {
  return score?.energy || score?.authenticity ? "Inneres Schloss" : "Beziehungs-Kompass";
}

function resultLabel(lead: SelbsttestLead) {
  const score = scoreLabel(lead.ergebnis_score);
  return score ? `${score} · ${lead.ergebnis_typ}` : lead.ergebnis_typ;
}

function whatsAppHref(phone: string) {
  const normalized = phone.replace(/[^\d+]/g, "");
  return `https://wa.me/${normalized.replace(/^\+/, "")}`;
}

export default function CrmSelbsttestPage() {
  const [leads, setLeads] = useState<SelbsttestLead[]>([]);
  const [loading, setLoading] = useState(true);
  const { focusId } = useCrmDeepLink();
  const focusRef = useRef<HTMLTableRowElement | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (focusId && !loading && focusRef.current) {
      focusRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [focusId, loading]);

  async function fetchLeads() {
    setLoading(true);
    const { data, error } = await supabase
      .from("selbsttests")
      .select("id, vorname, email, telefonnummer, ergebnis_score, ergebnis_typ, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Selbsttest-Leads konnten nicht geladen werden.");
    }

    setLeads(data || []);
    setLoading(false);
  }

  async function deleteLead(lead: SelbsttestLead) {
    const confirmed = window.confirm(`Selbsttest-Lead von ${lead.vorname} wirklich löschen?`);
    if (!confirmed) return;

    const { error } = await supabase.from("selbsttests").delete().eq("id", lead.id);
    if (error) {
      console.error(error);
      alert("Der Selbsttest-Lead konnte nicht gelöscht werden.");
      return;
    }

    setLeads((current) => current.filter((item) => item.id !== lead.id));
  }

  const todayCount = leads.filter((lead) => new Date(lead.created_at).toDateString() === new Date().toDateString()).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-[32px] border border-gold/15 bg-white p-8 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-softGold">CRM Selbsttest</p>
          <h1 className="mt-2 text-3xl font-bold text-warmBlack">Selbsttest-Leads</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-deepGold/70">
            Beziehungs-Kompass und Inneres Schloss mit Kontaktdaten, Spielergebnis und Selbsttest-Herkunft.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchLeads}
          className="rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-deepGold transition hover:bg-gold/5"
        >
          Aktualisieren
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Stat label="Leads gesamt" value={String(leads.length)} />
        <Stat label="Heute" value={String(todayCount)} />
        <Stat label="Neuester Typ" value={leads[0]?.ergebnis_typ || "-"} compact />
      </div>

      <div className="overflow-hidden rounded-[32px] border border-gold/15 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead className="bg-mist/10 text-xs font-bold uppercase tracking-widest text-deepGold/60">
              <tr>
                <th className="px-8 py-4">Datum</th>
                <th className="px-8 py-4">Vorname</th>
                <th className="px-8 py-4">Spielergebnis</th>
                <th className="px-8 py-4">Kontakt</th>
                <th className="px-8 py-4">Selbsttest</th>
                <th className="px-8 py-4 text-right">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-10 text-center text-sm italic text-deepGold/40">
                    Daten werden geladen...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-10 text-center text-sm italic text-deepGold/40">
                    Noch keine Selbsttest-Leads vorhanden.
                  </td>
                </tr>
              ) : (
                leads.map((lead, index) => (
                  <motion.tr
                    ref={focusId === lead.id ? focusRef : undefined}
                    key={lead.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.025 }}
                    className={`hover:bg-gold/5 ${focusId === lead.id ? "bg-gold/10 ring-2 ring-inset ring-gold/50" : ""}`}
                  >
                    <td className="px-8 py-5 text-sm text-deepGold/70">{formatDateTime(lead.created_at)}</td>
                    <td className="px-8 py-5 font-semibold text-warmBlack">{lead.vorname}</td>
                    <td className="px-8 py-5 text-sm text-deepGold/70">{resultLabel(lead)}</td>
                    <td className="px-8 py-5">
                      <div className="space-y-1 text-sm">
                        {lead.email && <a href={`mailto:${lead.email}`} className="block font-semibold text-deepGold hover:text-gold">{lead.email}</a>}
                        {lead.telefonnummer && <a href={whatsAppHref(lead.telefonnummer)} target="_blank" rel="noreferrer" className="block font-semibold text-deepGold hover:text-gold">WhatsApp: {lead.telefonnummer}</a>}
                        {!lead.email && !lead.telefonnummer && <span className="text-deepGold/35">Kein Kontakt hinterlegt</span>}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="rounded-full bg-sand/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-deepGold">
                        {selftestLabel(lead.ergebnis_score)}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        type="button"
                        onClick={() => deleteLead(lead)}
                        className="rounded-full border border-red-200 px-4 py-2 text-xs font-bold text-red-500 transition hover:bg-red-50"
                      >
                        Löschen
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, compact }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className="rounded-[32px] border border-gold/15 bg-white p-7 shadow-soft">
      <div className="mb-2 text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</div>
      <div className={`${compact ? "text-lg" : "text-3xl"} font-bold text-warmBlack`}>{value}</div>
    </div>
  );
}
