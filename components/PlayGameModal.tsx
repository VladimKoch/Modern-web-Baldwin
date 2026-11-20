"use client";

import React, { useState } from "react";
import { CloseIcon, RoyalCrestIcon, SwordIcon, ShieldCheckIcon } from "./Icons";
import { GoldDiamondDivider } from "./GoldDiamondDivider";

interface PlayGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSealedOath: (title: string) => void;
}

interface Origin {
  id: string;
  name: string;
  title: string;
  icon: string;
  desc: string;
  bonus: string;
}

const ORIGINS: Origin[] = [
  {
    id: "knight",
    name: "Rytíř Božího hrobu",
    title: "Obránce kříže a poutníků",
    icon: "⚔️",
    desc: "Vycvičen v těžkém boji na koni. Přísahal položit život za ochranu svatých míst a spravedlnost.",
    bonus: "+30 Válečnictví, +15 Morálka vojska",
  },
  {
    id: "scholar",
    name: "Královský písař a diplomat",
    title: "Strážce knihovny a jazyků",
    icon: "📜",
    desc: "Hovoří plynně latinsky, řecky i arabsky. Zná složité spletence smluv a intrik na dvoře.",
    bonus: "+35 Diplomacie, +20 Vliv u krále",
  },
  {
    id: "baron",
    name: "Baron z pohraničí",
    title: "Pán hradu v Galileji",
    icon: "🏰",
    desc: "Vládce vlastního léna s těžkou jízdou. Musí vyvažovat zájmy svého rodu s loajalitou ke králi.",
    bonus: "+25 Velení posádkám, +20 Zlaťáky",
  },
  {
    id: "scout",
    name: "Levantský zvěd a kartograf",
    title: "Mistr stínů a pouštních stezek",
    icon: "🦅",
    desc: "Zná každou roklinu mezi Sinajem a Eufratem. Dokáže projít nepřátelským územím bez povšimnutí.",
    bonus: "+35 Průzkum terénu, +25 Taktická výhoda",
  },
];

