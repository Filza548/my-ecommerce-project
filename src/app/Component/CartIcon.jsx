// components/CartIcon.js
'use client';

import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext.js';
import { FiShoppingCart } from 'react-icons/fi';

export default function CartIcon() {
  const cartContext = useContext(CartContext);
  const [isBouncing, setIsBouncing] = useState(false);
  
  if (!cartContext) return null;
  
  const { getCartItemCount, toggleCart, cartItems } = cartContext;
  
  const itemCount = getCartItemCount();

  // Bounce animation when cart items change
  useEffect(() => {
    if (itemCount > 0) {
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [itemCount, cartItems]);

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 rounded-full hover:bg-gray-100 transition-colors group"
      aria-label="Shopping cart"
    >
      <div className={`relative ${isBouncing ? 'animate-bounce' : ''}`}>
        <FiShoppingCart className="w-7 h-7 text-gray-700 group-hover:text-blue-600 transition-colors" />
        {itemCount > 0 && (
          <>
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg transform scale-100 group-hover:scale-110 transition-transform">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-ping opacity-75"></span>
          </>
        )}
      </div>
      
      {/* Tooltip */}
      <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 text-white text-sm rounded-lg py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl">
        <div className="font-medium mb-1">Your Cart</div>
        <div className="text-gray-300">
          {itemCount === 0 
            ? 'Your cart is empty'
            : `${itemCount} item${itemCount > 1 ? 's' : ''} in cart`
          }
        </div>
        <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-900 transform rotate-45"></div>
      </div>
    </button>
  );
}