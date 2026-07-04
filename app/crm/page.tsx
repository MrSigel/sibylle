"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/sibylle/supabase";
import Link from "next/link";
import { customerNameFromRelation, formatCurrency } from "@/lib/sibylle/crm";

export default function CrmDashboard() {
  const [stats, setStats] = useState([
    { label: "Aktive Kunden", value: "...", change: "Lade...", icon: "users" },
    { label: "Offene Rechnungen", value: "...", change: "Lade...", icon: "invoice" },
    { label: "Angebote (Offen)", value: "...", change: "Lade...", icon: "offer" },
    { label: "Anstehende Termine", value: "...", change: "Lade...", icon: "calendar" },
  ]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setIsLoading(true);
    try {
      // 1. Fetch Stats
      const { count: activeCustomers } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Aktiv');

      const { data: openInvoices } = await supabase
        .from('invoices')
        .select('amount')
        .eq('status', 'Offen');
      
      const totalOpenAmount = openInvoices?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;

      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      const endOfToday = new Date(startOfToday);
      endOfToday.setDate(endOfToday.getDate() + 1);

      const { count: todayAppointments } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .gte('start_time', startOfToday.toISOString())
        .lt('start_time', endOfToday.toISOString());

      const { count: openOffers } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('column_name', 'Anfrage');

      setStats([
        { label: "Aktive Kunden", value: String(activeCustomers || 0), change: "Aktuell im System", icon: "users" },
        { label: "Offene Rechnungen", value: formatCurrency(totalOpenAmount), change: `${openInvoices?.length || 0} Rechnungen`, icon: "invoice" },
        { label: "Angebote (Offen)", value: String(openOffers || 0), change: "Neue Anfragen", icon: "offer" },
        { label: "Anstehende Termine", value: String(todayAppointments || 0), change: "Termine heute", icon: "calendar" },
      ]);

      // 2. Fetch Recent Activity (Mix of Customers & Invoices)
      const activity: any[] = [];
      
      const { data: newCusts } = await supabase
        .from('customers')
        .select('name, created_at')
        .order('created_at', { ascending: false })
        .limit(3);
      
      newCusts?.forEach(c => activity.push({
        action: `Neuer Kunde: ${c.name}`,
        user: "System",
        time: new Date(c.created_at).toLocaleDateString('de-DE'),
        type: "customer"
      }));

      const { data: newInvs } = await supabase
        .from('invoices')
        .select('id, amount, customers(name), created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      newInvs?.forEach(i => {
        const customerName = customerNameFromRelation((i as any).customers);
        activity.push({
          action: `Rechnung ${i.id} für ${customerName || 'Kunde'} erstellt`,
          user: "Sibylle",
          time: new Date(i.created_at).toLocaleDateString('de-DE'),
          type: "invoice"
        });
      });

      setRecentActivity(activity.slice(0, 5));

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-warmBlack">Guten Tag, Sibylle</h1>
        <p className="text-deepGold/70">Hier ist die Übersicht über Ihr Business heute.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-[24px] border border-gold/15 bg-white p-6 shadow-soft"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-deepGold/60">
                {stat.label}
              </span>
              <div className="rounded-full bg-gold/10 p-2 text-deepGold">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-warmBlack">{stat.value}</div>
                <div className="mt-1 text-xs font-medium text-softGold">{stat.change}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-warmBlack">Letzte Aktivitäten</h2>
          </div>
          
          <div className="rounded-[32px] border border-gold/15 bg-white p-2 shadow-soft overflow-hidden">
            <div className="divide-y divide-gold/5">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 transition-colors hover:bg-gold/5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist/20 text-deepGold">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-warmBlack">{activity.action}</div>
                      <div className="text-xs text-deepGold/50">{activity.user} • {activity.time}</div>
                    </div>
                    <div className="rounded-full border border-gold/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-deepGold">
                      {activity.type}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-deepGold/40 italic text-sm">
                  Keine aktuellen Aktivitäten vorhanden.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-warmBlack">Schnellzugriff</h2>
          <div className="grid gap-4">
            <Link href="/crm/customers" className="flex items-center gap-4 rounded-2xl border border-gold/15 bg-white p-4 transition-all hover:border-gold/30 hover:shadow-md text-left">
              <div className="rounded-xl bg-sand/30 p-3 text-deepGold">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-warmBlack">Neuer Kunde</div>
                <div className="text-xs text-deepGold/60">Kontakt anlegen</div>
              </div>
            </Link>
            
            <Link href="/crm/finances" className="flex items-center gap-4 rounded-2xl border border-gold/15 bg-white p-4 transition-all hover:border-gold/30 hover:shadow-md text-left">
              <div className="rounded-xl bg-mist/30 p-3 text-deepGold">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-warmBlack">Rechnung erstellen</div>
                <div className="text-xs text-deepGold/60">PDF Generierung</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
