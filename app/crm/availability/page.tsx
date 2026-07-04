"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/sibylle/supabase";
import { appointmentTypes, formatDateTime, formatDateTimeLocal, formatTime, publicSlotState } from "@/lib/sibylle/crm";

const emptySlot = {
  title: "Kostenloses Erstgespräch",
  start_time: formatDateTimeLocal(new Date(Date.now() + 24 * 60 * 60 * 1000)),
  end_time: formatDateTimeLocal(new Date(Date.now() + 25 * 60 * 60 * 1000)),
  appointment_type: "Zoom",
};

export default function AvailabilityPage() {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSlot, setFormSlot] = useState(emptySlot);

  useEffect(() => {
    fetchSlots();
  }, []);

  async function fetchSlots() {
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("public_visible", true)
      .gte("start_time", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order("start_time", { ascending: true });

    if (error) {
      console.error(error);
      alert("Freigaben konnten nicht geladen werden.");
    }
    setSlots(data || []);
    setLoading(false);
  }

  async function createSlot(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("appointments").insert([{
      title: formSlot.title.trim() || "Kostenloses Erstgespräch",
      start_time: new Date(formSlot.start_time).toISOString(),
      end_time: formSlot.end_time ? new Date(formSlot.end_time).toISOString() : null,
      appointment_type: formSlot.appointment_type,
      status: "Geplant",
      public_visible: true,
      booking_status: "Frei",
      reserved_until: null,
    }]);

    if (error) {
      alert("Slot konnte nicht angelegt werden.");
      return;
    }

    setIsModalOpen(false);
    setFormSlot(emptySlot);
    fetchSlots();
  }

  async function confirmBooking(slot: any) {
    const { error } = await supabase.from("appointments").update({
      booking_status: "Bestätigt",
      status: "Bestätigt",
      public_visible: false,
      reserved_until: null,
      updated_at: new Date().toISOString(),
    }).eq("id", slot.id);

    if (error) alert("Termin konnte nicht bestätigt werden.");
    fetchSlots();
  }

  async function rejectBooking(slot: any) {
    const { error } = await supabase.from("appointments").update({
      booking_status: "Frei",
      status: "Geplant",
      reserved_until: null,
      booked_name: null,
      booked_email: null,
      booked_phone: null,
      booked_message: null,
      booking_created_at: null,
      updated_at: new Date().toISOString(),
    }).eq("id", slot.id);

    if (error) alert("Termin konnte nicht freigegeben werden.");
    fetchSlots();
  }

  async function deleteSlot(slot: any) {
    if (!confirm(`Slot am ${formatDateTime(slot.start_time)} wirklich löschen?`)) return;
    const { error } = await supabase.from("appointments").delete().eq("id", slot.id);
    if (error) alert("Slot konnte nicht gelöscht werden.");
    fetchSlots();
  }

  const reservedSlots = useMemo(() => slots.filter((slot) => publicSlotState(slot) === "Reserviert"), [slots]);
  const freeSlots = useMemo(() => slots.filter((slot) => publicSlotState(slot) === "Frei"), [slots]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-warmBlack">Öffentliche Kalenderfreigabe</h1>
          <p className="text-deepGold/70">Freie Erstgespräch-Slots für die Landingpage veröffentlichen und Buchungsanfragen prüfen.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="rounded-full bg-deepGold px-6 py-3 font-semibold text-white shadow-soft transition-all hover:bg-gold">Freien Slot anlegen</button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Stat label="Reserviert" value={String(reservedSlots.length)} />
        <Stat label="Frei veröffentlicht" value={String(freeSlots.length)} />
        <Stat label="Gesamt sichtbar" value={String(slots.length)} />
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-warmBlack">Neue Buchungsanfragen</h2>
        <div className="grid gap-4">
          {loading ? (
            <div className="rounded-[32px] border border-gold/15 bg-white p-8 text-center text-sm italic text-deepGold/40 shadow-soft">Daten werden geladen...</div>
          ) : reservedSlots.length === 0 ? (
            <div className="rounded-[32px] border border-gold/15 bg-white p-8 text-center text-sm italic text-deepGold/40 shadow-soft">Keine offenen Buchungsanfragen.</div>
          ) : reservedSlots.map((slot, index) => (
            <motion.div key={slot.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .04 }} className="rounded-[32px] border border-gold/15 bg-white p-6 shadow-soft">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-softGold">Reserviert bis {slot.reserved_until ? formatDateTime(slot.reserved_until) : "-"}</div>
                  <h3 className="mt-2 text-xl font-bold text-warmBlack">{formatDateTime(slot.start_time)} · {slot.title}</h3>
                  <div className="mt-4 grid gap-2 text-sm text-deepGold/70 md:grid-cols-2">
                    <p><span className="font-bold text-warmBlack">Name:</span> {slot.booked_name}</p>
                    <p><span className="font-bold text-warmBlack">E-Mail:</span> {slot.booked_email}</p>
                    <p><span className="font-bold text-warmBlack">Telefon:</span> {slot.booked_phone || "-"}</p>
                    <p><span className="font-bold text-warmBlack">Art:</span> {slot.appointment_type}</p>
                  </div>
                  {slot.booked_message && <p className="mt-4 rounded-2xl bg-mist/10 p-4 text-sm leading-7 text-deepGold/80">{slot.booked_message}</p>}
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                  <button onClick={() => confirmBooking(slot)} className="rounded-full bg-deepGold px-5 py-3 text-sm font-bold text-white hover:bg-gold">Bestätigen</button>
                  <button onClick={() => rejectBooking(slot)} className="rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-deepGold hover:bg-gold/5">Ablehnen & freigeben</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-warmBlack">Veröffentlichte freie Slots</h2>
        <div className="overflow-hidden rounded-[32px] border border-gold/15 bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-mist/10 text-xs font-bold uppercase tracking-widest text-deepGold/60">
                <tr><th className="px-6 py-4">Datum</th><th className="px-6 py-4">Zeit</th><th className="px-6 py-4">Titel</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Aktionen</th></tr>
              </thead>
              <tbody className="divide-y divide-gold/5">
                {slots.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-10 text-center text-sm italic text-deepGold/40">Keine Slots veröffentlicht.</td></tr>
                ) : slots.map((slot) => (
                  <tr key={slot.id} className="hover:bg-gold/5">
                    <td className="px-6 py-5 font-semibold text-warmBlack">{new Date(slot.start_time).toLocaleDateString("de-DE")}</td>
                    <td className="px-6 py-5 text-deepGold/70">{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</td>
                    <td className="px-6 py-5">{slot.title}</td>
                    <td className="px-6 py-5"><Badge state={publicSlotState(slot)} /></td>
                    <td className="px-6 py-5 text-right"><button onClick={() => deleteSlot(slot)} className="text-red-400 hover:text-red-600">Löschen</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-warmBlack/40 backdrop-blur-sm" />
            <motion.form onSubmit={createSlot} initial={{ opacity: 0, scale: .96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .96, y: 20 }} className="relative w-full max-w-xl rounded-[32px] bg-white p-8 shadow-2xl md:p-12">
              <h2 className="mb-8 text-2xl font-bold text-warmBlack">Freien Slot veröffentlichen</h2>
              <div className="space-y-5">
                <Field label="Titel" value={formSlot.title} onChange={(value) => setFormSlot({ ...formSlot, title: value })} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Start" type="datetime-local" value={formSlot.start_time} onChange={(value) => setFormSlot({ ...formSlot, start_time: value })} />
                  <Field label="Ende" type="datetime-local" value={formSlot.end_time} onChange={(value) => setFormSlot({ ...formSlot, end_time: value })} />
                  <Select label="Art" value={formSlot.appointment_type} onChange={(value) => setFormSlot({ ...formSlot, appointment_type: value })}>{appointmentTypes.map((type) => <option key={type}>{type}</option>)}</Select>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 rounded-full border border-gold/20 py-4 font-bold text-deepGold hover:bg-gold/5">Abbrechen</button>
                <button type="submit" className="flex-1 rounded-full bg-deepGold py-4 font-bold text-white shadow-soft hover:bg-gold">Veröffentlichen</button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[32px] border border-gold/15 bg-white p-8 shadow-soft"><div className="mb-2 text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</div><div className="text-3xl font-bold text-warmBlack">{value}</div></div>;
}

function Badge({ state }: { state: string }) {
  const color = state === "Reserviert" ? "bg-blue-100 text-blue-700" : state === "Bestätigt" ? "bg-green-100 text-green-700" : "bg-sand/40 text-deepGold";
  return <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${color}`}>{state}</span>;
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</label><input required type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white" /></div>;
}

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: React.ReactNode }) {
  return <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</label><select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white">{children}</select></div>;
}
