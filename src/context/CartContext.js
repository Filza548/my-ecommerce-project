// context/CartContext.js
'use client';

import { createContext, useState, useContext, useCallback } from 'react';

export const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({
    items: [],
    isOpen: false,
    lastAddedItem: null,
    showAddedNotification: false
  });

  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.items.find(item => item.id === product.id);
      let newItems;
      
      if (existing) {
        newItems = prev.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prev.items, { ...product, quantity }];
      }
      
      return {
        ...prev,
        items: newItems,
        lastAddedItem: { ...product, quantity },
        isOpen: true, // Automatically open cart when adding
        showAddedNotification: true
      };
    });

    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setCart(prev => ({ ...prev, showAddedNotification: false }));
    }, 3000);
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== productId)
    }));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    }));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart(prev => ({ ...prev, items: [] }));
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.items.reduce((total, item) => {
      return total + (item.discountedPrice * item.quantity);
    }, 0);
  }, [cart.items]);

  const getCartItemCount = useCallback(() => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }, [cart.items]);

  const toggleCart = useCallback(() => {
    setCart(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const value = {
    cartItems: cart.items,
    isCartOpen: cart.isOpen,
    lastAddedItem: cart.lastAddedItem,
    showAddedNotification: cart.showAddedNotification,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    toggleCart,
    setIsCartOpen: (isOpen) => setCart(prev => ({ ...prev, isOpen }))
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}