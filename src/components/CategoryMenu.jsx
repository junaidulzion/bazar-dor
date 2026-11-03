"use client";

import Link from "next/link";
import { useState } from "react";

const CategoryMenu = ({ navs }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Mobile hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle categories"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-lg p-2 hover:bg-green-100 md:hidden"
      >
        {isOpen ? (
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}

        <span>ক্যাটাগরি</span>
      </button>

      {/* Desktop navigation */}
      <ul className="hidden flex-wrap items-center gap-2 md:flex lg:gap-3">
        {navs?.map((cat) => (
          <li key={cat.id}>
            <Link
              href={`/category/${cat.slug}`}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-green-100 lg:text-base"
            >
              <span>{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile dropdown */}
      {isOpen && (
        <ul className="absolute left-0 top-full z-50 mt-2 grid w-56 gap-1 rounded-lg border border-gray-200 bg-white p-2 shadow-lg md:hidden">
          {navs?.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/category/${cat.slug}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-green-100"
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryMenu;