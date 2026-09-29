import React, { useState } from 'react';
import { MENU_CATEGORIES, MenuCategory } from '../../data/menuData';
import { ProductCard } from '../ui/ProductCard';
import { Utensils, Sparkles, Info } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const scrollToCategory = (categoryId: string) => {
    setActiveTab(categoryId);
    if (categoryId === 'all') {
      const el = document.getElementById('menu');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(`category-${categoryId}`);
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const visibleCategories: MenuCategory[] =
    activeTab === 'all'
      ? MENU_CATEGORIES
      : MENU_CATEGORIES.filter((cat) => cat.id === activeTab);

  return (
    <section id="menu" className="relative z-20 bg-[#141210] text-stone-200 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E1B1B]/25 border border-[#F5A623]/50 text-[#FDE047] text-xs font-bold tracking-widest uppercase shadow-sm">
            <Utensils className="w-3.5 h-3.5" />
            <span>Phase 2 Official Street Menu</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-display">
            The Complete Street Menu
          </h2>

          <p className="max-w-2xl text-stone-400 text-sm sm:text-base leading-relaxed">
            Authentic Indian vegetarian street food crafted to order. Explore all 6 official categories with verified prices from our Good Day menu poster.
          </p>

          {/* Pricing Format Notice */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-300 text-xs text-left max-w-xl">
            <Info className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
            <span>
              Prices shown match the official Good Day menu poster. Multi-priced items show both neutral options (Option 1 &amp; Option 2) until portion labels are confirmed.
            </span>
          </div>
        </div>

        {/* Category Navigation Bar (Sticky Tabs) */}
        <div className="sticky top-16 z-30 py-3 mb-16 bg-[#141210]/95 backdrop-blur-md border-y border-stone-800/80 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => scrollToCategory('all')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                activeTab === 'all'
                  ? 'bg-[#C21807] text-white shadow-warm'
                  : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              All Categories ({MENU_CATEGORIES.reduce((acc, c) => acc + c.items.length, 0)})
            </button>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  activeTab === cat.id
                    ? 'bg-[#C21807] text-white shadow-warm'
                    : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                {cat.name} ({cat.items.length})
              </button>
            ))}
          </div>
        </div>

        {/* Categories Sections (Sequential Editorial Presentation) */}
        <div className="space-y-24 sm:space-y-32">
          {visibleCategories.map((category) => (
            <div
              key={category.id}
              id={`category-${category.id}`}
              className="scroll-mt-28"
            >
              {/* Category Editorial Hero Banner */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#201D1B] via-[#24201E] to-[#1C1917] border border-stone-800 p-6 sm:p-10 mb-10 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
                      <span className="text-xs font-bold text-[#4ADE80] uppercase tracking-wider">
                        100% Vegetarian • Category
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                      {category.name}
                    </h3>

                    <p className="text-sm sm:text-base text-[#F5A623] font-medium">
                      {category.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
                      {category.description}
                    </p>

                    {category.hasDualPricing && (
                      <div className="pt-2 flex items-center gap-2 text-xs text-stone-400 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
                        <span>Dual price options available for all items in this collection.</span>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-4 relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-inner border border-stone-700/60 hidden sm:block">
                    <img
                      src={category.heroImage}
                      alt={category.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-xs font-bold text-white uppercase tracking-wider">
                      {category.items.length} Menu Items
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Cards Grid (Spacious, Responsive Layout) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {category.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
