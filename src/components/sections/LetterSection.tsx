import { useRef, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LETTER } from '@/config';
import { useScrollReveal } from '@/hooks/useScroll';

/**
 * Digital letter section.
 * The letter text starts dimmed/blurry and is revealed progressively
 * as the user scrolls through the section, simulating a gradual "writing" effect.
 */
export default function LetterSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>();
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);

  // Track which paragraphs are in view to reveal them one by one
  useEffect(() => {
    if (!isVisible) return;

    const observers: IntersectionObserver[] = [];

    LETTER.paragraphs.forEach((_, i) => {
      const el = paragraphRefs.current[i];
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setRevealedCount((prev) => Math.max(prev, i + 1));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5, rootMargin: '0px 0px -20% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6"
    >
      {/* Section title */}
      <div className={`scroll-reveal ${isVisible ? 'is-visible' : ''} text-center mb-12`}>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-night-50 text-glow font-light italic">
          {LETTER.title}
        </h2>
        <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-luminous/40 to-transparent" />
      </div>

      {/* Letter card */}
      <div
        className={`scroll-reveal ${isVisible ? 'is-visible' : ''} relative max-w-2xl w-full`}
        style={{ transitionDelay: '0.3s' }}
      >
        <div className="glass-card rounded-2xl p-8 sm:p-12 md:p-16 relative overflow-hidden">
          {/* Subtle paper texture effect */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 30% 20%, rgba(125,181,255,0.03), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(125,181,255,0.02), transparent 60%)',
            }}
            aria-hidden="true"
          />

          {/* Wax-seal-like decoration */}
          <div
            className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(125,181,255,0.15), transparent 70%)',
            }}
            aria-hidden="true"
          >
            <span className="font-serif text-luminous text-xl">✦</span>
          </div>

          <div className="relative space-y-6 font-serif text-lg sm:text-xl leading-relaxed text-night-50/90">
            {LETTER.paragraphs.map((para, i) => (
              <p
                key={i}
                ref={(el) => {
                  paragraphRefs.current[i] = el;
                }}
                className={`letter-text transition-all duration-[1.5s] ${
                  i < revealedCount ? 'is-revealed' : ''
                }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {para}
              </p>
            ))}

            {/* Closing line */}
            <div
              className={`pt-6 transition-all duration-[2s] ${
                revealedCount >= LETTER.paragraphs.length
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="w-12 h-px bg-luminous/30 mx-auto mb-6" />
              <p className="font-serif italic text-center text-luminous-soft text-xl sm:text-2xl text-glow whitespace-pre-line">
                {LETTER.closing}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue arrow */}
      <div
        className={`mt-12 transition-all duration-1000 ${
          revealedCount >= LETTER.paragraphs.length
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}
      >
        <a
          href="#small-things"
          className="inline-flex flex-col items-center gap-2 text-luminous/50 hover:text-luminous transition-colors group"
          aria-label="Continuar"
        >
          <span className="font-sans text-xs tracking-widest uppercase">Continuar</span>
          <ChevronDown
            size={24}
            className="animate-bounce group-hover:scale-110 transition-transform"
            style={{ animationDuration: '2.5s' }}
          />
        </a>
      </div>
    </section>
  );
}
