import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { ParallaxCursor } from './components/ParallaxCursor';
import { CosmicBackground } from './components/CosmicBackground';
import { DimensionModal } from './components/DimensionModal';
import { GatewayView } from './views/GatewayView';
import { GalleryView } from './views/GalleryView';
import { ChroniclesView } from './views/ChroniclesView';
import { MotionLabView } from './views/MotionLabView';
import { VaultView } from './views/VaultView';
import { DimensionItem, DIMENSIONS } from './data/dimensions';
import { audioSynth } from './utils/audioSynthesizer';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('gateway');
  const [selectedDimension, setSelectedDimension] = useState<DimensionItem | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [ambientLight, setAmbientLight] = useState<number>(0.85);

  // Sync ambient light CSS variable globally across all views
  const handleAmbientLightChange = (val: number) => {
    setAmbientLight(val);
    document.documentElement.style.setProperty('--ambient-light', val.toString());
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--ambient-light', ambientLight.toString());
  }, [ambientLight]);

  // Sync audio state
  const handleToggleAudio = () => {
    const isNowPlaying = audioSynth.toggle();
    setIsAudioPlaying(isNowPlaying);
  };

  const handleQuickExplore = () => {
    audioSynth.triggerChime(780);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#ec4899', '#38bdf8', '#fbbf24'],
    });
    // Open a random or featured dimension
    const randomIndex = Math.floor(Math.random() * DIMENSIONS.length);
    setSelectedDimension(DIMENSIONS[randomIndex]);
  };

  useEffect(() => {
    // Window title update
    document.title = `Aetheria | ${activeTab.toUpperCase()} · Multiverse Motion`;
  }, [activeTab]);

  return (
    <div className="relative min-h-screen text-neutral-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-white">
      {/* Living Cosmic Parallax Background */}
      <CosmicBackground ambientLight={ambientLight} />

      {/* Interactive Parallax Cursor */}
      <ParallaxCursor />

      {/* Strict 3-Zone Navigation Bar with Ambient Light Slider */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        onQuickExplore={handleQuickExplore}
        ambientLight={ambientLight}
        onAmbientLightChange={handleAmbientLightChange}
      />

      {/* Main Multi-Page Views */}
      <main className="flex-1">
        {activeTab === 'gateway' && (
          <GatewayView
            onSelectDimension={setSelectedDimension}
            onExploreGallery={() => setActiveTab('gallery')}
            onOpenChronicles={() => setActiveTab('chronicles')}
          />
        )}

        {activeTab === 'gallery' && <GalleryView />}

        {activeTab === 'chronicles' && <ChroniclesView />}

        {activeTab === 'motionlab' && <MotionLabView />}

        {activeTab === 'vault' && <VaultView />}
      </main>

      {/* Dimension Inspection Modal */}
      <DimensionModal
        item={selectedDimension}
        onClose={() => setSelectedDimension(null)}
        onOpenChronicles={() => {
          setSelectedDimension(null);
          setActiveTab('chronicles');
        }}
      />

      {/* Quiet Editorial Footer */}
      <Footer onNavClick={setActiveTab} />
    </div>
  );
}
