import { useState, useRef, useEffect } from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { SURPRISE } from '@/config';
import { useScrollReveal } from '@/hooks/useScroll';

/**
 * Section 6 — The surprise.
 * A closed gift box that, when clicked, opens with particle bursts
 * and reveals a message. A second button reveals a deeper message.
 */
export default function SurpriseSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState(false);
  const [showFirst, setShowFirst] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [burstParticles, setBurstParticles] = useState<number[]>([]);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Generate burst particles
    setBurstParticles(Array.from({ length: 20 }, (_, i) => i));
    // Reveal first message after box animation
    setTimeout(() => setShowFirst(true), 800);
  };

  const handleShowMore = () => {
    setShowMore(true);
    setTimeout(() => setShowSecond(true), 500);
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6"
    >
      {/* Different background feel — slightly warmer glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(21, 41, 79, 0.25), transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Title */}
      <div className={`scroll-reveal ${isVisible ? 'is-visible' : ''} text-center mb-16 relative z-10`}>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-night-50 text-glow font-light italic">
          {SURPRISE.title}
        </h2>
        <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-luminous/40 to-transparent" />
      </div>

      {/* Box / content area */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full">
        {!isOpen ? (
          /* Closed box */
          <div
            className={`scroll-reveal ${isVisible ? 'is-visible' : ''} flex flex-col items-center`}
            style={{ transitionDelay: '0.3s' }}
          >
            <button
              onClick={handleOpen}
              className="cursor-hover relative group"
              aria-label={SURPRISE.boxHint}
            >
              {/* Glow behind box */}
              <div
                className="absolute inset-0 blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-700"
                style={{
                  background: 'radial-gradient(circle, rgba(125,181,255,0.3), transparent 70%)',
                }}
                aria-hidden="true"
              />

              {/* Box body */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl glass-card flex items-center justify-center transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2">
                {/* Lid line */}
                <div className="absolute top-0 left-0 right-0 h-8 sm:h-10 rounded-t-2xl bg-gradient-to-b from-night-600/50 to-transparent border-b border-luminous/15" />

                {/* Ribbon */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 sm:w-4 bg-gradient-to-b from-luminous/20 to-luminous/5" />
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-3 sm:h-4 bg-gradient-to-r from-luminous/20 to-luminous/5" />

                {/* Gift icon */}
                <Gift
                  size={40}
                  className="text-luminous-soft relative z-10 transition-transform duration-500 group-hover:scale-110"
                  style={{ animation: 'breath 3s ease-in-out infinite' }}
                />
              </div>
            </button>
            <p className="mt-6 font-sans text-sm text-night-100/40 tracking-wide">
              {SURPRISE.boxHint}
            </p>
          </div>
        ) : (
          /* Opened — revealed content */
          <div className="relative w-full flex flex-col items-center">
            {/* Particle burst */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true">
              {burstParticles.map((i) => (
                <Sparkles
                  key={i}
                  size={8 + Math.random() * 10}
                  className="absolute text-luminous particle-burst"
                  style={{
                    left: `${(Math.random() - 0.5) * 200}px`,
                    top: `${(Math.random() - 0.5) * 100}px`,
                    ['--tx' as string]: `${(Math.random() - 0.5) * 250}px`,
                    ['--ty' as string]: `${-50 - Math.random() * 150}px`,
                    animationDelay: `${i * 0.04}s`,
                  }}
                />
              ))}
            </div>

            {/* First message */}
            <div
              className={`transition-all duration-1000 ${
                showFirst ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="glass-card rounded-2xl p-8 sm:p-12 relative overflow-hidden">
                {/* Glow accent */}
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30"
                  style={{ background: 'radial-gradient(circle, rgba(125,181,255,0.4), transparent 70%)' }}
                  aria-hidden="true"
                />

                <p className="relative font-serif text-lg sm:text-xl md:text-2xl text-night-50/90 leading-relaxed whitespace-pre-line text-glow">
                  {SURPRISE.firstMessage}
                </p>
              </div>
            </div>

            {/* "Tem mais uma coisa..." button */}
            <div
              className={`mt-10 transition-all duration-700 ${
                showFirst && !showMore ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <button
                onClick={handleShowMore}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
                }}
                className="btn-glow luminous-border relative px-7 py-3.5 rounded-full bg-night-700/40 backdrop-blur-md font-sans text-sm text-luminous-soft tracking-wide"
              >
                {SURPRISE.moreButtonText}
              </button>
            </div>

            {/* Second message */}
            <div
              className={`mt-8 w-full transition-all duration-1000 ${
                showSecond ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="glass-card rounded-2xl p-8 sm:p-12 border-luminous/20 relative overflow-hidden">
                <div
                  className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-20"
                  style={{ background: 'radial-gradient(circle, rgba(168,208,255,0.4), transparent 70%)' }}
                  aria-hidden="true"
                />
                <p className="relative font-serif text-lg sm:text-xl md:text-2xl text-luminous-soft leading-relaxed whitespace-pre-line text-glow italic">
                  {SURPRISE.secondMessage}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
