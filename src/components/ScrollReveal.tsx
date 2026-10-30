import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      ref.current,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          end: 'top 58%',
          scrub: 0.8,
        },
      }
    );
    return () => {
      if (ref.current) ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === ref.current) t.kill();
      });
    };
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}