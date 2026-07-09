'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/sibylle/supabase';
import { instagramEmbedUrl, type SocialPost } from '@/lib/sibylle/social';

const ease = [0.22, 1, 0.36, 1] as const;
const INSTAGRAM_PROFILE = 'https://www.instagram.com/sibyllebergold/';

export function InstagramSection() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from('social_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data, error }) => {
        if (!active) return;
        if (error) console.warn('Instagram-Videos konnten nicht geladen werden:', error.message);
        setPosts((data as SocialPost[]) || []);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="section-shell bg-white/30">
      <div className="container">
        <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="eyebrow">Instagram</p>
            <h2 className="editorial mt-6 max-w-3xl text-[clamp(3rem,6vw,6rem)] leading-[.92]">
              Einblicke & <span className="italic text-deepGold">Impulse</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-deepGold/75">
              Gedanken, Impulse und kleine Momente aus der systemischen Arbeit – direkt von Sibylles Instagram.
            </p>
          </motion.div>

          <a
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noreferrer noopener"
            className="focus-ring inline-flex items-center gap-3 rounded-full border border-gold/20 px-6 py-3 font-semibold text-deepGold transition hover:bg-softGold hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            @sibyllebergold
          </a>
        </div>

        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-[2rem] border border-gold/10 bg-white/60" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="flex flex-col items-center gap-6 rounded-[2.5rem] border border-gold/10 bg-white/50 p-14 text-center"
          >
            <p className="max-w-md text-lg leading-8 text-deepGold/70">
              Folge Sibylle auf Instagram für Impulse rund um systemische Aufstellung und Selbsterfahrung.
            </p>
            <a
              href={INSTAGRAM_PROFILE}
              target="_blank"
              rel="noreferrer noopener"
              className="focus-ring inline-flex items-center gap-3 rounded-full bg-deepGold px-7 py-3.5 font-semibold text-white transition hover:bg-gold"
            >
              Auf Instagram folgen
            </a>
          </motion.div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.7, ease }}
                className="relative overflow-hidden rounded-[2rem] border border-gold/10 bg-white shadow-[0_20px_50px_rgba(35,42,26,.08)]"
              >
                {index === 0 && (
                  <div className="absolute left-4 top-4 z-10 rounded-full bg-deepGold px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-cream shadow-md">
                    Neu
                  </div>
                )}
                <div className="relative aspect-[4/5] w-full">
                  <iframe
                    src={instagramEmbedUrl(post)}
                    title={`Instagram-Video ${index + 1}`}
                    loading="lazy"
                    scrolling="no"
                    allowTransparency
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
