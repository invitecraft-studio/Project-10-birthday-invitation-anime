import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CONFIG } from '../data.js';
import { Flip } from './Kinetic.jsx';

const left = () => { const d = Math.max(0, new Date(CONFIG.birthday) - Date.now()); return [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60]; };
const Digit = ({ v, l }) => (
  <div className="cd"><div className="num"><AnimatePresence mode="popLayout" initial={false}>
    <motion.span key={v} initial={{ y: -22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 22, opacity: 0 }} transition={{ duration: 0.3 }}>{String(v).padStart(2, '0')}</motion.span>
  </AnimatePresence></div><small>{l}</small></div>
);
const ZIG = `polygon(0 0,100% 0,${Array.from({ length: 21 }, (_, k) => `${100 - k * 5}% ${k % 2 ? 'calc(100% - 10px)' : '100%'}`).join(',')})`;

export default function Pass() {
  const [t, setT] = useState(left);
  const [torn, setTorn] = useState(false);
  useEffect(() => { const id = setInterval(() => setT(left()), 1000); return () => clearInterval(id); }, []);
  const tear = () => { if (torn) return; setTorn(true); confetti({ particleCount: 90, spread: 80, origin: { y: 0.75 }, colors: ['#ff6a1f', '#ffc66b', '#fff3e0', '#ff8fb3'], disableForReducedMotion: true }); };
  const e = CONFIG.event, done = t.every((x) => x === 0);
  const reveal = (txt) => (
    <motion.dd animate={{ filter: torn ? 'blur(0px)' : 'blur(7px)', opacity: torn ? 1 : 0.7 }} transition={{ duration: 0.9, delay: torn ? 0.5 : 0 }} aria-hidden={!torn}>{txt}</motion.dd>
  );
  return (
    <section className="brief">
      <h2><Flip text="Your mission pass" /></h2>
      <motion.div className="pass" initial={{ opacity: 0, y: 80, rotateX: 40 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}>
        <motion.div className="pmain" style={{ clipPath: torn ? ZIG : 'none' }} animate={torn ? { rotate: [0, -1.4, 1, 0] } : {}} transition={{ duration: 0.5 }}>
          <div className="prow"><b>Birthday mission pass</b><span>No. 1116</span></div>
          <div className="route"><div><small>From</small><strong>Her heart</strong></div><span className="arrow">→</span><div><small>To</small><strong>Your birthday</strong></div></div>
          <h3>{CONFIG.name}</h3>
          {done ? <p className="today">It’s your day!</p> : <div className="cds"><Digit v={t[0]} l="days" /><Digit v={t[1]} l="hrs" /><Digit v={t[2]} l="min" /><Digit v={t[3]} l="sec" /></div>}
          <dl>
            <dt>Date</dt><dd>{e.when}</dd>
            <dt>Time</dt>{reveal(e.time)}
            <dt>Place</dt>{reveal(e.place)}
          </dl>
          <AnimatePresence>{torn && e.map && <motion.a className="maplink" href={e.map} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>Open the map</motion.a>}</AnimatePresence>
          <AnimatePresence>{torn && <motion.p className="unlocked" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, rotate: -8 }} transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 12 }}>Mission unlocked</motion.p>}</AnimatePresence>
        </motion.div>
        <motion.div className="pstub" drag={torn ? false : 'y'} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.7 }} onDragEnd={(_, i) => i.offset.y > 60 && tear()}
          animate={torn ? { y: 420, x: 40, rotate: 18, opacity: 0 } : { y: 0 }} transition={torn ? { duration: 0.8, ease: 'easeIn' } : undefined} style={{ pointerEvents: torn ? 'none' : 'auto' }}>
          <div className="bars" />
          <div className="tearTxt"><motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.3 }}>↓</motion.span><b>Pull down to tear</b><button onClick={tear}>or tap here</button></div>
        </motion.div>
      </motion.div>
      <p className="hint2">{torn ? 'Ticket torn. See you there!' : 'Tear the stub to unlock the time and place.'}</p>
    </section>
  );
}
