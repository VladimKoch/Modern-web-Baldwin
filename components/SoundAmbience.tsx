"use client";

import React, { useEffect, useRef, useState } from "react";
import { VolumeIcon, VolumeMuteIcon } from "./Icons";

export function SoundAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAmbience = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // 1. Crackling fire noise generator
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Pinkish noise with random crackle pops
        const white = Math.random() * 2 - 1;
        const pop = Math.random() > 0.998 ? (Math.random() * 3 - 1.5) : 0;
        output[i] = (white * 0.15 + pop * 0.85);
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Bandpass filter to make it sound like glowing charcoal and torches
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(750, ctx.currentTime);
      bandpass.Q.setValueAtTime(1.2, ctx.currentTime);

      const fireGain = ctx.createGain();
      fireGain.gain.setValueAtTime(0.06, ctx.currentTime);

      whiteNoise.connect(bandpass);
      bandpass.connect(fireGain);
      fireGain.connect(masterGain);
      whiteNoise.start();

      // 2. Subtle medieval cathedral sub-drone (low choir chord feeling)
      const droneOsc = ctx.createOscillator();
      droneOsc.type = "sine";
      droneOsc.frequency.setValueAtTime(110, ctx.currentTime); // A2

      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.03, ctx.currentTime);

      droneOsc.connect(droneGain);
      droneGain.connect(masterGain);
      droneOsc.start();

      // 3. Occasional gentle antique bell / chime chime (every 12 seconds)
      const playChime = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === "closed") return;
        const c = audioCtxRef.current;
        const osc = c.createOscillator();
        const chimeGain = c.createGain();

        // Medieval Dorian tone (D4, F4, A4, D5)
        const notes = [293.66, 349.23, 440.0, 587.33];
        const freq = notes[Math.floor(Math.random() * notes.length)];

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, c.currentTime);

        chimeGain.gain.setValueAtTime(0.04, c.currentTime);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 3.5);

        osc.connect(chimeGain);
        chimeGain.connect(masterGain);

        osc.start();
        osc.stop(c.currentTime + 3.6);
      };

      intervalRef.current = setInterval(playChime, 9000);

      setIsPlaying(true);
    } catch {
      // AudioContext could not be created
    }
  };

  const stopAmbience = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbience();
    } else {
      startAmbience();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? "Ztlumit atmosféru trůnního sálu" : "Zapnout atmosféru trůnního sálu (pochodně & zvony)"}
      className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#161412]/80 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37] transition-all text-xs tracking-wider uppercase text-[#E5C158]"
    >
      {isPlaying ? (
        <>
          <VolumeIcon className="w-4 h-4 text-[#F3D079] animate-pulse" />
          <span className="hidden sm:inline text-[11px] text-[#F3EFE6]/80 font-medium">Zvuk sálu</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping" />
        </>
      ) : (
        <>
          <VolumeMuteIcon className="w-4 h-4 text-[#A8A29E]" />
          <span className="hidden sm:inline text-[11px] text-[#A8A29E]">Zvuk sálu</span>
        </>
      )}
    </button>
  );
}
