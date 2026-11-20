"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  HandPointerIcon,
  PlayIcon,
  ChevronRightIcon,
  RoyalCrestIcon,
  SwordIcon,
  ThroneIcon,
} from "./Icons";

export type HeroKingState =
  | "IDLE_SEATED"
  | "RISING"
  | "STANDING_READY"
  | "SITTING_DOWN"
  | "READING_DECREE"
  | "DECREE_OPEN"
  | "STOPPING_READING";

interface HeroSectionProps {
  onOpenDecree: () => void;
  onOpenTrailer: () => void;
  onExploreStory: () => void;
  onOpenPlayModal: () => void;
  heroState: HeroKingState;
  onTriggerRising: () => void;
  onFinishRising: () => void;
  onTriggerSitting: () => void;
  onFinishSitting: () => void;
  onTriggerReading: () => void;
  onFinishReading: () => void;
  onFinishStopReading: () => void;
  risingRequested?: boolean;
}

export function HeroSection({
  onOpenDecree,
  onOpenTrailer,
  onExploreStory,
  onOpenPlayModal,
  heroState,
  onTriggerRising,
  onFinishRising,
  onTriggerSitting,
  onFinishSitting,
  onTriggerReading,
  onFinishReading,
  onFinishStopReading,
  risingRequested = false,
}: HeroSectionProps) {
  const [isHoveredHotspot, setIsHoveredHotspot] = useState(false);
  const [activeLayer, setActiveLayer] = useState<
    "hand" | "rising" | "sitting" | "reading" | "stop_reading"
  >("hand");
  const [isHandRewinding, setIsHandRewinding] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const handVideoRef = useRef<HTMLVideoElement | null>(null);
  const risingVideoRef = useRef<HTMLVideoElement | null>(null);
  const sittingVideoRef = useRef<HTMLVideoElement | null>(null);
  const readingVideoRef = useRef<HTMLVideoElement | null>(null);
  const stopReadingVideoRef = useRef<HTMLVideoElement | null>(null);
  const isLoweringHandRef = useRef(false);

  // Initialize videos on load
  const handleLoadedHandMetadata = () => {
    if (handVideoRef.current) {
      handVideoRef.current.currentTime = 0;
      handVideoRef.current.pause();
    }
  };

  const handleLoadedRisingMetadata = () => {
    if (risingVideoRef.current) {
      risingVideoRef.current.currentTime = 0;
      risingVideoRef.current.pause();
    }
  };

  const handleLoadedSittingMetadata = () => {
    if (sittingVideoRef.current) {
      sittingVideoRef.current.currentTime = 0;
      sittingVideoRef.current.pause();
    }
  };

  const handleLoadedReadingMetadata = () => {
    if (readingVideoRef.current) {
      readingVideoRef.current.currentTime = 0;
      readingVideoRef.current.pause();
    }
  };

  const handleLoadedStopReadingMetadata = () => {
    if (stopReadingVideoRef.current) {
      stopReadingVideoRef.current.currentTime = 0;
      stopReadingVideoRef.current.pause();
    }
  };

  // Smoothly rewind hand video to starting position without any page jump or scroll
  const requestStartRising = () => {
    if (isLoweringHandRef.current || heroState !== "IDLE_SEATED") return;

    const hand = handVideoRef.current;
    if (!hand) {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      onTriggerRising();
      return;
    }

    // Check if hand is raised (> 0.05s)
    if (hand.currentTime > 0.05) {
      isLoweringHandRef.current = true;
      setIsHandRewinding(true);
      hand.pause();

      const rewind = () => {
        if (hand.currentTime > 0.04) {
          hand.currentTime = Math.max(0, hand.currentTime - 0.06);
          requestAnimationFrame(rewind);
        } else {
          hand.currentTime = 0;
          hand.pause();
          isLoweringHandRef.current = false;
          setIsHandRewinding(false);

          // Silently set scroll to top without any scrolling animation or page jump!
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "instant" });
          }

          // Hand is resting on armrest, now safely trigger rising!
          onTriggerRising();
        }
      };
      requestAnimationFrame(rewind);
    } else {
      // Hand is already down on armrest
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      onTriggerRising();
    }
  };

  // Smoothly rewind hand video to starting position before reading decree
  const requestStartReading = () => {
    if (isLoweringHandRef.current || heroState !== "IDLE_SEATED") return;

    const hand = handVideoRef.current;
    if (!hand) {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      onTriggerReading();
      return;
    }

    // Check if hand is raised (> 0.05s)
    if (hand.currentTime > 0.05) {
      isLoweringHandRef.current = true;
      setIsHandRewinding(true);
      hand.pause();

      const rewind = () => {
        if (hand.currentTime > 0.04) {
          hand.currentTime = Math.max(0, hand.currentTime - 0.06);
          requestAnimationFrame(rewind);
        } else {
          hand.currentTime = 0;
          hand.pause();
          isLoweringHandRef.current = false;
          setIsHandRewinding(false);

          // Silently set scroll to top without any scrolling animation or page jump!
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "instant" });
          }

          // Hand is resting on armrest, now safely trigger reading!
          onTriggerReading();
        }
      };
      requestAnimationFrame(rewind);
    } else {
      // Hand is already down on armrest
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      onTriggerReading();
    }
  };

  // Listen to risingRequested from navbar
  useEffect(() => {
    if (risingRequested && heroState === "IDLE_SEATED") {
      requestStartRising();
    }
  }, [risingRequested, heroState]);

  // State Machine Controller for Cinematic Transitions
  useEffect(() => {
    const hand = handVideoRef.current;
    const rising = risingVideoRef.current;
    const sitting = sittingVideoRef.current;
    const reading = readingVideoRef.current;
    const stopReading = stopReadingVideoRef.current;
    if (!hand || !rising || !sitting || !reading || !stopReading) return;

    if (heroState === "RISING") {
      setActiveLayer("rising");
      hand.pause();
      hand.currentTime = 0;
      sitting.pause();
      sitting.currentTime = 0;
      reading.pause();
      reading.currentTime = 0;
      stopReading.pause();
      stopReading.currentTime = 0;

      rising.currentTime = 0;
      rising.muted = false; // direct user gesture
      const playPromise = rising.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          rising.muted = true;
          rising.play().catch(console.error);
        });
      }
    } else if (heroState === "STANDING_READY") {
      // 2. King holds standing pose; sitting video is prepped at 0.0s
      rising.pause();
      sitting.pause();
      sitting.currentTime = 0;
      hand.pause();
      hand.currentTime = 0;
      reading.pause();
      reading.currentTime = 0;
      stopReading.pause();
      stopReading.currentTime = 0;
    } else if (heroState === "SITTING_DOWN") {
      // 3. Seamlessly play sitting video
      // Keep risingVideo showing the standing king frame underneath until sittingVideo covers it!
      // Do NOT touch rising.currentTime here to avoid any flash of seated king!
      setActiveLayer("sitting");
      rising.pause();
      hand.pause();
      reading.pause();
      stopReading.pause();

      sitting.currentTime = 0;
      sitting.muted = false; // direct user gesture
      const playPromise = sitting.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          sitting.muted = true;
          sitting.play().catch(console.error);
        });
      }
    } else if (heroState === "READING_DECREE") {
      // 4. Play king unrolling & reading scroll video
      setActiveLayer("reading");
      hand.pause();
      hand.currentTime = 0;
      rising.pause();
      rising.currentTime = 0;
      sitting.pause();
      sitting.currentTime = 0;
      stopReading.pause();
      stopReading.currentTime = 0;

      reading.currentTime = 0;
      reading.muted = false; // direct user gesture
      const playPromise = reading.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          reading.muted = true;
          reading.play().catch(console.error);
        });
      }
    } else if (heroState === "DECREE_OPEN") {
      // 5. King holds scroll open while user views the RoyalDecreeModal
      reading.pause();
      stopReading.pause();
      stopReading.currentTime = 0;
    } else if (heroState === "STOPPING_READING") {
      // 6. Seamlessly play king rolling up scroll and returning to throne
      // readingVideo remains at final frame underneath to prevent any flash of seated king
      setActiveLayer("stop_reading");
      reading.pause();
      hand.pause();
      rising.pause();
      sitting.pause();

      stopReading.currentTime = 0;
      stopReading.muted = false; // direct user gesture
      const playPromise = stopReading.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          stopReading.muted = true;
          stopReading.play().catch(console.error);
        });
      }
    } else if (heroState === "IDLE_SEATED") {
      // 7. Return to original seated idle state
      setActiveLayer("hand");
      hand.pause();
      hand.currentTime = 0;
      rising.pause();
      rising.currentTime = 0;
      sitting.pause();
      sitting.currentTime = 0;
      reading.pause();
      reading.currentTime = 0;
      stopReading.pause();
      stopReading.currentTime = 0;
    }
  }, [heroState]);

  // Scroll-Driven Hand-Raising Mechanism (Active in IDLE_SEATED)
  useEffect(() => {
    if (heroState !== "IDLE_SEATED") return;

    const handVideo = handVideoRef.current;
    if (!handVideo) return;

    let rafId: number;
    let targetTime = 0;
    let isSeeking = false;

    const handleScroll = () => {
      if (isLoweringHandRef.current) return;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollableDistance = containerHeight - windowHeight;

      if (scrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / scrollableDistance));

      // Active gesture is between 0.0s and 2.2s of king-rise-hand.mp4
      // Map progress 0.0 -> 0.8 to 0.0s -> 2.2s, and hold 2.2s for 0.8 -> 1.0
      const gestureProgress = Math.min(1, progress / 0.8);
      targetTime = gestureProgress * 2.2;
    };

    const updateLoop = () => {
      if (isLoweringHandRef.current) {
        rafId = requestAnimationFrame(updateLoop);
        return;
      }
      if (handVideo && handVideo.readyState >= 1 && !isSeeking) {
        const diff = targetTime - handVideo.currentTime;
        if (Math.abs(diff) > 0.02) {
          isSeeking = true;
          const step = diff * 0.35;
          handVideo.currentTime = Math.max(0, Math.min(2.2, handVideo.currentTime + step));
        }
      }
      rafId = requestAnimationFrame(updateLoop);
    };

    const handleSeeked = () => {
      isSeeking = false;
    };

    handVideo.addEventListener("seeked", handleSeeked);
    window.addEventListener("scroll", handleScroll, { passive: true });
    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      handVideo.removeEventListener("seeked", handleSeeked);
      cancelAnimationFrame(rafId);
    };
  }, [heroState]);

  // Handle Video Completion Events
  const handleRisingEnded = () => {
    if (risingVideoRef.current) {
      risingVideoRef.current.pause();
    }
    onFinishRising();
  };

  const handleSittingEnded = () => {
    if (sittingVideoRef.current) {
      sittingVideoRef.current.pause();
    }
    // Now that sitting animation has fully ended and king is seated:
    if (risingVideoRef.current) {
      risingVideoRef.current.currentTime = 0;
      risingVideoRef.current.pause();
    }
    if (handVideoRef.current) {
      handVideoRef.current.currentTime = 0;
      handVideoRef.current.pause();
    }
    onFinishSitting();
  };

  const handleReadingEnded = () => {
    if (readingVideoRef.current) {
      readingVideoRef.current.pause();
    }
    onFinishReading();
  };

  const handleStopReadingEnded = () => {
    if (stopReadingVideoRef.current) {
      stopReadingVideoRef.current.pause();
    }
    if (readingVideoRef.current) {
      readingVideoRef.current.currentTime = 0;
      readingVideoRef.current.pause();
    }
    if (handVideoRef.current) {
      handVideoRef.current.currentTime = 0;
      handVideoRef.current.pause();
    }
    onFinishStopReading();
  };

  const handleHeroRisingClick = () => {
    requestStartRising();
  };

  const isUiHidden =
    heroState === "RISING" ||
    heroState === "STANDING_READY" ||
    heroState === "SITTING_DOWN" ||
    heroState === "READING_DECREE" ||
    heroState === "DECREE_OPEN" ||
    heroState === "STOPPING_READING" ||
    isHandRewinding;

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        heroState === "IDLE_SEATED" ? "h-[220vh]" : "h-screen min-h-[680px] max-h-[1100px]"
      }`}
    >
      <section className="sticky top-0 h-screen min-h-[680px] max-h-[1100px] overflow-hidden flex items-center bg-[#0E0D0C]">
        {/* 
          ========================================================================
          SEAMLESS MULTI-LAYER VIDEO SYSTEM (Zero Flicker)
          Layer 1: King Raising Hand (Scroll-driven in IDLE_SEATED)
          Layer 2: King Rising from Throne (Triggered by "HRÁT NYNÍ")
          Layer 3: King Sitting Back (Triggered by "Usadit krále")
          Layer 4: King Reading Scroll (Triggered by "[ ČÍST POSELSTVÍ ]")
          Layer 5: King Stop Reading (Triggered on closing decree modal)
          ========================================================================
        */}
        <div className="absolute inset-0 z-0">
          {/* Layer 1: Hand-Raising Scroll Video */}
          <video
            ref={handVideoRef}
            className={`absolute inset-0 w-full h-full object-cover object-[62%_center] lg:object-[68%_center] select-none filter contrast-[1.05] brightness-[0.92] ${
              activeLayer === "hand" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            playsInline
            preload="auto"
            disablePictureInPicture
            poster="/king-seated-poster.jpg"
            onLoadedMetadata={handleLoadedHandMetadata}
          >
            <source src="/video/king-rise-hand.mp4" type="video/mp4" />
            <source src="/video/rise-hand.mp4" type="video/mp4" />
            Váš prohlížeč nepodporuje HTML5 video.
          </video>

          {/* Layer 2: King Rising Video */}
          <video
            ref={risingVideoRef}
            className={`absolute inset-0 w-full h-full object-cover object-[62%_center] lg:object-[68%_center] select-none filter contrast-[1.05] brightness-[0.92] ${
              activeLayer === "rising" || heroState === "SITTING_DOWN"
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
            playsInline
            preload="auto"
            disablePictureInPicture
            poster="/king-seated-poster.jpg"
            onLoadedMetadata={handleLoadedRisingMetadata}
            onEnded={handleRisingEnded}
          >
            <source src="/video/King%20Rising%20from%20the%20Throne.mp4" type="video/mp4" />
            <source src="/video/king-rising-from-throne.mp4" type="video/mp4" />
            Váš prohlížeč nepodporuje HTML5 video.
          </video>

          {/* Layer 3: King Sitting Back Video */}
          <video
            ref={sittingVideoRef}
            className={`absolute inset-0 w-full h-full object-cover object-[62%_center] lg:object-[68%_center] select-none filter contrast-[1.05] brightness-[0.92] ${
              activeLayer === "sitting" ? "opacity-100 z-20" : "opacity-0 z-0 pointer-events-none"
            }`}
            playsInline
            preload="auto"
            disablePictureInPicture
            onLoadedMetadata={handleLoadedSittingMetadata}
            onEnded={handleSittingEnded}
          >
            <source src="/video/king-sitting-back.mp4" type="video/mp4" />
            <source src="/video/King%20Sitting%20Back.mp4" type="video/mp4" />
            Váš prohlížeč nepodporuje HTML5 video.
          </video>

          {/* Layer 4: King Reading Scroll Video */}
          <video
            ref={readingVideoRef}
            className={`absolute inset-0 w-full h-full object-cover object-[62%_center] lg:object-[68%_center] select-none filter contrast-[1.05] brightness-[0.92] ${
              activeLayer === "reading" || heroState === "DECREE_OPEN" || heroState === "STOPPING_READING"
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
            playsInline
            preload="auto"
            disablePictureInPicture
            poster="/king-seated-poster.jpg"
            onLoadedMetadata={handleLoadedReadingMetadata}
            onEnded={handleReadingEnded}
          >
            <source src="/video/king-reading.mp4" type="video/mp4" />
            Váš prohlížeč nepodporuje HTML5 video.
          </video>

          {/* Layer 5: King Stop Reading & Return to Throne Video */}
          <video
            ref={stopReadingVideoRef}
            className={`absolute inset-0 w-full h-full object-cover object-[62%_center] lg:object-[68%_center] select-none filter contrast-[1.05] brightness-[0.92] ${
              activeLayer === "stop_reading" ? "opacity-100 z-20" : "opacity-0 z-0 pointer-events-none"
            }`}
            playsInline
            preload="auto"
            disablePictureInPicture
            onLoadedMetadata={handleLoadedStopReadingMetadata}
            onEnded={handleStopReadingEnded}
          >
            <source src="/video/king-stop-reading.mp4" type="video/mp4" />
            Váš prohlížeč nepodporuje HTML5 video.
          </video>

          {/* Left Side Shadow & Atmospheric Vignette Overlay */}
          <div
            className={`absolute inset-0 z-25 bg-gradient-to-r from-[#0E0D0C] via-[#0E0D0C]/85 md:via-[#0E0D0C]/70 to-transparent w-full md:w-[65%] lg:w-[55%] pointer-events-none transition-opacity duration-700 ${
              isUiHidden ? "opacity-25" : "opacity-100"
            }`}
          />

          {/* Bottom edge fade to seamless dark background */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0E0D0C] via-[#0E0D0C]/80 to-transparent z-25 pointer-events-none" />

          {/* Top edge fade for navbar integration */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#0E0D0C]/90 via-[#0E0D0C]/40 to-transparent z-25 pointer-events-none" />

          {/* Torchlight Ambient Glow on the Braziers */}
          <div className="absolute top-[28%] right-[58%] w-44 h-44 rounded-full bg-amber-500/10 blur-3xl pointer-events-none z-25 animate-torch-flicker" />
          <div className="absolute top-[28%] right-[12%] w-48 h-48 rounded-full bg-amber-500/15 blur-3xl pointer-events-none z-25 animate-torch-flicker" />
        </div>

        {/* 
          ========================================================================
          HERO CONTENT CONTAINER (State A: IDLE_SEATED)
          Fades out smoothly during cinematic sequences.
          ========================================================================
        */}
        <div
          className={`relative z-30 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-16 sm:pt-12 transition-all duration-700 ${
            isUiHidden
              ? "opacity-0 pointer-events-none translate-x-[-20px]"
              : "opacity-100 translate-x-0"
          }`}
        >
          <div className="w-full md:w-[58%] lg:w-[48%] xl:w-[44%] text-left">
            {/* Eyebrow Text */}
            <div className="inline-flex items-center space-x-2.5 mb-3 sm:mb-4">
              <span className="w-6 h-[1.5px] bg-[#D4AF37]/80" />
              <p className="font-sans text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.26em] text-[#D4AF37] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Interaktivní historická sága
              </p>
            </div>

            {/* Main Headline H1 */}
            <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-[0.06em] leading-[1.06] text-[#F3EFE6] mb-5 sm:mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              <span className="block gold-gradient-text">ODHALTE</span>
              <span className="block text-[#F3EFE6]">TAJEMSTVÍ</span>
              <span className="block text-[#E5C158]/95">KRÁLE</span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base md:text-lg text-[#D5D0C7] font-normal leading-relaxed mb-8 max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Klikněte na svitek v králových rukách, odhalte tajné poselství a rozhodněte o osudu celé říše.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3.5 sm:space-y-0 sm:space-x-5">
              {/* Primary Pill Button: PROZKOUMAT PŘÍBĚH > */}
              <button
                onClick={onExploreStory}
                className="group relative inline-flex items-center justify-center px-7 py-3.5 sm:py-4 rounded-full gold-gradient-btn text-[#161209] font-bold text-xs sm:text-sm tracking-[0.16em] uppercase cursor-pointer transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Prozkoumat příběh</span>
                  <ChevronRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>

              {/* Secondary Pill Button: Sledovat trailer */}
              <button
                onClick={onOpenTrailer}
                className="group inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 sm:py-4 rounded-full bg-[#161412]/75 hover:bg-[#D4AF37]/15 border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#F3EFE6] hover:text-[#FFF0B8] text-xs sm:text-sm font-medium tracking-wider backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              >
                <div className="w-7 h-7 rounded-full bg-[#0E0D0C]/80 border border-[#D4AF37]/60 flex items-center justify-center group-hover:scale-110 group-hover:border-[#F3D079] transition-transform">
                  <PlayIcon className="w-3.5 h-3.5 ml-0.5 text-[#F3D079]" />
                </div>
                <span>Sledovat trailer</span>
              </button>
            </div>

            {/* Quick Play CTA on Desktop & Mobile */}
            <div className="mt-6 flex items-center space-x-3">
              <button
                onClick={handleHeroRisingClick}
                className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-[#D4AF37]/15 hover:bg-[#D4AF37]/30 border border-[#D4AF37] text-xs font-semibold tracking-wider text-[#F3D079] transition-all shadow-[0_0_15px_rgba(212,175,55,0.25)] cursor-pointer hover:scale-105"
              >
                <SwordIcon className="w-4 h-4 text-[#F3D079]" />
                <span>Hrát nyní: Povstat s králem</span>
              </button>
            </div>

            {/* Mobile Hotspot Direct Trigger Pill */}
            <div className="mt-6 md:hidden">
              <button
                onClick={requestStartReading}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#D4AF37]/60 bg-[#161412]/90 backdrop-blur-md text-left shadow-[0_0_20px_rgba(212,175,55,0.25)]"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center animate-pulse">
                    <HandPointerIcon className="w-5 h-5 text-[#F3D079]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-widest text-[#E5C158] uppercase">
                      Královský svitek v rukách
                    </p>
                    <p className="text-xs text-[#D5D0C7]">Klepnutím otevřete pečeť a tajný edikt</p>
                  </div>
                </div>
                <span className="text-[#F3D079] font-serif text-sm font-bold">[ ČÍST ]</span>
              </button>
            </div>
          </div>
        </div>

        {/* 
          ========================================================================
          INTERACTIVE HOTSPOT OVER THE SCROLL IN THE KING'S LAP
          Fades out smoothly when king rises so he is unobstructed.
          ========================================================================
        */}
        <div
          className={`absolute z-30 cursor-pointer select-none group hidden md:block transition-opacity duration-500 ${
            isUiHidden ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{
            left: "65.4%",
            top: "65.2%",
            transform: "translate(-50%, -50%)",
          }}
          onClick={requestStartReading}
          onMouseEnter={() => setIsHoveredHotspot(true)}
          onMouseLeave={() => setIsHoveredHotspot(false)}
          role="button"
          tabIndex={0}
          aria-label="Číst tajné poselství ze svitku v králových rukách"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              requestStartReading();
            }
          }}
        >
          {/* Outer Pulsing Wave Rings */}
          <div className="absolute inset-0 w-16 h-16 -top-3 -left-3 rounded-full border border-[#D4AF37]/70 animate-pulse-ring-1 pointer-events-none" />
          <div className="absolute inset-0 w-16 h-16 -top-3 -left-3 rounded-full border border-[#F5D97E]/50 animate-pulse-ring-2 pointer-events-none" />

          {/* Golden Central Hotspot Core Circle */}
          <div
            className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 animate-core-glow ${
              isHoveredHotspot
                ? "bg-[#D4AF37] scale-110 shadow-[0_0_35px_rgba(243,208,121,0.9)]"
                : "bg-[#18140D]/75 backdrop-blur-md border-[1.5px] border-[#F3D079]/90"
            }`}
          >
            {/* Inner ring */}
            <div className="absolute inset-[3px] rounded-full border border-[#D4AF37]/40 pointer-events-none" />

            {/* Hand pointer icon inside */}
            <HandPointerIcon
              className={`w-5 h-5 transition-transform duration-300 ${
                isHoveredHotspot ? "scale-115 text-[#161209]" : "text-[#F5D97E]"
              }`}
            />
          </div>

          {/* Floating Label Underneath Hotspot */}
          <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-all duration-300">
            <span className="inline-block font-cinzel text-[11px] font-bold tracking-[0.24em] text-[#F3D079] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] group-hover:text-[#FFF0B8] group-hover:scale-105 transition-all uppercase">
              [ ČÍST POSELSTVÍ ]
            </span>

            {/* Hover tooltip indicator */}
            <div
              className={`mt-1 text-[10px] text-[#F3EFE6]/90 bg-[#0E0D0C]/90 px-2.5 py-0.5 rounded border border-[#D4AF37]/40 shadow-lg transition-opacity duration-200 pointer-events-none ${
                isHoveredHotspot ? "opacity-100" : "opacity-0"
              }`}
            >
              Královský edikt čeká
            </div>
          </div>
        </div>

        {/* 
          ========================================================================
          RISING ACTIVE BADGE (Top right during 0.0s - 4.96s)
          ========================================================================
        */}
        {heroState === "RISING" && (
          <div className="absolute top-24 right-8 z-40 flex items-center space-x-3 animate-in fade-in duration-300">
            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0E0D0C]/80 border border-[#D4AF37]/50 backdrop-blur-md text-xs text-[#E5C158]">
              <span className="w-2 h-2 rounded-full bg-[#E5C158] animate-ping" />
              <span className="font-cinzel tracking-wider uppercase">Král Balduin IV. povstává...</span>
            </div>
          </div>
        )}

        {/* 
          ========================================================================
          SITTING_DOWN ACTIVE BADGE (Top right during 0.0s - 4.96s)
          ========================================================================
        */}
        {heroState === "SITTING_DOWN" && (
          <div className="absolute top-24 right-8 z-40 flex items-center space-x-3 animate-in fade-in duration-300">
            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0E0D0C]/80 border border-[#D4AF37]/50 backdrop-blur-md text-xs text-[#E5C158]">
              <span className="w-2 h-2 rounded-full bg-[#F3D079] animate-pulse" />
              <span className="font-cinzel tracking-wider uppercase">Král usedá zpět na trůn...</span>
            </div>
          </div>
        )}

        {/* 
          ========================================================================
          READING_DECREE ACTIVE BADGE (Top right during 0.0s - 4.96s)
          ========================================================================
        */}
        {heroState === "READING_DECREE" && (
          <div className="absolute top-24 right-8 z-40 flex items-center space-x-3 animate-in fade-in duration-300">
            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0E0D0C]/80 border border-[#D4AF37]/50 backdrop-blur-md text-xs text-[#E5C158]">
              <span className="w-2 h-2 rounded-full bg-[#E5C158] animate-ping" />
              <span className="font-cinzel tracking-wider uppercase">Král otevírá poselství...</span>
            </div>
          </div>
        )}

        {/* 
          ========================================================================
          STOPPING_READING ACTIVE BADGE (Top right during 0.0s - 4.96s)
          ========================================================================
        */}
        {heroState === "STOPPING_READING" && (
          <div className="absolute top-24 right-8 z-40 flex items-center space-x-3 animate-in fade-in duration-300">
            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0E0D0C]/80 border border-[#D4AF37]/50 backdrop-blur-md text-xs text-[#E5C158]">
              <span className="w-2 h-2 rounded-full bg-[#F3D079] animate-pulse" />
              <span className="font-cinzel tracking-wider uppercase">Král svíjí poselství...</span>
            </div>
          </div>
        )}

        {/* 
          ========================================================================
          STATE B: STANDING_READY
          Prominent "USADIT KRÁLE" & "VSTOUPIT DO HRY" Control Center
          ========================================================================
        */}
        {heroState === "STANDING_READY" && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-end pb-16 sm:pb-20 px-4 bg-gradient-to-t from-black/85 via-black/30 to-transparent animate-in fade-in duration-500">
            <div className="text-center max-w-xl mx-auto space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#D4AF37]/20 border border-[#F3D079] shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                <RoyalCrestIcon className="w-8 h-8 text-[#F3D079]" />
              </div>

              <div>
                <p className="text-xs uppercase font-sans font-bold tracking-[0.3em] text-[#D4AF37] mb-1">
                  Jeruzalémské království Anno Domini 1177
                </p>
                <h2 className="font-cinzel text-3xl sm:text-4xl font-bold gold-gradient-text uppercase">
                  Král Balduin IV. povstal
                </h2>
                <p className="text-sm text-[#F3EFE6]/90 font-serif italic mt-2">
                  „Můj meč je připraven. Nyní je řada na vás, abyste složili přísahu koruny.“
                </p>
              </div>

              {/* Action Buttons: Vstoupit do hry & Usadit krále */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
                {/* Primary CTA: Enter the Game Modal */}
                <button
                  onClick={onOpenPlayModal}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full gold-gradient-btn text-[#161209] font-bold text-xs uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
                >
                  <SwordIcon className="w-4 h-4 text-[#161209]" />
                  <span>Vstoupit do hry (Složit přísahu)</span>
                </button>

                {/* Crucial Feature: "USADIT KRÁLE" Button */}
                <button
                  onClick={onTriggerSitting}
                  className="group w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#161412]/95 hover:bg-[#D4AF37]/20 border-2 border-[#D4AF37] hover:border-[#F3D079] text-[#F3D079] hover:text-[#FFF0B8] shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] active:scale-95 transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
                  title="Odvolat bojové gesto a nechat krále usednout zpět na trůn"
                >
                  <ThroneIcon className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span className="font-cinzel font-bold text-xs uppercase tracking-[0.18em]">
                    Usadit krále
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Subtle Scroll Down Indicator at bottom center (Idle state only) */}
        {!isUiHidden && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity pointer-events-auto">
            <a
              href="#pribeh"
              className="flex flex-col items-center text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]"
              aria-label="Přejít na příběh"
            >
              <span className="mb-1 text-[9px]">Svitek dolů</span>
              <div className="w-4 h-7 rounded-full border border-[#D4AF37]/50 flex justify-center pt-1">
                <span className="w-1 h-2 rounded-full bg-[#D4AF37] animate-bounce" />
              </div>
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
