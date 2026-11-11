import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { CONFIG, blur, img, scenes } from '../data.js';
import Tilt from './Tilt.jsx';
import { Ignite } from './Kinetic.jsx';

const N = scenes.length;
// Five cuts. r goes 0 (hidden) to 1 (shown). Tapping forward animates r up, tapping back animates it down.
const CUTS = [
  (r) => `inset(0 ${(1 - r) * 100}% 0 0)`,
  (r) => `circle(${r * 75}% at 50% 50%)`,
  (r) => `polygon(0 0,${r * 135}% 0,${r * 135 - 35}% 100%,${-35 * r}% 100%)`,
  (r) => `inset(${(1 - r) * 100}% 0 0 0)`
];
const pad = (n) => String(n).padStart(2, '0');

function Shot({ s, k, i }) {
  const kind = k % 5, dir = k % 2 ? 1 : -1, cur = i === k;
  const r = useMotionValue(k <= i ? 1 : 0);
  useEffect(() => { const c = animate(r, i >= k ? 1 : 0, { duration: 0.9, ease: [0.7, 0, 0.2, 1] }); return () => c.stop(); }, [i, k, r]);
  const clip = useTransform(r, (x) => (kind < 4 ? CUTS[kind](x) : 'none'));
  const op = useTransform(r, (x) => (kind === 4 ? x : 1));
  const zs = useTransform(r, (x) => (kind === 4 ? 1.4 - 0.4 * x : 1));
  const drift = { duration: cur ? 14 : 0.6, ease: 'linear' };
  return (
    <motion.div className="shot" style={{ clipPath: clip, opacity: op, scale: zs, zIndex: k }}>
      <div className="bgb" style={{ backgroundImage: `url(${blur(s.img)})` }} />
      <motion.div className="ghostt" initial={{ x: '6%' }} animate={{ x: cur ? '-24%' : '6%' }} transition={drift} aria-hidden="true">{s.ep}</motion.div>
      <Tilt className="tiltwrap" max={7}>
        <motion.div className="frame" style={{ '--ar': s.ar }}
          initial={{ scale: 0.82, y: 50, opacity: 0, rotateX: 18 }}
          animate={{ scale: cur ? 1 : 0.9, y: cur ? 0 : 30, rotate: cur ? 0 : dir * 2.5, opacity: 1, rotateX: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 13 }}>
          <div className="ph"><motion.img src={img(s.img)} alt={s.alt} initial={{ scale: 1.02, x: dir * -12 }} animate={{ scale: cur ? 1.16 : 1.02, x: cur ? dir * 12 : dir * -12 }} transition={drift} /><span className="sheen" /></div>
          {['tl', 'tr', 'bl', 'br'].map((c, n) => <motion.i key={c} className={`vf ${c}`} animate={{ opacity: cur ? 1 : 0, scale: cur ? 1 : 2.4 }} transition={{ delay: cur ? 0.3 + n * 0.07 : 0, type: 'spring', stiffness: 200, damping: 14 }} />)}
        </motion.div>
      </Tilt>
    </motion.div>
  );
}

export default function Stage() {
  const [i, setI] = useState(0);
  const iRef = useRef(0);
  iRef.current = i;
  const forward = () => (iRef.current === N - 1 ? document.getElementById('after-reel')?.scrollIntoView({ behavior: 'smooth' }) : setI(iRef.current + 1));
  const back = () => setI(Math.max(0, iRef.current - 1));
  const tap = (e) => { const b = e.currentTarget.getBoundingClientRect(); (e.clientX - b.left < b.width * 0.28 ? back : forward)(); };
  useEffect(() => {
    const k = (e) => { if (e.key === 'ArrowRight') forward(); if (e.key === 'ArrowLeft') back(); };
    addEventListener('keydown', k); return () => removeEventListener('keydown', k);
  }, []);
  const s = scenes[i], hint = i === N - 1 ? 'Tap to continue ⌄' : i < 2 ? 'Tap anywhere to change ›' : null;
  return (
    <section className="reel">
      <div className="stage" onClick={tap} role="button" tabIndex={0} aria-label="Tap to change the picture">
        <div className="shots">{scenes.map((sc, k) => (Math.abs(k - i) <= 1 ? <Shot key={k} s={sc} k={k} i={i} /> : null))}</div>
        <motion.div key={`b${i}`} className="burst" initial={{ scale: 0.3, opacity: 0.8 }} animate={{ scale: 2.4, opacity: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} />
        <motion.div key={`f${i}`} className="flash" initial={{ opacity: 0.6 }} animate={{ opacity: 0 }} transition={{ duration: 0.7 }} />
        <div className="shade" /><div className="grain" /><div className="vig" />
        <div className="lbx b1" /><div className="lbx b2" />
        <div className="hud">
          <motion.span key={i} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}>Ep. {CONFIG.age}: {s.ep}</motion.span>
          <span>{pad(i + 1)}/{pad(N)}</span>
        </div>
        {i > 0 && <span className="backcue" aria-hidden="true">‹</span>}
        {hint && <motion.div key={hint} className="taphint" animate={{ scale: [1, 1.06, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}>{hint}</motion.div>}
        <Ignite key={`s${i}`} text={s.sub} className="subs" />
        <div className="ticks">{scenes.map((_, k) => <i key={k} className={k <= i ? 'on' : ''} />)}</div>
      </div>
    </section>
  );
}
