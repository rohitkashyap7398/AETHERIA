import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, Volume2, ArrowLeft, ArrowRight, MessageSquare, Compass } from 'lucide-react';
import { DIMENSIONS } from '../data/dimensions';
import { audioSynth } from '../utils/audioSynthesizer';

export const ChroniclesView: React.FC = () => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const currentDim = DIMENSIONS[selectedChapterIndex];

  const handleNextChapter = () => {
    if (selectedChapterIndex < DIMENSIONS.length - 1) {
      const next = selectedChapterIndex + 1;
      setSelectedChapterIndex(next);
      audioSynth.triggerChime(520 + next * 40);
    }
  };

  const handlePrevChapter = () => {
    if (selectedChapterIndex > 0) {
      const prev = selectedChapterIndex - 1;
      setSelectedChapterIndex(prev);
      audioSynth.triggerChime(520 + prev * 40);
    }
  };

  const handleSelectChapter = (idx: number) => {
    setSelectedChapterIndex(idx);
    audioSynth.triggerChime(500 + idx * 50);
  };

  return (
    <div className="min-h-screen bg-[#08090d] py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="space-y-3 pb-8 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
            <BookOpen className="h-3.5 w-3.5" />
            <span>INTERACTIVE MULTIVERSE CHRONICLES</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            The Dimensional Lore
          </h1>
          <p className="text-sm text-neutral-400 max-w-xl">
            Narrative excerpts, character dialogue, and canon records across the five synchronized dimensions.
          </p>
        </div>

        {/* Chapter Progression Bar */}
        <div className="pt-8 pb-10">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {DIMENSIONS.map((dim, idx) => {
              const isActive = idx === selectedChapterIndex;
              return (
                <button
                  key={dim.id}
                  onClick={() => handleSelectChapter(idx)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    isActive
                      ? 'border-rose-500/60 bg-rose-500/10 shadow-lg shadow-rose-500/10'
                      : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="block font-mono text-[10px] text-neutral-400">
                    Chapter 0{idx + 1}
                  </span>
                  <span
                    className={`block text-xs font-semibold truncate ${
                      isActive ? 'text-white' : 'text-neutral-300'
                    }`}
                  >
                    {dim.title.split('&')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Chapter Reader Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDim.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Visual & Atmosphere */}
              <div className="lg:col-span-5 relative bg-black/60 p-6 flex flex-col justify-between overflow-hidden">
                <div className="relative aspect-[9/16] max-h-[500px] w-full mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <img
                    src={currentDim.image}
                    alt={currentDim.title}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="font-mono text-xs text-rose-400 block uppercase">
                      {currentDim.universe}
                    </span>
                    <span className="font-display text-lg font-bold text-white block">
                      {currentDim.characters.join(' & ')}
                    </span>
                  </div>
                </div>

                {/* Soundscape Trigger */}
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">
                    Theme: {currentDim.soundTheme}
                  </span>
                  <button
                    onClick={() => audioSynth.toggle(currentDim.soundTheme)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors border border-white/10"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-rose-400" />
                    <span>Play Ambiance</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Narrative Prose & Dialogue */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  {/* Chapter Header */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
                      <span>{currentDim.code}</span>
                      <span aria-hidden="true">·</span>
                      <span>{currentDim.metrics.depthIndex}</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                      {currentDim.storyChapter.title}
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Era: {currentDim.era}
                    </p>
                  </div>

                  {/* Prose Excerpt */}
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                    <p className="text-sm text-neutral-200 leading-relaxed font-light italic">
                      "{currentDim.storyChapter.excerpt}"
                    </p>
                  </div>

                  {/* Dialogue Transcripts */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                      Recovered Dialogue Stream:
                    </span>
                    <div className="space-y-2.5">
                      {currentDim.storyChapter.dialogue.map((line, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-start gap-3 rounded-lg bg-black/40 border border-white/[0.05] p-3 text-xs"
                        >
                          <span className="font-mono font-semibold text-rose-400 shrink-0 w-20">
                            {line.speaker}:
                          </span>
                          <span className="text-neutral-300 leading-relaxed">
                            {line.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* World Lore Card */}
                  <div className="rounded-xl border border-white/[0.08] bg-black/30 p-4 space-y-2">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                      <Compass className="h-3 w-3 text-amber-400" />
                      Dimensional Synopsis
                    </span>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {currentDim.synopsis}
                    </p>
                  </div>
                </div>

                {/* Chapter Navigation Footer */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={handlePrevChapter}
                    disabled={selectedChapterIndex === 0}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-xs font-medium text-neutral-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Previous Chapter</span>
                  </button>

                  <span className="font-mono text-xs text-neutral-400">
                    0{selectedChapterIndex + 1} / 0{DIMENSIONS.length}
                  </span>

                  <button
                    onClick={handleNextChapter}
                    disabled={selectedChapterIndex === DIMENSIONS.length - 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <span>Next Chapter</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
