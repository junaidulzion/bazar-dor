
import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const instant = false;

const API_URL = "https://api.abcz.workers.dev/api/bazardor";

// Fetch all products
const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

// Format price
const formatPrice = (price) => `${price} টাকা`;

// Price card component
const PriceCard = ({ title, price, color }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>

      <p className={`mt-2 text-xl font-bold ${color}`}>
        {price} টাকা
      </p>

      <p className="mt-1 text-xs text-gray-500">
        প্রতি কেজি
      </p>
    </div>
  );
};

const ProductDetailsPage = async ({ params }) => {
  // 1. Authentication check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  // 2. Get product ID from URL
  const { id } = await params;

  // 3. Fetch products
  const products = await getProducts();

  // 4. Find the requested product
  const product = products.find(
    (item) =>
      String(item.id) === String(id) ||
      item.slug === id
  );

  if (!product) {
    notFound();
  }

  // 5. Price history
  const priceHistory = [
    { label: "গতকাল", price: product.yesterday },
    { label: "গত সপ্তাহ", price: product.lastWeek },
    { label: "গত মাস", price: product.lastMonth },
  ];

  return (
    <main className="min-h-screen bg-[#f3f7f3] px-3 py-6">
      <div className="mx-auto max-w-5xl space-y-5">

        {/* Product header */}
        <section className="flex items-center justify-between gap-4 rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f0f5f0] text-3xl">
              {product.image || product.categoryIcon}
            </div>

            <div>
              <p className="text-xs text-gray-500">
                {product.categoryIcon} {product.categoryNameBn}
              </p>

              <h1 className="text-xl font-bold text-gray-800">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            ফিরে যান
          </Link>
        </section>

        {/* Price summary */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <PriceCard
            title="আজকের দাম"
            price={product.today}
            color="text-green-600"
          />

          <PriceCard
            title="গতকালের দাম"
            price={product.yesterday}
            color="text-red-500"
          />

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">
              দামের পরিবর্তন
            </p>

            <p
              className={`mt-2 text-xl font-bold ${
                product.change.dir === "up"
                  ? "text-red-500"
                  : product.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-700"
              }`}
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {product.change.pct}%
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {product.change.dir === "up"
                ? "দাম বেড়েছে"
                : product.change.dir === "down"
                  ? "দাম কমেছে"
                  : "দাম অপরিবর্তিত"}
            </p>
          </div>
        </section>

        {/* Price history */}
        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-bold text-gray-800">
            📈 আগের দামের তুলনা
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {priceHistory.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-gray-100 bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">
                  {item.label}
                </p>

                <p className="mt-2 font-bold text-gray-800">
                  {formatPrice(item.price)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Market prices */}
        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-bold text-gray-800">
            🏪 বিভিন্ন বাজারে {product.nameBn}-এর দাম
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-600">
                  <th className="px-4 py-3">বাজার</th>
                  <th className="px-4 py-3">বিভাগ</th>
                  <th className="px-4 py-3">সর্বনিম্ন দাম</th>
                  <th className="px-4 py-3">সর্বোচ্চ দাম</th>
                </tr>
              </thead>

              <tbody>
                {product.markets?.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-b border-gray-100 hover:bg-green-50"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {market.market}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {market.division}
                    </td>

                    <td className="px-4 py-3 text-green-700">
                      {formatPrice(market.min)}
                    </td>

                    <td className="px-4 py-3 text-red-600">
                      {formatPrice(market.max)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  );
};

export default ProductDetailsPage;