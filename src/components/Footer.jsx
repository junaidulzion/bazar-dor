import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-green-100 bg-white">
      <div className="container mx-auto flex flex-col gap-3 px-4 py-5 text-xs text-gray-600 sm:px-6 sm:py-6 sm:text-sm md:flex-row md:items-center md:justify-between md:gap-6">
        {/* Left side */}
        <p className="text-center font-medium md:text-left">
          <span className="text-green-700">বাজার দর</span>
          <span className="mx-2 text-gray-400">—</span>
          প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right side */}
        <p className="text-center leading-relaxed text-gray-500 md:max-w-md md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;