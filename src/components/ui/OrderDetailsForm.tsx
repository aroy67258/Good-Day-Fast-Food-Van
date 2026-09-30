import React from 'react';
import { useOrder } from '../../context/OrderContext';
import { useCart } from '../../context/CartContext';
import { DeliveryMethod } from '../../types';
import { ArrowLeft, ArrowRight, Building, MapPin, ShoppingBag, AlertCircle } from 'lucide-react';

export const OrderDetailsForm: React.FC = () => {
  const {
    customer,
    fulfillment,
    updateCustomer,
    updateFulfillment,
    setDeliveryMethod,
    errors,
    validateDetails,
    setStep,
  } = useOrder();

  const { items } = useCart();

  const handleReviewOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setStep('cart');
      return;
    }
    const isValid = validateDetails();
    if (isValid) {
      setStep('review');
    }
  };

  const deliveryOptions: {
    id: DeliveryMethod;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: 'hostel',
      title: 'Hostel Delivery',
      description: 'Delivered directly to your hostel block / gate',
      icon: Building,
    },
    {
      id: 'nearby',
      title: 'Nearby Delivery',
      description: 'Delivered to nearby campus location / address',
      icon: MapPin,
    },
    {
      id: 'pickup',
      title: 'Pickup',
      description: 'Pick up your fresh order from Good Day Van',
      icon: ShoppingBag,
    },
  ];

  return (
    <form onSubmit={handleReviewOrder} className="flex-1 flex flex-col justify-between overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {/* Step Indicator */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800/80">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5A623]">
              Step 2 of 3
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white font-display">
              Customer &amp; Delivery
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setStep('cart')}
            className="min-h-[44px] inline-flex items-center gap-1 text-xs font-semibold text-stone-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Cart</span>
          </button>
        </div>

        {/* Section 1: Customer Contact Details */}
        <div className="space-y-3.5">
          <h5 className="text-[11px] font-bold uppercase tracking-wider text-stone-300">
            Contact Information
          </h5>

          {/* Full Name Field */}
          <div className="space-y-1">
            <label htmlFor="customer-name" className="block text-xs font-semibold text-stone-300">
              Full Name <span className="text-[#EF4444]">*</span>
            </label>
            <input
              id="customer-name"
              type="text"
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'customer-name-error' : undefined}
              value={customer.fullName}
              onChange={(e) => updateCustomer({ fullName: e.target.value })}
              placeholder="e.g. Rahul Sharma"
              className={`w-full min-h-[48px] px-3.5 py-3 rounded-xl bg-stone-900 border text-stone-100 placeholder-stone-600 text-base focus:outline-none focus:ring-1 transition-all ${
                errors.fullName
                  ? 'border-[#EF4444] focus:ring-[#EF4444]'
                  : 'border-stone-800 focus:border-[#F5A623] focus:ring-[#F5A623]'
              }`}
            />
            {errors.fullName && (
              <p id="customer-name-error" className="flex items-center gap-1 text-[11px] font-medium text-[#EF4444] pt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* Mobile Number Field */}
          <div className="space-y-1">
            <label htmlFor="customer-phone" className="block text-xs font-semibold text-stone-300">
              Mobile Number (India) <span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-base font-semibold text-stone-400 select-none">
                +91
              </span>
              <input
                id="customer-phone"
                type="tel"
                autoComplete="tel"
                required
                aria-required="true"
                aria-invalid={!!errors.mobileNumber}
                aria-describedby={errors.mobileNumber ? 'customer-phone-error' : undefined}
                value={customer.mobileNumber}
                onChange={(e) => updateCustomer({ mobileNumber: e.target.value })}
                placeholder="10-digit mobile number"
                className={`w-full min-h-[48px] pl-14 pr-3.5 py-3 rounded-xl bg-stone-900 border text-stone-100 placeholder-stone-600 text-base focus:outline-none focus:ring-1 transition-all ${
                  errors.mobileNumber
                    ? 'border-[#EF4444] focus:ring-[#EF4444]'
                    : 'border-stone-800 focus:border-[#F5A623] focus:ring-[#F5A623]'
                }`}
              />
            </div>
            {errors.mobileNumber && (
              <p id="customer-phone-error" className="flex items-center gap-1 text-[11px] font-medium text-[#EF4444] pt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.mobileNumber}</span>
              </p>
            )}
          </div>
        </div>

        {/* Section 2: Delivery Method Selection (Large Tappable Cards) */}
        <div className="space-y-2.5 pt-1">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-300">
            Delivery Method <span className="text-[#EF4444]">*</span>
          </label>

          <div className="grid grid-cols-1 gap-2.5">
            {deliveryOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = fulfillment.method === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setDeliveryMethod(option.id)}
                  className={`min-h-[56px] p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all active:scale-98 cursor-pointer ${
                    isSelected
                      ? 'bg-[#9E1B1B]/25 border-[#F5A623] ring-1 ring-[#F5A623]/60 shadow-sm'
                      : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#F5A623] text-stone-950 font-bold'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">
                        {option.title}
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-[#F5A623] bg-[#F5A623]'
                            : 'border-stone-700 bg-stone-900'
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-stone-950" />}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {option.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Conditional Location Fields */}
        <div className="pt-1">
          {fulfillment.method === 'hostel' && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-3 animate-fadeIn">
              <span className="text-[11px] font-bold text-[#FDE047] uppercase tracking-wider block">
                Hostel Location Details
              </span>

              {/* Hostel Name */}
              <div className="space-y-1">
                <label htmlFor="hostel-name" className="block text-xs font-medium text-stone-300">
                  Hostel Name <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  id="hostel-name"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.hostelName}
                  aria-describedby={errors.hostelName ? 'hostel-name-error' : undefined}
                  value={fulfillment.hostelName}
                  onChange={(e) => updateFulfillment({ hostelName: e.target.value })}
                  placeholder="e.g. Boys Hostel 2 / Raman Hall"
                  className={`w-full min-h-[46px] px-3 py-2.5 rounded-xl bg-stone-950 border text-stone-100 placeholder-stone-600 text-base focus:outline-none focus:ring-1 ${
                    errors.hostelName
                      ? 'border-[#EF4444] focus:ring-[#EF4444]'
                      : 'border-stone-800 focus:border-[#F5A623]'
                  }`}
                />
                {errors.hostelName && (
                  <p id="hostel-name-error" className="text-[11px] font-medium text-[#EF4444] pt-0.5">
                    {errors.hostelName}
                  </p>
                )}
              </div>

              {/* Room / Block / Floor (Optional) */}
              <div className="space-y-1">
                <label htmlFor="room-block" className="block text-xs font-medium text-stone-300">
                  Room / Block / Floor <span className="text-stone-500 font-normal">(Optional)</span>
                </label>
                <input
                  id="room-block"
                  type="text"
                  value={fulfillment.roomBlock}
                  onChange={(e) => updateFulfillment({ roomBlock: e.target.value })}
                  placeholder="e.g. Room 204, B-Block"
                  className="w-full min-h-[46px] px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-[#F5A623] text-stone-100 placeholder-stone-600 text-base focus:outline-none focus:ring-1 focus:ring-[#F5A623]"
                />
              </div>

              {/* Delivery Instructions (Optional) */}
              <div className="space-y-1">
                <label htmlFor="hostel-instructions" className="block text-xs font-medium text-stone-300">
                  Delivery Instructions <span className="text-stone-500">(Optional)</span>
                </label>
                <input
                  id="hostel-instructions"
                  type="text"
                  value={fulfillment.deliveryInstructions}
                  onChange={(e) => updateFulfillment({ deliveryInstructions: e.target.value })}
                  placeholder="e.g. Meet at main gate / call when reached"
                  className="w-full min-h-[46px] px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-600 text-base focus:outline-none focus:border-[#F5A623]"
                />
              </div>
            </div>
          )}

          {fulfillment.method === 'nearby' && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-3 animate-fadeIn">
              <span className="text-[11px] font-bold text-[#FDE047] uppercase tracking-wider block">
                Nearby Delivery Address
              </span>

              {/* Delivery Address / Landmark */}
              <div className="space-y-1">
                <label htmlFor="delivery-address" className="block text-xs font-medium text-stone-300">
                  Address / Landmark / Building <span className="text-[#EF4444]">*</span>
                </label>
                <textarea
                  id="delivery-address"
                  rows={2}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.deliveryAddress}
                  aria-describedby={errors.deliveryAddress ? 'delivery-address-error' : undefined}
                  value={fulfillment.deliveryAddress}
                  onChange={(e) => updateFulfillment({ deliveryAddress: e.target.value })}
                  placeholder="e.g. Near Library Gate, Tech Department"
                  className={`w-full min-h-[60px] px-3 py-2.5 rounded-xl bg-stone-950 border text-stone-100 placeholder-stone-600 text-base focus:outline-none focus:ring-1 resize-none ${
                    errors.deliveryAddress
                      ? 'border-[#EF4444] focus:ring-[#EF4444]'
                      : 'border-stone-800 focus:border-[#F5A623]'
                  }`}
                />
                {errors.deliveryAddress && (
                  <p id="delivery-address-error" className="text-[11px] font-medium text-[#EF4444] pt-0.5">
                    {errors.deliveryAddress}
                  </p>
                )}
              </div>

              {/* Delivery Instructions (Optional) */}
              <div className="space-y-1">
                <label htmlFor="nearby-instructions" className="block text-xs font-medium text-stone-300">
                  Additional Instructions <span className="text-stone-500">(Optional)</span>
                </label>
                <input
                  id="nearby-instructions"
                  type="text"
                  value={fulfillment.deliveryInstructions}
                  onChange={(e) => updateFulfillment({ deliveryInstructions: e.target.value })}
                  placeholder="e.g. Near the fountain / phone on arrival"
                  className="w-full min-h-[46px] px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-600 text-base focus:outline-none focus:border-[#F5A623]"
                />
              </div>
            </div>
          )}

          {fulfillment.method === 'pickup' && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-900/80 border border-stone-800 flex items-start gap-3 animate-fadeIn">
              <ShoppingBag className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs text-stone-300">
                <span className="font-bold text-white block">
                  Self Pickup from Van
                </span>
                <p className="text-stone-400 leading-relaxed">
                  Pick up your fresh order directly from the Good Day Fast Food Van window. No address required.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Optional Order Note */}
        <div className="space-y-1 pt-1">
          <label htmlFor="order-note" className="block text-xs font-semibold text-stone-300">
            Additional Order Note <span className="text-stone-500">(Optional)</span>
          </label>
          <input
            id="order-note"
            type="text"
            value={fulfillment.orderNote}
            onChange={(e) => updateFulfillment({ orderNote: e.target.value })}
            placeholder="e.g. Less spicy, extra napkins"
            className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-100 placeholder-stone-600 text-base focus:outline-none focus:border-[#F5A623]"
          />
        </div>
      </div>

      {/* Footer Navigation Buttons (Min 48px touch targets, pb-safe) */}
      <div className="p-4 sm:p-5 border-t border-stone-800 bg-[#1C1917] flex items-center gap-3 pb-safe flex-shrink-0">
        <button
          type="button"
          onClick={() => setStep('cart')}
          className="min-h-[48px] py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 font-bold text-xs sm:text-sm active:scale-95 transition-transform"
        >
          Back
        </button>

        <button
          type="submit"
          className="flex-1 min-h-[48px] py-3 px-6 rounded-xl bg-gradient-to-r from-[#9E1B1B] via-[#C21807] to-[#D97706] hover:brightness-110 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-warm active:scale-95 transition-transform"
        >
          <span>Review Order</span>
          <ArrowRight className="w-4 h-4 text-[#FDE047]" />
        </button>
      </div>
    </form>
  );
};
