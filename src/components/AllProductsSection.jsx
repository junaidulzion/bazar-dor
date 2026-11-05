import ProductCard from "@/components/ProductCard";

const API_URL = "https://api.abcz.workers.dev/api/bazardor";

const AllProductsSection = async () => {
  const res = await fetch(`${API_URL}/products`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return (
    <section className="container mx-auto mt-7 px-4">
      <h2 className="mb-2 text-2xl font-bold">সব পণ্য</h2>

      <p className="mb-4 text-sm text-gray-600">
        মোট {products.length} টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProductsSection;