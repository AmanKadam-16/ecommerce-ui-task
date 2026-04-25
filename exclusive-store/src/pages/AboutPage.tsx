import { useState } from 'react';
import { Truck, Headphones, ShieldCheck } from 'lucide-react';
import Breadcrumb from '../components/ui/Breadcrumb';

const stats = [
  { icon: '🏪', value: '10.5k', label: 'Sellers active our site' },
  { icon: '💰', value: '33k', label: 'Monthly Product Sale', highlight: true },
  { icon: '🛍️', value: '45.5k', label: 'Customer active in our site' },
  { icon: '💵', value: '25k', label: 'Annual gross sale in our site' },
];

const team = [
  {
    name: 'Tom Cruise',
    role: 'Founder & Chairman',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=450&fit=crop&fp-y=0.3',
  },
  {
    name: 'Emma Watson',
    role: 'Managing Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=450&fit=crop&fp-y=0.2',
  },
  {
    name: 'Will Smith',
    role: 'Product Designer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=450&fit=crop&fp-y=0.2',
  },
];

const SocialIcons = () => (
  <div className="flex items-center gap-3 mt-3">
    <a href="#" className="hover:opacity-70 transition-opacity">
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    </a>
    <a href="#" className="hover:opacity-70 transition-opacity">
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    </a>
    <a href="#" className="hover:opacity-70 transition-opacity">
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
    </a>
  </div>
);

export default function AboutPage() {
  const [teamIdx, setTeamIdx] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

      {/* Our Story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h1>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Launced in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millions customers across the region.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assortment in categories ranging from consumer.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&h=500&fit=crop"
            alt="Our Story"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/700x500/fce7f3/9d174d?text=Our+Story';
            }}
          />
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
        {stats.map((stat) => (
          <div
            key={stat.value}
            className={`flex flex-col items-center justify-center py-8 px-4 border rounded-md text-center transition-all ${
              stat.highlight
                ? 'bg-[#4EA674] text-white border-[#4EA674]'
                : 'bg-white text-gray-900 border-gray-200 hover:border-[#4EA674]'
            }`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3 ${
              stat.highlight ? 'bg-white/20' : 'bg-gray-100'
            }`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className={`text-xs ${stat.highlight ? 'text-white/90' : 'text-gray-500'}`}>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Team */}
      <section className="mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {team.map((member) => (
            <div key={member.name}>
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-[4/5]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/400x450/f3f4f6/374151?text=${encodeURIComponent(member.name)}`;
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
              <SocialIcons />
            </div>
          ))}
        </div>
        {/* Carousel dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <button
              key={i}
              onClick={() => setTeamIdx(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                teamIdx === i ? 'bg-[#4EA674]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Service Features */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8">
        {[
          { icon: <Truck size={40} />, title: 'FREE AND FAST DELIVERY', desc: 'Free delivery for all orders over $140' },
          { icon: <Headphones size={40} />, title: '24/7 CUSTOMER SERVICE', desc: 'Friendly 24/7 customer support' },
          { icon: <ShieldCheck size={40} />, title: 'MONEY BACK GUARANTEE', desc: 'We return money within 30 days' },
        ].map((feat) => (
          <div key={feat.title} className="flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-gray-100">
              {feat.icon}
            </div>
            <h4 className="font-bold text-sm tracking-wide">{feat.title}</h4>
            <p className="text-sm text-gray-500">{feat.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
