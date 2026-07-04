"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/sibylle/supabase";
import Image from "next/image";

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
    items: [{ description: "Systemische Aufstellung", price: 0 }],
    id: `RE-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`
  });

  useEffect(() => {
    fetchData();
    const saved = localStorage.getItem("crm_business_settings");
    if (saved) setBusinessSettings(JSON.parse(saved));
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const { data: invs } = await supabase
        .from('invoices')
        .select(`*, customers (name)`)
        .order('created_at', { ascending: false });
      setInvoices(invs || []);

      const { data: custs } = await supabase
        .from('customers')
        .select('id, name, address');
      setCustomers(custs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateInvoice() {
    try {
      const { error } = await supabase
        .from('invoices')
        .insert([{
          id: newInvoice.id,
          customer_id: newInvoice.customer_id,
          amount: newInvoice.amount,
          status: newInvoice.status
        }]);
      
      if (error) throw error;
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert("Fehler beim Speichern der Rechnung");
    }
  }

  const totalRevenue = invoices
    .filter(inv => inv.status === 'Bezahlt')
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  const pendingAmount = invoices
    .filter(inv => inv.status !== 'Bezahlt')
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  const selectedCustomer = customers.find(c => c.id === newInvoice.customer_id);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-warmBlack">Finanz-Management</h1>
          <p className="text-deepGold/70">Rechnungen, Angebote und steuerliche Übersicht.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-full bg-deepGold px-6 py-3 font-semibold text-white shadow-soft hover:bg-gold transition-all"
          >
            Neue Rechnung erstellen
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[32px] bg-white p-8 border border-gold/15 shadow-soft">
          <div className="text-xs font-bold uppercase tracking-widest text-deepGold/60 mb-2">Umsatz (Bezahlt)</div>
          <div className="text-3xl font-bold text-warmBlack">
            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalRevenue)}
          </div>
        </div>
        <div className="rounded-[32px] bg-white p-8 border border-gold/15 shadow-soft">
          <div className="text-xs font-bold uppercase tracking-widest text-deepGold/60 mb-2">Offen</div>
          <div className="text-3xl font-bold text-warmBlack">
            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(pendingAmount)}
          </div>
        </div>
        <div className="rounded-[32px] bg-deepGold p-8 text-white shadow-soft">
          <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Steuer (Est. 25%)</div>
          <div className="text-3xl font-bold">
            {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalRevenue * 0.25)}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[32px] border border-gold/15 bg-white shadow-soft">
        <table className="w-full text-left">
          <thead className="bg-mist/10 text-xs font-bold uppercase tracking-widest text-deepGold/60">
            <tr>
              <th className="px-8 py-4">Nummer</th>
              <th className="px-8 py-4">Kunde</th>
              <th className="px-8 py-4">Betrag</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4 text-right">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/5">
            {invoices.map(inv => {
              const customerName = Array.isArray(inv.customers) ? inv.customers[0]?.name : inv.customers?.name;
              return (
                <tr key={inv.id} className="hover:bg-gold/5">
                  <td className="px-8 py-5 font-mono text-xs">{inv.id}</td>
                  <td className="px-8 py-5 font-semibold">{customerName}</td>
                  <td className="px-8 py-5 font-bold">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(inv.amount)}</td>
                  <td className="px-8 py-5">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${inv.status === 'Bezahlt' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-gold hover:text-deepGold">PDF</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Invoice Generator Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex overflow-y-auto bg-warmBlack/40 backdrop-blur-sm p-4 sm:p-10">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="m-auto w-full max-w-6xl rounded-[40px] bg-white shadow-2xl flex flex-col lg:flex-row overflow-hidden min-h-[80vh]"
            >
              {/* Form Side */}
              <div className="flex-1 p-8 lg:p-12 border-r border-gold/10 overflow-y-auto">
                <h2 className="text-2xl font-bold text-warmBlack mb-8">Rechnungs-Details</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Kunde auswählen</label>
                    <select 
                      value={newInvoice.customer_id}
                      onChange={(e) => setNewInvoice({...newInvoice, customer_id: e.target.value})}
                      className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white"
                    >
                      <option value="">-- Kunde wählen --</option>
                      {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Posten</label>
                    {newInvoice.items.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-[1fr_120px] gap-4">
                        <input 
                          placeholder="Leistung"
                          value={item.description}
                          onChange={(e) => {
                            const newItems = [...newInvoice.items];
                            newItems[idx].description = e.target.value;
                            setNewInvoice({...newInvoice, items: newItems});
                          }}
                          className="rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none"
                        />
                        <input 
                          type="number"
                          placeholder="Betrag"
                          value={item.price}
                          onChange={(e) => {
                            const newItems = [...newInvoice.items];
                            newItems[idx].price = Number(e.target.value);
                            const total = newItems.reduce((s, i) => s + i.price, 0);
                            setNewInvoice({...newInvoice, items: newItems, amount: total});
                          }}
                          className="rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 flex gap-4">
                    <button onClick={() => setIsModalOpen(false)} className="flex-1 rounded-full border border-gold/20 py-4 font-bold text-deepGold">Abbrechen</button>
                    <button onClick={handleCreateInvoice} className="flex-1 rounded-full bg-deepGold py-4 font-bold text-white shadow-soft">Rechnung Speichern</button>
                  </div>
                </div>
              </div>

              {/* Preview Side (PDF Look) */}
              <div className="flex-1 bg-sand/10 p-8 lg:p-12 overflow-y-auto flex flex-col items-center">
                <div className="w-full max-w-[210mm] aspect-[1/1.414] bg-white shadow-lg p-16 flex flex-col text-[12px] text-warmBlack">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-16">
                    <div className="relative h-12 w-40">
                      <Image src="/assets/sibylle/brand/logo-header.png" alt="Logo" fill className="object-contain object-left" />
                    </div>
                    <div className="text-right text-[10px] text-deepGold/60">
                      <p className="font-bold">{businessSettings?.businessName || "Sibylle Bergold"}</p>
                      <p>{businessSettings?.address || "München, Deutschland"}</p>
                      <p>{businessSettings?.email || "info@sibylle-bergold.de"}</p>
                    </div>
                  </div>

                  {/* Addresses */}
                  <div className="mb-12">
                    <p className="text-[10px] text-gold/60 underline mb-4">{businessSettings?.businessName} • {businessSettings?.address}</p>
                    <div className="text-[14px] font-medium">
                      <p>{selectedCustomer?.name || "[Empfänger Name]"}</p>
                      <p className="whitespace-pre-line">{selectedCustomer?.address || "[Empfänger Adresse]"}</p>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="mb-10">
                    <h1 className="text-xl font-bold mb-2">Rechnung {newInvoice.id}</h1>
                    <p className="text-deepGold/60">Datum: {new Date().toLocaleDateString('de-DE')}</p>
                  </div>

                  {/* Items Table */}
                  <table className="w-full mb-10">
                    <thead className="border-b border-gold/20">
                      <tr className="text-left font-bold text-[10px] uppercase tracking-wider text-deepGold/60">
                        <th className="py-2">Leistungsbeschreibung</th>
                        <th className="py-2 text-right">Betrag</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold/5">
                      {newInvoice.items.map((item, i) => (
                        <tr key={i}>
                          <td className="py-4">{item.description}</td>
                          <td className="py-4 text-right">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t-2 border-warmBlack/10">
                      <tr className="font-bold text-[14px]">
                        <td className="py-4">Gesamtbetrag (Netto)</td>
                        <td className="py-4 text-right">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(newInvoice.amount)}</td>
                      </tr>
                    </tfoot>
                  </table>

                  <p className="mb-auto leading-relaxed whitespace-pre-line">
                    {businessSettings?.footerText || "Vielen Dank für das Vertrauen.\nBitte begleichen Sie den Betrag innerhalb von 14 Tagen."}
                  </p>

                  {/* Footer */}
                  <div className="border-t border-gold/10 pt-8 mt-10 grid grid-cols-3 gap-4 text-[9px] text-deepGold/50">
                    <div>
                      <p className="font-bold mb-1">Kontakt</p>
                      <p>{businessSettings?.email}</p>
                      <p>{businessSettings?.phone}</p>
                    </div>
                    <div>
                      <p className="font-bold mb-1">Bankverbindung</p>
                      <p>{businessSettings?.bankName}</p>
                      <p>IBAN: {businessSettings?.iban}</p>
                      <p>BIC: {businessSettings?.bic}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold mb-1">Steuerdaten</p>
                      <p>St-Nr: {businessSettings?.taxId}</p>
                      <p>USt-befreit gemäß Kleinuntern.-Regelung</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
