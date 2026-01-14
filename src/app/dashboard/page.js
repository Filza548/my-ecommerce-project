// app/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { 
  FiUser, 
  FiShoppingCart, 
  FiPackage, 
  FiHeart, 
  FiSettings,
  FiLogOut,
  FiCreditCard,
  FiMapPin,
  FiBell,
  FiHelpCircle
} from 'react-icons/fi';

export default function DashboardPage() {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const stats = [
    { icon: <FiShoppingCart />, label: 'Orders', value: '12', color: 'blue' },
    { icon: <FiHeart />, label: 'Wishlist', value: '8', color: 'pink' },
    { icon: <FiPackage />, label: 'Delivered', value: '9', color: 'green' },
    { icon: <FiCreditCard />, label: 'Pending', value: '3', color: 'yellow' },
  ];

  const recentOrders = [
    { id: 'ORD-001', date: '2024-01-15', total: '$129.99', status: 'Delivered' },
    { id: 'ORD-002', date: '2024-01-10', total: '$89.99', status: 'Processing' },
    { id: 'ORD-003', date: '2024-01-05', total: '$199.99', status: 'Delivered' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <FiBell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <FiHelpCircle className="w-5 h-5 text-gray-600" />
              </button>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Back to Shop
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              {/* Profile Info */}
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FiUser className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{user?.fullName}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500 mt-1">Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiUser className="mr-3" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiShoppingCart className="mr-3" />
                  My Orders
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'addresses'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiMapPin className="mr-3" />
                  Addresses
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiSettings className="mr-3" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FiLogOut className="mr-3" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
              <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName}!</h2>
              <p className="text-blue-100">Here's what's happening with your account today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-${stat.color}-100 mb-4 mx-auto`}>
                    <span className={`text-${stat.color}-600 text-xl`}>
                      {stat.icon}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-center text-gray-800 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-center text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
                <Link
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-gray-600">Order ID</th>
                      <th className="text-left py-3 px-4 text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 text-gray-600">Total</th>
                      <th className="text-left py-3 px-4 text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{order.id}</td>
                        <td className="py-3 px-4 text-gray-600">{order.date}</td>
                        <td className="py-3 px-4 font-bold">{order.total}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Track Order
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-600 mb-2">Full Name</label>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">{user?.fullName}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-600 mb-2">Email Address</label>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-600 mb-2">Phone Number</label>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">{user?.phone || 'Not provided'}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-600 mb-2">Member Since</label>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">
                      {new Date(user?.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-gray-600 mb-2">Address</label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">{user?.address || 'No address saved'}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Link
                  href="/profile"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}