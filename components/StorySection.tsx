"use client";

import React, { useState } from "react";
import { GoldDiamondDivider } from "./GoldDiamondDivider";
import { ScrollIcon, SwordIcon, ShieldCheckIcon } from "./Icons";

interface Chapter {
  id: number;
  year: string;
  roman: string;
  title: string;
  subtitle: string;
  summary: string;
  fullText: string;
  quote: string;
  source: string;
  keyFigure: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    year: "1174",
    roman: "I",
    title: "Korunován ve stínu malomocenství",
    subtitle: "Šestnáctiletý chlapec a neúprosný rozsudek osudu",
    summary:
      "V pouhých třinácti letech objevil učitel Vilém z Tyru chlapcovu necitlivost v paži – neklamnou známku lepry. V šestnácti byl Balduin korunován jeruzalémským králem.",
    fullText:
      "Když se chlapec ujal vlády, mnozí předpovídali okamžitý kolaps království. Balduin však odmítl ustoupit do stínu. Nasadil tepanou stříbrnou masku, která zahalovala postupující zkázu jeho tváře, a chopil se otěží státu s neobyčejnou rozhodností. Obklopil se moudrým regentem Raimondem z Tripolisu a ukázal dvoru, že síla panovníka nespočívá ve zdraví těla, nýbrž v neotřesitelné vůli ducha.",
    quote:
      "„Jeho tělo chřadlo, avšak jeho odvaha a jasný úsudek zahanbovaly i ty nejzkušenější válečníky křesťanstva.“",
    source: "Vilém z Tyru, Historia rerum in partibus transmarinis gestarum",
    keyFigure: "Balduin IV. & Vilém z Tyru",
  },
  {
    id: 2,
    year: "1177",
    roman: "II",
    title: "Zázrak u Montgisardu",
    subtitle: "Pět set rytířů proti přesile pětadvaceti tisíc",
    summary:
      "U pahorků Montgisardu padl mladý král na kolena před relikvií Pravého kříže. S hrstkou věrných rytířů a templářů rozdrtil Saladinovo vojsko.",
    fullText:
      "Saláh ad-Dín vtrhl do země s drtivou armádou a v přesvědčení, že Jeruzalém je bezbranný, nechal své šiky rozptýlit při drancování. Balduin, sužován prudkými horečkami, se nechal přivázat do sedla svého válečného oře. V čele pouhých 500 rytířů překvapil saracénský zadní voj. Úder byl tak divoký a nečekaný, že se Saladinova garda zhroutila a sám sultán stěží unikl na závodním velbloudu do bezpečí egyptské pouště.",
    quote:
      "„Mladý král, ač stravován smrtelnou chorobou, bojoval jako lev a jeho přítomnost vdechla vojsku nadlidskou sílu.“",
    source: "Kronika křížových výprav, rukopis z Akkonu",
    keyFigure: "Balduin IV., Odo de St. Amand & Saladin",
  },
  {
    id: 3,
    year: "1180",
    roman: "III",
    title: "Zrada v radě baronů",
    subtitle: "Intriky za zády nemocného krále",
    summary:
      "Zatímco král usiloval o mír a prosperitu říše, hrabiví baroni v čele s Renaudem de Châtillon bezohledně přepadali obchodní karavany.",
    fullText:
      "Vojenská rovnováha byla křehká. Balduin uzavřel čestné příměří se Saladinem, které umožňovalo svobodný obchod a pouť věřících všech vyznání. Avšak Renaud de Châtillon, zbojnický pán pouštní pevnosti Kerak, smlouvu cynicky porušil a napadl mírovou karavanu vezoucí i sultánovu sestru. Král musel ve zbývajících silách znovu nasednout na nosítka, aby zabránil totálnímu požáru a zachránil mír.",
    quote:
      "„Nepřítel za branami je nebezpečný, avšak falešný bratr u královského stolu je zkázou celé země.“",
    source: "Zápisy královské kanceláře v Jeruzalémě",
    keyFigure: "Renaud de Châtillon & Guy de Lusignan",
  },
  {
    id: 4,
    year: "1185",
    roman: "IV",
    title: "Poslední vůle a odkaz",
    subtitle: "Smrt krále a nezlomná pečeť cti",
    summary:
      "Ve věku pouhých 24 let Balduin IV. umírá. Do posledního dechu bojoval za budoucnost svého lidu a spravedlivou následnickou volbu.",
    fullText:
      "Na sklonku života oslepl a ztratil vládu nad končetinami, přesto svolal Nejvyšší soud království. Aby zabránil uchopení moci nezodpovědným Guyem de Lusignan, prosadil korunovaci malého synovce Balduina V. a správu svěřil osvědčenému regentovi Raimondovi z Tripolisu. Zanechal po sobě království sjednocené úctou k jeho nezměrnému hrdinství. Když zemřel, truchlili po něm nejen křesťané, ale i sám Saladin vzdal hold jeho neústupné vznešenosti.",
    quote:
      "„Dokud žil Balduin, Jeruzalém nemohl padnout. Jeho vůle byla pevnější než kamenné hradby Sionu.“",
    source: "Epitaf v bazilice Božího hrobu",
    keyFigure: "Balduin IV. & Balduin V.",
  },
];

