import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, SunMedium, Sun, Moon } from 'lucide-react';
import { audioSynth } from '../utils/audioSynthesizer';

export type NavTab = 'gateway' | 'gallery' | 'chronicles' | 'motionlab' | 'vault';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onQuickExplore: () => void;
  ambientLight: number;
  onAmbientLightChange: (val: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  isAudioPlaying,
  onToggleAudio,
  onQuickExplore,
  ambientLight,
  onAmbientLightChange,
}) => {
  const [showLightPanel, setShowLightPanel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (tab: NavTab) => {
    audioSynth.triggerChime(600);
    onTabChange(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close light panel on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowLightPanel(false);
      }
    };
    if (showLightPanel) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLightPanel]);

  const lightPercentage = Math.round(ambientLight * 100);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#08090d]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Title (Single text element wordmark) */}
        <button
          onClick={() => handleNavClick('gateway')}
          className="group flex items-center gap-2 text-left focus:outline-none"
        >
          <span className="font-display text-lg font-bold tracking-wider text-white transition-colors group-hover:text-rose-400">
            AETHERIA
          </span>
        </button>

        {/* Zone 2: 4-6 Clean text navigation links (single-line, subtle hover underlines) */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-medium">
          <button
            onClick={() => handleNavClick('gateway')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'gateway'
                ? 'text-white border-b-2 border-rose-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Gateway
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'gallery'
                ? 'text-white border-b-2 border-rose-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => handleNavClick('chronicles')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'chronicles'
                ? 'text-white border-b-2 border-rose-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Chronicles
          </button>
          <button
            onClick={() => handleNavClick('motionlab')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'motionlab'
                ? 'text-white border-b-2 border-rose-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Motion Lab
          </button>
          <button
            onClick={() => handleNavClick('vault')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'vault'
                ? 'text-white border-b-2 border-rose-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Vault
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions & ambient controllers */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Ambient Light Intensity Slider & Popover */}
          <div className="relative" ref={panelRef}>
            <button
              onClick={() => setShowLightPanel(!showLightPanel)}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium text-neutral-300 hover:border-white/20 hover:text-white transition-all"
              style={{
                boxShadow: showLightPanel
                  ? `0 0 15px rgba(251, 146, 60, ${0.3 * ambientLight})`
                  : 'none',
              }}
              title="Adjust global ambient light intensity"
              aria-label="Toggle ambient light intensity controls"
            >
              <SunMedium className="h-3.5 w-3.5 text-amber-400 animate-[spin_20s_linear_infinite]" />
              <span className="font-mono text-[11px] tabular-nums hidden sm:inline">
                Glow {lightPercentage}%
              </span>
            </button>

            {/* Ambient Light Dropdown Panel */}
            {showLightPanel && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-white/15 bg-neutral-900/95 p-4 shadow-2xl backdrop-blur-xl z-50 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-300 flex items-center gap-1.5">
                    <Sun className="h-3.5 w-3.5 text-amber-400" /> Ambient Light
                  </span>
                  <span className="text-amber-400 font-semibold">{lightPercentage}%</span>
                </div>

                {/* Slider */}
                <div className="space-y-1">
                  <input
                    type="range"
                    min="0.15"
                    max="1.5"
                    step="0.05"
                    value={ambientLight}
                    onChange={(e) => onAmbientLightChange(parseFloat(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>Void (15%)</span>
                    <span>Harmonic (85%)</span>
                    <span>Supernova (150%)</span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-white/10 text-[11px]">
                  <button
                    onClick={() => onAmbientLightChange(0.3)}
                    className={`flex items-center justify-center gap-1 py-1 rounded-md transition-colors ${
                      lightPercentage <= 35
                        ? 'bg-white/20 text-white font-medium'
                        : 'bg-white/[0.04] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Moon className="h-3 w-3" /> Void
                  </button>
                  <button
                    onClick={() => onAmbientLightChange(0.85)}
                    className={`flex items-center justify-center gap-1 py-1 rounded-md transition-colors ${
                      lightPercentage > 35 && lightPercentage <= 100
                        ? 'bg-amber-500/20 text-amber-300 font-medium'
                        : 'bg-white/[0.04] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <SunMedium className="h-3 w-3" /> Aura
                  </button>
                  <button
                    onClick={() => onAmbientLightChange(1.4)}
                    className={`flex items-center justify-center gap-1 py-1 rounded-md transition-colors ${
                      lightPercentage > 100
                        ? 'bg-rose-500/20 text-rose-300 font-medium'
                        : 'bg-white/[0.04] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="h-3 w-3" /> Flare
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Ambient Soundscape Controller */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
              isAudioPlaying
                ? 'border-rose-500/50 bg-rose-500/10 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                : 'border-white/10 bg-white/[0.03] text-neutral-400 hover:border-white/20 hover:text-neutral-200'
            }`}
            title={isAudioPlaying ? 'Mute ambient soundscape' : 'Play synthesized dimensional ambient audio'}
            aria-label="Toggle ambient sound"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="h-3.5 w-3.5 animate-pulse text-rose-400" />
                <span className="hidden sm:inline">Sound</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 text-neutral-400" />
                <span className="hidden sm:inline">Audio</span>
              </>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onQuickExplore}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 px-3.5 py-2 text-xs font-semibold text-white shadow-lg shadow-rose-500/25 transition-all hover:brightness-110 hover:shadow-rose-500/40 active:scale-95 whitespace-nowrap shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Launch Portal</span>
            <span className="sm:hidden">Portal</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden overflow-x-auto border-t border-white/[0.05] bg-[#0c0d13] px-4 py-2 gap-4 text-xs tracking-wider uppercase">
        {(['gateway', 'gallery', 'chronicles', 'motionlab', 'vault'] as NavTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => handleNavClick(tab)}
            className={`whitespace-nowrap py-1 transition-colors ${
              activeTab === tab ? 'font-semibold text-rose-400 border-b border-rose-400' : 'text-neutral-400'
            }`}
          >
            {tab === 'motionlab' ? 'Motion' : tab}
          </button>
        ))}
      </div>
    </header>
  );
};
