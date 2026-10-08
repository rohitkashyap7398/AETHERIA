import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { Play, RotateCcw, Sparkles, Activity, Layers, Sliders, Check } from 'lucide-react';
import { DIMENSIONS } from '../data/dimensions';
import { audioSynth } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

export const MotionLabView: React.FC = () => {
  const [isPlayingTimeline, setIsPlayingTimeline] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [depthMultiplier, setDepthMultiplier] = useState(1.5);
  const [gravityEnabled, setGravityEnabled] = useState(true);
  const [activeShard, setActiveShard] = useState<number | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const shardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const portalCoreRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Initialize GSAP Timeline on demand
  const runCinematicSequence = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    setIsPlayingTimeline(true);
    audioSynth.triggerChime(440);

    const tl = gsap.timeline({
      onUpdate: () => {
        setTimelineProgress(Math.round(tl.progress() * 100));
      },
      onComplete: () => {
        setIsPlayingTimeline(false);
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#ec4899', '#38bdf8', '#fbbf24', '#a855f7'],
        });
        audioSynth.triggerChime(880);
      },
    });

    timelineRef.current = tl;

    // Stage 1: Pulsing portal core expansion
    tl.to(portalCoreRef.current, {
      scale: 1.4,
      rotation: 180,
      opacity: 1,
      duration: 1.2,
      ease: 'power2.inOut',
    });

    // Stage 2: Scatter shards outwards with 3D tilt
    shardRefs.current.forEach((shard, idx) => {
      if (!shard) return;
      const angle = (idx / DIMENSIONS.length) * Math.PI * 2;
      const radius = 180 * depthMultiplier;
      const targetX = Math.cos(angle) * radius;
      const targetY = Math.sin(angle) * radius;

      tl.to(
        shard,
        {
          x: targetX,
          y: targetY,
          rotation: (idx - 2) * 15,
          scale: 1.1,
          duration: 1.4,
          ease: 'elastic.out(1, 0.4)',
        },
        '-=0.9'
      );
    });

    // Stage 3: Orbit rotation
    tl.to(shardRefs.current.filter(Boolean), {
      rotation: '+=360',
      duration: 2.2,
      ease: 'power1.inOut',
      stagger: 0.1,
    });

    // Stage 4: Snap back into harmonious dimensional circle
    shardRefs.current.forEach((shard, idx) => {
      if (!shard) return;
      const angle = (idx / DIMENSIONS.length) * Math.PI * 2;
      const radius = 130;
      const targetX = Math.cos(angle) * radius;
      const targetY = Math.sin(angle) * radius;

      tl.to(
        shard,
        {
          x: targetX,
          y: targetY,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          ease: 'back.out(1.7)',
        },
        '-=1.5'
      );
    });

    tl.to(
      portalCoreRef.current,
      {
        scale: 1,
        rotation: 360,
        opacity: 0.8,
        duration: 1,
        ease: 'power2.out',
      },
      '-=1'
    );
  };

  const resetStage = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    setIsPlayingTimeline(false);
    setTimelineProgress(0);

    gsap.to(portalCoreRef.current, {
      scale: 1,
      rotation: 0,
      opacity: 0.8,
      duration: 0.6,
      ease: 'power2.out',
    });

    shardRefs.current.forEach((shard, idx) => {
      if (!shard) return;
      const angle = (idx / DIMENSIONS.length) * Math.PI * 2;
      const radius = 130;
      gsap.to(shard, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    });
  };

  // Initial circle placement
  useEffect(() => {
    shardRefs.current.forEach((shard, idx) => {
      if (!shard) return;
      const angle = (idx / DIMENSIONS.length) * Math.PI * 2;
      const radius = 130;
      gsap.set(shard, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#08090d] py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
              <Activity className="h-3.5 w-3.5" />
              <span>GSAP 3.12 KINETIC PHYSICS STUDIO</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Motion & Parallax Lab
            </h1>
            <p className="text-sm text-neutral-400 max-w-xl">
              Real-time demonstration of GSAP timeline interpolation, elastic easing, multi-card velocity physics, and dynamic parallax scaling.
            </p>
          </div>

          {/* Controller Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={runCinematicSequence}
              disabled={isPlayingTimeline}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-rose-500/25 hover:brightness-110 disabled:opacity-50 transition-all"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{isPlayingTimeline ? 'Timeline Running...' : 'Execute Sequence'}</span>
            </button>
            <button
              onClick={resetStage}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Studio Controls & Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 pb-10">
          {/* Depth Multiplier Slider */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 space-y-3 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-rose-400" /> Parallax Depth:
              </span>
              <span className="text-white font-semibold">{depthMultiplier.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={depthMultiplier}
              onChange={(e) => setDepthMultiplier(parseFloat(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <p className="text-[11px] text-neutral-400">
              Modulates orbital dispersal radius and layer translation.
            </p>
          </div>

          {/* Physics Toggle */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 space-y-3 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400 flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-cyan-400" /> Inertia Float:
              </span>
              <button
                onClick={() => setGravityEnabled(!gravityEnabled)}
                className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  gravityEnabled ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-white/10 text-neutral-400'
                }`}
              >
                {gravityEnabled ? 'Active' : 'Damped'}
              </button>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Enables reactive hover elevation and spring restitution on shard selection.
            </p>
          </div>

          {/* Timeline Sync Status */}
          <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 space-y-3 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Timeline Sync:
              </span>
              <span className="text-amber-400 font-semibold">{timelineProgress}%</span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 to-amber-400 h-2 rounded-full transition-all duration-75"
                style={{ width: `${timelineProgress}%` }}
              />
            </div>
            <p className="text-[11px] text-neutral-400">
              Real-time GSAP execution progress with keyframe checkpoints.
            </p>
          </div>
        </div>

        {/* 2D/3D Kinetic Stage */}
        <div
          ref={stageRef}
          className="relative min-h-[560px] rounded-3xl border border-white/15 bg-neutral-950 p-6 flex items-center justify-center overflow-hidden shadow-2xl"
        >
          {/* Background Grid & Shards */}
          <div className="absolute inset-0 bg-grain opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.08)_0,transparent_70%)]" />

          {/* Central Portal Core */}
          <div
            ref={portalCoreRef}
            className="relative z-10 h-32 w-32 rounded-full border-2 border-dashed border-rose-500/60 bg-rose-500/10 flex items-center justify-center backdrop-blur-xl shadow-[0_0_50px_rgba(236,72,153,0.3)] transition-all cursor-pointer"
            onClick={runCinematicSequence}
            title="Click to trigger GSAP cinematic sequence"
          >
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-rose-500 to-cyan-400 animate-pulse flex items-center justify-center text-white">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>

          {/* Orbiting Dimensional Shards (Animated by GSAP & Draggable) */}
          {DIMENSIONS.map((item, idx) => (
            <motion.div
              key={item.id}
              ref={(el) => {
                shardRefs.current[idx] = el;
              }}
              drag
              dragConstraints={stageRef}
              dragElastic={0.2}
              whileDrag={{ scale: 1.15, zIndex: 30 }}
              onHoverStart={() => {
                setActiveShard(idx);
                audioSynth.triggerChime(600 + idx * 50);
              }}
              onHoverEnd={() => setActiveShard(null)}
              className="absolute z-20 w-32 sm:w-40 rounded-xl border border-white/20 bg-neutral-900/90 p-2 shadow-2xl cursor-grab active:cursor-grabbing backdrop-blur-md"
            >
              <div className="aspect-[9/16] rounded-lg overflow-hidden bg-black relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-1.5 left-1.5 right-1.5 text-center">
                  <span className="font-mono text-[9px] text-rose-300 block">
                    {item.code}
                  </span>
                  <span className="font-semibold text-[10px] text-white block truncate">
                    {item.characters[0]}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Active Shard Indicator Bar */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-400 bg-black/60 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 z-30">
            <span>
              Status:{' '}
              <strong className="text-white">
                {activeShard !== null ? DIMENSIONS[activeShard].title : 'Drag or click shards to test physics'}
              </strong>
            </span>
            <span className="text-rose-400">GSAP Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
