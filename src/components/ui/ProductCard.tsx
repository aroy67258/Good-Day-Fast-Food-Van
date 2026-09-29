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
    <div className="group relative bg-[#1E1B19] border border-stone-800/90 hover:border-[#F5A623]/60 rounded-2xl overflow-hidden shadow-md hover:shadow-warm transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container with smooth hover zoom */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            onError={(e) => {
              // Fallback to category hero image if specific image fails
              const target = e.target as HTMLImageElement;
              target.src = '/assets/good-day-menu.jpg';
            }}
          />

          {/* Top Overlays */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {/* Indian Vegetarian Standard Symbol */}
            <div
              className="w-5 h-5 rounded-sm bg-white/95 border border-[#15803D] flex items-center justify-center p-0.5 shadow-sm"
              title="100% Pure Vegetarian"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
            </div>

            {/* Optional Item Tag/Badge */}
            {product.badge && (
              <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[#FDE047] text-[10px] font-bold tracking-wide uppercase">
                {product.badge}
              </span>
            )}
          </div>

          {/* Quantity in cart badge overlay */}
          {inCartQty > 0 && (
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#C21807] border border-[#F5A623]/80 text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
              <ShoppingBag className="w-3 h-3 text-[#FEF08A]" />
              <span>{inCartQty} in cart</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 sm:p-5 space-y-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              {product.categoryName}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white font-display group-hover:text-[#F5A623] transition-colors leading-snug">
              {product.name}
            </h4>
          </div>

          {/* Price Representation & Option Selector */}
          <div className="pt-2 border-t border-stone-800/60">
            {product.priceOptions && product.priceOptions.length > 0 ? (
              // Dual-price item: interactive option selector
              <div className="space-y-1.5">
                <span className="text-[10px] text-stone-400 font-medium block">
                  Select Size / Option:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {product.priceOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedOption(opt)}
                      className={`px-2.5 py-1.5 rounded-lg text-left text-xs font-semibold border transition-all ${
                        selectedOption?.label === opt.label
                          ? 'bg-[#9E1B1B]/40 border-[#F5A623] text-white shadow-sm ring-1 ring-[#F5A623]/50'
                          : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                      aria-label={`Select ${opt.label} for ${opt.formatted}`}
                    >
                      <span className="text-[10px] block text-stone-400 font-normal">
                        {opt.label}
                      </span>
                      <span className="text-sm font-extrabold text-[#FBBF24]">
                        {opt.formatted}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Single price item
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400 font-medium">Price</span>
                <span className="text-xl font-extrabold text-[#FBBF24] font-display">
                  {product.formattedPrice}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Button (Add to Cart with confirmation micro-animation) */}
      <div className="p-4 sm:p-5 pt-0">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 shadow-md ${
            isRecentlyAdded
              ? 'bg-[#15803D] text-white border border-[#4ADE80]/80 shadow-[0_0_15px_rgba(21,128,61,0.5)]'
              : 'bg-gradient-to-r from-[#9E1B1B] via-[#C21807] to-[#D97706] hover:brightness-110 text-white border border-[#F5A623]/40 hover:shadow-warm'
          }`}
          aria-label={`Add ${product.name} to cart`}
        >
          {isRecentlyAdded ? (
            <>
              <Check className="w-4 h-4 text-[#86EFAC] animate-bounce" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 text-[#FDE047]" />
              <span>
                Add to Cart •{' '}
                {selectedOption ? selectedOption.formatted : product.formattedPrice}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
