"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/sibylle/supabase";
import { documentCategories, formatDate } from "@/lib/sibylle/crm";

const emptyDocument = {
  customer_id: "",
  file_name: "",
  file_path: "",
  category: "Allgemein",
  file_size: "",
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDocument, setFormDocument] = useState(emptyDocument);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const [{ data: docs, error }, { data: custs }] = await Promise.all([
      supabase.from("documents").select("*, customers(name)").order("created_at", { ascending: false }),
      supabase.from("customers").select("id, name").order("name"),
    ]);
    if (error) {
      console.error(error);
      alert("Dokumente konnten nicht geladen werden.");
    }
    setDocuments(docs || []);
    setCustomers(custs || []);
  }

  async function saveDocument(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("documents").insert([{
      customer_id: formDocument.customer_id || null,
      file_name: formDocument.file_name.trim(),
      file_path: formDocument.file_path.trim(),
      category: formDocument.category,
      file_size: formDocument.file_size.trim() || null,
    }]);
    if (error) {
      alert("Dokument konnte nicht gespeichert werden.");
      return;
    }
    setIsModalOpen(false);
    setFormDocument(emptyDocument);
    fetchData();
  }

  async function deleteDocument(doc: any) {
    if (!confirm(`Dokument "${doc.file_name}" wirklich löschen?`)) return;
    const { error } = await supabase.from("documents").delete().eq("id", doc.id);
    if (error) alert("Dokument konnte nicht gelöscht werden.");
    fetchData();
  }

  function openDocument(doc: any) {
    if (/^https?:\/\//.test(doc.file_path)) {
      window.open(doc.file_path, "_blank");
    } else {
      alert(`Ablagepfad: ${doc.file_path}`);
    }
  }

  const categories = useMemo(() => documentCategories.map((name) => ({
    name,
    count: documents.filter((doc) => doc.category === name).length,
  })), [documents]);

  const visibleDocs = selectedCategory === "Alle" ? documents : documents.filter((doc) => doc.category === selectedCategory);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-warmBlack">Dokumenten-Tresor</h1>
          <p className="text-deepGold/70">Zentrale Verwaltung aller Unterlagen, Verträge und Notizen.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-full bg-deepGold px-6 py-3 font-semibold text-white shadow-soft transition-all hover:bg-gold">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" /></svg>
          Dokument hinzufügen
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-warmBlack/40 backdrop-blur-sm" />
            <motion.form onSubmit={saveDocument} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="relative w-full max-w-xl rounded-[32px] bg-white p-8 shadow-2xl md:p-12">
              <h2 className="mb-8 text-2xl font-bold text-warmBlack">Dokument erfassen</h2>
              <div className="space-y-5">
                <Field label="Dateiname" required value={formDocument.file_name} onChange={(value) => setFormDocument({ ...formDocument, file_name: value })} />
                <Field label="Pfad oder URL" required value={formDocument.file_path} onChange={(value) => setFormDocument({ ...formDocument, file_path: value })} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select label="Kategorie" value={formDocument.category} onChange={(value) => setFormDocument({ ...formDocument, category: value })}>{documentCategories.map((cat) => <option key={cat}>{cat}</option>)}</Select>
                  <Field label="Dateigröße" value={formDocument.file_size} placeholder="z.B. 240 KB" onChange={(value) => setFormDocument({ ...formDocument, file_size: value })} />
                </div>
                <Select label="Kunde" value={formDocument.customer_id} onChange={(value) => setFormDocument({ ...formDocument, customer_id: value })}>
                  <option value="">Ohne Kundenzuordnung</option>
                  {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
                </Select>
              </div>
              <div className="mt-8 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 rounded-full border border-gold/20 py-4 font-bold text-deepGold hover:bg-gold/5">Abbrechen</button>
                <button type="submit" className="flex-1 rounded-full bg-deepGold py-4 font-bold text-white shadow-soft hover:bg-gold">Speichern</button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((cat, i) => (
          <motion.button key={cat.name} onClick={() => setSelectedCategory(cat.name)} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className={`group flex flex-col items-center justify-center rounded-[32px] border p-8 text-center shadow-soft transition-all ${selectedCategory === cat.name ? "border-gold/40 bg-sand/20" : "border-gold/15 bg-white hover:border-gold/30"}`}>
            <div className="mb-4 rounded-2xl bg-sand/30 p-4 text-deepGold transition-all group-hover:bg-deepGold group-hover:text-white">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
            </div>
            <h3 className="font-bold text-warmBlack">{cat.name}</h3>
            <p className="text-xs text-deepGold/50">{cat.count} Dateien</p>
          </motion.button>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-warmBlack">Zuletzt hinzugefügt</h2>
          {selectedCategory !== "Alle" && <button onClick={() => setSelectedCategory("Alle")} className="text-sm font-bold text-deepGold hover:text-gold">Alle anzeigen</button>}
        </div>
        <div className="overflow-hidden rounded-[32px] border border-gold/15 bg-white shadow-soft">
          <div className="divide-y divide-gold/5">
            {visibleDocs.length > 0 ? visibleDocs.map((doc) => (
              <div key={doc.id} className="flex items-center gap-6 p-6 transition-all hover:bg-gold/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist/20 text-deepGold">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z" /></svg>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-warmBlack">{doc.file_name}</div>
                  <div className="text-xs text-deepGold/50">{formatDate(doc.created_at)} · {doc.category} · {doc.file_size || "keine Größe"}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openDocument(doc)} className="rounded-full p-2 text-gold hover:bg-gold/10" title="Öffnen">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>
                  <button onClick={() => deleteDocument(doc)} className="rounded-full p-2 text-red-400 hover:bg-red-50" title="Löschen">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m3 0V5a2 2 0 012-2h0a2 2 0 012 2v2" /></svg>
                  </button>
                </div>
              </div>
            )) : (
              <div className="p-10 text-center text-sm italic text-deepGold/40">Keine Dokumente gefunden.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder = "" }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</label><input required={required} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white" /></div>;
}

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: React.ReactNode }) {
  return <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</label><select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white">{children}</select></div>;
}
