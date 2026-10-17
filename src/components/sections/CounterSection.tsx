import { useState, useEffect } from 'react';
import { COUNTER } from '@/config';
import { useScrollReveal } from '@/hooks/useScroll';

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateElapsed(start: Date): TimeElapsed {
  const now = new Date();
  const diff = Math.max(0, now.getTime() - start.getTime());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/**
 * Section 5 — Live counter showing time elapsed since a configurable date.
 * Updates every second in real time.
 */
export default function CounterSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [elapsed, setElapsed] = useState<TimeElapsed>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const start = new Date(COUNTER.startDate);
    setElapsed(calculateElapsed(start));
    setHasStarted(true);

    const interval = setInterval(() => {
      setElapsed(calculateElapsed(start));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const units: { label: string; value: number }[] = [
    { label: 'Dias', value: elapsed.days },
    { label: 'Horas', value: elapsed.hours },
    { label: 'Minutos', value: elapsed.minutes },
    { label: 'Segundos', value: elapsed.seconds },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6"
    >
      {/* Title */}
      <div className={`scroll-reveal ${isVisible ? 'is-visible' : ''} text-center mb-12`}>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-night-50 text-glow font-light italic">
          {COUNTER.title}
        </h2>
        <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-luminous/40 to-transparent" />
      </div>

      {/* Counter display */}
      <div
        className={`scroll-reveal ${isVisible ? 'is-visible' : ''} flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8`}
        style={{ transitionDelay: '0.3s' }}
      >
        {units.map((unit, i) => (
          <div key={unit.label} className="flex flex-col items-center">
            <div className="glass-card rounded-2xl px-6 py-6 sm:px-8 sm:py-8 min-w-[90px] sm:min-w-[110px] text-center relative overflow-hidden">
              {/* Subtle top glow line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luminous/30 to-transparent" />

              <span
                className={`font-serif text-3xl sm:text-5xl md:text-6xl text-luminous-soft text-glow tabular-nums transition-all duration-500 ${
                  hasStarted ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="mt-2 block font-sans text-xs sm:text-sm text-night-100/40 tracking-widest uppercase">
                {unit.label}
              </span>

              {/* Pulse on seconds change */}
              {unit.label === 'Segundos' && (
                <div
                  key={unit.value}
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 20px rgba(125,181,255,0.1)',
                    animation: 'fadeIn 0.3s ease forwards',
                  }}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Separator dot between units */}
            {i < units.length - 1 && (
              <span className="hidden sm:block absolute" aria-hidden="true">
                <span
                  className="text-luminous/30 text-2xl"
                  style={{ position: 'relative', left: '-0.5rem' }}
                >
                  ·
                </span>
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Closing phrase */}
      <div
        className={`scroll-reveal ${isVisible ? 'is-visible' : ''} mt-16 text-center max-w-xl`}
        style={{ transitionDelay: '0.6s' }}
      >
        <p className="font-serif text-lg sm:text-xl md:text-2xl text-night-50/70 italic leading-relaxed">
          {COUNTER.closingPhrase}
        </p>
      </div>
    </section>
  );
}
