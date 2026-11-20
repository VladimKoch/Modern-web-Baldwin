"use client";

import React, { useState } from "react";
import { GoldDiamondDivider } from "./GoldDiamondDivider";
import { ScrollIcon, CloseIcon, ChevronRightIcon } from "./Icons";

interface Article {
  id: number;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  fullContent: string[];
  author: string;
  readTime: string;
}

const ARTICLES: Article[] = [
  {
    id: 1,
    date: "14. listopadu 1177 (Aktualizace 1.4)",
    category: "Aktualizace hry",
    title: "Nová větev osudu: Bitva u Keraku a volba křižáckých rytířů",
    excerpt:
      "Do interaktivní ságy přibývá nová dramatická dějová linie. Rozhodněte, zda podpoříte obranu pouštní pevnosti, nebo se pokusíte zajmout vzpurného Renauda.",
    fullContent: [
      "V nejnovější aktualizaci naší interaktivní historické ságy 'Království osudu' otevíráme klíčovou kapitolu zaměřenou na střet u pevnosti Kerak.",
      "Hráči nyní mají možnost přímo zasáhnout do diplomatických jednání mezi králem Balduinem IV. a vyslanci Saladina. Každé rozhodnutí zásadním způsobem ovlivňuje soudržnost křižáckých baronů a stav královské pokladny.",
      "Byl přepracován také systém morálky jednotek a detailní taktická mapa Zajordánska s novými zvědnými misemi.",
    ],
    author: "Královský kronikář Radim",
    readTime: "4 minuty čtení",
  },
  {
    id: 2,
    date: "28. října 1177",
    category: "Historický vhled",
    title: "Skutečná tvář Balduina IV.: Co skrývala stříbrná maska?",
    excerpt:
      "Hluboká historická sonda do života mladého krále, jehož statečnost a diplomatická prozíravost udivovaly křesťanský i islámský svět.",
    fullContent: [
      "Málokterá postava středověku vzbuzuje tolik úcty a pohnutí jako Balduin IV., zvaný Malomocný. Nastoupil na trůn v době, kdy lepra byla považována za Boží trest i rozsudek společenské smrti.",
      "Namísto ústupu do ústraní kláštera se však mladý král ujal vlády s neslýchanou vervou. Vilém z Tyru, jeho vychovatel a arcibiskup, popsal chlapce jako mimořádně nadaného učedníka s hlubokou pamětí, milujícího jízdu na koni a historii.",
      "Jeho stříbrná maska nebyla pouze ochranou před pohledy dvořanů, ale stala se symbolem neotřesitelné královské důstojnosti, která přetrvala staletí.",
    ],
    author: "Prof. Jan z Ibelinu",
    readTime: "6 minut čtení",
  },
  {
    id: 3,
    date: "12. října 1177",
    category: "Vývojářský deník",
    title: "Atmosféra trůnního sálu: Zvuková kompozice louten a ohňů",
    excerpt:
      "Jak jsme tvořili zvukový design hry za použití autentických středověkých modů, orientálních nástrojů a praskotu pryskyřičných pochodní.",
    fullContent: [
      "Při vytváření atmosféry 'Království osudu' jsme usilovali o maximální věrnost dobovému akustickému zážitku 12. století v Levantě.",
      "Zvuková stopa kombinuje prvky byzantského liturgického zpěvu, starofrancouzských trubadúrských balad a arabského oudu. Trůnní sál je navíc oživen syntézou hořícího dřeva a vzdálených chrámových zvonů.",
      "Díky technologii Web Audio API můžete tento ambientní zážitek zažít přímo ve svém prohlížeči jediným kliknutím na ikonu zvuku v horní liště.",
    ],
    author: "Mistr zvuku Levanty",
    readTime: "3 minuty čtení",
  },
];

