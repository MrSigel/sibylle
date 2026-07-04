"use client";

import { motion } from "framer-motion";

const categories = [
  { name: "Verträge", count: 12, icon: "folder" },
  { name: "Rechnungen", count: 45, icon: "folder" },
  { name: "Klienten-Notizen", count: 124, icon: "folder" },
  { name: "DSGVO / Rechtliches", count: 8, icon: "folder" },
  { name: "Vorlagen", count: 15, icon: "folder" },
];

const recentDocs = [
  { name: "Coaching-Vertrag_Schmidt_Anna.pdf", date: "Vor 2 Std.", size: "1.2 MB" },
  { name: "Anamnese_Mustermann_Max.docx", date: "Gestern", size: "840 KB" },
  { name: "Steuerunterlagen_Q2_2024.zip", date: "Vor 3 Tagen", size: "15.4 MB" },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-warmBlack">Dokumenten-Tresor</h1>
          <p className="text-deepGold/70">Zentrale Verwaltung aller Unterlagen, Verträge und Notizen.</p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-deepGold px-6 py-3 font-semibold text-white shadow-soft hover:bg-gold transition-all">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4-4m4 4v12" />
          </svg>
          Dokument hochladen
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center justify-center rounded-[32px] border border-gold/15 bg-white p-8 text-center shadow-soft hover:border-gold/30 transition-all cursor-pointer group"
          >
            <div className="mb-4 rounded-2xl bg-sand/30 p-4 text-deepGold group-hover:bg-deepGold group-hover:text-white transition-all">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-warmBlack">{cat.name}</h3>
            <p className="text-xs text-deepGold/50">{cat.count} Dateien</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Files List */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-warmBlack">Zuletzt hinzugefügt</h2>
        <div className="rounded-[32px] border border-gold/15 bg-white shadow-soft overflow-hidden">
          <div className="divide-y divide-gold/5">
            {recentDocs.map((doc, i) => (
              <div key={i} className="flex items-center gap-6 p-6 hover:bg-gold/5 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist/20 text-deepGold">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-warmBlack">{doc.name}</div>
                  <div className="text-xs text-deepGold/50">{doc.date} • {doc.size}</div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-full p-2 text-gold hover:bg-gold/10">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button className="rounded-full p-2 text-gold hover:bg-gold/10">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
