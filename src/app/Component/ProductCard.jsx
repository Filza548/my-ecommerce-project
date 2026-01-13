// components/ProductCard.js
'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { CartContext } from '../../context/CartContext.js';
import { FiShoppingCart, FiCheck } from 'react-icons/fi';

export default function ProductCard({ product }) {
  const cartContext = useContext(CartContext);
  
  const addToCart = cartContext?.addToCart;
  const cartItems = cartContext?.cartItems || [];
  const isCartOpen = cartContext?.isCartOpen || false;
  
  const cartItem = cartItems.find(item => item.id === product.id);
  const isInCart = Boolean(cartItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (addToCart) {
      addToCart(product);
      
      // Show success animation
      const button = e.currentTarget;
      button.classList.add('bg-green-500');
      
      setTimeout(() => {
        button.classList.remove('bg-green-500');
      }, 500);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-400">★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">★</span>
        ))}
        <span className="ml-2 text-gray-600 text-sm">({product.reviews}k)</span>
      </div>
    );
  };

  return (
    <Link href={`/product/${product.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
        {/* Product Image with Badges */}
        <div className="relative overflow-hidden">
          <div className="bg-gradient-to-br from-blue-50 to-gray-100 h-48 rounded-t-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <div className="text-center transform group-hover:scale-110 transition-transform duration-500">
              <div className="text-5xl mb-2">📱</div>
              <p className="text-gray-500 text-sm">{product.brand}</p>
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3">
            {product.stock < 10 && product.stock > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                Only {product.stock} left!
              </span>
            )}
          </div>
          
          <div className="absolute top-3 right-3">
            {isInCart && (
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                <FiCheck className="inline mr-1" />
                In Cart ({cartItem.quantity})
              </span>
            )}
          </div>
          
          {/* Add to Cart Quick Button */}
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-3 right-3 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
              isInCart
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
            } ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={product.stock === 0}
            aria-label="Add to cart"
          >
            {isInCart ? (
              <FiCheck className="w-5 h-5" />
            ) : (
              <FiShoppingCart className="w-5 h-5" />
            )}
          </button>
        </div>
        
        {/* Product Info */}
        <div className="p-5 flex-1">
          <div className="mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
          
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="mb-3">
            {renderStars(product.rating)}
          </div>
          
          {/* Price */}
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ${product.discountedPrice.toFixed(2)}
            </span>
            <span className="ml-3 text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
            <span className="ml-3 bg-gradient-to-r from-red-100 to-pink-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
              Save ${(product.originalPrice - product.discountedPrice).toFixed(2)}
            </span>
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="text-gray-500 text-xs px-2 py-1">
                +{product.features.length - 2} more
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="text-sm mb-2">
            {product.stock > 10 ? (
              <span className="text-green-600 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                In Stock ({product.stock} available)
              </span>
            ) : product.stock > 0 ? (
              <span className="text-yellow-600 flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Only {product.stock} left!
              </span>
            ) : (
              <span className="text-red-600 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Out of Stock
              </span>
            )}
          </div>
        </div>
        
        {/* Add to Cart Full Button */}
        <div className="p-5 pt-0">
          <button 
            onClick={handleAddToCart}
            className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center ${
              isInCart
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg'
                : product.stock === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
            }`}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? (
              'Out of Stock'
            ) : isInCart ? (
              <>
                <FiShoppingCart className="mr-2" />
                Add More ({cartItem.quantity} in cart)
              </>
            ) : (
              <>
                <FiShoppingCart className="mr-2" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}