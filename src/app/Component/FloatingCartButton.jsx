// components/FloatingCartButton.js (Optional)
'use client';

import { useContext } from 'react';
import { CartContext } from '../../context/CartContext.js';
import { FiShoppingCart } from 'react-icons/fi';

export default function FloatingCartButton() {
  const cartContext = useContext(CartContext);
  
  if (!cartContext) return null;
  
  const { getCartItemCount, toggleCart } = cartContext;
  const itemCount = getCartItemCount();

  return (
    <>
      {/* Floating Cart Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <button
          onClick={toggleCart}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-110"
        >
          <FiShoppingCart className="w-6 h-6" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Quick View Cart */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <div className="bg-white rounded-xl shadow-2xl p-4 w-64">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Quick Cart</h3>
            <button
              onClick={toggleCart}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All
            </button>
          </div>
          
          {itemCount > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                {itemCount} item{itemCount > 1 ? 's' : ''} in cart
              </p>
              <button
                onClick={toggleCart}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
              >
                Checkout Now
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-2">
              Your cart is empty
            </p>
          )}
        </div>
      </div>
    </>
  );
}