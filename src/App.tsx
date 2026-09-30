import React from 'react';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { Header } from './components/ui/Header';
import { HeroSection } from './components/sections/HeroSection';
import { MenuSection } from './components/sections/MenuSection';
import { BrandStory } from './components/sections/BrandStory';
import { FAQSection } from './components/sections/FAQSection';
import { Footer } from './components/sections/ContactFooter';
import { BrandIntro } from './components/sections/BrandIntro';
import { CartDrawer } from './components/ui/CartDrawer';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen text-stone-100 flex flex-col relative selection:bg-[#F5A623] selection:text-white antialiased overflow-x-hidden">
      {/* 
        ==================================================
        FIXED GOOD DAY FOOD VAN BACKGROUND
        - Stays fixed while website content scrolls over it
        - Full viewport (100vw, 100vh / 100dvh)
        - Subtle dark & warm overlay for contrast & readability
        ==================================================
      */}
      <div className="fixed-van-background-layer" aria-hidden="true">
        <img
          src="/assets/good-day-van-background.jpg"
          alt="Good Day Fast Food Van serving vegetarian street food"
          className="fixed-van-image"
          loading="eager"
          decoding="async"
        />
        {/* Subtle, light global overlay (10-15% opacity) keeping the Good Day van, warm lights, and counter bright and realistic */}
        <div className="absolute inset-0 bg-black/12 pointer-events-none" />
      </div>

      {/* Foreground Content Layer */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Sticky Editorial Header */}
        <Header />

        {/* Main Continuous Scrolling Website */}
        <main className="w-full">
          {/* Section 1: Hero Visual with Real Van & Editorial Typography */}
          <HeroSection />

          {/* Section 2: Real Food Menu & Product Showcase with Add to Cart */}
          <MenuSection />

          {/* Section 3: Brand Story & Official Menu Poster */}
          <BrandStory />

          {/* Section 4: Frequently Asked Questions */}
          <FAQSection />

          {/* Section 5: The Four Feature Cards (Fresh Ingredients, Hygienic Preparation, Pocket Friendly, Made with Love) */}
          <BrandIntro />
        </main>

        {/* Section 5: Luxury Minimal Footer with Integrated Contact Section */}
        <Footer />

        {/* Shopping Cart & Order Flow Drawer */}
        <CartDrawer />
      </div>
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
