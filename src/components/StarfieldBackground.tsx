import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  driftX: number;
  driftY: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  hue: number;
}

/**
 * Full-canvas animated night-sky background:
 * - parallax star layers with twinkle
 * - drifting nebula gradients
 * - mouse-reactive particles
 */
export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let particles: Particle[] = [];
    let raf = 0;
    let time = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + 'px';
      canvas!.style.height = height + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    }

    function initStars() {
      const count = Math.floor((width * height) / 6000);
      stars = [];
      for (let i = 0; i < count; i++) {
        const z = Math.random();
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          size: 0.3 + z * 1.8,
          baseAlpha: 0.2 + z * 0.6,
          twinkleSpeed: 0.5 + Math.random() * 2,
          twinklePhase: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.05,
          driftY: (Math.random() - 0.5) * 0.05,
        });
      }
    }

    function spawnParticle(x: number, y: number) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.2 + Math.random() * 0.6;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.1,
        size: 1 + Math.random() * 2.5,
        alpha: 0.5 + Math.random() * 0.4,
        life: 0,
        maxLife: 80 + Math.random() * 60,
        hue: 200 + Math.random() * 30,
      });
    }

    function drawNebula() {
      // Subtle moving nebula gradients
      const t = time * 0.0003;
      const g1 = ctx!.createRadialGradient(
        width * (0.3 + Math.sin(t) * 0.08),
        height * (0.2 + Math.cos(t * 0.7) * 0.06),
        0,
        width * 0.3,
        height * 0.2,
        width * 0.5
      );
      g1.addColorStop(0, 'rgba(29, 58, 107, 0.08)');
      g1.addColorStop(0.5, 'rgba(16, 29, 54, 0.04)');
      g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx!.fillStyle = g1;
      ctx!.fillRect(0, 0, width, height);

      const g2 = ctx!.createRadialGradient(
        width * (0.75 + Math.cos(t * 1.3) * 0.07),
        height * (0.8 + Math.sin(t) * 0.05),
        0,
        width * 0.75,
        height * 0.8,
        width * 0.45
      );
      g2.addColorStop(0, 'rgba(14, 42, 63, 0.07)');
      g2.addColorStop(0.5, 'rgba(10, 31, 46, 0.03)');
      g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx!.fillStyle = g2;
      ctx!.fillRect(0, 0, width, height);
    }

    function drawStars() {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      for (const s of stars) {
        // Drift
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;
        if (s.y < -10) s.y = height + 10;
        if (s.y > height + 10) s.y = -10;

        // Twinkle
        const twinkle = 0.5 + 0.5 * Math.sin(time * 0.001 * s.twinkleSpeed + s.twinklePhase);
        let alpha = s.baseAlpha * (0.4 + twinkle * 0.6);

        // Mouse parallax — closer stars (high z) move more
        let px = s.x;
        let py = s.y;
        if (mouseActive) {
          const dx = (mx - width / 2) * s.z * 0.015;
          const dy = (my - height / 2) * s.z * 0.015;
          px += dx;
          py += dy;

          // Glow near mouse
          const distToMouse = Math.hypot(px - mx, py - my);
          if (distToMouse < 120) {
            alpha = Math.min(1, alpha + (1 - distToMouse / 120) * 0.5);
          }
        }

        const size = s.size * (0.8 + twinkle * 0.4);

        // Draw star
        ctx!.beginPath();
        ctx!.arc(px, py, size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(168, 208, 255, ${alpha})`;
        ctx!.fill();

        // Glow for brighter stars
        if (s.z > 0.6 && twinkle > 0.7) {
          ctx!.beginPath();
          ctx!.arc(px, py, size * 3, 0, Math.PI * 2);
          const glow = ctx!.createRadialGradient(px, py, 0, px, py, size * 3);
          glow.addColorStop(0, `rgba(125, 181, 255, ${alpha * 0.3})`);
          glow.addColorStop(1, 'rgba(125, 181, 255, 0)');
          ctx!.fillStyle = glow;
          ctx!.fill();
        }
      }
    }

    function drawParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.005;
        p.life++;

        const lifeRatio = p.life / p.maxLife;
        const alpha = p.alpha * (1 - lifeRatio);

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(168, 208, 255, ${alpha})`;
        ctx!.fill();

        // Soft glow
        const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        glow.addColorStop(0, `rgba(125, 181, 255, ${alpha * 0.2})`);
        glow.addColorStop(1, 'rgba(125, 181, 255, 0)');
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx!.fill();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }
    }

    function frame() {
      time++;

      // Clear with deep night base
      ctx!.fillStyle = '#05080f';
      ctx!.fillRect(0, 0, width, height);

      drawNebula();
      drawStars();
      drawParticles();

      // Occasionally spawn a random sparkle
      if (Math.random() < 0.04) {
        spawnParticle(Math.random() * width, Math.random() * height);
      }

      // Mouse trail particles
      if (mouseRef.current.active && Math.random() < 0.3) {
        spawnParticle(
          mouseRef.current.x + (Math.random() - 0.5) * 20,
          mouseRef.current.y + (Math.random() - 0.5) * 20
        );
      }

      raf = requestAnimationFrame(frame);
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    }
    function onMouseLeave() {
      mouseRef.current.active = false;
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          active: true,
        };
      }
    }

    resize();
    frame();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
