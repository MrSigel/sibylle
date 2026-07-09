"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/sibylle/supabase";
import { useCrmDeepLink } from "@/lib/sibylle/hooks";
import { instagramEmbedUrl, parseInstagramUrl, type SocialPost } from "@/lib/sibylle/social";

export default function SocialMediaPage() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const { openNew } = useCrmDeepLink();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (openNew) openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openNew]);

  useEffect(() => {
    if (!isModalOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  async function fetchPosts() {
    setLoading(true);
    setError("");
    const { data, error: fetchError } = await supabase
      .from("social_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (fetchError) {
      console.error(fetchError);
      setError(
        "Videos konnten nicht geladen werden. Ist die Tabelle \"social_posts\" bereits in Supabase angelegt?",
      );
    }
    setPosts((data as SocialPost[]) || []);
    setLoading(false);
  }

  function openModal() {
    setLinkInput("");
    setFormError("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const preview = useMemo(() => parseInstagramUrl(linkInput), [linkInput]);

  async function handleAdd() {
    setFormError("");
    const parsed = parseInstagramUrl(linkInput);
    if (!parsed) {
      setFormError("Bitte einen gültigen Instagram-Link einfügen (z. B. https://www.instagram.com/reel/…).");
      return;
    }
    setSaving(true);
    const { error: insertError } = await supabase.from("social_posts").insert([
      { url: parsed.url, shortcode: parsed.shortcode, media_type: parsed.type },
    ]);
    setSaving(false);
    if (insertError) {
      setFormError(
        insertError.code === "23505"
          ? "Dieses Video wurde bereits hinzugefügt."
          : "Speichern fehlgeschlagen. Wurde die Tabelle \"social_posts\" in Supabase angelegt?",
      );
      return;
    }
    setIsModalOpen(false);
    fetchPosts();
  }

  async function deletePost(post: SocialPost) {
    if (!confirm("Dieses Video wirklich von der Website entfernen?")) return;
    const { error: deleteError } = await supabase.from("social_posts").delete().eq("id", post.id);
    if (deleteError) {
      alert("Das Video konnte nicht entfernt werden.");
      return;
    }
    fetchPosts();
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-warmBlack">Social Media</h1>
          <p className="text-deepGold/70">Instagram-Videos einfügen – das neueste erscheint automatisch auf der Startseite.</p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center gap-2 rounded-full bg-deepGold px-6 py-3 font-semibold text-white shadow-soft transition-all hover:bg-gold"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Neues Video hochladen
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-[32px] border border-gold/15 bg-white p-16 text-center text-sm italic text-deepGold/40 shadow-soft">
          Videos werden geladen…
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-[32px] border border-dashed border-gold/30 bg-white p-16 text-center shadow-soft">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-softGold/10 text-softGold">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </div>
          <p className="text-lg font-bold text-warmBlack">Noch keine Videos</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-deepGold/60">
            Füge dein erstes Instagram-Video hinzu – es erscheint sofort im Instagram-Abschnitt auf der Startseite.
          </p>
          <button
            onClick={openModal}
            className="mt-6 rounded-full bg-deepGold px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:bg-gold"
          >
            Neues Video hochladen
          </button>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col overflow-hidden rounded-[28px] border border-gold/15 bg-white shadow-soft"
            >
              <div className="flex items-center justify-between border-b border-gold/10 px-5 py-3">
                {index === 0 ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-softGold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-deepGold">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Aktuell auf der Website
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-deepGold/40">
                    {new Date(post.created_at).toLocaleDateString("de-DE")}
                  </span>
                )}
                <button
                  onClick={() => deletePost(post)}
                  aria-label="Video entfernen"
                  className="rounded-full p-1.5 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
              <div className="relative aspect-[4/5] w-full bg-mist/10">
                <iframe
                  src={instagramEmbedUrl(post)}
                  title={`Instagram ${post.shortcode}`}
                  loading="lazy"
                  scrolling="no"
                  allowTransparency
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
              <a
                href={post.url}
                target="_blank"
                rel="noreferrer noopener"
                className="truncate border-t border-gold/10 px-5 py-3 text-xs font-medium text-deepGold/60 underline decoration-softGold/40 underline-offset-4 transition hover:text-softGold"
              >
                {post.url}
              </a>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <div onClick={closeModal} className="fixed inset-0 z-[100] flex overflow-y-auto bg-warmBlack/40 p-4 backdrop-blur-sm sm:p-10">
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="relative m-auto w-full max-w-lg overflow-hidden rounded-[32px] bg-white p-8 shadow-2xl md:p-10"
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label="Fenster schließen"
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-mist/20 text-warmBlack transition-all hover:bg-deepGold hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <h2 className="text-2xl font-bold text-warmBlack">Neues Video hochladen</h2>
              <p className="mt-2 text-sm text-deepGold/70">
                Öffne dein Reel in Instagram, kopiere den Link und füge ihn hier ein.
              </p>

              <div className="mt-7 space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-deepGold/60">Instagram-Link</label>
                <input
                  autoFocus
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                  placeholder="https://www.instagram.com/reel/…"
                  className="w-full rounded-2xl border border-gold/15 bg-mist/5 px-4 py-3 outline-none focus:border-gold/40 focus:bg-white"
                />
                {linkInput && !preview && (
                  <p className="text-xs font-medium text-red-500">Kein gültiger Instagram-Link erkannt.</p>
                )}
                {formError && <p className="text-xs font-medium text-red-500">{formError}</p>}
              </div>

              {preview && (
                <div className="mt-6">
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-deepGold/40">Vorschau</p>
                  <div className="relative mx-auto aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-2xl border border-gold/15 bg-mist/10">
                    <iframe
                      src={instagramEmbedUrl(preview)}
                      title="Vorschau"
                      scrolling="no"
                      allowTransparency
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  </div>
                </div>
              )}

              <div className="mt-8 flex gap-4">
                <button
                  onClick={closeModal}
                  type="button"
                  className="flex-1 rounded-full border border-gold/20 py-3.5 font-bold text-deepGold"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleAdd}
                  disabled={saving || !preview}
                  type="button"
                  className="flex-1 rounded-full bg-deepGold py-3.5 font-bold text-white shadow-soft transition-all hover:bg-gold disabled:opacity-40"
                >
                  {saving ? "Speichern…" : "Veröffentlichen"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
