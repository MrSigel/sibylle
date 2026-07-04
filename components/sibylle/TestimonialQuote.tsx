type TestimonialQuoteProps = {
  quote: string;
  source: string;
  verified?: boolean;
};

export function TestimonialQuote({ quote, source, verified = false }: TestimonialQuoteProps) {
  if (!verified) return null;
  return <blockquote className="rounded-[2rem] border border-gold/15 bg-white/70 p-8"><span className="editorial text-6xl text-softGold">“</span><p className="editorial mt-2 text-3xl leading-snug text-deepGold">{quote}</p><footer className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-gold">{source}</footer></blockquote>;
}
