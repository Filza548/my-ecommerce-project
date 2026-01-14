// app/order-success/page.js
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiCheckCircle, FiPackage, FiTruck, FiHome, FiShoppingBag } from 'react-icons/fi';

// Safe hook for localStorage
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key);
      setValue(item ? JSON.parse(item) : initialValue);
    }
  }, [key, initialValue]);

  const setLocalStorageValue = (newValue) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    }
    setValue(newValue);
  };

  return [value, setLocalStorageValue];
};

// Loading component
function OrderSuccessLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading order details...</p>
      </div>
    </div>
  );
}

// Main content component
function OrderSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastOrder, setLastOrder] = useLocalStorage('lastOrder', null);
  
  useEffect(() => {
    // Client-side pe hi run karein
    if (typeof window === 'undefined') return;

    const orderId = searchParams?.get('orderId');
    
    if (orderId) {
      // Pehle localStorage se check karein
      const savedOrder = lastOrder;
      
      if (savedOrder && savedOrder.id === orderId) {
        setOrder(savedOrder);
      } else {
        // Agar nahi mila toh dummy order banayein
        const dummyOrder = {
          id: orderId,
          total: 429.84,
          date: new Date().toISOString(),
          status: 'processing',
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { name: 'Sample Product', price: 99.99, quantity: 1 },
            { name: 'Accessory', price: 29.99, quantity: 2 }
          ]
        };
        setOrder(dummyOrder);
      }
    } else {
      // Redirect to home if no orderId
      router.push('/');
    }
    
    setIsLoading(false);
  }, [searchParams, router, lastOrder]);

  if (isLoading) {
    return <OrderSuccessLoading />;
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPackage className="w-10 h-10 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Order Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find your order details.</p>
          </div>
          <div className="space-y-4">
            <Link 
              href="/" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
            <div>
              <Link 
                href="/dashboard" 
                className="text-blue-600 hover:text-blue-800"
              >
                View your orders in dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Recent order';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Success Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 sm:p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full mb-4">
              <FiCheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Order Confirmed!</h1>
            <p className="text-green-100 text-sm sm:text-base">Thank you for your purchase</p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Order Info */}
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-2">Order Number</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 font-mono">{order.id}</p>
              <p className="text-gray-600 mt-4 text-sm sm:text-base">
                We've sent a confirmation email with all the details
              </p>
            </div>

            {/* Order Timeline */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Timeline</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <FiPackage className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Order Placed</h4>
                    <p className="text-gray-600">Your order has been received</p>
                    <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FiPackage className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Processing</h4>
                    <p className="text-gray-600">We're preparing your order</p>
                    <p className="text-sm text-gray-500">Current Status</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <FiTruck className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Shipping</h4>
                    <p className="text-gray-600">Your order will be shipped soon</p>
                    <p className="text-sm text-gray-500">
                      Estimated: {formatDate(order.estimatedDelivery)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items Total</span>
                  <span className="font-medium">${order.total?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-lg font-semibold text-gray-900">Total Paid</span>
                  <span className="text-lg font-bold text-gray-900">
                    ${order.total?.toFixed(2) || '0.00'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Link
                href="/"
                className="flex items-center justify-center py-3 px-4 sm:px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                <FiHome className="mr-2 flex-shrink-0" />
                Continue Shopping
              </Link>
              
              <button
                onClick={() => {
                  // Create and download a simple invoice
                  const invoiceContent = `
                    Invoice for Order: ${order.id}
                    Date: ${new Date().toLocaleDateString()}
                    Total: $${order.total?.toFixed(2)}
                    
                    Thank you for your purchase!
                    MobileShop Team
                  `;
                  
                  const blob = new Blob([invoiceContent], { type: 'text/plain' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `invoice-${order.id}.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);
                }}
                className="flex items-center justify-center py-3 px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
              >
                <FiShoppingBag className="mr-2 flex-shrink-0" />
                Download Invoice
              </button>
            </div>

            {/* Support Info */}
            <div className="mt-8 pt-8 border-t text-center">
              <p className="text-gray-600 mb-2 text-sm sm:text-base">Need help with your order?</p>
              <p className="text-gray-900 font-medium text-sm sm:text-base">Contact us: support@mobileshop.com</p>
              <p className="text-gray-900 font-medium text-sm sm:text-base">Phone: 1-800-MOBILE-SHOP</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="max-w-4xl mx-auto mt-8 sm:mt-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">📧</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Order Confirmation</h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                You'll receive an email with your order details and tracking information
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">📦</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Order Processing</h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Our team will prepare your items for shipment within 24 hours
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">🚚</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Delivery</h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Your order will be delivered within 3-5 business days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main exported component
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessLoading />}>
      <OrderSuccessContent />
    </Suspense>
  );
}
// Vercel ke liye static export ko disable karein
export const dynamic = 'force-dynamic';
// export const revalidate = 0;