import imgGwenGlitch from '../assets/images/spider_heroine_glitch_1791478827178.jpg';
import imgSunlitRomance from '../assets/images/sunlit_romance_duo_1791478975432.jpg';
import imgElsaAnna from '../assets/images/elsa_anna_aurora_1791478727342.jpg';
import imgCyberpunkGirl from '../assets/images/cyberpunk_sunset_girl_1791478748904.jpg';
import imgRooftopPartners from '../assets/images/rooftop_hero_partners_1791478890962.jpg';
import imgMultiverseHero from '../assets/images/multiverse_parallax_hero_1791478904099.jpg';

export interface DimensionItem {
  id: string;
  code: string;
  title: string;
  tagline: string;
  characters: string[];
  universe: string;
  era: string;
  accentColor: string;
  accentHex: string;
  glowColor: string;
  soundTheme: 'glitch' | 'warm' | 'aurora' | 'cyber' | 'twilight';
  image: string;
  heroRatio: string;
  synopsis: string;
  storyChapter: {
    title: string;
    excerpt: string;
    dialogue: { speaker: string; text: string }[];
  };
  metrics: {
    resonance: number;
    depthIndex: string;
    frequency: string;
    artStyle: string;
  };
  quote: {
    text: string;
    author: string;
  };
}

export const HERO_BANNER = imgMultiverseHero;

