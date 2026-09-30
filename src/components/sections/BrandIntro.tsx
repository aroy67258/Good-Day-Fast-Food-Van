import React from 'react';
import { Leaf, ShieldCheck, Wallet, Heart, Award } from 'lucide-react';
import { BRANDING } from '../../data/branding';

export const BrandIntro: React.FC = () => {
  return (
    <section id="features" className="relative z-20 bg-[#12100E]/40 backdrop-blur-md text-stone-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-stone-800/40 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle Badge & Headings */}
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9E1B1B]/20 border border-[#F5A623]/40 text-[#FDE047] text-[11px] sm:text-xs font-bold tracking-widest uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>The Street Food Experience</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display max-w-4xl leading-tight">
            Crispy. Sizzling. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] via-[#FBBF24] to-[#E11D48]">
              Unapologetically Delicious.
            </span>
          </h2>

          <p className="max-w-2xl text-xs sm:text-base text-stone-400 font-normal leading-relaxed">
            Good Day Fast Food Van brings the true vibrancy of Indian vegetarian street food directly to you. Prepared fresh on hot tawas and steaming woks with premium ingredients and time-honored recipes.
          </p>
        </div>

        {/* 4 Brand Pillars (Compact horizontal cards, 1 per row on mobile, 4 in row on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {BRANDING.pillars.map((pillar, idx) => {
            const Icon =
              idx === 0
                ? Leaf
                : idx === 1
                ? ShieldCheck
                : idx === 2
                ? Wallet
                : Heart;
            const accentColor =
              idx === 0
                ? 'text-[#4ADE80] border-[#15803D]/40 bg-[#15803D]/10'
                : idx === 1
                ? 'text-[#60A5FA] border-[#2563EB]/40 bg-[#2563EB]/10'
                : idx === 2
                ? 'text-[#FBBF24] border-[#D97706]/40 bg-[#D97706]/10'
                : 'text-[#F87171] border-[#DC2626]/40 bg-[#DC2626]/10';

            return (
              <div
                key={pillar.title}
                className="group relative bg-[#1A1816]/75 hover:bg-[#221F1C]/85 border border-stone-800/80 hover:border-stone-700/80 rounded-2xl p-4 sm:p-[18px] transition-all duration-300 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-[36px] h-[36px] rounded-lg border flex items-center justify-center mb-2.5 ${accentColor} transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-[15px] sm:text-[16px] font-bold text-white font-display mb-1 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-stone-400 leading-[1.45]">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-800/60 flex items-center text-[11px] font-semibold text-[#F5A623]">
                  <span>100% Guaranteed</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

