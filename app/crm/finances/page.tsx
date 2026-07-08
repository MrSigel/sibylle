"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/sibylle/supabase";
import { useCrmDeepLink } from "@/lib/sibylle/hooks";
import { customerNameFromRelation, formatCurrency, formatDate, invoiceStatuses } from "@/lib/sibylle/crm";
import {
  type BusinessSettings,
  defaultBusinessSettings,
  loadBusinessSettings,
} from "@/lib/sibylle/crmSettings";

type InvoiceItem = { description: string; price: number };

const defaultItem: InvoiceItem = { description: "Systemische Aufstellung", price: 0 };

function nextInvoiceId(prefix = defaultBusinessSettings.invoicePrefix) {
  return `${prefix}${Math.floor(100 + Math.random() * 900)}`;
}

// Sequential invoice number based on existing invoices with the same prefix
// (e.g. RE-2026-001, -002, ...). Avoids the collision risk of random numbers.
function nextSequentialId(prefix: string, list: any[]) {
  const nums = list
    .map((inv) => String(inv.id))
    .filter((id) => id.startsWith(prefix))
    .map((id) => parseInt(id.slice(prefix.length), 10))
    .filter((n) => Number.isFinite(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `${prefix}${String(next).padStart(3, "0")}`;
}

function emptyInvoice(prefix = defaultBusinessSettings.invoicePrefix) {
  return {
    customer_id: "",
    amount: 0,
    status: "Offen",
    due_date: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    notes: "",
    items: [defaultItem],
    id: nextInvoiceId(prefix),
  };
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function lineBreaks(value: unknown) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function normalizeSettings(settings: Partial<BusinessSettings> | null): BusinessSettings {
  return { ...defaultBusinessSettings, ...(settings || {}) };
}

export default function FinancesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>(defaultBusinessSettings);
  const [newInvoice, setNewInvoice] = useState(emptyInvoice());
  const { openNew, focusId } = useCrmDeepLink();
  const focusRef = useRef<HTMLTableRowElement | null>(null);

  useEffect(() => {
    fetchData();
    loadBusinessSettings().then((parsed) => {
      setBusinessSettings(parsed);
      setNewInvoice((prev) => (editingId ? prev : { ...prev, id: nextInvoiceId(parsed.invoicePrefix) }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openNew) openNewInvoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openNew]);

  useEffect(() => {
    if (focusId && !loading && focusRef.current) {
      focusRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [focusId, loading]);

  async function fetchData() {
    setLoading(true);
    setError("");
    const [{ data: invs, error: invError }, { data: custs }] = await Promise.all([
      supabase.from("invoices").select("*, customers (name, address)").order("created_at", { ascending: false }),
      supabase.from("customers").select("id, name, address").order("name"),
    ]);
    if (invError) {
      console.error(invError);
      setError("Rechnungen konnten nicht geladen werden. Bitte prüfe die Verbindung.");
    }
    setInvoices(invs || []);
    setCustomers(custs || []);
    setLoading(false);
  }

  function openNewInvoice() {
    setEditingId(null);
    setNewInvoice({
      ...emptyInvoice(businessSettings.invoicePrefix),
      id: nextSequentialId(businessSettings.invoicePrefix, invoices),
    });
    setIsModalOpen(true);
  }

  function openEditInvoice(invoice: any) {
    setEditingId(invoice.id);
    setNewInvoice({
      customer_id: invoice.customer_id || "",
      amount: Number(invoice.amount || 0),
      status: invoice.status || "Offen",
      due_date: invoice.due_date ? String(invoice.due_date).slice(0, 10) : "",
      notes: invoice.notes || "",
      items: invoice.items?.length ? invoice.items : [defaultItem],
      id: invoice.id,
    });
    setIsModalOpen(true);
  }

  function updateItems(items: InvoiceItem[]) {
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

    const payload = {
      id: newInvoice.id,
      customer_id: newInvoice.customer_id,
      amount: newInvoice.amount,
      status: newInvoice.status,
      items: newInvoice.items,
      due_date: newInvoice.due_date || null,
      notes: newInvoice.notes || null,
    };

    const { error } = editingId
      ? await supabase
          .from("invoices")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("id", editingId)
      : await supabase.from("invoices").insert([payload]);

    if (error) {
      alert(error.code === "23505" ? "Diese Rechnungsnummer existiert bereits." : "Fehler beim Speichern der Rechnung.");
      return;
    }

    setIsModalOpen(false);
    setEditingId(null);
    setNewInvoice(emptyInvoice(businessSettings.invoicePrefix));
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

  function getInvoiceModel(invoice: any = newInvoice) {
    const customer = invoice.customers || customers.find((c) => c.id === invoice.customer_id) || {};
    const items: InvoiceItem[] = invoice.items?.length ? invoice.items : [];
    const amount = Number(invoice.amount || items.reduce((sum, item) => sum + Number(item.price || 0), 0));
    return { invoice, customer, items, amount, settings: businessSettings };
  }

  function buildInvoiceHtml(invoice: any = newInvoice) {
    const { invoice: inv, customer, items, amount, settings } = getInvoiceModel(invoice);
    const logoUrl = `${window.location.origin}/assets/sibylle/brand/logo-header.png`;
    const invoiceDate = inv.created_at ? formatDate(inv.created_at) : new Date().toLocaleDateString("de-DE");
    const dueDate = formatDate(inv.due_date || newInvoice.due_date);

    return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <title>Rechnung ${escapeHtml(inv.id)}</title>
  <style>
    @page { size: A4; margin: 18mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #1f211a; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.5; }
    .invoice { min-height: 260mm; display: flex; flex-direction: column; }
    .top { display: flex; justify-content: space-between; gap: 32px; align-items: flex-start; margin-bottom: 42px; }
    .logo { width: 190px; height: auto; object-fit: contain; }
    .sender { text-align: right; color: #846733; white-space: pre-line; }
    .small { font-size: 10px; color: #846733; }
    .address-line { margin-bottom: 18px; color: #846733; text-decoration: underline; font-size: 10px; }
    .recipient { min-height: 72px; margin-bottom: 34px; font-size: 13px; }
    h1 { margin: 0 0 8px; font-size: 28px; letter-spacing: -0.02em; }
    .meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 22px 0 36px; border-top: 1px solid #e6d5b8; border-bottom: 1px solid #e6d5b8; padding: 14px 0; }
    .meta-label { display: block; font-size: 9px; text-transform: uppercase; letter-spacing: .12em; color: #846733; margin-bottom: 4px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
    th { text-align: left; border-bottom: 1px solid #846733; color: #846733; font-size: 10px; text-transform: uppercase; letter-spacing: .12em; padding: 9px 0; }
    td { border-bottom: 1px solid #e6d5b8; padding: 13px 0; vertical-align: top; }
    .right { text-align: right; }
    .summary { margin-left: auto; width: 280px; }
    .summary-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e6d5b8; }
    .summary-row.total { font-weight: 700; font-size: 16px; border-bottom: 2px solid #1f211a; }
    .note { margin-top: 22px; color: #846733; white-space: pre-line; }
    .footer { margin-top: auto; padding-top: 18px; border-top: 1px solid #e6d5b8; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; color: #846733; font-size: 10px; }
    .footer strong { display: block; color: #1f211a; margin-bottom: 4px; }
    @media print { .no-print { display: none; } body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="invoice">
    <div class="top">
      <img class="logo" src="${logoUrl}" alt="${escapeHtml(settings.businessName)}" />
      <div class="sender">
        <strong>${escapeHtml(settings.businessName)}</strong><br />
        ${lineBreaks(settings.address)}<br />
        ${escapeHtml(settings.email)}<br />
        ${escapeHtml(settings.phone)}
      </div>
    </div>

    <div class="address-line">${escapeHtml(settings.businessName)} · ${escapeHtml(settings.address).replace(/\n/g, ", ")}</div>
    <div class="recipient">
      <strong>${escapeHtml(customer.name || "Empfänger")}</strong><br />
      ${lineBreaks(customer.address || "Empfängeradresse im Kundenprofil hinterlegen")}
    </div>

    <h1>Rechnung</h1>
    <p class="small">Bitte verwenden Sie die Rechnungsnummer als Verwendungszweck.</p>

    <div class="meta">
      <div><span class="meta-label">Rechnungsnummer</span>${escapeHtml(inv.id)}</div>
      <div><span class="meta-label">Rechnungsdatum</span>${invoiceDate}</div>
      <div><span class="meta-label">Fällig am</span>${dueDate}</div>
    </div>

    <table>
      <thead><tr><th>Leistungsbeschreibung</th><th class="right">Betrag</th></tr></thead>
      <tbody>
        ${items.map((item) => `<tr><td>${escapeHtml(item.description)}</td><td class="right">${formatCurrency(item.price)}</td></tr>`).join("")}
      </tbody>
    </table>

    <div class="summary">
      <div class="summary-row"><span>Zwischensumme</span><span>${formatCurrency(amount)}</span></div>
      <div class="summary-row"><span>Umsatzsteuer</span><span>0,00 €</span></div>
      <div class="summary-row total"><span>Rechnungsbetrag</span><span>${formatCurrency(amount)}</span></div>
    </div>

    <p class="note">${lineBreaks(settings.footerText)}</p>

    <div class="footer">
      <div><strong>Absender</strong>${escapeHtml(settings.ownerName)}<br />${lineBreaks(settings.address)}</div>
      <div><strong>Steuerdaten</strong>USt-IdNr./Steuernummer:<br />${escapeHtml(settings.taxId)}</div>
      <div><strong>Bankverbindung</strong>${escapeHtml(settings.bankName)}<br />IBAN: ${escapeHtml(settings.iban)}<br />BIC: ${escapeHtml(settings.bic)}</div>
    </div>
  </div>
</body>
</html>`;
  }

  function printInvoice(invoice: any = newInvoice) {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(buildInvoiceHtml(invoice));
    win.document.close();
    win.focus();
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
        <button onClick={openNewInvoice} className="flex items-center gap-2 rounded-full bg-deepGold px-6 py-3 font-semibold text-white shadow-soft transition-all hover:bg-gold">Neue Rechnung erstellen</button>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

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
                <tr ref={focusId === inv.id ? focusRef : undefined} key={inv.id} className={`hover:bg-gold/5 ${focusId === inv.id ? "bg-gold/10 ring-2 ring-inset ring-gold/50" : ""}`}>
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
                    <button onClick={() => openEditInvoice(inv)} className="mr-4 text-deepGold hover:text-gold">Bearbeiten</button>
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
                <h2 className="mb-8 text-2xl font-bold text-warmBlack">{editingId ? "Rechnung bearbeiten" : "Rechnungs-Details"}</h2>
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
                    <button onClick={() => { setIsModalOpen(false); setEditingId(null); }} className="flex-1 rounded-full border border-gold/20 py-4 font-bold text-deepGold" type="button">Abbrechen</button>
                    <button onClick={handleCreateInvoice} className="flex-1 rounded-full bg-deepGold py-4 font-bold text-white shadow-soft" type="button">{editingId ? "Änderungen speichern" : "Rechnung speichern"}</button>
                  </div>
                </div>
              </div>

              <InvoicePreview
                settings={businessSettings}
                invoice={newInvoice}
                customer={selectedCustomer}
                onPrint={() => printInvoice(newInvoice)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InvoicePreview({ settings, invoice, customer, onPrint }: { settings: BusinessSettings; invoice: any; customer: any; onPrint: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center overflow-y-auto bg-sand/10 p-8 lg:p-12">
      <div className="mb-4 flex w-full max-w-[210mm] justify-end">
        <button type="button" onClick={onPrint} className="rounded-full bg-deepGold px-5 py-2 text-sm font-bold text-white shadow-soft hover:bg-gold">PDF / Drucken</button>
      </div>
      <div className="flex aspect-[1/1.414] w-full max-w-[210mm] flex-col bg-white p-14 text-[11px] text-warmBlack shadow-lg">
        <div className="mb-12 flex items-start justify-between gap-8">
          <div className="relative h-14 w-48"><Image src="/assets/sibylle/brand/logo-header.png" alt={settings.businessName} fill className="object-contain object-left" /></div>
          <div className="text-right text-[10px] leading-5 text-deepGold/70"><p className="font-bold text-warmBlack">{settings.businessName}</p><p className="whitespace-pre-line">{settings.address}</p><p>{settings.email}</p><p>{settings.phone}</p></div>
        </div>
        <div className="mb-10">
          <p className="mb-4 text-[10px] text-gold/60 underline">{settings.businessName} · {settings.address.replace(/\n/g, ", ")}</p>
          <div className="text-[13px] font-medium"><p>{customer?.name || "[Empfänger Name]"}</p><p className="whitespace-pre-line">{customer?.address || "[Empfänger Adresse]"}</p></div>
        </div>
        <h1 className="mb-2 text-2xl font-bold">Rechnung</h1>
        <div className="mb-8 grid grid-cols-3 gap-4 border-y border-gold/20 py-3 text-[10px]"><div><span className="block uppercase tracking-widest text-deepGold/60">Rechnung</span>{invoice.id}</div><div><span className="block uppercase tracking-widest text-deepGold/60">Datum</span>{new Date().toLocaleDateString("de-DE")}</div><div><span className="block uppercase tracking-widest text-deepGold/60">Fällig</span>{formatDate(invoice.due_date)}</div></div>
        <table className="mb-8 w-full">
          <thead className="border-b border-gold/20"><tr className="text-left text-[10px] font-bold uppercase tracking-wider text-deepGold/60"><th className="py-2">Leistungsbeschreibung</th><th className="py-2 text-right">Betrag</th></tr></thead>
          <tbody className="divide-y divide-gold/5">{invoice.items.map((item: InvoiceItem, i: number) => <tr key={i}><td className="py-4">{item.description || "-"}</td><td className="py-4 text-right">{formatCurrency(item.price)}</td></tr>)}</tbody>
        </table>
        <div className="ml-auto w-64 space-y-2 border-t border-gold/20 pt-3"><div className="flex justify-between"><span>Zwischensumme</span><span>{formatCurrency(invoice.amount)}</span></div><div className="flex justify-between"><span>Umsatzsteuer</span><span>0,00 €</span></div><div className="flex justify-between border-t border-warmBlack/20 pt-2 text-sm font-bold"><span>Rechnungsbetrag</span><span>{formatCurrency(invoice.amount)}</span></div></div>
        <p className="mt-8 whitespace-pre-line leading-relaxed text-deepGold/70">{settings.footerText}</p>
        <div className="mt-auto grid grid-cols-3 gap-4 border-t border-gold/10 pt-6 text-[9px] text-deepGold/60"><div><p className="mb-1 font-bold text-warmBlack">Absender</p><p>{settings.ownerName}</p><p className="whitespace-pre-line">{settings.address}</p></div><div><p className="mb-1 font-bold text-warmBlack">Steuerdaten</p><p>USt-IdNr./Steuernummer:</p><p>{settings.taxId}</p></div><div className="text-right"><p className="mb-1 font-bold text-warmBlack">Bankverbindung</p><p>{settings.bankName}</p><p>IBAN: {settings.iban}</p><p>BIC: {settings.bic}</p></div></div>
      </div>
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
