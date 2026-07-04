"use client";

import { motion } from "framer-motion";

export default function StatsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-warmBlack">Analyse & Performance</h1>
        <p className="text-deepGold/70">Detaillierte Einblicke in Ihr Business-Wachstum und Coaching-Kennzahlen.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Revenue Chart Placeholder */}
        <div className="rounded-[32px] border border-gold/15 bg-white p-8 shadow-soft">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-warmBlack">Umsatzentwicklung</h2>
            <select className="rounded-lg border border-gold/10 bg-mist/5 px-3 py-1 text-sm text-deepGold outline-none">
              <option>Letzte 6 Monate</option>
              <option>Letztes Jahr</option>
            </select>
          </div>
          <div className="relative h-64 w-full flex items-end justify-between gap-2 px-4">
            {[0, 0, 0, 0, 0, 0].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="w-full rounded-t-xl bg-gradient-to-t from-deepGold to-softGold opacity-80"
              />
            ))}
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-bold uppercase tracking-widest text-deepGold/40 px-4">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mär</span>
            <span>Apr</span>
            <span>Mai</span>
            <span>Jun</span>
          </div>
        </div>

        {/* Client Conversion Stats */}
        <div className="rounded-[32px] border border-gold/15 bg-white p-8 shadow-soft">
          <h2 className="text-xl font-bold text-warmBlack mb-6">Konversions-Trichter</h2>
          <div className="space-y-6">
            {[
              { label: "Website Besucher", value: "0", percent: 0 },
              { label: "Anfragen", value: "0", percent: 0 },
              { label: "Erstgespräche", value: "0", percent: 0 },
              { label: "Neue Kunden", value: "0", percent: 0 },
            ].map((item, i) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-warmBlack">{item.label}</span>
                  <span className="text-deepGold font-bold">{item.value}</span>
                </div>
                <div className="h-3 w-full rounded-full bg-mist/20 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className="h-full bg-softGold"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specialty Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[32px] bg-white p-8 border border-gold/15 shadow-soft text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-deepGold/60 mb-2">Beliebtestes Programm</div>
          <div className="text-xl font-bold text-warmBlack">-</div>
          <div className="mt-2 text-sm text-softGold">0% aller Buchungen</div>
        </div>

        <div className="rounded-[32px] bg-white p-8 border border-gold/15 shadow-soft text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-deepGold/60 mb-2">Klienten-Zufriedenheit</div>
          <div className="text-xl font-bold text-warmBlack">- / 5.0</div>
          <div className="mt-2 text-sm text-softGold">Noch keine Feedbacks</div>
        </div>

        <div className="rounded-[32px] bg-white p-8 border border-gold/15 shadow-soft text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-deepGold/60 mb-2">Durchschn. Kundenwert</div>
          <div className="text-xl font-bold text-warmBlack">0,00 €</div>
          <div className="mt-2 text-sm text-softGold">Lifetime Value</div>
        </div>
      </div>
    </div>
  );
}
