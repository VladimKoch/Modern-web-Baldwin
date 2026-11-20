"use client";

import React, { useState } from "react";
import { GoldDiamondDivider } from "./GoldDiamondDivider";
import { MapPinIcon, ShieldCheckIcon, SwordIcon, CloseIcon } from "./Icons";

interface LocationPin {
  id: string;
  name: string;
  nativeTitle: string;
  faction: "koruna" | "baroni" | "saraceni" | "neutrální";
  factionName: string;
  coords: { x: number; y: number }; // Percentage position on the map
  strategicValue: string;
  garrison: string;
  lore: string;
  tacticalTip: string;
  specialAction: string;
}

const LOCATIONS: LocationPin[] = [
  {
    id: "jerusalem",
    name: "Jeruzalém (Al-Quds)",
    nativeTitle: "Hierosolyma • Město míru",
    faction: "koruna",
    factionName: "Královská koruna Balduina IV.",
    coords: { x: 50, y: 64 },
    strategicValue: "Nejvyšší (Sídlo trůnu a Božího hrobu)",
    garrison: "Královská garda + 300 rytířů + městská domobrana",
    lore: "Srdce křesťanského království. Zde sídlí malomocný král Balduin IV. v paláci u Davidovy věže. Město je posvátné pro křesťany, muslimy i židy.",
    tacticalTip: "Udržení vnitřního míru mezi náboženskými komunitami je jedinou zárukou, že město nebude obleženo.",
    specialAction: "Uspořádat slavnostní přísahu u Božího hrobu",
  },
  {
    id: "kerak",
    name: "Pevnost Kerak (Crac des Moabites)",
    nativeTitle: "Hrad v zemi Moáb",
    faction: "baroni",
    factionName: "Renaud de Châtillon (Jestřábi)",
    coords: { x: 62, y: 78 },
    strategicValue: "Vysoká (Kontrola karavanních cest mezi Egyptem a Sýrií)",
    garrison: "800 žoldnéřů a těžkých jezdců Renauda",
    lore: "Monstrózní pevnost na strmém skalním útesu za Mrtvým mořem. Renaud de Châtillon z ní bezohledně podniká loupežné výpady na poutnické a obchodní karavany.",
    tacticalTip: "Pevnost je téměř nedobytná ztečí. Saladin ji opakovaně obléhal za pomoci obřích katapultů.",
    specialAction: "Vyslat královské vyšetřovatele na kontrolu daní",
  },
  {
    id: "montgisard",
    name: "Montgisard (Poblíž Ramly)",
    nativeTitle: "Tell el-Džezer",
    faction: "koruna",
    factionName: "Bojiště královského triumfu",
    coords: { x: 42, y: 58 },
    strategicValue: "Symbolická (Místo zázračného vítězství roku 1177)",
    garrison: "Hlídková stanice a památník padlých rytířů",
    lore: "Místo, kde šestnáctiletý Balduin IV. s pouhými 500 rytíři a relikvií Pravého kříže zaskočil a na hlavu porazil 26 000 Saladinových bojovníků.",
    tacticalTip: "Otevřená rovina ideální pro drtivý úder těžké francké jízdy.",
    specialAction: "Vzdat poctu padlým rytířům a posvětit korouhev",
  },
  {
    id: "tiberias",
    name: "Tiberias (Genezaretské jezero)",
    nativeTitle: "Tabaríja",
    faction: "koruna",
    factionName: "Panství hraběnky Eschivy a Raimonda",
    coords: { x: 55, y: 38 },
    strategicValue: "Vysoká (Klíč k přístupu ke sladké vodě a Galileji)",
    garrison: "400 pěšáků a johanitská posádka",
    lore: "Půvabné město na břehu Genezaretského jezera. Spravováno moudrým Raimondem z Tripolisu. V létě 1187 se stane návnadou Saladina pro osudnou bitvu u Hattínu.",
    tacticalTip: "Pouštní planiny západně od jezera jsou v létě bezvodou výhní – kdo ztratí přístup k jezeru, zahyne žízní.",
    specialAction: "Doplnit zásoby vody a ryb pro posádku",
  },
  {
    id: "tripoli",
    name: "Hrabství Tripolis",
    nativeTitle: "Tarabulus • Pobřežní bašta",
    faction: "koruna",
    factionName: "Hrabě Raimond III.",
    coords: { x: 52, y: 16 },
    strategicValue: "Vysoká (Námořní přístav a spojení s Evropou)",
    garrison: "Námořní flotila + 600 zkušených rytířů",
    lore: "Bohaté křižácké hrabství s rozsáhlými olivovými háji a obchodem s hedvábím. Sídlo politicky nejzralejší frakce křesťanské Levanty.",
    tacticalTip: "Přístav zajišťuje stálý přísun posil z Janova a Benátek.",
    specialAction: "Přijmout benátské obchodní lodě a vybrat clo",
  },
  {
    id: "damascus",
    name: "Damašek (Dimašk)",
    nativeTitle: "Oáza Ghúta • Perla Orientu",
    faction: "saraceni",
    factionName: "Ajjúbovský sultanát (Saladin)",
    coords: { x: 74, y: 24 },
    strategicValue: "Extrémní (Vojenská a kulturní metropole islámu)",
    garrison: "Královská mamlúcká garda a tisíce lučištníků",
    lore: "Starobylé město obklopené bujnými zahradami. Zde Saladin plánuje sjednocení muslimských emirátů a přijímá poselstva z celého světa.",
    tacticalTip: "Město je chráněno mohutnou citadelou. Přímý útok křižáků by byl sebevraždou.",
    specialAction: "Vyslat tajného vyslance se zprávou o míru",
  },
  {
    id: "acre",
    name: "Akkon (St. Jean d'Acre)",
    nativeTitle: "Ptolemais • Brána království",
    faction: "koruna",
    factionName: "Templáři a Špitálníci",
    coords: { x: 46, y: 35 },
    strategicValue: "Kritická (Hlavní obchodní a válečný přístav)",
    garrison: "Templářský hrad a stálá stráž přístavu",
    lore: "Nejrušnější přístav v Levantě. Zde se vyloďují poutníci, rytíři z Evropy a proudí zboží z Dálného východu.",
    tacticalTip: "Masivní dvojité mořské hradby s Věží much činí z přístavu nedobytnou pevnost.",
    specialAction: "Zkontrolovat zásoby obilí v sýpkách špitálníků",
  },
];

