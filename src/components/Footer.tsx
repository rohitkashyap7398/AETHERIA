import React from 'react';
import { ArrowUp, Sparkles, Layers, Compass } from 'lucide-react';
import { NavTab } from './Navbar';

interface FooterProps {
  onNavClick: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#07080c] py-14 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold tracking-wider text-white">
                AETHERIA
              </span>
            </div>
            <p className="text-xs leading-relaxed text-neutral-400">
              Interactive multiverse visual odyssey powered by GSAP motion dynamics, depth parallax layers, and algorithmic synthesized ambient soundscapes.
            </p>
          </div>

          {/* Dimensional Registry */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-3 flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-rose-400" />
              Dimensions
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-neutral-400 hover:text-white transition-colors cursor-pointer" onClick={() => onNavClick('gateway')}>
                DIM-01 · Ghost-Spider Neon
              </li>
              <li className="text-neutral-400 hover:text-white transition-colors cursor-pointer" onClick={() => onNavClick('gateway')}>
                DIM-02 · The Upside-Down Reverie
              </li>
              <li className="text-neutral-400 hover:text-white transition-colors cursor-pointer" onClick={() => onNavClick('gateway')}>
                DIM-03 · Aurora of Sovereigns
              </li>
              <li className="text-neutral-400 hover:text-white transition-colors cursor-pointer" onClick={() => onNavClick('gateway')}>
                DIM-04 · Neo-Horizon Cyberpunk
              </li>
              <li className="text-neutral-400 hover:text-white transition-colors cursor-pointer" onClick={() => onNavClick('gateway')}>
                DIM-05 · Twilight Bench Duo
              </li>
            </ul>
          </div>

          {/* Experiential Portals */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-3 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavClick('gateway')} className="hover:text-white transition-colors">
                  Multiverse Gateway Feed
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('gallery')} className="hover:text-white transition-colors">
                  3D Parallax Art Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('chronicles')} className="hover:text-white transition-colors">
                  Interactive Chronicles
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('motionlab')} className="hover:text-white transition-colors">
                  GSAP Motion & Physics Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('vault')} className="hover:text-white transition-colors">
                  Wallpaper Vault & Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Engine Specs */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Motion Engine
            </h4>
            <div className="space-y-1.5 text-xs text-neutral-400">
              <p>GSAP 3.12 Core Physics</p>
              <p>Framer Motion 12 Compositor Engine</p>
              <p>Web Audio API Polyphonic Synth</p>
              <p>Hardware Accelerated 3D Matrix</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© 2026 Aetheria Visual Project. Curated with GSAP & Motion.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-neutral-300 hover:border-white/20 hover:text-white transition-colors"
          >
            <span>Back to Summit</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
