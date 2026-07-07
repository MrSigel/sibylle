"use client";

import { useEffect, useMemo, useState } from "react";

type Mailbox = "inbox" | "sent";

type MailMessage = {
  uid: number;
  mailbox: Mailbox;
  subject: string;
  from: string;
  to: string;
  date: string | null;
  seen: boolean;
  text: string;
  html: string;
  messageId: string | null;
};

const emptyCompose = {
  to: "",
  cc: "",
  bcc: "",
  subject: "",
  text: "",
};

function formatMailDate(value: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function CrmMailPage() {
  const [mailbox, setMailbox] = useState<Mailbox>("inbox");
  const [messages, setMessages] = useState<MailMessage[]>([]);
  const [selectedUid, setSelectedUid] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [compose, setCompose] = useState(emptyCompose);

  const selectedMessage = useMemo(
    () => messages.find((message) => message.uid === selectedUid) || messages[0],
    [messages, selectedUid],
  );

  useEffect(() => {
    fetchMessages(mailbox);
  }, [mailbox]);

  async function fetchMessages(nextMailbox = mailbox) {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/crm/mail/messages?mailbox=${nextMailbox}&limit=30`, {
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "E-Mails konnten nicht geladen werden.");
      setMessages(data.messages || []);
      setSelectedUid(data.messages?.[0]?.uid || null);
    } catch (fetchError) {
      setMessages([]);
      setSelectedUid(null);
      setError(fetchError instanceof Error ? fetchError.message : "E-Mails konnten nicht geladen werden.");
    } finally {
      setIsLoading(false);
    }
  }

  async function sendMail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/crm/mail/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(compose),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "E-Mail konnte nicht versendet werden.");

      setCompose(emptyCompose);
      setSuccess("E-Mail wurde versendet.");
      if (mailbox === "sent") await fetchMessages("sent");
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "E-Mail konnte nicht versendet werden.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-warmBlack">E-Mail</h1>
          <p className="mt-2 text-deepGold/70">Eingang und Ausgang direkt im CRM.</p>
        </div>
        <button
          type="button"
          onClick={() => fetchMessages()}
          className="inline-flex items-center justify-center rounded-2xl border border-gold/20 bg-white px-5 py-3 text-sm font-bold text-deepGold transition hover:border-gold/40 hover:bg-gold/5"
        >
          Aktualisieren
        </button>
      </div>

      {(error || success) && (
        <div className={`rounded-2xl border px-5 py-4 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"}`}>
          {error || success}
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[1fr_420px]">
        <div className="overflow-hidden rounded-[32px] border border-gold/15 bg-white shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/10 p-4">
            <div className="flex rounded-2xl bg-mist/30 p-1">
              {(["inbox", "sent"] as Mailbox[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMailbox(item)}
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition ${mailbox === item ? "bg-white text-warmBlack shadow-sm" : "text-deepGold/60 hover:text-deepGold"}`}
                >
                  {item === "inbox" ? "Eingang" : "Ausgang"}
                </button>
              ))}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-deepGold/45">
              {messages.length} Nachrichten
            </span>
          </div>

          <div className="grid min-h-[620px] lg:grid-cols-[340px_1fr]">
            <div className="border-b border-gold/10 lg:border-b-0 lg:border-r">
              {isLoading ? (
                <div className="p-8 text-sm text-deepGold/50">E-Mails werden geladen...</div>
              ) : messages.length === 0 ? (
                <div className="p-8 text-sm text-deepGold/50">Keine E-Mails gefunden.</div>
              ) : (
                <div className="max-h-[620px] divide-y divide-gold/10 overflow-y-auto">
                  {messages.map((message) => {
                    const isSelected = selectedMessage?.uid === message.uid;
                    return (
                      <button
                        key={`${message.mailbox}-${message.uid}`}
                        type="button"
                        onClick={() => setSelectedUid(message.uid)}
                        className={`block w-full p-5 text-left transition ${isSelected ? "bg-gold/10" : "hover:bg-gold/5"}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="line-clamp-1 text-sm font-bold text-warmBlack">{message.subject}</p>
                          <span className="shrink-0 text-[11px] text-deepGold/45">{formatMailDate(message.date)}</span>
                        </div>
                        <p className="mt-1 line-clamp-1 text-xs font-semibold text-deepGold/60">
                          {mailbox === "sent" ? message.to || "-" : message.from || "-"}
                        </p>
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-deepGold/70">{message.text || "Keine Textvorschau verfügbar."}</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="min-w-0 p-6 lg:p-8">
              {selectedMessage ? (
                <article className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-warmBlack">{selectedMessage.subject}</h2>
                    <div className="mt-4 grid gap-2 rounded-2xl bg-mist/20 p-4 text-sm text-deepGold/70">
                      <p><span className="font-bold text-warmBlack">Von:</span> {selectedMessage.from || "-"}</p>
                      <p><span className="font-bold text-warmBlack">An:</span> {selectedMessage.to || "-"}</p>
                      <p><span className="font-bold text-warmBlack">Datum:</span> {formatMailDate(selectedMessage.date)}</p>
                    </div>
                  </div>
                  <div className="whitespace-pre-wrap rounded-2xl border border-gold/10 bg-white p-5 text-sm leading-7 text-warmBlack">
                    {selectedMessage.text || "Diese Nachricht enthält keinen lesbaren Textteil."}
                  </div>
                </article>
              ) : (
                <div className="flex min-h-[460px] items-center justify-center text-sm text-deepGold/45">
                  Wähle eine Nachricht aus.
                </div>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={sendMail} className="rounded-[32px] border border-gold/15 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-warmBlack">Neue E-Mail</h2>
          <div className="mt-6 space-y-4">
            <Field label="An" value={compose.to} type="email" required onChange={(value) => setCompose({ ...compose, to: value })} />
            <Field label="CC" value={compose.cc} type="text" onChange={(value) => setCompose({ ...compose, cc: value })} />
            <Field label="BCC" value={compose.bcc} type="text" onChange={(value) => setCompose({ ...compose, bcc: value })} />
            <Field label="Betreff" value={compose.subject} type="text" required onChange={(value) => setCompose({ ...compose, subject: value })} />
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Nachricht</span>
              <textarea
                value={compose.text}
                onChange={(event) => setCompose({ ...compose, text: event.target.value })}
                required
                rows={10}
                className="mt-2 w-full resize-none rounded-2xl border border-gold/15 bg-white px-4 py-3 text-sm text-warmBlack outline-none transition focus:border-gold"
              />
            </label>
            <button
              type="submit"
              disabled={isSending}
              className="w-full rounded-2xl bg-deepGold px-5 py-4 text-sm font-bold text-white transition hover:bg-gold disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? "Wird gesendet..." : "E-Mail senden"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type,
  required = false,
}: {
  label: string;
  value: string;
  type: string;
  required?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-deepGold/60">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-gold/15 bg-white px-4 py-3 text-sm text-warmBlack outline-none transition focus:border-gold"
      />
    </label>
  );
}
