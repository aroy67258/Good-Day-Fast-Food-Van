import React, { useState, useEffect, useRef } from 'react';
import { MENU_CATEGORIES, MenuCategory, MenuItem } from '../../data/menuData';
import { ProductCard } from '../ui/ProductCard';
import { Utensils, ChevronLeft, ChevronRight, Phone, Search, X } from 'lucide-react';
import { BRANDING } from '../../data/branding';

// Case-insensitive normalization helper
export const normalize = (str: string): string => (str ? str.toLowerCase().trim() : '');

// Reusable search matcher
export const isItemMatching = (
  item: MenuItem,
  category: MenuCategory,
  query: string
): boolean => {
  const q = normalize(query);
  if (!q) return true;

  // 1. Direct match on item name (e.g. "Burger", "Paneer Roll", "Hakka Noodles", "Veg. Momos")
  if (normalize(item.name).includes(q)) return true;

  // 2. Direct match on category name or slug (e.g. "Momos", "Burgers", "Chowmein", "Rice Bowls", "Rolls", "Chilli Specials")
  if (normalize(category.name).includes(q)) return true;
  if (normalize(category.slug).includes(q)) return true;
  if (normalize(item.categoryName).includes(q)) return true;

  // 3. Match on item badge if present (e.g. "Classic Street Style", "Extra Crunchy")
  if (item.badge && normalize(item.badge).includes(q)) return true;

  return false;
};

