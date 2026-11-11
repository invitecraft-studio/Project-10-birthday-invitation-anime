import { useRef } from 'react';
// Pointer tilt + moving light (--mx / --my). Touch and mouse both work.
export default function Tilt({ children, max = 10, className = '' }) {
  const r = useRef(null);
  const move = (e) => {
    const b = r.current.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
    r.current.style.transform = `perspective(900px) rotateY(${x * max * 2}deg) rotateX(${-y * max * 2}deg)`;
    r.current.style.setProperty('--mx', `${(x + 0.5) * 100}%`); r.current.style.setProperty('--my', `${(y + 0.5) * 100}%`);
  };
  return <div ref={r} className={`tilt ${className}`} onPointerMove={move} onPointerLeave={() => { r.current.style.transform = ''; }} onPointerCancel={() => { r.current.style.transform = ''; }}>{children}</div>;
}
