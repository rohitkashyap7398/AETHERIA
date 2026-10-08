import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import gsap from 'gsap';
import { Sparkles, ArrowRight, Compass, Shield, Zap, Eye, Play, Pause } from 'lucide-react';
import { DIMENSIONS, HERO_BANNER, DimensionItem } from '../data/dimensions';
import { audioSynth } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface GatewayViewProps {
  onSelectDimension: (item: DimensionItem) => void;
  onExploreGallery: () => void;
  onOpenChronicles: () => void;
}

export const GatewayView: React.FC<GatewayViewProps> = ({
  onSelectDimension,
  onExploreGallery,
  onOpenChronicles,
}) => {
  const [activePortalIndex, setActivePortalIndex] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isPlayingTheme, setIsPlayingTheme] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const portalCardRef = useRef<HTMLDivElement>(null);

  const activeDim = DIMENSIONS[activePortalIndex];

  // Scroll parallax tracking
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 800], [0, 180]);
  const heroTextY = useTransform(scrollY, [0, 800], [0, -80]);
  const portalScale = useTransform(scrollY, [0, 500], [1, 0.95]);

  // Mouse parallax on hero
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 35;
      const y = (e.clientY / innerHeight - 0.5) * 35;
      setMouseOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP animation when switching active portal dimension
  const handleDimensionChange = (index: number) => {
    setActivePortalIndex(index);
    const target = DIMENSIONS[index];

    audioSynth.triggerChime(440 + index * 80);

    if (portalCardRef.current) {
      gsap.fromTo(
        portalCardRef.current,
        { scale: 0.94, opacity: 0.6, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }
      );
    }
  };

  const handleToggleThemeAudio = () => {
    const state = audioSynth.toggle(activeDim.soundTheme);
    setIsPlayingTheme(state);
  };

  const triggerDimensionalWarp = () => {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#38bdf8', '#fbbf24', '#a855f7'],
    });
    audioSynth.triggerChime(880);
    onSelectDimension(activeDim);
  };

  return (
    <div className="relative min-h-screen bg-[#08090d]">
      {/* ================= HERO SECTION WITH PARALLAX ================= */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-10 pb-20"
      >
        {/* Parallax Background Canvas */}
        <motion.div
          style={{ y: heroBgY }}
          className="absolute inset-0 z-0 scale-105 pointer-events-none"
        >
          <img
            src={HERO_BANNER}
            alt="Multiverse Skyline"
            className="h-full w-full object-cover object-center opacity-45 brightness-95 filter"
            referrerPolicy="no-referrer"
          />
          {/* Deep gradient overlays for typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/60 to-[#08090d]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090d]/90 via-transparent to-[#08090d]/90" />
        </motion.div>

        {/* Floating Dimensional Rings & Parallax Particles */}
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          style={{
            transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          {/* Glowing portal ring 1 */}
          <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full border border-rose-500/20 bg-rose-500/[0.03] blur-xl animate-pulse" />
          {/* Glowing portal ring 2 */}
          <div className="absolute -bottom-20 right-1/4 h-[32rem] w-[32rem] rounded-full border border-cyan-500/20 bg-cyan-500/[0.03] blur-2xl" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 mx-auto max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Proposition & Story */}
            <motion.div
              style={{ y: heroTextY }}
              className="lg:col-span-7 space-y-7 relative"
            >
              {/* Subtle ambient halo behind headline */}
              <div
                className="absolute -top-12 -left-12 w-96 h-96 rounded-full blur-[100px] pointer-events-none transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle, rgba(244,63,94,0.2) 0%, rgba(245,158,11,0.1) 60%, transparent 80%)',
                  opacity: 'var(--ambient-opacity, 0.8)',
                }}
              />

              {/* Status Kicker */}
              <div className="relative inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-rose-300 font-mono tracking-wider backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                <span className="font-semibold">NEXUS // ONLINE</span>
                <span className="text-white/30" aria-hidden="true">·</span>
                <span className="text-neutral-300">5 PARALLAX DIMENSIONS SYNCHRONIZED</span>
              </div>

              {/* Redesigned Hero Headline */}
              <div className="relative space-y-2">
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.06] text-balance">
                  <span className="block text-white/95">Step Beyond The</span>
                  <span className="block bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 bg-clip-text text-transparent animate-text-shimmer ambient-text-glow">
                    Canvas of Reality.
                  </span>
                </h1>
                <div className="h-1 w-24 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 opacity-80" />
              </div>

              <p className="max-w-2xl text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                Immerse yourself in an interconnected multiverse of vibrant kinetic heroes, impressionist sunlit reveries, glacial auroras, and soaring cyberpunk skylines. Orchestrated with GSAP timeline dynamics, responsive ambient illumination, and multi-depth parallax scrolling.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={triggerDimensionalWarp}
                  className="group relative flex items-center gap-3 rounded-xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl transition-all hover:brightness-110 active:scale-95 ambient-glow-reactive overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Enter {activeDim.title.split('&')[0]}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <button
                  onClick={onExploreGallery}
                  className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-medium text-neutral-200 backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white shadow-lg"
                >
                  <Eye className="h-4 w-4 text-cyan-400" />
                  <span>3D Parallax Gallery</span>
                </button>
              </div>

              {/* Dimension Quick Switch Tabs */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-xs font-mono uppercase text-neutral-400 tracking-wider mb-3">
                  Select Coordinate:
                </p>
                <div className="flex flex-wrap gap-2">
                  {DIMENSIONS.map((dim, idx) => (
                    <button
                      key={dim.id}
                      onClick={() => handleDimensionChange(idx)}
                      className={`group flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition-all ${
                        activePortalIndex === idx
                          ? 'border-rose-500/60 bg-rose-500/15 text-white font-medium shadow-md shadow-rose-500/10'
                          : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-neutral-200'
                      }`}
                    >
                      <span className="font-mono text-[10px] text-neutral-400 group-hover:text-neutral-300">
                        {dim.code}
                      </span>
                      <span className="truncate max-w-[120px]">{dim.characters[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Interactive 3D Portal Showcase Card */}
            <motion.div
              style={{ scale: portalScale }}
              className="lg:col-span-5 flex justify-center"
            >
              <div
                ref={portalCardRef}
                className="group relative w-full max-w-sm rounded-2xl border border-white/15 bg-neutral-900/80 p-3 shadow-2xl backdrop-blur-xl transition-all"
                style={{
                  transform: `perspective(1000px) rotateY(${mouseOffset.x * 0.25}deg) rotateX(${-mouseOffset.y * 0.25}deg)`,
                  boxShadow: `0 20px 50px -10px ${activeDim.glowColor}`,
                }}
              >
                {/* Artwork Viewport with dynamic glowing border */}
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-neutral-950">
                  <img
                    src={activeDim.image}
                    alt={activeDim.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Top Bar Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="rounded-md bg-black/60 px-2 py-1 font-mono text-[11px] text-white/90 backdrop-blur-md border border-white/10">
                      {activeDim.code}
                    </span>
                    <button
                      onClick={handleToggleThemeAudio}
                      className="flex items-center gap-1.5 rounded-md bg-black/60 px-2 py-1 text-[11px] text-white/90 backdrop-blur-md border border-white/10 hover:bg-black/80 transition-colors"
                      title="Toggle soundscape for this dimension"
                    >
                      {isPlayingTheme ? (
                        <>
                          <Pause className="h-3 w-3 text-rose-400" />
                          <span>Mute Synth</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 text-rose-400" />
                          <span>Soundscape</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Bottom Card Content */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <p className="font-mono text-xs uppercase tracking-wider text-rose-400">
                      {activeDim.universe}
                    </p>
                    <h3 className="font-display text-xl font-bold text-white leading-tight">
                      {activeDim.title}
                    </h3>
                    <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                      {activeDim.synopsis}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-neutral-400">
                        Resonance: {activeDim.metrics.resonance}%
                      </span>
                      <button
                        onClick={() => onSelectDimension(activeDim)}
                        className="text-xs font-semibold text-white hover:text-rose-400 transition-colors flex items-center gap-1"
                      >
                        Inspect Story <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= MULTI-LAYER PARALLAX SCROLL STORYLINE ================= */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#090a0f]">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400">
              Dimensional Chronicles · 5 Realities
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Parallax Depth Showcase
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              Each portal manifests with individual atmospheric frequencies, character narratives, and signature artistic aesthetics.
            </p>
          </div>

          {/* Alternating Asymmetric Dimensional Cards */}
          <div className="space-y-32">
            {DIMENSIONS.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                    isEven ? '' : 'lg:grid-flow-dense'
                  }`}
                >
                  {/* Visual Card with Depth and Tilt */}
                  <div
                    className={`lg:col-span-6 ${
                      isEven ? '' : 'lg:col-start-7'
                    }`}
                  >
                    <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/50 p-2 shadow-2xl transition-all duration-500 hover:border-white/20">
                      <div className="relative aspect-[3/4] sm:aspect-[9/16] max-h-[640px] w-full overflow-hidden rounded-xl bg-black">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                        {/* Floating Corner Metadata */}
                        <div className="absolute top-4 left-4">
                          <span className="font-mono text-xs px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-neutral-200">
                            {item.code}
                          </span>
                        </div>

                        {/* Interactive Soundscape button on card */}
                        <div className="absolute top-4 right-4">
                          <button
                            onClick={() => audioSynth.toggle(item.soundTheme)}
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 text-neutral-200 hover:text-white transition-colors"
                          >
                            <Zap className="h-3.5 w-3.5 text-amber-400" />
                            <span>Audio Pulse</span>
                          </button>
                        </div>

                        {/* Bottom Quote Badge */}
                        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                          <p className="text-xs italic text-neutral-200 mb-2">
                            "{item.quote.text}"
                          </p>
                          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                            <span>— {item.quote.author}</span>
                            <span>{item.era}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Editorial Text & Capability Details */}
                  <div
                    className={`lg:col-span-6 space-y-6 ${
                      isEven ? '' : 'lg:col-start-1'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
                        <span>{item.metrics.depthIndex}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.metrics.frequency}</span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-neutral-400">
                        {item.tagline}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                      {item.synopsis}
                    </p>

                    {/* Excerpt Box */}
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-xs space-y-2">
                      <span className="font-mono text-neutral-400 uppercase tracking-wider text-[11px]">
                        {item.storyChapter.title}
                      </span>
                      <p className="text-neutral-300 italic leading-relaxed">
                        {item.storyChapter.excerpt}
                      </p>
                    </div>

                    {/* Character & Art Style Specs */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="rounded-lg border border-white/[0.06] bg-black/30 p-3">
                        <span className="block text-[11px] font-mono text-neutral-400">
                          Primary Inhabitants
                        </span>
                        <span className="text-xs font-semibold text-white">
                          {item.characters.join(', ')}
                        </span>
                      </div>
                      <div className="rounded-lg border border-white/[0.06] bg-black/30 p-3">
                        <span className="block text-[11px] font-mono text-neutral-400">
                          Art Direction
                        </span>
                        <span className="text-xs font-semibold text-white truncate block">
                          {item.metrics.artStyle}
                        </span>
                      </div>
                    </div>

                    {/* Call to action */}
                    <div className="pt-2 flex items-center gap-4">
                      <button
                        onClick={() => onSelectDimension(item)}
                        className="flex items-center gap-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg transition-colors border border-white/10"
                      >
                        <Compass className="h-3.5 w-3.5 text-rose-400" />
                        <span>Launch Dimension View</span>
                      </button>
                      <button
                        onClick={onOpenChronicles}
                        className="text-xs font-medium text-neutral-400 hover:text-white transition-colors"
                      >
                        Read Chronicles →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE IMMERSIVE BANNER ================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-gradient-to-b from-[#08090d] to-[#0d0f17]">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/15 bg-neutral-900/60 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs text-rose-300">
              <Shield className="h-3.5 w-3.5" />
              <span>Full GSAP Physics & Framer Motion Stack</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight max-w-2xl mx-auto">
              Ready to Explore The Parallax Gallery?
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
              Inspect all 5 high-resolution dimensional artworks in full 3D tilt mode with customizable lighting shaders and 4K wallpaper exports.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={onExploreGallery}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-3.5 text-xs font-semibold text-white shadow-xl shadow-rose-500/30 hover:brightness-110 active:scale-95 transition-all"
              >
                <Eye className="h-4 w-4" />
                <span>Open 3D Art Gallery</span>
              </button>
              <button
                onClick={onOpenChronicles}
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3.5 text-xs font-medium text-white hover:bg-white/[0.1] transition-all"
              >
                <span>Browse The Chronicles</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
