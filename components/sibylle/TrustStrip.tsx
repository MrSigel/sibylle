'use client';
import { motion } from 'framer-motion';
import { trustItems } from '@/lib/sibylle/siteData';

export function TrustStrip() {
  return <motion.section initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.5}} transition={{duration:.8}} className="border-y border-olive/10 bg-deepOlive text-cream">
    <div className="container grid divide-y divide-cream/10 md:grid-cols-3 md:divide-x md:divide-y-0">
      {trustItems.map((item,index)=><div key={item} className="flex items-center gap-4 px-2 py-6 md:px-8 md:py-8"><span className="editorial text-2xl text-softGold">0{index+1}</span><span className="text-sm leading-6 text-cream/85">{item}</span></div>)}
    </div>
  </motion.section>;
}
