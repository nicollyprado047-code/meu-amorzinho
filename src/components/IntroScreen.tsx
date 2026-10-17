import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { INTRO } from '@/config';

interface IntroScreenProps {
  onEnter: () => void;
  visible: boolean;
}

/**
 * Minimal, mysterious landing screen.
 * Text fades in gradually, button has delicate hover glow.
 * On click → calls onEnter, then this component fades out.
 */
export default function IntroScreen({ onEnter, visible }: IntroScreenProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(3), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center px-6 transition-all duration-[1.5s] ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none scale-105'
      }`}
      style={{
        background:
          'radial-gradient(ellipse at center, #080d1a 0%, #05080f 50%, #030611 100%)',
      }}
    >
      {/* Soft pulsing glow behind text */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(29,58,107,0.15), transparent 70%)',
          animation: 'breath 6s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      <div className="relative text-center max-w-lg">
        {/* Main text */}
        <h1
          className={`font-serif text-3xl sm:text-4xl md:text-5xl text-night-50 text-glow leading-tight transition-all duration-[2s] ${
            phase >= 1 ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'
          }`}
        >
          {INTRO.mainText}
        </h1>

        {/* Subtext */}
        <p
          className={`mt-6 font-sans text-base sm:text-lg text-night-100/60 font-light tracking-wide transition-all duration-[2s] ${
            phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {INTRO.subText}
        </p>

        {/* Enter button */}
        <button
          onClick={onEnter}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
          }}
          className={`btn-glow luminous-border group relative mt-12 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-night-700/40 backdrop-blur-md font-sans text-sm sm:text-base text-luminous-soft tracking-wider transition-all duration-[1.5s] ${
            phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          aria-label="Entrar na experiência"
        >
          <span>{INTRO.buttonText}</span>
          <span className="text-luminous text-lg transition-transform duration-500 group-hover:rotate-180 group-hover:scale-110">
            {INTRO.buttonIcon}
          </span>
        </button>

        {/* Headphones hint */}
        <p
          className={`mt-8 font-sans text-xs text-night-100/30 tracking-wide transition-all duration-[2s] ${
            phase >= 3 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {INTRO.hint}
        </p>
      </div>

      {/* Subtle scroll-down indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-[2s] ${
          phase >= 3 ? 'opacity-30' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <ChevronDown
          size={20}
          className="text-luminous animate-bounce"
          style={{ animationDuration: '3s' }}
        />
      </div>
    </div>
  );
}
