import { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { MEMORIES } from '@/config';
import { useScrollReveal } from '@/hooks/useScroll';

interface Photo {
  src: string;
  caption: string;
  size: 'tall' | 'square' | 'wide';
  rotate: number;
}

/**
 * Section 3 — Memories gallery.
 * Instead of a uniform grid, photos are scattered like a collection of
 * polaroids with varying sizes, slight rotations, and overlap.
 * Clicking opens a modal with the enlarged photo + caption.
 */
export default function MemoriesSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [selected, setSelected] = useState<number | null>(null);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());

  // Reveal photos one by one as the section scrolls into view
  useEffect(() => {
    if (!isVisible) return;
    MEMORIES.photos.forEach((_, i) => {
      setTimeout(() => {
        setVisibleIndices((prev) => new Set(prev).add(i));
      }, i * 180);
    });
  }, [isVisible]);

  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (selected !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  const sizeClasses: Record<'tall' | 'square' | 'wide', string> = {
    tall: 'w-44 sm:w-48 md:w-52 h-56 sm:h-64 md:h-72',
    square: 'w-40 sm:w-44 md:w-48 h-40 sm:h-44 md:h-48',
    wide: 'w-60 sm:w-64 md:w-72 h-40 sm:h-44 md:h-48',
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6"
    >
      {/* Title */}
      <div className={`scroll-reveal ${isVisible ? 'is-visible' : ''} text-center mb-16`}>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-night-50 text-glow font-light italic">
          {MEMORIES.title}
        </h2>
        <p className="mt-4 font-sans text-sm text-night-100/40 tracking-wide">
          {MEMORIES.subtitle}
        </p>
        <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-luminous/40 to-transparent" />
      </div>

      {/* Scattered polaroid layout */}
      <div className="relative w-full max-w-5xl flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {MEMORIES.photos.map((photo, i) => (
          <div
            key={i}
            className={`polaroid cursor-hover rounded-sm p-3 pb-12 transition-all duration-700 ${
              visibleIndices.has(i) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'
            } hover:scale-105 hover:!rotate-0 hover:z-20 hover:shadow-[0_15px_50px_rgba(125,181,255,0.2)]`}
            style={{
              transform: `rotate(${photo.rotate}deg)`,
              animation: visibleIndices.has(i) ? `floatSlow ${6 + (i % 4)}s ease-in-out infinite` : 'none',
            }}
            onClick={() => setSelected(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelected(i)}
            aria-label={`Ver foto: ${photo.caption}`}
          >
            {/* Photo */}
            <div className={`relative overflow-hidden rounded-sm ${sizeClasses[photo.size as 'tall' | 'square' | 'wide']}`}>
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              {/* Subtle blue tint overlay */}
              <div className="absolute inset-0 bg-night-900/10 pointer-events-none" />
            </div>
            {/* Caption */}
            <p className="mt-3 px-1 font-serif text-xs sm:text-sm text-night-100/60 italic text-center leading-snug">
              {photo.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          onClick={closeModal}
          style={{ animation: 'fadeIn 0.4s ease forwards' }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-night-950/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal content */}
          <div
            className="relative polaroid rounded-lg p-4 sm:p-6 pb-16 max-w-2xl w-full max-h-[85vh] z-10"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
          >
            <img
              src={MEMORIES.photos[selected].src}
              alt={MEMORIES.photos[selected].caption}
              className="w-full max-h-[65vh] object-contain rounded-sm"
            />
            <p className="mt-4 font-serif text-base sm:text-lg text-luminous-soft italic text-center">
              {MEMORIES.photos[selected].caption}
            </p>

            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center text-night-100/60 hover:text-luminous-soft transition-colors"
              aria-label="Fechar"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
