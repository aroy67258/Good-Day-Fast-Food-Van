import React from 'react';
import { Leaf, ShieldCheck, Wallet, Heart, Award } from 'lucide-react';
import { BRANDING } from '../../data/branding';

export const BrandIntro: React.FC = () => {
  return (
    <section className="relative z-20 bg-gradient-to-b from-[#141210] via-[#1A1715] to-[#141210] text-stone-200 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle Badge */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#9E1B1B]/20 border border-[#F5A623]/40 text-[#FDE047] text-xs font-bold tracking-widest uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>The Street Food Experience</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-display max-w-4xl leading-tight">
            Crispy. Sizzling. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] via-[#FBBF24] to-[#E11D48]">
              Unapologetically Delicious.
            </span>
          </h2>

          <p className="max-w-2xl text-base sm:text-lg text-stone-400 font-normal leading-relaxed pt-2">
            Good Day Fast Food Van brings the true vibrancy of Indian vegetarian street food directly to you. Prepared fresh on hot tawas and steaming woks with premium ingredients and time-honored recipes.
          </p>
        </div>

        {/* 4 Brand Pillars (From verified poster) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
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
                className="group relative bg-[#211E1C]/80 hover:bg-[#272320] border border-stone-800 hover:border-stone-700 rounded-2xl p-6 transition-all duration-300 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${accentColor} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-stone-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center text-xs font-semibold text-[#F5A623]">
                  <span>100% Guaranteed</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Announcement Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#9E1B1B] via-[#7F1D1D] to-[#291717] border border-[#F5A623]/30 p-8 sm:p-12 shadow-warm-lg">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FDE047]">
                Campus & Hostel Favorite
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Fast & Hot Delivery to Your Hostel Doorstep
              </h3>
              <p className="text-sm text-stone-200 max-w-xl">
                Craving late evening momos, burgers, or noodles during study sessions? Good Day Fast Food Van delivers straight to hostel gates and college hangouts.
              </p>
            </div>

            <a
              href={`tel:${BRANDING.phone}`}
              className="px-8 py-4 rounded-xl bg-[#F5A623] hover:bg-[#FBBF24] text-[#141210] font-bold text-sm sm:text-base tracking-wide shadow-lg transition-transform active:scale-95 flex-shrink-0"
            >
              Call To Order: {BRANDING.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
