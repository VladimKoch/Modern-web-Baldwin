# Království osudu (Kingdom of Destiny) — Interaktivní historická sága

Kompletní, imerzivní a interaktivní webová aplikace postavená na moderním stacku **Next.js 16**, **React 19** a **Tailwind CSS v4**, věrně realizovaná dle grafického návrhu a filmové atmosféry vlády malomocného krále **Balduina IV.** v křižáckém Jeruzalémě 12. století.

---

## 🌟 Hlavní funkce & Realizované požadavky

### 1. Duální filmový systém: Scroll-Driven zvednutí ruky & Bojové povstání z trůnu
- **A. Scroll-Driven pozvednutí ruky (`king-rise-hand.mp4`):**
  - **Klidový výchozí stav (`IDLE_SEATED`):** Král sedí na trůnu s rukou na opěradle (`0.0s`).
  - **Sticky kontejner (`h-[220vh]`):** Hero sekce je při rolování ukotvena (`sticky top-0 h-screen`), takže obrazovka neujíždí dříve, než král plně dokončí gesto.
  - **Plynulý pohyb bez trhání:** Při rolování dolů se video plynule interpoluje z `0.0s` na `2.2s` (král majestátně pozvedá pravou ruku a naklání hlavu k ediktu).
  - **Plně reverzibilní:** Posun zpět nahoru plynule vrací ruku dolů na opěradlo (`0.0s`).
  - **Přechod do příběhu:** Až po projetí celého gesta (při scrollu nad 100vh) hero sekce plynule odroluje do sekce *Příběh*.
  - **Pulzující hotspot na svitku:** Zůstává dokonale ukotven na králově klíně, protože levá ruka se svitkem se při zvedání pravé ruky nepohybuje.

- **B. Kliknutí na „HRÁT NYNÍ“ -> Povstání krále (`king-rising-from-throne.mp4`):**
  - Spustitelné kdykoliv kliknutím na tlačítko **„HRÁT NYNÍ“** (v horní liště i v Hero sekci).
  - **Plynulý návrat zvednuté ruky bez přeskočení stránky:** Pokud uživatel klikne na „HRÁT NYNÍ“ ve chvíli, kdy má král ruku částečně či zcela zvednutou, výška kontejneru se nesmrští a stránka **nikdy neposkočí ani neroluje odspodu**. Web zůstává na obrazovce dokonale statický, ruka krále plynule klesne zpět dolů na opěradlo (`0.0s`), texty zmizí a teprve poté začne král povstávat.
  - Levý text i hotspot plynule zmizí (`opacity-0 duration-700`), aby byl král zcela nezakrytý.
  - Video povstání se přehraje od `0.0s` do `4.96s` (král vstává do bojové pozice před trůnem).
  - Po skončení se aktivuje stav **`STANDING_READY`** a zobrazí se královský velitelský panel s volbami:
    - **„Vstoupit do hry (Složit přísahu)“** – otevírá prologové textové RPG.
    - **„Usadit krále“** – spustí zpětný přechod do sedu.

- **C. Kliknutí na „Usadit krále“ -> Návrat na trůn (`king-sitting-back.mp4`):**
  - Po kliknutí na **„Usadit krále“** panel okamžitě zmizí.
  - **Stoprocentně eliminováno probliknutí sedícího krále:** Vrstva stojícího krále zůstává zachována pod novou vrstvou na z-indexu 10 a její čas se neresetuje na 0.0s dříve, než video usedání dohraje do konce.
  - Video usednutí se přehraje od `0.0s` do `4.96s` (odmítavé gesto rukou, usednutí na trůn).
  - Po dohrání se scéna čistě vrátí do klidového stavu sedícího krále **bez jakéhokoliv probliknutí stojícího snímku**.
  - Hero sekce se znovu rozsvítí a je opět připravena jak na rolování s rukou, tak na opětovné povstání.

- **D. Kliknutí na „[ ČÍST POSELSTVÍ ]“ -> Rozvinutí a svinutí svitku (`king-reading.mp4` a `king-stop-reading.mp4`):**
  - **Spuštění:** Kliknutím na pulzující hotspot na svitku v králových rukách (nebo mobilní tlačítko) se ověří pozice pravé ruky; pokud byla ruka zvednuta ze scrollu, plynule klesne zpět bez poskočení stránky.
  - **Rozvinutí svitku (`king-reading.mp4`):** UI hero sekce plynule ustoupí a video se přehraje od `0.0s` do `4.96s` (král bere svitek do rukou, rozbaluje jej a začíná číst).
  - **Zobrazení ediktu (`DECREE_OPEN`):** Po dohrání videa se otevře královský edikt s volbou osudu říše (`RoyalDecreeModal`), přičemž král na pozadí drží rozvinutý svitek.
  - **Zavření a návrat na trůn (`king-stop-reading.mp4`):** Po zavření okna (křížkem či výběrem přísahy) video rozvinutého svitku drží finální snímek pod novou vrstvou (z-index 10) bez probliknutí, zatímco video `king-stop-reading.mp4` na z-indexu 20 plynule svine svitek zpět a král spočine na trůnu v klidovém stavu (`IDLE_SEATED`). Hero sekce a texty se opět rozsvítí.

### 2. Vizuální identita & Designový systém
- **Barevná paleta:** Obsidiánová čerň (`#0E0D0C` až `#161412`), královské kovové zlato (`#D4AF37`, `#E5C158`, `#AA822B`, `#F3D079`), pergamenová křída (`#F3EFE6`).
- **Typografie:** Serif **Cinzel** & **Cinzel Decorative** pro nadpisy, **Plus Jakarta Sans** pro plynulý text.
- **Filigrán:** 1px zlatá linka `GoldDiamondDivider` s centrovaným kosočtvercem pod hlavičkou i sekcemi.
- **Pevné rozměry SVG:** Všechny ikony i logo mají fixní rozměry, zabraňující jakémukoliv roztažení.

### 3. Imerzivní architektura pod přehybem (Below the fold)
1. **Příběh (The Story & Lore):** Časová osa 4 kapitol s pergamenovou citací z kroniky arcibiskupa Viléma z Tyru.
2. **Postavy (Characters Showcase):** 5 klíčových osobností s atributy a detailními spisy.
3. **Interaktivní mapa Svaté země:** Stylizovaná mapa Levanty s pulzujícími body a taktickými rozkazy.
4. **Novinky & Kroniky:** 3sloupcový grid s čtečkou kronik a odběrem depeší.
5. **Minihra „HRÁT NYNÍ“:** Prologové textové RPG s tvorbou identity a královským glejtem cti.
6. **Zvuková atmosféra trůnního sálu:** Generátor praskajícího ohně a chorálu přes Web Audio API.

---

## 🚀 Spuštění projektu

```bash
npm run dev
```
Otevřete [http://localhost:3000](http://localhost:3000).
