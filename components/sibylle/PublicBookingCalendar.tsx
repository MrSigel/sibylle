"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/sibylle/supabase";
import { formatDateTime, formatTime, isPublicSlotBookable } from "@/lib/sibylle/crm";

type BookingForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const emptyForm: BookingForm = { name: "", email: "", phone: "", message: "" };

export function PublicBookingCalendar() {
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchSlots();
  }, []);

  async function fetchSlots() {
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("id, title, start_time, end_time, appointment_type, booking_status, reserved_until, public_visible")
      .eq("public_visible", true)
      .gte("start_time", new Date().toISOString())
      .order("start_time", { ascending: true })
      .limit(12);

    if (error) {
      console.error(error);
      setSlots([]);
    } else {
      setSlots((data || []).filter(isPublicSlotBookable));
    }
    setLoading(false);
  }

  async function reserveSlot(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot) return;
    setSaving(true);

    const reservedUntil = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const { error } = await supabase
      .from("appointments")
      .update({
        booking_status: "Reserviert",
        reserved_until: reservedUntil,
        booked_name: form.name.trim(),
        booked_email: form.email.trim(),
        booked_phone: form.phone.trim() || null,
        booked_message: form.message.trim() || null,
        booking_created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", selectedSlot.id)
      .eq("public_visible", true);

    setSaving(false);

    if (error) {
      alert("Der Termin konnte nicht reserviert werden. Bitte versuche es erneut oder schreibe Sibylle direkt per WhatsApp.");
      return;
    }

    setSuccess("Dein Terminwunsch ist für 24 Stunden reserviert. Sibylle prüft den Termin im CRM und bestätigt oder meldet sich bei dir.");
    setSelectedSlot(null);
    setForm(emptyForm);
    fetchSlots();
  }

  const groupedSlots = useMemo(() => {
    return slots.reduce<Record<string, any[]>>((groups, slot) => {
      const key = new Date(slot.start_time).toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "long" });
      groups[key] = groups[key] || [];
      groups[key].push(slot);
      return groups;
    }, {});
  }, [slots]);

  return (
    <section id="termine" className="section-shell overflow-hidden bg-white/60">
      <div className="absolute left-[-8rem] top-28 h-80 w-80 rounded-full bg-sand/35 blur-[90px]" />
      <div className="container relative grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}>
          <p className="eyebrow">Freie Erstgespräche</p>
          <h2 className="editorial mt-7 text-[clamp(2.8rem,5.4vw,5.8rem)] leading-[.95] text-warmBlack">
            Einen ruhigen Termin finden, wenn dein Anliegen <span className="italic text-deepGold">Raum braucht.</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-8 text-deepGold/80 md:text-lg">
            Wähle einen freigegebenen Termin für ein erstes Gespräch. Nach deiner Buchung wird der Slot für <span className="font-semibold">24 Stunden reserviert</span>, bis Sibylle ihn im CRM bestätigt oder wieder freigibt.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-deepGold/70 sm:grid-cols-3">
            <div className="rounded-2xl border border-gold/15 bg-white/70 p-4"><span className="font-semibold text-warmBlack">Online möglich</span><br />ruhiger Rahmen</div>
            <div className="rounded-2xl border border-gold/15 bg-white/70 p-4"><span className="font-semibold text-warmBlack">24h reserviert</span><br />bis zur Prüfung</div>
            <div className="rounded-2xl border border-gold/15 bg-white/70 p-4"><span className="font-semibold text-warmBlack">Ohne Druck</span><br />erstes Kennenlernen</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8, delay: .1 }} className="rounded-[2.5rem] border border-gold/15 bg-white p-4 shadow-soft md:p-6">
          {success && (
            <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">{success}</div>
          )}

          {loading ? (
            <div className="p-10 text-center text-sm italic text-deepGold/40">Freie Termine werden geladen...</div>
          ) : slots.length === 0 ? (
            <div className="rounded-[2rem] bg-mist/10 p-10 text-center">
              <h3 className="text-xl font-bold text-warmBlack">Aktuell sind keine freien Termine veröffentlicht.</h3>
              <p className="mt-3 text-sm leading-7 text-deepGold/70">Schreib Sibylle gern direkt per WhatsApp, wenn du einen individuellen Terminwunsch hast.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {Object.entries(groupedSlots).map(([day, daySlots]) => (
                <div key={day} className="rounded-[2rem] bg-mist/10 p-4">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-deepGold/60">{day}</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {daySlots.map((slot) => (
                      <button key={slot.id} onClick={() => setSelectedSlot(slot)} className="rounded-2xl border border-gold/15 bg-white p-4 text-left transition-all hover:border-gold/40 hover:shadow-soft">
                        <div className="text-lg font-bold text-warmBlack">{formatTime(slot.start_time)} Uhr</div>
                        <div className="mt-1 text-sm text-deepGold/65">{slot.title || "Kostenloses Erstgespräch"}</div>
                        <div className="mt-3 inline-flex rounded-full bg-sand/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-deepGold">Frei</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedSlot && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedSlot(null)} className="absolute inset-0 bg-warmBlack/40 backdrop-blur-sm" />
            <motion.form onSubmit={reserveSlot} initial={{ opacity: 0, scale: .96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .96, y: 20 }} className="relative w-full max-w-xl rounded-[2rem] bg-white p-8 shadow-2xl md:p-10">
              <p className="eyebrow">Termin reservieren</p>
              <h3 className="mt-4 text-2xl font-bold text-warmBlack">{formatDateTime(selectedSlot.start_time)}</h3>
              <p className="mt-2 text-sm leading-7 text-deepGold/70">Der Termin wird nach dem Absenden für 24 Stunden blockiert, bis Sibylle ihn bestätigt oder ablehnt.</p>
              <div className="mt-7 space-y-4">
                <Field label="Name" value={form.name} required onChange={(value) => setForm({ ...form, name: value })} />
                <Field label="E-Mail" type="email" value={form.email} required onChange={(value) => setForm({ ...form, email: value })} />
                <Field label="Telefon" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Worum geht es kurz?</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white" />
                </div>
              </div>
              <div className="mt-8 flex gap-3">
                <button type="button" onClick={() => setSelectedSlot(null)} className="flex-1 rounded-full border border-gold/20 py-4 font-bold text-deepGold hover:bg-gold/5">Abbrechen</button>
                <button type="submit" disabled={saving} className="flex-1 rounded-full bg-deepGold py-4 font-bold text-white shadow-soft hover:bg-gold disabled:opacity-60">{saving ? "Reserviert..." : "Termin anfragen"}</button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</label>
      <input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white" />
    </div>
  );
}
