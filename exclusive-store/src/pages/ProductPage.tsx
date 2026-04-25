import { useState } from 'react';
import { Heart, Minus, Plus, Truck, RefreshCw } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import StarRating from '../components/ui/StarRating';
import ProductCard from '../components/ui/ProductCard';
import Breadcrumb from '../components/ui/Breadcrumb';
import { flashSaleProducts, exploreProducts } from '../data/products';
import type { Product } from '../types';

const allProducts: Product[] = [...flashSaleProducts, ...exploreProducts];

const productImages = [
  'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1605633048013-6a11b4a25869?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&h=500&fit=crop',
];

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colours = ['#A0AEC0', '#E53E3E'];

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = allProducts.find((p) => p.id === Number(id)) ?? allProducts[0];

  const [mainImg, setMainImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColour, setSelectedColour] = useState(0);
  const [qty, setQty] = useState(2);

  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  const related = allProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const relatedFallback = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8">
      <Breadcrumb items={[
        { label: 'Account', href: '/account' },
        { label: product.category, href: '/' },
        { label: product.name },
      ]} />

      {/* Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Images */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {productImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImg(i)}
                className={`w-20 h-20 rounded overflow-hidden border-2 transition-colors ${
                  mainImg === i ? 'border-[#4EA674]' : 'border-transparent'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumb ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/80x80/f3f4f6/9ca3af?text=P'; }}
                />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden aspect-square">
            <img
              src={productImages[mainImg]}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/500x500/f3f4f6/9ca3af?text=Product'; }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">{product.name}</h1>

          <div className="flex items-center gap-3">
            <StarRating rating={product.rating} size={16} />
            <span className="text-sm text-gray-500">({product.reviews} Reviews)</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-[#4EA674] font-medium">In Stock</span>
          </div>

          <p className="text-2xl font-medium text-gray-900">${product.price}.00</p>

          <p className="text-sm text-gray-600 leading-relaxed border-b border-gray-200 pb-4">
            PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install &amp; mess free removal Pressure sensitive.
          </p>

          {/* Colours */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Colours:</span>
            <div className="flex gap-2">
              {colours.map((c, i) => (
                <button
                  key={c}
                  onClick={() => setSelectedColour(i)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedColour === i ? 'border-gray-900 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Size:</span>
            <div className="flex gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-9 h-9 text-sm rounded border transition-colors ${
                    selectedSize === s
                      ? 'bg-[#4EA674] text-white border-[#4EA674]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#4EA674]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Buy Now + Wishlist */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2.5 hover:bg-gray-100 transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm font-medium py-2.5">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2.5 bg-[#4EA674] text-white hover:bg-[#3d8f63] transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={() => { addToCart(product); }}
              className="flex-1 bg-[#4EA674] text-white py-2.5 rounded text-sm font-medium hover:bg-[#3d8f63] transition-colors"
            >
              Buy Now
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`w-10 h-10 border rounded flex items-center justify-center transition-colors ${
                inWishlist ? 'border-[#4EA674] bg-[#4EA674]/10' : 'border-gray-300 hover:border-[#4EA674]'
              }`}
            >
              <Heart
                size={18}
                className={inWishlist ? 'fill-[#4EA674] text-[#4EA674]' : 'text-gray-600'}
              />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border border-gray-200 rounded-md overflow-hidden mt-2">
            <div className="flex items-start gap-4 p-4 border-b border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <Truck size={18} className="text-gray-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  <Link to="#" className="underline hover:text-gray-700">Enter your postal code for Delivery Availability</Link>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <RefreshCw size={18} className="text-gray-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Return Delivery</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Free 30 Days Delivery Returns. <Link to="#" className="underline hover:text-gray-700">Details</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-4 h-8 bg-[#4EA674] rounded-sm inline-block" />
          <span className="text-[#4EA674] text-sm font-semibold">Related Item</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {(related.length >= 4 ? related : relatedFallback).map((p) => (
            <Link key={p.id} to={`/product/${p.id}`}>
              <ProductCard product={p} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
