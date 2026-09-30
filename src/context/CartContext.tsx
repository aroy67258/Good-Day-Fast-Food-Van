import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CartContextType } from '../types';
import { MenuItem, PriceOption } from '../data/menuData';

const CART_STORAGE_KEY = 'good_day_cart_v1';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Safe initial load from localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Validate schema
          return parsed.filter(
            (item: any) =>
              item &&
              typeof item.id === 'string' &&
              typeof item.productId === 'string' &&
              typeof item.price === 'number' &&
              typeof item.quantity === 'number' &&
              item.quantity > 0
          );
        }
      }
    } catch (e) {
      console.warn('Could not load cart from localStorage, using empty cart', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Sync to localStorage on cart change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [items]);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (
    product: MenuItem,
    selectedOption?: PriceOption,
    quantity = 1
  ) => {
    if (!product) return;

    let price = product.price;
    let optionLabel: string | undefined = undefined;

    if (product.priceOptions && product.priceOptions.length > 0) {
      const optionToUse = selectedOption || product.priceOptions[0];
      price = optionToUse.price;
      optionLabel = optionToUse.label;
    }

    if (price === undefined || isNaN(price)) {
      console.error('Cannot add item with undefined price to cart', product);
      return;
    }

    const cartItemId = `${product.id}__${optionLabel || 'standard'}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.id === cartItemId);
      if (existingIndex > -1) {
        // Increment quantity of existing line
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        // Add new line item
        const displayName = optionLabel ? `${product.name} — ${optionLabel}` : product.name;
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          productName: displayName,
          categoryName: product.categoryName,
          image: product.image,
          selectedOption: optionLabel,
          price,
          formattedPrice: `₹${price}`,
          quantity,
        };
        return [...prevItems, newItem];
      }
    });

    // Visual micro-confirmation feedback
    setRecentlyAddedId(cartItemId);
    setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === cartItemId ? null : curr));
    }, 1800);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        recentlyAddedId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
