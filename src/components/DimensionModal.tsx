import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, Sparkles, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { DimensionItem } from '../data/dimensions';
import { audioSynth } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface DimensionModalProps {
  item: DimensionItem | null;
  onClose: () => void;
  onOpenChronicles: () => void;
}

export const DimensionModal: React.FC<DimensionModalProps> = ({
  item,
  onClose,
  onOpenChronicles,
}) => {
  if (!item) return null;

  const handleDownload = () => {
    audioSynth.triggerChime(700);
    const link = document.createElement('a');
    link.href = item.image;
    link.download = `${item.id}-master.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: [item.accentHex, '#ffffff'],
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-2xl"
      >
        <div className="relative w-full max-w-4xl rounded-3xl border border-white/20 bg-neutral-900/95 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/90 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Left Column: Artwork */}
          <div className="md:col-span-5 bg-black/60 p-6 flex items-center justify-center">
            <div className="relative aspect-[9/16] max-h-[70vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-mono text-[11px] text-rose-400 block uppercase">
                  {item.code}
                </span>
                <span className="font-display text-base font-bold text-white block">
                  {item.characters.join(' · ')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Lore & Interactive Actions */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{item.metrics.depthIndex}</span>
                <span aria-hidden="true">·</span>
                <span>{item.metrics.frequency}</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                {item.title}
              </h2>
              <p className="text-xs text-neutral-400 font-medium">
                {item.universe} // {item.era}
              </p>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {item.synopsis}
              </p>

              {/* Canon Quote */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs space-y-1">
                <p className="italic text-neutral-200">
                  "{item.quote.text}"
                </p>
                <span className="font-mono text-neutral-400 text-[11px] block text-right">
                  — {item.quote.author}
                </span>
              </div>

              {/* Excerpt */}
              <div className="space-y-2 text-xs">
                <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider block">
                  {item.storyChapter.title}
                </span>
                <p className="text-neutral-300 text-xs italic bg-black/40 p-3 rounded-lg border border-white/[0.05]">
                  {item.storyChapter.excerpt}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => audioSynth.toggle(item.soundTheme)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] py-2.5 text-xs font-medium text-neutral-200 hover:text-white transition-colors"
                >
                  <Volume2 className="h-3.5 w-3.5 text-rose-400" />
                  <span>Ambient Audio</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 py-2.5 text-xs font-medium text-white transition-colors border border-white/10"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Save Artwork</span>
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenChronicles();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 py-3 text-xs font-semibold text-white shadow-lg shadow-rose-500/25 hover:brightness-110 transition-all"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Read Full Story Chapter</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
