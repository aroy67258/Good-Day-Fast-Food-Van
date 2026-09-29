import { MenuItem, PriceOption } from '../data/menuData';

export interface FoodCategoryItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  badge?: string;
  highlights: string[];
}

export interface FoodCategory {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  items: string[];
  description: string;
}

export interface BrandingInfo {
  name: string;
  subtitle: string;
  tagline: string;
  phone: string;
  instagram: string;
  vegetarianBadge: string;
}

// Phase 3 Shopping Cart Types
export interface CartItem {
  id: string; // composite key: `${productId}__${selectedOption || 'default'}`
  productId: string;
  productName: string;
  categoryName: string;
  image: string;
  selectedOption?: string; // e.g. "Option 1", "Option 2"
  price: number;
  formattedPrice: string;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  addToCart: (product: MenuItem, selectedOption?: PriceOption, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  recentlyAddedId: string | null;
}

// Phase 4 Order Details & Fulfillment Types
export type DeliveryMethod = 'hostel' | 'nearby' | 'pickup';

export interface CustomerDetails {
  fullName: string;
  mobileNumber: string;
}

export interface FulfillmentDetails {
  method: DeliveryMethod;
  hostelName: string;
  roomBlock: string;
  deliveryAddress: string;
  deliveryInstructions: string;
  orderNote: string;
}

export interface OrderState {
  customer: CustomerDetails;
  fulfillment: FulfillmentDetails;
  items: CartItem[];
  subtotal: number;
  deliveryChargeText: string;
  totalFoodValue: number;
}

export type OrderStep = 'cart' | 'details' | 'review';
