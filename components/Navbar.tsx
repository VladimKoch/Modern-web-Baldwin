"use client";

import React, { useState, useEffect } from "react";
import { RoyalCrestIcon, ScrollIcon } from "./Icons";
import { GoldDiamondDivider } from "./GoldDiamondDivider";
import { SoundAmbience } from "./SoundAmbience";

interface NavbarProps {
  onOpenPlayModal: () => void;
  playerOath?: string | null;
  onOpenDecreeModal: () => void;
  isCinematicActive?: boolean;
}

export function Navbar({ onOpenPlayModal, playerOath, onOpenDecreeModal, isCinematicActive }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Příběh", href: "#pribeh" },
    { name: "Postavy", href: "#postavy" },
    { name: "Interaktivní mapa", href: "#mapa" },
    { name: "Novinky", href: "#novinky" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0E0D0C]/95 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.85)]"
          : "bg-[#0E0D0C]/40 backdrop-blur-sm"
      } ${isCinematicActive ? "opacity-35 hover:opacity-100" : "opacity-100"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Crest */}
          <a
            href="#"
            className="flex items-center space-x-3.5 group focus:outline-none shrink-0"
            aria-label="Království osudu - domovská stránka"
          >
            <div
              className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center"
              style={{ width: "36px", height: "36px", maxWidth: "36px", maxHeight: "36px" }}
            >
              <div className="absolute inset-0 bg-[#D4AF37]/30 blur-sm rounded-full transform scale-125 opacity-0 group-hover:opacity-100 transition-opacity" />
              <RoyalCrestIcon
                size={36}
                className="w-8 h-8 sm:w-9 sm:h-9 relative z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
              />
            </div>
            <span className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.22em] text-[#E5C158] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-[#FFF0B8] transition-colors uppercase select-none">
              Království osudu
            </span>
          </a>

          {/* Desktop Navigation Links & Controls */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium tracking-wider text-[#F3EFE6]/85 hover:text-[#E5C158] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Active Oath Pill if chosen */}
            {playerOath && (
              <button
                onClick={onOpenDecreeModal}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/10 text-xs text-[#E5C158] hover:bg-[#D4AF37]/25 transition-all shadow-[0_0_12px_rgba(212,175,55,0.2)]"
                title="Zobrazit váš královský edikt a volbu"
              >
                <ScrollIcon size={14} className="w-3.5 h-3.5 text-[#F3D079]" />
                <span className="font-medium truncate max-w-[140px]">{playerOath}</span>
              </button>
            )}

            {/* Audio Atmosphere Switch */}
            <SoundAmbience />

            {/* CTA Button "HRÁT NYNÍ" */}
            <button
              onClick={onOpenPlayModal}
              className="px-6 py-2.5 rounded-lg border border-[#D4AF37] text-xs font-semibold tracking-[0.2em] text-[#F3EFE6] bg-[#0E0D0C]/60 hover:bg-[#D4AF37] hover:text-[#0E0D0C] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] active:scale-95 transition-all uppercase"
            >
              Hrát nyní
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-3 lg:hidden">
            <SoundAmbience />

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md border border-[#D4AF37]/40 text-[#E5C158] hover:bg-[#D4AF37]/10 focus:outline-none flex items-center justify-center shrink-0"
              style={{ width: "40px", height: "40px" }}
              aria-label="Otevřít nabídku"
            >
              <svg
                width={24}
                height={24}
                style={{ width: "24px", height: "24px", maxWidth: "24px", maxHeight: "24px" }}
                className="w-6 h-6 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Signature 1px Gold Hairline Divider with Diamond Ornament */}
      <div className="w-full">
        <GoldDiamondDivider className="my-0 opacity-90" />
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0E0D0C]/98 border-b border-[#D4AF37]/30 px-6 pt-4 pb-8 space-y-4 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-cinzel tracking-wider text-[#F3EFE6] hover:text-[#E5C158] py-2 border-b border-[#D4AF37]/15"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {playerOath && (
            <div className="py-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDecreeModal();
                }}
                className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded border border-[#D4AF37]/60 bg-[#D4AF37]/15 text-xs text-[#E5C158]"
              >
                <ScrollIcon size={16} className="w-4 h-4" />
                <span>Váš edikt: {playerOath}</span>
              </button>
            </div>
          )}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPlayModal();
            }}
            className="w-full mt-4 py-3 rounded-lg border border-[#D4AF37] bg-[#D4AF37] text-[#0E0D0C] text-sm font-bold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(212,175,55,0.4)]"
          >
            Hrát nyní
          </button>
        </div>
      )}
    </header>
  );
}