export const MenuSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const scrollToCategory = (categoryId: string) => {
    setActiveTab(categoryId);
    if (categoryId === 'all') {
      const el = document.getElementById('menu');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(`category-${categoryId}`) || document.getElementById(categoryId);
    if (el) {
      const offset = 80;
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

  useEffect(() => {
    const handleSelectCategory = (e: Event) => {
      const customEvent = e as CustomEvent<{ categoryId: string }>;
      if (customEvent.detail?.categoryId) {
        scrollToCategory(customEvent.detail.categoryId);
      }
    };

    window.addEventListener('select-menu-category', handleSelectCategory);
    return () => window.removeEventListener('select-menu-category', handleSelectCategory);
  }, []);

  const handleClearSearch = () => {
    setSearchQuery('');
    searchInputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSearchQuery('');
    }
  };

  const scrollRow = (categoryId: string, distance: number) => {
    const rowEl = document.getElementById(`row-${categoryId}`);
    if (rowEl) {
      rowEl.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };

  const getCategoryMatchCount = (category: MenuCategory, query: string): number => {
    return category.items.filter((item) => isItemMatching(item, category, query)).length;
  };

  // Active categories to evaluate based on activeTab
  const baseCategories =
    activeTab === 'all'
      ? MENU_CATEGORIES
      : MENU_CATEGORIES.filter((cat) => cat.id === activeTab);

  // Filter categories and their matching items
  const categoriesWithMatchingItems = baseCategories
    .map((category) => ({
      category,
      items: category.items.filter((item) => isItemMatching(item, category, searchQuery)),
    }))
    .filter((entry) => entry.items.length > 0);

  // Total matching items in current view
  const totalMatchingItems = categoriesWithMatchingItems.reduce(
    (acc, entry) => acc + entry.items.length,
    0
  );

  // Total matching across ALL categories (for "All Categories" button badge)
  const allCategoryMatchingCount = MENU_CATEGORIES.reduce(
    (acc, cat) => acc + getCategoryMatchCount(cat, searchQuery),
    0
  );

  return (
    <section id="menu" className="relative z-20 bg-[#12100E]/40 backdrop-blur-md text-stone-200 py-10 sm:py-16 px-3.5 sm:px-6 lg:px-8 border-t border-stone-800/40 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Hostel Delivery Promotional Banner */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#9E1B1B] via-[#7F1D1D] to-[#291717] border border-[#F5A623]/30 p-5 sm:p-8 shadow-warm-lg mb-8 sm:mb-10">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#FDE047]">
                Campus &amp; Hostel Favorite
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-display leading-tight">
                Fast &amp; Hot Delivery to Your Hostel Doorstep
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 max-w-xl leading-relaxed">
                Craving late evening momos, burgers, or noodles during study sessions? Good Day Fast Food Van delivers straight to hostel gates and college hangouts.
              </p>
            </div>

            <a
              href={`tel:${BRANDING.phone}`}
              className="w-full sm:w-auto min-h-[46px] px-6 py-3 rounded-xl bg-[#F5A623] hover:bg-[#FBBF24] text-[#141210] font-bold text-xs sm:text-sm tracking-wide shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 flex-shrink-0"
            >
              <Phone className="w-4 h-4 text-[#141210]" />
              <span>Call To Order: {BRANDING.phone}</span>
            </a>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9E1B1B]/25 border border-[#F5A623]/50 text-[#FDE047] text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-sm">
            <Utensils className="w-3.5 h-3.5" />
            <span>Street Food Menu</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            The Complete Street Menu
          </h2>

          <p className="max-w-xl text-stone-400 text-xs sm:text-sm leading-relaxed">
            Fresh vegetarian street food crafted to order. Swipe horizontally across categories to explore our menu.
          </p>
        </div>

        {/* Premium Animated Search Bar */}
        <div className="w-full max-w-xl mx-auto mb-6 sm:mb-8 px-1">
          <div
            className={`group relative flex items-center w-full h-11 sm:h-12 px-3.5 sm:px-4 rounded-2xl bg-[#161412]/80 backdrop-blur-md border transition-all duration-200 shadow-sm ${
              isFocused
                ? 'border-[#F5A623] ring-2 ring-[#F5A623]/25 bg-[#1C1816]/95 shadow-[0_0_20px_rgba(245,166,35,0.18)] scale-[1.01]'
                : 'border-stone-800/80 hover:border-stone-700/90'
            }`}
          >
            <Search
              className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-colors duration-200 ${
                isFocused ? 'text-[#F5A623]' : 'text-stone-400 group-hover:text-stone-300'
              }`}
              aria-hidden="true"
            />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="Search food..."
              aria-label="Search food menu"
              autoComplete="off"
              spellCheck="false"
              className="w-full h-full bg-transparent px-2.5 sm:px-3 text-stone-100 placeholder:text-stone-500 text-sm sm:text-base font-medium focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl text-stone-400 hover:text-white hover:bg-stone-800/60 active:scale-95 transition-all cursor-pointer"
                aria-label="Clear search"
                title="Clear search (Esc)"
              >
                <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            )}
          </div>

          {/* Subtle Search Result Count Indicator */}
          {searchQuery.trim().length > 0 && totalMatchingItems > 0 && (
            <div className="flex items-center justify-between px-2 pt-2 text-xs text-stone-400 animate-fadeIn">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                <span>
                  {totalMatchingItems} {totalMatchingItems === 1 ? 'item' : 'items'} found
                  {activeTab !== 'all' && (
                    <span> in <strong className="text-stone-300">{MENU_CATEGORIES.find((c) => c.id === activeTab)?.name}</strong></span>
                  )}
                </span>
              </span>
              <button
                type="button"
                onClick={handleClearSearch}
                className="text-[11px] text-[#F5A623] hover:text-[#FBBF24] font-semibold py-0.5 hover:underline cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Category Navigation Bar (Sticky Horizontal Touch Scroll Bar) */}
        <div className="sticky top-14 sm:top-16 z-30 py-2.5 mb-8 bg-[#141210]/80 backdrop-blur-md border-y border-stone-800/80 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <button
              type="button"
              onClick={() => scrollToCategory('all')}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 active:scale-95 flex items-center justify-center ${
                activeTab === 'all'
                  ? 'bg-[#C21807] text-white shadow-warm'
                  : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              All Categories ({allCategoryMatchingCount})
            </button>
            {MENU_CATEGORIES.map((cat) => {
              const catCount = getCategoryMatchCount(cat, searchQuery);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => scrollToCategory(cat.id)}
                  className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 active:scale-95 flex items-center justify-center ${
                    activeTab === cat.id
                      ? 'bg-[#C21807] text-white shadow-warm'
                      : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                  }`}
                >
                  {cat.name} ({catCount})
                </button>
              );
            })}
          </div>
        </div>

        {/* Category-Wise Horizontal Rows or Empty Results */}
        {totalMatchingItems > 0 ? (
          <div className="space-y-8 sm:space-y-10">
            {categoriesWithMatchingItems.map(({ category, items }) => (
              <div
                key={category.id}
                id={`category-${category.id}`}
                className="scroll-mt-24 sm:scroll-mt-28 relative"
              >
                <span id={category.id} className="absolute -top-24 sm:-top-28 left-0 pointer-events-none invisible" />
                {/* Compact Category Header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
                    <h3 className="text-base sm:text-xl font-extrabold text-white font-display uppercase tracking-wide">
                      {category.name}
                    </h3>
                    <span className="text-[11px] font-semibold text-stone-400 bg-stone-900/90 border border-stone-800 px-2 py-0.5 rounded-full">
                      {items.length} {items.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  {/* Right side: Desktop Row Scroll Arrows + Mobile Swipe Cue */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider sm:hidden">
                      Swipe →
                    </span>
                    <div className="hidden sm:flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => scrollRow(category.id, -240)}
                        className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                        aria-label={`Scroll ${category.name} left`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollRow(category.id, 240)}
                        className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                        aria-label={`Scroll ${category.name} right`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Horizontal Scrolling Product Row (Non-wrapping, compact cards) */}
                <div
                  id={`row-${category.id}`}
                  className="flex flex-nowrap overflow-x-auto gap-3 sm:gap-3.5 pb-2 pt-0.5 no-scrollbar scroll-smooth -mx-3.5 px-3.5 sm:mx-0 sm:px-0"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Clean "No results" State with suggestions */
          <div className="py-12 px-4 text-center max-w-md mx-auto space-y-3 bg-[#181513]/60 backdrop-blur-md rounded-2xl border border-stone-800/80 p-6 my-4 animate-fadeIn">
            <div className="w-12 h-12 mx-auto rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-xl">
              🍽️
            </div>
            <h4 className="text-lg font-bold text-white font-display">No food found</h4>
            <p className="text-xs sm:text-sm text-stone-400">
              No food items found matching <strong className="text-stone-200">"{searchQuery}"</strong>
              {activeTab !== 'all' && (
                <span> in <strong className="text-stone-300">{MENU_CATEGORIES.find((c) => c.id === activeTab)?.name}</strong></span>
              )}.
            </p>
            <p className="text-xs text-stone-400">
              Try searching for{' '}
              <button
                type="button"
                onClick={() => setSearchQuery('burger')}
                className="text-[#F5A623] hover:underline font-semibold cursor-pointer"
              >
                burger
              </button>
              ,{' '}
              <button
                type="button"
                onClick={() => setSearchQuery('momos')}
                className="text-[#F5A623] hover:underline font-semibold cursor-pointer"
              >
                momos
              </button>
              ,{' '}
              <button
                type="button"
                onClick={() => setSearchQuery('chowmein')}
                className="text-[#F5A623] hover:underline font-semibold cursor-pointer"
              >
                chowmein
              </button>
              ,{' '}
              <button
                type="button"
                onClick={() => setSearchQuery('rice')}
                className="text-[#F5A623] hover:underline font-semibold cursor-pointer"
              >
                rice
              </button>
              , or{' '}
              <button
                type="button"
                onClick={() => setSearchQuery('roll')}
                className="text-[#F5A623] hover:underline font-semibold cursor-pointer"
              >
                rolls
              </button>
              .
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-2">
              {activeTab !== 'all' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className="px-3.5 py-1.5 rounded-xl bg-[#C21807] text-white text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-sm cursor-pointer"
                >
                  Search All Categories
                </button>
              )}
              <button
                type="button"
                onClick={handleClearSearch}
                className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold active:scale-95 transition-all cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

