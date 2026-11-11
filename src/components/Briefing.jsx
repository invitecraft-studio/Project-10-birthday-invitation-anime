import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONFIG } from '../data.js';

const left = () => { const d = Math.max(0, new Date(CONFIG.birthday) - Date.now()); return [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60]; };
const Digit = ({ v, l }) => (
  <div className="cd"><div className="num"><AnimatePresence mode="popLayout" initial={false}>
    <motion.span key={v} initial={{ y: -22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 22, opacity: 0 }} transition={{ duration: 0.3 }}>{String(v).padStart(2, '0')}</motion.span>
  </AnimatePresence></div><small>{l}</small></div>
);

export default function Briefing() {
  const [t, setT] = useState(left);
  useEffect(() => { const id = setInterval(() => setT(left()), 1000); return () => clearInterval(id); }, []);
  const e = CONFIG.event, done = t.every((x) => x === 0);
  return (
    <section className="brief">
      <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>Next scene: the birthday</motion.h2>
      <motion.div className="ticket" initial={{ opacity: 0, y: 80, rotateX: 30 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }} style={{ transformPerspective: 1000 }}>
        <div className="tmain">
          <p className="who">Admit one</p>
          <h3>{CONFIG.name}</h3>
          <dl>
            <dt>Date</dt><dd>{e.when}</dd>
            <dt>Time</dt><dd>{e.time}</dd>
            <dt>Place</dt><dd>{e.place}</dd>
          </dl>
          {e.map && <a className="maplink" href={e.map} target="_blank" rel="noreferrer">Open the map</a>}
        </div>
        <div className="tstub">
          {done ? <p className="today">It’s your day!</p> : <div className="cds"><Digit v={t[0]} l="days" /><Digit v={t[1]} l="hrs" /><Digit v={t[2]} l="min" /><Digit v={t[3]} l="sec" /></div>}
          <motion.div className="stamp" initial={{ scale: 3, opacity: 0, rotate: -30 }} whileInView={{ scale: 1, opacity: 1, rotate: -12 }} viewport={{ once: true }} transition={{ delay: 0.8, type: 'spring', stiffness: 180, damping: 12 }}>Approved by her</motion.div>
        </div>
      </motion.div>
    </section>
  );
}
