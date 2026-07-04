"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/sibylle/supabase";
import { formatDateTime } from "@/lib/sibylle/crm";

type SelbsttestLead = {
  id: string;
  vorname: string;
  telefonnummer: string;
  ergebnis_typ: string;
  created_at: string;
};

export default function CrmSelbsttestPage() {
  const [leads, setLeads] = useState<SelbsttestLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    const { data, error } = await supabase
      .from("selbsttests")
      .select("id, vorname, telefonnummer, ergebnis_typ, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Selbsttest-Leads konnten nicht geladen werden.");
    }

    setLeads(data || []);
    setLoading(false);
  }

  const todayCount = leads.filter((lead) => new Date(lead.created_at).toDateString() === new Date().toDateString()).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-[32px] border border-gold/15 bg-white p-8 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-softGold">CRM Selbsttest</p>
          <h1 className="mt-2 text-3xl font-bold text-warmBlack">Beziehungs-Kompass Leads</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-deepGold/70">
            Alle eingegangenen Selbsttest-Anfragen aus dem Beziehungs-Kompass, chronologisch sortiert.
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
          <table className="w-full text-left">
            <thead className="bg-mist/10 text-xs font-bold uppercase tracking-widest text-deepGold/60">
              <tr>
                <th className="px-8 py-4">Datum</th>
                <th className="px-8 py-4">Vorname</th>
                <th className="px-8 py-4">Telefonnummer</th>
                <th className="px-8 py-4">Ergebnistyp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-10 text-center text-sm italic text-deepGold/40">
                    Daten werden geladen...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-10 text-center text-sm italic text-deepGold/40">
                    Noch keine Selbsttest-Leads vorhanden.
                  </td>
                </tr>
              ) : (
                leads.map((lead, index) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.025 }}
                    className="hover:bg-gold/5"
                  >
                    <td className="px-8 py-5 text-sm text-deepGold/70">{formatDateTime(lead.created_at)}</td>
                    <td className="px-8 py-5 font-semibold text-warmBlack">{lead.vorname}</td>
                    <td className="px-8 py-5 text-deepGold/80">{lead.telefonnummer}</td>
                    <td className="px-8 py-5">
                      <span className="rounded-full bg-sand/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-deepGold">
                        {lead.ergebnis_typ}
                      </span>
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
