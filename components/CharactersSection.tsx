"use client";

import React, { useState } from "react";
import { GoldDiamondDivider } from "./GoldDiamondDivider";
import { RoyalCrestIcon, SwordIcon, CloseIcon } from "./Icons";

interface Character {
  id: string;
  name: string;
  title: string;
  faction: string;
  factionBadge: string;
  avatarIcon: string;
  role: string;
  quote: string;
  bio: string;
  stats: {
    wisdom: number;
    martial: number;
    diplomacy: number;
    influence: number;
  };
  details: {
    weapon: string;
    historicalFate: string;
    allegiance: string;
    secretGoal: string;
  };
}

const CHARACTERS: Character[] = [
  {
    id: "baldwin",
    name: "Král Balduin IV.",
    title: "Malomocný král Jeruzaléma",
    faction: "Jeruzalémská královská koruna",
    factionBadge: "bg-[#D4AF37]/20 text-[#F3D079] border-[#D4AF37]",
    avatarIcon: "👑",
    role: "Panovník říše a vrchní velitel",
    quote: "„Král může být pohnut nemocí, ale jeho královská čest zůstává nezlomena.“",
    bio: "Korunován v 16 letech. Ztráta citu v těle a rozpadající se zdraví jej nezlomily – vládl s chladným intelektem, neobyčejnou statečností a spravedlností, která si vysloužila respekt i u Saladina.",
    stats: {
      wisdom: 96,
      martial: 92,
      diplomacy: 88,
      influence: 94,
    },
    details: {
      weapon: "Královský meč s křížem Pravého dřeva v jílci",
      historicalFate: "Zemřel ve věku 24 let, zanechal nezapomenutelnou legendu cti.",
      allegiance: "Bůh, lid Jeruzaléma a zachování míru",
      secretGoal: "Udržet říši v jednotě a zabránit fanatikům v rozpoutání zkázy.",
    },
  },
  {
    id: "sybilla",
    name: "Sibyla Jeruzalémská",
    title: "Královská sestra a dědička trůnu",
    faction: "Jeruzalémská královská koruna",
    factionBadge: "bg-purple-900/40 text-purple-200 border-purple-500/50",
    avatarIcon: "⚜️",
    role: "Hraběnka z Jaffy a Askalonu",
    quote: "„Krev našeho otce koluje i v mých žilách. Koruna nesmí padnout do rukou cizáků.“",
    bio: "Krásná, hrdá a politicky prozíravá. Hluboce milovala svého bratra, avšak její manželství s Guyem de Lusignan vneslo do království nebezpečný rozkol a rivalitu mezi frakcemi.",
    stats: {
      wisdom: 84,
      martial: 60,
      diplomacy: 90,
      influence: 88,
    },
    details: {
      weapon: "Stříbrná ceremoniální dýka s ametystem",
      historicalFate: "Byla korunována královnou Jeruzaléma po smrti Balduina V.",
      allegiance: "Dynastie Anjou-Plantagenet a její syn",
      secretGoal: "Zajistit korunu pro svou krev za každou cenu.",
    },
  },
  {
    id: "raymond",
    name: "Raimond III. z Tripolisu",
    title: "Moudrý hrabě a regent království",
    faction: "Stará baroniální rada",
    factionBadge: "bg-blue-900/40 text-blue-200 border-blue-500/50",
    avatarIcon: "🛡️",
    role: "Vrchní velitel a diplomat",
    quote: "„Ten, kdo volá po válce z bezpečí paláce, nikdy necítil pach spálené země.“",
    bio: "Zkušený státník a válečník, který strávil devět let v saracénském zajetí, kde poznal jazyk a zvyky nepřítele. Hájil opatrnou diplomacii a mír se Saladinem proti válečným štváčům.",
    stats: {
      wisdom: 94,
      martial: 89,
      diplomacy: 95,
      influence: 85,
    },
    details: {
      weapon: "Damašková čepel z dob captivity v Aleppu",
      historicalFate: "Přežil bitvu u Hattínu, zemřel na žal z pádu Jeruzaléma.",
      allegiance: "Právo, zákon říše a křesťansko-muslimská rovnováha",
      secretGoal: "Zabránit Guyovi de Lusignan ve zničení křesťanské přítomnosti.",
    },
  },
  {
    id: "renaud",
    name: "Renaud de Châtillon",
    title: "Pán pevnosti Kerak",
    faction: "Jestřábi ze Zajordánska",
    factionBadge: "bg-red-900/40 text-red-200 border-red-500/50",
    avatarIcon: "⚔️",
    role: "Vzpurný baron a pirát pouště",
    quote: "„Smlouvy s nevěřícími nemají cenu pergamenu, na němž jsou psány!“",
    bio: "Bezohledný, divoký a chamtivý. Z mohutné pouštní pevnosti Kerak organizoval nájezdy na karavany a dokonce vyslal pirátskou flotilu do Rudého moře s cílem napadnout Mekku.",
    stats: {
      wisdom: 55,
      martial: 95,
      diplomacy: 30,
      influence: 82,
    },
    details: {
      weapon: "Těžká dvouruční válečná sekera z Keraku",
      historicalFate: "Osobně popraven Saladinem po bitvě u Hattínu za své zločiny.",
      allegiance: "Vlastní sláva, kořist a fanatická válka",
      secretGoal: "Vyprovokovat totální svatou válku a zmocnit se bohatství Orientu.",
    },
  },
  {
    id: "saladin",
    name: "Saláh ad-Dín (Saladin)",
    title: "Sultán Egypta a Sýrie",
    faction: "Ajjúbovský sultanát",
    factionBadge: "bg-emerald-900/40 text-emerald-200 border-emerald-500/50",
    avatarIcon: "🌙",
    role: "Sjednotitel islámského světa",
    quote: "„Není vítězstvím pobít poražené, nýbrž získat si jejich srdce spravedlností.“",
    bio: "Legendární vojevůdce a vizionář. Ač byl Balduinovým největším rivalem, choval k mladému malomocnému králi hluboký respekt a dokonce mu posílal své osobní královské lékaře.",
    stats: {
      wisdom: 98,
      martial: 94,
      diplomacy: 92,
      influence: 99,
    },
    details: {
      weapon: "Zakřivený šamšír s vepsanými verši koránu",
      historicalFate: "Osvobodil Jeruzalém v roce 1187 s milostí pro obyvatele.",
      allegiance: "Sjednocení ummy a ochrana svatých míst",
      secretGoal: "Znovuotevřít al-Quds pro všechny poutníky tří náboženství.",
    },
  },
];

