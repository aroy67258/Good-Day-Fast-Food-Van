import React from 'react';
import { Phone, Instagram, Sparkles, ArrowUp, MapPin, Navigation, ExternalLink } from 'lucide-react';
import { BRANDING } from '../../data/branding';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative z-20 bg-[#12100E]/40 backdrop-blur-md text-stone-300 border-t border-stone-800/40 pb-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 sm:pb-12">
        {/* Contact Information Section inside Footer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-5 space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15803D]/25 border border-[#15803D]/60 text-[#4ADE80] text-[11px] sm:text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
              <span>Campus Street Food Van</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display">
              Hungry? Call Good Day Food Van
            </h2>

            <p className="text-stone-400 text-xs sm:text-sm max-w-md leading-relaxed">
              Order hot, freshly prepared vegetarian snacks, noodles, momos, and burgers delivered right to your hostel or campus location.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {/* Quick Contact Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Phone Call Card (Touch-friendly min 48px) */}
              <a
                href={`tel:${BRANDING.phone}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#1A1816]/75 hover:bg-[#201D1A]/85 border border-stone-800/80 hover:border-[#F5A623] active:scale-98 transition-all shadow-md group min-h-[52px]"
                aria-label={`Call Hostel Delivery Mobile: ${BRANDING.phone}`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#C21807] flex items-center justify-center text-white flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#FEF08A]" />
                </div>
                <div className="text-left">
                  <span className="text-[9px] text-stone-400 uppercase tracking-widest font-bold block">
                    Hostel Delivery Mobile
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-white group-hover:text-[#F5A623] transition-colors">
                    {BRANDING.phone}
                  </span>
                </div>
              </a>

              {/* Instagram Card (Touch-friendly min 48px) */}
              <a
                href={BRANDING.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#1A1816]/75 hover:bg-[#201D1A]/85 border border-stone-800/80 hover:border-[#E1306C] active:scale-98 transition-all shadow-md group min-h-[52px]"
                aria-label={`Open Official Instagram @${BRANDING.instagram}`}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white flex-shrink-0">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-[9px] text-stone-400 uppercase tracking-widest font-bold block">
                    Official Instagram
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-white group-hover:text-[#FDE047] transition-colors">
                    @{BRANDING.instagram}
                  </span>
                </div>
              </a>
            </div>

            {/* Verified Location & Get Directions Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#1A1816]/75 border border-stone-800/80 hover:border-[#F5A623]/40 transition-all shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#F5A623]/15 border border-[#F5A623]/30 flex items-center justify-center text-[#F5A623] flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="text-[9px] sm:text-[10px] text-stone-400 uppercase tracking-widest font-bold block">
                      Verified Location &amp; Campus Service Spot
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                      {BRANDING.address}
                    </p>
                  </div>
                </div>

                <a
                  href={BRANDING.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C21807] hover:bg-[#A8170B] text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 flex-shrink-0 min-h-[44px] border border-[#F5A623]/40 cursor-pointer"
                  aria-label="Get Directions to Good Day Fast Food Van near MMMUT Gorakhpur on Google Maps"
                >
                  <Navigation className="w-4 h-4 text-[#FDE047]" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Editorial Divider & Footer Bottom */}
        <div className="border-t border-stone-800/80 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-300 tracking-wider uppercase text-[11px] sm:text-xs">
              GOOD DAY FAST FOOD VAN
            </span>
            <span className="text-stone-600">•</span>
            <span className="text-[#4ADE80] font-semibold text-[11px] sm:text-xs">100% Pure Vegetarian</span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs">
            <a href="#hero" className="hover:text-stone-300 transition-colors py-1">Home</a>
            <a href="#menu" className="hover:text-stone-300 transition-colors py-1">Our Menu</a>
            <a href="#story" className="hover:text-stone-300 transition-colors py-1">About Us</a>
            <a href="#faq" className="hover:text-stone-300 transition-colors py-1">FAQ</a>
          </div>

          <button
            onClick={scrollToTop}
            className="min-h-[40px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-white transition-colors"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-4 text-center text-[10px] sm:text-[11px] text-stone-600">
          <p>© {new Date().getFullYear()} Good Day Fast Food Van. {BRANDING.slogan}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Compatibility exports
export const ContactFooter: React.FC = Footer;
export const ContactSection: React.FC = Footer;


