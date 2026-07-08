"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/sibylle/supabase";
import { customerStatuses, downloadCsv, formatDate } from "@/lib/sibylle/crm";
import { useCrmDeepLink } from "@/lib/sibylle/hooks";

const emptyCustomer = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  status: "Interessent",
  plan: "",
  notes: "",
};

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Alle");
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formCustomer, setFormCustomer] = useState(emptyCustomer);

  const { openNew, focusId } = useCrmDeepLink();
  const focusRef = useRef<HTMLTableRowElement | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (openNew) openNewCustomer();
  }, [openNew]);

  useEffect(() => {
    if (focusId && !loading && focusRef.current) {
      focusRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [focusId, loading]);

  async function fetchCustomers() {
    setLoading(true);
    const { data, error } = await supabase.from("customers").select("*").order("name", { ascending: true });
    if (error) {
      console.error("Error fetching customers:", error);
      alert("Kunden konnten nicht geladen werden.");
    } else {
      setCustomers(data || []);
    }
    setLoading(false);
  }

  function openNewCustomer() {
    setFormCustomer(emptyCustomer);
    setIsModalOpen(true);
  }

  function openEditCustomer(customer: any) {
    setFormCustomer({
      id: customer.id,
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      address: customer.address || "",
      status: customer.status || "Interessent",
      plan: customer.plan || "",
      notes: customer.notes || "",
    });
    setIsModalOpen(true);
  }

  async function handleSaveCustomer(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: formCustomer.name.trim(),
      email: formCustomer.email.trim() || null,
      phone: formCustomer.phone.trim() || null,
      address: formCustomer.address.trim() || null,
      status: formCustomer.status,
      plan: formCustomer.plan.trim() || null,
      notes: formCustomer.notes.trim() || null,
      updated_at: new Date().toISOString(),
      last_contact: new Date().toISOString(),
    };

    const query = formCustomer.id
      ? supabase.from("customers").update(payload).eq("id", formCustomer.id)
      : supabase.from("customers").insert([payload]);

    const { error } = await query;
    setSaving(false);

    if (error) {
      alert(error.code === "23505" ? "Diese E-Mail ist bereits vergeben." : "Kunde konnte nicht gespeichert werden.");
      return;
    }

    setIsModalOpen(false);
    setFormCustomer(emptyCustomer);
    fetchCustomers();
  }

  async function deleteCustomer(customer: any) {
    if (!confirm(`Kunde "${customer.name}" wirklich löschen? Zugehörige Daten werden je nach Schema mitgelöscht oder gelöst.`)) return;
    const { error } = await supabase.from("customers").delete().eq("id", customer.id);
    if (error) {
      alert("Kunde konnte nicht gelöscht werden.");
    } else {
      fetchCustomers();
    }
  }

  const filteredCustomers = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name?.toLowerCase().includes(q) ||
        customer.email?.toLowerCase().includes(q) ||
        customer.phone?.toLowerCase().includes(q) ||
        customer.plan?.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "Alle" || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, statusFilter]);

  function exportCustomers() {
    downloadCsv(
      `kunden-${new Date().toISOString().slice(0, 10)}.csv`,
      filteredCustomers.map((customer) => ({
        Name: customer.name,
        Email: customer.email,
        Telefon: customer.phone,
        Adresse: customer.address,
        Status: customer.status,
        Programm: customer.plan,
        Notizen: customer.notes,
      }))
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-warmBlack">Kunden-Datenbank</h1>
          <p className="text-deepGold/70">Verwalten Sie Ihre Kontakte und deren Historie.</p>
        </div>
        <button onClick={openNewCustomer} className="flex items-center gap-2 rounded-full bg-deepGold px-6 py-3 font-semibold text-white shadow-soft transition-all hover:bg-gold active:scale-95">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Neuer Kunde
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-warmBlack/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[32px] bg-white p-8 shadow-2xl md:p-12">
              <h2 className="mb-8 text-2xl font-bold text-warmBlack">{formCustomer.id ? "Kunde bearbeiten" : "Neuen Kunden anlegen"}</h2>
              <form onSubmit={handleSaveCustomer} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Vollständiger Name</label>
                  <input required value={formCustomer.name} onChange={(e) => setFormCustomer({ ...formCustomer, name: e.target.value })} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="E-Mail" value={formCustomer.email} type="email" onChange={(value) => setFormCustomer({ ...formCustomer, email: value })} />
                  <Field label="Telefon" value={formCustomer.phone} onChange={(value) => setFormCustomer({ ...formCustomer, phone: value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Adresse</label>
                  <textarea value={formCustomer.address} onChange={(e) => setFormCustomer({ ...formCustomer, address: e.target.value })} rows={2} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Status</label>
                    <select value={formCustomer.status} onChange={(e) => setFormCustomer({ ...formCustomer, status: e.target.value })} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white">
                      {customerStatuses.map((status) => <option key={status}>{status}</option>)}
                    </select>
                  </div>
                  <Field label="Programm / Fokus" value={formCustomer.plan} placeholder="z.B. Ahnenmuster" onChange={(value) => setFormCustomer({ ...formCustomer, plan: value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Notizen</label>
                  <textarea value={formCustomer.notes} onChange={(e) => setFormCustomer({ ...formCustomer, notes: e.target.value })} rows={3} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 rounded-full border border-gold/20 py-4 font-bold text-deepGold transition-all hover:bg-gold/5">Abbrechen</button>
                  <button type="submit" disabled={saving} className="flex-1 rounded-full bg-deepGold py-4 font-bold text-white shadow-soft transition-all hover:bg-gold disabled:opacity-60">{saving ? "Speichert..." : "Speichern"}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-4 flex items-center text-gold/50">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input type="text" placeholder="Kunden suchen..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-2xl border border-gold/15 bg-white py-3.5 pl-12 pr-4 text-warmBlack focus:border-gold/30 focus:outline-none focus:ring-4 focus:ring-gold/5" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-2xl border border-gold/15 bg-white px-4 py-3 text-sm font-medium text-deepGold outline-none hover:bg-gold/5">
          <option>Alle</option>
          {customerStatuses.map((status) => <option key={status}>{status}</option>)}
        </select>
        <button onClick={exportCustomers} disabled={filteredCustomers.length === 0} className="rounded-2xl border border-gold/15 bg-white px-4 py-3 text-sm font-medium text-deepGold hover:bg-gold/5 disabled:opacity-40">Exportieren</button>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-gold/15 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gold/10 bg-mist/10">
                {["Name", "Kontakt", "Status", "Programm", "Letzter Kontakt", "Aktionen"].map((head) => (
                  <th key={head} className={`px-6 py-4 text-xs font-bold uppercase tracking-widest text-deepGold/60 ${head === "Aktionen" ? "text-right" : ""}`}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm italic text-deepGold/40">Daten werden geladen...</td></tr>
              ) : filteredCustomers.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm italic text-deepGold/40">Keine Kunden gefunden.</td></tr>
              ) : (
                filteredCustomers.map((customer, i) => (
                  <motion.tr ref={focusId === customer.id ? focusRef : undefined} key={customer.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className={`group transition-colors hover:bg-gold/5 ${focusId === customer.id ? "bg-gold/10 ring-2 ring-inset ring-gold/50" : ""}`}>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sand/30 font-bold text-deepGold">{customer.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}</div>
                        <span className="font-semibold text-warmBlack">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5"><div className="text-sm text-warmBlack">{customer.email || "-"}</div><div className="text-xs text-deepGold/50">{customer.phone || "-"}</div></td>
                    <td className="px-6 py-5"><StatusBadge status={customer.status} /></td>
                    <td className="px-6 py-5 text-sm text-warmBlack">{customer.plan || "-"}</td>
                    <td className="px-6 py-5 text-sm text-deepGold/60">{formatDate(customer.last_contact)}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEditCustomer(customer)} className="rounded-lg p-2 text-gold transition-colors hover:bg-gold/10 hover:text-deepGold" title="Bearbeiten">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button onClick={() => deleteCustomer(customer)} className="rounded-lg p-2 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600" title="Löschen">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m3 0V5a2 2 0 012-2h0a2 2 0 012 2v2" /></svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder = "" }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</label>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white" />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
      status === "Aktiv" ? "bg-green-100 text-green-700" : status === "Interessent" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
    }`}>
      {status}
    </span>
  );
}
