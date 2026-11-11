// ===== EDIT THESE =====
export const CONFIG = {
  name: 'Kalyan',
  age: 28, // his age on this birthday (also the episode number)
  from: 'Your Hinata', // her name: credits and letter signature
  birthday: '2026-11-16T00:00:00', // countdown target
  jutsu: 'Making me laugh', // his signature habit (card)
  weakness: 'Cannot say no to biryani', // funny weakness (card)
  event: {
    when: 'Monday, 16 November 2026',
    time: 'Evening. The exact time is a surprise.',
    place: 'A secret location. She will guide you there.',
    map: '' // paste a Google Maps link to show an "Open the map" button
  },
  surprise: 'Reward unlocked: one tight hug and a surprise from her. Go find her!'
};
export const stats = [['Heart', 100], ['Courage', 96], ['Humour', 92], ['Loyalty', 100]];
// ======================
const files = import.meta.glob('./assets/*.jpg', { eager: true, import: 'default' });
const blurs = import.meta.glob('./assets/b/*.jpg', { eager: true, import: 'default' });
export const img = (n) => files[`./assets/${n}.jpg`];
export const blur = (n) => blurs[`./assets/b/${n}.jpg`];

// ar = width / height of each picture. All 17 images are used.
export const scenes = [
  { img: 1, ar: 1.776, ep: 'The boy who smiled', sub: 'Every great story begins with a boy who smiled the loudest.', alt: 'Young Naruto smiling under a blue sky' },
  { img: 3, ar: 1.303, ep: 'Alone, but pretending', sub: 'Some days you carried it all alone and told everyone you were fine. I noticed.', alt: 'Naruto alone holding a rope' },
  { img: 4, ar: 1.844, ep: 'Never giving up', sub: 'Then you got back up and promised, “I never go back on my word.”', alt: 'Naruto giving a thumbs up' },
  { img: 7, ar: 1.776, ep: 'The training arc', sub: 'You trained, you grew, and you kept every promise you made.', alt: 'Naruto in sage mode' },
  { img: 8, ar: 0.904, ep: 'Finding his team', sub: 'You found people who became your team and your home.', alt: 'Team 7' },
  { img: 10, ar: 1.776, ep: 'The rival', sub: 'The ones who challenged you made you stronger.', alt: 'Naruto and Sasuke split artwork' },
  { img: 11, ar: 1.776, ep: 'Every fight', sub: 'Every hard fight left you braver than before.', alt: 'Naruto and Sasuke face to face' },
  { img: 14, ar: 1.25, ep: 'The power inside', sub: 'There is a power in you that you don’t even see yet.', alt: 'Naruto with the nine-tailed fox' },
  { img: 15, ar: 1.776, ep: 'Burning bright', sub: 'And you carry it with kindness. That’s what makes you rare.', alt: 'Naruto in glowing red power' },
  { img: 2, ar: 1.736, ep: 'Someone noticed', sub: 'And then someone noticed you. Really noticed you.', alt: 'Naruto touching Hinata’s forehead' },
  { img: 17, ar: 0.562, ep: 'The look', sub: 'She never needed you to be the strongest. She just needed you.', alt: 'Naruto and Hinata blushing' },
  { img: 12, ar: 1.776, ep: 'Just us', sub: 'Just you. Just me. Nothing else needed.', alt: 'Naruto and Hinata close together' },
  { img: 5, ar: 0.563, ep: 'The quiet scenes', sub: 'My favourite scenes are the quiet ones, holding your hand.', alt: 'Naruto and Hinata in a flower meadow' },
  { img: 6, ar: 1.499, ep: 'Rest', sub: 'Resting beside you is the best part of every episode.', alt: 'Naruto and Hinata under a tree' },
  { img: 13, ar: 0.563, ep: 'Those behind him', sub: 'Everyone who ever believed in you is standing right behind you.', alt: 'Naruto at sunset with the people who believed in him' },
  { img: 16, ar: 1.779, ep: 'The Hokage', sub: 'One day you’ll stand on that rooftop. I’ll be right beside you.', alt: 'Naruto in the Hokage cloak' },
  { img: 9, ar: 1, ep: 'Happy birthday', sub: 'Happy 28th birthday, Kalyan. Keep smiling just like this.', alt: 'Naruto laughing at sunset' }
];

// *word* = highlighted in gold
export const letter = [
  'Kalyan, happy 28th birthday to the *boy* *who* *never* *gave* *up.*',
  'When I watch Naruto’s story, I don’t only see a hero. I see *you:* someone who smiled through the hard days, kept his promises, and made the people around him believe in themselves.',
  'You make my ordinary days feel like my *favourite* *episodes.* Thank you for every laugh, every fight we got through, and every time you *stayed.*',
  'This year I wish you dreams that come true, a team that never leaves, and a heart that is never lonely again. You are never alone. *I’m* *right* *here.*',
  'I love you. I’ve got your back, always. *Believe* *it!*'
];
