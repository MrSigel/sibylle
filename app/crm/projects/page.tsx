"use client";

import { motion } from "framer-motion";

const columns = [
  {
    title: "Anfrage",
    tasks: [
      { id: 1, title: "Erstgespräch Müller", client: "Peter Müller", type: "Coaching" },
      { id: 2, title: "Anfrage Team-Aufstellung", client: "TechCorp GmbH", type: "Business" },
    ]
  },
  {
    title: "In Planung",
    tasks: [
      { id: 3, title: "Analyse Ahnenmuster", client: "Anna Schmidt", type: "Methodik" },
    ]
  },
  {
    title: "In Umsetzung",
    tasks: [
      { id: 4, title: "8-Wochen Programm", client: "Sarah Meyer", type: "Intensiv" },
      { id: 5, title: "Systemische Klärung", client: "Julia Weber", type: "Session" },
    ]
  },
  {
    title: "Abgeschlossen",
    tasks: [
      { id: 6, title: "Abschluss-Session", client: "Max Mustermann", type: "Coaching" },
    ]
  }
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-warmBlack">Projekt-Board</h1>
        <p className="text-deepGold/70">Übersicht aller laufenden Coaching-Prozesse und Aufstellungen.</p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((column, i) => (
          <div key={column.title} className="flex min-w-[300px] flex-1 flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="flex items-center gap-2 font-bold text-warmBlack">
                {column.title}
                <span className="rounded-full bg-gold/10 px-2 py-0.5 text-xs text-deepGold">
                  {column.tasks.length}
                </span>
              </h2>
              <button className="text-gold hover:text-deepGold">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-4 min-h-[500px] rounded-[32px] bg-mist/20 p-4">
              {column.tasks.map((task, j) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (i * 0.1) + (j * 0.05) }}
                  className="rounded-2xl border border-gold/10 bg-white p-5 shadow-soft transition-all hover:border-gold/30 cursor-pointer"
                >
                  <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-softGold">
                    {task.type}
                  </div>
                  <h3 className="mb-1 font-bold text-warmBlack">{task.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-deepGold/60">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {task.client}
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-gold/5">
                    <div className="flex -space-x-2">
                      <div className="h-6 w-6 rounded-full border-2 border-white bg-sand text-[8px] flex items-center justify-center font-bold">SB</div>
                    </div>
                    <div className="text-[10px] text-gold/50">Zuletzt: Gestern</div>
                  </div>
                </motion.div>
              ))}
              
              <button className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gold/20 py-4 text-sm font-medium text-gold/60 transition-all hover:border-gold/40 hover:text-gold">
                + Karte hinzufügen
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
