"use client";

import React from "react";
import { RoyalCrestIcon } from "./Icons";
import { GoldDiamondDivider } from "./GoldDiamondDivider";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A0908] text-[#F3EFE6] pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-t border-[#D4AF37]/20">
      {/* Signature Gold Diamond Line Divider at the very top of footer */}
      <div className="max-w-7xl mx-auto mb-12">
        <GoldDiamondDivider withWings={true} />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center space-x-3">
            <div
              className="w-9 h-9 shrink-0 flex items-center justify-center"
              style={{ width: "36px", height: "36px", maxWidth: "36px", maxHeight: "36px" }}
            >
              <RoyalCrestIcon
                size={36}
                className="w-9 h-9 text-[#F3D079] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
              />
            </div>
            <span className="font-cinzel text-xl font-bold tracking-[0.2em] text-[#E5C158] uppercase">
              Království osudu
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed max-w-sm">
            Interaktivní historická sága ze Svaté země 12. století. Příběh krále Balduina IV.,
            zápas o Jeruzalém, mír a čest na prahu dějinného zlomu.
          </p>

          <p className="text-[11px] font-serif italic text-[#D4AF37]/80">
            „Non nobis, Domine, non nobis, sed nomini tuo da gloriam.“
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs">
          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#E5C158] mb-3">
              Průzkum říše
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#pribeh" className="text-[#A8A29E] hover:text-[#FFF0B8] transition-colors">
                  Příběh a kapitoly
                </a>
              </li>
              <li>
                <a href="#postavy" className="text-[#A8A29E] hover:text-[#FFF0B8] transition-colors">
                  Královský dvůr
                </a>
              </li>
              <li>
                <a href="#mapa" className="text-[#A8A29E] hover:text-[#FFF0B8] transition-colors">
                  Interaktivní mapa
                </a>
              </li>
              <li>
                <a href="#novinky" className="text-[#A8A29E] hover:text-[#FFF0B8] transition-colors">
                  Kroniky a zprávy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#E5C158] mb-3">
              Dokumenty
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-[#A8A29E] hover:text-[#FFF0B8] cursor-pointer">
                  Královský kodex
                </span>
              </li>
              <li>
                <span className="text-[#A8A29E] hover:text-[#FFF0B8] cursor-pointer">
                  Zásady ochrany dat
                </span>
              </li>
              <li>
                <span className="text-[#A8A29E] hover:text-[#FFF0B8] cursor-pointer">
                  Licence a archiv
                </span>
              </li>
              <li>
                <span className="text-[#A8A29E] hover:text-[#FFF0B8] cursor-pointer">
                  Kontakt kanceláře
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Community / Socials Column */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#E5C158]">
            Královská komunita
          </h4>

          <div className="flex items-center space-x-3">
            {/* Discord */}
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-[#181512] border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C158] hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all text-xs font-bold"
              aria-label="Discord"
            >
              DC
            </a>
            {/* YouTube */}
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-[#181512] border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C158] hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all text-xs font-bold"
              aria-label="YouTube"
            >
              YT
            </a>
            {/* Steam */}
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-[#181512] border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C158] hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all text-xs font-bold"
              aria-label="Steam"
            >
              ST
            </a>
            {/* X / Twitter */}
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-[#181512] border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C158] hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all text-xs font-bold"
              aria-label="X"
            >
              𝕏
            </a>
          </div>

          <p className="text-[11px] text-[#A8A29E]">
            Připojte se k tisícům hráčů a diskutujte o volbách a osudu Jeruzaléma.
          </p>
        </div>
      </div>

      {/* Bottom Sub-Footer */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#D4AF37]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A8A29E]/80 gap-3">
        <p>
          © {currentYear} Království osudu. Všechna práva vyhrazena. Inspirováno skutečnými historickými událostmi vlády Balduina IV.
        </p>
        <p className="text-[#D4AF37]/70 font-cinzel">
          Design & Kód vytvořeny dle předlohy
        </p>
      </div>
    </footer>
  );
}
