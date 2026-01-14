// app/checkout/page.js - CORRECTED VERSION
'use client';

import { Suspense, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartContext } from '../../context/CartContext';
import Link from 'next/link';
import { FiLock, FiCreditCard, FiTruck, FiCheck, FiArrowLeft } from 'react-icons/fi';

// Loading component
function CheckoutLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

// Main checkout content
function CheckoutContent() {
  const router = useRouter();
  const cartContext = useContext(CartContext);
  const [isClient, setIsClient] = useState(false);
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'USA',
    paymentMethod: 'credit_card'
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Client-side only variables
  const cartItems = isClient ? (cartContext?.cartItems || []) : [];
  const getCartTotal = cartContext?.getCartTotal || (() => 0);
  const clearCart = cartContext?.clearCart;

  const shippingCost = isClient ? (getCartTotal() > 100 ? 0 : 9.99) : 0;
  const tax = isClient ? getCartTotal() * 0.08 : 0;
  const total = isClient ? getCartTotal() + shippingCost + tax : 0;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate shipping info
      const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'zipCode'];
      const isValid = requiredFields.every(field => formData[field].trim() !== '');
      
      if (isValid) {
        setStep(2);
      } else {
        alert('Please fill in all required fields');
      }
    } else if (step === 2) {
      setIsProcessing(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate order
      const orderId = 'ORD-' + Date.now();
      const order = {
        id: orderId,
        items: cartItems,
        total,
        shippingInfo: formData,
        date: new Date().toISOString(),
        status: 'processing'
      };
      
      // Save order to localStorage (client-side only)
      if (isClient && typeof window !== 'undefined') {
        localStorage.setItem('lastOrder', JSON.stringify(order));
      }
      
      // Clear cart
      if (clearCart) {
        clearCart();
      }
      
      setIsProcessing(false);
      router.push(`/order-success?orderId=${orderId}`);
    }
  };

  // Show loading if not client-side yet
  if (!isClient) {
    return <CheckoutLoading />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <FiArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <FiArrowLeft className="mr-2" />
            Back to Shop
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {step > 1 ? <FiCheck /> : '1'}
              </div>
              <span className="text-sm font-medium">Shipping</span>
            </div>
            
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {step > 2 ? <FiCheck /> : '2'}
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                <>
                  {/* Shipping Information */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center mb-6">
                      <FiTruck className="w-6 h-6 text-gray-600 mr-3" />
                      <h2 className="text-xl font-semibold text-gray-800">Shipping Information</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-gray-700 mb-2">Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="block text-gray-700 mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Zip Code *</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Country</label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="USA">United States</option>
                          <option value="UK">United Kingdom</option>
                          <option value="CA">Canada</option>
                          <option value="AU">Australia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
                  >
                    Continue to Payment
                  </button>
                </>
              ) : (
                <>
                  {/* Payment Information */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center mb-6">
                      <FiCreditCard className="w-6 h-6 text-gray-600 mr-3" />
                      <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center p-4 border rounded-lg">
                        <input
                          type="radio"
                          id="credit_card"
                          name="paymentMethod"
                          value="credit_card"
                          checked={formData.paymentMethod === 'credit_card'}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-blue-600"
                        />
                        <label htmlFor="credit_card" className="ml-3 flex-1">
                          <span className="font-medium">Credit/Debit Card</span>
                          <p className="text-sm text-gray-500">Pay with your credit or debit card</p>
                        </label>
                        <div className="flex space-x-2">
                          <span className="text-xl">💳</span>
                          <span className="text-xl">🏦</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-4 border rounded-lg">
                        <input
                          type="radio"
                          id="paypal"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-blue-600"
                        />
                        <label htmlFor="paypal" className="ml-3 flex-1">
                          <span className="font-medium">PayPal</span>
                          <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                        </label>
                        <span className="text-xl text-blue-600">P</span>
                      </div>
                      
                      <div className="flex items-center p-4 border rounded-lg">
                        <input
                          type="radio"
                          id="cash"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-blue-600"
                        />
                        <label htmlFor="cash" className="ml-3 flex-1">
                          <span className="font-medium">Cash on Delivery</span>
                          <p className="text-sm text-gray-500">Pay when you receive your order</p>
                        </label>
                        <span className="text-xl">💰</span>
                      </div>
                    </div>
                    
                    {/* Credit Card Form (if selected) */}
                    {formData.paymentMethod === 'credit_card' && (
                      <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 mb-2">Card Number</label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 mb-2">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 mb-2">CVV</label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 mb-2">Cardholder Name</label>
                            <input
                              type="text"
                              placeholder="John Doe"
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <span className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <FiLock className="mr-2" />
                          Complete Order
                        </span>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center border-b pb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-xl">📱</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 line-clamp-1">{item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${(item.discountedPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Price Breakdown */}
              <div className="space-y-3 border-t pt-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between border-t pt-3">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Security Message */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <FiLock className="text-green-600 mr-2" />
                  <span className="text-sm text-green-700">
                    Your payment is secure and encrypted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main exported component with Suspense
export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}

// Vercel ke liye static export ko disable karein
// SIRF yeh line use karein, revalidate nahi
export const dynamic = 'force-dynamic';
// export const revalidate = 0; // ← YE HATA DEIN