import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { SMALL_THINGS } from '@/config';
import { useScrollReveal } from '@/hooks/useScroll';

/**
 * Section 2 — "Porque são as pequenas coisas."
 * Grid of cards that appear one-by-one on scroll.
 * Clicking a card flips/expands it to reveal a hidden message
 * with a sparkle animation.
 */
export default function SmallThingsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [sparkleKey, setSparkleKey] = useState(0);

  const handleClick = (i: number) => {
    setExpandedIdx(expandedIdx === i ? null : i);
    setSparkleKey((k) => k + 1);
  };

  return (
    <section
      id="small-things"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6"
    >
      {/* Title */}
      <div className={`scroll-reveal ${isVisible ? 'is-visible' : ''} text-center mb-16`}>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-night-50 text-glow font-light italic">
          {SMALL_THINGS.title}
        </h2>
        <p className="mt-4 font-sans text-sm text-night-100/40 tracking-wide">
          {SMALL_THINGS.subtitle}
        </p>
        <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-luminous/40 to-transparent" />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl w-full">
        {SMALL_THINGS.cards.map((card, i) => {
          const isExpanded = expandedIdx === i;
          return (
            <div
              key={i}
              className={`scroll-reveal ${isVisible ? 'is-visible' : ''} perspective`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <button
                onClick={() => handleClick(i)}
                className="cursor-hover relative w-full text-left rounded-2xl overflow-hidden transition-all duration-700 group"
                style={{
                  minHeight: isExpanded ? '200px' : '120px',
                }}
                aria-expanded={isExpanded}
              >
                {/* Card background */}
                <div
                  className={`absolute inset-0 glass-card rounded-2xl transition-all duration-700 ${
                    isExpanded
                      ? 'border-luminous/30 shadow-[0_0_30px_rgba(125,181,255,0.15)]'
                      : 'group-hover:border-luminous/20 group-hover:shadow-[0_0_20px_rgba(125,181,255,0.08)]'
                  }`}
                />

                {/* Sparkle effect on expand */}
                {isExpanded && (
                  <div key={sparkleKey} className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    {[...Array(6)].map((_, s) => (
                      <Sparkles
                        key={s}
                        size={12 + Math.random() * 8}
                        className="absolute text-luminous particle-burst"
                        style={{
                          left: `${15 + Math.random() * 70}%`,
                          top: `${15 + Math.random() * 70}%`,
                          ['--tx' as string]: `${(Math.random() - 0.5) * 80}px`,
                          ['--ty' as string]: `${-30 - Math.random() * 60}px`,
                          animationDelay: `${s * 0.08}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Content */}
                <div className="relative p-6 flex flex-col h-full justify-center">
                  <p
                    className={`font-serif text-lg sm:text-xl transition-all duration-500 ${
                      isExpanded ? 'text-luminous-soft text-glow' : 'text-night-50/80'
                    }`}
                  >
                    {card.front}
                  </p>

                  <div
                    className={`overflow-hidden transition-all duration-700 ${
                      isExpanded ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                    }`}
                  >
                    <div className="w-8 h-px bg-luminous/30 mb-3" />
                    <p className="font-sans text-sm text-night-100/70 leading-relaxed font-light">
                      {card.hidden}
                    </p>
                  </div>

                  {/* Expand indicator */}
                  <div
                    className={`absolute bottom-3 right-4 transition-all duration-500 ${
                      isExpanded ? 'opacity-0 rotate-180' : 'opacity-40 group-hover:opacity-70'
                    }`}
                  >
                    <span className="text-luminous text-sm font-serif">+</span>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
