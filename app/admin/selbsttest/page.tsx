"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "@/lib/sibylle/supabase";
import { formatDateTime } from "@/lib/sibylle/crm";

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

export default function SelbsttestAdminPage() {
  const [leads, setLeads] = useState<SelbsttestLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

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
    <main className="min-h-screen bg-[#100f0d] p-6 text-cream lg:p-10">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(183,138,74,0.18),transparent_32%),linear-gradient(180deg,rgba(16,15,13,0),#100f0d_70%)]" />
      <div className="relative mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 rounded-[32px] border border-gold/20 bg-white/[0.04] p-8 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative h-12 w-36 rounded-2xl bg-white/90 p-2">
              <Image src="/assets/sibylle/brand/logo-header.png" alt="Sibylle Bergold" fill className="object-contain object-left p-2" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold/70">Admin CRM</p>
              <h1 className="mt-1 text-3xl font-bold text-white">Selbsttest-Leads</h1>
              <p className="mt-1 text-sm text-cream/60">Beziehungs-Kompass und Inneres Schloss mit Spielergebnis und Kontaktweg.</p>
            </div>
          </div>
          <Link href="/crm/selbsttest" className="rounded-full border border-gold/25 px-5 py-3 text-sm font-bold text-gold transition hover:bg-gold/10">
            Zur CRM-Ansicht
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Stat label="Leads gesamt" value={String(leads.length)} />
          <Stat label="Heute" value={String(todayCount)} />
          <Stat label="Neuester Typ" value={leads[0]?.ergebnis_typ || "-"} compact />
        </div>

        <div className="overflow-hidden rounded-[32px] border border-gold/20 bg-white/[0.04] shadow-2xl backdrop-blur">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left">
              <thead className="bg-black/20 text-xs font-bold uppercase tracking-widest text-gold/60">
                <tr>
                  <th className="px-8 py-4">Datum</th>
                  <th className="px-8 py-4">Vorname</th>
                  <th className="px-8 py-4">Spielergebnis</th>
                  <th className="px-8 py-4">Kontaktdaten</th>
                  <th className="px-8 py-4">Selbsttest</th>
                  <th className="px-8 py-4 text-right">Aktion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10">
                {loading ? (
                  <tr><td colSpan={6} className="px-8 py-10 text-center text-sm italic text-cream/40">Daten werden geladen...</td></tr>
                ) : leads.length === 0 ? (
                  <tr><td colSpan={6} className="px-8 py-10 text-center text-sm italic text-cream/40">Noch keine Selbsttest-Leads vorhanden.</td></tr>
                ) : leads.map((lead, index) => (
                  <motion.tr key={lead.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.025 }} className="hover:bg-gold/5">
                    <td className="px-8 py-5 text-sm text-cream/55">{formatDateTime(lead.created_at)}</td>
                    <td className="px-8 py-5 font-semibold text-white">{lead.vorname}</td>
                    <td className="px-8 py-5 text-sm text-cream/70">{resultLabel(lead)}</td>
                    <td className="px-8 py-5">
                      <div className="space-y-1 text-sm">
                        {lead.email && <a href={`mailto:${lead.email}`} className="block text-gold hover:text-cream">{lead.email}</a>}
                        {lead.telefonnummer && <a href={whatsAppHref(lead.telefonnummer)} target="_blank" rel="noreferrer" className="block text-gold hover:text-cream">WhatsApp: {lead.telefonnummer}</a>}
                        {!lead.email && !lead.telefonnummer && <span className="text-cream/35">Kein Kontakt hinterlegt</span>}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                        {selftestLabel(lead.ergebnis_score)}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        type="button"
                        onClick={() => deleteLead(lead)}
                        className="rounded-full border border-red-400/30 px-4 py-2 text-xs font-bold text-red-200 transition hover:bg-red-500/10 hover:text-white"
                      >
                        Löschen
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value, compact }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className="rounded-[32px] border border-gold/20 bg-white/[0.04] p-7 shadow-2xl backdrop-blur">
      <div className="mb-2 text-xs font-bold uppercase tracking-widest text-gold/60">{label}</div>
      <div className={`${compact ? "text-lg" : "text-3xl"} font-bold text-white`}>{value}</div>
    </div>
  );
}
