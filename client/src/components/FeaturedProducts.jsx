import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Sindhri", "Chaunsa", "Anwar Ratol", "Langra"];

  useEffect(() => {
    API.get("products.php")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) =>
          p.name?.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <section className="py-24 bg-[#fafaf7] relative overflow-hidden">

      {/* Background decorative blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-8 h-px bg-yellow-400" />
            <span className="text-yellow-500 text-xs font-semibold uppercase tracking-[0.2em]">
              Handpicked For You
            </span>
            <span className="block w-8 h-px bg-yellow-400" />
          </div>

          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#1a2e1a] leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Our Featured{" "}
            <span className="text-yellow-500 italic">Mangoes</span>
          </h2>

          <p className="mt-4 text-gray-500 text-base max-w-xl leading-relaxed font-light">
            Naturally ripened and handpicked from Rehmat Farms — taste the
            difference in every bite.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-250 ${
                  activeFilter === f
                    ? "bg-[#1a2e1a] text-white border-[#1a2e1a] shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#1a2e1a] hover:text-[#1a2e1a]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="bg-gray-200 h-56 w-full" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-8 bg-gray-200 rounded-xl w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🥭</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No mangoes found
            </h3>
            <p className="text-gray-400 text-sm">
              Try selecting a different variety.
            </p>
            <button
              onClick={() => setActiveFilter("All")}
              className="mt-6 px-6 py-2 bg-[#1a2e1a] text-white rounded-full text-sm font-medium hover:bg-[#2d5a27] transition"
            >
              View All
            </button>
          </div>
        )}

        {/* View All CTA */}
        {!loading && filtered.length > 0 && (
          <div className="flex justify-center mt-14">
            <button className="group flex items-center gap-2 border border-[#1a2e1a] text-[#1a2e1a] hover:bg-[#1a2e1a] hover:text-white transition-all duration-300 px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-widest">
              View All Mangoes
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedProducts;