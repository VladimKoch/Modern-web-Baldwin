"use client";

import React, { useState } from "react";
import { CloseIcon, PlayIcon, VolumeIcon, VolumeMuteIcon, RoyalCrestIcon } from "./Icons";
import { GoldDiamondDivider } from "./GoldDiamondDivider";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrailerModal({ isOpen, onClose }: TrailerModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-2xl bg-black/90 animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#12100E] border border-[#D4AF37]/60 rounded-2xl p-4 sm:p-8 shadow-[0_0_80px_rgba(212,175,55,0.4)] text-[#F3EFE6]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full border border-[#D4AF37]/40 text-[#E5C158] hover:text-white hover:bg-[#D4AF37]/20 transition-all z-30"
          aria-label="Zavřít trailer"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4">
          <RoyalCrestIcon className="w-6 h-6 text-[#F3D079]" />
          <div>
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFF0B8]">
              Království osudu • Oficiální filmový trailer
            </h3>
            <p className="text-[11px] text-[#A8A29E] tracking-wider uppercase">
              Balduin IV. & Svatá země Anno Domini 1177
            </p>
          </div>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video rounded-xl overflow-hidden border border-[#D4AF37]/40 bg-black flex items-center justify-center group shadow-2xl">
          {/* 
            Custom video source slot:
            User can add public/trailer.mp4 or change to YouTube embed
          */}
          <video
            className="w-full h-full object-cover"
            autoPlay={isPlaying}
            muted={isMuted}
            loop
            controls={false}
            poster="/hero-king.jpg"
          >
            <source src="/trailer.mp4" type="video/mp4" />
            <source src="/trailer.webm" type="video/webm" />
          </video>

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Subtitle simulation / Cinematic quote in Czech */}
          <div className="absolute bottom-12 left-6 right-6 text-center pointer-events-none">
            <p className="font-serif text-sm sm:text-lg italic text-[#F3EFE6] drop-shadow-[0_2px_8px_rgba(0,0,0,1)] bg-black/40 inline-block px-4 py-1.5 rounded-lg border border-[#D4AF37]/20">
              „Když stojím před Bohem, nemohu říci: udělal jsem to, protože mi to přikázali jiní. Má duše je má vlastní.“
            </p>
          </div>

          {/* Custom Overlay Controls */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#E5C158] z-20">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-full bg-[#0E0D0C]/80 border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-[#0E0D0C] transition-all"
                title={isPlaying ? "Pozastavit" : "Přehrát"}
              >
                <PlayIcon className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-full bg-[#0E0D0C]/80 border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-[#0E0D0C] transition-all"
                title={isMuted ? "Zapnout zvuk" : "Ztlumit"}
              >
                {isMuted ? <VolumeMuteIcon className="w-4 h-4" /> : <VolumeIcon className="w-4 h-4" />}
              </button>

              <span className="text-[11px] font-mono text-[#A8A29E]">01:48 / 02:30</span>
            </div>

            <div className="text-[11px] text-[#A8A29E] hidden sm:block">
              Rozlišení: 4K Ultra Cinematic
            </div>
          </div>
        </div>

        <GoldDiamondDivider className="my-4" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8A29E] gap-3">
          <p>
            Vložte vlastní video soubor do složky <code className="text-[#E5C158]">public/trailer.mp4</code> pro zobrazení vašeho vlastního traileru.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full gold-gradient-btn text-[#161209] font-bold text-xs uppercase tracking-wider whitespace-nowrap cursor-pointer hover:scale-105 transition-transform"
          >
            Zpět na web
          </button>
        </div>
      </div>
    </div>
  );
}
