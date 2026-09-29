import React from 'react';
import { Phone, Instagram, Sparkles, ArrowUp } from 'lucide-react';
import { BRANDING } from '../../data/branding';

export const ContactFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative z-20 bg-[#100E0D] text-stone-300 border-t border-stone-800">
      {/* Contact Information Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center justify-between">
          <div className="md:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15803D]/25 border border-[#15803D]/60 text-[#4ADE80] text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
              <span>Campus Street Food Van</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Hungry? Call Good Day Food Van
            </h3>

            <p className="text-stone-400 text-sm sm:text-base max-w-md">
              Order hot, freshly prepared vegetarian snacks, noodles, momos, and burgers delivered right to your hostel or campus location.
            </p>
          </div>

          <div className="md:col-span-6 flex flex-col sm:flex-row gap-4 justify-start md:justify-end">
            {/* Phone Call Card */}
            <a
              href={`tel:${BRANDING.phone}`}
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#1E1B19] border border-stone-800 hover:border-[#F5A623] transition-all shadow-md group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C21807] flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5 text-[#FEF08A]" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">
                  Hostel Delivery Mobile
                </span>
                <span className="text-base font-extrabold text-white group-hover:text-[#F5A623] transition-colors">
                  {BRANDING.phone}
                </span>
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href={`https://instagram.com/${BRANDING.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#1E1B19] border border-stone-800 hover:border-[#E1306C] transition-all shadow-md group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">
                  Official Instagram
                </span>
                <span className="text-base font-extrabold text-white group-hover:text-[#FDE047] transition-colors">
                  @{BRANDING.instagram}
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Minimal Editorial Divider */}
        <div className="mt-16 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-stone-500">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#C21807] flex items-center justify-center text-sm">
              🚐
            </div>
            <span className="font-bold text-stone-300 tracking-wider uppercase">
              GOOD DAY FAST FOOD VAN
            </span>
            <span className="text-stone-600">•</span>
            <span className="text-[#4ADE80] font-semibold">100% Pure Vegetarian</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-stone-300 transition-colors">Home</a>
            <a href="#featured" className="hover:text-stone-300 transition-colors">Featured</a>
            <a href="#menu" className="hover:text-stone-300 transition-colors">Our Menu</a>
            <a href="#story" className="hover:text-stone-300 transition-colors">About Us</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-6 text-center text-[11px] text-stone-600">
          <p>© {new Date().getFullYear()} Good Day Fast Food Van. {BRANDING.slogan}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
