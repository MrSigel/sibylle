"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/sibylle/supabase";
import { formatCurrency } from "@/lib/sibylle/crm";

export default function StatsPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);
    setError("");
    try {
      const results = await Promise.all([
        supabase.from("customers").select("*"),
        supabase.from("invoices").select("*"),
        supabase.from("projects").select("*"),
        supabase.from("appointments").select("*"),
      ]);
      const failed = results.find((result) => result.error);
      if (failed?.error) throw failed.error;
      const [custs, invs, projs, appts] = results.map((result) => result.data || []);
      setCustomers(custs);
      setInvoices(invs);
      setProjects(projs);
      setAppointments(appts);
    } catch (statsError) {
      console.error(statsError);
      setError("Kennzahlen konnten nicht geladen werden. Bitte prüfe die Verbindung.");
    } finally {
      setLoading(false);
    }
  }

  const monthRevenue = useMemo(() => {
    const labels = Array.from({ length: 6 }).map((_, index) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - index));
      return date;
    });
    const values = labels.map((date) => invoices
      .filter((invoice) => invoice.status === "Bezahlt")
      .filter((invoice) => {
        const created = new Date(invoice.created_at);
        return created.getMonth() === date.getMonth() && created.getFullYear() === date.getFullYear();
      })
      .reduce((sum, invoice) => sum + Number(invoice.amount), 0));
    const max = Math.max(...values, 1);
    return labels.map((date, index) => ({
      label: date.toLocaleDateString("de-DE", { month: "short" }),
      value: values[index],
      height: Math.round((values[index] / max) * 100),
    }));
  }, [invoices]);

  const funnel = [
    { label: "Anfragen", value: projects.filter((p) => p.column_name === "Anfrage").length },
    { label: "Erstgespräche", value: appointments.length },
    { label: "Aktive Kunden", value: customers.filter((c) => c.status === "Aktiv").length },
    { label: "Bezahlte Rechnungen", value: invoices.filter((i) => i.status === "Bezahlt").length },
  ];
  const funnelMax = Math.max(...funnel.map((item) => item.value), 1);

  const planCounts = customers.reduce<Record<string, number>>((acc, customer) => {
    if (customer.plan) acc[customer.plan] = (acc[customer.plan] || 0) + 1;
    return acc;
  }, {});
  const topPlan = Object.entries(planCounts).sort((a, b) => b[1] - a[1])[0];
  const paidRevenue = invoices.filter((invoice) => invoice.status === "Bezahlt").reduce((sum, invoice) => sum + Number(invoice.amount), 0);
  const averageCustomerValue = customers.length ? paidRevenue / customers.length : 0;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-warmBlack">Analyse & Performance</h1>
        <p className="text-deepGold/70">Detaillierte Einblicke in Ihr Business-Wachstum und Coaching-Kennzahlen.</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}
      {loading && !error && (
        <div className="rounded-[32px] border border-gold/15 bg-white p-10 text-sm italic text-deepGold/50 shadow-soft">
          Kennzahlen werden geladen...
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[32px] border border-gold/15 bg-white p-8 shadow-soft">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-warmBlack">Umsatzentwicklung</h2>
            <span className="rounded-lg border border-gold/10 bg-mist/5 px-3 py-1 text-sm text-deepGold">Letzte 6 Monate</span>
          </div>
          <div className="relative flex h-64 w-full items-end justify-between gap-2 px-4">
            {monthRevenue.map((month, i) => (
              <motion.div key={month.label} title={formatCurrency(month.value)} initial={{ height: 0 }} animate={{ height: `${month.height}%` }} transition={{ duration: 1, delay: i * 0.1 }} className="w-full rounded-t-xl bg-gradient-to-t from-deepGold to-softGold opacity-80" />
            ))}
          </div>
          <div className="mt-4 flex justify-between px-4 text-[10px] font-bold uppercase tracking-widest text-deepGold/40">
            {monthRevenue.map((month) => <span key={month.label}>{month.label}</span>)}
          </div>
        </div>

        <div className="rounded-[32px] border border-gold/15 bg-white p-8 shadow-soft">
          <h2 className="mb-6 text-xl font-bold text-warmBlack">Konversions-Trichter</h2>
          <div className="space-y-6">
            {funnel.map((item, i) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-warmBlack">{item.label}</span>
                  <span className="font-bold text-deepGold">{item.value}</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-mist/20">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.round((item.value / funnelMax) * 100)}%` }} transition={{ duration: 1, delay: i * 0.2 }} className="h-full bg-softGold" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Metric label="Beliebtestes Programm" value={topPlan?.[0] || "-"} subline={topPlan ? `${Math.round((topPlan[1] / Math.max(customers.length, 1)) * 100)}% aller Kontakte` : "Noch keine Programme"} />
        <Metric label="Abgeschlossene Termine" value={String(appointments.filter((apt) => apt.status === "Abgeschlossen").length)} subline="Dokumentierte Sitzungen" />
        <Metric label="Durchschn. Kundenwert" value={formatCurrency(averageCustomerValue)} subline="Lifetime Value" />
      </div>
    </div>
  );
}

function Metric({ label, value, subline }: { label: string; value: string; subline: string }) {
  return (
    <div className="rounded-[32px] border border-gold/15 bg-white p-8 text-center shadow-soft">
      <div className="mb-2 text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</div>
      <div className="text-xl font-bold text-warmBlack">{value}</div>
      <div className="mt-2 text-sm text-softGold">{subline}</div>
    </div>
  );
}
