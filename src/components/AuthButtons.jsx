"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";

export default function AuthButtons() {
  const { data, isPending } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (isPending) {
    return <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />;
  }

  const user = data?.user;

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="rounded-lg border border-green-600 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-50"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Profile toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="প্রোফাইল মেনু"
        className="flex items-center gap-2 rounded-full px-2 py-1.5 transition hover:bg-gray-100"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "Profile"}
            width={28}
            height={28}
            className="rounded-full object-cover"
          />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </span>
        )}

        <span className="hidden max-w-24 truncate text-sm font-medium text-gray-800 sm:block">
          {user.name?.split(" ")[0] || "প্রোফাইল"}
        </span>

        <svg
          className={`h-3 w-3 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Profile dropdown */}
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="মেনু বন্ধ করুন"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
            <div className="border-b border-gray-100 pb-3">
              <p className="truncate text-sm font-semibold text-gray-900">
                {user.name}
              </p>
              <p className="truncate text-xs text-gray-500">
                {user.email}
              </p>
            </div>

            <div className="mt-2 space-y-1">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span>👤</span>
                <span>আমার প্রোফাইল</span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                <span>↪</span>
                <span>সাইন আউট</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}