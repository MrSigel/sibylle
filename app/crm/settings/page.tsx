"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  defaultBusinessSettings,
  loadBusinessSettings,
  saveBusinessSettings,
} from "@/lib/sibylle/crmSettings";

export default function SettingsPage() {
  const [settings, setSettings] = useState(defaultBusinessSettings);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const loaded = await loadBusinessSettings();
        if (active) setSettings(loaded);
      } catch {
        if (active) setError("Einstellungen konnten nicht geladen werden.");
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      await saveBusinessSettings(settings);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Speichern fehlgeschlagen.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-warmBlack">Einstellungen</h1>
        <p className="text-deepGold/70">Verwalten Sie Ihre Geschäftsdaten für Rechnungen und Angebote.</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-[32px] border border-gold/15 bg-white p-10 text-sm italic text-deepGold/50 shadow-soft">
          Einstellungen werden geladen...
        </div>
      ) : (
      <form onSubmit={handleSave} className="space-y-8">
        {/* Business Info */}
        <div className="rounded-[32px] border border-gold/15 bg-white p-8 shadow-soft">
          <h2 className="mb-6 text-xl font-bold text-warmBlack">Geschäftsdaten</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Firmenname / Anzeigename</label>
              <input 
                name="businessName"
                value={settings.businessName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Inhaberin</label>
              <input 
                name="ownerName"
                value={settings.ownerName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">E-Mail Adresse</label>
              <input 
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Telefonnummer</label>
              <input 
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Anschrift</label>
              <textarea 
                name="address"
                value={settings.address}
                onChange={handleChange}
                rows={2}
                className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Bank & Tax */}
        <div className="rounded-[32px] border border-gold/15 bg-white p-8 shadow-soft">
          <h2 className="mb-6 text-xl font-bold text-warmBlack">Bankverbindung & Steuern</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Bankname</label>
              <input 
                name="bankName"
                value={settings.bankName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">USt-IdNr.</label>
              <input 
                name="taxId"
                value={settings.taxId}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">IBAN</label>
              <input 
                name="iban"
                value={settings.iban}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">BIC</label>
              <input 
                name="bic"
                value={settings.bic}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Invoice Config */}
        <div className="rounded-[32px] border border-gold/15 bg-white p-8 shadow-soft">
          <h2 className="mb-6 text-xl font-bold text-warmBlack">Rechnungs-Konfiguration</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Rechnungs-Präfix</label>
              <input 
                name="invoicePrefix"
                value={settings.invoicePrefix}
                onChange={handleChange}
                className="w-full max-w-xs rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Fußzeile (Rechnung)</label>
              <textarea 
                name="footerText"
                value={settings.footerText}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-deepGold px-10 py-4 font-bold text-white shadow-soft transition-all hover:bg-gold active:scale-95 disabled:opacity-50"
          >
            {isSaving ? "Wird gespeichert..." : "Änderungen speichern"}
          </button>
          
          <AnimatePresence>
            {showSuccess && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm font-bold text-green-600"
              >
                ✓ Erfolgreich gespeichert
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </form>
      )}
    </div>
  );
}