export function RealmMapSection() {
  const [selectedPin, setSelectedPin] = useState<LocationPin>(LOCATIONS[0]);
  const [filterFaction, setFilterFaction] = useState<string>("all");
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const filteredLocations = LOCATIONS.filter((loc) => {
    if (filterFaction === "all") return true;
    return loc.faction === filterFaction;
  });

  const handleExecuteAction = (actionText: string) => {
    setActionFeedback(`Příkaz byl vydán: „${actionText}“. Zpráva doručena královským poslem.`);
    setTimeout(() => setActionFeedback(null), 4500);
  };

  return (
    <section id="mapa" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0E0D0C] border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-[0.28em] text-[#D4AF37] uppercase mb-2">
            Strategická kartografie
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-[#F3EFE6] mb-4">
            Interaktivní mapa Svaté země
          </h2>
          <p className="text-[#A8A29E] text-base leading-relaxed">
            Klikněte na pulzující zlaté body na mapě říše a odhalte strategický význam pevností,
            dislokaci posádek a klíčová bojiště.
          </p>
          <GoldDiamondDivider className="mt-8 max-w-md mx-auto" />
        </div>

        {/* Faction Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setFilterFaction("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
              filterFaction === "all"
                ? "bg-[#D4AF37] text-[#0E0D0C] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                : "bg-[#14120F] text-[#A8A29E] border-[#D4AF37]/30 hover:border-[#D4AF37]"
            }`}
          >
            Všechny lokace
          </button>
          <button
            onClick={() => setFilterFaction("koruna")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
              filterFaction === "koruna"
                ? "bg-[#D4AF37] text-[#0E0D0C] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                : "bg-[#14120F] text-[#A8A29E] border-[#D4AF37]/30 hover:border-[#D4AF37]"
            }`}
          >
            Královská koruna
          </button>
          <button
            onClick={() => setFilterFaction("baroni")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
              filterFaction === "baroni"
                ? "bg-[#D4AF37] text-[#0E0D0C] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                : "bg-[#14120F] text-[#A8A29E] border-[#D4AF37]/30 hover:border-[#D4AF37]"
            }`}
          >
            Jestřábi z Keraku
          </button>
          <button
            onClick={() => setFilterFaction("saraceni")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
              filterFaction === "saraceni"
                ? "bg-[#D4AF37] text-[#0E0D0C] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                : "bg-[#14120F] text-[#A8A29E] border-[#D4AF37]/30 hover:border-[#D4AF37]"
            }`}
          >
            Ajjúbovský sultanát
          </button>
        </div>

        {/* 
          ========================================================================
          MAP CONTAINER & DOSSIER PANEL GRID
          ========================================================================
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map Visual Frame */}
          <div className="lg:col-span-7 bg-[#14120F] rounded-2xl border border-[#D4AF37]/45 p-4 sm:p-6 shadow-2xl relative overflow-hidden">
            {/* Map Header bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D4AF37]/20 text-xs text-[#E5C158]">
              <span className="font-cinzel font-bold tracking-widest uppercase">
                Terra Sancta • Křižácká Levanta
              </span>
              <span className="text-[10px] text-[#A8A29E] font-mono">
                Vyberte bod pro detail
              </span>
            </div>

            {/* Stylized Medieval Cartography Board */}
            <div className="relative w-full h-[460px] sm:h-[540px] rounded-xl bg-[#1A1713] border border-[#D4AF37]/25 overflow-hidden select-none">
              {/* Map background parchment grid & topography */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 48% 60%, rgba(212,175,55,0.12) 0%, transparent 70%),
                    linear-gradient(to right, rgba(212,175,55,0.06) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(212,175,55,0.06) 1px, transparent 1px)
                  `,
                  backgroundSize: "100% 100%, 36px 36px, 36px 36px",
                }}
              />

              {/* Mediterranean Sea outline representation (West) */}
              <div className="absolute top-0 bottom-0 left-0 w-[30%] bg-blue-950/20 border-r border-blue-400/20 pointer-events-none flex flex-col items-center justify-center">
                <span className="text-[10px] uppercase font-cinzel tracking-[0.3em] text-blue-300/40 -rotate-90">
                  Mare Mediterraneum
                </span>
              </div>

              {/* Jordan River & Dead Sea representation (East) */}
              <div className="absolute top-[35%] bottom-[15%] left-[58%] w-[2px] bg-cyan-700/30 pointer-events-none" />
              <div className="absolute top-[68%] left-[57%] w-5 h-16 rounded-full bg-cyan-900/30 border border-cyan-500/20 pointer-events-none" />

              {/* Compass Rose Ornament */}
              <div className="absolute top-4 right-4 w-16 h-16 border border-[#D4AF37]/30 rounded-full flex items-center justify-center pointer-events-none opacity-60">
                <span className="text-[10px] font-cinzel font-bold text-[#E5C158] absolute top-1">N</span>
                <span className="text-[10px] font-cinzel font-bold text-[#D4AF37] absolute bottom-1">S</span>
                <span className="text-[10px] font-cinzel font-bold text-[#D4AF37] absolute left-1">W</span>
                <span className="text-[10px] font-cinzel font-bold text-[#D4AF37] absolute right-1">E</span>
                <div className="w-8 h-8 rotate-45 border border-[#D4AF37]/50" />
              </div>

              {/* Pulsing Interactive Map Pins */}
              {filteredLocations.map((loc) => {
                const isSelected = selectedPin.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedPin(loc)}
                    style={{
                      left: `${loc.coords.x}%`,
                      top: `${loc.coords.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    className="absolute z-20 group focus:outline-none cursor-pointer"
                    aria-label={`Zobrazit detail ${loc.name}`}
                  >
                    {/* Outer animated ripple */}
                    <div className="absolute -inset-2 rounded-full border border-[#D4AF37]/60 animate-pulse-ring-1 pointer-events-none" />

                    {/* Pin button */}
                    <div
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? "bg-[#D4AF37] scale-125 shadow-[0_0_20px_rgba(243,208,121,0.9)] border-2 border-white"
                          : "bg-[#18140D] border border-[#F3D079] group-hover:scale-110 group-hover:border-white"
                      }`}
                    >
                      <MapPinIcon
                        className={`w-4 h-4 ${
                          isSelected ? "text-[#0E0D0C]" : "text-[#F3D079]"
                        }`}
                      />
                    </div>

                    {/* Floating label badge */}
                    <div
                      className={`absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-cinzel font-bold tracking-wider transition-all pointer-events-none ${
                        isSelected
                          ? "bg-[#D4AF37] text-[#0E0D0C] shadow-lg"
                          : "bg-[#0E0D0C]/90 text-[#F3EFE6] border border-[#D4AF37]/40 group-hover:text-[#FFF0B8]"
                      }`}
                    >
                      {loc.name.split(" ")[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Map Legend */}
            <div className="mt-4 flex flex-wrap items-center justify-between text-[11px] text-[#A8A29E] pt-2 border-t border-[#D4AF37]/20">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                  <span>Královská koruna</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  <span>Kerak / Páni</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span>Sultanát</span>
                </span>
              </div>
              <span>Měřítko: 1 palec = 25 lig</span>
            </div>
          </div>

          {/* Right: Selected Location Dossier Card */}
          <div className="lg:col-span-5 bg-[#171411] rounded-2xl border border-[#D4AF37]/40 p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D4AF37]/20">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#D4AF37] px-2.5 py-0.5 rounded bg-[#D4AF37]/10">
                Vojenský spis lokace
              </span>
              <span className="text-xs text-[#A8A29E]">{selectedPin.nativeTitle}</span>
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FFF0B8] mb-1">
              {selectedPin.name}
            </h3>

            <p className="text-xs font-semibold text-[#D4AF37] mb-4">
              Ovládající frakce: {selectedPin.factionName}
            </p>

            <div className="space-y-4 text-sm text-[#D5D0C7] mb-6">
              <p className="leading-relaxed bg-[#110F0D] p-3.5 rounded-lg border border-[#D4AF37]/20 text-justify">
                {selectedPin.lore}
              </p>

              <div className="p-3.5 rounded-lg bg-[#1D1914] border border-[#D4AF37]/30 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-[#E5C158] font-bold">
                  <ShieldCheckIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span>Strategická hodnota:</span>
                </div>
                <p className="text-xs text-[#F3EFE6]">{selectedPin.strategicValue}</p>

                <div className="pt-2 border-t border-[#D4AF37]/15">
                  <span className="text-xs text-[#A8A29E]">Dislokovaná posádka: </span>
                  <span className="text-xs text-[#E5C158] font-mono">{selectedPin.garrison}</span>
                </div>
              </div>

              <div className="text-xs italic text-[#A8A29E] border-l-2 border-[#D4AF37]/40 pl-3">
                Taktická poznámka: {selectedPin.tacticalTip}
              </div>
            </div>

            {/* Strategic Action Button */}
            <div className="pt-2">
              <button
                onClick={() => handleExecuteAction(selectedPin.specialAction)}
                className="w-full py-3 px-4 rounded-xl gold-gradient-btn text-[#161209] font-bold text-xs uppercase tracking-widest cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                <SwordIcon className="w-4 h-4" />
                <span>{selectedPin.specialAction}</span>
              </button>
            </div>

            {/* Action Feedback alert */}
            {actionFeedback && (
              <div className="mt-4 p-3 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37] text-xs text-[#FFF0B8] text-center animate-in fade-in">
                {actionFeedback}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
