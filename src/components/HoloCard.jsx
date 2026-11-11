import { useState } from 'react';
import { motion } from 'framer-motion';
import { CONFIG, img, stats } from '../data.js';
import Tilt from './Tilt.jsx';
import { Flip } from './Kinetic.jsx';

export default function HoloCard() {
  const [flip, setFlip] = useState(false);
  return (
    <section className="cardsec" id="after-reel">
      <h2><Flip text="Character select" /></h2>
      <motion.div className="cardwrap" initial={{ y: -260, rotate: -25, opacity: 0 }} whileInView={{ y: 0, rotate: 0, opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ type: 'spring', stiffness: 70, damping: 11 }}>
        <Tilt max={14} className="cardtilt">
          <motion.button className="tcard" onClick={() => setFlip(!flip)} animate={{ rotateY: flip ? 180 : 0 }} transition={{ type: 'spring', stiffness: 90, damping: 14 }} aria-label="Flip the card">
            <div className="face front">
              <div className="ctop"><b>S-RANK</b><span>LV {CONFIG.age}</span></div>
              <div className="art"><img src={img(9)} alt="Naruto laughing at sunset" /></div>
              <h3>{CONFIG.name}</h3>
              <p className="cls">Future Hokage</p>
              <p className="fl">“I never go back on my word.”</p>
              <div className="cnum">No. 1116</div>
              <span className="holo" />
            </div>
            <div className="face back">
              <h3>Ninja Info</h3>
              {stats.map(([k, v], i) => (
                <div className="st" key={k}><span>{k}</span><div className="bar"><motion.i initial={{ width: 0 }} animate={{ width: flip ? `${v}%` : 0 }} transition={{ duration: 1, delay: 0.4 + i * 0.12 }} /></div></div>
              ))}
              <dl><dt>Special jutsu</dt><dd>{CONFIG.jutsu}</dd><dt>Weakness</dt><dd>{CONFIG.weakness}</dd></dl>
              <span className="holo" />
            </div>
          </motion.button>
        </Tilt>
      </motion.div>
      <p className="hint2">Tap the card to flip it. Tilt it to catch the light.</p>
    </section>
  );
}
