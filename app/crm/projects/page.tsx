"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/sibylle/supabase";
import { customerNameFromRelation, projectColumns, projectPriorities } from "@/lib/sibylle/crm";
import { useCrmDeepLink } from "@/lib/sibylle/hooks";

const emptyProject = {
  id: "",
  title: "",
  description: "",
  customer_id: "",
  column_name: "Anfrage",
  priority: "Normal",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formProject, setFormProject] = useState(emptyProject);
  const { openNew } = useCrmDeepLink();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (openNew) openProject("Anfrage");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openNew]);

  async function fetchData() {
    setLoading(true);
    setError("");
    const [{ data: projectData, error: projectError }, { data: customerData }] = await Promise.all([
      supabase.from("projects").select("*, customers(name)").order("updated_at", { ascending: false }),
      supabase.from("customers").select("id, name").order("name"),
    ]);
    if (projectError) {
      console.error(projectError);
      setError("Projekte konnten nicht geladen werden. Bitte prüfe die Verbindung.");
    }
    setProjects(projectData || []);
    setCustomers(customerData || []);
    setLoading(false);
  }

  function openProject(columnName: string, project?: any) {
    setFormProject(project ? {
      id: project.id,
      title: project.title || "",
      description: project.description || "",
      customer_id: project.customer_id || "",
      column_name: project.column_name || columnName,
      priority: project.priority || "Normal",
    } : { ...emptyProject, column_name: columnName });
    setIsModalOpen(true);
  }

  async function saveProject(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: formProject.title.trim(),
      description: formProject.description.trim() || null,
      customer_id: formProject.customer_id || null,
      column_name: formProject.column_name,
      priority: formProject.priority,
      updated_at: new Date().toISOString(),
    };
    const { error } = formProject.id
      ? await supabase.from("projects").update(payload).eq("id", formProject.id)
      : await supabase.from("projects").insert([payload]);
    if (error) {
      alert("Projekt konnte nicht gespeichert werden.");
      return;
    }
    setIsModalOpen(false);
    fetchData();
  }

  async function moveProject(project: any, direction: -1 | 1) {
    const currentIndex = projectColumns.indexOf(project.column_name);
    const nextColumn = projectColumns[currentIndex + direction];
    if (!nextColumn) return;
    const { error } = await supabase.from("projects").update({ column_name: nextColumn, updated_at: new Date().toISOString() }).eq("id", project.id);
    if (error) alert("Projekt konnte nicht verschoben werden.");
    fetchData();
  }

  async function deleteProject(project: any) {
    if (!confirm(`Projekt "${project.title}" wirklich löschen?`)) return;
    const { error } = await supabase.from("projects").delete().eq("id", project.id);
    if (error) alert("Projekt konnte nicht gelöscht werden.");
    fetchData();
  }

  const grouped = useMemo(() => projectColumns.map((column) => ({
    title: column,
    tasks: projects.filter((project) => project.column_name === column),
  })), [projects]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-warmBlack">Projekt-Board</h1>
          <p className="text-deepGold/70">Übersicht aller laufenden Coaching-Prozesse und Aufstellungen.</p>
        </div>
        <button onClick={() => openProject("Anfrage")} className="rounded-full bg-deepGold px-6 py-3 font-semibold text-white shadow-soft transition-all hover:bg-gold">Neue Karte</button>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-warmBlack/40 backdrop-blur-sm" />
            <motion.form onSubmit={saveProject} initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-xl rounded-[32px] bg-white p-8 shadow-2xl md:p-12">
              <h2 className="mb-8 text-2xl font-bold text-warmBlack">{formProject.id ? "Projekt bearbeiten" : "Projekt anlegen"}</h2>
              <div className="space-y-5">
                <Field label="Titel" value={formProject.title} required onChange={(value) => setFormProject({ ...formProject, title: value })} />
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Beschreibung</label>
                  <textarea value={formProject.description} onChange={(e) => setFormProject({ ...formProject, description: e.target.value })} rows={3} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select label="Kunde" value={formProject.customer_id} onChange={(value) => setFormProject({ ...formProject, customer_id: value })}>
                    <option value="">Ohne Kundenzuordnung</option>
                    {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
                  </Select>
                  <Select label="Spalte" value={formProject.column_name} onChange={(value) => setFormProject({ ...formProject, column_name: value })}>
                    {projectColumns.map((column) => <option key={column}>{column}</option>)}
                  </Select>
                  <Select label="Priorität" value={formProject.priority} onChange={(value) => setFormProject({ ...formProject, priority: value })}>
                    {projectPriorities.map((priority) => <option key={priority}>{priority}</option>)}
                  </Select>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 rounded-full border border-gold/20 py-4 font-bold text-deepGold hover:bg-gold/5">Abbrechen</button>
                <button type="submit" className="flex-1 rounded-full bg-deepGold py-4 font-bold text-white shadow-soft hover:bg-gold">Speichern</button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {grouped.map((column, i) => (
          <div key={column.title} className="flex min-w-[300px] flex-1 flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="flex items-center gap-2 font-bold text-warmBlack">
                {column.title}
                <span className="rounded-full bg-gold/10 px-2 py-0.5 text-xs text-deepGold">{column.tasks.length}</span>
              </h2>
              <button onClick={() => openProject(column.title)} className="text-gold hover:text-deepGold" title="Karte hinzufügen">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </button>
            </div>

            <div className="flex min-h-[500px] flex-col gap-4 rounded-[32px] bg-mist/20 p-4">
              {loading ? <div className="p-6 text-center text-sm italic text-deepGold/40">Lade Projekte...</div> : column.tasks.map((task, j) => (
                <motion.div key={task.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 + j * 0.03 }} className="rounded-2xl border border-gold/10 bg-white p-5 shadow-soft transition-all hover:border-gold/30">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-softGold">{task.priority}</div>
                    <button onClick={() => openProject(column.title, task)} className="text-gold hover:text-deepGold" title="Bearbeiten">Bearbeiten</button>
                  </div>
                  <h3 className="mb-1 font-bold text-warmBlack">{task.title}</h3>
                  {task.description && <p className="mb-4 line-clamp-3 text-sm text-deepGold/60">{task.description}</p>}
                  <div className="flex items-center gap-2 text-sm text-deepGold/60">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    {customerNameFromRelation(task.customers)}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-gold/5 pt-4">
                    <button onClick={() => moveProject(task, -1)} disabled={i === 0} className="text-[10px] font-bold uppercase tracking-widest text-gold/60 disabled:opacity-20">Zurück</button>
                    <button onClick={() => deleteProject(task)} className="text-[10px] font-bold uppercase tracking-widest text-red-400">Löschen</button>
                    <button onClick={() => moveProject(task, 1)} disabled={i === projectColumns.length - 1} className="text-[10px] font-bold uppercase tracking-widest text-gold/60 disabled:opacity-20">Weiter</button>
                  </div>
                </motion.div>
              ))}

              <button onClick={() => openProject(column.title)} className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gold/20 py-4 text-sm font-medium text-gold/60 transition-all hover:border-gold/40 hover:text-gold">
                + Karte hinzufügen
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, required }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</label>
      <input required={required} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white" />
    </div>
  );
}

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white">{children}</select>
    </div>
  );
}
