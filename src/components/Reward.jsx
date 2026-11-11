import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CONFIG } from '../data.js';

const COL = ['#ff7a1a', '#ffc247', '#fff4e2', '#2d5bff', '#ff9ec4', '#0e0c14'];

export default function Reward({ onClose }) {
  useEffect(() => {
    const end = Date.now() + 2200, o = { colors: COL, disableForReducedMotion: true };
    confetti({ ...o, particleCount: 180, spread: 110, origin: { y: 0.6 } });
    (function f() {
      confetti({ ...o, particleCount: 5, angle: 60, spread: 65, origin: { x: 0, y: 0.8 } });
      confetti({ ...o, particleCount: 5, angle: 120, spread: 65, origin: { x: 1, y: 0.8 } });
      if (Date.now() < end) requestAnimationFrame(f);
    })();
    const k = (e) => e.key === 'Escape' && onClose();
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <motion.div className="reward" role="dialog" aria-label="Birthday reward"
      initial={{ clipPath: 'circle(0% at 50% 85%)' }} animate={{ clipPath: 'circle(150% at 50% 85%)' }}
      exit={{ clipPath: 'circle(0% at 50% 85%)' }} transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}>
      <motion.div className="rays" animate={{ rotate: 360 }} transition={{ duration: 50, ease: 'linear', repeat: Infinity }} />
      <div className="rc">
        <motion.h2 initial={{ scale: 0.1, rotate: -25, opacity: 0 }} animate={{ scale: 1, rotate: -3, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 150, damping: 9, delay: 0.5 }}>
          HAPPY BIRTHDAY {CONFIG.name.toUpperCase()}!
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>{CONFIG.surprise}</motion.p>
        <motion.button className="btn dark" autoFocus onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} whileTap={{ scale: 0.94 }}>
          BACK TO THE STORY
        </motion.button>
      </div>
    </motion.div>
  );
}
