'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { themeCards } from '@/lib/sibylle/siteData';

import Image from 'next/image';

export function ThemeCards() {
  const featured = themeCards.filter((_,i)=>i<2);
  const images = [
    "/assets/sibylle/portraits/cosmic_roots.webp",
    "/assets/sibylle/portraits/be_you.webp"
  ];

  return (
    <section className="section-shell bg-sibylleMist/30">
      <div className="container">
        <div className="mb-16 flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}>
            <p className="eyebrow">Themenwelten</p>
            <h2 className="editorial mt-6 max-w-3xl text-[clamp(3.2rem,6vw,6.5rem)] leading-[.92]">Wo suchst du gerade Klarheit?</h2>
          </motion.div>
          <motion.p initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8,delay:0.2}} className="max-w-sm text-lg leading-8 text-olive">
            Kein Schema, sondern ein sorgfältiger Blick auf das, was sich in deinem Leben zeigt.
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {featured.map((item,index)=>(
            <motion.article 
              key={item.title} 
              initial={{opacity:0,y:40}} 
              whileInView={{opacity:1,y:0}} 
              viewport={{once:true}} 
              transition={{duration:1,delay:index*0.15,ease:[0.22, 1, 0.36, 1]}} 
              whileHover={{y:-12}} 
              className="group relative min-h-[35rem] overflow-hidden rounded-[3.5rem] p-10 md:p-14 shadow-[0_30px_70px_rgba(35,42,26,.08)]"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
                <Image src={images[index]} alt={item.title} fill className="object-cover" />
                <div className={`absolute inset-0 transition-colors duration-700 ${index===0 ? 'bg-deepOlive/85 group-hover:bg-deepOlive/85' : 'bg-white/85 group-hover:bg-white/85'}`} />
              </div>

              <div className="relative flex h-full flex-col z-10">
                <span className={`text-xs font-bold uppercase tracking-[.25em] ${index===0 ? 'text-softGold' : 'text-softGold'}`}>
                  {item.label}
                </span>
                <h3 className={`editorial mt-10 max-w-md text-5xl leading-[.95] md:text-6xl ${index===0 ? 'text-cream' : 'text-warmBlack'}`}>
                  {item.title}
                </h3>
                <p className={`mt-8 max-w-md text-lg leading-9 ${index===0 ? 'text-cream/70' : 'text-deepOlive/75'}`}>
                  {item.description}
                </p>
                
                <Link 
                  href={item.href} 
                  className={`focus-ring mt-auto inline-flex w-fit items-center gap-5 pt-12 text-[.8rem] font-bold uppercase tracking-widest ${index===0 ? 'text-cream' : 'text-warmBlack'}`}
                >
                  <span>Den Raum entdecken</span>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 group-hover:translate-x-2 ${index===0 ? 'border-cream/30 group-hover:bg-softGold group-hover:text-warmBlack' : 'border-warmBlack/20 group-hover:bg-deepOlive group-hover:text-cream'}`}>
                    →
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
