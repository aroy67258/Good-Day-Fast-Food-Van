import React from 'react';
import { Sparkles, UtensilsCrossed, ChevronDown } from 'lucide-react';
import { BRANDING } from '../../data/branding';

interface HeroSectionProps {
  scrollProgress?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[78vh] sm:min-h-[88vh] md:min-h-screen flex flex-col justify-between overflow-hidden bg-transparent"
    >
      {/* Localized soft gradient behind text on the left (max 30-35%), keeping center & right food counter 100% bright and clear */}
      <div className="absolute inset-y-0 left-0 w-full md:w-7/12 bg-gradient-to-r from-black/35 via-black/15 to-transparent pointer-events-none z-10" />

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 sm:pt-28 md:pt-36 pb-8 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl space-y-3 sm:space-y-4">
          {/* Street Food Vegetarian Assurance Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15803D]/40 border border-[#22C55E]/60 text-[#86EFAC] text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-md backdrop-blur-md w-fit">
            <Sparkles className="w-3.5 h-3.5 text-[#FDE047] flex-shrink-0" />
            <span>100% Pure Vegetarian Street Food</span>
          </div>

          {/* Main Brand Title — Single Primary SEO H1 */}
          <h1 className="space-y-0.5 sm:space-y-1">
            <span className="block text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight font-display leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              GOOD DAY
            </span>
            <span className="block text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] via-[#FBBF24] to-[#F59E0B] tracking-wide font-display drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              FAST FOOD VAN
            </span>
          </h1>

          {/* Subtitle & Tagline */}
          <p className="text-sm sm:text-base md:text-lg text-white font-medium max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Fresh Vegetarian Street Food — Handcrafted Burgers, Wok-Tossed Chowmein, Steamed Momos &amp; Sizzling Starters.
          </p>

          <p className="text-xs sm:text-sm text-[#FDE047] font-bold tracking-wider drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]">
            ★ {BRANDING.slogan} ★
          </p>

          {/* Call to Actions (Touch-friendly 46px height buttons) */}
          <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={scrollToMenu}
              className="min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#C21807] via-[#A8170B] to-[#C21807] hover:brightness-115 border border-[#F5A623]/70 text-white font-bold text-sm sm:text-base shadow-xl active:scale-95 transition-transform cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4 text-[#FEF08A]" />
              <span>Explore Street Menu</span>
            </button>

            <button
              onClick={scrollToStory}
              className="min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-900/85 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700 font-semibold text-sm sm:text-base backdrop-blur-md active:scale-95 transition-transform cursor-pointer"
            >
              <span>Our Story</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-20 pb-4 sm:pb-6 flex flex-col items-center justify-center text-stone-300 pointer-events-none">
        <span className="text-[11px] uppercase tracking-widest font-semibold text-stone-400 mb-0.5 drop-shadow">
          Scroll to explore
        </span>
        <ChevronDown className="w-4 h-4 text-[#F5A623] animate-bounce" />
      </div>
    </section>
  );
};
