import { useEffect, useMemo } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { CONFIG } from '../data.js';

const Chars = ({ t, d = 0, cls }) => (
  <span className={cls} aria-label={t}>
    {[...t].map((c, k) => (
      <motion.span key={k} aria-hidden="true" style={{ display: 'inline-block' }}
        initial={{ opacity: 0, y: 60, scale: 1.6, filter: 'blur(14px)' }} animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ delay: d + k * 0.06, type: 'spring', stiffness: 120, damping: 12 }}>{c === ' ' ? '\u00a0' : c}</motion.span>
    ))}
  </span>
);
const RING = `HAPPY ${CONFIG.age}TH BIRTHDAY ✦ HAPPY ${CONFIG.age}TH BIRTHDAY ✦ `;

export default function Intro({ onStart }) {
  const n = useMotionValue(0), shown = useTransform(n, (v) => Math.round(v));
  useEffect(() => { const c = animate(n, CONFIG.age, { duration: 2.4, delay: 1.9, ease: 'easeOut' }); return () => c.stop(); }, [n]);
  const stars = useMemo(() => Array.from({ length: 40 }, () => ({ x: Math.random() * 100, y: Math.random() * 50, s: 1 + Math.random() * 2, d: Math.random() * 4 })), []);
  return (
    <header className="intro">
      {stars.map((s, i) => <i key={i} className="star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />)}
      {[0, 1, 2].map((i) => <i key={i} className="shoot" style={{ left: `${55 + i * 14}%`, top: `${6 + i * 9}%`, animationDelay: `${1 + i * 2.3}s` }} />)}
      <div className="sunwrap"><motion.div className="sun" initial={{ y: '70%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 3.2, ease: [0.2, 0.8, 0.2, 1] }} /></div>
      <svg className="hill h2" viewBox="0 0 1440 220" preserveAspectRatio="none"><path d="M0 120C150 40 300 150 460 90S760 20 920 100s300 60 520-30V220H0Z" /></svg>
      <svg className="hill h1" viewBox="0 0 1440 220" preserveAspectRatio="none"><path d="M0 150C200 80 380 170 600 120s420-60 560 10l280-30V220H0Z" /></svg>
      <div className="introc">
        <motion.p className="jp" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }}>誕生日おめでとう</motion.p>
        <h1><Chars t="HAPPY BIRTHDAY" d={0.5} cls="l1" /><Chars t={CONFIG.name.toUpperCase()} d={1.1} cls="l2" /></h1>
        <motion.div className="age" initial={{ scale: 0, rotate: -120, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ delay: 1.7, type: 'spring', stiffness: 110, damping: 12 }}>
          <svg viewBox="0 0 200 200" className="ring" aria-hidden="true"><defs><path id="rp" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" /></defs><text fontSize="15" fontWeight="700" fill="#ffc66b" textLength="512" lengthAdjust="spacing"><textPath href="#rp">{RING}</textPath></text></svg>
          <div className="agec"><motion.b>{shown}</motion.b><small>years</small></div>
        </motion.div>
        <motion.p className="ep" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.7, duration: 0.8 }}><b>Episode {CONFIG.age}</b> The Hokage’s Birthday</motion.p>
        <motion.button className="play" onClick={onStart} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3, type: 'spring', stiffness: 100 }} whileTap={{ scale: 0.95 }}>
          <span className="tri" />Play the episode
        </motion.button>
      </div>
    </header>
  );
}
