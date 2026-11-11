import { motion } from 'framer-motion';
// Heading: every letter flips in around the X axis
export function Flip({ text, className, delay = 0 }) {
  return (
    <span className={className} aria-label={text} style={{ display: 'inline-block', perspective: 600 }}>
      {text.split(' ').map((w, wi, a) => (
        <span key={wi} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {[...w].map((c, k) => (
            <motion.span key={k} style={{ display: 'inline-block', transformOrigin: '50% 100%' }}
              initial={{ rotateX: -95, opacity: 0, y: 20 }} whileInView={{ rotateX: 0, opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }}
              transition={{ type: 'spring', stiffness: 150, damping: 14, delay: delay + (wi * 4 + k) * 0.035 }}>{c}</motion.span>
          ))}{wi < a.length - 1 ? '\u00a0' : ''}
        </span>
      ))}
    </span>
  );
}
// Subtitle: each letter ignites gold and cools into cream
const box = { s: { transition: { staggerChildren: 0.022, delayChildren: 0.55 } } };
const ch = { h: { opacity: 0, y: 16, scale: 1.5, color: '#ffc66b', filter: 'blur(7px)' }, s: { opacity: 1, y: 0, scale: 1, color: '#fff3e0', filter: 'blur(0px)', transition: { duration: 0.55 } } };
export function Ignite({ text, className }) {
  return (
    <motion.p className={className} initial="h" animate="s" variants={box} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {[...w].map((c, k) => <motion.span key={k} variants={ch} style={{ display: 'inline-block' }}>{c}</motion.span>)}{'\u00a0'}
        </span>
      ))}
    </motion.p>
  );
}
