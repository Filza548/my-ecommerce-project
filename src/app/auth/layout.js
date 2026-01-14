// app/auth/layout.js
import { Inter } from 'next/font/google';
import '../globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Authentication | MobileShop',
  description: 'Sign up or login to your account',
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen`}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="py-6 px-4">
            <div className="container mx-auto">
              <Link 
                href="/" 
                className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
              >
                MobileShop
              </Link>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center px-4">
            <div className="w-full max-w-7xl mx-auto">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="py-6 px-4 text-center text-gray-600 text-sm">
            <p>© 2024 MobileShop. All rights reserved.</p>
            <p className="mt-1">
              <Link href="/" className="hover:text-blue-600">Home</Link> • 
              <Link href="/auth/login" className="hover:text-blue-600 ml-2">Login</Link> • 
              <Link href="/auth/signup" className="hover:text-blue-600 ml-2">Sign Up</Link>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}