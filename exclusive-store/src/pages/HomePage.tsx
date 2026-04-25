import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Truck,
  Headphones,
  ShieldCheck,
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Gamepad2,
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import ProductCard from '../components/ui/ProductCard';
import CountdownTimer from '../components/ui/CountdownTimer';
import {
  flashSaleProducts,
  bestSellingProducts,
  exploreProducts,
  sidebarCategories,
  browseCategories,
} from '../data/products';

const categoryIcons: Record<string, React.ReactNode> = {
  phone: <Smartphone size={32} />,
  laptop: <Monitor size={32} />,
  watch: <Watch size={32} />,
  camera: <Camera size={32} />,
  headphones: <Headphones size={32} />,
  gamepad: <Gamepad2 size={32} />,
};

export default function HomePage() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [flashStart, setFlashStart] = useState(0);
  const flashVisible = 4;

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="hidden lg:block w-56 border-r border-gray-200 pt-6 pb-10 shrink-0">
        <ul className="divide-y divide-gray-100">
          {sidebarCategories.map((cat) => (
            <li key={cat}>
              <button
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:text-black hover:font-semibold transition-all group"
              >
                {cat}
                {(cat.includes("Fashion") || cat === 'Electronics') && (
                  <ChevronRight size={14} className="text-gray-400 group-hover:text-black" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 px-4 lg:px-10 py-6 space-y-16">

        {/* Hero Banner */}
        <section className="rounded-lg overflow-hidden bg-gray-900 flex flex-col md:flex-row items-center min-h-[340px] relative">
          <div className="flex-1 p-8 text-white z-10">
            <div className="flex items-center gap-2 mb-2 opacity-80 text-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11"/></svg>
              iPhone 14 Series
            </div>
            <h1 className="text-3xl lg:text-4xl font-semibold leading-snug mb-6">
              Up to 10% off<br />Voucher
            </h1>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white border-b border-white hover:opacity-80 transition-opacity text-sm font-medium"
            >
              Shop Now <ChevronRight size={16} />
            </Link>
          </div>
          <div className="flex-1 flex justify-center items-end h-full max-h-[340px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=400&fit=crop&fp-y=0.3"
              alt="iPhone"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/500x340/1a1a2e/ffffff?text=iPhone+14';
              }}
            />
          </div>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {[0].map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIdx(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${heroIdx === i ? 'bg-[#4EA674]' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </section>

        {/* Flash Sales */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-4 h-8 bg-[#4EA674] rounded-sm inline-block" />
                <span className="text-[#4EA674] text-sm font-semibold">Today's</span>
              </div>
              <div className="flex items-center gap-8 flex-wrap">
                <h2 className="text-2xl font-semibold text-gray-900">Flash Sales</h2>
                <CountdownTimer />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFlashStart((p) => Math.max(0, p - 1))}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                disabled={flashStart === 0}
              >
                ←
              </button>
              <button
                onClick={() => setFlashStart((p) => Math.min(flashSaleProducts.length - flashVisible, p + 1))}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                disabled={flashStart >= flashSaleProducts.length - flashVisible}
              >
                →
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
            {flashSaleProducts.slice(flashStart, flashStart + flashVisible + 1).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="flex justify-center">
            <Link
              to="/"
              className="bg-[#4EA674] text-white px-10 py-3 rounded text-sm font-medium hover:bg-[#3d8f63] transition-colors"
            >
              View All Products
            </Link>
          </div>
          <div className="border-t border-gray-200 mt-10" />
        </section>

        {/* Browse By Category */}
        <section>
          <SectionHeader tag="Categories" title="Browse By Category" showArrows />
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {browseCategories.map((cat) => (
              <button
                key={cat.id}
                className="flex flex-col items-center justify-center gap-3 border border-gray-200 rounded-md py-6 hover:bg-[#4EA674] hover:text-white hover:border-[#4EA674] transition-all group"
              >
                <span className="text-gray-600 group-hover:text-white transition-colors">
                  {categoryIcons[cat.icon]}
                </span>
                <span className="text-sm text-gray-700 group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-10" />
        </section>

        {/* Best Selling Products */}
        <section>
          <SectionHeader
            tag="This Month"
            title="Best Selling Products"
            actionLabel="View All"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {bestSellingProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Promo Banner */}
        <section className="bg-black rounded-lg overflow-hidden flex flex-col md:flex-row items-center min-h-[280px] relative">
          <div className="flex-1 p-8 text-white z-10">
            <div className="flex items-center gap-2 mb-2 opacity-70">
              <span className="text-[#00FF66] text-xs font-semibold uppercase tracking-widest">Categories</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-semibold leading-snug mb-6">
              Enhance Your<br />Music Experience
            </h2>
            <div className="flex gap-4 mb-6">
              {['23', '05', '59', '35'].map((val, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-base">
                    {val}
                  </div>
                  <span className="text-xs text-gray-400 mt-1">{['Hours', 'Days', 'Minutes', 'Seconds'][i]}</span>
                </div>
              ))}
            </div>
            <button className="bg-[#00FF66] text-black px-6 py-2.5 rounded text-sm font-semibold hover:bg-green-400 transition-colors">
              Buy Now!
            </button>
          </div>
          <div className="flex-1 flex justify-center items-center p-8">
            <img
              src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop"
              alt="Speaker"
              className="max-h-56 object-contain drop-shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/300x200/111827/ffffff?text=Speaker';
              }}
            />
          </div>
        </section>

        {/* Explore Our Products */}
        <section>
          <SectionHeader tag="Our Products" title="Explore Our Products" showArrows />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
            {exploreProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="flex justify-center">
            <Link
              to="/"
              className="bg-[#4EA674] text-white px-10 py-3 rounded text-sm font-medium hover:bg-[#3d8f63] transition-colors"
            >
              View All Products
            </Link>
          </div>
        </section>

        {/* New Arrival */}
        <section>
          <SectionHeader tag="Featured" title="New Arrival" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[600px]">
            {/* Left large - PS5 */}
            <div className="relative bg-black rounded-lg overflow-hidden flex items-end min-h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=600&fit=crop"
                alt="PlayStation 5"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/500x600/111827/ffffff?text=PS5';
                }}
              />
              <div className="relative z-10 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">PlayStation 5</h3>
                <p className="text-xs text-gray-300 mb-3">Black and White version of the PS5 coming out on sale.</p>
                <button className="text-white border-b border-white text-sm font-medium hover:opacity-70 transition-opacity">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Right column */}
            <div className="grid grid-rows-2 gap-4">
              {/* Women's Collection */}
              <div className="relative bg-gray-900 rounded-lg overflow-hidden flex items-end min-h-[140px]">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=300&fit=crop"
                  alt="Women's Collections"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/500x300/374151/ffffff?text=Women+Collections';
                  }}
                />
                <div className="relative z-10 p-5 text-white">
                  <h3 className="text-lg font-bold mb-1">Women's Collections</h3>
                  <p className="text-xs text-gray-300 mb-2">Featured woman collections that give you another vibe.</p>
                  <button className="text-white border-b border-white text-sm font-medium hover:opacity-70 transition-opacity">
                    Shop Now
                  </button>
                </div>
              </div>

              {/* Bottom row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Speakers */}
                <div className="relative bg-gray-900 rounded-lg overflow-hidden flex items-end min-h-[140px]">
                  <img
                    src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop"
                    alt="Speakers"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/300x200/374151/ffffff?text=Speakers';
                    }}
                  />
                  <div className="relative z-10 p-4 text-white">
                    <h3 className="font-bold mb-1">Speakers</h3>
                    <p className="text-xs text-gray-300 mb-2">Amazon wireless speakers</p>
                    <button className="text-white border-b border-white text-xs font-medium hover:opacity-70 transition-opacity">
                      Shop Now
                    </button>
                  </div>
                </div>

                {/* Perfume */}
                <div className="relative bg-gray-900 rounded-lg overflow-hidden flex items-end min-h-[140px]">
                  <img
                    src="https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&h=200&fit=crop"
                    alt="Perfume"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/300x200/374151/ffffff?text=Perfume';
                    }}
                  />
                  <div className="relative z-10 p-4 text-white">
                    <h3 className="font-bold mb-1">Perfume</h3>
                    <p className="text-xs text-gray-300 mb-2">GUCCI INTENSE OUD EDP</p>
                    <button className="text-white border-b border-white text-xs font-medium hover:opacity-70 transition-opacity">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Features */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8">
          {[
            {
              icon: <Truck size={48} className="text-black" />,
              title: 'FREE AND FAST DELIVERY',
              desc: 'Free delivery for all orders over $140',
            },
            {
              icon: <Headphones size={48} className="text-black" />,
              title: '24/7 CUSTOMER SERVICE',
              desc: 'Friendly 24/7 customer support',
            },
            {
              icon: <ShieldCheck size={48} className="text-black" />,
              title: 'MONEY BACK GUARANTEE',
              desc: 'We return money within 30 days',
            },
          ].map((feat) => (
            <div key={feat.title} className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-gray-100">
                {feat.icon}
              </div>
              <h4 className="font-semibold text-sm">{feat.title}</h4>
              <p className="text-sm text-gray-500">{feat.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
