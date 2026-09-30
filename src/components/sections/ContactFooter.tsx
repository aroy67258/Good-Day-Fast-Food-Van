import React from 'react';
import { Phone, Instagram, Sparkles, ArrowUp } from 'lucide-react';
import { BRANDING } from '../../data/branding';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative z-20 bg-[#12100E]/40 backdrop-blur-md text-stone-300 border-t border-stone-800/40 pb-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 sm:pb-12">
        {/* Contact Information Section inside Footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-center justify-between">
          <div className="md:col-span-6 space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15803D]/25 border border-[#15803D]/60 text-[#4ADE80] text-[11px] sm:text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
              <span>Campus Street Food Van</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display">
              Hungry? Call Good Day Food Van
            </h3>

            <p className="text-stone-400 text-xs sm:text-sm max-w-md leading-relaxed">
              Order hot, freshly prepared vegetarian snacks, noodles, momos, and burgers delivered right to your hostel or campus location.
            </p>
          </div>

          <div className="md:col-span-6 flex flex-col sm:flex-row gap-3 justify-start md:justify-end">
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
              href={`https://instagram.com/${BRANDING.instagram}`}
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


