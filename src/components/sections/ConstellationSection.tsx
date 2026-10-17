import { useState, useRef, useEffect, useCallback } from 'react';
import { CONSTELLATION } from '@/config';
import { useScrollReveal } from '@/hooks/useScroll';

interface StarPoint {
  x: number;
  y: number;
  message: string;
}

/**
 * Section 4 — Interactive constellation.
 * Stars are positioned on a canvas-like area. Clicking a star:
 * - reveals its message
 * - draws connecting lines to nearby clicked stars
 * - creates a glow burst
 * When all stars are clicked, faint lines form an abstract heart shape.
 */
export default function ConstellationSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [clickedStars, setClickedStars] = useState<Set<number>>(new Set());
  const [activeMessage, setActiveMessage] = useState<{ text: string; x: number; y: number } | null>(null);
  const [burstKey, setBurstKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  const stars: StarPoint[] = CONSTELLATION.stars;

  // Track container size for responsive star positions
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      setDims({ w: el.clientWidth, h: el.clientHeight });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleStarClick = useCallback(
    (i: number) => {
      setClickedStars((prev) => new Set(prev).add(i));
      setActiveMessage({ text: stars[i].message, x: stars[i].x, y: stars[i].y });
      setBurstKey((k) => k + 1);
    },
    [stars]
  );

  const allClicked = clickedStars.size === stars.length;
  const clickedArray = Array.from(clickedStars);

  // Generate faint heart-shape lines when all stars are clicked
  const heartPath = (() => {
    if (!allClicked || dims.w === 0) return null;
    const cx = dims.w / 2;
    const cy = dims.h / 2;
    const scale = Math.min(dims.w, dims.h) * 0.0035;
    const points: { x: number; y: number }[] = [];
    for (let t = 0; t <= Math.PI * 2; t += 0.12) {
      const x = cx + scale * 16 * Math.pow(Math.sin(t), 3);
      const y = cy - scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      points.push({ x, y });
    }
    return points;
  })();

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6"
    >
      {/* Title */}
      <div className={`scroll-reveal ${isVisible ? 'is-visible' : ''} text-center mb-12 z-10`}>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-night-50 text-glow font-light italic">
          {CONSTELLATION.title}
        </h2>
        <p className="mt-4 font-sans text-sm text-night-100/40 tracking-wide">
          {CONSTELLATION.subtitle}
        </p>
        <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-luminous/40 to-transparent" />
      </div>

      {/* Constellation canvas */}
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl h-[400px] sm:h-[500px] md:h-[550px] rounded-2xl glass overflow-hidden"
      >
        {/* SVG layer for connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          {/* Lines between clicked stars (connect to nearest few) */}
          {clickedArray.map((i, idx) => {
            const s1 = stars[i];
            return clickedArray.slice(idx + 1).map((j, jIdx) => {
              const s2 = stars[j];
              const dx = (s1.x - s2.x) * (dims.w / 100);
              const dy = (s1.y - s2.y) * (dims.h / 100);
              const dist = Math.hypot(dx, dy);
              // Only draw lines between nearby stars
              if (dist > 180) return null;
              return (
                <line
                  key={`${i}-${j}-${jIdx}`}
                  x1={`${s1.x}%`}
                  y1={`${s1.y}%`}
                  x2={`${s2.x}%`}
                  y2={`${s2.y}%`}
                  stroke="rgba(125, 181, 255, 0.2)"
                  strokeWidth="0.5"
                  style={{ animation: 'fadeIn 0.8s ease forwards' }}
                />
              );
            });
          })}

          {/* Heart shape when all stars clicked */}
          {heartPath && (
            <g className="heart-glow">
              {heartPath.map((p1, i) => {
                if (i === heartPath.length - 1) return null;
                const p2 = heartPath[i + 1];
                return (
                  <line
                    key={`heart-${i}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke="rgba(125, 181, 255, 0.25)"
                    strokeWidth="0.8"
                    style={{ animation: `fadeIn 1s ease ${i * 0.05}s forwards`, opacity: 0 }}
                  />
                );
              })}
            </g>
          )}
        </svg>

        {/* Stars */}
        {stars.map((star, i) => {
          const isClicked = clickedStars.has(i);
          return (
            <button
              key={i}
              onClick={() => handleStarClick(i)}
              className="cursor-hover absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
              }}
              aria-label={`Estrela ${i + 1}`}
            >
              {/* Glow ring */}
              <span
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ${
                  isClicked ? 'w-12 h-12 opacity-100' : 'w-6 h-6 opacity-0 group-hover:opacity-60'
                }`}
                style={{
                  background: 'radial-gradient(circle, rgba(125,181,255,0.3), transparent 70%)',
                }}
                aria-hidden="true"
              />

              {/* Star dot */}
              <span
                className={`block rounded-full transition-all duration-500 ${
                  isClicked
                    ? 'w-2.5 h-2.5 bg-luminous-soft shadow-[0_0_10px_rgba(168,208,255,0.8)]'
                    : 'w-1.5 h-1.5 bg-night-100/40 group-hover:bg-luminous-soft group-hover:w-2 group-hover:h-2'
                }`}
                style={{
                  animation: isClicked ? 'twinkle 2s ease-in-out infinite' : undefined,
                }}
              />

              {/* Burst on click */}
              {isClicked && (
                <span
                  key={`${burstKey}-${i}`}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full pointer-events-none particle-burst"
                  style={{
                    background: 'radial-gradient(circle, rgba(168,208,255,0.3), transparent 60%)',
                    ['--tx' as string]: '0px',
                    ['--ty' as string]: '0px',
                  }}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}

        {/* Message popup */}
        {activeMessage && (
          <div
            key={burstKey}
            className="absolute z-20 max-w-[260px] pointer-events-none"
            style={{
              left: `${activeMessage.x}%`,
              top: `${activeMessage.y}%`,
              transform: 'translate(-50%, calc(-100% - 20px))',
              animation: 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            }}
          >
            <div className="glass rounded-xl px-4 py-3 text-center">
              <p className="font-serif text-sm sm:text-base text-luminous-soft italic leading-relaxed">
                {activeMessage.text}
              </p>
            </div>
            {/* Little arrow */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 glass border-r-0 border-t-0"
              aria-hidden="true"
            />
          </div>
        )}

        {/* Progress hint */}
        {clickedStars.size > 0 && clickedStars.size < stars.length && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-night-100/30 font-sans tracking-wide">
            {clickedStars.size} / {stars.length} estrelas
          </div>
        )}

        {/* Completion message */}
        {allClicked && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ animation: 'fadeIn 2s ease forwards' }}
          >
            <p className="font-serif text-xl text-luminous-soft/80 italic text-glow text-center px-8">
              Você tocou em cada uma.
              <br />
              <span className="text-sm text-night-100/50">Elas formam algo que eu não sei desenhar — mas que eu sei sentir.</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
