import Link from 'next/link';

type CTAButtonProps = { href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' | 'ghost'; className?: string; external?: boolean; };

export function CTAButton({ href, children, variant = 'primary', className = '', external }: CTAButtonProps) {
  const base = 'focus-ring group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full px-7 text-[.78rem] font-bold tracking-[.02em] transition-all duration-500 ease-soft hover:-translate-y-0.5 active:scale-[0.98]';
  const styles = {
    primary: 'bg-deepOlive text-cream shadow-[0_14px_36px_rgba(56,65,44,.22)] before:absolute before:inset-0 before:translate-x-[-120%] before:bg-gradient-to-r before:from-transparent before:via-softGold/40 before:to-transparent before:transition-transform before:duration-700 hover:shadow-[0_18px_46px_rgba(56,65,44,.3)] hover:before:translate-x-[120%] animate-cta-pulse before:animate-shine',
    secondary: 'border border-olive/45 bg-white/55 text-deepOlive shadow-[inset_0_1px_0_rgba(255,255,255,.8)] backdrop-blur-xl hover:border-softGold hover:bg-white/80 before:absolute before:inset-0 before:translate-x-[-120%] before:bg-gradient-to-r before:from-transparent before:via-softGold/20 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-[120%] before:animate-shine-delayed',
    ghost: 'text-deepOlive hover:bg-deepOlive/5',
  }[variant];
  const classes = `${base} ${styles} ${className}`;
  const content = <><span className="relative z-10">{children}</span><span aria-hidden="true" className="relative z-10 ml-3 transition-transform duration-300 group-hover:translate-x-1">→</span></>;
  if (external || !href.startsWith('/')) return <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}>{content}</a>;
  return <Link href={href} className={classes}>{content}</Link>;
}
