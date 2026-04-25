import { Trash2, ShoppingCart, Eye } from 'lucide-react';
import { useStore } from '../store/useStore';
import StarRating from '../components/ui/StarRating';
import { exploreProducts } from '../data/products';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  const handleMoveAllToBag = () => {
    wishlist.forEach((p) => addToCart(p));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Wishlist ({wishlist.length})</h2>
        <button
          onClick={handleMoveAllToBag}
          disabled={wishlist.length === 0}
          className="border border-gray-300 text-sm px-5 py-2 rounded hover:bg-gray-50 transition-colors disabled:opacity-40"
        >
          Move All To Bag
        </button>
      </div>

      {/* Wishlist items */}
      {wishlist.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg mb-4">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-16">
          {wishlist.map((product) => {
            const discountPct = product.discount
              ? product.discount
              : product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div key={product.id} className="flex flex-col">
                <div className="relative bg-gray-100 rounded-md overflow-hidden aspect-square mb-3 group">
                  {discountPct > 0 && (
                    <span className="absolute top-2 left-2 bg-[#4EA674] text-white text-xs px-2 py-0.5 rounded z-10">
                      -{discountPct}%
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50 transition-colors z-10"
                  >
                    <Trash2 size={14} className="text-gray-600" />
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/300x300/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`;
                    }}
                  />
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-0 left-0 right-0 bg-black text-white text-sm py-2 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ShoppingCart size={14} /> Add To Cart
                  </button>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-semibold text-[#4EA674]">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Just For You */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="w-4 h-8 bg-[#4EA674] rounded-sm inline-block" />
            <span className="text-lg font-semibold text-gray-900">Just For You</span>
          </div>
          <button className="border border-gray-300 text-sm px-5 py-2 rounded hover:bg-gray-50 transition-colors">
            See All
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {exploreProducts.slice(0, 4).map((product) => {
            const discountPct = product.discount
              ? product.discount
              : product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div key={product.id} className="flex flex-col group">
                <div className="relative bg-gray-100 rounded-md overflow-hidden aspect-square mb-3">
                  {discountPct > 0 && (
                    <span className="absolute top-2 left-2 bg-[#4EA674] text-white text-xs px-2 py-0.5 rounded z-10">
                      -{discountPct}%
                    </span>
                  )}
                  {product.badge === 'new' && !discountPct && (
                    <span className="absolute top-2 left-2 bg-[#00FF66] text-black text-xs px-2 py-0.5 rounded z-10">
                      NEW
                    </span>
                  )}
                  <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50 transition-colors z-10">
                    <Eye size={14} className="text-gray-700" />
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/300x300/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`;
                    }}
                  />
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-0 left-0 right-0 bg-black text-white text-sm py-2 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ShoppingCart size={14} /> Add To Cart
                  </button>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-semibold text-[#4EA674]">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                  )}
                </div>
                <StarRating rating={product.rating} reviews={product.reviews} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
