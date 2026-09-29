import React, { useState } from 'react';
import { BRANDING } from '../../data/branding';
import { Maximize2, X, HeartHandshake } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const [isPosterOpen, setIsPosterOpen] = useState(false);

  return (
    <section id="story" className="relative z-20 bg-[#171412] text-stone-200 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#15803D]/25 border border-[#15803D]/60 text-[#4ADE80] text-xs font-bold tracking-widest uppercase">
              <HeartHandshake className="w-3.5 h-3.5 text-[#FDE047]" />
              <span>Our Heritage & Promise</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display leading-tight">
              Good Food. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] via-[#FBBF24] to-[#C21807]">
                Good Day. Good Life.
              </span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Good Day Fast Food Van was founded with a straightforward mission: to serve the most delicious, hygienic, and pocket-friendly 100% vegetarian Indian street food to students, hostel residents, and food lovers.
            </p>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Every burger patty is seasoned and seared to order. Every plate of chowmein is wok-tossed with fresh crunch and smoky heat. Every momo is steamed tender and served with fiery red chili garlic dip. We believe that honest street food prepared with clean ingredients can make any day a Good Day.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-stone-800">
              <div className="space-y-1">
                <span className="text-2xl font-extrabold text-[#F5A623] font-display">100%</span>
                <p className="text-xs text-stone-400 font-medium">Pure Vegetarian Dedicated Kitchen</p>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-extrabold text-[#4ADE80] font-display">Hostel</span>
                <p className="text-xs text-stone-400 font-medium">Fast Campus Doorstep Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Column: Original Good Day Street Menu Poster Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative group w-full max-w-md bg-[#24201E] border border-stone-700/80 rounded-3xl p-6 shadow-warm-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
                  <span className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                    Official Street Menu
                  </span>
                </div>
                <button
                  onClick={() => setIsPosterOpen(true)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#F5A623] hover:text-[#FEF08A] transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expand Poster</span>
                </button>
              </div>

              {/* Clickable Poster Frame */}
              <div
                onClick={() => setIsPosterOpen(true)}
                className="relative rounded-2xl overflow-hidden cursor-pointer border border-[#F5A623]/40 shadow-inner group-hover:border-[#F5A623] transition-colors"
                title="Click to expand official Good Day menu poster"
              >
                <img
                  src={BRANDING.posterSrc}
                  alt="Good Day Fast Food Van Original Street Menu Poster"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider gap-2">
                  <Maximize2 className="w-4 h-4 text-[#F5A623]" />
                  <span>Click To Inspect Full Menu</span>
                </div>
              </div>

              <p className="text-center text-[11px] text-stone-400 mt-4">
                Good Day Fast Food Van official menu reference • Mob: {BRANDING.phone}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Size Poster Inspection Modal */}
      {isPosterOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsPosterOpen(false)}
        >
          <div
            className="relative max-w-2xl max-h-[92vh] bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-700 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPosterOpen(false)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
              aria-label="Close poster view"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={BRANDING.posterSrc}
              alt="Official Good Day Fast Food Van Menu Poster"
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
