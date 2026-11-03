import HeroSection from "@/components/homePage/HeroSection";
import ProductCard from "@/components/ProductCard";

const API_URL = "https://api.abcz.workers.dev/api/bazardor";

const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`, {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data;
};
export default async function Home() {
  const products = await getProducts();

  const upProduct = products.filter((p) => p.change.dir == "up");

  const downProduct = products.filter((p) => p.change.dir == "down");

  return (
    <div className=" mb-10">
      <HeroSection />

      {/*Today's High Price Product area */}
      <div className="container mx-auto">
        <h2 className="mb-6 text-2xl font-bold">
          <span className="text-red-600">▲</span>
          আজ দাম বেড়েছে
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {upProduct?.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
        </div>
      </div>

      {/* Today's Low Price Product area */}

      <div>
        <div className="container mx-auto mt-7">
          <h2 className="mb-2 text-2xl font-bold">
            <span className="text-green-600">▼</span>
            আজ দাম কমেছে
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {downProduct?.map((product) => (
              <ProductCard key={product.id} product={product}></ProductCard>
            ))}
          </div>
        </div>
      </div>

      {/* All Product Price & information */}

      <div>
        <div className="container mx-auto mt-7">
          <h2 className="mb-2 text-2xl font-bold">সব পণ্য</h2>
            <div className="flex mx-auto txt-sm text-gray-600 gap-2 mb-4">
              <span>মোট {" "}</span> 
              <p>{products.length}</p>
              <span>টি পণ্য দেখানো হচ্ছে</span>
            </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
