// app/auth/signup/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { 
  FiMail, 
  FiLock, 
  FiUser, 
  FiEye, 
  FiEyeOff, 
  FiArrowLeft,
  FiSmartphone,
  FiMapPin
} from 'react-icons/fi';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const router = useRouter();
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms and Conditions');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        address: formData.address,
        password: formData.password // In real app, hash this
      };

      const result = await signup(formData.email, formData.password, userData);
      
      if (result.success) {
        setSuccess('Account created successfully! Redirecting to dashboard...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setError(result.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
              <FiUser className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-blue-100">Join our community today</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-center">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-center">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    First Name *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Last Name *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiSmartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Password *
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 6 characters long
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Address
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-4 top-4 text-gray-400" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your full address"
                    rows="3"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mt-1"
                  id="agreeToTerms"
                />
                <label htmlFor="agreeToTerms" className="ml-3 text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link
                    href="/auth/login"
                    className="font-bold text-blue-600 hover:text-blue-800"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Back to Home */}
          <div className="border-t p-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <FiArrowLeft className="mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}