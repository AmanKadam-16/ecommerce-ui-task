import { Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-[#266E46] text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Subscribe */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Exclusive</h3>
            <p className="font-semibold mb-2">Subscribe</p>
            <p className="text-sm text-white mb-4">Get 10% off your first order</p>
            <form
              onSubmit={(e) => { e.preventDefault(); setEmail(''); }}
              className="flex items-center border border-white/40 rounded px-3 py-2 gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-sm outline-none flex-1 placeholder:text-white/60 text-white"
              />
              <button type="submit" className="hover:opacity-70 transition-opacity">
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-3 text-sm text-white">
              <p>111 Bijoy sarani, Dhaka,<br />DH 1515, Bangladesh.</p>
              <p>exclusive@gmail.com</p>
              <p>+88015-88888-9999</p>
            </div>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-3 text-sm text-white">
              {['My Account', 'Login / Register', 'Cart', 'Wishlist', 'Shop'].map((item) => (
                <li key={item}>
                  <Link to="/" className="hover:opacity-70 transition-opacity">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h4 className="font-semibold mb-4">Quick Link</h4>
            <ul className="space-y-3 text-sm text-white">
              {['Privacy Policy', 'Terms Of Use', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to="/" className="hover:opacity-70 transition-opacity">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h4 className="font-semibold mb-4">Download App</h4>
            <p className="text-xs text-white mb-3">Save $3 with App New User Only</p>
            <div className="flex gap-3 mb-4">
              {/* QR Code placeholder */}
              <div className="w-16 h-16 bg-white rounded flex items-center justify-center">
                <div className="w-14 h-14 bg-gray-200 rounded grid grid-cols-4 gap-0.5 p-1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className={`rounded-sm ${i % 3 === 0 ? 'bg-black' : 'bg-white'}`} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <a href="#" className="bg-[#1a5234] border border-white/30 rounded px-2 py-1 text-xs text-white hover:bg-[#153f28] transition-colors">
                  GET IT ON<br /><span className="font-semibold">Google Play</span>
                </a>
                <a href="#" className="bg-[#1a5234] border border-white/30 rounded px-2 py-1 text-xs text-white hover:bg-[#153f28] transition-colors">
                  Download on the<br /><span className="font-semibold">App Store</span>
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
              {/* Facebook */}
              <a href="#" className="hover:opacity-70 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* Twitter/X */}
              <a href="#" className="hover:opacity-70 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="hover:opacity-70 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="hover:opacity-70 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-white">
          © Copyright Rimel 2022. All right reserved
        </div>
      </div>
    </footer>
  );
}
