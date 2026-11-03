import ProductCard from "@/components/ProductCard";
import Link from "next/link";
export const instant = false;

const API_URL = "https://api.abcz.workers.dev/api/bazardor";

// Fetch all categories
const getCategories = async () => {
  const res = await fetch(`${API_URL}/categories`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

// Fetch products for the selected category
const getCategoryProducts = async (categorySlug) => {
  const res = await fetch(`${API_URL}/products?category=${categorySlug}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch category products");
  }
 
  return res.json();
};

const CategoryProducts = async ({ params }) => {
  const { categorySlug } = await params;

  // Fetch categories and products in parallel
  const [categories, categoryProducts] = await Promise.all([
    getCategories(),
    getCategoryProducts(categorySlug),
  ]);

  const currentCategory = categories.find(
    (category) => category.slug === categorySlug,
  );

  return (
    <main className="max-w-7xl mx-auto w-full px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>
        <span>→</span>
        <span className="text-gray-900">
          {currentCategory?.nameBn || categorySlug}
        </span>
      </div>

      {/* Category Header */}
      <div className="flex items-center gap-3 mt-6">
        <span className="text-4xl">{currentCategory?.icon}</span>

        <h1 className="text-2xl font-bold">
          {currentCategory?.nameBn || categorySlug}
        </h1>
      </div>

      {/* Category Information */}

      <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
        <p>{categoryProducts.length} Products Found</p>
        <p>Price Update Today</p>
      </div>

      {/* Product Cards */}

      {/* {categoryProducts?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {categoryProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-gray-500">
          No products found in this category.
        </p>
      )} */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
        categoryProducts?.map(product=> <ProductCard key={product.id} product={product}></ProductCard>)
        }
      </div>

    </main>
  );
};

export default CategoryProducts;
