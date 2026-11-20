"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection, HeroKingState } from "@/components/HeroSection";
import { RoyalDecreeModal, RealmChoice } from "@/components/RoyalDecreeModal";
import { TrailerModal } from "@/components/TrailerModal";
import { PlayGameModal } from "@/components/PlayGameModal";
import { StorySection } from "@/components/StorySection";
import { CharactersSection } from "@/components/CharactersSection";
import { RealmMapSection } from "@/components/RealmMapSection";
import { NewsSection } from "@/components/NewsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [decreeModalOpen, setDecreeModalOpen] = useState(false);
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  const [playModalOpen, setPlayModalOpen] = useState(false);
  const [heroState, setHeroState] = useState<HeroKingState>("IDLE_SEATED");
  const [risingRequested, setRisingRequested] = useState(false);
  const [savedChoice, setSavedChoice] = useState<RealmChoice | null>(null);
  const [playerOath, setPlayerOath] = useState<string | null>(null);

  const handleSaveChoice = (choice: RealmChoice) => {
    setSavedChoice(choice);
    setPlayerOath(choice.alignment);
    setDecreeModalOpen(false);
    if (heroState === "DECREE_OPEN") {
      setHeroState("STOPPING_READING");
    }
  };

  const handleCloseDecreeModal = () => {
    setDecreeModalOpen(false);
    if (heroState === "DECREE_OPEN") {
      setHeroState("STOPPING_READING");
    }
  };

  const handleSealedOathFromPrologue = (title: string) => {
    setPlayerOath(title);
    setHeroState("IDLE_SEATED");
  };

  const handleExploreStory = () => {
    const el = document.getElementById("pribeh");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Trigger King Rising cinematic when user clicks "HRÁT NYNÍ"
  const handleNavbarPlayClick = () => {
    if (heroState === "IDLE_SEATED") {
      // If user is far down in another section, smooth scroll up
      if (typeof window !== "undefined" && window.scrollY > window.innerHeight * 1.5) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          setRisingRequested(true);
        }, 500);
      } else {
        // User is inside the hero section: request smooth hand rewind without any page scroll/jump!
        setRisingRequested(true);
      }
    } else if (heroState === "STANDING_READY") {
      setPlayModalOpen(true);
    }
  };

  const handleTriggerRising = () => {
    setRisingRequested(false);
    setHeroState("RISING");
  };

  const handleFinishReading = () => {
    setHeroState("DECREE_OPEN");
    setDecreeModalOpen(true);
  };

  const handleFinishStopReading = () => {
    setHeroState("IDLE_SEATED");
  };

  const isCinematicActive = heroState !== "IDLE_SEATED";

  return (
    <main className="min-h-screen bg-[#0E0D0C] text-[#F3EFE6] relative">
      {/* Top Navigation Bar with Signature Gold Filigree Divider */}
      <Navbar
        onOpenPlayModal={handleNavbarPlayClick}
        playerOath={playerOath}
        onOpenDecreeModal={() => setDecreeModalOpen(true)}
        isCinematicActive={isCinematicActive}
      />

      {/* 
        ========================================================================
        HERO SECTION: King Cinematic State Machine
        State A: IDLE_SEATED (Paused at 0.0s, seated king, UI visible, scroll hand-raise)
        State B: RISING -> STANDING_READY (Triggered by "HRÁT NYNÍ", holds on standing frame)
        State C: SITTING_DOWN -> IDLE_SEATED (Triggered by "Usadit krále", smoothly returns to throne)
        State D: READING_DECREE -> DECREE_OPEN (Triggered by "[ ČÍST POSELSTVÍ ]", plays king-reading.mp4)
        State E: STOPPING_READING -> IDLE_SEATED (Triggered on closing decree, plays king-stop-reading.mp4)
        ========================================================================
      */}
      <HeroSection
        onOpenDecree={() => setDecreeModalOpen(true)}
        onOpenTrailer={() => setTrailerModalOpen(true)}
        onExploreStory={handleExploreStory}
        onOpenPlayModal={() => setPlayModalOpen(true)}
        heroState={heroState}
        risingRequested={risingRequested}
        onTriggerRising={handleTriggerRising}
        onFinishRising={() => setHeroState("STANDING_READY")}
        onTriggerSitting={() => setHeroState("SITTING_DOWN")}
        onFinishSitting={() => setHeroState("IDLE_SEATED")}
        onTriggerReading={() => setHeroState("READING_DECREE")}
        onFinishReading={handleFinishReading}
        onFinishStopReading={handleFinishStopReading}
      />

      {/* 
        ========================================================================
        SECTION 1: PŘÍBĚH (Story & Chapter Timeline)
        ========================================================================
      */}
      <StorySection />

      {/* 
        ========================================================================
        SECTION 2: POSTAVY (Court & Character Showcase)
        ========================================================================
      */}
      <CharactersSection />

      {/* 
        ========================================================================
        SECTION 3: INTERAKTIVNÍ MAPA (Interactive Realm Map)
        ========================================================================
      */}
      <RealmMapSection />

      {/* 
        ========================================================================
        SECTION 4: NOVINKY & KRONIKY (News, Updates & Articles)
        ========================================================================
      */}
      <NewsSection />

      {/* 
        ========================================================================
        FOOTER
        ========================================================================
      */}
      <Footer />

      {/* 
        ========================================================================
        INTERACTIVE MODALS
        ========================================================================
      */}
      <RoyalDecreeModal
        isOpen={decreeModalOpen}
        onClose={handleCloseDecreeModal}
        onSaveChoice={handleSaveChoice}
        savedChoice={savedChoice}
      />

      <TrailerModal
        isOpen={trailerModalOpen}
        onClose={() => setTrailerModalOpen(false)}
      />

      <PlayGameModal
        isOpen={playModalOpen}
        onClose={() => setPlayModalOpen(false)}
        onSealedOath={handleSealedOathFromPrologue}
      />
    </main>
  );
}
