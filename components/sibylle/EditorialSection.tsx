'use client';
import { motion } from 'framer-motion';

export function EditorialSection() {
  return <section className="section-shell overflow-hidden">
    <div className="absolute right-[-8rem] top-20 h-80 w-80 rounded-full bg-softGold/15 blur-[90px]" />
    <div className="container relative grid gap-12 lg:grid-cols-[.55fr_1fr] lg:gap-20">
      <motion.div initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="lg:pt-4"><p className="eyebrow">Der Moment dazwischen</p><p className="mt-7 max-w-sm text-sm leading-7 text-olive">Nicht alles, was sich festgefahren anfühlt, braucht mehr Anstrengung. Manches braucht einen neuen Blick.</p></motion.div>
      <motion.div initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{duration:.9}}>
        <h2 className="editorial text-[clamp(2.8rem,5.6vw,6rem)] leading-[.98]">Rückzug ist kein Stillstand. Er kann der Raum sein, in dem <span className="italic text-deepOlive">neue Antworten</span> entstehen.</h2>
        <div className="mt-10 grid gap-7 border-t border-olive/20 pt-8 md:grid-cols-2"><p className="text-base leading-8 text-deepOlive/85">Systemische Aufstellungen können Zusammenhänge in Beziehungen, Herkunft und dem eigenen Erleben sichtbar machen.</p><p className="text-base leading-8 text-deepOlive/85">Die Begleitung ist Coaching und Selbsterfahrung: aufmerksam, wertschätzend und ohne Heilversprechen.</p></div>
      </motion.div>
    </div>
  </section>;
}
