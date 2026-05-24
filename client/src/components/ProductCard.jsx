import { FaShoppingBag, FaHeart, FaSearch } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="group">

      {/* Product Image Card */}
      <div className="relative bg-[#f5f5f5] overflow-hidden h-[420px] flex items-center justify-center">

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />

        {/* Hover Content */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">

          {/* Icons */}
          <div className="flex items-center gap-3">

            <button className="w-12 h-12 bg-white flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition duration-300">
              <FaShoppingBag size={16} />
            </button>

            <button className="w-12 h-12 bg-white flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition duration-300">
              <FaSearch size={16} />
            </button>

            <button className="w-12 h-12 bg-white flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition duration-300">
              <FaHeart size={16} />
            </button>

          </div>

          {/* Quick View */}
          <button className="mt-5 text-black text-xs font-semibold uppercase tracking-[2px] border-b border-black hover:text-primary hover:border-primary transition duration-300">
            Quick View
          </button>

        </div>
      </div>

      {/* Product Info */}
      <div className="text-center pt-4">

        <h3 className="text-xl font-semibold text-black">
          {product.name}
        </h3>

        <div className="flex items-center justify-center gap-2 mt-2">

          <p className="text-green-600 text-lg font-semibold">
            Rs. {product.price}
          </p>

          {product.oldPrice && (
            <span className="text-gray-400 line-through text-sm">
              Rs. {product.oldPrice}
            </span>
          )}

        </div>

      </div>

    </div>
  );
};

export default ProductCard;