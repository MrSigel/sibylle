"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/sibylle/supabase";
import { appointmentStatuses, appointmentTypes, customerNameFromRelation, formatDateTimeLocal } from "@/lib/sibylle/crm";

const emptyAppointment = {
  title: "",
  customer_id: "",
  start_time: formatDateTimeLocal(new Date()),
  end_time: formatDateTimeLocal(new Date(Date.now() + 60 * 60 * 1000)),
  appointment_type: "Zoom",
  status: "Geplant",
};

export default function CalendarPage() {
  const [monthDate, setMonthDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formAppointment, setFormAppointment] = useState(emptyAppointment);

  useEffect(() => {
    fetchData();
  }, [monthDate]);

  async function fetchData() {
    const start = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1).toISOString();
    const end = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1).toISOString();
    const [{ data: appts, error }, { data: custs }] = await Promise.all([
      supabase.from("appointments").select("*, customers(name)").gte("start_time", start).lt("start_time", end).order("start_time"),
      supabase.from("customers").select("id, name").order("name"),
    ]);
    if (error) {
      console.error(error);
      alert("Termine konnten nicht geladen werden.");
    }
    setAppointments(appts || []);
    setCustomers(custs || []);
  }

  function openNewAppointment(date = selectedDate) {
    const start = new Date(date);
    start.setHours(10, 0, 0, 0);
    setFormAppointment({
      ...emptyAppointment,
      start_time: formatDateTimeLocal(start),
      end_time: formatDateTimeLocal(new Date(start.getTime() + 60 * 60 * 1000)),
    });
    setIsModalOpen(true);
  }

  async function saveAppointment(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("appointments").insert([{
      title: formAppointment.title.trim(),
      customer_id: formAppointment.customer_id || null,
      start_time: new Date(formAppointment.start_time).toISOString(),
      end_time: formAppointment.end_time ? new Date(formAppointment.end_time).toISOString() : null,
      appointment_type: formAppointment.appointment_type,
      status: formAppointment.status,
    }]);
    if (error) {
      alert("Termin konnte nicht gespeichert werden.");
      return;
    }
    setIsModalOpen(false);
    fetchData();
  }

  async function updateStatus(appointment: any, status: string) {
    const { error } = await supabase.from("appointments").update({ status, updated_at: new Date().toISOString() }).eq("id", appointment.id);
    if (error) alert("Terminstatus konnte nicht gespeichert werden.");
    fetchData();
  }

  async function deleteAppointment(appointment: any) {
    if (!confirm(`Termin "${appointment.title}" wirklich löschen?`)) return;
    const { error } = await supabase.from("appointments").delete().eq("id", appointment.id);
    if (error) alert("Termin konnte nicht gelöscht werden.");
    fetchData();
  }

  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
  const firstWeekday = (new Date(monthDate.getFullYear(), monthDate.getMonth(), 1).getDay() + 6) % 7;
  const selectedAgenda = useMemo(() => appointments.filter((apt) => new Date(apt.start_time).toDateString() === selectedDate.toDateString()), [appointments, selectedDate]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-warmBlack">Termin-Kalender</h1>
          <p className="text-deepGold/70">Verwalten Sie Ihre Coaching-Sitzungen und freien Kapazitäten.</p>
        </div>
        <button onClick={() => openNewAppointment()} className="flex items-center gap-2 rounded-full bg-deepGold px-6 py-3 font-semibold text-white shadow-soft transition-all hover:bg-gold">Neuer Termin</button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-warmBlack/40 backdrop-blur-sm" />
            <motion.form onSubmit={saveAppointment} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="relative w-full max-w-xl rounded-[32px] bg-white p-8 shadow-2xl md:p-12">
              <h2 className="mb-8 text-2xl font-bold text-warmBlack">Termin anlegen</h2>
              <div className="space-y-5">
                <Field label="Titel" required value={formAppointment.title} onChange={(value) => setFormAppointment({ ...formAppointment, title: value })} />
                <Select label="Kunde" value={formAppointment.customer_id} onChange={(value) => setFormAppointment({ ...formAppointment, customer_id: value })}>
                  <option value="">Ohne Kundenzuordnung</option>
                  {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
                </Select>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Start" type="datetime-local" value={formAppointment.start_time} onChange={(value) => setFormAppointment({ ...formAppointment, start_time: value })} />
                  <Field label="Ende" type="datetime-local" value={formAppointment.end_time} onChange={(value) => setFormAppointment({ ...formAppointment, end_time: value })} />
                  <Select label="Art" value={formAppointment.appointment_type} onChange={(value) => setFormAppointment({ ...formAppointment, appointment_type: value })}>{appointmentTypes.map((type) => <option key={type}>{type}</option>)}</Select>
                  <Select label="Status" value={formAppointment.status} onChange={(value) => setFormAppointment({ ...formAppointment, status: value })}>{appointmentStatuses.map((status) => <option key={status}>{status}</option>)}</Select>
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

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-[32px] border border-gold/15 bg-white p-8 shadow-soft lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold text-warmBlack">{monthDate.toLocaleDateString("de-DE", { month: "long", year: "numeric" })}</h2>
            <div className="flex gap-2">
              <button onClick={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1))} className="rounded-full border border-gold/20 p-2 text-gold transition-colors hover:bg-gold/5">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1))} className="rounded-full border border-gold/20 p-2 text-gold transition-colors hover:bg-gold/5">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => <div key={day} className="pb-4 text-center text-xs font-bold uppercase tracking-widest text-deepGold/40">{day}</div>)}
            {Array.from({ length: firstWeekday }).map((_, i) => <div key={`blank-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), i + 1);
              const count = appointments.filter((apt) => new Date(apt.start_time).toDateString() === date.toDateString()).length;
              const selected = date.toDateString() === selectedDate.toDateString();
              return (
                <button key={i} onClick={() => setSelectedDate(date)} onDoubleClick={() => openNewAppointment(date)} className={`flex h-20 flex-col items-center justify-center rounded-2xl border text-warmBlack transition-all ${selected ? "border-gold/40 bg-sand/30" : "border-gold/5 bg-mist/5 hover:border-gold/30 hover:bg-white"}`}>
                  <span className="text-sm font-bold">{i + 1}</span>
                  {count > 0 && <span className="mt-1 rounded-full bg-deepGold px-2 py-0.5 text-[10px] font-bold text-white">{count}</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-warmBlack">Agenda für {selectedDate.toLocaleDateString("de-DE")}</h2>
          <div className="space-y-4">
            {selectedAgenda.length > 0 ? selectedAgenda.map((apt, i) => (
              <motion.div key={apt.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="group relative flex gap-4 rounded-2xl border border-gold/15 bg-white p-5 shadow-soft hover:border-gold/30">
                <div className="flex flex-col items-center border-r border-gold/10 pr-4">
                  <span className="text-sm font-bold text-warmBlack">{new Date(apt.start_time).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}</span>
                  <div className="mt-2 h-2 w-2 rounded-full bg-softGold" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-warmBlack">{apt.title}</h3>
                  <p className="text-sm text-deepGold/60">{customerNameFromRelation(apt.customers)}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-full bg-mist/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-deepGold">{apt.appointment_type}</span>
                    <select value={apt.status} onChange={(e) => updateStatus(apt, e.target.value)} className="rounded-full border border-gold/15 bg-white px-2 py-0.5 text-[10px] font-bold uppercase text-deepGold outline-none">{appointmentStatuses.map((status) => <option key={status}>{status}</option>)}</select>
                    <button onClick={() => deleteAppointment(apt)} className="text-[10px] font-bold uppercase tracking-widest text-red-400">Löschen</button>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="rounded-2xl border border-gold/10 bg-white p-10 text-center text-sm italic text-deepGold/40">Keine Termine für diesen Tag.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</label><input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white" /></div>;
}

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: React.ReactNode }) {
  return <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</label><select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white">{children}</select></div>;
}
