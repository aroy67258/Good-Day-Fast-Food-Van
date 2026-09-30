import React, { useState, useEffect, useRef } from 'react';
import { Phone, Menu as MenuIcon, X, ShoppingBag, ChevronDown } from 'lucide-react';
import { BRANDING } from '../../data/branding';
import { MENU_CATEGORIES } from '../../data/menuData';
import { useCart } from '../../context/CartContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'hero' | 'menu' | 'story' | 'contact'>('hero');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const { getCartItemCount, toggleCart } = useCart();

  const cartCount = getCartItemCount();

  // Scroll detection & active section spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections: ('contact' | 'story' | 'menu' | 'hero')[] = ['contact', 'story', 'menu', 'hero'];
      const scrollPos = window.scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(e.target as Node)
      ) {
        setIsMenuDropdownOpen(false);
      }
    };

    if (isMenuDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuDropdownOpen]);

  // Close dropdown & mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMenuDropdownOpen) setIsMenuDropdownOpen(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuDropdownOpen, mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMenuDropdownOpen(false);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setIsMenuDropdownOpen(false);
    setMobileMenuOpen(false);

    // Dispatch custom event to notify MenuSection to switch category tabs and scroll
    window.dispatchEvent(
      new CustomEvent('select-menu-category', { detail: { categoryId } })
    );

    // Fallback scroll directly to category row
    setTimeout(() => {
      const target =
        document.getElementById(`category-${categoryId}`) ||
        document.getElementById(categoryId) ||
        document.getElementById('menu');

      if (target) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = target.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 50);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled || mobileMenuOpen || isMenuDropdownOpen
          ? 'bg-[#141210]/98 backdrop-blur-md border-b border-stone-800/80 shadow-md'
          : 'bg-gradient-to-b from-black/50 via-black/20 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 text-left active:opacity-80 transition-opacity min-h-[44px]"
          aria-label="Good Day Fast Food Van Home"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#C21807] to-[#8B1414] border border-[#F5A623] flex items-center justify-center shadow-md flex-shrink-0">
            <span className="text-lg select-none" role="img" aria-label="Van">🚐</span>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-base sm:text-lg tracking-wide text-white leading-none">
                GOOD DAY
              </span>
              <span className="hidden xs:inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#15803D]/30 border border-[#15803D]/60 text-[#4ADE80] text-[9px] font-bold tracking-wider">
                VEG
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#F5A623] uppercase leading-tight">
              FAST FOOD VAN
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links (Bold, 600 weight, 24-32px gap, active highlight) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <button
            type="button"
            onClick={() => scrollToSection('hero')}
            className={`min-h-[40px] px-3 py-1.5 rounded-xl text-sm font-semibold tracking-wide transition-all ${
              activeSection === 'hero'
                ? 'text-[#F5A623] bg-white/5'
                : 'text-stone-300 hover:text-[#F5A623] hover:bg-white/5'
            }`}
          >
            Home
          </button>

          {/* "Our Menu" Interactive Dropdown Navigation */}
          <div className="relative">
            <button
              ref={dropdownButtonRef}
              type="button"
              onClick={() => setIsMenuDropdownOpen(!isMenuDropdownOpen)}
              className={`min-h-[40px] px-3 py-1.5 rounded-xl text-sm font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                activeSection === 'menu' || isMenuDropdownOpen
                  ? 'text-[#F5A623] bg-white/5'
                  : 'text-stone-300 hover:text-[#F5A623] hover:bg-white/5'
              }`}
              aria-expanded={isMenuDropdownOpen}
              aria-haspopup="true"
            >
              <span>Our Menu</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isMenuDropdownOpen ? 'rotate-180 text-[#F5A623]' : 'text-stone-400'
                }`}
              />
            </button>

            {/* Desktop Category Dropdown Card */}
            {isMenuDropdownOpen && (
              <div
                ref={dropdownRef}
                role="menu"
                aria-label="Menu Categories"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#181513]/98 backdrop-blur-md border border-stone-800 rounded-2xl shadow-2xl py-2 z-50 animate-fadeIn"
              >
                <div className="px-3 py-1 mb-1 border-b border-stone-800/80 text-[10px] font-extrabold uppercase tracking-widest text-[#FDE047]">
                  Categories
                </div>
                {MENU_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    role="menuitem"
                    type="button"
                    onClick={() => handleCategoryClick(cat.id)}
                    className="w-full text-left px-3.5 py-2 text-xs font-semibold text-stone-300 hover:text-[#F5A623] hover:bg-stone-800/60 transition-colors flex items-center justify-between group"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-stone-500 group-hover:text-[#F5A623] group-hover:translate-x-0.5 transition-all">
                      →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('story')}
            className={`min-h-[40px] px-3 py-1.5 rounded-xl text-sm font-semibold tracking-wide transition-all ${
              activeSection === 'story'
                ? 'text-[#F5A623] bg-white/5'
                : 'text-stone-300 hover:text-[#F5A623] hover:bg-white/5'
            }`}
          >
            About Us
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className={`min-h-[40px] px-3 py-1.5 rounded-xl text-sm font-semibold tracking-wide transition-all ${
              activeSection === 'contact'
                ? 'text-[#F5A623] bg-white/5'
                : 'text-stone-300 hover:text-[#F5A623] hover:bg-white/5'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right Actions: Cart & Mobile Hamburger (Minimum 44x44px touch targets) */}
        <div className="flex items-center gap-2">
          {/* Functional Cart Button */}
          <button
            type="button"
            onClick={toggleCart}
            className="relative min-w-[44px] min-h-[44px] px-3 py-2 rounded-xl bg-[#24201E] hover:bg-stone-800 border border-[#F5A623]/50 text-white shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-[#F5A623]" />
            <span className="text-xs font-bold text-stone-200">
              Cart <span className="text-[#FBBF24]">({cartCount})</span>
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#C21807] border border-white text-white text-[9px] font-extrabold flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Desktop Call Action */}
          <a
            href={`tel:${BRANDING.phone}`}
            className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#9E1B1B] to-[#C21807] hover:brightness-110 border border-[#F5A623]/50 text-white text-xs font-semibold shadow-warm transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#FDE047]" />
            <div className="flex flex-col text-left leading-none">
              <span className="text-[9px] text-[#FEF08A] uppercase tracking-wider font-bold">Hostel Delivery</span>
              <span className="tracking-wide text-xs">{BRANDING.phone}</span>
            </div>
          </a>

          {/* Mobile Menu Hamburger Button (At least 44x44px touch target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 hover:text-white flex items-center justify-center active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#F5A623]" /> : <MenuIcon className="w-5 h-5 text-stone-200" />}
          </button>
        </div>
      </div>

      {/* Full-width Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="md:hidden w-full bg-[#161412] border-b border-stone-800 px-4 py-5 space-y-3 shadow-2xl animate-fadeIn"
        >
          <nav className="flex flex-col gap-1.5 text-left">
            {/* Home link */}
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className={`w-full text-left min-h-[46px] text-base font-semibold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between ${
                activeSection === 'hero' ? 'text-[#F5A623] bg-stone-900' : 'text-stone-200 hover:text-[#F5A623] hover:bg-stone-900/60'
              }`}
            >
              <span>Home</span>
              <span className="text-stone-600 text-xs">→</span>
            </button>

            {/* Our Menu with expandable Category list */}
            <div className="rounded-xl overflow-hidden bg-stone-900/50 border border-stone-800/80">
              <button
                type="button"
                onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                className={`w-full text-left min-h-[46px] text-base font-semibold py-2.5 px-3 flex items-center justify-between transition-colors ${
                  activeSection === 'menu' ? 'text-[#F5A623]' : 'text-stone-200 hover:text-[#F5A623]'
                }`}
                aria-expanded={mobileCategoryOpen}
              >
                <span>Our Menu</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileCategoryOpen ? 'rotate-180 text-[#F5A623]' : 'text-stone-400'
                  }`}
                />
              </button>

              {mobileCategoryOpen && (
                <div className="px-2 pb-2 pt-0.5 space-y-1 border-t border-stone-800/60 bg-stone-950/40">
                  {MENU_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryClick(cat.id)}
                      className="w-full text-left min-h-[44px] text-sm font-semibold text-stone-300 hover:text-[#F5A623] active:text-[#F5A623] py-2 px-3 rounded-lg hover:bg-stone-800/60 flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                        <span>{cat.name}</span>
                      </span>
                      <span className="text-stone-600 text-xs">→</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* About Us link */}
            <button
              type="button"
              onClick={() => scrollToSection('story')}
              className={`w-full text-left min-h-[46px] text-base font-semibold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between ${
                activeSection === 'story' ? 'text-[#F5A623] bg-stone-900' : 'text-stone-200 hover:text-[#F5A623] hover:bg-stone-900/60'
              }`}
            >
              <span>About Us</span>
              <span className="text-stone-600 text-xs">→</span>
            </button>

            {/* Contact link */}
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className={`w-full text-left min-h-[46px] text-base font-semibold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between ${
                activeSection === 'contact' ? 'text-[#F5A623] bg-stone-900' : 'text-stone-200 hover:text-[#F5A623] hover:bg-stone-900/60'
              }`}
            >
              <span>Contact</span>
              <span className="text-stone-600 text-xs">→</span>
            </button>
          </nav>

          <div className="pt-2 space-y-2.5 border-t border-stone-800">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                toggleCart();
              }}
              className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-stone-900 border border-[#F5A623]/60 text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <ShoppingBag className="w-4 h-4 text-[#F5A623]" />
              <span>Open Cart ({cartCount} items)</span>
            </button>

            <a
              href={`tel:${BRANDING.phone}`}
              className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#C21807] hover:bg-[#A8170B] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
            >
              <Phone className="w-4 h-4 text-[#FEF08A]" />
              <span>Hostel Delivery: {BRANDING.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

