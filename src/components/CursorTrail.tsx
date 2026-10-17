import { useEffect, useRef } from 'react';

/**
 * Custom cursor with a luminous blue trail.
 * Two elements: a small dot that follows precisely,
 * and a larger ring that lags behind for a smooth trail effect.
 * Disabled on touch devices (CSS restores default cursor).
 */
export default function CursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch / small screens
    if (window.matchMedia('(max-width: 768px)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const dotEl = dot;
    const ringEl = ring;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let raf = 0;
    let hovering = false;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotEl.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      const target = e.target as HTMLElement;
      hovering = !!target.closest('a, button, [role="button"], .cursor-hover');
    }

    function animate() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ringEl.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${hovering ? 1.6 : 1})`;
      dotEl.style.opacity = hovering ? '0.5' : '1';
      raf = requestAnimationFrame(animate);
    }

    function onLeave() {
      dotEl.style.opacity = '0';
      ringEl.style.opacity = '0';
    }
    function onEnter() {
      dotEl.style.opacity = '1';
      ringEl.style.opacity = '1';
    }

    animate();
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] transition-opacity duration-300"
        style={{
          background: '#a8d0ff',
          boxShadow: '0 0 8px rgba(168, 208, 255, 0.8), 0 0 16px rgba(125, 181, 255, 0.4)',
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="hidden md:block fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] transition-opacity duration-300"
        style={{
          border: '1px solid rgba(125, 181, 255, 0.4)',
          boxShadow: '0 0 20px rgba(125, 181, 255, 0.15)',
        }}
        aria-hidden="true"
      />
    </>
  );
}
