"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const { count } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-lg text-white shadow-md">
            M
          </span>
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            MyShop
          </span>
        </Link>

        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="flex items-center gap-2 rounded-full bg-gray-100 py-1 pl-1 pr-3 font-medium text-gray-700">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                Hi, {user.name}
              </span>
              <button
                onClick={logout}
                className="rounded-full px-3 py-2 font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-3 py-2 font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full border border-indigo-600 px-4 py-2 font-medium text-indigo-600 transition hover:bg-indigo-50"
              >
                Sign up
              </Link>
            </>
          )}

          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-gray-700"
          >
            Cart
            <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-gray-900">
              {count}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}