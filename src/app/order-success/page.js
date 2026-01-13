// app/order-success/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiCheckCircle, FiPackage, FiTruck, FiHome, FiShoppingBag } from 'react-icons/fi';

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState(null);
  
  useEffect(() => {
    const orderId = searchParams.get('orderId');
    
    if (orderId) {
      // In real app, fetch order from API
      // For demo, use localStorage or create dummy order
      const savedOrder = localStorage.getItem('lastOrder');
      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      } else {
        // Create dummy order for demo
        setOrder({
          id: orderId,
          total: 429.84,
          date: new Date().toISOString(),
          status: 'processing',
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
    } else {
      router.push('/');
    }
  }, [searchParams, router]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Success Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
              <FiCheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h1>
            <p className="text-green-100">Thank you for your purchase</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Order Info */}
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-2">Order Number</p>
              <p className="text-2xl font-bold text-gray-900">{order.id}</p>
              <p className="text-gray-600 mt-4">
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
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/"
                className="flex items-center justify-center py-3 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FiHome className="mr-2" />
                Continue Shopping
              </Link>
              
              <button
                onClick={() => {
                  // In real app, this would download invoice
                  alert('Invoice download started!');
                }}
                className="flex items-center justify-center py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <FiShoppingBag className="mr-2" />
                Download Invoice
              </button>
            </div>

            {/* Support Info */}
            <div className="mt-8 pt-8 border-t text-center">
              <p className="text-gray-600 mb-2">Need help with your order?</p>
              <p className="text-gray-900 font-medium">Contact us: support@mobileshop.com</p>
              <p className="text-gray-900 font-medium">Phone: 1-800-MOBILE-SHOP</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Order Confirmation</h4>
              <p className="text-gray-600">
                You'll receive an email with your order details and tracking information
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Order Processing</h4>
              <p className="text-gray-600">
                Our team will prepare your items for shipment within 24 hours
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Delivery</h4>
              <p className="text-gray-600">
                Your order will be delivered within 3-5 business days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}