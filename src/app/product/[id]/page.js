// app/product/[id]/page.js
'use client';

import { useState, useEffect, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products } from '../../../data/product.js';
import { CartContext } from '../../../context/CartContext';
import Link from 'next/link';
import { FiShoppingCart, FiHeart, FiShare2, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const cartContext = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonText, setButtonText] = useState('Add to Cart');

  useEffect(() => {
    const productId = parseInt(params.id);
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      router.push('/');
    }
    setIsLoading(false);
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const cartItems = cartContext?.cartItems || [];
  const cartItem = cartItems.find(item => item.id === product.id);
  const isInCart = Boolean(cartItem);

  const handleAddToCartWithAnimation = () => {
    if (cartContext?.addToCart) {
      // Add multiple quantity
      for (let i = 0; i < quantity; i++) {
        cartContext.addToCart(product);
      }
      
      // Show success animation
      setButtonText('✓ Added!');
      
      setTimeout(() => {
        const newCartItem = cartContext?.cartItems?.find(item => item.id === product.id);
        const newQuantity = newCartItem ? newCartItem.quantity : quantity;
        setButtonText(isInCart 
          ? `Add More (${newQuantity} in cart)` 
          : 'Add to Cart');
      }, 1500);
    }
  };

  const handleBuyNow = () => {
    if (cartContext?.addToCart) {
      for (let i = 0; i < quantity; i++) {
        cartContext.addToCart(product);
      }
      router.push('/checkout');
    }
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(product.stock, value));
    setQuantity(newQuantity);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400 text-xl">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-400 text-xl">★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 text-xl">★</span>
        ))}
        <span className="ml-2 text-gray-600">({product.reviews}k reviews)</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <FiArrowLeft className="mr-2" />
              Back to Products
            </Link>
            <div className="ml-auto flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <FiHeart className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <FiShare2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-6xl">📱</div>
              </div>
              
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {[1, 2, 3].map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded border-2 ${
                      selectedImage === index 
                        ? 'border-blue-500' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xl">📱</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Highlights */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Product Highlights</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="mb-4">
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="ml-2 bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {product.brand}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="mb-4">
                {renderStars(product.rating)}
              </div>

              <div className="flex items-center mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="ml-4 text-xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="ml-4 bg-red-100 text-red-600 font-semibold px-3 py-1 rounded">
                  Save ${(product.originalPrice - product.discountedPrice).toFixed(2)}
                </span>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Availability:</span>
                  {product.stock > 10 ? (
                    <span className="text-green-600 font-semibold">In Stock ({product.stock} available)</span>
                  ) : product.stock > 0 ? (
                    <span className="text-yellow-600 font-semibold">Only {product.stock} left!</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Out of Stock</span>
                  )}
                </div>
                {product.stock > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, (product.stock / 100) * 100)}%` }}
                    ></div>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Quantity:</label>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="px-4 py-2 border border-gray-300 rounded-l-lg disabled:opacity-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    className="w-16 py-2 text-center border-t border-b border-gray-300"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="px-4 py-2 border border-gray-300 rounded-r-lg disabled:opacity-50"
                  >
                    +
                  </button>
                  <span className="ml-4 text-gray-600">
                    {product.stock} available
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  id="addToCartBtn"
                  onClick={handleAddToCartWithAnimation}
                  disabled={product.stock === 0}
                  className={`flex items-center justify-center py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg ${
                    buttonText === '✓ Added!'
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : isInCart
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                      : product.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                  }`}
                >
                  <FiShoppingCart className="mr-3" size={20} />
                  {product.stock === 0 
                    ? 'Out of Stock' 
                    : buttonText
                  }
                </button>
                
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className={`py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg ${
                    product.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white'
                  }`}
                >
                  Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <FiTruck className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <FiShield className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">2 Year Warranty</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-sm text-gray-600">Genuine Product</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Specifications</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Brand</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Model</span>
                  <span className="font-medium">{product.name.split('-')[0]}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">SKU</span>
                  <span className="font-medium">{product.sku}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-medium">{product.condition}</span>
                </div>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h3 className="font-semibold text-gray-800 mb-4">Description</h3>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow duration-300">
                  <Link href={`/product/${relatedProduct.id}`}>
                    <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center mb-3 hover:scale-105 transition-transform duration-300">
                      <span className="text-3xl">📱</span>
                    </div>
                    <h4 className="font-medium text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      {relatedProduct.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">
                        ${relatedProduct.discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}