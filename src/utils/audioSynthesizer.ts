/**
 * Web Audio API ambient soundscape generator.
 * Creates generative, synthesized ambient musical drones and melodic pads
 * matching each dimensional theme without requiring external audio files.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private currentTheme: 'glitch' | 'warm' | 'aurora' | 'cyber' | 'twilight' = 'glitch';

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(Math.max(0, Math.min(1, val * 0.2)), this.ctx.currentTime, 0.1);
    }
  }

  public playTheme(theme: 'glitch' | 'warm' | 'aurora' | 'cyber' | 'twilight') {
    this.initContext();
    if (!this.ctx || !this.gainNode) return;

    this.stopOscillators();
    this.currentTheme = theme;
    this.isPlaying = true;

    const now = this.ctx.currentTime;

    if (theme === 'glitch') {
      // Synthwave / Cyberpunk glitch chord (A minor pentatonic with filter wobble)
      const freqs = [110, 164.81, 220, 261.63, 329.63];
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.gainNode) return;
        const osc = this.ctx.createOscillator();
        const biquad = this.ctx.createBiquadFilter();
        const oscGain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        biquad.type = 'lowpass';
        biquad.frequency.setValueAtTime(800 + idx * 200, now);

        oscGain.gain.setValueAtTime(0.04, now);

        osc.connect(biquad);
        biquad.connect(oscGain);
        oscGain.connect(this.gainNode);

        osc.start();
        this.oscillators.push(osc);
      });
    } else if (theme === 'warm') {
      // Golden hour warm reverie (F major 7th gentle sine harmonies)
      const freqs = [174.61, 220.0, 261.63, 329.63, 440.0];
      freqs.forEach((freq) => {
        if (!this.ctx || !this.gainNode) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        oscGain.gain.setValueAtTime(0.05, now);

        osc.connect(oscGain);
        oscGain.connect(this.gainNode);

        osc.start();
        this.oscillators.push(osc);
      });
    } else if (theme === 'aurora') {
      // Shimmering crystal bells & northern lights drone (E minor crystal)
      const freqs = [164.81, 196.0, 246.94, 392.0, 493.88];
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.gainNode) return;
        const osc = this.ctx.createOscillator();
        const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
        const oscGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        oscGain.gain.setValueAtTime(0.06, now);

        if (panner) {
          panner.pan.setValueAtTime((idx - 2) * 0.35, now);
          osc.connect(panner);
          panner.connect(oscGain);
        } else {
          osc.connect(oscGain);
        }

        oscGain.connect(this.gainNode);
        osc.start();
        this.oscillators.push(osc);
      });
    } else if (theme === 'cyber') {
      // Futuristic dusk skyline (Deep D minor drone with shimmering octave)
      const freqs = [73.42, 146.83, 220.0, 293.66, 369.99];
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.gainNode) return;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const oscGain = this.ctx.createGain();

        osc.type = idx === 0 ? 'triangle' : 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, now);

        oscGain.gain.setValueAtTime(0.04, now);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(this.gainNode);

        osc.start();
        this.oscillators.push(osc);
      });
    } else {
      // Twilight rooftop calm (C major 9th tranquil drone)
      const freqs = [130.81, 196.0, 246.94, 293.66, 392.0];
      freqs.forEach((freq) => {
        if (!this.ctx || !this.gainNode) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        oscGain.gain.setValueAtTime(0.05, now);

        osc.connect(oscGain);
        oscGain.connect(this.gainNode);

        osc.start();
        this.oscillators.push(osc);
      });
    }
  }

  public triggerChime(pitch = 523.25) {
    this.initContext();
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, now + 0.15);

    chimeGain.gain.setValueAtTime(0.15, now);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc.connect(chimeGain);
    chimeGain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  public stop() {
    this.stopOscillators();
    this.isPlaying = false;
  }

  private stopOscillators() {
    this.oscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignored
      }
    });
    this.oscillators = [];
  }

  public toggle(theme?: 'glitch' | 'warm' | 'aurora' | 'cyber' | 'twilight') {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.playTheme(theme || this.currentTheme);
      return true;
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public getCurrentTheme() {
    return this.currentTheme;
  }
}

export const audioSynth = new AudioSynthesizer();
