"use client";

import React from "react";
import CurrentDate from "../CurrentDate";
import HeroImage from "@/assets/bazar-hero 1.png";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-amber-50">
      <div className="container mx-auto px-2 py-12 sm:px-6 sm:py-16 lg:px-8 lg:pt-8 lg:pb-24">
        <div className="grid bg-white items-center gap-8 md:grid-cols-2 md:gap-8 lg:gap-16">
          {/* Left Content */}
          <div className="order-2 space-y-2 text-center md:order-1 md:text-left">
            {/* Date */}
            <div className="flex justify-center md:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-2 text-sm font-medium text-green-700 shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                <CurrentDate />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-sm font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-3xl xl:text-4xl">
              আজকের বাজারের দাম
              <span className=" block text-green-600">এক নজরে</span>
            </h2>

            {/* Description */}
            <p className="mx-auto max-w-xl text-base leading-8 text-gray-600 sm:text-lg md:mx-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন জানুন এক
              জায়গায়।
            </p>

            {/* Button */}
            <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center md:justify-start">
              <Link
                href="/AllProductsSection"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-600/20 transition duration-300 hover:-translate-y-1 hover:bg-green-700 sm:w-auto"
              >
                সব পণ্য দেখুন
                <span aria-hidden="true">→</span>
              </Link>

              {/* <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-5 py-3.5 text-sm font-medium text-gray-700">
                <span className="text-lg">৳</span>
                প্রতিদিনের বাজারদর
              </div> */}
            </div>

            {/* Small Highlights */}
            {/* <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 pt-4 text-sm text-gray-600 md:justify-start">
              <span className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                বিভিন্ন পণ্যের দাম
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                সহজে দাম তুলনা
              </span>
            </div> */}
          </div>

          {/* Right Image */}
          <div className="order-1  flex justify-center md:order-2">
            <div className="relative max-w-md lg:max-w-xl">
              {/* Decorative Background */}
              <div className="absolute -inset-4 rounded-[2rem] bg-green-200/40 blur-2xl"></div>

              {/* Image Container */}
              <div className="relative overflow-hidden rounded-3xl border border-white p-2 shadow-2xl shadow-green-900/10 sm:p-4">
                <Image
                  src={HeroImage}
                  alt="বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজার"
                  width={500}
                  height={400}
                  priority
                  sizes="(max-width: 767px) 90vw, (max-width: 1279px) 45vw, 550px"
                  className="h-auto max-h-[420px] w-full rounded-2xl object-contain transition duration-500 hover:scale-[1.02]"
                />
              </div>

            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
