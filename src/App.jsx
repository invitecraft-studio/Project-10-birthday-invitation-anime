import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import Petals from './components/Petals.jsx';
import Intro from './components/Intro.jsx';
import Swirl from './components/Swirl.jsx';
import Stage from './components/Stage.jsx';
import HoloCard from './components/HoloCard.jsx';
import Pass from './components/Pass.jsx';
import Credits from './components/Credits.jsx';
import Reward from './components/Reward.jsx';

export default function App() {
  const [phase, setPhase] = useState('intro'); // intro > swirl > story
  const [reward, setReward] = useState(false);
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  useEffect(() => { if (phase === 'story') window.scrollTo(0, 0); }, [phase]);
  const start = () => { setPhase('swirl'); setTimeout(() => setPhase('story'), 1500); };
  const story = phase === 'story';
  return (
    <MotionConfig reducedMotion="user">
      <Petals />
      {story && <motion.div className="prog" style={{ scaleX: sx }} />}
      <AnimatePresence>{phase === 'swirl' && <Swirl key="s" />}</AnimatePresence>
      {!story && <Intro onStart={start} />}
      {story && (
        <main>
          <Stage />
          <HoloCard />
          <Pass />
          <Credits onClaim={() => setReward(true)} />
        </main>
      )}
      <AnimatePresence>{reward && <Reward key="r" onClose={() => setReward(false)} />}</AnimatePresence>
    </MotionConfig>
  );
}