export function PlayGameModal({ isOpen, onClose, onSealedOath }: PlayGameModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [charName, setCharName] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState<Origin>(ORIGINS[0]);
  const [dilemmaChoice, setDilemmaChoice] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleStartAdventure = () => {
    if (!charName.trim()) {
      setCharName("Rytíř z Ibelinu");
    }
    setStep(2);
  };

  const handleResolveDilemma = (choiceIndex: number) => {
    setDilemmaChoice(choiceIndex);
    setStep(3);
  };

  const handleFinish = () => {
    const finalTitle = `${charName || "Rytíř"} (${selectedOrigin.name})`;
    onSealedOath(finalTitle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-black/85 animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#14120F] border border-[#D4AF37]/60 rounded-2xl p-6 sm:p-10 shadow-[0_0_60px_rgba(212,175,55,0.35)] text-[#F3EFE6]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-[#D4AF37]/40 text-[#E5C158] hover:text-white hover:bg-[#D4AF37]/20 transition-all"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* 
          ========================================================================
          STEP 1: CHOOSE IDENTITY & NAME
          ========================================================================
        */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] mb-1">
                <RoyalCrestIcon className="w-7 h-7 text-[#F3D079]" />
              </div>
              <p className="text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase">
                Prolog interaktivní ságy
              </p>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold gold-gradient-text uppercase">
                Zvolte svou identitu v království
              </h2>
              <p className="text-xs sm:text-sm text-[#A8A29E] max-w-lg mx-auto">
                Kým budete v Jeruzalémě za vlády malomocného krále? Zvolte původ a zadejte své jméno.
              </p>
            </div>

            <GoldDiamondDivider className="my-3" />

            {/* Name Input */}
            <div className="max-w-md mx-auto">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
                Jméno vašeho hrdiny:
              </label>
              <input
                type="text"
                value={charName}
                onChange={(e) => setCharName(e.target.value)}
                placeholder="např. Bohumil z Ibelinu, Anna z Antiochie..."
                className="w-full px-4 py-3 rounded-xl bg-[#0E0D0C] border border-[#D4AF37]/40 text-sm text-[#F3EFE6] placeholder-[#A8A29E]/50 focus:outline-none focus:border-[#F3D079] focus:ring-1 focus:ring-[#F3D079]"
              />
            </div>

            {/* Origin Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {ORIGINS.map((orig) => {
                const isSelected = selectedOrigin.id === orig.id;
                return (
                  <button
                    key={orig.id}
                    onClick={() => setSelectedOrigin(orig)}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#1F1B15] border-[#F3D079] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                        : "bg-[#161411] border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#1A1713]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2.5 mb-2">
                        <span className="text-2xl">{orig.icon}</span>
                        <div>
                          <h4 className="font-cinzel text-sm font-bold text-[#F3EFE6]">
                            {orig.name}
                          </h4>
                          <p className="text-[10px] text-[#D4AF37]">{orig.title}</p>
                        </div>
                      </div>
                      <p className="text-xs text-[#A8A29E] leading-relaxed mb-3">
                        {orig.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#D4AF37]/15 text-[10px] font-mono font-semibold text-[#E5C158]">
                      {orig.bonus}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next button */}
            <div className="text-center pt-4">
              <button
                onClick={handleStartAdventure}
                className="px-8 py-3.5 rounded-full gold-gradient-btn text-[#161209] font-bold text-xs uppercase tracking-widest cursor-pointer hover:scale-105 transition-transform"
              >
                Předstoupit před krále Balduina →
              </button>
            </div>
          </div>
        )}

        {/* 
          ========================================================================
          STEP 2: ROYAL COURT DILEMMA
          ========================================================================
        */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase">
                První královská audience
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FFF0B8]">
                Dilema v trůnním sále
              </h2>
            </div>

            <div className="decree-parchment rounded-xl p-6 text-[#241A10] font-serif leading-relaxed shadow-inner border border-[#9A7B1C]/50">
              <p className="mb-3 text-sm sm:text-base">
                Stojíte v potemnělém trůnním sále paláce v Jeruzalémě. Vzduch voní kadidlem a smůlou
                z plápolajících pochodní. Před vámi sedí král Balduin IV. v bílém rouchu, tvář
                zahalena stříbrnou maskou.
              </p>
              <p className="mb-3 text-sm sm:text-base font-semibold text-[#442C0D]">
                „Vítej, {charName || "statečný věrný"}. Právě dorazil posel ze Zajordánska. Renaud de Châtillon
                přepadl další karavanu a uvěznil sultánovy kupce. Saladinovy jízdní oddíly už stojí na břehu Jordánu
                a žádají okamžité propuštění a náhradu, jinak vytáhnou na Jeruzalém. Mí baroni křičí, že vyjednávat
                je slabost. Jaká je tvá rada, věrný příteli?“
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleResolveDilemma(1)}
                className="w-full p-4 rounded-xl border border-[#D4AF37]/35 bg-[#171411] hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#F3EFE6] group-hover:text-[#FFF0B8]">
                    1. Poslat královskou gardu k pevnosti Kerak a donutit Renauda karavanu vydat
                  </h4>
                  <ShieldCheckIcon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <p className="text-xs text-[#A8A29E]">
                  Zákon krále musí platit pro každého. Tímto krokem zachováte mír se Saladinem, ale riskujete vzpouru baronů.
                </p>
              </button>

              <button
                onClick={() => handleResolveDilemma(2)}
                className="w-full p-4 rounded-xl border border-[#D4AF37]/35 bg-[#171411] hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#F3EFE6] group-hover:text-[#FFF0B8]">
                    2. Svolat veškeré lenní vojsko a vyjet Saladinovi vstříc u řeky Jordán
                  </h4>
                  <SwordIcon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <p className="text-xs text-[#A8A29E]">
                  Ukážete sílu a odhodlání bránit hranice. Baroni vás budou oslavovat, ale Svatou zemi čeká krvavá válka.
                </p>
              </button>

              <button
                onClick={() => handleResolveDilemma(3)}
                className="w-full p-4 rounded-xl border border-[#D4AF37]/35 bg-[#171411] hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#F3EFE6] group-hover:text-[#FFF0B8]">
                    3. Vyplatit náhradu ze své či královské pokladny a tajně vyslat zvědy do Damašku
                  </h4>
                  <span className="text-[#D4AF37] text-lg">⚜️</span>
                </div>
                <p className="text-xs text-[#A8A29E]">
                  Diplomatický manévr, který získá drahocenný čas na sklizeň obilí a posílení jeruzalémských hradeb.
                </p>
              </button>
            </div>
          </div>
        )}

        {/* 
          ========================================================================
          STEP 3: PROLOGUE OUTCOME & ROYAL CERTIFICATE OF HONOR
          ========================================================================
        */}
        {step === 3 && (
          <div className="space-y-6 text-center py-2 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              <span className="text-3xl">📜</span>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-1">
                Královský edikt schválen
              </p>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FFF0B8]">
                Váš osud byl zpečetěn
              </h2>
            </div>

            {/* Royal Certificate of Allegiance */}
            <div className="decree-parchment rounded-xl p-6 sm:p-8 text-[#241A10] font-serif max-w-lg mx-auto shadow-2xl border border-[#8B6E2C]">
              <div className="text-center pb-3 mb-4 border-b border-[#7B5B28]/30">
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#634418]">
                  Království jeruzalémské • Sigillum Fidelitatis
                </p>
                <h3 className="font-cinzel text-xl font-bold text-[#3B250A]">
                  Královský glejt cti
                </h3>
              </div>

              <p className="text-sm leading-relaxed mb-4 text-[#2B1B09]">
                Tímto stvrzujeme, že <strong>{charName || "Statečný rytíř"}</strong>, působící jako <strong>{selectedOrigin.name}</strong>, 
                přestoupil před tvář krále Balduina IV. a svou radou prokázal věrnost osudu celé říše.
              </p>

              <div className="p-3 rounded bg-[#7A5B27]/15 border border-[#7A5B27]/30 text-xs font-sans text-left space-y-1">
                <p><strong>Zvolená cesta:</strong> {dilemmaChoice === 1 ? "Prosazení práva a míru" : dilemmaChoice === 2 ? "Válečné tažení mečem" : "Diplomacie a tajná dohoda"}</p>
                <p><strong>Přízeň koruny:</strong> +35 bodů autority</p>
                <p><strong>Udělený titul:</strong> Ochránce královského tajemství</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#7B5B28]/30 flex items-center justify-between text-xs font-bold text-[#5A3E15]">
                <span>Pečetěno v Jeruzalémě</span>
                <span className="font-cinzel text-sm text-[#7B1C1C]">BALDUIN IV. REX</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleFinish}
                className="px-8 py-3.5 rounded-full gold-gradient-btn text-[#161209] font-bold text-xs uppercase tracking-widest cursor-pointer hover:scale-105 transition-transform"
              >
                Vstoupit do interaktivního světa
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
