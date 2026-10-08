import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Maximize2, X, Sliders, Sparkles, Check, ZoomIn } from 'lucide-react';
import { DIMENSIONS, DimensionItem } from '../data/dimensions';
import { audioSynth } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

type ShaderFilter = 'standard' | 'glitch' | 'golden' | 'aurora' | 'noir';
type AspectRatioMode = '9:16' | '3:4' | '16:9';

export const GalleryView: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<DimensionItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<ShaderFilter>('standard');
  const [aspectMode, setAspectMode] = useState<AspectRatioMode>('9:16');
  const [mouseRotations, setMouseRotations] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Card Tilt on Mouse Move
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setMouseRotations((prev) => ({
      ...prev,
      [id]: { x: rotX, y: rotY },
    }));
  };

  const handleCardMouseLeave = (id: string) => {
    setMouseRotations((prev) => ({
      ...prev,
      [id]: { x: 0, y: 0 },
    }));
  };

  const getFilterStyle = (filter: ShaderFilter) => {
    switch (filter) {
      case 'glitch':
        return 'contrast-125 saturate-150 hue-rotate-15 drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]';
      case 'golden':
        return 'sepia-[0.3] contrast-110 brightness-105 saturate-125';
      case 'aurora':
        return 'hue-rotate-[-30deg] saturate-125 brightness-110';
      case 'noir':
        return 'grayscale contrast-150 brightness-95';
      default:
        return '';
    }
  };

  const handleDownload = (item: DimensionItem) => {
    audioSynth.triggerChime(660);
    const link = document.createElement('a');
    link.href = item.image;
    link.download = `${item.id}-aetheria-4k.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(item.id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: [item.accentHex, '#ffffff'],
    });

    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2500);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#08090d] py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>3D PARALLAX CANVAS INSPECTOR</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Artisan Artwork Gallery
            </h1>
            <p className="text-sm text-neutral-400 max-w-xl">
              Interact directly with each dimension in full responsive 3D perspective. Apply real-time chromatic shaders and download the pristine renders.
            </p>
          </div>

          {/* Controls Bar: Shaders & Aspect Ratio */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Shader filters */}
            <div className="flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-xl p-1 text-xs">
              <span className="text-neutral-400 px-2 py-1 flex items-center gap-1">
                <Sliders className="h-3 w-3" /> Shader:
              </span>
              {(
                [
                  { id: 'standard', label: 'Original' },
                  { id: 'glitch', label: 'Glitch' },
                  { id: 'golden', label: 'Golden' },
                  { id: 'aurora', label: 'Aurora' },
                  { id: 'noir', label: 'Noir' },
                ] as { id: ShaderFilter; label: string }[]
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setActiveFilter(f.id);
                    audioSynth.triggerChime(500);
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    activeFilter === f.id
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Aspect mode */}
            <div className="flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-xl p-1 text-xs">
              <span className="text-neutral-400 px-2 py-1">Ratio:</span>
              {(['9:16', '3:4', '16:9'] as AspectRatioMode[]).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectMode(ratio)}
                  className={`px-2.5 py-1 rounded-lg transition-colors font-mono ${
                    aspectMode === ratio
                      ? 'bg-white/15 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {DIMENSIONS.map((item) => {
            const rot = mouseRotations[item.id] || { x: 0, y: 0 };
            const isRatio916 = aspectMode === '9:16';
            const isRatio34 = aspectMode === '3:4';

            return (
              <motion.div
                key={item.id}
                onMouseMove={(e) => handleCardMouseMove(e, item.id)}
                onMouseLeave={() => handleCardMouseLeave(item.id)}
                className="group relative rounded-2xl border border-white/10 bg-neutral-900/60 p-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:shadow-2xl"
                style={{
                  transform: `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
                  transition: 'transform 0.12s ease-out',
                }}
              >
                {/* Image Box */}
                <div
                  className={`relative w-full overflow-hidden rounded-xl bg-black ${
                    isRatio916 ? 'aspect-[9/16]' : isRatio34 ? 'aspect-[3/4]' : 'aspect-[16/9]'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${getFilterStyle(
                      activeFilter
                    )}`}
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Holographic light sheen reflecting mouse */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at ${50 + rot.y * 3}% ${
                        50 + rot.x * 3
                      }%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                    }}
                  />

                  {/* Action Overlays */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/90 transition-colors"
                      title="Inspect in Fullscreen Lightbox"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Dimension Code Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-xs px-2 py-1 rounded bg-black/60 border border-white/10 text-neutral-300">
                      {item.code}
                    </span>
                  </div>

                  {/* Bottom Text */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400">
                      {item.universe}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-300 line-clamp-1">
                      {item.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 px-1 flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-400 text-[11px]">
                    Style: {item.metrics.artStyle.split('&')[0]}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="px-2.5 py-1 text-neutral-300 hover:text-white transition-colors"
                    >
                      Inspect
                    </button>
                    <button
                      onClick={() => handleDownload(item)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/10"
                    >
                      {downloadSuccess === item.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Saved!</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-3.5 w-3.5" />
                          <span>Get 4K</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ================= LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          >
            <div className="relative w-full max-w-5xl rounded-2xl border border-white/15 bg-neutral-900/95 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/90 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Artwork Side */}
              <div className="md:col-span-7 flex items-center justify-center p-6 bg-black/40 overflow-hidden">
                <div className="relative max-h-[75vh] rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className={`max-h-[75vh] w-auto object-contain ${getFilterStyle(activeFilter)}`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono text-neutral-300 flex items-center gap-1">
                    <ZoomIn className="h-3 w-3" /> Full High-Fidelity Master
                  </div>
                </div>
              </div>

              {/* Metadata & Narrative Side */}
              <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
                    <span>{selectedItem.code}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedItem.era}</span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-white">
                    {selectedItem.title}
                  </h2>
                  <p className="text-xs text-neutral-400 font-medium">
                    {selectedItem.universe}
                  </p>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                    {selectedItem.synopsis}
                  </p>

                  {/* Quote Callout */}
                  <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs">
                    <p className="italic text-neutral-200 mb-1">
                      "{selectedItem.quote.text}"
                    </p>
                    <span className="font-mono text-neutral-400 text-[11px]">
                      — {selectedItem.quote.author}
                    </span>
                  </div>

                  {/* Specs */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-white/[0.06]">
                      <span className="text-neutral-400 font-mono">Resonance:</span>
                      <span className="text-white font-mono">{selectedItem.metrics.resonance}%</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/[0.06]">
                      <span className="text-neutral-400 font-mono">Frequency:</span>
                      <span className="text-white font-mono">{selectedItem.metrics.frequency}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/[0.06]">
                      <span className="text-neutral-400 font-mono">Art Direction:</span>
                      <span className="text-white">{selectedItem.metrics.artStyle}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleDownload(selectedItem)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 py-3 text-xs font-semibold text-white shadow-lg shadow-rose-500/25 hover:brightness-110 transition-all"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Master Artwork (4K)</span>
                  </button>

                  <button
                    onClick={() => audioSynth.toggle(selectedItem.soundTheme)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] py-2.5 text-xs font-medium text-neutral-200 hover:text-white transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    <span>Play Ambient Soundscape</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
