import { useState } from 'react';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';
import { useStore } from '../../store/useStore';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const navigate = useNavigate();
  const inWishlist = isInWishlist(product.id);

  const discountPct = product.discount
    ? product.discount
    : product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative bg-gray-100 rounded-md overflow-hidden aspect-square mb-3">
        {/* Badge */}
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

        {/* Action icons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
          <button
            onClick={() => toggleWishlist(product)}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50 transition-colors"
          >
            <Heart
              size={14}
              className={inWishlist ? 'fill-[#4EA674] text-[#4EA674]' : 'text-gray-700'}
            />
          </button>
          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50 transition-colors"
          >
            <Eye size={14} className="text-gray-700" />
          </button>
        </div>

        {/* Product image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/300x300/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`;
          }}
        />

        {/* Add to Cart overlay */}
        <button
          onClick={() => addToCart(product)}
          className={`absolute bottom-0 left-0 right-0 bg-black text-white text-sm py-2 flex items-center justify-center gap-2 transition-all duration-300 ${
            hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
          }`}
        >
          <ShoppingCart size={14} />
          Add To Cart
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#4EA674]">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>
        <StarRating rating={product.rating} reviews={product.reviews} />
        {/* Color swatches */}
        {product.colors && (
          <div className="flex gap-1.5 mt-1">
            {product.colors.map((color) => (
              <button
                key={color}
                className="w-3.5 h-3.5 rounded-full border border-gray-300 hover:ring-1 hover:ring-offset-1 hover:ring-gray-400 transition"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
