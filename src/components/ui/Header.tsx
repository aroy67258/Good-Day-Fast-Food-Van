import React, { useState, useEffect } from 'react';
import { Phone, Menu as MenuIcon, X, ShoppingBag } from 'lucide-react';
import { BRANDING } from '../../data/branding';
import { useCart } from '../../context/CartContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartItemCount, toggleCart } = useCart();

  const cartCount = getCartItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#141210]/95 backdrop-blur-md border-b border-stone-800/80 py-3 shadow-lg'
          : 'bg-gradient-to-b from-[#141210]/90 via-[#141210]/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 text-left group"
          aria-label="Good Day Fast Food Van Home"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C21807] to-[#8B1414] border-2 border-[#F5A623] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
            <span className="text-xl select-none" role="img" aria-label="Van">🚐</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-wider text-white leading-none">
                GOOD DAY
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#15803D]/25 border border-[#15803D]/60 text-[#4ADE80] text-[10px] font-bold tracking-wider">
                100% VEG
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#F5A623] uppercase">
              FAST FOOD VAN
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-sm font-medium text-stone-300 hover:text-[#F5A623] transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('menu')}
            className="text-sm font-medium text-stone-300 hover:text-[#F5A623] transition-colors"
          >
            Our Menu
          </button>
          <button
            onClick={() => scrollToSection('story')}
            className="text-sm font-medium text-stone-300 hover:text-[#F5A623] transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm font-medium text-stone-300 hover:text-[#F5A623] transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Actions: Phone Link, Cart Indicator & Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Functional Cart Button */}
          <button
            type="button"
            onClick={toggleCart}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#24201E] to-[#1E1B19] hover:bg-stone-800 border border-[#F5A623]/50 text-white shadow-md transition-all transform active:scale-95 group"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-[#F5A623] transition-transform duration-300 group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#C21807] border border-white text-white text-[9px] font-extrabold flex items-center justify-center shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-bold text-stone-200">
              Cart <span className="text-[#FBBF24]">({cartCount})</span>
            </span>
          </button>

          {/* Hostel Delivery Call Action */}
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

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-stone-800/80 border border-stone-700 text-stone-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="md:hidden bg-[#181513]/98 border-b border-stone-800 px-6 py-6 space-y-4 backdrop-blur-xl animate-fadeIn"
        >
          <nav className="flex flex-col gap-4 text-left">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-base font-semibold text-stone-200 hover:text-[#F5A623] py-1 border-b border-stone-800/60"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="text-base font-semibold text-stone-200 hover:text-[#F5A623] py-1 border-b border-stone-800/60"
            >
              Our Menu
            </button>
            <button
              onClick={() => scrollToSection('story')}
              className="text-base font-semibold text-stone-200 hover:text-[#F5A623] py-1 border-b border-stone-800/60"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-base font-semibold text-stone-200 hover:text-[#F5A623] py-1"
            >
              Contact
            </button>
          </nav>

          <div className="pt-2 space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                toggleCart();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-900 border border-[#F5A623]/60 text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#F5A623]" />
              <span>Open Cart ({cartCount})</span>
            </button>

            <a
              href={`tel:${BRANDING.phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#C21807] text-white font-bold text-sm shadow-md"
            >
              <Phone className="w-4 h-4 text-[#FEF08A]" />
              <span>Call For Delivery: {BRANDING.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
