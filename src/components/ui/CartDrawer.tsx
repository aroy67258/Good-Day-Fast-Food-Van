import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';
import { OrderDetailsForm } from './OrderDetailsForm';
import { OrderReview } from './OrderReview';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Utensils
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
  } = useCart();

  const { step, setStep } = useOrder();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const total = getCartTotal();
  const itemCount = getCartItemCount();

  const handleExploreMenu = () => {
    setIsCartOpen(false);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContinueToOrder = () => {
    if (items.length > 0) {
      setStep('details');
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-fadeIn"
        aria-hidden="true"
      />

      {/* Cart Container: 100% full width on mobile, max-w-md on desktop */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="relative z-10 w-full sm:max-w-md h-full bg-[#181513] border-l border-stone-800 shadow-2xl flex flex-col justify-between animate-slideInRight"
      >
        {/* Main Top Header with Progress Breadcrumbs */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-stone-800/80 bg-[#1C1917] flex-shrink-0">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#C21807] flex items-center justify-center text-white shadow-md flex-shrink-0">
                <ShoppingBag className="w-4 h-4 text-[#FEF08A]" />
              </div>
              <div>
                <h3 id="cart-drawer-title" className="text-base font-bold text-white font-display leading-tight">
                  {step === 'cart'
                    ? 'Your Cart'
                    : step === 'details'
                    ? 'Order Details'
                    : 'Review Order'}
                </h3>
                <span className="text-[11px] text-[#F5A623] font-semibold">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} • ₹{total}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {step === 'cart' && items.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="min-h-[44px] text-xs text-stone-400 hover:text-red-400 font-medium px-2 py-1 rounded transition-colors flex items-center"
                  title="Clear all items from cart"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-11 h-11 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors flex items-center justify-center active:scale-95"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Step Progress Indicators */}
          {items.length > 0 && (
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className={`min-h-[34px] py-1.5 rounded-lg text-[10px] sm:text-xs font-bold text-center border transition-all active:scale-95 flex items-center justify-center ${
                  step === 'cart'
                    ? 'bg-[#C21807] text-white border-[#F5A623]/80'
                    : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-stone-200'
                }`}
              >
                1. Cart
              </button>
              <button
                type="button"
                onClick={() => items.length > 0 && setStep('details')}
                className={`min-h-[34px] py-1.5 rounded-lg text-[10px] sm:text-xs font-bold text-center border transition-all active:scale-95 flex items-center justify-center ${
                  step === 'details'
                    ? 'bg-[#C21807] text-white border-[#F5A623]/80'
                    : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-stone-200'
                }`}
              >
                2. Details
              </button>
              <button
                type="button"
                disabled={step === 'cart'}
                onClick={() => step !== 'cart' && setStep('review')}
                className={`min-h-[34px] py-1.5 rounded-lg text-[10px] sm:text-xs font-bold text-center border transition-all active:scale-95 flex items-center justify-center ${
                  step === 'review'
                    ? 'bg-[#C21807] text-white border-[#F5A623]/80'
                    : 'bg-stone-900/60 text-stone-400 border-stone-800 disabled:opacity-40'
                }`}
              >
                3. Review
              </button>
            </div>
          )}
        </div>

        {/* STEP 1: CART VIEW */}
        {step === 'cart' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Items List or Empty State */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
              {items.length === 0 ? (
                // Empty Cart State
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-[#24201E] border border-stone-800 flex items-center justify-center text-stone-500 shadow-inner">
                    <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-[#F5A623]/60" />
                  </div>
                  <div className="space-y-1 max-w-xs">
                    <h4 className="text-lg sm:text-xl font-bold text-white font-display">
                      Your cart is empty
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                      Add delicious vegetarian dishes from our Good Day Fast Food Van menu.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleExploreMenu}
                    className="min-h-[44px] inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C21807] hover:bg-[#9E1B1B] text-white font-bold text-xs sm:text-sm shadow-warm active:scale-95 transition-transform"
                  >
                    <Utensils className="w-4 h-4 text-[#FDE047]" />
                    <span>Explore Menu</span>
                  </button>
                </div>
              ) : (
                // Active Items List
                <div className="space-y-3">
                  {items.map((item) => {
                    const itemSubtotal = item.price * item.quantity;
                    return (
                      <div
                        key={item.id}
                        className="bg-[#211E1C] border border-stone-800/90 rounded-2xl p-3 flex gap-3 items-center justify-between shadow-sm"
                      >
                        {/* Product Thumbnail */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-stone-900 flex-shrink-0 border border-stone-800">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                '/assets/good-day-menu.jpg';
                            }}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0 pr-1">
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate font-display">
                            {item.productName}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-0.5">
                            {item.selectedOption && (
                              <span className="text-[#F5A623] font-semibold">
                                {item.selectedOption} •
                              </span>
                            )}
                            <span>{item.formattedPrice}</span>
                          </div>
                          <div className="text-xs font-bold text-[#FBBF24] mt-0.5">
                            Total: ₹{itemSubtotal}
                          </div>
                        </div>

                        {/* Quantity Controls & Remove (Touch-friendly 36px buttons) */}
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="min-w-[36px] min-h-[36px] flex items-center justify-center text-stone-500 hover:text-red-400 active:text-red-500 transition-colors"
                            title="Remove item"
                            aria-label={`Remove ${item.productName} from cart`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="flex items-center bg-stone-900 rounded-lg border border-stone-800 p-0.5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded flex items-center justify-center text-stone-300 hover:text-white active:bg-stone-800 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded flex items-center justify-center text-stone-300 hover:text-white active:bg-stone-800 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sticky Mobile Bottom Bar: Subtotal & Continue Button */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-stone-800 bg-[#1C1917] space-y-3 pb-safe flex-shrink-0">
                {/* Subtotal row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-stone-400 font-medium">Food Subtotal</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#FBBF24] font-display">
                    ₹{total}
                  </span>
                </div>

                {/* Continue to Order Action */}
                <button
                  type="button"
                  onClick={handleContinueToOrder}
                  className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#9E1B1B] via-[#C21807] to-[#D97706] hover:brightness-110 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-warm active:scale-95 transition-transform"
                >
                  <span>Continue to Order</span>
                  <ArrowRight className="w-4 h-4 text-[#FDE047]" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: ORDER DETAILS FORM */}
        {step === 'details' && <OrderDetailsForm />}

        {/* STEP 3: ORDER REVIEW SCREEN */}
        {step === 'review' && <OrderReview />}
      </div>
    </div>
  );
};
