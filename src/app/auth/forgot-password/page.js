// app/auth/forgot-password/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1); // 1: Request, 2: Success

  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const result = await forgotPassword(email);
      
      if (result.success) {
        setSuccess(result.message || 'Password reset link sent to your email');
        setStep(2);
      } else {
        setError(result.error || 'Failed to send reset link');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-pink-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
              <FiMail className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {step === 1 ? 'Reset Password' : 'Check Your Email'}
            </h1>
            <p className="text-orange-100">
              {step === 1 
                ? 'Enter your email to receive a reset link' 
                : 'We sent you a reset link'
              }
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-center">{error}</p>
              </div>
            )}

            {success && step === 2 && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <FiCheckCircle className="w-6 h-6 text-green-500 mr-2" />
                </div>
                <p className="text-green-600 text-center">{success}</p>
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    We'll send you a link to reset your password
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </span>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    We've sent password reset instructions to:
                  </p>
                  <p className="font-medium text-gray-900 bg-gray-100 p-3 rounded-lg">
                    {email}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">📧 What to do next:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Check your email inbox</li>
                    <li>• Click the password reset link</li>
                    <li>• Create a new password</li>
                    <li>• Login with your new password</li>
                  </ul>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-2">
                    Didn't receive the email?
                  </p>
                  <button
                    onClick={() => {
                      setStep(1);
                      setSuccess('');
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Try again with a different email
                  </button>
                </div>
              </div>
            )}

            {/* Back to Login */}
            <div className="mt-6 pt-6 border-t text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <FiArrowLeft className="mr-2" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}