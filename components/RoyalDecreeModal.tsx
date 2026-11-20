"use client";

import React, { useState, useEffect } from "react";
import { CloseIcon, ScrollIcon, CheckIcon, RoyalCrestIcon } from "./Icons";
import { GoldDiamondDivider } from "./GoldDiamondDivider";

export interface RealmChoice {
  id: "peace" | "war" | "diplomacy";
  title: string;
  subtitle: string;
  desc: string;
  quote: string;
  alignment: string;
  kingRelation: string;
  saracenRelation: string;
  orderRelation: string;
}

const CHOICES: RealmChoice[] = [
  {
    id: "peace",
    title: "Přijmout přísahu a hájit mír s králem",
    subtitle: "Cesta moudrosti a cti",
    desc: "Zpečetíte svou věrnost malomocnému králi Balduinovi IV. Podpoříte křehké příměří se Saladinem a zjednáte pořádek mezi vzpurnými křesťanskými barony.",
    quote: "„Král může být pohnut nemocí, ale jeho královská čest zůstává nezlomena.“",
    alignment: "Strážce královské koruny",
    kingRelation: "+40 (Nejvyšší důvěra)",
    saracenRelation: "+20 (Uznání vzájemné cti)",
    orderRelation: "-15 (Hněv templářských jestřábů)",
  },
  {
    id: "war",
    title: "Odmítnout a podpořit Renaudovo válečné tažení",
    subtitle: "Cesta meče a plamenů",
    desc: "Přidáte se k pánu z Keraku, Renaudovi de Châtillon. Vyhlásíte otevřený boj, přepadnete saracénské obchodní karavany v poušti a přitáhnete válku přímo k branám města.",
    quote: "„Mír je pro slabochy. Bůh si žádá vítězství mečem!“",
    alignment: "Válečný spojenec Keraku",
    kingRelation: "-50 (Ztráta královské milosti)",
    saracenRelation: "-60 (Totální vyhlazovací válka)",
    orderRelation: "+35 (Podpora válečných rytířů)",
  },
  {
    id: "diplomacy",
    title: "Vyslat tajné vyslance a vyjednávat se Saladinem",
    subtitle: "Cesta stínů a diplomacie",
    desc: "Vyšlete důvěryhodného posla do Saladinova tábora u Damašku. Zjistíte skutečné plány sultána a nabídnete tajnou záruku bezpečnosti poutníků bez vědomí fanatiků.",
    quote: "„Slova mohou zachránit tisíce životů tam, kde meče přinesou jen popel.“",
    alignment: "Levantský diplomat",
    kingRelation: "+15 (Tichý souhlas monarchy)",
    saracenRelation: "+45 (Respekt sultána Saladina)",
    orderRelation: "-30 (Podezření ze zrady víry)",
  },
];

interface RoyalDecreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveChoice: (choice: RealmChoice) => void;
  savedChoice?: RealmChoice | null;
}

