"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    "All category",
    "Gadgets",
    "Clothes",
    "Accessories",
    "Home",
    "Sports",
    "Beauty",
  ];

  return (
    <header className="w-full border-b bg-white">
      {/* ===== TOP BAR ===== */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-3 md:px-6">
        {/* Mobile Hamburger */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 9V7a5 5 0 0 1 10 0v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M6 9h12l1 12H5L6 9Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-xl font-semibold text-blue-600">Brand</span>
        </a>

        {/* Desktop Search */}
        <div className="hidden flex-1 md:flex">
          <div className="flex w-full items-stretch overflow-hidden rounded-md border">
            <div className="flex flex-1 items-center">
              <input
                className="w-full px-4 py-2 text-sm outline-none"
                placeholder="Search"
              />
            </div>

            <div className="border-l">
              <select className="h-full bg-white px-3 text-sm outline-none">
                <option>All category</option>
                <option>Gadgets</option>
                <option>Clothes</option>
                <option>Accessories</option>
              </select>
            </div>

            <button className="bg-blue-600 px-6 text-sm font-medium text-white hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>

        {/* Right icons (Desktop) */}
        <div className="ml-auto hidden items-center gap-6 md:flex">
          <TopIcon label="Profile">
            <UserIcon />
          </TopIcon>
          <TopIcon label="Message">
            <MessageIcon />
          </TopIcon>
          <TopIcon label="Orders">
            <OrdersIcon />
          </TopIcon>
          <TopIcon label="My cart">
            <CartIcon />
          </TopIcon>
        </div>

        {/* Right icons (Mobile) */}
        <div className="ml-auto flex items-center gap-3 md:hidden">
          <button className="rounded-md p-2 hover:bg-gray-100" aria-label="Cart">
            <CartIcon />
          </button>
          <button className="rounded-md p-2 hover:bg-gray-100" aria-label="User">
            <UserIcon />
          </button>
        </div>
      </div>

      {/* Mobile Search Row */}
      <div className="mx-auto max-w-7xl px-3 pb-3 md:hidden">
        <div className="flex items-stretch overflow-hidden rounded-md border bg-white">
          <div className="flex flex-1 items-center gap-2 px-3">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gray-500"
            >
              <path
                d="M21 21l-4.3-4.3m1.3-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              className="w-full py-2 text-sm outline-none"
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      {/* ===== SECOND ROW (Desktop) ===== */}
      <div className="hidden border-t md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* Left menu */}
          <div className="flex items-center gap-6">
            <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              <span className="inline-flex rounded-md p-2 hover:bg-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              All category
            </button>

            <Link href="./CategoryListing">Product</Link>
           
            <NavLink className="inline-flex items-center gap-1">
              Help <ChevronDown />
            </NavLink>
          </div>

          {/* Right dropdowns */}
          <div className="flex items-center gap-6 text-sm text-gray-700">
            <button className="inline-flex items-center gap-1 hover:text-gray-900">
              English, USD <ChevronDown />
            </button>

            <button className="inline-flex items-center gap-2 hover:text-gray-900">
              Ship to
              <span className="inline-flex h-4 w-6 items-center justify-center rounded-sm bg-gray-100 text-[10px] font-semibold">
                🇩🇪
              </span>
              <ChevronDown />
            </button>
          </div>
        </div>
      </div>

      {/* ===== MOBILE TOGGLE MENU ===== */}
      {mobileMenuOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="px-3 py-3">
            <div className="space-y-2 text-sm">
              <MobileLink>Hot offers</MobileLink>
              <MobileLink>Gift boxes</MobileLink>
              <MobileLink>Projects</MobileLink>
              <MobileLink>Menu item</MobileLink>
              <MobileLink>Help</MobileLink>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 text-sm text-gray-700">
              <button className="inline-flex items-center gap-1 rounded-md border px-3 py-2">
                English, USD <ChevronDown />
              </button>

              <button className="inline-flex items-center gap-2 rounded-md border px-3 py-2">
                Ship to <span className="text-xs">🇩🇪</span> <ChevronDown />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MOBILE CATEGORY PILLS ===== */}
      <div className="md:hidden">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-3 pb-3">
          {categories.map((c) => (
            <button
              key={c}
              className={`whitespace-nowrap rounded-md border px-3 py-1.5 text-sm ${
                c === "All category"
                  ? "border-blue-100 bg-blue-50 text-blue-700"
                  : "bg-white text-gray-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ===== Helper Components (NO TS TYPES) ===== */

function NavLink({ children, className = "" }) {
  return (
    <a
      href="#"
      className={`text-sm text-gray-700 hover:text-gray-900 ${className}`}
    >
      {children}
    </a>
  );
}

function MobileLink({ children }) {
  return (
    <a
      href="#"
      className="block rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
    >
      {children}
    </a>
  );
}

function TopIcon({ children, label }) {
  return (
    <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
        {children}
      </span>
      <span className="text-xs">{label}</span>
    </button>
  );
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-500">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 21a8 8 0 0 0-16 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6h16v12H7l-3 3V6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M7 10h10M7 14h7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M7 7h14v14H7V7Z" stroke="currentColor" strokeWidth="2" />
      <path d="M3 3h14v14H3V3Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 6h15l-1.5 9H7.2L6 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 6 5 3H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
