import { useEffect, useRef } from 'react';
export default function Petals() {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = ref.current, x = c.getContext('2d');
    const fit = () => { c.width = innerWidth; c.height = innerHeight; };
    fit(); addEventListener('resize', fit);
    const P = Array.from({ length: innerWidth < 640 ? 10 : 22 }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, s: 4 + Math.random() * 5, v: 0.5 + Math.random() * 0.9, w: Math.random() * 6, r: Math.random() * 6 }));
    let id;
    const f = () => {
      x.clearRect(0, 0, c.width, c.height);
      for (const p of P) {
        p.y += p.v; p.w += 0.018; p.r += 0.02; p.x += Math.sin(p.w) * 0.9 + 0.3;
        if (p.y > c.height + 20 || p.x > c.width + 20) { p.y = -20; p.x = Math.random() * c.width; }
        x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = 'rgba(255,143,179,.6)';
        x.beginPath(); x.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, 7); x.fill(); x.restore();
      }
      id = requestAnimationFrame(f);
    };
    f();
    return () => { cancelAnimationFrame(id); removeEventListener('resize', fit); };
  }, []);
  return <canvas ref={ref} className="petals" aria-hidden="true" />;
}
