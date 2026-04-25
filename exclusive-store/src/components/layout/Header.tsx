import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function Header() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isLoggedIn, user, logout, cartCount, wishlistCount } = useStore();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-gray-600 ${isActive ? 'border-b border-black' : ''}`;

  return (
    <header className="border-b border-gray-200 py-4 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-black shrink-0">
          Exclusive
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          {!isLoggedIn && (
            <NavLink to="/signup" className={navLinkClass}>Sign Up</NavLink>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-gray-100 rounded px-3 py-1.5 gap-2 w-56">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm outline-none flex-1 text-gray-700 placeholder:text-gray-400"
            />
            <button type="submit">
              <Search size={18} className="text-gray-600 hover:text-black transition-colors" />
            </button>
          </form>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative hover:text-gray-600 transition-colors">
            <Heart size={22} />
            {wishlistCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#4EA674] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {wishlistCount()}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative hover:text-gray-600 transition-colors">
            <ShoppingCart size={22} />
            {cartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#4EA674] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {cartCount()}
              </span>
            )}
          </Link>

          {/* User */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                isLoggedIn ? 'bg-[#4EA674] text-white' : 'hover:text-gray-600'
              }`}
            >
              <User size={20} />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-10 w-52 bg-[#1a1a2e] text-white rounded-md shadow-xl z-50 py-2 backdrop-blur-sm">
                {isLoggedIn ? (
                  <>
                    <p className="px-4 py-2 text-xs text-gray-400 border-b border-gray-700">
                      {user?.name || user?.email}
                    </p>
                    <Link to="/account" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/10 transition-colors">
                      <User size={14} /> Manage My Account
                    </Link>
                    <Link to="/orders" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors">
                      My Order
                    </Link>
                    <Link to="/cancellations" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors">
                      My Cancellations
                    </Link>
                    <Link to="/reviews" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors">
                      My Reviews
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors text-red-400">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors">
                      Log In
                    </Link>
                    <Link to="/signup" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
