
import React from "react";

const ProductCard = ({ product }) => {
  const isUp = product?.change?.dir === "up";
  const changePct = Math.abs(product?.change?.pct ?? 0);
  const unit = product?.unit === "kg" ? "কেজি" : product?.unit || "একক";

  return (
    <div className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg sm:rounded-2xl sm:p-4 lg:p-5">
      {/* Product Info */}
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EEF3EE] text-xl sm:h-12 sm:w-12 sm:rounded-xl sm:text-2xl lg:h-14 lg:w-14">
          {product?.image || product?.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="break-words text-sm font-bold leading-snug text-gray-900 sm:text-base lg:text-lg">
            {product?.nameBn || "পণ্যের নাম"}
          </h3>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            প্রতি {unit}
          </p>
        </div>

        {/* Price Change */}
        <span
          className={`inline-flex shrink-0 items-center gap-0.5 rounded-full px-2 py-1 text-[10px] font-bold sm:gap-1 sm:px-2.5 sm:text-xs ${
            isUp
              ? "bg-red-50 text-red-600"
              : "bg-green-50 text-green-700"
          }`}
        >
          {isUp ? "↑" : "↓"} {changePct}%
        </span>
      </div>

      {/* Divider */}
      <div className="my-3 border-t border-dashed border-gray-200 sm:my-4" />

      {/* Price */}
      <div className="mt-auto flex flex-wrap items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-gray-500 sm:text-sm">আজকের দাম</p>

          <p className="mt-1 break-words text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
            ৳{product?.today ?? "—"}
          </p>
        </div>

        {product?.yesterday != null && (
          <div className="shrink-0 text-right">
            <p className="text-[10px] text-gray-500 sm:text-xs">
              গতকাল
            </p>
            <p className="text-xs font-medium text-gray-500 line-through sm:text-sm">
              ৳{product.yesterday}
            </p>
          </div>
        )}
      </div>

      {/* Hover Accent */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-green-500 transition-all duration-300 group-hover:w-full" />
    </div>
  );
};

export default ProductCard;
