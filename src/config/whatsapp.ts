import type { CustomerDetails, FulfillmentDetails, CartItem } from '../types';

/**
 * CENTRAL WHATSAPP CONFIGURATION
 * Single location to configure the business WhatsApp order number.
 * Must use international format without '+', spaces, or symbols.
 * Example format: 91XXXXXXXXXX
 */
export const WHATSAPP_ORDER_NUMBER =
  ((import.meta as unknown as { env?: Record<string, string> }).env?.VITE_WHATSAPP_ORDER_NUMBER as string) ||
  '918081551589';

/**
 * Check if the business WhatsApp order number is properly configured.
 */
export const isWhatsAppConfigured = (): boolean => {
  if (!WHATSAPP_ORDER_NUMBER) return false;
  const digits = WHATSAPP_ORDER_NUMBER.replace(/\D/g, '');
  return digits.length >= 10;
};

interface BuildMessageParams {
  customer: CustomerDetails;
  fulfillment: FulfillmentDetails;
  items: CartItem[];
  subtotal: number;
}

/**
 * Generate structured, clean plain-text message for WhatsApp Click-to-Chat.
 * Ensures no empty or undefined fields are rendered.
 */
export const buildWhatsAppOrderMessage = ({
  customer,
  fulfillment,
  items,
  subtotal,
}: BuildMessageParams): string => {
  const lines: string[] = [];

  // Header
  lines.push('GOOD DAY FAST FOOD VAN');
  lines.push('');
  lines.push('NEW ORDER');
  lines.push('');

  // Customer Details
  lines.push('Customer Details');
  lines.push(`Name: ${customer.fullName.trim()}`);
  lines.push(`Mobile: ${customer.mobileNumber.replace(/\D/g, '').slice(-10)}`);
  lines.push('');

  // Order Type & Location Details
  if (fulfillment.method === 'hostel') {
    lines.push('Order Type: Hostel Delivery');
    if (fulfillment.hostelName?.trim()) {
      lines.push(`Hostel: ${fulfillment.hostelName.trim()}`);
    }
    if (fulfillment.roomBlock?.trim()) {
      lines.push(`Location: ${fulfillment.roomBlock.trim()}`);
    }
    if (fulfillment.deliveryInstructions?.trim()) {
      lines.push(`Additional Instructions: ${fulfillment.deliveryInstructions.trim()}`);
    }
  } else if (fulfillment.method === 'nearby') {
    lines.push('Order Type: Nearby Delivery');
    if (fulfillment.deliveryAddress?.trim()) {
      lines.push(`Location: ${fulfillment.deliveryAddress.trim()}`);
    }
    if (fulfillment.deliveryInstructions?.trim()) {
      lines.push(`Additional Instructions: ${fulfillment.deliveryInstructions.trim()}`);
    }
  } else {
    // Pickup
    lines.push('Order Type: Pickup');
  }

  // Optional Special Order Note
  if (fulfillment.orderNote?.trim()) {
    lines.push(`Order Note: ${fulfillment.orderNote.trim()}`);
  }

  lines.push('');
  lines.push('ORDER ITEMS');
  lines.push('');

  // Items List
  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    lines.push(`${index + 1}. ${item.productName}`);
    if (item.selectedOption) {
      lines.push(item.selectedOption);
    }
    lines.push(`Price: ₹${item.price}`);
    lines.push(`Quantity: ${item.quantity}`);
    lines.push(`Item Total: ₹${itemTotal}`);
    lines.push('');
  });

  // Financial Breakdown
  lines.push(`FOOD SUBTOTAL: ₹${subtotal}`);
  lines.push('DELIVERY CHARGE: To be confirmed');
  lines.push(`TOTAL FOOD VALUE: ₹${subtotal}`);
  lines.push('');
  lines.push('Please confirm the order and delivery details.');

  return lines.join('\n');
};

/**
 * Generate safe, properly URL-encoded WhatsApp Click-to-Chat URL.
 */
export const buildWhatsAppClickToChatUrl = (message: string): string => {
  const cleanPhone = WHATSAPP_ORDER_NUMBER.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};
