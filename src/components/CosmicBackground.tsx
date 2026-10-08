import React, { useEffect, useState } from 'react';

interface CosmicBackgroundProps {
  ambientLight: number;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ ambientLight }) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Opacity derived from ambientLight (clamped 0.1 to 1.5)
  const glowOpacity = Math.max(0.15, Math.min(1.2, ambientLight * 0.7));

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#07080c] select-none"
    >
      {/* 1. Deep Space Base Layer */}
      <div className="absolute inset-0 bg-[#07080c]" />

      {/* 2. Interactive Spotlight tracking cursor with ambient intensity */}
      <div
        className="absolute h-[650px] w-[650px] rounded-full blur-[140px] transition-transform duration-700 ease-out"
        style={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(236,72,153,0.18) 0%, rgba(56,189,248,0.12) 50%, transparent 70%)',
          opacity: glowOpacity * 0.9,
        }}
      />

      {/* 3. Nebula 1: Magenta Multiverse Rift (Top Left) */}
      <div
        className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full blur-[130px] transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(244,63,94,0.25) 0%, rgba(217,70,239,0.15) 50%, transparent 75%)',
          opacity: glowOpacity,
          transform: `scale(${0.8 + ambientLight * 0.3})`,
        }}
      />

      {/* 4. Nebula 2: Crystalline Cyan & Emerald Aurora (Bottom Right) */}
      <div
        className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full blur-[150px] transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.22) 0%, rgba(16,185,129,0.12) 50%, transparent 75%)',
          opacity: glowOpacity,
          transform: `scale(${0.8 + ambientLight * 0.3})`,
        }}
      />

      {/* 5. Nebula 3: Golden Hour Solar Flare (Top Center-Right) */}
      <div
        className="absolute top-1/4 right-1/4 h-[500px] w-[500px] rounded-full blur-[120px] transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(239,68,68,0.1) 60%, transparent 80%)',
          opacity: glowOpacity * 0.75,
        }}
      />

      {/* 6. Subtle Cybernetic Perspective Grid on Horizon */}
      <div
        className="absolute bottom-0 inset-x-0 h-80 opacity-20 transition-opacity duration-300"
        style={{
          opacity: Math.min(0.35, ambientLight * 0.25),
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
          perspective: '600px',
          transform: 'rotateX(60deg) scale(1.4)',
          transformOrigin: 'bottom center',
        }}
      />

      {/* 7. Film Grain & Stardust Texture */}
      <div className="absolute inset-0 bg-grain opacity-40 mix-blend-screen" />

      {/* 8. Vignette Framing to maintain contrast for cards and prose */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,8,12,0.85)_100%)] pointer-events-none" />
    </div>
  );
};
