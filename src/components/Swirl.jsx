import { motion } from 'framer-motion';
import { CONFIG } from '../data.js';
let D = '';
for (let t = 0; t <= 12 * Math.PI; t += 0.2) { const r = 4 + t * 5.2; D += `${t ? 'L' : 'M'}${(200 + r * Math.cos(t)).toFixed(1)} ${(200 + r * Math.sin(t)).toFixed(1)}`; }
export default function Swirl() {
  const o = 'circle(0% at 50% 62%)';
  return (
    <motion.div className="swirl" initial={{ clipPath: o }} animate={{ clipPath: 'circle(150% at 50% 62%)' }} exit={{ clipPath: o }} transition={{ duration: 1, ease: [0.7, 0, 0.2, 1] }}>
      <motion.svg viewBox="0 0 400 400" animate={{ rotate: 540, scale: [0.5, 1.7] }} transition={{ duration: 2.4, ease: 'easeInOut' }}><path d={D} fill="none" stroke="#fff3e0" strokeWidth="8" strokeLinecap="round" /></motion.svg>
      <motion.b initial={{ opacity: 0, letterSpacing: '.6em' }} animate={{ opacity: 1, letterSpacing: '.15em' }} exit={{ opacity: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>Episode {CONFIG.age}</motion.b>
    </motion.div>
  );
}
