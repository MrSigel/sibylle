"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/sibylle/supabase";
import { customerNameFromRelation, formatCurrency, formatDate, invoiceStatuses } from "@/lib/sibylle/crm";

const defaultItem = { description: "Systemische Aufstellung", price: 0 };

function nextInvoiceId(prefix = `RE-${new Date().getFullYear()}-`) {
  return `${prefix}${Math.floor(100 + Math.random() * 900)}`;
}

export default function FinancesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [businessSettings, setBusinessSettings] = useState<any>(null);
  const [newInvoice, setNewInvoice] = useState({
    customer_id: "",
    amount: 0,
    status: "Offen",
    due_date: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    notes: "",
    items: [defaultItem],
    id: nextInvoiceId(),
  });

  useEffect(() => {
    fetchData();
    const saved = localStorage.getItem("crm_business_settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      setBusinessSettings(parsed);
      setNewInvoice((prev) => ({ ...prev, id: nextInvoiceId(parsed.invoicePrefix || undefined) }));
    }
  }, []);

  async function fetchData() {
    setLoading(true);
    const [{ data: invs, error }, { data: custs }] = await Promise.all([
      supabase.from("invoices").select("*, customers (name, address)").order("created_at", { ascending: false }),
      supabase.from("customers").select("id, name, address").order("name"),
    ]);
    if (error) {
      console.error(error);
      alert("Rechnungen konnten nicht geladen werden.");
    }
    setInvoices(invs || []);
    setCustomers(custs || []);
    setLoading(false);
  }

  function updateItems(items: { description: string; price: number }[]) {
    const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0);
    setNewInvoice({ ...newInvoice, items, amount: total });
  }

  async function handleCreateInvoice() {
    if (!newInvoice.customer_id) {
      alert("Bitte wählen Sie einen Kunden aus.");
      return;
    }
    if (newInvoice.amount <= 0) {
      alert("Bitte erfassen Sie mindestens einen Rechnungsposten mit Betrag.");
      return;
    }

    const { error } = await supabase.from("invoices").insert([{
      id: newInvoice.id,
      customer_id: newInvoice.customer_id,
      amount: newInvoice.amount,
      status: newInvoice.status,
      items: newInvoice.items,
      due_date: newInvoice.due_date || null,
      notes: newInvoice.notes || null,
    }]);

    if (error) {
      alert(error.code === "23505" ? "Diese Rechnungsnummer existiert bereits." : "Fehler beim Speichern der Rechnung.");
      return;
    }

    setIsModalOpen(false);
    setNewInvoice({
      customer_id: "",
      amount: 0,
      status: "Offen",
      due_date: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      notes: "",
      items: [defaultItem],
      id: nextInvoiceId(businessSettings?.invoicePrefix),
    });
    fetchData();
  }

  async function updateInvoiceStatus(invoice: any, status: string) {
    const { error } = await supabase.from("invoices").update({ status, updated_at: new Date().toISOString() }).eq("id", invoice.id);
    if (error) alert("Status konnte nicht gespeichert werden.");
    fetchData();
  }

  async function deleteInvoice(invoice: any) {
    if (!confirm(`Rechnung ${invoice.id} wirklich löschen?`)) return;
    const { error } = await supabase.from("invoices").delete().eq("id", invoice.id);
    if (error) alert("Rechnung konnte nicht gelöscht werden.");
    fetchData();
  }

  function printInvoice(invoice: any = newInvoice) {
    const customer = invoice.customers || customers.find((c) => c.id === invoice.customer_id);
    const items = invoice.items?.length ? invoice.items : newInvoice.items;
    const html = `
      <html><head><title>${invoice.id}</title><style>
      body{font-family:Arial,sans-serif;color:#1f211a;margin:48px} h1{font-size:24px} table{width:100%;border-collapse:collapse;margin-top:32px} th,td{border-bottom:1px solid #e6d5b8;padding:12px;text-align:left} .right{text-align:right}.muted{color:#846733}.total{font-weight:bold;font-size:18px}
      </style></head><body>
      <h1>Rechnung ${invoice.id}</h1><p class="muted">Datum: ${new Date().toLocaleDateString("de-DE")} | Fällig: ${formatDate(invoice.due_date)}</p>
      <p><strong>${customer?.name || "Empfänger"}</strong><br>${(customer?.address || "").replace(/\n/g, "<br>")}</p>
      <table><thead><tr><th>Leistung</th><th class="right">Betrag</th></tr></thead><tbody>
      ${items.map((item: any) => `<tr><td>${item.description}</td><td class="right">${formatCurrency(item.price)}</td></tr>`).join("")}
      </tbody><tfoot><tr><td class="total">Gesamtbetrag</td><td class="right total">${formatCurrency(invoice.amount)}</td></tr></tfoot></table>
      <p>${businessSettings?.footerText || "Vielen Dank für das Vertrauen."}</p>
      </body></html>`;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.print();
  }

  const totalRevenue = useMemo(() => invoices.filter((inv) => inv.status === "Bezahlt").reduce((sum, inv) => sum + Number(inv.amount), 0), [invoices]);
  const pendingAmount = useMemo(() => invoices.filter((inv) => inv.status === "Offen" || inv.status === "Überfällig").reduce((sum, inv) => sum + Number(inv.amount), 0), [invoices]);
  const selectedCustomer = customers.find((c) => c.id === newInvoice.customer_id);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-warmBlack">Finanz-Management</h1>
          <p className="text-deepGold/70">Rechnungen, Angebote und steuerliche Übersicht.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-full bg-deepGold px-6 py-3 font-semibold text-white shadow-soft transition-all hover:bg-gold">Neue Rechnung erstellen</button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Stat label="Umsatz (Bezahlt)" value={formatCurrency(totalRevenue)} />
        <Stat label="Offen" value={formatCurrency(pendingAmount)} />
        <div className="rounded-[32px] bg-deepGold p-8 text-white shadow-soft">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest opacity-80">Steuer (Est. 25%)</div>
          <div className="text-3xl font-bold">{formatCurrency(totalRevenue * 0.25)}</div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-gold/15 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-mist/10 text-xs font-bold uppercase tracking-widest text-deepGold/60">
              <tr><th className="px-8 py-4">Nummer</th><th className="px-8 py-4">Kunde</th><th className="px-8 py-4">Betrag</th><th className="px-8 py-4">Fällig</th><th className="px-8 py-4">Status</th><th className="px-8 py-4 text-right">Aktionen</th></tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {loading ? (
                <tr><td colSpan={6} className="px-8 py-10 text-center text-sm italic text-deepGold/40">Daten werden geladen...</td></tr>
              ) : invoices.length === 0 ? (
                <tr><td colSpan={6} className="px-8 py-10 text-center text-sm italic text-deepGold/40">Keine Rechnungen vorhanden.</td></tr>
              ) : invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gold/5">
                  <td className="px-8 py-5 font-mono text-xs">{inv.id}</td>
                  <td className="px-8 py-5 font-semibold">{customerNameFromRelation(inv.customers)}</td>
                  <td className="px-8 py-5 font-bold">{formatCurrency(inv.amount)}</td>
                  <td className="px-8 py-5 text-sm text-deepGold/60">{formatDate(inv.due_date)}</td>
                  <td className="px-8 py-5">
                    <select value={inv.status} onChange={(e) => updateInvoiceStatus(inv, e.target.value)} className="rounded-full border border-gold/15 bg-white px-3 py-1 text-[10px] font-bold uppercase text-deepGold outline-none">
                      {invoiceStatuses.map((status) => <option key={status}>{status}</option>)}
                    </select>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button onClick={() => printInvoice(inv)} className="mr-4 text-gold hover:text-deepGold">PDF</button>
                    <button onClick={() => deleteInvoice(inv)} className="text-red-400 hover:text-red-600">Löschen</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex overflow-y-auto bg-warmBlack/40 p-4 backdrop-blur-sm sm:p-10">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="m-auto flex min-h-[80vh] w-full max-w-6xl flex-col overflow-hidden rounded-[40px] bg-white shadow-2xl lg:flex-row">
              <div className="flex-1 overflow-y-auto border-r border-gold/10 p-8 lg:p-12">
                <h2 className="mb-8 text-2xl font-bold text-warmBlack">Rechnungs-Details</h2>
                <div className="space-y-6">
                  <Select label="Kunde auswählen" value={newInvoice.customer_id} onChange={(value) => setNewInvoice({ ...newInvoice, customer_id: value })}>
                    <option value="">-- Kunde wählen --</option>
                    {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </Select>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Rechnungsnummer" value={newInvoice.id} onChange={(value) => setNewInvoice({ ...newInvoice, id: value })} />
                    <Field label="Fällig am" type="date" value={newInvoice.due_date} onChange={(value) => setNewInvoice({ ...newInvoice, due_date: value })} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Posten</label>
                    {newInvoice.items.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-[1fr_120px_36px] gap-3">
                        <input placeholder="Leistung" value={item.description} onChange={(e) => { const items = [...newInvoice.items]; items[idx] = { ...item, description: e.target.value }; updateItems(items); }} className="rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none" />
                        <input type="number" min="0" step="0.01" placeholder="Betrag" value={item.price} onChange={(e) => { const items = [...newInvoice.items]; items[idx] = { ...item, price: Number(e.target.value) }; updateItems(items); }} className="rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none" />
                        <button onClick={() => updateItems(newInvoice.items.filter((_, i) => i !== idx))} disabled={newInvoice.items.length === 1} className="rounded-full text-red-400 hover:bg-red-50 disabled:opacity-30" type="button">×</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => updateItems([...newInvoice.items, { description: "", price: 0 }])} className="text-sm font-bold text-deepGold hover:text-gold">+ Posten hinzufügen</button>
                  </div>
                  <div className="flex gap-4 pt-8">
                    <button onClick={() => setIsModalOpen(false)} className="flex-1 rounded-full border border-gold/20 py-4 font-bold text-deepGold" type="button">Abbrechen</button>
                    <button onClick={handleCreateInvoice} className="flex-1 rounded-full bg-deepGold py-4 font-bold text-white shadow-soft" type="button">Rechnung speichern</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col items-center overflow-y-auto bg-sand/10 p-8 lg:p-12">
                <div className="flex aspect-[1/1.414] w-full max-w-[210mm] flex-col bg-white p-16 text-[12px] text-warmBlack shadow-lg">
                  <div className="mb-16 flex items-start justify-between">
                    <div className="relative h-12 w-40"><Image src="/assets/sibylle/brand/logo-header.png" alt="Logo" fill className="object-contain object-left" /></div>
                    <div className="text-right text-[10px] text-deepGold/60"><p className="font-bold">{businessSettings?.businessName || "Sibylle Bergold"}</p><p>{businessSettings?.address || "München, Deutschland"}</p><p>{businessSettings?.email || "info@sibylle-bergold.de"}</p></div>
                  </div>
                  <div className="mb-12"><p className="mb-4 text-[10px] text-gold/60 underline">{businessSettings?.businessName || "Sibylle Bergold"} · {businessSettings?.address || ""}</p><div className="text-[14px] font-medium"><p>{selectedCustomer?.name || "[Empfänger Name]"}</p><p className="whitespace-pre-line">{selectedCustomer?.address || "[Empfänger Adresse]"}</p></div></div>
                  <div className="mb-10"><h1 className="mb-2 text-xl font-bold">Rechnung {newInvoice.id}</h1><p className="text-deepGold/60">Datum: {new Date().toLocaleDateString("de-DE")} · Fällig: {formatDate(newInvoice.due_date)}</p></div>
                  <table className="mb-10 w-full">
                    <thead className="border-b border-gold/20"><tr className="text-left text-[10px] font-bold uppercase tracking-wider text-deepGold/60"><th className="py-2">Leistungsbeschreibung</th><th className="py-2 text-right">Betrag</th></tr></thead>
                    <tbody className="divide-y divide-gold/5">{newInvoice.items.map((item, i) => <tr key={i}><td className="py-4">{item.description || "-"}</td><td className="py-4 text-right">{formatCurrency(item.price)}</td></tr>)}</tbody>
                    <tfoot className="border-t-2 border-warmBlack/10"><tr className="text-[14px] font-bold"><td className="py-4">Gesamtbetrag</td><td className="py-4 text-right">{formatCurrency(newInvoice.amount)}</td></tr></tfoot>
                  </table>
                  <p className="mb-auto whitespace-pre-line leading-relaxed">{businessSettings?.footerText || "Vielen Dank für das Vertrauen.\nBitte begleichen Sie den Betrag innerhalb von 14 Tagen."}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[32px] border border-gold/15 bg-white p-8 shadow-soft"><div className="mb-2 text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</div><div className="text-3xl font-bold text-warmBlack">{value}</div></div>;
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</label><input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white" /></div>;
}

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: React.ReactNode }) {
  return <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</label><select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white">{children}</select></div>;
}
