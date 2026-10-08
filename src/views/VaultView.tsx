import React, { useState, useEffect } from 'react';
import { Download, Heart, Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import { DIMENSIONS, DimensionItem } from '../data/dimensions';
import { audioSynth } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

export const VaultView: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<DimensionItem>(DIMENSIONS[0]);
  const [overlayQuote, setOverlayQuote] = useState(true);
  const [quoteStyle, setQuoteStyle] = useState<'italic' | 'bold' | 'minimal'>('italic');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aetheria_favs');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch {
      // Ignored
    }
  }, []);

  const toggleFavorite = (id: string) => {
    audioSynth.triggerChime(700);
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('aetheria_favs', JSON.stringify(next));
      } catch {
        // Ignored
      }
      return next;
    });
  };

  const handleDownload = () => {
    audioSynth.triggerChime(800);
    const link = document.createElement('a');
    link.href = selectedItem.image;
    link.download = `${selectedItem.id}-wallpaper.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: [selectedItem.accentHex, '#ffffff'],
    });

    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#08090d] py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="space-y-3 pb-8 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
            <ImageIcon className="h-3.5 w-3.5" />
            <span>CURATED WALLPAPER VAULT & STUDIO</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Wallpaper & Poster Studio
          </h1>
          <p className="text-sm text-neutral-400 max-w-xl">
            Customize typography overlays, curate your multiverse collection, and export 4K mobile and desktop wallpapers.
          </p>
        </div>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">
          {/* Left: Interactive Preview Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="relative aspect-[9/16] max-h-[620px] w-full max-w-sm rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Dynamic Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Top Watermark */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white/80 border border-white/10">
                  {selectedItem.universe}
                </span>
                <button
                  onClick={() => toggleFavorite(selectedItem.id)}
                  className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                    favorites.includes(selectedItem.id)
                      ? 'bg-rose-500 text-white'
                      : 'bg-black/60 text-white/70 hover:text-white'
                  }`}
                >
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>

              {/* Optional Live Quote Overlay */}
              {overlayQuote && (
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 space-y-2">
                  <p
                    className={`text-xs text-white leading-relaxed ${
                      quoteStyle === 'italic'
                        ? 'italic'
                        : quoteStyle === 'bold'
                        ? 'font-bold'
                        : 'font-mono text-[11px]'
                    }`}
                  >
                    "{selectedItem.quote.text}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-rose-300">
                    <span>— {selectedItem.quote.author}</span>
                    <span>{selectedItem.code}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Customizer & Selector Controls */}
          <div className="lg:col-span-5 space-y-6">
            {/* Dimension Selection List */}
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 space-y-4 backdrop-blur-md">
              <span className="text-xs font-mono uppercase text-neutral-400 block tracking-wider">
                Select Artwork Subject:
              </span>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {DIMENSIONS.map((item) => {
                  const isSelected = item.id === selectedItem.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedItem(item);
                        audioSynth.triggerChime(550);
                      }}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-rose-500/60 bg-rose-500/15'
                          : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15'
                      }`}
                    >
                      <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0 bg-black">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold text-white truncate">
                          {item.title}
                        </span>
                        <span className="block text-[11px] font-mono text-neutral-400">
                          {item.universe}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Typography Overlay Toggle */}
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 space-y-4 backdrop-blur-md">
              <span className="text-xs font-mono uppercase text-neutral-400 block tracking-wider">
                Typography Overlay:
              </span>

              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-300">Embed Canon Quote:</span>
                <button
                  onClick={() => setOverlayQuote(!overlayQuote)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    overlayQuote
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/10 text-neutral-400'
                  }`}
                >
                  {overlayQuote ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              {overlayQuote && (
                <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
                  {(['italic', 'bold', 'minimal'] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => setQuoteStyle(style)}
                      className={`flex-1 py-1.5 rounded-lg text-xs capitalize transition-colors ${
                        quoteStyle === style
                          ? 'bg-white/20 text-white font-medium border border-white/20'
                          : 'bg-white/[0.03] text-neutral-400 hover:text-white'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Export Button */}
            <div className="space-y-3">
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 py-3.5 text-xs font-semibold text-white shadow-xl shadow-rose-500/25 hover:brightness-110 active:scale-95 transition-all"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-300" />
                    <span>Master Wallpaper Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Download Wallpaper (Original 4K)</span>
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-neutral-400">
                Pristine 9:16 aspect ratio suitable for high-density OLED mobile displays.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