export const DIMENSIONS: DimensionItem[] = [
  {
    id: 'earth-65-glitch',
    code: 'DIM-01',
    title: 'Ghost-Spider & Chromatic Glitch',
    tagline: 'Vibrant web-slinging rebel breaking dimensional boundaries',
    characters: ['Gwen Stacy', 'Ghost-Spider'],
    universe: 'Earth-65 Neon Pulse',
    era: 'Neo-Chromatic Era',
    accentColor: 'from-pink-500 to-rose-600',
    accentHex: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    soundTheme: 'glitch',
    image: imgGwenGlitch,
    heroRatio: '9:16',
    synopsis:
      'In a dimension where music, speed, and vibrant spray-paint define reality, Gwen Stacy wields kinetic balance and spider-instincts amidst shifting chromatic rifts.',
    storyChapter: {
      title: 'Chapter I: The Rhythm of the Web',
      excerpt:
        'The rooftop asphalt hummed beneath her canvas soles. Above, the sky cracked into magenta and turquoise static—a rift singing the bassline of a reality yet untamed.',
      dialogue: [
        { speaker: 'Gwen', text: 'You think you can keep me in one dimension? Rhythm does not follow rules.' },
        { speaker: 'Intercom', text: 'Dimensional variance detected: +14.2% chromatic spill.' },
        { speaker: 'Gwen', text: 'Good. Then it matches my tempo.' },
      ],
    },
    metrics: {
      resonance: 98,
      depthIndex: 'Layer 01 // Surface Rift',
      frequency: '432.8 THz',
      artStyle: 'Chromatic Glitch & Comic Halftone',
    },
    quote: {
      text: 'In every universe, they say we fall. But they never saw the way we learn to fly.',
      author: 'Gwen Stacy',
    },
  },
  {
    id: 'sunlit-romance',
    code: 'DIM-02',
    title: 'The Upside-Down Reverie',
    tagline: 'Impressionist summer light and tender rooftop vows',
    characters: ['Peter Parker', 'Gwen Stacy'],
    universe: 'Earth-1965 Classic Sun',
    era: 'Golden Afternoon',
    accentColor: 'from-amber-400 to-orange-500',
    accentHex: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    soundTheme: 'warm',
    image: imgSunlitRomance,
    heroRatio: '9:16',
    synopsis:
      'Suspended in inverted poise among dappled sunlight and green leaves, two souls meet across the boundary of duty and innocence in timeless painterly warmth.',
    storyChapter: {
      title: 'Chapter II: The Inverted Horizon',
      excerpt:
        'Leaves whispered in the gentle summer draft. When he dropped upside down into view, gravity ceased to matter; the whole world simply inverted to meet her smile.',
      dialogue: [
        { speaker: 'Peter', text: 'You always look so calm when the rest of the city is in a spin.' },
        { speaker: 'Gwen', text: 'That is because you are doing all the spinning for both of us.' },
        { speaker: 'Peter', text: 'Fair enough. Do not let me drop my lunch.' },
      ],
    },
    metrics: {
      resonance: 92,
      depthIndex: 'Layer 02 // Harmonic Solstice',
      frequency: '512.4 THz',
      artStyle: 'Impressionist Canvas & Dappled Oils',
    },
    quote: {
      text: 'Meeting upside down was easy; staying right side up together was the true adventure.',
      author: 'Peter Parker',
    },
  },
  {
    id: 'frozen-aurora',
    code: 'DIM-03',
    title: 'Aurora of the Twin Sovereigns',
    tagline: 'Crystalline fjords and glowing emerald night skies',
    characters: ['Queen Elsa', 'Princess Anna'],
    universe: 'Arendelle Borealis',
    era: 'The Winter Solstice',
    accentColor: 'from-teal-400 to-emerald-500',
    accentHex: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.4)',
    soundTheme: 'aurora',
    image: imgElsaAnna,
    heroRatio: '9:16',
    synopsis:
      'Beneath dancing curtains of green and violet northern lights, the bonds of devotion dissolve the deepest frosts, revealing warmth that outlasts winter itself.',
    storyChapter: {
      title: 'Chapter III: Crown of Northern Fire',
      excerpt:
        'The fjord lay frozen like glass reflecting infinity. Emerald auroras arched from peak to peak, whispering ancient lullabies across the snow-capped crests.',
      dialogue: [
        { speaker: 'Elsa', text: 'The cold never troubled the stars, Anna. Only the solitude did.' },
        { speaker: 'Anna', text: 'Then look up. As long as the sky dances, we never walk in darkness alone.' },
        { speaker: 'Elsa', text: 'Step by step, through every winter.' },
      ],
    },
    metrics: {
      resonance: 95,
      depthIndex: 'Layer 03 // Glacial Stratum',
      frequency: '588.1 THz',
      artStyle: 'High-Fidelity Nordic Hyperrealism',
    },
    quote: {
      text: 'Some people are worth melting for, but true sisters kindle a flame that never dies.',
      author: 'Elsa & Anna',
    },
  },
  {
    id: 'cyber-sunset',
    code: 'DIM-04',
    title: 'Neo-Horizon & Cyberpunk Dusk',
    tagline: 'Golden hour towering megacity skyline and endless wonder',
    characters: ['Aria', 'The City Wanderer'],
    universe: 'Neo-Kyoto Sector 09',
    era: 'Year 2099 Dusk',
    accentColor: 'from-orange-500 to-purple-600',
    accentHex: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    soundTheme: 'cyber',
    image: imgCyberpunkGirl,
    heroRatio: '9:16',
    synopsis:
      'High on the metallic skybridges above towering magnetic transit arteries, an observer contemplates the infinite possibilities of an electric metropolis painted in sunset amber.',
    storyChapter: {
      title: 'Chapter IV: Amber Over Circuits',
      excerpt:
        'The solar collectors on the spire apex caught the last ember rays of daylight. Speeder drones traced neon veins across the canyons of chrome and glass.',
      dialogue: [
        { speaker: 'Aria', text: 'From up here, ten million stories glow all at once.' },
        { speaker: 'Drone AI', text: 'Traffic altitude optimal. Atmospheric density 1.02.' },
        { speaker: 'Aria', text: 'Turn off the navigation audio. Just let me listen to the sunset.' },
      ],
    },
    metrics: {
      resonance: 94,
      depthIndex: 'Layer 04 // Stratospheric Apex',
      frequency: '620.0 THz',
      artStyle: 'Anime Neo-Futurism & Atmospheric Dusk',
    },
    quote: {
      text: 'Cities are not made of steel and concrete; they are built of the dreams that look up from the edge.',
      author: 'Skybridge Chronicle',
    },
  },
  {
    id: 'rooftop-partners',
    code: 'DIM-05',
    title: 'Twilight Bench & Shared Horizons',
    tagline: 'Two heroes finding solace on a quiet Brooklyn rooftop',
    characters: ['Miles Morales', 'Spider-Gwen'],
    universe: 'Earth-1610 Convergence',
    era: 'Twilight Hour',
    accentColor: 'from-violet-500 to-fuchsia-600',
    accentHex: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    soundTheme: 'twilight',
    image: imgRooftopPartners,
    heroRatio: '9:16',
    synopsis:
      'Between interdimensional anomalies and world-saving burdens, quiet moments on a wooden rooftop bench remind two kindred protectors of why they leap into the void.',
    storyChapter: {
      title: 'Chapter V: The Bench Above Brooklyn',
      excerpt:
        'The water tower cast a long shadow across the graffiti-tagged brickwork. The city below roared with evening traffic, but up here, time moved with gentle patience.',
      dialogue: [
        { speaker: 'Miles', text: 'Ever feel like the mask gets heavier the longer you wear it?' },
        { speaker: 'Gwen', text: 'Every single day, Miles. But that is why you take it off when you are with friends.' },
        { speaker: 'Miles', text: 'Thanks, Gwen. For being in this dimension.' },
      ],
    },
    metrics: {
      resonance: 99,
      depthIndex: 'Layer 05 // Anchor Horizon',
      frequency: '440.0 THz',
      artStyle: 'Vintage Graphic Novel & Soft Halftone',
    },
    quote: {
      text: 'Anyone can wear the mask. You can wear the mask. If you didn’t know that before, I hope you do now.',
      author: 'Miles Morales',
    },
  },
];
