// components/CartSidebar.js
'use client';

import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext.js';
import Link from 'next/link';
import { 
  FiShoppingBag, 
  FiTrash2, 
  FiX, 
  FiPlus, 
  FiMinus, 
  FiCheckCircle,
  FiArrowRight,
  FiPackage,
  FiTruck,
  FiShield,
  FiCreditCard
} from 'react-icons/fi';
import { IoBagCheckOutline } from 'react-icons/io5';

export default function CartSidebar() {
  const cartContext = useContext(CartContext);
  const [isAnimating, setIsAnimating] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState(null);
  
  if (!cartContext) return null;
  
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    isCartOpen,
    setIsCartOpen,
    lastAddedItem,
    showAddedNotification
  } = cartContext;

  // Animation for recently added item
  useEffect(() => {
    if (lastAddedItem) {
      setRecentlyAdded(lastAddedItem);
      setIsAnimating(true);
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem]);

  if (!isCartOpen) return null;

  const shippingCost = getCartTotal() > 100 ? 0 : 9.99;
  const tax = getCartTotal() * 0.08;
  const total = getCartTotal() + shippingCost + tax;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md z-50">
        <div className="h-full flex flex-col bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center">
              <div className="relative">
                <IoBagCheckOutline className="w-8 h-8 text-blue-600" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>
              <div className="ml-3">
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                <p className="text-sm text-gray-600">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiX className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Added to Cart Notification */}
          {showAddedNotification && lastAddedItem && (
            <div className="mx-4 mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg animate-fadeIn">
              <div className="flex items-center">
                <FiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <div className="flex-1">
                  <p className="font-medium text-green-800">
                    Added to cart!
                  </p>
                  <p className="text-sm text-green-600 truncate">
                    {lastAddedItem.quantity}x {lastAddedItem.name}
                  </p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-green-600 hover:text-green-800"
                >
                  View
                </button>
              </div>
            </div>
          )}

          {/* Recently Added Animation */}
          {isAnimating && recentlyAdded && (
            <div className="absolute top-20 right-1/2 transform translate-x-1/2 z-10">
              <div className="bg-white rounded-lg shadow-lg p-3 border animate-bounce">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-lg">📱</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">+{recentlyAdded.quantity} added</p>
                    <p className="text-xs text-gray-500">To your cart</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Add some products to get started
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Continue Shopping
                  <FiArrowRight className="ml-2" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-700">Items in Cart</h3>
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>
                
                {cartItems.map((item, index) => (
                  <div 
                    key={`${item.id}-${index}`}
                    className={`bg-white border rounded-xl p-4 hover:shadow-md transition-all duration-300 ${
                      isAnimating && recentlyAdded?.id === item.id 
                        ? 'ring-2 ring-blue-500 ring-opacity-50' 
                        : ''
                    }`}
                  >
                    <div className="flex items-start">
                      {/* Product Image */}
                      <div className="relative flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">📱</span>
                        </div>
                        {item.quantity > 1 && (
                          <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {item.quantity}
                          </div>
                        )}
                      </div>
                      
                      {/* Product Details */}
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 line-clamp-2">
                              {item.name}
                            </h4>
                            <div className="flex items-center mt-1">
                              <span className="text-sm text-gray-500 mr-3">
                                {item.brand}
                              </span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {item.sku || 'SKU-001'}
                              </span>
                            </div>
                          </div>
                          
                          {/* Price */}
                          <div className="text-right ml-4">
                            <p className="font-bold text-gray-900">
                              ${(item.discountedPrice * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              ${item.discountedPrice.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center border rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <FiMinus className="w-4 h-4 text-gray-600" />
                              </button>
                              <span className="px-4 py-1 text-gray-900 font-medium min-w-[40px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100"
                              >
                                <FiPlus className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                            
                            {/* Remove Button */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {/* Total Price */}
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Total</p>
                            <p className="font-semibold text-gray-900">
                              ${(item.discountedPrice * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        
                        {/* Features Tags */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {item.features?.slice(0, 2).map((feature, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary & Actions */}
          {cartItems.length > 0 && (
            <div className="border-t bg-gradient-to-t from-gray-50 to-white">
              {/* Trust Badges */}
              <div className="p-4 border-b">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <FiTruck className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <FiShield className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Secure Payment</p>
                  </div>
                  <div className="text-center">
                    <FiPackage className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Easy Returns</p>
                  </div>
                </div>
              </div>
              
              {/* Price Summary */}
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">
                        ${total.toFixed(2)}
                      </span>
                      <p className="text-xs text-gray-500">Including all taxes</p>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3 mt-6">
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl text-center transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-center">
                      <FiCreditCard className="mr-2" />
                      Proceed to Checkout
                    </div>
                  </Link>
                  
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    Continue Shopping
                  </button>
                  
                  {/* Promo Code */}
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-2">Have a promo code?</p>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-3 rounded-r-lg transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Secure Payment Message */}
                <div className="mt-6 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="flex items-center">
                    <FiShield className="text-green-500 mr-2" />
                    <span className="text-sm text-green-700">
                      💳 Your payment is secure and encrypted
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-bounce {
          animation: bounce 0.5s ease-in-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}