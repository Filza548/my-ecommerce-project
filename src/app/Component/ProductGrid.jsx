// components/ProductGrid.js
'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useCart } from '../../context/CartContext.js';

export default function ProductGrid({ products }) {
  const { cartItems } = useCart();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Show notification when cart updates
  useEffect(() => {
    if (cartItems.length > 0) {
      const lastItem = cartItems[cartItems.length - 1];
      setNotificationMessage(`${lastItem.name} added to cart!`);
      setShowNotification(true);
      
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [cartItems]);

  if (products.length === 0) {
    return (
      <div className="col-span-3 bg-white rounded-lg shadow-sm p-12 text-center">
        <div className="text-5xl mb-4">😔</div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
        <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <>
      {/* Cart Notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center">
            <span className="mr-2">✓</span>
            <span>{notificationMessage}</span>
            <button 
              onClick={() => setShowNotification(false)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Cart Summary Badge */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-blue-700">
          <span className="font-semibold">{cartItems.length}</span> items in cart • 
          Total: <span className="font-semibold">${cartItems.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0).toFixed(2)}</span>
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}