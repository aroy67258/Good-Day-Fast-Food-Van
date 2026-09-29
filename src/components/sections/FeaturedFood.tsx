import React from 'react';
import { Sparkles, Flame, Check } from 'lucide-react';

export const FeaturedFood: React.FC = () => {
  return (
    <section id="featured" className="relative z-20 bg-[#161412] text-stone-200 py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15803D]/25 border border-[#15803D]/60 text-[#4ADE80] text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
              <span>Chef's Daily Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Signature Creations
            </h2>
            <p className="text-stone-400 text-sm sm:text-base max-w-xl">
              From golden-seared paneer burgers to fiery wok-tossed street noodles, prepared live with fresh local vegetables.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F5A623]">
              Authentic Indian Recipes
            </span>
          </div>
        </div>

        {/* Featured Showcase Item 1: Signature Burger (Large Editorial Composition) */}
        <div className="bg-[#201D1B] border border-stone-800 rounded-3xl overflow-hidden shadow-2xl mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 relative h-[380px] sm:h-[480px] overflow-hidden group">
            <img
              src="/assets/featured-burger.jpg"
              alt="Good Day Paneer Burger"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Best Seller</span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#F5A623] uppercase tracking-widest">
                Category: Burgers
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                Paneer + Cheese Burger
              </h3>
              <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
                A thick golden-fried spiced paneer block layered with sliced ripe tomatoes, crisp garden lettuce, melted cheese, and our secret mint-coriander mayonnaise on a toasted sesame bun.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-stone-800">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-300">
                <Check className="w-4 h-4 text-[#4ADE80]" />
                <span>Thick handcrafted spiced paneer patty</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-300">
                <Check className="w-4 h-4 text-[#4ADE80]" />
                <span>Fresh buttery toasted sesame brioche</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-300">
                <Check className="w-4 h-4 text-[#4ADE80]" />
                <span>Signature spicy mint & garlic herb sauces</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="#menu"
                className="px-6 py-3 rounded-xl bg-[#C21807] hover:bg-[#9E1B1B] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                View Burger Collection
              </a>
            </div>
          </div>
        </div>

        {/* Featured Showcase Item 2: Wok Tossed Chowmein & Noodles */}
        <div className="bg-[#201D1B] border border-stone-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#F5A623] uppercase tracking-widest">
                Category: Chowmein
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                Street Style Hakka Noodles
              </h3>
              <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
                Tossed on smoking-hot iron woks with crisp julienned bell peppers, shredded cabbage, carrots, spring onions, dark soy sauce, and aromatic garlic-chili oil.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-stone-800">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-300">
                <Check className="w-4 h-4 text-[#4ADE80]" />
                <span>High-flame authentic wok smoky aroma</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-300">
                <Check className="w-4 h-4 text-[#4ADE80]" />
                <span>Crunchy farm-fresh garden greens</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-300">
                <Check className="w-4 h-4 text-[#4ADE80]" />
                <span>Custom spice blend for hostel food lovers</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="#menu"
                className="px-6 py-3 rounded-xl bg-[#C21807] hover:bg-[#9E1B1B] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                View Chowmein Collection
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 relative h-[380px] sm:h-[480px] overflow-hidden group">
            <img
              src="/assets/featured-chowmein.jpg"
              alt="Good Day Hakka Chowmein"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Hostel Special</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
