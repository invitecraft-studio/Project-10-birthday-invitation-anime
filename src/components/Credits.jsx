import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CONFIG, img, letter } from '../data.js';
import { Flip } from './Kinetic.jsx';
import Tilt from './Tilt.jsx';

function W({ w, p, a, b }) {
  const hl = w.startsWith('*'), c = useTransform(p, [a, b], ['rgba(42,26,16,.2)', hl ? '#c2410c' : '#2a1a10']);
  return <motion.span style={{ color: c }}>{w.replace(/\*/g, '')}{' '}</motion.span>;
}
function ScrollText({ text, cls }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] });
  const x = useTransform(p, [0, 1], [-16, 0]);
  const ws = text.split(' ');
  return <motion.p ref={ref} className={cls} style={{ x }}>{ws.map((w, i) => <W key={i} w={w} p={p} a={i / ws.length} b={(i + 1) / ws.length} />)}</motion.p>;
}
const roles = [['主演', 'Starring', `${CONFIG.name}, as himself`], ['監督', 'Directed by', CONFIG.from], ['脚本', 'Written with', 'every memory we made'], ['感謝', 'Special thanks', 'everyone who believed in him']];
const view = { once: true, amount: 0.25 };

export default function Credits({ onClaim }) {
  return (
    <section className="credits">
      <h2><Flip text="End credits" /></h2>
      <div className="ccards">
        {roles.map(([kj, r, n], i) => (
          <motion.div key={r} animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 3.4 + i * 0.4, ease: 'easeInOut', delay: i * 0.3 }}>
            <Tilt max={12}>
              <motion.div className="ccard" style={{ transformPerspective: 800 }} initial={{ opacity: 0, rotateY: -85, y: 70, scale: 0.8 }} whileInView={{ opacity: 1, rotateY: 0, y: 0, scale: 1 }} viewport={view}
                transition={{ type: 'spring', stiffness: 90, damping: 12, delay: i * 0.14 }}>
                <span className="kj" aria-hidden="true">{kj}</span><small>{r}</small><b>{n}</b>
              </motion.div>
            </Tilt>
          </motion.div>
        ))}
      </div>

      <h2 className="lh"><Flip text="A letter for you" /></h2>
      <div className="lwrap">
        <motion.div className="lcard" style={{ transformOrigin: 'top' }} initial={{ opacity: 0, y: 70, scaleY: 0.85 }} whileInView={{ opacity: 1, y: 0, scaleY: 1 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}>
          <motion.div className="lflap" style={{ transformPerspective: 900 }} initial={{ rotateX: 0 }} whileInView={{ rotateX: -180 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 1, delay: 1.3, ease: [0.6, 0, 0.2, 1] }} />
          <motion.div className="seal" initial={{ scale: 0 }} whileInView={{ scale: [0, 1.2, 1, 1, 1], y: [0, 0, 0, 0, 150], opacity: [1, 1, 1, 1, 0], rotate: [0, 0, 0, 0, 50] }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 2.4, times: [0, 0.15, 0.25, 0.55, 1] }}>♥</motion.div>
          <div className="lbody">
            {letter.map((t, i) => <ScrollText key={i} text={t} cls={i === 0 ? 'm0' : 'm'} />)}
            <motion.p className="sign" initial={{ clipPath: 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true }} transition={{ duration: 2.2, ease: 'easeInOut' }}>{CONFIG.from}</motion.p>
          </div>
        </motion.div>
      </div>

      <motion.button className="play big" onClick={onClaim} initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 120 }} whileTap={{ scale: 0.94 }}>Claim your reward</motion.button>
      <motion.div className="nextwrap" initial={{ opacity: 0, y: 80, rotate: 3 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ type: 'spring', stiffness: 80, damping: 13 }}>
        <Tilt max={8}>
          <div className="nextcard">
            <div className="nthumb">
              <motion.img src={img(6)} alt="Naruto and Hinata resting under a tree" animate={{ scale: [1.05, 1.22, 1.05], x: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }} />
              <span className="scan" /><span className="live"><i />Preview</span><span className="ep29">Ep. {CONFIG.age + 1}</span>
            </div>
            <div className="nbody">
              <small>Next episode</small>
              <b>Another year, still beside you</b>
              <div className="load"><motion.i initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 2.4, delay: 0.7, ease: 'easeInOut' }} /></div>
              <p>Coming next November 16 ✦</p>
            </div>
          </div>
        </Tilt>
      </motion.div>
    </section>
  );
}
