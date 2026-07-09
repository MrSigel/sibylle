"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/sibylle/supabase";

type Subscriber = {
  id: string;
  email: string;
  status: string;
  source: string | null;
  created_at: string;
};

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  async function fetchSubscribers() {
    setLoading(true);
    setError("");
    const { data, error: fetchError } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });
    if (fetchError) {
      console.error(fetchError);
      setError('Abonnenten konnten nicht geladen werden. Ist die Tabelle "newsletter_subscribers" in Supabase angelegt?');
    }
    setSubscribers((data as Subscriber[]) || []);
    setLoading(false);
  }

  const activeCount = useMemo(() => subscribers.filter((s) => s.status === "active").length, [subscribers]);

  async function deleteSubscriber(subscriber: Subscriber) {
    if (!confirm(`${subscriber.email} wirklich aus dem Newsletter entfernen?`)) return;
    const { error: deleteError } = await supabase.from("newsletter_subscribers").delete().eq("id", subscriber.id);
    if (deleteError) {
      alert("Konnte nicht entfernt werden.");
      return;
    }
    fetchSubscribers();
  }

  async function handleSend() {
    setFeedback(null);
    if (!subject.trim() || !message.trim()) {
      setFeedback({ type: "error", text: "Bitte Betreff und Nachricht ausfüllen." });
      return;
    }
    if (!confirm(`Newsletter an ${activeCount} Empfänger senden?`)) return;

    setSending(true);
    try {
      const res = await fetch("/api/crm/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject.trim(),
          message: message.trim(),
          ctaLabel: ctaLabel.trim() || undefined,
          ctaUrl: ctaUrl.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFeedback({ type: "error", text: data.error || "Versand fehlgeschlagen." });
      } else {
        setFeedback({ type: "ok", text: `Newsletter an ${data.count} Empfänger gesendet.` });
        setSubject("");
        setMessage("");
        setCtaLabel("");
        setCtaUrl("");
      }
    } catch {
      setFeedback({ type: "error", text: "Verbindung fehlgeschlagen." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-warmBlack">Newsletter</h1>
        <p className="text-deepGold/70">Eingetragene Kontakte verwalten und Infos (z. B. zur Academy) versenden.</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">{error}</div>
      )}

      <div className="grid gap-6 sm:grid-cols-3">
        <Stat label="Eingetragen" value={String(subscribers.length)} />
        <Stat label="Aktiv" value={String(activeCount)} />
        <Stat
          label="Neu (30 Tage)"
          value={String(
            subscribers.filter((s) => Date.now() - new Date(s.created_at).getTime() < 30 * 86400000).length,
          )}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        {/* Compose */}
        <div className="rounded-[32px] border border-gold/15 bg-white p-8 shadow-soft">
          <h2 className="text-xl font-bold text-warmBlack">Newsletter verfassen</h2>
          <p className="mt-1 text-sm text-deepGold/60">
            Wird als gestaltete E-Mail an alle {activeCount} aktiven Kontakte gesendet (BCC).
          </p>

          <div className="mt-6 space-y-5">
            <Field label="Betreff" value={subject} onChange={setSubject} placeholder="Die Academy ist bald da …" />
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Nachricht</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                placeholder={"Liebe Grüße,\n\nich freue mich, dir mitteilen zu können …"}
                className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 leading-7 outline-none focus:border-gold/40 focus:bg-white"
              />
              <p className="text-xs text-deepGold/40">Absätze durch eine Leerzeile trennen.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Button-Text (optional)" value={ctaLabel} onChange={setCtaLabel} placeholder="Mehr erfahren" />
              <Field label="Button-Link (optional)" value={ctaUrl} onChange={setCtaUrl} placeholder="https://…" />
            </div>

            {feedback && (
              <p className={`text-sm font-semibold ${feedback.type === "error" ? "text-red-600" : "text-green-600"}`}>
                {feedback.text}
              </p>
            )}

            <button
              onClick={handleSend}
              disabled={sending || activeCount === 0}
              className="w-full rounded-full bg-deepGold py-4 font-bold text-white shadow-soft transition-all hover:bg-gold disabled:opacity-40"
            >
              {sending ? "Wird gesendet…" : `An ${activeCount} Empfänger senden`}
            </button>
          </div>
        </div>

        {/* Subscribers */}
        <div className="rounded-[32px] border border-gold/15 bg-white p-2 shadow-soft">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-bold text-warmBlack">Kontakte</h2>
            <span className="text-xs font-bold uppercase tracking-widest text-deepGold/40">{subscribers.length}</span>
          </div>
          <div className="max-h-[460px] divide-y divide-gold/5 overflow-y-auto">
            {loading ? (
              <div className="p-10 text-center text-sm italic text-deepGold/40">Kontakte werden geladen…</div>
            ) : subscribers.length === 0 ? (
              <div className="p-10 text-center text-sm italic text-deepGold/40">Noch keine Newsletter-Kontakte.</div>
            ) : (
              subscribers.map((subscriber) => (
                <motion.div
                  key={subscriber.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between gap-3 px-6 py-4 hover:bg-gold/5"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-warmBlack">{subscriber.email}</div>
                    <div className="text-xs text-deepGold/50">
                      {new Date(subscriber.created_at).toLocaleDateString("de-DE")}
                      {subscriber.source ? ` · ${subscriber.source}` : ""}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteSubscriber(subscriber)}
                    aria-label="Kontakt entfernen"
                    className="shrink-0 rounded-full p-1.5 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-gold/15 bg-white p-6 shadow-soft">
      <div className="mb-2 text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</div>
      <div className="text-3xl font-bold text-warmBlack">{value}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white"
      />
    </div>
  );
}
