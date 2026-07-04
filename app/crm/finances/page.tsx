"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/sibylle/supabase";

export default function FinancesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  async function fetchInvoices() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          customers (
            name
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setInvoices(data || []);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  }

  const totalRevenue = invoices
    .filter(inv => inv.status === 'Bezahlt')
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  const pendingAmount = invoices
    .filter(inv => inv.status !== 'Bezahlt')
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-warmBlack">Finanz-Management</h1>
          <p className="text-deepGold/70">Rechnungen, Angebote und steuerliche Übersicht.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-full border border-gold/20 bg-white px-6 py-3 font-semibold text-deepGold shadow-soft hover:bg-gold/5 transition-all">
            Angebot erstellen
          </button>
          <button className="flex items-center gap-2 rounded-full bg-deepGold px-6 py-3 font-semibold text-white shadow-soft hover:bg-gold transition-all">
            Neue Rechnung
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[32px] bg-white p-8 border border-gold/15 shadow-soft">
          <div className="text-xs font-bold uppercase tracking-widest text-deepGold/60 mb-2">Umsatz (Bezahlt)</div>
          <div className="text-3xl font-bold text-warmBlack">
            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalRevenue)}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-green-600">
            Gesamteinnahmen
          </div>
        </div>
        
        <div className="rounded-[32px] bg-white p-8 border border-gold/15 shadow-soft">
          <div className="text-xs font-bold uppercase tracking-widest text-deepGold/60 mb-2">Offene Forderungen</div>
          <div className="text-3xl font-bold text-warmBlack">
            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(pendingAmount)}
          </div>
          <div className="mt-4 text-xs font-medium text-deepGold/40">{invoices.filter(inv => inv.status !== 'Bezahlt').length} Rechnungen ausstehend</div>
        </div>

        <div className="rounded-[32px] bg-deepGold p-8 text-white shadow-soft">
          <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Steuer-Rücklage (Est. 25%)</div>
          <div className="text-3xl font-bold">
            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalRevenue * 0.25)}
          </div>
          <div className="mt-4 text-xs opacity-70 italic text-white/80">Basierend auf bezahlten Rechnungen</div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-warmBlack">Aktuelle Rechnungen</h2>
        <div className="overflow-hidden rounded-[32px] border border-gold/15 bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gold/10 bg-mist/10">
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-deepGold/60">Nummer</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-deepGold/60">Kunde</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-deepGold/60">Datum</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-deepGold/60">Betrag</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-deepGold/60">Status</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-deepGold/60 text-right">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/5">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-10 text-center text-deepGold/40 italic">
                      Daten werden geladen...
                    </td>
                  </tr>
                ) : invoices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-10 text-center text-deepGold/40 italic">
                      Keine Rechnungen gefunden.
                    </td>
                  </tr>
                ) : (
                  invoices.map((invoice, i) => (
                    <tr key={invoice.id} className="transition-colors hover:bg-gold/5">
                      <td className="px-8 py-5 font-mono text-xs font-bold text-deepGold">{invoice.id}</td>
                      <td className="px-8 py-5 font-semibold text-warmBlack">{invoice.customers?.name || 'Unbekannter Kunde'}</td>
                      <td className="px-8 py-5 text-sm text-deepGold/60">{new Date(invoice.created_at).toLocaleDateString('de-DE')}</td>
                      <td className="px-8 py-5 font-bold text-warmBlack">
                        {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(invoice.amount)}
                      </td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                          invoice.status === "Bezahlt" ? "bg-green-100 text-green-700" :
                          invoice.status === "Offen" ? "bg-blue-100 text-blue-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="text-gold hover:text-deepGold p-2">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
