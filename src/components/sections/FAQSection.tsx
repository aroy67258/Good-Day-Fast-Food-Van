import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Phone, MessageSquare } from 'lucide-react';
import { BRANDING } from '../../data/branding';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What food does Good Day Fast Food Van serve?",
    answer: "Good Day Fast Food Van serves 100% pure vegetarian Indian street food and fast food favorites. Our menu features freshly seared burgers, high-flame wok-tossed chowmein and hakka noodles, tender steamed, fried and kurkure momos, sizzling Indo-Chinese chilli starters (like chilli potato, paneer chilli, and veg manchurian), aromatic fried rice bowls, and crispy golden rolls."
  },
  {
    question: "Is all the food 100% pure vegetarian?",
    answer: "Yes, our entire food menu is strictly 100% vegetarian. We maintain high food safety and hygiene standards in our van kitchen, sourcing farm-fresh vegetables, dairy-rich paneer, and handcrafted sauces prepared fresh daily without compromising on authentic street flavor."
  },
  {
    question: "Do you offer delivery to hostels and campus locations?",
    answer: "Yes! Hostel and campus delivery is one of our primary services. We deliver hot, freshly packed food directly to hostel gates, university departments, and nearby hangout spots. Simply order via WhatsApp or phone call for prompt doorstep delivery."
  },
  {
    question: "How can I place an order for delivery or pickup?",
    answer: "You can easily order online using this website by adding items to your cart and clicking 'Order on WhatsApp' to send your food order directly to our team. You can also call us directly at 8081551589 for quick phone orders."
  },
  {
    question: "Is takeaway or pickup available at the food van?",
    answer: "Yes, takeaway and counter pickup are always available! You can visit Good Day Fast Food Van in person near Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur to watch your food prepared fresh on hot woks and tawas, or call ahead so your order is hot and ready when you arrive."
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="relative z-20 bg-[#12100E]/40 backdrop-blur-md text-stone-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-stone-800/40 shadow-2xl"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-2.5 sm:space-y-3 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#15803D]/25 border border-[#15803D]/60 text-[#4ADE80] text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#FDE047]" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
            Frequently Asked Questions
          </h2>

          <p className="max-w-xl text-stone-400 text-xs sm:text-sm leading-relaxed">
            Everything you need to know about our vegetarian food menu, hostel delivery, and ordering from Good Day Fast Food Van.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#1A1816]/85 border-[#F5A623]/50 shadow-md ring-1 ring-[#F5A623]/20'
                    : 'bg-[#161412]/70 border-stone-800/80 hover:border-stone-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 active:scale-99 transition-transform cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <h3 className="text-sm sm:text-base font-bold text-white font-display flex items-center gap-2.5">
                    <span className="text-[#F5A623] text-xs font-mono font-semibold">0{idx + 1}.</span>
                    <span>{faq.question}</span>
                  </h3>
                  <div
                    className={`w-7 h-7 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#F5A623] border-[#F5A623]/40' : 'text-stone-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/60 animate-fadeIn"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Action Bar */}
        <div className="mt-8 p-4 rounded-2xl bg-[#1A1816]/75 border border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="text-xs font-bold text-white block">Still have questions?</span>
            <span className="text-[11px] text-stone-400">Call us directly or reach out on WhatsApp for any custom orders.</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${BRANDING.phone}`}
              className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#C21807] hover:bg-[#A8170B] text-white text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all shadow-sm"
              aria-label={`Call Good Day Food Van at ${BRANDING.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#FEF08A]" />
              <span>Call: {BRANDING.phone}</span>
            </a>
            <a
              href={`https://instagram.com/${BRANDING.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all shadow-sm"
              aria-label={`Official Instagram @${BRANDING.instagram}`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
