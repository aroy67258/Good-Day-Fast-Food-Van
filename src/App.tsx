import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { Header } from './components/ui/Header';
import { HeroSection } from './components/sections/HeroSection';
import { BrandIntro } from './components/sections/BrandIntro';
import { FeaturedFood } from './components/sections/FeaturedFood';
import { MenuSection } from './components/sections/MenuSection';
import { BrandStory } from './components/sections/BrandStory';
import { ContactFooter } from './components/sections/ContactFooter';
import { CartDrawer } from './components/ui/CartDrawer';

export const AppContent: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track window scroll progress for smooth 3D hero parallax
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1.5);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#141210] text-stone-100 flex flex-col relative selection:bg-[#F5A623] selection:text-white antialiased overflow-x-hidden">
      {/* Sticky Editorial Header with functional Cart Indicator */}
      <Header />

      {/* Main Continuous Scrolling Website */}
      <main className="w-full">
        {/* Section 1: 3D Food Van Hero */}
        <HeroSection scrollProgress={scrollProgress} />

        {/* Section 2: Brand Introduction & 4 Pillars */}
        <BrandIntro />

        {/* Section 3: Featured Food Showcase */}
        <FeaturedFood />

        {/* Section 4: Real Food Menu & Product Showcase with Add to Cart */}
        <MenuSection />

        {/* Section 5: Brand Story & Official Menu Poster */}
        <BrandStory />
      </main>

      {/* Section 6: Contact & Minimal Luxury Footer */}
      <ContactFooter />

      {/* Phase 3 & 4 Shopping Cart & Order Flow Drawer */}
      <CartDrawer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <OrderProvider>
        <AppContent />
      </OrderProvider>
    </CartProvider>
  );
};

export default App;
