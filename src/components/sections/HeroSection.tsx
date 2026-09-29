import React from 'react';
import { HeroVanCanvas } from '../3d/HeroVanCanvas';
import { Sparkles, UtensilsCrossed } from 'lucide-react';
import { BRANDING } from '../../data/branding';

interface HeroSectionProps {
  scrollProgress: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollProgress }) => {
  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden flex flex-col justify-between">
      {/* Background 3D Van Scene with Subtle Scroll Parallax */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <HeroVanCanvas scrollProgress={scrollProgress} />
      </div>

      {/* Subtle Top & Bottom Gradient overlays to blend typography seamlessly */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#141210] via-transparent to-[#141210]/60 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-r from-[#141210]/85 via-[#141210]/40 to-transparent pointer-events-none z-10" />

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 sm:pt-32 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl space-y-4">
          {/* Street Food Vegetarian Assurance Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15803D]/30 border border-[#22C55E]/50 text-[#86EFAC] text-xs font-bold tracking-widest uppercase shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
            <span>100% Pure Vegetarian Street Food</span>
          </div>

          {/* Main Brand Titles */}
          <div className="space-y-1">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight font-display leading-[1.05]">
              GOOD DAY
            </h1>
            <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] via-[#FBBF24] to-[#F59E0B] tracking-wide font-display">
              FAST FOOD VAN
            </p>
          </div>

          {/* Subtitle & Tagline */}
          <p className="text-lg sm:text-xl text-stone-300 font-medium max-w-lg leading-relaxed">
            {BRANDING.headline} — Handcrafted Burgers, Wok-Tossed Chowmein, Steamed Momos & Sizzling Starters.
          </p>

          <p className="text-xs sm:text-sm text-[#FDE047] font-semibold tracking-wider">
            ★ {BRANDING.slogan} ★
          </p>

          {/* Call to Actions (Normal Page Scroll Navigation) */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToMenu}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#C21807] via-[#9E1B1B] to-[#C21807] hover:brightness-110 border border-[#F5A623]/60 text-white font-bold text-sm sm:text-base shadow-warm transition-all transform active:scale-95"
            >
              <UtensilsCrossed className="w-4 h-4 text-[#FEF08A]" />
              <span>Explore Street Menu</span>
            </button>

            <button
              onClick={scrollToStory}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700/80 font-semibold text-sm sm:text-base backdrop-blur-sm transition-all"
            >
              <span>Our Story</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-20 pb-8 flex flex-col items-center justify-center text-stone-400 pointer-events-none">
        <span className="text-xs uppercase tracking-widest font-semibold text-stone-400 mb-2">
          Scroll to explore
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-stone-600/70 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 rounded-full bg-[#F5A623] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
