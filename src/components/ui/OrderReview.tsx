import React, { useState } from 'react';
import { useOrder } from '../../context/OrderContext';
import { useCart } from '../../context/CartContext';
import {
  WHATSAPP_ORDER_NUMBER,
  isWhatsAppConfigured,
  buildWhatsAppOrderMessage,
  buildWhatsAppClickToChatUrl,
} from '../../config/whatsapp';
import {
  ArrowLeft,
  Building,
  MapPin,
  ShoppingBag,
  User,
  Phone,
  MessageSquare,
  MessageCircle,
  Copy,
  Check,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';

export const OrderReview: React.FC = () => {
  const { customer, fulfillment, normalizedPhone, setStep, validateDetails } = useOrder();
  const { items, getCartTotal } = useCart();

  const [isOpeningWhatsApp, setIsOpeningWhatsApp] = useState(false);
  const [hasOpenedWhatsApp, setHasOpenedWhatsApp] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const subtotal = getCartTotal();

  const getMethodBadge = () => {
    switch (fulfillment.method) {
      case 'hostel':
        return {
          label: 'Hostel Delivery',
          icon: Building,
          color: 'text-[#60A5FA] bg-[#2563EB]/15 border-[#2563EB]/40',
        };
      case 'nearby':
        return {
          label: 'Nearby Delivery',
          icon: MapPin,
          color: 'text-[#FBBF24] bg-[#D97706]/15 border-[#D97706]/40',
        };
      case 'pickup':
        return {
          label: 'Self Pickup from Van',
          icon: ShoppingBag,
          color: 'text-[#4ADE80] bg-[#15803D]/15 border-[#15803D]/40',
        };
    }
  };

  const badge = getMethodBadge();
  const MethodIcon = badge.icon;

  const handleOrderOnWhatsApp = () => {
    setValidationError(null);

    // 1. Check cart not empty
    if (!items || items.length === 0) {
      setValidationError('Your cart is empty. Please add items to your order.');
      return;
    }

    // 2. Validate details
    const isValid = validateDetails();
    if (!isValid) {
      setValidationError('Please review and complete all required customer and delivery fields.');
      setStep('details');
      return;
    }

    // 3. Verify WhatsApp Configuration
    if (!isWhatsAppConfigured()) {
      setValidationError(
        'WhatsApp ordering is not configured yet. Please contact the food van directly.'
      );
      return;
    }

    // 4. Generate structured order message
    const orderMessage = buildWhatsAppOrderMessage({
      customer,
      fulfillment,
      items,
      subtotal,
    });

    // 5. Construct safe URL
    const clickToChatUrl = buildWhatsAppClickToChatUrl(orderMessage);

    // 6. Prevent duplicate rapid triggers
    if (isOpeningWhatsApp) return;
    setIsOpeningWhatsApp(true);

    try {
      // User-triggered external navigation
      window.open(clickToChatUrl, '_blank', 'noopener,noreferrer');
      setHasOpenedWhatsApp(true);
    } catch (e) {
      console.error('Failed to open WhatsApp URL', e);
      setValidationError('Could not open WhatsApp automatically. Please use the Copy Order Details button.');
    } finally {
      setTimeout(() => {
        setIsOpeningWhatsApp(false);
      }, 1200);
    }
  };

  const handleCopyOrder = async () => {
    try {
      const orderMessage = buildWhatsAppOrderMessage({
        customer,
        fulfillment,
        items,
        subtotal,
      });
      await navigator.clipboard.writeText(orderMessage);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2400);
    } catch (e) {
      console.warn('Clipboard write failed', e);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Step Indicator & Back */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800/80">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5A623]">
              Step 3 of 3
            </span>
            <h4 className="text-lg font-bold text-white font-display">
              Review Your Order
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setStep('details')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-stone-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Edit Details</span>
          </button>
        </div>

        {/* Validation Error Alert if any */}
        {validationError && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 flex items-start gap-2.5 text-xs text-red-200">
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Customer & Delivery Card */}
        <div className="bg-[#201D1B] border border-stone-800/90 rounded-2xl p-4 space-y-3.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Recipient &amp; Delivery
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${badge.color}`}
            >
              <MethodIcon className="w-3 h-3" />
              <span>{badge.label}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 text-stone-300">
              <User className="w-3.5 h-3.5 text-[#F5A623]" />
              <span className="font-semibold text-white truncate">{customer.fullName}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <Phone className="w-3.5 h-3.5 text-[#4ADE80]" />
              <span className="font-mono tracking-wide">+91 {normalizedPhone}</span>
            </div>
          </div>

          {/* Location info based on delivery method */}
          <div className="pt-2 border-t border-stone-800/70 text-xs space-y-1">
            {fulfillment.method === 'hostel' && (
              <div>
                <span className="text-stone-400 font-medium">Delivery Destination: </span>
                <span className="text-stone-200 font-semibold">
                  {fulfillment.hostelName}, {fulfillment.roomBlock}
                </span>
                {fulfillment.deliveryInstructions && (
                  <p className="text-stone-400 text-[11px] mt-0.5 italic">
                    Note: "{fulfillment.deliveryInstructions}"
                  </p>
                )}
              </div>
            )}

            {fulfillment.method === 'nearby' && (
              <div>
                <span className="text-stone-400 font-medium">Delivery Address: </span>
                <span className="text-stone-200 font-semibold">
                  {fulfillment.deliveryAddress}
                </span>
                {fulfillment.deliveryInstructions && (
                  <p className="text-stone-400 text-[11px] mt-0.5 italic">
                    Note: "{fulfillment.deliveryInstructions}"
                  </p>
                )}
              </div>
            )}

            {fulfillment.method === 'pickup' && (
              <div className="text-stone-300">
                <span className="text-stone-400 font-medium">Pickup Point: </span>
                <span className="text-[#FDE047] font-semibold">
                  Good Day Fast Food Van window
                </span>
              </div>
            )}

            {fulfillment.orderNote && (
              <div className="pt-1 flex items-start gap-1.5 text-stone-300">
                <MessageSquare className="w-3 h-3 text-[#F5A623] mt-0.5 flex-shrink-0" />
                <span className="text-[11px]">
                  Special Request: "{fulfillment.orderNote}"
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Itemized Order List */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-400">
            <span>Ordered Items ({items.length})</span>
            <span>Subtotal</span>
          </div>

          <div className="space-y-2">
            {items.map((item) => {
              const itemTotal = item.price * item.quantity;
              return (
                <div
                  key={item.id}
                  className="bg-[#201D1B] border border-stone-800/80 rounded-xl p-3 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-10 h-10 rounded-lg object-cover bg-stone-900 border border-stone-800 flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/good-day-menu.jpg';
                      }}
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-white truncate font-display">
                        {item.productName}
                      </div>
                      <div className="text-[11px] text-stone-400">
                        {item.selectedOption ? `${item.selectedOption} • ` : ''}
                        {item.formattedPrice} × {item.quantity}
                      </div>
                    </div>
                  </div>

                  <span className="font-extrabold text-[#FBBF24] font-display text-sm flex-shrink-0">
                    ₹{itemTotal}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Financial Calculation Breakdown */}
        <div className="bg-[#201D1B] border border-stone-800/90 rounded-2xl p-4 space-y-2.5 text-xs">
          <div className="flex items-center justify-between text-stone-300">
            <span>Food Subtotal</span>
            <span className="font-bold text-white text-sm">₹{subtotal}</span>
          </div>

          <div className="flex items-center justify-between text-stone-400">
            <span>Delivery Charge</span>
            <span className="text-[#F5A623] font-semibold italic">To be confirmed</span>
          </div>

          <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
            <span className="font-bold text-white text-sm">Total Food Value</span>
            <span className="text-xl font-extrabold text-[#FBBF24] font-display">
              ₹{subtotal}
            </span>
          </div>
        </div>

        {/* Post-WhatsApp Guidance Banner (Visible once button clicked) */}
        {hasOpenedWhatsApp && (
          <div className="p-3.5 rounded-2xl bg-[#15803D]/20 border border-[#22C55E]/50 text-xs text-stone-200 space-y-1 animate-fadeIn">
            <div className="flex items-center gap-1.5 font-bold text-[#4ADE80]">
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Pre-filled Successfully</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              Your order message has been prepared in WhatsApp. Please review the pre-filled message and tap <strong>Send</strong> inside WhatsApp to submit your order to Good Day Fast Food Van.
            </p>
          </div>
        )}
      </div>

      {/* Footer Actions: ORDER ON WHATSAPP & Copy Helper */}
      <div className="p-6 border-t border-stone-800 bg-[#1C1917] space-y-3">
        {/* Primary Action Button */}
        <button
          type="button"
          onClick={handleOrderOnWhatsApp}
          disabled={isOpeningWhatsApp || items.length === 0}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] hover:brightness-110 disabled:opacity-75 disabled:cursor-not-allowed text-white font-heading font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-warm transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#1C1917] group"
          aria-label="Order on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
          <span>{isOpeningWhatsApp ? 'Preparing WhatsApp...' : 'ORDER ON WHATSAPP'}</span>
          <ExternalLink className="w-4 h-4 text-white/80" />
        </button>

        {/* Secondary Action: Copy Order Details Helper */}
        <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
          <button
            type="button"
            onClick={handleCopyOrder}
            className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            title="Copy plain-text order message to clipboard"
          >
            {copiedToClipboard ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                <span className="text-[#4ADE80] font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-400" />
                <span>Copy Order Details</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setStep('details')}
            className="hover:text-white transition-colors py-1 px-2 rounded focus:outline-none focus:ring-1 focus:ring-stone-400"
          >
            ← Edit Details
          </button>
        </div>

        <p className="text-[10px] text-center text-stone-500 font-medium">
          Order number: +{WHATSAPP_ORDER_NUMBER} • Message is sent only when you tap Send in WhatsApp.
        </p>
      </div>
    </div>
  );
};
