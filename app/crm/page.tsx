"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Aktive Kunden", value: "124", change: "+12%", icon: "users" },
  { label: "Offene Rechnungen", value: "12.450 €", change: "+5%", icon: "invoice" },
  { label: "Angebote (Offen)", value: "8", change: "-2", icon: "offer" },
  { label: "Anstehende Termine", value: "5 heute", change: "nächste: 14:00", icon: "calendar" },
];

const recentActivity = [
  { user: "Sibylle Bergold", action: "Rechnung #2024-042 erstellt", time: "Vor 10 Min.", type: "invoice" },
  { user: "System", action: "Neues Erstgespräch gebucht: Max Mustermann", time: "Vor 1 Std.", type: "calendar" },
  { user: "Sibylle Bergold", action: "Angebot für 'Team-Aufstellung' versendet", time: "Vor 3 Std.", type: "offer" },
  { user: "System", action: "Kunde 'Anna Schmidt' hat Dokument hochgeladen", time: "Vor 5 Std.", type: "document" },
];

export default function CrmDashboard() {
  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-warmBlack">Guten Tag, Sibylle</h1>
        <p className="text-deepGold/70">Hier ist die Übersicht über Ihr Business heute.</p>
      </div>

      {/* Stats Grid */}
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
                {/* Simplified Icon placeholders */}
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-warmBlack">{stat.value}</div>
                <div className="mt-1 text-xs font-medium text-softGold">{stat.change} im Vgl. zum Vormonat</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-warmBlack">Letzte Aktivitäten</h2>
            <button className="text-sm font-semibold text-deepGold hover:underline">Alle ansehen</button>
          </div>
          
          <div className="rounded-[32px] border border-gold/15 bg-white p-2 shadow-soft overflow-hidden">
            <div className="divide-y divide-gold/5">
              {recentActivity.map((activity, i) => (
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
              ))}
            </div>
          </div>
        </div>

        {/* Shortcuts / Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-warmBlack">Schnellzugriff</h2>
          <div className="grid gap-4">
            <button className="flex items-center gap-4 rounded-2xl border border-gold/15 bg-white p-4 transition-all hover:border-gold/30 hover:shadow-md text-left">
              <div className="rounded-xl bg-sand/30 p-3 text-deepGold">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-warmBlack">Neuer Kunde</div>
                <div className="text-xs text-deepGold/60">Kontakt anlegen</div>
              </div>
            </button>
            
            <button className="flex items-center gap-4 rounded-2xl border border-gold/15 bg-white p-4 transition-all hover:border-gold/30 hover:shadow-md text-left">
              <div className="rounded-xl bg-mist/30 p-3 text-deepGold">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-warmBlack">Rechnung erstellen</div>
                <div className="text-xs text-deepGold/60">PDF Generierung</div>
              </div>
            </button>

            <div className="rounded-[24px] bg-deepGold p-6 text-white shadow-soft">
              <div className="mb-4 text-xs font-bold uppercase tracking-widest opacity-80">System-Status</div>
              <div className="mb-2 text-lg font-bold">Alles im grünen Bereich</div>
              <p className="text-xs leading-relaxed opacity-70">
                Ihre Datenbank ist aktuell und alle 12 geplanten Automatisierungen wurden heute erfolgreich ausgeführt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