export function CharactersSection() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(CHARACTERS[0]);
  const [dossierModalChar, setDossierModalChar] = useState<Character | null>(null);

  return (
    <section id="postavy" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#12100E] border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.28em] text-[#D4AF37] uppercase mb-2">
            Osobnosti královského dvora
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-[#F3EFE6] mb-4">
            Klíčové postavy ságy
          </h2>
          <p className="text-[#A8A29E] text-base leading-relaxed">
            Hrdinové, intrikáni a protivníci. Vyberte postavu a prozkoumejte jejich 
            vlastnosti, politický vliv i tajné záměry.
          </p>
          <GoldDiamondDivider className="mt-8 max-w-md mx-auto" />
        </div>

        {/* 
          ========================================================================
          CHARACTER CARDS CAROUSEL / ROW
          ========================================================================
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
          {CHARACTERS.map((char) => {
            const isSelected = selectedCharacter.id === char.id;
            return (
              <button
                key={char.id}
                onClick={() => setSelectedCharacter(char)}
                className={`relative p-4 rounded-xl border text-center transition-all duration-300 flex flex-col items-center justify-between ${
                  isSelected
                    ? "bg-[#1E1B16] border-[#F3D079] shadow-[0_0_25px_rgba(212,175,55,0.3)] scale-[1.03]"
                    : "bg-[#161411]/90 border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#1A1713]"
                }`}
              >
                {/* Active Diamond Marker */}
                {isSelected && (
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#F3D079] shadow-[0_0_8px_rgba(243,208,121,0.8)]" />
                )}

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0E0D0C] border border-[#D4AF37]/50 flex items-center justify-center text-2xl sm:text-3xl mb-3 shadow-inner">
                  {char.avatarIcon}
                </div>

                <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F3EFE6] mb-1 line-clamp-1">
                  {char.name}
                </h3>

                <p className="text-[10px] sm:text-xs text-[#D4AF37] font-medium mb-2 line-clamp-1">
                  {char.title}
                </p>

                <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border ${char.factionBadge}`}>
                  {char.faction.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* 
          ========================================================================
          SELECTED CHARACTER SPOTLIGHT DOSSIER
          ========================================================================
        */}
        <div className="bg-[#171411] rounded-2xl border border-[#D4AF37]/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Bio & Quote */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full border ${selectedCharacter.factionBadge}`}>
                  {selectedCharacter.faction}
                </span>
                <span className="text-xs text-[#A8A29E] font-mono">
                  Role: {selectedCharacter.role}
                </span>
              </div>

              <div>
                <h3 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#FFF0B8] mb-1">
                  {selectedCharacter.name}
                </h3>
                <p className="text-base font-cinzel text-[#D4AF37]">
                  {selectedCharacter.title}
                </p>
              </div>

              <blockquote className="border-l-2 border-[#D4AF37] pl-4 py-1 italic font-serif text-[#E5DFD5] text-base sm:text-lg">
                {selectedCharacter.quote}
              </blockquote>

              <p className="text-sm sm:text-base text-[#C2BCB3] leading-relaxed">
                {selectedCharacter.bio}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setDossierModalChar(selectedCharacter)}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg border border-[#D4AF37] text-xs font-bold tracking-widest uppercase text-[#F3EFE6] bg-[#0E0D0C]/80 hover:bg-[#D4AF37] hover:text-[#0E0D0C] transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                >
                  <SwordIcon className="w-4 h-4" />
                  <span>Otevřít podrobný spis postavy</span>
                </button>
              </div>
            </div>

            {/* Right: Character Attributes & Stats Bars */}
            <div className="lg:col-span-5 bg-[#12100E] rounded-xl border border-[#D4AF37]/25 p-6 space-y-4 shadow-inner">
              <h4 className="font-cinzel text-xs font-bold tracking-[0.2em] text-[#E5C158] uppercase flex items-center justify-between border-b border-[#D4AF37]/20 pb-2">
                <span>Vlastnosti a atributy</span>
                <RoyalCrestIcon className="w-4 h-4 text-[#D4AF37]" />
              </h4>

              {/* Stat 1: Moudrost a Intelekt */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#A8A29E]">Moudrost a státnický um</span>
                  <span className="font-mono font-bold text-[#E5C158]">{selectedCharacter.stats.wisdom}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#1F1C18] overflow-hidden border border-[#D4AF37]/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#AA822B] to-[#F3D079] transition-all duration-700"
                    style={{ width: `${selectedCharacter.stats.wisdom}%` }}
                  />
                </div>
              </div>

              {/* Stat 2: Válečnické schopnosti */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#A8A29E]">Válečnictví a odvaha</span>
                  <span className="font-mono font-bold text-[#E5C158]">{selectedCharacter.stats.martial}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#1F1C18] overflow-hidden border border-[#D4AF37]/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#AA822B] to-[#F3D079] transition-all duration-700"
                    style={{ width: `${selectedCharacter.stats.martial}%` }}
                  />
                </div>
              </div>

              {/* Stat 3: Diplomacie */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#A8A29E]">Diplomacie a vyjednávání</span>
                  <span className="font-mono font-bold text-[#E5C158]">{selectedCharacter.stats.diplomacy}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#1F1C18] overflow-hidden border border-[#D4AF37]/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#AA822B] to-[#F3D079] transition-all duration-700"
                    style={{ width: `${selectedCharacter.stats.diplomacy}%` }}
                  />
                </div>
              </div>

              {/* Stat 4: Politický vliv */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#A8A29E]">Vliv a autorita na dvoře</span>
                  <span className="font-mono font-bold text-[#E5C158]">{selectedCharacter.stats.influence}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#1F1C18] overflow-hidden border border-[#D4AF37]/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#AA822B] to-[#F3D079] transition-all duration-700"
                    style={{ width: `${selectedCharacter.stats.influence}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#D4AF37]/15 text-[11px] text-[#A8A29E]">
                <span>Typ zbraně: </span>
                <span className="text-[#F3EFE6] font-medium">{selectedCharacter.details.weapon}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        DETAILED DOSSIER MODAL
        ========================================================================
      */}
      {dossierModalChar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-black/80 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#151310] border border-[#D4AF37]/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(212,175,55,0.3)] text-[#F3EFE6]">
            <button
              onClick={() => setDossierModalChar(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full border border-[#D4AF37]/40 text-[#E5C158] hover:text-white"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">{dossierModalChar.avatarIcon}</span>
              <div>
                <h3 className="font-cinzel text-2xl font-bold text-[#FFF0B8]">
                  {dossierModalChar.name}
                </h3>
                <p className="text-xs text-[#D4AF37]">{dossierModalChar.title}</p>
              </div>
            </div>

            <GoldDiamondDivider className="my-3" />

            <div className="space-y-4 text-sm text-[#D5D0C7]">
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#E5C158] mb-1">
                  Věrnost a přísaha:
                </h4>
                <p className="bg-[#1C1813] p-3 rounded-lg border border-[#D4AF37]/20">
                  {dossierModalChar.details.allegiance}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#E5C158] mb-1">
                  Tajný záměr postavy:
                </h4>
                <p className="bg-[#1C1813] p-3 rounded-lg border border-[#D4AF37]/20">
                  {dossierModalChar.details.secretGoal}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#E5C158] mb-1">
                  Historický osud v kronikách:
                </h4>
                <p className="bg-[#1C1813] p-3 rounded-lg border border-[#D4AF37]/20">
                  {dossierModalChar.details.historicalFate}
                </p>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setDossierModalChar(null)}
                className="px-6 py-2.5 rounded-full border border-[#D4AF37] text-xs font-bold tracking-widest uppercase bg-[#D4AF37] text-[#0E0D0C]"
              >
                Zavřít spis
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