export function RoyalDecreeModal({
  isOpen,
  onClose,
  onSaveChoice,
  savedChoice,
}: RoyalDecreeModalProps) {
  const [stage, setStage] = useState<"transition" | "decree" | "result">("decree");
  const [selectedChoice, setSelectedChoice] = useState<RealmChoice | null>(savedChoice || null);
  const [showVideoContainer, setShowVideoContainer] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (savedChoice) {
        setSelectedChoice(savedChoice);
        setStage("result");
      } else {
        setStage("decree");
      }
    }
  }, [isOpen, savedChoice]);

  if (!isOpen) return null;

  const handleSelectChoice = (choice: RealmChoice) => {
    setSelectedChoice(choice);
    onSaveChoice(choice);
    setStage("result");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-xl bg-black/85 animate-in fade-in duration-300">
      {/* Container Box */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-[#D4AF37]/50 bg-[#14120F] shadow-[0_0_60px_rgba(212,175,55,0.3)] text-[#F3EFE6] p-6 sm:p-10 my-auto">
        {/* Top Ornate Filigree Corner Accents */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/70 pointer-events-none" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/70 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/70 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/70 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-[#D4AF37]/40 text-[#E5C158] hover:text-[#FFF] hover:bg-[#D4AF37]/20 transition-all z-20"
          aria-label="Zavřít edikt"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* 
          ========================================================================
          CUSTOM VIDEO SLOT (Ready for custom MP4/WebM of King unrolling scroll)
          Users can drop in 'king-unroll.mp4' into public/ and activate it.
          ========================================================================
        */}
        {showVideoContainer && (
          <div className="mb-6 rounded-xl overflow-hidden border border-[#D4AF37]/40 bg-black relative">
            <video
              className="w-full h-64 object-cover"
              controls
              autoPlay
              muted
              poster="/hero-king.jpg"
            >
              {/* Custom video asset location */}
              <source src="/king-unroll.mp4" type="video/mp4" />
              <source src="/king-unroll.webm" type="video/webm" />
              Váš prohlížeč nepodporuje přehrávání videa.
            </video>
            <div className="p-2 text-center text-xs text-[#A8A29E] bg-[#0E0D0C]/80">
              Vložte vlastní video do souboru <code className="text-[#E5C158]">public/king-unroll.mp4</code>
            </div>
          </div>
        )}

        {/* 
          ========================================================================
          STAGE 1: THE READABLE ROYAL DECREE
          ========================================================================
        */}
        {stage === "decree" && (
          <div className="space-y-6">
            {/* Header / Royal Seal */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] mb-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <RoyalCrestIcon className="w-8 h-8 text-[#F3D079]" />
              </div>
              <p className="text-[11px] font-sans font-semibold tracking-[0.3em] uppercase text-[#D4AF37]">
                Královská kancelář Jeruzaléma • Anno Domini 1177
              </p>
              <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider gold-gradient-text uppercase">
                Tajný edikt krále Balduina IV.
              </h2>
              <p className="text-xs sm:text-sm text-[#A8A29E] italic max-w-xl mx-auto">
                „Kdo zradí mír v Jeruzalémě, zradí nejen krále, ale i duši této země.“
              </p>
            </div>

            <GoldDiamondDivider className="my-4" />

            {/* Parchment Box with Realistic Aged Look */}
            <div className="decree-parchment rounded-xl p-6 sm:p-8 font-serif leading-relaxed text-[#241A10] relative overflow-hidden shadow-inner border border-[#9A7B1C]/40">
              {/* Aged watermarks & royal stamp */}
              <div className="absolute right-6 top-6 w-24 h-24 rounded-full border-4 border-[#8B2323]/50 flex items-center justify-center rotate-12 opacity-80 pointer-events-none">
                <div className="w-20 h-20 rounded-full border-2 border-[#8B2323]/50 flex flex-col items-center justify-center text-[8px] font-bold tracking-wider uppercase text-[#8B2323]">
                  <span>SIGILLUM</span>
                  <span className="text-xs">✠</span>
                  <span>REGIS</span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-4 font-cinzel text-[#362208] border-b border-[#7B5B28]/30 pb-2">
                Z milosti Boží, král Jeruzalémský, svému věrnému poddanému:
              </h3>

              <p className="text-sm sm:text-base mb-4 text-[#2E2012]">
                Malomocenství stravuje mé tělo den za dnem, avšak má mysl zůstává bdělá a zrak nezkalený.
                Zatímco za řekou Jordán shromažďuje Saláh ad-Dín svá vojska, v mých vlastních hradbách
                číhá zhoubnější nebezpečí: pýcha pána z Keraku a těch, kdo touží utopit Svatou zemi
                v další zbytečné krvi.
              </p>

              <p className="text-sm sm:text-base mb-4 text-[#2E2012]">
                Příliš mnoho králů měří svou velikost počtem padlých. Já jsem však přísahal chránit
                každého obyvatele tohoto království – křesťana, žida i muslima. Nyní ti svěřuji
                královskou pečeť. Tvá volba určí, zda bude Jeruzalém přístavem míru, či popelem na poušti.
              </p>

              <div className="mt-4 pt-3 border-t border-[#7B5B28]/30 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#5A3E15]">
                <span>Dáno v Královském paláci v Jeruzalémě</span>
                <span className="font-cinzel text-base tracking-widest text-[#7B1C1C]">BALDUINUS REX</span>
              </div>
            </div>

            {/* Interactive Decision Prompts */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase text-center mb-4">
                Vyberte své rozhodnutí o osudu říše:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CHOICES.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectChoice(choice)}
                    className="group relative p-5 rounded-xl border border-[#D4AF37]/30 bg-[#1A1713]/90 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37] transition-all text-left flex flex-col justify-between hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] px-2 py-0.5 rounded bg-[#D4AF37]/10">
                          {choice.subtitle}
                        </span>
                        <ScrollIcon className="w-4 h-4 text-[#AA822B] group-hover:text-[#F3D079]" />
                      </div>
                      <h5 className="font-cinzel text-base font-bold text-[#F3EFE6] group-hover:text-[#FFF0B8] mb-2 leading-snug">
                        {choice.title}
                      </h5>
                      <p className="text-xs text-[#A8A29E] leading-relaxed mb-3">
                        {choice.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-[11px] font-medium text-[#E5C158]">
                      <span>Zvolit tuto cestu</span>
                      <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Video Toggle & Tip */}
            <div className="flex items-center justify-between pt-2 text-xs text-[#A8A29E]">
              <button
                onClick={() => setShowVideoContainer(!showVideoContainer)}
                className="hover:text-[#E5C158] underline underline-offset-4 decoration-[#D4AF37]/50"
              >
                {showVideoContainer ? "Skrýt video slot" : "Zobrazit video slot pro odrolování svitku"}
              </button>
              <span>Váš výběr ovlivní stav království a příběh.</span>
            </div>
          </div>
        )}

        {/* 
          ========================================================================
          STAGE 2: RESULT OF THE CHOICE (Allegiance sealed)
          ========================================================================
        */}
        {stage === "result" && selectedChoice && (
          <div className="space-y-6 text-center py-2 animate-in zoom-in-95 duration-300">
            {/* Sealed Wax Stamp Effect */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-950/80 border-2 border-red-700 shadow-[0_0_35px_rgba(220,38,38,0.5)] mx-auto">
              <span className="font-cinzel font-bold text-lg text-red-200 uppercase tracking-widest">
                ZPEČETĚNO
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-1">
                Královský osud byl vyřčen
              </p>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FFF0B8]">
                {selectedChoice.title}
              </h2>
              <p className="text-sm text-[#E5C158] font-cinzel mt-1">
                Titul: {selectedChoice.alignment}
              </p>
            </div>

            <p className="italic text-[#D5D0C7] max-w-lg mx-auto text-sm sm:text-base font-serif">
              {selectedChoice.quote}
            </p>

            <GoldDiamondDivider className="my-4" />

            {/* Impact Metrics Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
              <div className="p-4 rounded-xl border border-[#D4AF37]/30 bg-[#1A1815]">
                <p className="text-[10px] uppercase tracking-wider text-[#A8A29E] mb-1">Přízeň krále Balduina</p>
                <p className="text-sm font-bold text-[#E5C158]">{selectedChoice.kingRelation}</p>
              </div>
              <div className="p-4 rounded-xl border border-[#D4AF37]/30 bg-[#1A1815]">
                <p className="text-[10px] uppercase tracking-wider text-[#A8A29E] mb-1">Vztah se Saladinem</p>
                <p className="text-sm font-bold text-[#E5C158]">{selectedChoice.saracenRelation}</p>
              </div>
              <div className="p-4 rounded-xl border border-[#D4AF37]/30 bg-[#1A1815]">
                <p className="text-[10px] uppercase tracking-wider text-[#A8A29E] mb-1">Rada baronů a řády</p>
                <p className="text-sm font-bold text-[#E5C158]">{selectedChoice.orderRelation}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 rounded-full gold-gradient-btn text-[#161209] font-bold text-xs uppercase tracking-widest cursor-pointer hover:scale-105 transition-transform"
              >
                Vstoupit do království s touto volbou
              </button>
              <button
                onClick={() => setStage("decree")}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#D4AF37]/50 text-xs text-[#E5C158] hover:bg-[#D4AF37]/15 transition-all"
              >
                Změnit rozhodnutí
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