export function StorySection() {
  const [activeChapter, setActiveChapter] = useState<Chapter>(CHAPTERS[0]);

  return (
    <section id="pribeh" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0E0D0C] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[#AA822B]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.28em] text-[#D4AF37] uppercase mb-2">
            Kroniky Svaté země
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-[#F3EFE6] mb-4">
            Příběh odvahy a osudu
          </h2>
          <p className="text-[#A8A29E] text-base leading-relaxed">
            Poznejte dramatické osudy Jeruzalémského království ve 12. století. Příběh krále, 
            jehož tělo chřadlo pod ranami malomocenství, ale jehož vůle dokázala vzdorovat celému světu.
          </p>
          <GoldDiamondDivider className="mt-8 max-w-md mx-auto" />
        </div>

        {/* 
          ========================================================================
          INTERACTIVE TIMELINE CHAPTER SELECTOR TABS
          ========================================================================
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {CHAPTERS.map((chap) => {
            const isActive = activeChapter.id === chap.id;
            return (
              <button
                key={chap.id}
                onClick={() => setActiveChapter(chap)}
                className={`relative p-4 sm:p-5 rounded-xl border text-left transition-all duration-300 ${
                  isActive
                    ? "bg-[#1C1813] border-[#F3D079] shadow-[0_0_25px_rgba(212,175,55,0.25)] -translate-y-1"
                    : "bg-[#14120F]/80 border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#181512]"
                }`}
              >
                {/* Active marker pill */}
                {isActive && (
                  <span className="absolute -top-2.5 left-4 px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase bg-[#D4AF37] text-[#0E0D0C]">
                    Zvolená kapitola
                  </span>
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="font-cinzel text-xs font-bold text-[#D4AF37]">
                    Kapitola {chap.roman}
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#A8A29E] px-2 py-0.5 rounded bg-[#0E0D0C] border border-[#D4AF37]/20">
                    {chap.year}
                  </span>
                </div>

                <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F3EFE6] line-clamp-1 mb-1">
                  {chap.title}
                </h3>
                <p className="text-[11px] text-[#A8A29E] line-clamp-2">
                  {chap.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* 
          ========================================================================
          ATMOSPHERIC TWO-COLUMN LORE DISPLAY
          ========================================================================
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Deep Lore & Narrative */}
          <div className="lg:col-span-7 bg-[#151310] rounded-2xl border border-[#D4AF37]/35 p-6 sm:p-10 relative overflow-hidden shadow-2xl">
            {/* Background watermark */}
            <div className="absolute top-4 right-4 text-8xl font-cinzel font-bold text-[#D4AF37]/5 select-none pointer-events-none">
              {activeChapter.roman}
            </div>

            <div className="flex items-center space-x-3 text-xs tracking-widest text-[#D4AF37] uppercase mb-4">
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <span>Kapitola {activeChapter.roman} • Rok {activeChapter.year}</span>
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FFF0B8] mb-3 leading-snug">
              {activeChapter.title}
            </h3>

            <p className="text-sm font-semibold text-[#D4AF37] mb-6">
              {activeChapter.subtitle}
            </p>

            <div className="space-y-4 text-[#D5D0C7] text-sm sm:text-base leading-relaxed font-sans">
              <p className="border-l-2 border-[#D4AF37]/60 pl-4 py-1 italic bg-[#D4AF37]/5 rounded-r">
                {activeChapter.summary}
              </p>
              <p className="text-justify">{activeChapter.fullText}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D4AF37]/20 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center space-x-2 text-[#A8A29E]">
                <ShieldCheckIcon className="w-4 h-4 text-[#D4AF37]" />
                <span>Klíčové postavy: <strong className="text-[#F3EFE6]">{activeChapter.keyFigure}</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <SwordIcon className="w-4 h-4" />
                <span>Kanonická událost ságy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Parchment Document & Historical Quote */}
          <div className="lg:col-span-5 space-y-6">
            {/* Parchment Citation Card */}
            <div className="decree-parchment rounded-2xl p-7 text-[#251A10] relative shadow-2xl border border-[#9A7B1C]/50">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#7A5B27]/30">
                <div className="flex items-center space-x-2">
                  <ScrollIcon className="w-5 h-5 text-[#6D4914]" />
                  <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#4E340E]">
                    Dobová kronika
                  </span>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#6D4914]">
                  Archiv Jeruzaléma
                </span>
              </div>

              <blockquote className="font-serif text-base sm:text-lg italic leading-relaxed mb-4 text-[#2C1D0D]">
                {activeChapter.quote}
              </blockquote>

              <p className="text-xs font-semibold text-[#57390F] text-right">
                — {activeChapter.source}
              </p>

              {/* Decorative Wax Seal on bottom left */}
              <div className="mt-6 pt-4 border-t border-[#7A5B27]/30 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#8A2424] border border-[#631414] shadow-md flex items-center justify-center text-red-100 text-xs font-bold">
                  ✠
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#3B250A] uppercase tracking-wider">
                    Královská pečeť ověřena
                  </p>
                  <p className="text-[10px] text-[#5C3D12]">Opatrováno v archivu Božího hrobu</p>
                </div>
              </div>
            </div>

            {/* Quick Lore Fact Box */}
            <div className="bg-[#14120F] rounded-xl border border-[#D4AF37]/25 p-5">
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#E5C158] mb-2 flex items-center space-x-2">
                <span>Věděli jste?</span>
              </h4>
              <p className="text-xs text-[#A8A29E] leading-relaxed">
                Balduin IV. navzdory svému fyzickému utrpení nikdy neodmítl vyjet do boje v čele svého vojska. 
                Jeho taktické schopnosti a schopnost sjednotit znesvářené křesťanské barony zajistily Jeruzalému
                desetiletí relativní stability v obklíčení nepřátelských říší.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
