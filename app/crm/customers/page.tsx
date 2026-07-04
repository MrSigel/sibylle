"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/sibylle/supabase";

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-warmBlack">Kunden-Datenbank</h1>
          <p className="text-deepGold/70">Verwalten Sie Ihre Kontakte und deren Historie.</p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-deepGold px-6 py-3 font-semibold text-white shadow-soft transition-all hover:bg-gold active:scale-95">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Neuer Kunde
        </button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-4 flex items-center text-gold/50">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Kunden suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-gold/15 bg-white py-3.5 pl-12 pr-4 text-warmBlack focus:border-gold/30 focus:outline-none focus:ring-4 focus:ring-gold/5"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-2xl border border-gold/15 bg-white px-4 py-3 text-sm font-medium text-deepGold hover:bg-gold/5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-2xl border border-gold/15 bg-white px-4 py-3 text-sm font-medium text-deepGold hover:bg-gold/5">
            Exportieren
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-gold/15 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gold/10 bg-mist/10">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-deepGold/60">Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-deepGold/60">Kontakt</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-deepGold/60">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-deepGold/60">Programm</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-deepGold/60">Letzter Kontakt</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-deepGold/60 text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-deepGold/40 italic">
                    Daten werden geladen...
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-deepGold/40 italic">
                    Keine Kunden gefunden.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer, i) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group transition-colors hover:bg-gold/5"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sand/30 font-bold text-deepGold">
                          {customer.name.split(" ").map((n: string) => n[0]).join("")}
                        </div>
                        <span className="font-semibold text-warmBlack">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm text-warmBlack">{customer.email}</div>
                      <div className="text-xs text-deepGold/50">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                        customer.status === "Aktiv" ? "bg-green-100 text-green-700" :
                        customer.status === "Interessent" ? "bg-blue-100 text-blue-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-warmBlack">{customer.plan}</td>
                    <td className="px-6 py-5 text-sm text-deepGold/60">{new Date(customer.last_contact).toLocaleDateString('de-DE')}</td>
                    <td className="px-6 py-5 text-right">
                      <button className="rounded-lg p-2 text-gold transition-colors hover:bg-gold/10 hover:text-deepGold">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
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
