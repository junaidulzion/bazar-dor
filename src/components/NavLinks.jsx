import CategoryMenu from "./CategoryMenu";

const NavLinks = async () => {
  "use cache";

  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const navs = await res.json();

  return (
    <nav className="container mx-auto px-4">
      <CategoryMenu navs={navs} />
    </nav>
  );
};

export default NavLinks;