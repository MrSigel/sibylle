"use client";

import { motion } from "framer-motion";

const appointments: any[] = [];

export default function CalendarPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-warmBlack">Termin-Kalender</h1>
          <p className="text-deepGold/70">Verwalten Sie Ihre Coaching-Sitzungen und freien Kapazitäten.</p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-deepGold px-6 py-3 font-semibold text-white shadow-soft hover:bg-gold transition-all">
          Neuer Termin
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Calendar View (Simplified for UI Demo) */}
        <div className="lg:col-span-2 rounded-[32px] border border-gold/15 bg-white p-8 shadow-soft">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold text-warmBlack">Juni 2024</h2>
            <div className="flex gap-2">
              <button className="rounded-full border border-gold/20 p-2 text-gold hover:bg-gold/5 transition-colors">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="rounded-full border border-gold/20 p-2 text-gold hover:bg-gold/5 transition-colors">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map(day => (
              <div key={day} className="pb-4 text-center text-xs font-bold uppercase tracking-widest text-deepGold/40">{day}</div>
            ))}
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i} 
                className="flex h-20 flex-col items-center justify-center rounded-2xl border border-gold/5 bg-mist/5 text-warmBlack hover:border-gold/30 hover:bg-white transition-all cursor-pointer"
              >
                <span className="text-sm font-bold">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Agenda */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-warmBlack">Agenda für Heute</h2>
          <div className="space-y-4">
            {appointments.length > 0 ? (
              appointments.map((apt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative flex gap-4 rounded-2xl border border-gold/15 bg-white p-5 shadow-soft hover:border-gold/30"
                >
                  <div className="flex flex-col items-center border-r border-gold/10 pr-4">
                    <span className="text-sm font-bold text-warmBlack">{apt.time}</span>
                    <div className="mt-2 h-2 w-2 rounded-full bg-softGold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-warmBlack">{apt.title}</h3>
                    <p className="text-sm text-deepGold/60">{apt.client}</p>
                    <div className="mt-2 inline-flex rounded-full bg-mist/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-deepGold">
                      {apt.type}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-10 text-center text-deepGold/40 italic text-sm border border-gold/10 rounded-2xl bg-white">
                Keine Termine für heute.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
