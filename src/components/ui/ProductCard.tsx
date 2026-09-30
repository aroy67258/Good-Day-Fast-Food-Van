import React, { useState } from 'react';
import { MenuItem, PriceOption } from '../../data/menuData';
import { useCart } from '../../context/CartContext';
import { Plus, Check, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: MenuItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, recentlyAddedId, items } = useCart();

  // If product has dual pricing, track selected option for adding to cart
  const [selectedOption, setSelectedOption] = useState<PriceOption | undefined>(
    product.priceOptions && product.priceOptions.length > 0
      ? product.priceOptions[0]
      : undefined
  );

  // Compute composite cart item ID to check if recently added or present in cart
  const currentCartItemId = `${product.id}__${selectedOption?.label || 'standard'}`;
  const isRecentlyAdded = recentlyAddedId === currentCartItemId;

  // Find quantity already in cart for current selection
  const cartItem = items.find((i) => i.id === currentCartItemId);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedOption);
  };

  return (
    <div className="w-[180px] sm:w-[205px] flex-shrink-0 flex flex-col justify-between bg-[#161412]/75 backdrop-blur-sm border border-stone-800/80 hover:border-[#F5A623]/60 rounded-xl overflow-hidden shadow-md hover:shadow-warm transition-all duration-200 select-none group">
      <div>
        {/* Compact Product Image (Target 115-125px height) */}
        <div className="relative h-[115px] sm:h-[125px] w-full overflow-hidden bg-stone-900 flex-shrink-0">
          <img
            src={product.image}
            alt={`${product.name} from Good Day Fast Food Van - Fresh vegetarian street food`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/good-day-menu.jpg';
            }}
          />

          {/* Top Overlays */}
          <div className="absolute top-2 left-2 flex items-center gap-1">
            {/* Indian Vegetarian Standard Symbol */}
            <div
              className="w-4 h-4 rounded-sm bg-white/95 border border-[#15803D] flex items-center justify-center p-0.5 shadow-sm"
              title="100% Pure Vegetarian"
            >
              <div className="w-2 h-2 rounded-full bg-[#15803D]" />
            </div>

            {/* Optional Item Tag/Badge */}
            {product.badge && (
              <span className="px-1.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[#FDE047] text-[8px] font-bold tracking-wide uppercase">
                {product.badge}
              </span>
            )}
          </div>

          {/* In-Cart Indicator Badge */}
          {inCartQty > 0 && (
            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-[#C21807] border border-[#F5A623]/80 text-white text-[9px] font-bold flex items-center gap-1 shadow-md">
              <ShoppingBag className="w-2.5 h-2.5 text-[#FEF08A]" />
              <span>{inCartQty}</span>
            </div>
          )}
        </div>

        {/* Product Details (Compact, No long paragraphs) */}
        <div className="p-2.5 sm:p-3 space-y-1.5">
          {/* Product Name (Max 2 lines with controlled height) */}
          <h3
            className="text-[13px] sm:text-sm font-bold text-white font-display line-clamp-2 leading-tight group-hover:text-[#F5A623] transition-colors h-[34px] flex items-center"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Price / Price Options Area */}
          <div className="pt-1 border-t border-stone-800/60">
            {product.priceOptions && product.priceOptions.length > 0 ? (
              // Dual-price items: clearly readable selectable Half / Full buttons
              <div className="grid grid-cols-2 gap-1.5 my-1" role="group" aria-label="Select portion size">
                {product.priceOptions.map((opt, idx) => {
                  const isOptSelected = selectedOption?.label === opt.label;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedOption(opt)}
                      className={`min-h-[36px] py-1 px-1.5 rounded-lg text-center border transition-all active:scale-95 cursor-pointer flex flex-col items-center justify-center ${
                        isOptSelected
                          ? 'bg-[#C21807]/35 border-[#F5A623] text-white shadow-sm ring-1 ring-[#F5A623]'
                          : 'bg-stone-900/90 border-stone-800 text-stone-300 hover:text-white hover:border-stone-700'
                      }`}
                      aria-pressed={isOptSelected}
                      aria-label={`Select ${opt.label} for ${opt.formatted}`}
                    >
                      <span
                        className={`text-[10px] sm:text-[11px] font-bold tracking-wide uppercase leading-tight ${
                          isOptSelected ? 'text-[#FDE047]' : 'text-stone-400'
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span className="text-xs sm:text-[13px] font-black text-[#FBBF24] leading-tight mt-0.5">
                        {opt.formatted}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              // Single price item: clean single-price display [ Price ₹30 ]
              <div className="flex items-center justify-between min-h-[36px] px-2 my-1 bg-stone-900/40 rounded-lg border border-stone-800/60">
                <span className="text-[11px] sm:text-xs text-stone-400 font-semibold tracking-wide uppercase">
                  Price
                </span>
                <span className="text-base sm:text-lg font-black text-[#FBBF24] font-display">
                  {product.formattedPrice}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compact Add to Cart Button (Target height 34-38px) */}
      <div className="p-2.5 sm:p-3 pt-0">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`w-full h-9 sm:h-[38px] px-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm cursor-pointer ${
            isRecentlyAdded
              ? 'bg-[#15803D] text-white border border-[#4ADE80]/80 shadow-[0_0_12px_rgba(21,128,61,0.5)]'
              : 'bg-gradient-to-r from-[#9E1B1B] via-[#C21807] to-[#D97706] hover:brightness-110 text-white border border-[#F5A623]/40'
          }`}
          aria-label={`Add ${product.name} to cart`}
        >
          {isRecentlyAdded ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#86EFAC] animate-bounce" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 text-[#FDE047]" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
