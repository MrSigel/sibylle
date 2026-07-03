'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { faqItems } from '@/lib/sibylle/siteData';

export function FAQAccordion() {
  const [active,setActive]=useState<number|null>(null);
  return <section className="section-shell bg-sibylleMist/55"><div className="container grid gap-12 lg:grid-cols-[.65fr_1.35fr] lg:gap-20"><div><p className="eyebrow">Gut zu wissen</p><h2 className="editorial mt-6 text-5xl leading-none md:text-7xl">Fragen, die Raum verdienen.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-olive">Klarheit beginnt oft mit einer guten Frage. Hier findest du die wichtigsten Antworten zur Begleitung.</p></div><div className="divide-y divide-olive/15 border-y border-olive/15">{faqItems.map((item,index)=>{const open=active===index;return <div key={item.question}><button type="button" aria-expanded={open} onClick={()=>setActive(open?null:index)} className="focus-ring group flex w-full items-center justify-between gap-6 py-7 text-left"><span className="editorial text-2xl leading-tight md:text-3xl">{item.question}</span><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-olive/25 text-xl text-deepOlive transition duration-500 ${open?'bg-deepOlive text-cream':''}`}>{open ? '−' : '+'}</span></button><AnimatePresence initial={false}>{open&&<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.45}} className="overflow-hidden"><p className="max-w-2xl pb-8 pr-12 leading-8 text-deepOlive/75">{item.answer}</p></motion.div>}</AnimatePresence></div>})}</div></div></section>;
}