export function NewsSection() {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
      }, 3000);
    }
  };

  return (
    <section id="novinky" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#12100E] border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.28em] text-[#D4AF37] uppercase mb-2">
            Archiv královských depeší
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-[#F3EFE6] mb-4">
            Kroniky a novinky
          </h2>
          <p className="text-[#A8A29E] text-base leading-relaxed">
            Zápisy královských písařů, novinky z vývoje ságy a historické studie o životě v křižáckém Jeruzalémě.
          </p>
          <GoldDiamondDivider className="mt-8 max-w-md mx-auto" />
        </div>

        {/* 
          ========================================================================
          3-COLUMN DARK CARD GRID
          ========================================================================
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {ARTICLES.map((art) => (
            <article
              key={art.id}
              className="group relative bg-[#171411] rounded-2xl border border-[#D4AF37]/30 p-6 sm:p-7 flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono text-[#E5C158] font-semibold text-[11px] px-2.5 py-0.5 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30">
                    {art.category}
                  </span>
                  <span className="text-[#A8A29E] text-[11px]">{art.readTime}</span>
                </div>

                <p className="text-[11px] text-[#A8A29E] font-medium mb-2">
                  {art.date}
                </p>

                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#F3EFE6] group-hover:text-[#FFF0B8] mb-3 leading-snug transition-colors">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed mb-6">
                  {art.excerpt}
                </p>
              </div>

              {/* Bottom Action Link */}
              <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between">
                <span className="text-xs text-[#A8A29E] italic">Autor: {art.author}</span>
                <button
                  onClick={() => setActiveArticle(art)}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold tracking-wider uppercase text-[#D4AF37] group-hover:text-[#FFF0B8] group-hover:translate-x-1 transition-all"
                >
                  <span>Číst více</span>
                  <ChevronRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* 
          ========================================================================
          NEWSLETTER / ROYAL MESSENGER SUBSCRIPTION BOX
          ========================================================================
        */}
        <div className="relative rounded-2xl bg-gradient-to-r from-[#171411] via-[#1F1B15] to-[#171411] border border-[#D4AF37]/40 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] mb-1">
              <ScrollIcon className="w-6 h-6 text-[#F3D079]" />
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FFF0B8]">
              Královský posel do vaší schránky
            </h3>

            <p className="text-sm text-[#D5D0C7] max-w-lg mx-auto">
              Zadejte svou schránku a obdržíte pečetní list při každé nové kronice,
              kapitole příběhu či novém historickém ediktu.
            </p>

            {newsletterSubscribed ? (
              <div className="p-4 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] text-sm text-[#FFF0B8] font-cinzel font-bold max-w-md mx-auto animate-in zoom-in-95">
                ✠ Váš pečetní list byl zaznamenán v královské kanceláři. Děkujeme za věrnost!
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Váš e-mail pro depeše..."
                  className="w-full sm:flex-1 px-4 py-3 rounded-full bg-[#0E0D0C] border border-[#D4AF37]/40 text-sm text-[#F3EFE6] placeholder-[#A8A29E]/60 focus:outline-none focus:border-[#F3D079] focus:ring-1 focus:ring-[#F3D079]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-full gold-gradient-btn text-[#161209] font-bold text-xs uppercase tracking-widest cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] whitespace-nowrap"
                >
                  Odebírat edikty
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        ARTICLE READER MODAL
        ========================================================================
      */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-black/85 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#151310] border border-[#D4AF37]/60 rounded-2xl p-6 sm:p-10 shadow-[0_0_60px_rgba(212,175,55,0.35)] text-[#F3EFE6]">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full border border-[#D4AF37]/40 text-[#E5C158] hover:text-white hover:bg-[#D4AF37]/20 transition-all"
              aria-label="Zavřít článek"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <div className="space-y-3 mb-6">
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#D4AF37] px-2.5 py-0.5 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30">
                {activeArticle.category}
              </span>
              <p className="text-xs text-[#A8A29E]">{activeArticle.date} • {activeArticle.readTime}</p>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FFF0B8]">
                {activeArticle.title}
              </h3>
            </div>

            <GoldDiamondDivider className="my-4" />

            <div className="space-y-4 text-sm sm:text-base text-[#D5D0C7] leading-relaxed font-sans">
              {activeArticle.fullContent.map((par, i) => (
                <p key={i} className="text-justify">{par}</p>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#A8A29E]">
              <span>Zapsal: <strong className="text-[#F3EFE6]">{activeArticle.author}</strong></span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 rounded-full gold-gradient-btn text-[#161209] font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Zavřít kroniku
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
