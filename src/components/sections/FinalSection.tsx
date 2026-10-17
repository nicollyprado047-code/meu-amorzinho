import { useState, useEffect } from 'react';
import { FINAL } from '@/config';
import { useScrollReveal } from '@/hooks/useScroll';

/**
 * Section 7 — Final closing.
 * Even darker background, minimal text appearing in sequence,
 * stars slowly fading away. Emotional, warm, quiet ending.
 */
export default function FinalSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 3500);
    const t3 = setTimeout(() => setPhase(3), 6000);
    const t4 = setTimeout(() => setPhase(4), 7500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isVisible]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at center, #030611 0%, #020409 50%, #010204 100%)',
      }}
    >
      {/* Fading stars decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-luminous-soft"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: phase >= 3 ? 0.1 : 0.5,
              transition: `opacity ${3 + Math.random() * 4}s ease ${Math.random() * 2}s`,
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-xl">
        {/* First line */}
        <p
          className={`font-serif text-2xl sm:text-3xl md:text-4xl text-night-50/80 italic transition-all duration-[2s] ${
            phase >= 1 ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'
          }`}
        >
          {FINAL.firstLine}
        </p>

        {/* Second line */}
        <p
          className={`mt-8 font-serif text-2xl sm:text-3xl md:text-4xl text-night-50/80 italic transition-all duration-[2s] ${
            phase >= 2 ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'
          }`}
        >
          {FINAL.secondLine}
        </p>

        {/* Final line with heart */}
        <p
          className={`mt-12 font-serif text-3xl sm:text-4xl md:text-5xl text-glow transition-all duration-[2.5s] ${
            phase >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          <span className="text-shimmer">{FINAL.finalLine}</span>
          <span className="inline-block ml-3 text-blue-400" style={{ animation: 'breath 3s ease-in-out infinite' }}>
            {FINAL.heartIcon}
          </span>
        </p>

        {/* Signature */}
        <p
          className={`mt-16 font-sans text-xs sm:text-sm text-night-100/30 tracking-[0.2em] uppercase transition-all duration-[2s] ${
            phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {FINAL.signature}
        </p>

        {/* Final fading star */}
        <div
          className={`mt-12 transition-opacity duration-[5s] ${phase >= 4 ? 'opacity-60' : 'opacity-0'}`}
          aria-hidden="true"
        >
          <span className="font-serif text-luminous/40 text-lg" style={{ animation: 'twinkle 4s ease-in-out infinite' }}>
            ✦
          </span>
        </div>
      </div>
    </section>
  );
}
